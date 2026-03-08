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
  })

  describe('LocalStorageCache', () => {
    let cache: LocalStorageCache
    const mockStorage: Record<string, string> = {}

    beforeEach(() => {
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
  })
})
