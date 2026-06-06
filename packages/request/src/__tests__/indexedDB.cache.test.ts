/**
 * IndexedDBCache — uses fake-indexeddb in Node/happy-dom test runs
 */
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'
import { IndexedDBCache } from '../cache/indexedDB'

describe('request/cache/indexedDB', () => {
  let cache: IndexedDBCache

  beforeEach(() => {
    cache = new IndexedDBCache({
      dbName: `yh_test_idb_${Math.random().toString(36).slice(2)}`,
      storeName: 'kv',
      dbVersion: 1
    })
  })

  it('set and get returns stored data', async () => {
    await cache.set('a', { n: 1 }, { staleTime: 60_000 })
    const v = await cache.get<{ n: number }>('a')
    expect(v).toEqual({ n: 1 })
  })

  it('get returns undefined for missing key', async () => {
    expect(await cache.get('missing')).toBeUndefined()
  })

  it('expires entries based on staleTime', async () => {
    await cache.set('k', 'v', { staleTime: 1 })
    await new Promise((r) => setTimeout(r, 15))
    expect(await cache.get('k')).toBeUndefined()
  })

  it('delete removes key', async () => {
    await cache.set('d', 1)
    expect(await cache.delete('d')).toBe(true)
    expect(await cache.get('d')).toBeUndefined()
  })

  it('clear removes all entries', async () => {
    await cache.set('x', 1)
    await cache.set('y', 2)
    await cache.clear()
    expect(await cache.get('x')).toBeUndefined()
    expect(await cache.keys()).toEqual([])
  })

  it('has reflects presence', async () => {
    expect(await cache.has('h')).toBe(false)
    await cache.set('h', 1)
    expect(await cache.has('h')).toBe(true)
  })

  it('keys lists all keys', async () => {
    await cache.set('k1', 1)
    await cache.set('k2', 2)
    const keys = await cache.keys()
    expect(keys).toEqual(expect.arrayContaining(['k1', 'k2']))
    expect(keys).toHaveLength(2)
  })

  it('cleanup removes expired rows', async () => {
    await cache.set('old', 1, { staleTime: 1 })
    await new Promise((r) => setTimeout(r, 20))
    await cache.cleanup()
    expect(await cache.get('old')).toBeUndefined()
  })
})
