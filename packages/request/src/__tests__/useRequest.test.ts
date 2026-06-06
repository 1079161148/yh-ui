import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})
import { nextTick } from 'vue'
import { useRequest, useRequestSWR, useRequestPolling } from '../useRequest'

describe('useRequest', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should initialize with default state', () => {
    const mockService = vi.fn().mockResolvedValue({ data: 'success' })
    const { loading, data, error, params } = useRequest(mockService, { manual: true })

    expect(loading.value).toBe(false)
    expect(data.value).toBeUndefined()
    expect(error.value).toBeUndefined()
    expect(params.value).toEqual([])
  })

  it('should execute automatically when manual is false', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: 'success' })
    const { data } = useRequest(mockService, { manual: false, defaultParams: [1] })

    // onMounted mocks in vitest environment could vary, manually resolve promises inside component
    await nextTick()

    expect(mockService).toHaveBeenCalledWith(1)
  })

  it('should update state during and after run', async () => {
    const mockService = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: 'done' }), 100))
      )
    const { loading, data, run } = useRequest(mockService, { manual: true })

    const promise = run().catch(() => {})
    expect(loading.value).toBe(true)

    vi.advanceTimersByTime(100)
    await promise

    expect(loading.value).toBe(false)
    expect(data.value).toEqual({ data: 'done' })
  })

  it('should call onSuccess and onFinally on success', async () => {
    const onSuccess = vi.fn()
    const onFinally = vi.fn()
    const mockService = vi.fn().mockResolvedValue({ data: 'ok' })

    const { run } = useRequest(mockService, { manual: true, onSuccess, onFinally })
    await run().catch(() => {})

    expect(onSuccess).toHaveBeenCalledWith({ data: 'ok' }, [])
    expect(onFinally).toHaveBeenCalledWith([])
  })

  it('should call onError and onFinally on failure', async () => {
    const onError = vi.fn()
    const onFinally = vi.fn()
    const errorObj = new Error('failed')
    const mockService = vi.fn().mockRejectedValue(errorObj)

    const { run, error } = useRequest(mockService, { manual: true, onError, onFinally })
    try {
      await run(123)
    } catch {}

    expect(error.value).toBe(errorObj)
    expect(onError).toHaveBeenCalledWith(errorObj, [123])
    expect(onFinally).toHaveBeenCalledWith([123])
  })

  it('should format result', async () => {
    const mockService = vi.fn().mockResolvedValue({ raw: 'data' })
    const formatResult = (res: any) => res.raw + '-formatted'

    const { run, data } = useRequest(mockService, { manual: true, formatResult })
    await run().catch(() => {})

    expect(data.value).toBe('data-formatted')
  })

  it('can mutate data', () => {
    const { data, mutate } = useRequest(vi.fn(), { manual: true })
    mutate('new value')
    expect(data.value).toBe('new value')

    mutate((prev: any) => prev + ' + more')
    expect(data.value).toBe('new value + more')
  })

  it('can cancel ongoing request', async () => {
    const mockService = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: 'done' }), 100))
      )
    const { run, cancel, loading } = useRequest(mockService, { manual: true })

    const promise = run().catch(() => {}) // Add catch for expected cancellation
    expect(loading.value).toBe(true)

    cancel()
    expect(loading.value).toBe(false)

    vi.advanceTimersByTime(100)

    try {
      await promise
    } catch (e: any) {
      expect(e.isCanceled).toBe(true)
    }
  })

  it('supports debouncing', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: 'ok' })
    const { run } = useRequest(mockService, { manual: true, debounceWait: 200 })

    const r1 = run(1)
    if (r1 instanceof Promise) r1.catch(() => {})
    const r2 = run(2)
    if (r2 instanceof Promise) r2.catch(() => {})
    const r3 = run(3)
    if (r3 instanceof Promise) r3.catch(() => {})

    vi.advanceTimersByTime(100)
    expect(mockService).not.toHaveBeenCalled()

    vi.advanceTimersByTime(150)
    // debounced function might handle promises differently, but service should be called once with last arg
    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith(3)
  })
})

describe('useRequestSWR', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('initializes and caches data', async () => {
    const setCache = vi.fn()
    const mockService = vi.fn().mockResolvedValue({ data: 'cached-data' })

    const { run, data } = useRequestSWR('test-key', mockService, { manual: true, setCache })
    await run('test-key')

    expect(data.value).toEqual({ data: 'cached-data' })
    // the watch gets triggered
    await nextTick()
    expect(setCache).toHaveBeenCalledWith('test-key', { data: 'cached-data' })
  })
})

describe('useRequestPolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('starts polling and can be paused', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: 'poll' })
    const { pause, resume, isPolling } = useRequestPolling(mockService, {
      manual: true,
      polling: true,
      pollingInterval: 1000
    }) as any

    // Manual trigger start via resume/mount
    resume()

    // Should execute immediately
    expect(mockService).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1000)
    expect(mockService).toHaveBeenCalledTimes(2)

    pause()
    vi.advanceTimersByTime(1000)
    expect(mockService).toHaveBeenCalledTimes(2) // No more calls
  })
})
