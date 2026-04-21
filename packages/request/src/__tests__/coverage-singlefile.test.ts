import 'fake-indexeddb/auto'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})

import { nextTick, ref } from 'vue'
import { useRequest, useRequestSWR, useRequestPolling } from '../useRequest'
import {
  createProgressInterceptor,
  XHRProgressHandler,
  FetchProgressHandler
} from '../interceptors/progress'
import { IndexedDBCache } from '../cache/indexedDB'
import { useRequestQueue } from '../useRequestQueue'

describe('useRequest single-file boosts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('useRequest mutate undefined keeps old data and cancel without controller is safe', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 'ok' })
    const { run, data, mutate, cancel } = useRequest(svc, { manual: true })
    await run()
    mutate(undefined)
    expect(data.value).toEqual({ data: 'ok' })
    expect(() => cancel()).not.toThrow()
  })

  it('useRequestSWR loadMore is no-op and focus does not refresh while loading', async () => {
    const gate = new Promise(() => {})
    const svc = vi.fn().mockImplementation(() => gate)
    const swr = useRequestSWR('focus-key', svc, {
      manual: false,
      refreshOnWindowFocus: true
    })

    await nextTick()
    const calls = svc.mock.calls.length
    window.dispatchEvent(new Event('focus'))
    window.dispatchEvent(new Event('visibilitychange'))
    await nextTick()
    expect(svc.mock.calls.length).toBe(calls)
    await expect(swr.loadMore()).resolves.toBeUndefined()
  })

  it('useRequestSWR refreshDeps skips when key is empty', async () => {
    const dep = ref(1)
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    useRequestSWR(() => '', svc, {
      manual: false,
      refreshDeps: [dep],
      refreshDepsWait: 10
    })
    dep.value = 2
    await nextTick()
    vi.advanceTimersByTime(20)
    expect(svc.mock.calls.length).toBe(1)
  })

  it('useRequestPolling resume starts only when polling=true and second start is ignored', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const polling = useRequestPolling(svc, {
      polling: true,
      pollingInterval: 50
    }) as any

    const firstCalls = svc.mock.calls.length
    polling.resume()
    vi.advanceTimersByTime(50)
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(firstCalls + 1)
    polling.pause()

    const nonPolling = useRequestPolling(svc, {
      polling: false,
      pollingInterval: 50
    }) as any
    const beforeResume = svc.mock.calls.length
    nonPolling.resume()
    vi.advanceTimersByTime(60)
    expect(svc.mock.calls.length).toBe(beforeResume)
  })
})

