/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { HttpCache, parseCacheControl } from '../http-cache'

// Mock Response and Headers for Node environment
if (typeof Response === 'undefined') {
  vi.stubGlobal(
    'Response',
    class {
      headers = new Headers()
      constructor(
        public body: any,
        public init?: any
      ) {
        if (init?.headers) {
          Object.entries(init.headers).forEach(([k, v]) => this.headers.set(k, v as string))
        }
      }
    }
  )
}
if (typeof Headers === 'undefined') {
  vi.stubGlobal(
    'Headers',
    class {
      private h = new Map<string, string>()
      set(k: string, v: string) {
        this.h.set(k.toLowerCase(), v)
      }
      get(k: string) {
        return this.h.get(k.toLowerCase()) || null
      }
    }
  )
}

describe('HttpCache SSR Compatibility', () => {
  it('should initialize HttpCache without browser database', () => {
    const cache = new HttpCache()
    expect(cache).toBeDefined()
    expect(cache.size()).toBe(0)
  })

  it('should generate conditional headers correctly in Node', () => {
    const cache = new HttpCache()

    // 构建一个符合 Response 接口的 Mock 对象
    const mockResponse = new Response('data', {
      headers: {
        ETag: '"abc"',
        'Last-Modified': 'Wed, 21 Oct 2015 07:28:00 GMT'
      }
    })

    // 使用构建好的 mockResponse
    cache.set('GET:http://localhost/api', 'data', mockResponse as any)

    const headers = cache.buildConditionalHeaders({
      method: 'GET',
      url: 'http://localhost/api',
      fullPath: 'http://localhost/api',
      headers: {}
    } as any)

    expect(headers['If-None-Match']).toBe('"abc"')
    expect(headers['If-Modified-Since']).toBe('Wed, 21 Oct 2015 07:28:00 GMT')
  })

  it('parseCacheControl should work in SSR', () => {
    const result = parseCacheControl('no-cache, max-age=10')
    expect(result.noCache).toBe(true)
    expect(result.maxAge).toBe(10)
  })
})
