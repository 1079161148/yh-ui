import { describe, it, expect, vi } from 'vitest'
import { HttpCache, parseCacheControl } from '../http-cache'

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
  })
})
