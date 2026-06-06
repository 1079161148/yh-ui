/**
 * YH-UI AI SDK - 缓存适配器测试
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  createMemoryCache,
  createLocalStorageCache,
  createSessionStorageCache
} from '../src/cache-adapter'

describe('CacheAdapters', () => {
  describe('MemoryCache', () => {
    it('should store and retrieve values', () => {
      const cache = createMemoryCache()
      cache.set('key1', 'value1')
      expect(cache.get('key1')).toBe('value1')
    })

    it('should return null for missing keys', () => {
      const cache = createMemoryCache()
      expect(cache.get('nonexistent')).toBeNull()
    })

    it('should respect TTL', async () => {
      const cache = createMemoryCache()
      cache.set('key1', 'value1', 10)
      expect(cache.get('key1')).toBe('value1')

      await new Promise((r) => setTimeout(r, 15))
      expect(cache.get('key1')).toBeNull()
    })

    it('should delete keys', () => {
      const cache = createMemoryCache()
      cache.set('key1', 'value1')
      cache.delete('key1')
      expect(cache.get('key1')).toBeNull()
    })

    it('should check key existence', () => {
      const cache = createMemoryCache()
      cache.set('key1', 'value1')
      expect(cache.has!('key1')).toBe(true)
      expect(cache.has!('key2')).toBe(false)
    })
  })

  describe('LocalStorageCache', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it('should store and retrieve', () => {
      const cache = createLocalStorageCache('test-')
      cache.set('key1', { a: 1 })
      expect(cache.get('key1')).toEqual({ a: 1 })
    })

    it('should handle missing items gracefully', () => {
      const cache = createLocalStorageCache()
      expect(cache.get('nonexistent')).toBeNull()
    })

    it('should delete items', () => {
      const cache = createLocalStorageCache()
      cache.set('key1', 'value1')
      cache.delete('key1')
      expect(cache.get('key1')).toBeNull()
    })
  })

  describe('SessionStorageCache', () => {
    beforeEach(() => {
      sessionStorage.clear()
    })

    it('should store and retrieve', () => {
      const cache = createSessionStorageCache('test-')
      cache.set('key1', 'value1')
      expect(cache.get('key1')).toBe('value1')
    })

    it('should delete items', () => {
      const cache = createSessionStorageCache()
      cache.set('key1', 'value1')
      cache.delete('key1')
      expect(cache.get('key1')).toBeNull()
    })
  })
})
