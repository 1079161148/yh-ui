import { describe, it, expect, vi } from 'vitest'
import type { App, Component, Directive } from 'vue'
import {
  withInstall,
  withNoopInstall,
  withInstallFunction,
  withInstallDirective,
  withInstallAll
} from '../src/vue'

describe('utils/vue', () => {
  it('withInstall', () => {
    const comp: Component = { name: 'MyComp', template: '<div></div>' }
    const extraComp: Component = { __name: 'ExtraComp', template: '<div></div>' }

    // @ts-ignore
    const installed = withInstall(comp, { ExtraComp: extraComp })
    expect(installed.install).toBeDefined()
    expect(installed.ExtraComp).toBe(extraComp)

    const app: App = {
      component: vi.fn(),
      directive: vi.fn(),
      config: { globalProperties: {} }
    } as unknown as App

    installed.install(app)
    expect(app.component).toHaveBeenCalledWith('MyComp', comp)
    expect(app.component).toHaveBeenCalledWith('ExtraComp', extraComp)
  })

  it('withNoopInstall', () => {
    const comp: Component = { name: 'NoopComp' }
    const installed = withNoopInstall(comp)
    expect(installed.install).toBeDefined()

    // Calling install should not throw
    // @ts-ignore
    expect(() => installed.install()).not.toThrow()
  })

  it('withInstallFunction', () => {
    const fn = vi.fn()
    const installed = withInstallFunction(fn, '$myFn')
    expect(installed.install).toBeDefined()

    const app: App = {
      config: { globalProperties: {} }
    } as unknown as App

    installed.install(app)
    expect(app.config.globalProperties.$myFn).toBe(fn)
  })

  it('withInstallDirective', () => {
    const dir: Directive = { mounted() {} }
    const installed = withInstallDirective(dir, 'my-dir')
    expect(installed.install).toBeDefined()

    const app: App = {
      directive: vi.fn()
    } as unknown as App

    installed.install(app)
    expect(app.directive).toHaveBeenCalledWith('my-dir', dir)
  })

  it('withInstallAll', () => {
    const comp1 = { name: 'Comp1' } as Component
    const comp2 = { __name: 'Comp2' } as Component
    const dir: Directive = { mounted() {} }

    const plugin = withInstallAll([comp1, comp2], { 'my-dir': dir })

    const app: App = {
      component: vi.fn(),
      directive: vi.fn()
    } as unknown as App

    plugin.install!(app)

    expect(app.component).toHaveBeenCalledWith('Comp1', comp1)
    expect(app.component).toHaveBeenCalledWith('Comp2', comp2)
    expect(app.directive).toHaveBeenCalledWith('my-dir', dir)
  })

  it('withInstall without extra only registers main', () => {
    const comp: Component = { name: 'Solo', template: '<div></div>' }
    const installed = withInstall(comp)
    const app: App = {
      component: vi.fn(),
      directive: vi.fn(),
      config: { globalProperties: {} }
    } as unknown as App
    installed.install!(app)
    expect(app.component).toHaveBeenCalledTimes(1)
    expect(app.component).toHaveBeenCalledWith('Solo', comp)
  })

  it('withInstall skips components without name or __name', () => {
    const bare = { template: '<span></span>' } as Component
    const installed = withInstall(bare)
    const app: App = {
      component: vi.fn(),
      directive: vi.fn(),
      config: { globalProperties: {} }
    } as unknown as App
    installed.install!(app)
    expect(app.component).not.toHaveBeenCalled()
  })

  it('withInstallAll skips unnamed components and works without directives', () => {
    const named = { name: 'N' } as Component
    const unnamed = { template: 'x' } as Component
    const plugin = withInstallAll([named, unnamed])
    const app: App = {
      component: vi.fn(),
      directive: vi.fn()
    } as unknown as App
    plugin.install!(app)
    expect(app.component).toHaveBeenCalledTimes(1)
    expect(app.directive).not.toHaveBeenCalled()
  })
})