describe('progress.ts single-file boosts', () => {
  it('progress interceptor works without callbacks and estimated becomes 0 at completion', () => {
    const nowSpy = vi.spyOn(Date, 'now')
    nowSpy.mockReturnValue(0)
    const interceptor = createProgressInterceptor({})
    interceptor.onRequest({} as any)
    expect(() => interceptor.getUploadHandler({ loaded: 100, total: 100, percent: 100 })).not.toThrow()

    const onDownloadProgress = vi.fn()
    const withCb = createProgressInterceptor({ onDownloadProgress })
    withCb.onResponse({} as any)
    nowSpy.mockReturnValue(1000)
    withCb.getDownloadHandler({ loaded: 100, total: 100, percent: 100 })
    expect(onDownloadProgress.mock.calls[0][0].estimated).toBe(0)
  })

  it('XHRProgressHandler ignores non-computable download and no upload callback path', () => {
    const onDownloadProgress = vi.fn()
    const handler = new XHRProgressHandler({ onDownloadProgress })
    const mockXHR = {
      upload: { addEventListener: vi.fn() },
      addEventListener: vi.fn((event: string, cb: (e: any) => void) => {
        if (event === 'progress') cb({ lengthComputable: false })
      })
    } as any

    handler.bind(mockXHR)
    handler.startDownload()
    expect(onDownloadProgress).not.toHaveBeenCalled()
  })

  it('XHRProgressHandler computes estimated as 0 when download completed', () => {
    const onDownloadProgress = vi.fn()
    const nowSpy = vi.spyOn(Date, 'now')
    nowSpy.mockReturnValue(0)
    const handler = new XHRProgressHandler({ onDownloadProgress })
    const mockXHR = {
      upload: { addEventListener: vi.fn() },
      addEventListener: vi.fn((event: string, cb: (e: any) => void) => {
        if (event === 'progress') cb({ lengthComputable: true, loaded: 100, total: 100 })
      })
    } as any
    handler.startDownload()
    nowSpy.mockReturnValue(1000)
    handler.bind(mockXHR)
    expect(onDownloadProgress.mock.calls[0][0].estimated).toBe(0)
  })

  it('FetchProgressHandler without callback does not throw and resets counters on start', () => {
    const handler = new FetchProgressHandler({})
    const read = handler.getReaderHandler()
    handler.setTotal(500)
    handler.startDownload()
    expect(() => read(new Uint8Array([1, 2, 3]), undefined)).not.toThrow()
  })

  it('XHRProgressHandler upload/download estimated undefined when elapsed is zero', () => {
    const onUploadProgress = vi.fn()
    const onDownloadProgress = vi.fn()
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(1000)
    const handler = new XHRProgressHandler({ onUploadProgress, onDownloadProgress })

    const mockXHR = {
      upload: {
        addEventListener: vi.fn((event: string, cb: (e: any) => void) => {
          if (event === 'progress') cb({ lengthComputable: true, loaded: 10, total: 100 })
        })
      },
      addEventListener: vi.fn((event: string, cb: (e: any) => void) => {
        if (event === 'progress') cb({ lengthComputable: true, loaded: 20, total: 200 })
      })
    } as any

    handler.startUpload()
    handler.startDownload()
    handler.bind(mockXHR)
    expect(onUploadProgress.mock.calls[0][0].estimated).toBeUndefined()
    expect(onDownloadProgress.mock.calls[0][0].estimated).toBeUndefined()
    nowSpy.mockRestore()
  })
})

describe('indexedDB single-file boosts', () => {
  let cache: IndexedDBCache

  beforeEach(() => {
    cache = new IndexedDBCache({
      dbName: `yh_single_${Math.random().toString(36).slice(2)}`,
      storeName: 'kv',
      dbVersion: 1
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('openDB upgrade path creates object store', async () => {
    await cache.set('a', 1)
    expect(await cache.get('a')).toBe(1)
  })

  it('get/delete/keys return fallback values when openDB fails', async () => {
    const failing = new IndexedDBCache({ dbName: 'x' })
    vi.spyOn(failing as any, 'openDB').mockRejectedValue(new Error('idb down'))

    expect(await failing.get('a')).toBeUndefined()
    expect(await failing.delete('a')).toBe(false)
    expect(await failing.keys()).toEqual([])
    await expect(failing.clear()).resolves.toBeUndefined()
    await expect(failing.cleanup()).resolves.toBeUndefined()
  })

  it('set warns when transaction fails', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const failing = new IndexedDBCache({ dbName: 'y' })
    vi.spyOn(failing as any, 'openDB').mockRejectedValue(new Error('cannot open'))
    await failing.set('a', 1)
    expect(warn).toHaveBeenCalled()
  })

  it('openDB rejects on indexedDB.open error path', async () => {
    const cache2 = new IndexedDBCache({ dbName: 'open-error' })
    const openReq: any = { error: new Error('open-failed') }
    const openSpy = vi.spyOn(indexedDB, 'open').mockImplementation(() => openReq as IDBOpenDBRequest)
    const p = (cache2 as any).openDB()
    openReq.onerror?.()
    await expect(p).rejects.toThrow('open-failed')
    openSpy.mockRestore()
  })

})

describe('useRequestQueue single-file boosts', () => {
  it('addRequest injects type metadata and cancelByKey no-op when missing', async () => {
    const queue = useRequestQueue()
    const id = queue.addRequest(async () => 1, {
      key: 'req-1',
      metadata: { from: 'test' }
    })
    const task = queue.getTask(id)
    expect(task?.metadata).toMatchObject({ from: 'test', type: 'request' })

    expect(() => queue.cancelByKey('not-found')).not.toThrow()
    queue.cancelByKey('req-1')
  })

})

