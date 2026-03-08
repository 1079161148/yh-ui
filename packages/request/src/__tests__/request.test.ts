import { describe, it, expect, vi, beforeEach } from 'vitest'
import request, {
  Request,
  generateRequestId,
  serializeParams,
  buildURL,
  createRequestError,
  InterceptorManagerImpl
} from '../request'

describe('generateRequestId', () => {
  it('should generate unique ids', () => {
    const id1 = generateRequestId()
    const id2 = generateRequestId()
    expect(id1).not.toBe(id2)
    expect(id1).toMatch(/^req_\d+_\d+$/)
  })
})

describe('serializeParams', () => {
  it('should serialize simple object', () => {
    expect(serializeParams({ a: 1, b: 'two' })).toBe('a=1&b=two')
  })
  it('should serialize array values correctly', () => {
    expect(serializeParams({ a: [1, 2] })).toBe('a=1&a=2')
  })
  it('should stringify object values', () => {
    expect(serializeParams({ a: { foo: 'bar' } } as any)).toBe('a=%7B%22foo%22%3A%22bar%22%7D')
  })
  it('should ignore null and undefined', () => {
    expect(serializeParams({ a: 1, b: null, c: undefined, d: '' })).toBe('a=1&d=')
  })
})

describe('buildURL', () => {
  it('should combine baseURL and url', () => {
    expect(buildURL({ baseURL: 'https://api.com', url: '/test' })).toBe('https://api.com/test')
  })
  it('should not add baseURL if url is absolute', () => {
    expect(buildURL({ baseURL: 'https://api.com', url: 'http://test.com/path' })).toBe(
      'http://test.com/path'
    )
  })
  it('should append serialized params', () => {
    expect(buildURL({ url: '/test', params: { a: 1 } })).toBe('/test?a=1')
  })
  it('should handle existing query strings', () => {
    expect(buildURL({ url: '/test?b=2', params: { a: 1 } })).toBe('/test?b=2&a=1')
  })
})

describe('createRequestError', () => {
  it('should handle string error', () => {
    const err = createRequestError('test error')
    expect(err.message).toBe('test error')
  })
  it('should detect network error from TypeError containing fetch', () => {
    const err = createRequestError(new TypeError('Failed to fetch'))
    expect(err.isNetworkError).toBe(true)
    expect(err.code).toBe('NETWORK_ERROR')
  })
  it('should detect abort signal', () => {
    const signal = new AbortController().signal
    const err = createRequestError(new Error('abort'), { signal: { aborted: true } as AbortSignal })
    expect(err.isCanceled).toBe(true)
    expect(err.code).toBe('CANCELED')
  })
  it('should set http code from response', () => {
    const err = createRequestError(new Error('http'), {}, { status: 404 } as Response)
    expect(err.code).toBe('HTTP_404')
  })
})

describe('InterceptorManagerImpl', () => {
  it('should execute handlers in order', async () => {
    const manager = new InterceptorManagerImpl<string>()
    manager.use((val) => val + '1')
    manager.use((val) => val + '2')
    const result = await manager.execute('0')
    expect(result).toBe('012')
  })
  it('should handle rejected handlers', async () => {
    const manager = new InterceptorManagerImpl<string>()
    manager.use(
      () => {
        throw new Error('fail')
      },
      () => 'recovered'
    )
    const result = await manager.execute('val')
    expect(result).toBe('recovered')
  })
  it('should eject handler correctly', async () => {
    const manager = new InterceptorManagerImpl<string>()
    manager.use((val) => val + '1')
    const id = manager.use((val) => val + '2')
    manager.eject(id)
    const result = await manager.execute('0')
    expect(result).toBe('01')
  })
})

describe('Request Class', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should create instance with defaults', () => {
    const req = new Request({ defaultOptions: { timeout: 100 } })
    expect(req.defaults.timeout).toBe(100)
  })

  it('can make GET request successfully', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ a: 1 }),
      text: vi.fn().mockResolvedValue('{"a":1}')
    }
    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const res = await request.get('/api')
    expect(fetch).toHaveBeenCalled()
    expect(res.data).toEqual({ a: 1 })
    expect(res.response).toBe(mockResponse)
  })

  it('can make POST request with JSON payload', async () => {
    const mockResponse = { ok: true, text: vi.fn().mockResolvedValue('{"success":true}') }
    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    await request.post('/api', { key: 'value' })
    const fetchCall = vi.mocked(fetch).mock.calls[0]
    expect(fetchCall[1]?.body).toBe('{"key":"value"}')
    expect((fetchCall[1]?.headers as Record<string, string>)['Content-Type']).toBe(
      'application/json'
    )
  })

  it('can configure request retry', async () => {
    const mockResponseError = {
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue('Server Error')
    }
    vi.mocked(fetch).mockResolvedValue(mockResponseError as any)

    try {
      await request.get('/api', { retry: true, retryTimes: 1, retryDelay: 10 })
    } catch {
      // Expected to throw
    }

    // Initial call + 1 retry
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('throws request error on non-ok status', async () => {
    const mockResponseError = {
      ok: false,
      status: 404,
      text: vi.fn().mockResolvedValue('Not Found')
    }
    vi.mocked(fetch).mockResolvedValue(mockResponseError as any)

    await expect(request.get('/api')).rejects.toThrow()
  })

  it('supports interceptors', async () => {
    const mockResponse = { ok: true, text: vi.fn().mockResolvedValue('{"res":1}') }
    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const reqInstance = new Request()
    reqInstance.interceptors.request.use((config) => {
      config.headers = { ...config.headers, 'X-Test': '1' }
      return config
    })

    await reqInstance.get('/api')
    const fetchCall = vi.mocked(fetch).mock.calls[0]
    expect((fetchCall[1]?.headers as Record<string, string>)['X-Test']).toBe('1')
  })
})
