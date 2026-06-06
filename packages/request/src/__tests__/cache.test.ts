import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryCache } from '../cache/memory'
import { LocalStorageCache } from '../cache/localStorage'

describe('Cache', () => {
  describe('MemoryCache', () => {
    let cache: MemoryCache

    beforeEach(() => {
      cache = new MemoryCache()
      vi.useFakeTimers()
    })

    it('should set and get values', () => {
      cache.set('key', { data: 1 }, { staleTime: 1000 })
      expect(cache.get('key')).toEqual({ data: 1 })
    })

    it('should handle expiration', () => {
      cache.set('key', 'data', { staleTime: 1000 })
      vi.advanceTimersByTime(1100)
      expect(cache.get('key')).toBeUndefined()
    })

    it('should delete and clear', () => {
      cache.set('k1', 1)
      cache.set('k2', 2)
      cache.delete('k1')
      expect(cache.has('k1')).toBe(false)
      expect(cache.size()).toBe(1)
      cache.clear()
      expect(cache.size()).toBe(0)
    })

    it('has returns false for missing or expired keys', () => {
      expect(cache.has('missing')).toBe(false)
      cache.set('e', 'v', { staleTime: 100 })
      vi.advanceTimersByTime(200)
      expect(cache.has('e')).toBe(false)
    })

    it('deleteByTags is a no-op for memory cache', () => {
      cache.set('t', 1)
      cache.deleteByTags(['x'])
      expect(cache.get('t')).toBe(1)
    })

    it('startCleanup removes expired entries on interval', () => {
      const c = new MemoryCache()
      c.set('a', 1, { staleTime: 50, cacheTime: 10_000 })
      c.startCleanup(10)
      vi.advanceTimersByTime(100)
      expect(c.get('a')).toBeUndefined()
      c.stopCleanup()
    })

    it('startCleanup ignores second call', () => {
      const c = new MemoryCache()
      c.startCleanup(1000)
      c.startCleanup(1000)
      c.stopCleanup()
    })
  })

  describe('LocalStorageCache', () => {
    let cache: LocalStorageCache
    const mockStorage: Record<string, string> = {}

    beforeEach(() => {
      Object.keys(mockStorage).forEach((k) => delete mockStorage[k])
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => mockStorage[key] || null),
        setItem: vi.fn((key, val) => {
          mockStorage[key] = val
        }),
        removeItem: vi.fn((key) => {
          delete mockStorage[key]
        }),
        clear: vi.fn(() => {
          Object.keys(mockStorage).forEach((k) => delete mockStorage[k])
        }),
        key: vi.fn((i) => Object.keys(mockStorage)[i] || null),
        get length() {
          return Object.keys(mockStorage).length
        }
      })
      cache = new LocalStorageCache({ prefix: 'test_' })
      vi.useFakeTimers()
    })

    it('should store values in localStorage', () => {
      cache.set('foo', 'bar')
      expect(localStorage.setItem).toHaveBeenCalled()
      expect(cache.get('foo')).toBe('bar')
    })

    it('should handle expiration', () => {
      cache.set('foo', 'bar', { staleTime: 1000 })
      vi.advanceTimersByTime(2000)
      expect(cache.get('foo')).toBeUndefined()
    })

    it('get returns undefined when stored JSON is invalid', () => {
      mockStorage['test_bad'] = 'not-json{'
      const c = new LocalStorageCache({ prefix: 'test_' })
      expect(c.get('bad')).toBeUndefined()
    })

    it('keys lists prefixed entries', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      expect(cache.keys().sort()).toEqual(['a', 'b'])
    })

    it('clear removes all prefixed keys', () => {
      cache.set('x', 1)
      cache.clear()
      expect(cache.get('x')).toBeUndefined()
    })

    it('delete returns false when removeItem throws', () => {
      vi.mocked(localStorage.removeItem).mockImplementationOnce(() => {
        throw new Error('fail')
      })
      expect(cache.delete('any')).toBe(false)
    })

    it('set triggers cleanup when over maxSize', () => {
      const tiny = new LocalStorageCache({ prefix: 'tiny_', maxSize: 80 })
      tiny.set('old', { x: 1 }, { staleTime: 1 })
      vi.advanceTimersByTime(10)
      tiny.set('new', { y: 2 }, { staleTime: 60_000 })
      expect(tiny.get('new')).toEqual({ y: 2 })
    })
  })
})
