import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IndexedDBAdapter, APIClient } from '..'

// Mock IndexedDB more carefully
const mockIndexedDB = () => {
  const createReq = () => ({
    onsuccess: null as any,
    onerror: null as any,
    result: null as any,
    error: null as any
  })

  const storeHandlers: any = {
    get: createReq(),
    put: createReq(),
    delete: createReq(),
    clear: createReq()
  }

  const db: any = {
    objectStoreNames: {
      contains: vi.fn().mockReturnValue(true)
    },
    createObjectStore: vi.fn(),
    transaction: vi.fn().mockReturnValue({
      objectStore: vi.fn().mockImplementation(() => ({
        get: vi.fn().mockReturnValue(storeHandlers.get),
        put: vi.fn().mockReturnValue(storeHandlers.put),
        delete: vi.fn().mockReturnValue(storeHandlers.delete),
        clear: vi.fn().mockReturnValue(storeHandlers.clear)
      }))
    })
  }

  const openRequest: any = { onsuccess: null, onerror: null, onupgradeneeded: null }

  vi.stubGlobal('indexedDB', {
    open: vi.fn().mockReturnValue(openRequest)
  })

  return { db, openRequest, storeHandlers }
}

describe('IndexedDBAdapter', () => {
  it('should initialize and open DB and handle upgrade', async () => {
    const { db, openRequest, storeHandlers } = mockIndexedDB()
    const adapter = new IndexedDBAdapter('test-db', 'test-store')

    // Test upgrade path
    vi.mocked(db.objectStoreNames.contains).mockReturnValue(false)

    const p = adapter.get('key')
    await Promise.resolve()

    if (openRequest.onupgradeneeded) {
      openRequest.onupgradeneeded({ target: { result: db } })
    }
    expect(db.createObjectStore).toHaveBeenCalledWith('test-store', { keyPath: 'key' })

    openRequest.result = db
    if (openRequest.onsuccess) openRequest.onsuccess()

    // Allow getDB to resolve and get() to be called
    await Promise.resolve()
    await Promise.resolve()

    if (storeHandlers.get.onsuccess) {
      storeHandlers.get.result = { value: 'val' }
      storeHandlers.get.onsuccess()
    }

    const res = await p
    expect(res).toBe('val')
  })

  it('should handle set, remove, clear', async () => {
    const { db, openRequest, storeHandlers } = mockIndexedDB()
    const adapter = new IndexedDBAdapter()

    const p1 = adapter.set('k', 'v')
    await Promise.resolve()
    openRequest.result = db
    if (openRequest.onsuccess) openRequest.onsuccess()

    await Promise.resolve()
    await Promise.resolve()
    if (storeHandlers.put.onsuccess) storeHandlers.put.onsuccess()
    await p1

    const p2 = adapter.remove('k')
    await Promise.resolve()
    if (storeHandlers.delete.onsuccess) storeHandlers.delete.onsuccess()
    await p2

    const p3 = adapter.clear()
    await Promise.resolve()
    if (storeHandlers.clear.onsuccess) storeHandlers.clear.onsuccess()
    await p3
  })
})

describe('APIClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should handle get', async () => {
    const client = new APIClient('http://api.com', { Authorization: 'Bearer token' })

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' })
    } as any)

    const next = await client.get('key')
    expect(next).toEqual({ data: 'test' })
    expect(fetch).toHaveBeenCalledWith('http://api.com/storage/key', expect.any(Object))
  })

  it('should throw on non-ok response in get (except 404)', async () => {
    const client = new APIClient('http://api.com')
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as any)
    await expect(client.get('key')).rejects.toThrow('HTTP 500')
  })

  it('should handle 404 in get', async () => {
    const client = new APIClient('http://api.com')
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 404 } as any)
    const res = await client.get('key')
    expect(res).toBeNull()
  })

  it('should handle set, remove, clear', async () => {
    const client = new APIClient('http://api.com')
    vi.mocked(fetch).mockResolvedValue({ ok: true } as any)

    await client.set('k', 'v')
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'PUT' })
    )

    await client.remove('k')
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'DELETE' })
    )

    await client.clear()
    expect(fetch).toHaveBeenCalledWith(
      'http://api.com/storage',
      expect.objectContaining({ method: 'DELETE' })
    )

    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 400 } as any)
    await expect(client.set('k', 'v')).rejects.toThrow('HTTP 400')

    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 500 } as any)
    await expect(client.remove('k')).rejects.toThrow('HTTP 500')

    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 403 } as any)
    await expect(client.clear()).rejects.toThrow('HTTP 403')
  })
})
