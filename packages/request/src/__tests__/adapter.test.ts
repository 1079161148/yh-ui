import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FetchAdapter, getDefaultAdapter } from '../adapters/fetch'

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
  })

  describe('getDefaultAdapter', () => {
    it('should return FetchAdapter if fetch is available', () => {
      vi.stubGlobal('fetch', () => {})
      const adapter = getDefaultAdapter()
      expect(adapter).toBeInstanceOf(FetchAdapter)
    })
  })
})
