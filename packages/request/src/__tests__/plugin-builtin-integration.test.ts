import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Request } from '../request'
import { PluginManager, builtInPlugins } from '../plugin'

describe('built-in plugins + Request interceptors', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: () => Promise.resolve(JSON.stringify({ ok: true }))
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('loggingPlugin logs outgoing request and response', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const req = new Request()
    const pm = new PluginManager()
    pm.init(req)
    pm.use(builtInPlugins.logging)

    await req.request({ url: 'http://127.0.0.1/api', method: 'GET' })

    expect(log.mock.calls.some((c) => String(c[0]).includes('GET'))).toBe(true)
    expect(log.mock.calls.some((c) => String(c[0]).includes('200'))).toBe(true)
    log.mockRestore()
  })

  it('cachePlugin calls getCache on GET and setCache after success', async () => {
    const getCache = vi.fn().mockReturnValue(undefined)
    const setCache = vi.fn()
    const req = new Request()
    const pm = new PluginManager()
    pm.init(req)
    pm.use(builtInPlugins.cache, { getCache, setCache })

    await req.request({ url: 'http://127.0.0.1/cache', method: 'GET' })

    expect(getCache).toHaveBeenCalled()
    expect(setCache).toHaveBeenCalled()
  })

  it('cachePlugin does not call setCache for non-GET', async () => {
    const setCache = vi.fn()
    const req = new Request()
    const pm = new PluginManager()
    pm.init(req)
    pm.use(builtInPlugins.cache, { setCache })

    await req.request({ url: 'http://127.0.0.1/p', method: 'POST', data: { a: 1 } })

    expect(setCache).not.toHaveBeenCalled()
  })
})
