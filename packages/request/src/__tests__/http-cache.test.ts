import { describe, it, expect, vi } from 'vitest'
import {
  HttpCache,
  parseCacheControl,
  createHttpCacheInterceptor,
  isResponseCacheable
} from '../http-cache'

describe('HttpCache', () => {
  describe('parseCacheControl', () => {
    it('should parse max-age', () => {
      const header = 'public, max-age=3600'
      const result = parseCacheControl(header)
      expect(result.maxAge).toBe(3600)
      expect(result.isPublic).toBe(true)
    })

    it('should parse flags', () => {
      const header = 'no-cache, no-store, must-revalidate'
      const result = parseCacheControl(header)
      expect(result.noCache).toBe(true)
      expect(result.noStore).toBe(true)
      expect(result.mustRevalidate).toBe(true)
    })
  })

  describe('HttpCache class', () => {
    it('should store and retrieve data', () => {
      const cache = new HttpCache()
      const response = new Response('ok', {
        headers: { ETag: 'v1', 'Cache-Control': 'max-age=60' }
      })

      cache.set('key1', { foo: 'bar' }, response)

      const entry = cache.get('key1')
      expect(entry?.etag).toBe('v1')
      expect(entry?.data).toEqual({ foo: 'bar' })
    })

    it('should handle expiration', () => {
      vi.useFakeTimers()
      const cache = new HttpCache({ maxAge: 1000 })
      const response = new Response('ok')

      cache.set('key', 'data', response)
      expect(cache.get('key')).toBeDefined()

      vi.advanceTimersByTime(2000)
      expect(cache.get('key')).toBeUndefined()

      vi.useRealTimers()
    })

    it('should build conditional headers', () => {
      const cache = new HttpCache()
      const response = new Response('ok', {
        headers: { ETag: 'v1', 'Last-Modified': 'Mon, 01 Jan 2024 00:00:00 GMT' }
      })

      cache.set('GET:http://api.com', 'data', response)

      const headers = cache.buildConditionalHeaders({
        method: 'GET',
        url: 'http://api.com',
        fullPath: 'http://api.com'
      } as any)

      expect(headers['If-None-Match']).toBe('v1')
      expect(headers['If-Modified-Since']).toBe('Mon, 01 Jan 2024 00:00:00 GMT')
    })

    it('set applies no-cache by zeroing effective maxAge', () => {
      const cache = new HttpCache()
      const response = new Response('ok', {
        headers: { 'Cache-Control': 'no-cache, max-age=3600' }
      })
      cache.set('nc', 'payload', response)
      const entry = cache.get('nc')
      expect(entry?.expireTime).toBe(entry?.createTime)
    })

    it('handleConditionalResponse returns cached data on 304 when entry exists', () => {
      const cache = new HttpCache()
      const cfg = { method: 'GET', url: 'http://api/x', fullPath: 'http://api/x' } as any
      const res200 = new Response('ok', {
        headers: { ETag: 'e1', 'Cache-Control': 'max-age=60' }
      })
      cache.set('GET:http://api/x', { v: 1 }, res200)
      const res304 = new Response(null, { status: 304 })
      const out = cache.handleConditionalResponse(cfg, res304, null)
      expect(out.isModified).toBe(false)
      expect(out.data).toEqual({ v: 1 })
    })

    it('handleConditionalResponse stores fresh data on 200', () => {
      const cache = new HttpCache()
      const cfg = { method: 'GET', url: 'http://api/y', fullPath: 'http://api/y' } as any
      const res200 = new Response('body', { status: 200, headers: { ETag: 'e2' } })
      const out = cache.handleConditionalResponse(cfg, res200, { fresh: true })
      expect(out.isModified).toBe(true)
      expect(out.data).toEqual({ fresh: true })
      expect(cache.get('GET:http://api/y')?.data).toEqual({ fresh: true })
    })

    it('delete clear and size', () => {
      const cache = new HttpCache()
      cache.set('k', 1, new Response('a'))
      expect(cache.size()).toBe(1)
      expect(cache.delete('k')).toBe(true)
      expect(cache.size()).toBe(0)
      cache.set('a', 1, new Response('x'))
      cache.clear()
      expect(cache.size()).toBe(0)
    })

    it('cleanup removes expired entries', () => {
      vi.useFakeTimers()
      const cache = new HttpCache({ maxAge: 100 })
      cache.set('old', 1, new Response('x'))
      vi.advanceTimersByTime(500)
      cache.cleanup()
      expect(cache.get('old')).toBeUndefined()
      vi.useRealTimers()
    })

    it('getWithFallback returns data when entry valid', () => {
      const cache = new HttpCache({ maxAge: 60_000 })
      cache.set('gf', { n: 1 }, new Response('ok', { headers: { 'Cache-Control': 'max-age=300' } }))
      const fb = cache.getWithFallback('gf')
      expect(fb?.data).toEqual({ n: 1 })
      expect(fb?.isStale).toBe(false)
    })
  })

  describe('createHttpCacheInterceptor', () => {
    it('onRequest leaves config unchanged when disabled', () => {
      const { onRequest } = createHttpCacheInterceptor({ enabled: false })
      const cfg = { method: 'GET', url: '/a', headers: {} } as any
      expect(onRequest(cfg)).toBe(cfg)
    })

    it('onRequest skips non-GET methods', () => {
      const { onRequest } = createHttpCacheInterceptor({ enabled: true })
      const cfg = { method: 'POST', url: '/a', headers: {} } as any
      expect(onRequest(cfg)).toBe(cfg)
    })

    it('onResponse returns unchanged for non-GET', () => {
      const { onResponse } = createHttpCacheInterceptor({ enabled: true })
      const res = {
        data: 1,
        response: new Response(null, { status: 200 }),
        config: { method: 'POST', url: '/x' },
        requestId: 'r1'
      } as any
      expect(onResponse(res)).toBe(res)
    })

    it('onResponse fills data from cache on 304', () => {
      const { onResponse, getCache } = createHttpCacheInterceptor({ enabled: true })
      getCache().set(
        'GET:http://cached',
        { from: 'cache' },
        new Response('ok', { headers: { ETag: 't' } })
      )
      const out = onResponse({
        data: undefined,
        response: new Response(null, { status: 304 }),
        config: { method: 'GET', url: 'http://cached', fullPath: 'http://cached' },
        requestId: 'id'
      } as any)
      expect(out.data).toEqual({ from: 'cache' })
    })
  })

  describe('parseCacheControl edge cases', () => {
    it('returns defaults when header is null', () => {
      const r = parseCacheControl(null)
      expect(r.noCache).toBe(false)
      expect(r.noStore).toBe(false)
    })
  })

  describe('isResponseCacheable', () => {
    it('returns false when no-store', () => {
      const res = new Response('x', { headers: { 'Cache-Control': 'no-store' } })
      expect(isResponseCacheable(res)).toBe(false)
    })

    it('returns true for public cacheable response', () => {
      const res = new Response('x', { headers: { 'Cache-Control': 'public, max-age=60' } })
      expect(isResponseCacheable(res)).toBe(true)
    })

    it('returns true for ok response without restrictive cache headers', () => {
      const res = new Response('x', { status: 200 })
      expect(isResponseCacheable(res)).toBe(true)
    })
  })
})
