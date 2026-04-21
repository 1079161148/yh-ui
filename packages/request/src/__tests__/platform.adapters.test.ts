import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import type { InternalRequestOptions } from '../types'

describe('request/adapters/platform adapters', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  describe('detectPlatform (fresh module)', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('detects deno when Deno global exists', async () => {
      vi.stubGlobal('Deno', { version: '1.0.0', env: { get: () => undefined } })
      const { detectPlatform } = await import('../adapters/platform')
      expect(detectPlatform().environment).toBe('deno')
      expect(detectPlatform().supportsFetch).toBe(true)
    })

    it('detects bun when Bun global exists', async () => {
      vi.stubGlobal('Bun', { version: '1.0.0' })
      const { detectPlatform } = await import('../adapters/platform')
      expect(detectPlatform().environment).toBe('bun')
    })

    it('detects edge when caches exists on globalThis', async () => {
      vi.stubGlobal('caches', {} as CacheStorage)
      const { detectPlatform } = await import('../adapters/platform')
      expect(detectPlatform().environment).toBe('edge')
    })

    it('detects edge when navigator reports Cloudflare', async () => {
      vi.stubGlobal('navigator', { userAgent: 'Cloudflare-Workers' } as Navigator)
      const { detectPlatform } = await import('../adapters/platform')
      expect(detectPlatform().environment).toBe('edge')
    })

    it('detects edge when edgeRuntime is present on globalThis', async () => {
      vi.stubGlobal('edgeRuntime', 'edge-light')
      const { detectPlatform } = await import('../adapters/platform')
      expect(detectPlatform().environment).toBe('edge')
    })
  })

  describe('NodeHttpAdapter', () => {
    it('performs GET and parses JSON', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      expect(adapter.isSupported()).toBe(true)

      const server = http.createServer((_req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true }))
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo
      const url = `http://127.0.0.1:${port}/`

      const result = await adapter.request<{ ok: boolean }>({
        fullPath: url,
        method: 'GET',
        requestId: 'r1'
      } as InternalRequestOptions)

      expect(result.data).toEqual({ ok: true })
      expect(result.requestId).toBe('r1')
      await new Promise<void>((resolve) => server.close(() => resolve()))
    })

    it('supports responseType text', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      const server = http.createServer((_req, res) => {
        res.writeHead(200)
        res.end('plain')
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo

      const result = await adapter.request<string>({
        fullPath: `http://127.0.0.1:${port}/`,
        method: 'GET',
        responseType: 'text',
        requestId: 'r2'
      } as InternalRequestOptions)

      expect(result.data).toBe('plain')
      await new Promise<void>((resolve) => server.close(() => resolve()))
    })

    it('falls back to raw body when JSON parse fails', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      const server = http.createServer((_req, res) => {
        res.writeHead(200)
        res.end('not-json{')
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo

      const result = await adapter.request({
        fullPath: `http://127.0.0.1:${port}/`,
        method: 'GET',
        requestId: 'r3'
      } as InternalRequestOptions)

      expect(result.data).toBe('not-json{')
      await new Promise<void>((resolve) => server.close(() => resolve()))
    })

    it('sends POST body as JSON string', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      const server = http.createServer((req, res) => {
        let raw = ''
        req.on('data', (c) => {
          raw += c
        })
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ len: raw.length }))
        })
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo

      const result = await adapter.request({
        fullPath: `http://127.0.0.1:${port}/post`,
        method: 'POST',
        data: { a: 1 },
        requestId: 'r4'
      } as InternalRequestOptions)

      expect((result.data as { len: number }).len).toBeGreaterThan(0)
      await new Promise<void>((resolve) => server.close(() => resolve()))
    })

    it('parses arraybuffer and blob response bodies', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      const buf = Buffer.from([1, 2, 3])
      const server = http.createServer((_req, res) => {
        res.writeHead(200)
        res.end(buf)
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo

      const ab = await adapter.request({
        fullPath: `http://127.0.0.1:${port}/ab`,
        method: 'GET',
        responseType: 'arraybuffer',
        requestId: 'ab1'
      } as InternalRequestOptions)
      expect(ab.data).toBeInstanceOf(ArrayBuffer)

      const server2 = http.createServer((_req, res) => {
        res.writeHead(200)
        res.end('blob-data')
      })
      await new Promise<void>((resolve) => server2.listen(0, '127.0.0.1', resolve))
      const p2 = (server2.address() as AddressInfo).port
      const bl = await adapter.request({
        fullPath: `http://127.0.0.1:${p2}/bl`,
        method: 'GET',
        responseType: 'blob',
        requestId: 'bl1'
      } as InternalRequestOptions)
      expect(bl.data).toBeDefined()

      await new Promise<void>((resolve) => server.close(() => resolve()))
      await new Promise<void>((resolve) => server2.close(() => resolve()))
    })

    it('aborts in-flight request when signal aborts', async () => {
      const { NodeHttpAdapter } = await import('../adapters/platform')
      const adapter = new NodeHttpAdapter()
      const server = http.createServer((_req, res) => {
        setTimeout(() => {
          res.writeHead(200)
          res.end('late')
        }, 2000)
      })
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
      const { port } = server.address() as AddressInfo

      const ac = new AbortController()
      const p = adapter.request({
        fullPath: `http://127.0.0.1:${port}/slow`,
        method: 'GET',
        signal: ac.signal,
        requestId: 'r5'
      } as InternalRequestOptions)

      queueMicrotask(() => ac.abort())

      await expect(p).rejects.toMatchObject({ name: 'AbortError' })
      await new Promise<void>((resolve) => server.close(() => resolve()))
    })
  })

  describe('DenoAdapter / BunAdapter / EdgeAdapter', () => {
    it('DenoAdapter resolves JSON via fetch mock', async () => {
      const { DenoAdapter } = await import('../adapters/platform')
      vi.stubGlobal('Deno', { version: '1' })
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{"d":1}')
      })
      vi.stubGlobal('fetch', fetchMock)

      const adapter = new DenoAdapter()
      expect(adapter.isSupported()).toBe(true)

      const res = await adapter.request({
        fullPath: 'http://example.test/x',
        method: 'GET',
        requestId: 'd1'
      } as InternalRequestOptions)

      expect(res.data).toEqual({ d: 1 })
      expect(fetchMock).toHaveBeenCalled()
    })

    it('DenoAdapter handles all responseType branches', async () => {
      const { DenoAdapter } = await import('../adapters/platform')
      vi.stubGlobal('Deno', { version: '1' })

      const mk = (over: Record<string, unknown>) => {
        vi.stubGlobal(
          'fetch',
          vi.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(''),
            ...over
          })
        )
      }

      const adapter = new DenoAdapter()
      mk({ text: () => Promise.resolve('plain') })
      await adapter.request({
        fullPath: 'http://t1',
        responseType: 'text',
        requestId: 'dt'
      } as InternalRequestOptions)

      mk({ blob: () => Promise.resolve(new Blob(['x'])) })
      await adapter.request({
        fullPath: 'http://t2',
        responseType: 'blob',
        requestId: 'db'
      } as InternalRequestOptions)

      mk({ arrayBuffer: () => Promise.resolve(new ArrayBuffer(2)) })
      await adapter.request({
        fullPath: 'http://t3',
        responseType: 'arraybuffer',
        requestId: 'ab'
      } as InternalRequestOptions)

      mk({ formData: () => Promise.resolve(new FormData()) })
      await adapter.request({
        fullPath: 'http://t4',
        responseType: 'formdata',
        requestId: 'fd'
      } as InternalRequestOptions)
    })

    it('DenoAdapter handles FormData body', async () => {
      const { DenoAdapter } = await import('../adapters/platform')
      vi.stubGlobal('Deno', { version: '1' })
      const fd = new FormData()
      fd.append('a', 'b')
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('')
      })
      vi.stubGlobal('fetch', fetchMock)

      const adapter = new DenoAdapter()
      await adapter.request({
        fullPath: 'http://example.test/fd',
        method: 'POST',
        data: fd,
        requestId: 'd2'
      } as InternalRequestOptions)

      const init = fetchMock.mock.calls[0][1] as RequestInit
      expect(init.body).toBe(fd)
    })

    it('BunAdapter uses timeout abort path', async () => {
      const { BunAdapter } = await import('../adapters/platform')
      vi.stubGlobal('Bun', { version: '1' })
      const fetchMock = vi
        .fn()
        .mockImplementation((_url: string, init?: RequestInit) => {
          return new Promise((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => {
              reject(new DOMException('Aborted', 'AbortError'))
            })
          })
        })
      vi.stubGlobal('fetch', fetchMock)

      const adapter = new BunAdapter()
      await expect(
        adapter.request({
          fullPath: 'http://example.test/t',
          method: 'GET',
          timeout: 5,
          requestId: 'b1'
        } as InternalRequestOptions)
      ).rejects.toBeDefined()
    })

    it('EdgeAdapter serializes plain object body', async () => {
      const { EdgeAdapter } = await import('../adapters/platform')
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}')
      })
      vi.stubGlobal('fetch', fetchMock)

      const adapter = new EdgeAdapter()
      await adapter.request({
        fullPath: 'http://example.test/e',
        method: 'POST',
        data: { x: 1 },
        headers: {},
        requestId: 'e1'
      } as InternalRequestOptions)

      const init = fetchMock.mock.calls[0][1] as RequestInit
      expect(init.body).toBe(JSON.stringify({ x: 1 }))
    })
  })

  describe('getAdapter', () => {
    it('returns expected adapter types for non-browser runtimes', async () => {
      const { getAdapter } = await import('../adapters/platform')

      expect(getAdapter('deno').name).toBe('deno')
      expect(getAdapter('bun').name).toBe('bun')
      expect(getAdapter('edge').name).toBe('edge')
      expect(getAdapter('node').name).toBe('node-http')
    })
  })
})
