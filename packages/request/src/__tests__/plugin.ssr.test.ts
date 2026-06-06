/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { PluginManager, loggingPlugin, retryPlugin } from '../plugin'
import { Request } from '../request'

describe('Plugin System SSR', () => {
  it('PluginManager can be initialized in SSR', () => {
    const request = new Request()
    const manager = new PluginManager()
    expect(() => manager.init(request)).not.toThrow()
  })

  it('Built-in plugins should be installable in SSR', () => {
    const request = new Request()
    const manager = new PluginManager()
    manager.init(request)

    expect(() => manager.use(loggingPlugin)).not.toThrow()
    expect(() => manager.use(retryPlugin)).not.toThrow()
  })
})
