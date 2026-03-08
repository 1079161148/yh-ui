import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PluginManager, RequestPlugin } from '../plugin'
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
})
