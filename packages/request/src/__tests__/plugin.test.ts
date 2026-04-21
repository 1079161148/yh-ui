import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  PluginManager,
  RequestPlugin,
  cachePlugin,
  errorHandlerPlugin,
  retryPlugin,
  loggingPlugin
} from '../plugin'
import { Request } from '../request'

describe('Plugin System', () => {
  let request: Request
  let manager: PluginManager

  beforeEach(() => {
    request = new Request()
    manager = new PluginManager()
    manager.init(request)
  })

  it('should register and install a plugin', () => {
    const installSpy = vi.fn()
    const plugin: RequestPlugin = {
      name: 'test-plugin',
      install: installSpy
    }

    manager.use(plugin, { foo: 'bar' })

    expect(installSpy).toHaveBeenCalledWith(request, { foo: 'bar' })
    expect(manager.has('test-plugin')).toBe(true)
  })

  it('should uninstall a plugin', () => {
    const uninstallSpy = vi.fn()
    const plugin: RequestPlugin = {
      name: 'test-plugin',
      install: () => {},
      uninstall: uninstallSpy
    }

    manager.use(plugin)
    manager.uninstall('test-plugin')

    expect(uninstallSpy).toHaveBeenCalledWith(request)
    expect(manager.has('test-plugin')).toBe(false)
  })

  it('should register and retrieve lifecycle hooks', () => {
    const hook = { onRequest: (config: any) => config }
    manager.registerHooks(hook)

    expect(manager.getHooks().onRequest).toBe(hook.onRequest)
  })

  it('warns when registering the same plugin twice', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const plugin: RequestPlugin = { name: 'dup', install: vi.fn() }
    manager.use(plugin)
    manager.use(plugin)
    expect(warn).toHaveBeenCalledWith('Plugin dup is already installed')
    warn.mockRestore()
  })

  it('throws when use() is called before init', () => {
    const m = new PluginManager()
    expect(() =>
      m.use({
        name: 'x',
        install: () => {}
      })
    ).toThrow(/PluginManager must be initialized/)
  })

  it('getAll returns all plugin instances', () => {
    manager.use({ name: 'a', install: () => {} })
    manager.use({ name: 'b', install: () => {} })
    expect(manager.getAll().map((i) => i.plugin.name)).toEqual(['a', 'b'])
  })

  it('uninstall returns false when plugin is missing', () => {
    expect(manager.uninstall('missing')).toBe(false)
  })

  it('clear uninstalls every plugin', () => {
    const u1 = vi.fn()
    const u2 = vi.fn()
    manager.use({ name: 'p1', install: () => {}, uninstall: u1 })
    manager.use({ name: 'p2', install: () => {}, uninstall: u2 })
    manager.clear()
    expect(manager.getAll()).toHaveLength(0)
    expect(u1).toHaveBeenCalled()
    expect(u2).toHaveBeenCalled()
  })

  it('get returns installed plugin instance', () => {
    const plugin: RequestPlugin = { name: 'named', install: vi.fn() }
    manager.use(plugin)
    expect(manager.get('named')?.plugin).toBe(plugin)
    expect(manager.get('missing')).toBeUndefined()
  })
})

type HandlerPair = {
  fulfilled: (v: unknown) => unknown
  rejected?: (e: unknown) => unknown
}

function getHandlers(mgr: unknown): (HandlerPair | null)[] {
  return (mgr as { handlers: (HandlerPair | null)[] }).handlers
}

describe('Built-in request plugins', () => {
  let req: Request

  beforeEach(() => {
    req = new Request()
  })

  it('loggingPlugin registers interceptors', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    loggingPlugin.install(req)
    expect(getHandlers(req.interceptors.request).length).toBeGreaterThan(0)
    expect(getHandlers(req.interceptors.response).length).toBeGreaterThan(0)
    log.mockRestore()
  })

  it('cachePlugin hits GET cache path and sets cache on response', async () => {
    const getCache = vi.fn().mockReturnValue({ data: 'hit' })
    const setCache = vi.fn()
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    cachePlugin.install(req, { getCache, setCache })

    const reqH = getHandlers(req.interceptors.request).filter(Boolean).pop()!
    await reqH.fulfilled({
      method: 'GET',
      url: '/cached',
      requestId: 'c1'
    } as any)
    expect(getCache).toHaveBeenCalledWith('/cached')
    expect(log).toHaveBeenCalled()

    const resH = getHandlers(req.interceptors.response).filter(Boolean).pop()!
    await resH.fulfilled({
      config: { method: 'GET', url: '/cached' },
      data: { x: 1 },
      response: {} as any
    } as any)
    expect(setCache).toHaveBeenCalledWith('/cached', { x: 1 })
    log.mockRestore()
  })

  it('errorHandlerPlugin invokes onError', async () => {
    const onError = vi.fn()
    errorHandlerPlugin.install(req, { onError })
    const resH = getHandlers(req.interceptors.response).filter(Boolean).pop()!
    const err = { message: 'e', config: { url: '/x' } } as any
    await expect(resH.rejected!(err)).rejects.toBe(err)
    expect(onError).toHaveBeenCalledWith(err)
  })

  it('retryPlugin rejects when error has no config', async () => {
    retryPlugin.install(req, { retries: 2, retryDelay: 0 })
    const resH = getHandlers(req.interceptors.response).filter(Boolean).pop()!
    const err: any = { message: 'x' }
    await expect(resH.rejected!(err)).rejects.toBe(err)
  })

  it('retryPlugin schedules retry request and resolves', async () => {
    vi.useFakeTimers()
    const r = new Request()
    vi.spyOn(r, 'request').mockResolvedValue({
      data: 1,
      config: {},
      response: {} as Response,
      requestId: 'ok'
    })
    retryPlugin.install(r, { retries: 3, retryDelay: 5 })
    const resH = getHandlers(r.interceptors.response).filter(Boolean).pop()!
    const err: any = { message: 'x', config: { url: '/r', requestId: '1' } }
    const p = resH.rejected!(err)
    await vi.advanceTimersByTimeAsync(5)
    const out = await p
    expect((out as { data: number }).data).toBe(1)
    vi.useRealTimers()
  })
})
