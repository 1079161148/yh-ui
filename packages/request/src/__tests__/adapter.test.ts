import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FetchAdapter, XHRAdapter, getDefaultAdapter } from '../adapters/fetch'

describe('Adapters', () => {
  describe('FetchAdapter', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn())
    })

    it('should be supported if fetch is present', () => {
      const adapter = new FetchAdapter()
      expect(adapter.isSupported()).toBe(true)
    })

    it('should make a request', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ data: 'ok' })),
        headers: new Headers()
      })

      const adapter = new FetchAdapter()
      const result = await adapter.request({
        url: '/api',
        method: 'GET',
        requestId: '1'
      } as any)

      expect(result.data).toEqual({ data: 'ok' })
    })

    it('serializes non-FormData body and sets Content-Type', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('null'),
        headers: new Headers()
      })
      global.fetch = fetchMock as any

      const adapter = new FetchAdapter()
      await adapter.request({
        fullPath: 'http://localhost/api',
        method: 'POST',
        data: { a: 1 },
        headers: {},
        requestId: '2'
      } as any)

      const init = fetchMock.mock.calls[0][1] as RequestInit
      expect(init.body).toBe(JSON.stringify({ a: 1 }))
      expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json')
    })

    it('passes FormData and URLSearchParams through', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(''),
        headers: new Headers()
      })
      global.fetch = fetchMock as any

      const adapter = new FetchAdapter()
      const fd = new FormData()
      fd.append('x', 'y')
      await adapter.request({
        fullPath: 'http://localhost/fd',
        method: 'POST',
        data: fd,
        requestId: '3'
      } as any)

      const sp = new URLSearchParams('a=b')
      await adapter.request({
        fullPath: 'http://localhost/sp',
        method: 'POST',
        data: sp,
        requestId: '4'
      } as any)

      expect((fetchMock.mock.calls[0][1] as RequestInit).body).toBe(fd)
      expect((fetchMock.mock.calls[1][1] as RequestInit).body).toBe(sp)
    })

    it('parses responseType text', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve('plain-text')
      })
      const adapter = new FetchAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/r',
        method: 'GET',
        responseType: 'text',
        requestId: 'rt1'
      } as any)
      expect(result.data).toBe('plain-text')
    })

    it('parses responseType blob', async () => {
      const blob = new Blob(['x'])
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve(''),
        blob: () => Promise.resolve(blob)
      })
      const adapter = new FetchAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/r',
        method: 'GET',
        responseType: 'blob',
        requestId: 'rt2'
      } as any)
      expect(result.data).toBe(blob)
    })

    it('parses responseType arraybuffer', async () => {
      const buf = new ArrayBuffer(8)
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve(''),
        arrayBuffer: () => Promise.resolve(buf)
      })
      const adapter = new FetchAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/r',
        method: 'GET',
        responseType: 'arraybuffer',
        requestId: 'rt3'
      } as any)
      expect(result.data).toBe(buf)
    })

    it('parses responseType formdata', async () => {
      const fd = new FormData()
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve(''),
        formData: () => Promise.resolve(fd)
      })
      const adapter = new FetchAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/r',
        method: 'GET',
        responseType: 'formdata',
        requestId: 'rt4'
      } as any)
      expect(result.data).toBe(fd)
    })

    it('rejects when fetch throws', async () => {
      ;(global.fetch as any).mockRejectedValue(new TypeError('Failed to fetch'))
      const adapter = new FetchAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://localhost/err',
          method: 'GET',
          requestId: 'fe1'
        } as any)
      ).rejects.toThrow()
    })

    it('rejects when JSON response body is invalid', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve('{ not-json')
      })
      const adapter = new FetchAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://localhost/badjson',
          method: 'GET',
          requestId: 'fe2'
        } as any)
      ).rejects.toThrow()
    })

    it('returns null for empty JSON body on default json parsing', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve('')
      })
      const adapter = new FetchAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/empty',
        method: 'GET',
        requestId: 'fe3'
      } as any)
      expect(result.data).toBeNull()
    })

    it('keeps existing Content-Type when serializing JSON body', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers(),
        text: () => Promise.resolve('null')
      })
      global.fetch = fetchMock as any
      const adapter = new FetchAdapter()
      const headers = { 'Content-Type': 'application/vnd.api+json' }
      await adapter.request({
        fullPath: 'http://localhost/ct',
        method: 'POST',
        data: { x: 1 },
        headers,
        requestId: 'fe4'
      } as any)
      const init = fetchMock.mock.calls[0][1] as RequestInit
      expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/vnd.api+json')
    })
  })

  describe('XHRAdapter', () => {
    it('is supported when XMLHttpRequest exists', () => {
      expect(new XHRAdapter().isSupported()).toBe(typeof XMLHttpRequest !== 'undefined')
    })

    it('parses JSON on success', async () => {
      class MockXHR {
        static UNSENT = 0
        static OPENED = 1
        status = 200
        responseText = '{"x":1}'
        responseType: XMLHttpRequestResponseType = ''
        response: unknown = null
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/xhr',
        method: 'GET',
        requestId: 'xhr1'
      } as any)

      expect(result.data).toEqual({ x: 1 })
    })

    it('rejects when HTTP status indicates error', async () => {
      class MockXHR {
        status = 503
        responseText = '{}'
        responseType: XMLHttpRequestResponseType = ''
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://localhost/xhr-err',
          method: 'GET',
          requestId: 'xhr-err'
        } as any)
      ).rejects.toThrow(/503/)
    })

    it('falls back to responseText when JSON parse fails on success', async () => {
      class MockXHR {
        status = 200
        responseText = 'plain-not-json'
        responseType: XMLHttpRequestResponseType = ''
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/xhr-raw',
        method: 'GET',
        requestId: 'xhr-raw'
      } as any)
      expect(result.data).toBe('plain-not-json')
    })

    it('rejects on network error callback', async () => {
      class MockXHR {
        status = 0
        responseText = ''
        responseType: XMLHttpRequestResponseType = ''
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onerror?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://localhost/xhr-net',
          method: 'GET',
          requestId: 'xhr-net'
        } as any)
      ).rejects.toThrow(/Network error/)
    })

    it('sets withCredentials for include credentials', async () => {
      class MockXHR {
        status = 200
        responseText = '{}'
        responseType: XMLHttpRequestResponseType = ''
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      const result = await adapter.request({
        fullPath: 'http://localhost/xhr-cred',
        method: 'GET',
        credentials: 'include',
        requestId: 'xhr-cred'
      } as any)
      expect(result.data).toEqual({})
    })

    it('rejects on timeout callback', async () => {
      class MockXHR {
        status = 0
        responseText = ''
        timeout = 1
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.ontimeout?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://localhost/xhr-to',
          method: 'GET',
          timeout: 5000,
          requestId: 'xhr-to'
        } as any)
      ).rejects.toThrow(/timeout/)
    })

    it('parses responseType text and blob via XHR', async () => {
      class MockXHRText {
        status = 200
        responseText = 'plain'
        response: unknown = null
        responseType: XMLHttpRequestResponseType = 'text'
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHRText as any)

      const adapter = new XHRAdapter()
      const r1 = await adapter.request({
        fullPath: 'http://localhost/xhr-txt',
        method: 'GET',
        responseType: 'text',
        requestId: 'xt1'
      } as any)
      expect(r1.data).toBe('plain')

      class MockXHRBlob {
        status = 200
        responseText = ''
        response = new Blob(['x'])
        responseType: XMLHttpRequestResponseType = 'blob'
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHRBlob as any)

      const r2 = await adapter.request({
        fullPath: 'http://localhost/xhr-bl',
        method: 'GET',
        responseType: 'blob',
        requestId: 'xt2'
      } as any)
      expect(r2.data).toBeInstanceOf(Blob)
    })

    it('sends FormData without JSON Content-Type header', async () => {
      const setHeader = vi.fn()
      class MockXHR {
        status = 200
        responseText = '{}'
        responseType: XMLHttpRequestResponseType = ''
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader = setHeader
        send() {
          queueMicrotask(() => this.onload?.())
        }
        abort() {}
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const adapter = new XHRAdapter()
      const fd = new FormData()
      await adapter.request({
        fullPath: 'http://localhost/xhr-fd',
        method: 'POST',
        data: fd,
        requestId: 'xf1'
      } as any)
      expect(setHeader).not.toHaveBeenCalledWith('Content-Type', 'application/json')
    })

    it('aborts XHR when signal is aborted', async () => {
      const abortSpy = vi.fn()
      class MockXHR {
        status = 200
        responseText = '{}'
        responseType: XMLHttpRequestResponseType = ''
        timeout = 0
        withCredentials = false
        ontimeout: (() => void) | null = null
        onload: (() => void) | null = null
        onerror: (() => void) | null = null
        open() {}
        setRequestHeader() {}
        send() {}
        abort = abortSpy
      }
      vi.stubGlobal('XMLHttpRequest', MockXHR as any)

      const ac = new AbortController()
      const adapter = new XHRAdapter()
      void adapter.request({
        fullPath: 'http://localhost/xhr-ab',
        method: 'GET',
        signal: ac.signal,
        requestId: 'xab'
      } as any)
      ac.abort()
      await new Promise((r) => setTimeout(r, 0))
      expect(abortSpy).toHaveBeenCalled()
    })
  })

  describe('getDefaultAdapter', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('should return FetchAdapter if fetch is available', () => {
      vi.stubGlobal('fetch', () => {})
      const adapter = getDefaultAdapter()
      expect(adapter).toBeInstanceOf(FetchAdapter)
    })

    it('throws when neither fetch nor XMLHttpRequest exists', async () => {
      vi.stubGlobal('fetch', undefined)
      vi.stubGlobal('XMLHttpRequest', undefined)
      const { getDefaultAdapter: getAdapter } = await import('../adapters/fetch')
      expect(() => getAdapter()).toThrow('No HTTP adapter available')
    })
  })
})
