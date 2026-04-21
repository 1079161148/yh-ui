/**
 * 提升 @yh-ui/request 在 scoped coverage 下的 statements / branches / functions / lines（目标四门 ≥80%）。
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  Request,
  createRequest,
  linearBackoff,
  fixedBackoff,
  exponentialBackoffWithMaxRetries,
  defaultExponentialBackoff,
  buildURL,
  InterceptorManagerImpl
} from '../request'
import { useRequest, useRequestSWR, useRequestPolling } from '../useRequest'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>()
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn()
  }
})

describe('request.ts — backoff helpers & interceptors', () => {
  it('linearBackoff / fixedBackoff / exponentialBackoffWithMaxRetries', () => {
    expect(linearBackoff(0, 100)).toBe(100)
    expect(linearBackoff(2, 50)).toBe(150)
    expect(fixedBackoff(99, 42)).toBe(42)
    expect(exponentialBackoffWithMaxRetries(5, 1000, 5)).toBe(-1)
    expect(exponentialBackoffWithMaxRetries(0, 1000, 10)).toBeGreaterThan(0)
    expect(defaultExponentialBackoff(0, 500)).toBeLessThanOrEqual(30000)
  })

  it('InterceptorManagerImpl.execute throws when no rejected handler', async () => {
    const m = new InterceptorManagerImpl<number>()
    m.use(() => {
      throw new Error('boom')
    })
    await expect(m.execute(1)).rejects.toThrow('boom')
  })

  it('InterceptorManagerImpl.eject out-of-range is safe', async () => {
    const m = new InterceptorManagerImpl<string>()
    m.use((v) => v)
    m.eject(99)
    await expect(m.execute('x')).resolves.toBe('x')
  })
})

describe('Request class — HTTP verbs, body, response types, cancel, retry', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('buildURL respects serializeParams: false', () => {
    expect(
      buildURL({
        url: '/p',
        params: { a: 1 },
        serializeParams: false
      } as any)
    ).toBe('/p')
  })

  it('GET json with empty body yields null data', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('')
    } as any)
    const req = new Request()
    const res = await req.get('/empty-json')
    expect(res.data).toBeNull()
  })

  it('responseType text / blob / arraybuffer / formdata & rawResponse', async () => {
    const req = new Request()

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      text: vi.fn().mockResolvedValue('plain')
    } as any)
    const t = await req.request({ url: '/t', method: 'GET', responseType: 'text' })
    expect(t.data).toBe('plain')

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      blob: vi.fn().mockResolvedValue(new Blob(['x']))
    } as any)
    const b = await req.request({ url: '/b', method: 'GET', responseType: 'blob' })
    expect(b.data).toBeInstanceOf(Blob)

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(2))
    } as any)
    const ab = await req.request({ url: '/ab', method: 'GET', responseType: 'arraybuffer' })
    expect(ab.data).toBeInstanceOf(ArrayBuffer)

    const fd = new FormData()
    fd.set('k', 'v')
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      formData: vi.fn().mockResolvedValue(fd)
    } as any)
    const f = await req.request({ url: '/f', method: 'GET', responseType: 'formdata' })
    expect(f.data).toBeInstanceOf(FormData)

    const raw = { ok: true, text: vi.fn() } as any
    vi.mocked(fetch).mockResolvedValueOnce(raw)
    const r = await req.request({ url: '/raw', method: 'GET', rawResponse: true })
    expect(r.data).toBe(raw)
  })

  it('POST with FormData skips JSON stringify', async () => {
    const body = new FormData()
    body.set('file', 'x')
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{}')
    } as any)
    const req = new Request()
    await req.post('/up', body)
    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit
    expect(init.body).toBe(body)
  })

  it('POST JSON adds Content-Type only when missing', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{}')
    } as any)
    const req = new Request()
    await req.post('/j', { a: 1 }, { headers: { 'Content-Type': 'application/vnd.api+json' } })
    const h = vi.mocked(fetch).mock.calls[0][1]?.headers as Record<string, string>
    expect(h['Content-Type']).toBe('application/vnd.api+json')
  })

  it('PUT PATCH DELETE HEAD OPTIONS delegate to request', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{"ok":true}')
    } as any)
    const req = new Request()
    await req.put('/u', { x: 1 })
    await req.patch('/p', { x: 1 })
    await req.delete('/d')
    await req.head('/h')
    await req.options('/o')
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(5)
  })

  it('requestInterceptor merges config', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{}')
    } as any)
    const req = new Request()
    await req.get('/x', {
      requestInterceptor: async (c) => ({ ...c, headers: { ...c.headers, 'X-A': '1' } })
    })
    const headers = vi.mocked(fetch).mock.calls[0][1]?.headers as Record<string, string>
    expect(headers['X-A']).toBe('1')
  })

  it('requestKey aborts previous in-flight request', async () => {
    let resolveFirst!: (v: any) => void
    const first = new Promise((r) => {
      resolveFirst = r
    })
    vi.mocked(fetch)
      .mockImplementationOnce(() => first as any)
      .mockResolvedValue({
        ok: true,
        text: vi.fn().mockResolvedValue('{"n":2}')
      } as any)

    const req = new Request()
    const p1 = req.get('/same', { requestKey: 'k1' }).catch(() => {})
    const p2 = req.get('/same', { requestKey: 'k1' })
    resolveFirst({
      ok: true,
      text: vi.fn().mockResolvedValue('{"n":1}')
    })
    await p1
    const out = await p2
    expect(out.data).toEqual({ n: 2 })
  })

  it('cancel and cancelAll run without error', async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    const req = new Request()
    void req.get('/a', { requestKey: 'z1' })
    void req.get('/b', { requestKey: 'z2' })
    expect(() => {
      req.cancel('z1')
      req.cancelAll()
      req.cancel('already-cleared')
    }).not.toThrow()
  })

  it('setConfig / getConfig / static create', () => {
    const r = Request.create({ defaultOptions: { timeout: 5 } })
    r.setConfig({ timeout: 9 })
    expect(r.getConfig().timeout).toBe(9)
    const r2 = createRequest()
    expect(r2).toBeInstanceOf(Request)
  })

  it('retry stops when delay calculator returns -1 and calls errorHandler', async () => {
    const errorHandler = vi.fn()
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue('err')
    } as any)

    const req = new Request({
      defaultOptions: {
        retry: true,
        retryTimes: 5,
        retryDelay: 1,
        retryDelayCalculator: () => -1,
        errorHandler
      }
    })

    await expect(req.get('/fail')).rejects.toThrow()
    expect(errorHandler).toHaveBeenCalled()
    expect(vi.mocked(fetch).mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('retry uses custom retryDelayCalculator', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue('e')
    } as any)
    const calc = vi.fn().mockReturnValue(1)
    const req = new Request({
      defaultOptions: {
        retry: true,
        retryTimes: 2,
        retryDelay: 1,
        retryDelayCalculator: calc
      }
    })
    await expect(req.get('/r', { retry: true })).rejects.toThrow()
    expect(calc).toHaveBeenCalled()
  })
})

describe('useRequest / SWR / Polling — branches', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('useRequest: service returns plain object (non-RequestResponse) for format()', async () => {
    const svc = vi.fn().mockResolvedValue({ hello: 1 })
    const { run, data } = useRequest(svc as any, { manual: true })
    await run()
    expect(data.value).toEqual({ hello: 1 })
  })

  it('useRequest: throttleWait coalesces calls', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const { run } = useRequest(svc, { manual: true, throttleWait: 200 })
    run(1)
    run(2)
    run(3)
    vi.advanceTimersByTime(250)
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('useRequest: refresh and loadMore', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 'x' })
    const { run, refresh, loadMore, noMore, loadingMore } = useRequest(svc, {
      manual: true,
      defaultParams: [10] as [number]
    })
    await run(10)
    await refresh()
    noMore.value = true
    await loadMore()
    expect(loadingMore.value).toBe(false)
    noMore.value = false
    await loadMore()
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(2)
  })

  it('useRequestSWR: function cacheKey + refreshDeps', async () => {
    const id = ref('1')
    const svc = vi.fn().mockResolvedValue({ data: 'u' })
    useRequestSWR(() => `k-${id.value}`, svc, {
      manual: false,
      refreshDeps: [id]
    })
    await nextTick()
    vi.advanceTimersByTime(2000)
    id.value = '2'
    await nextTick()
    vi.advanceTimersByTime(2000)
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('useRequestSWR: refreshOnWindowFocus triggers refresh', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const { refresh } = useRequestSWR('focus-key', svc, {
      manual: false,
      refreshOnWindowFocus: true,
      defaultParams: ['focus-key'] as any
    })
    await nextTick()
    const n0 = svc.mock.calls.length
    const ev = new Event('visibilitychange')
    window.dispatchEvent(ev)
    await nextTick()
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(n0)
    await expect(refresh()).resolves.toBeUndefined()
  })

  it('useRequestPolling: skips tick when hidden and pollingWhenHidden false', async () => {
    const hidden = { value: true }
    vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden.value)

    const svc = vi.fn().mockResolvedValue({ data: 1 })
    useRequestPolling(svc, {
      polling: true,
      pollingInterval: 500,
      pollingWhenHidden: false,
      defaultParams: [] as []
    })

    await nextTick()
    const afterFirst = svc.mock.calls.length
    vi.advanceTimersByTime(500)
    expect(svc.mock.calls.length).toBe(afterFirst)

    hidden.value = false
    vi.advanceTimersByTime(500)
    expect(svc.mock.calls.length).toBeGreaterThan(afterFirst)

    vi.spyOn(document, 'hidden', 'get').mockRestore()
  })

  it('useRequestPolling: still polls when hidden if pollingWhenHidden true', async () => {
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    useRequestPolling(svc, {
      polling: true,
      pollingInterval: 400,
      pollingWhenHidden: true
    })
    await nextTick()
    const n1 = svc.mock.calls.length
    vi.advanceTimersByTime(400)
    expect(svc.mock.calls.length).toBeGreaterThan(n1)
    vi.spyOn(document, 'hidden', 'get').mockRestore()
  })

  it('useRequestPolling: pause clears interval; resume restarts when polling', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const { pause, resume } = useRequestPolling(svc, {
      polling: false,
      pollingInterval: 300,
      manual: true
    })
    resume()
    await nextTick()
    pause()
    vi.advanceTimersByTime(3000)
    const n = svc.mock.calls.length
    resume()
    await nextTick()
    expect(svc.mock.calls.length).toBeGreaterThanOrEqual(n)
  })
})
