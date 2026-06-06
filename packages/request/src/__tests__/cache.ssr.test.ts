/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { MemoryCache } from '../cache/memory'
import { LocalStorageCache } from '../cache/localStorage'

describe('Cache System SSR', () => {
  it('MemoryCache should work in SSR', () => {
    const cache = new MemoryCache()
    cache.set('ssr-key', 'data')
    expect(cache.get('ssr-key')).toBe('data')
  })

  it('LocalStorageCache should handle missing localStorage gracefully in SSR', () => {
    // 在 Node 环境下，localStorage 是 undefined
    const cache = new LocalStorageCache()

    // 操作不应报错
    expect(() => cache.set('key', 'val')).not.toThrow()
    expect(cache.get('key')).toBeUndefined()
    expect(cache.keys()).toEqual([])
  })
})
