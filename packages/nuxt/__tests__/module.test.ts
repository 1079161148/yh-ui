import { describe, it, expect, vi, beforeEach } from 'vitest'
import yhNuxtModule from '../src/module'
import * as kit from '@nuxt/kit'

const PUBLISHED_CSS_ENTRY = '@yh-ui/components/style.css'

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: vi.fn((config) => config),
  addComponent: vi.fn(),
  addImports: vi.fn(),
  addPlugin: vi.fn(),
  createResolver: vi.fn(() => ({ resolve: (path: string) => `resolved-${path}` })),
  extendViteConfig: vi.fn()
}))

describe('nuxt module', () => {
  let nuxtMock: any

  beforeEach(() => {
    vi.clearAllMocks()
    nuxtMock = {
      options: {
        css: [],
        build: { transpile: [] }
      }
    }
  })

  it('provides meta config', () => {
    expect((yhNuxtModule as any).meta.name).toBe('@yh-ui/nuxt')
  })

  it('sets up module with default config', async () => {
    ;(yhNuxtModule as any).setup((yhNuxtModule as any).defaults, nuxtMock)

    // plugin
    expect(kit.addPlugin).toHaveBeenCalledWith('resolved-./runtime/plugin.mjs')

    // css (on-demand by default, so global css array should not contain full style.css)
    expect(nuxtMock.options.css).not.toContain(PUBLISHED_CSS_ENTRY)

    // build.transpile
    expect(nuxtMock.options.build.transpile).toContain('@yh-ui/components')

    // addComponent
    expect(kit.addComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'YhButton',
        export: 'YhButton',
        filePath: '@yh-ui/components'
      })
    )

    // addImports
    expect(kit.addImports).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'useLocale', as: 'useLocale', from: '@yh-ui/hooks' })
    )

    // extendViteConfig
    expect(kit.extendViteConfig).toHaveBeenCalled()
    const configFn = vi
      .mocked(kit.extendViteConfig)
      .mock.calls.map((c) => c[0])
      .find((fn) => {
        const mockConf: any = {}
        fn(mockConf)
        return mockConf.optimizeDeps && mockConf.optimizeDeps.include
      })!
    const viteConfigMock: any = {}
    configFn(viteConfigMock)
    expect(viteConfigMock.optimizeDeps.include).toContain('dayjs')

    // Test branch of config deps existing
    const viteConfigMock2: any = { optimizeDeps: { include: ['dayjs'] } }
    configFn(viteConfigMock2)
    expect(viteConfigMock2.optimizeDeps.include.length).toBe(4) // it pushes others
  })

  it('does not import style or transpile based on options', async () => {
    const customOpts = { importStyle: false, buildTranspile: false }
    nuxtMock = { options: { css: [], build: {} } }
    ;(yhNuxtModule as any).setup(customOpts, nuxtMock)

    expect(nuxtMock.options.css.length).toBe(0)
    expect(nuxtMock.options.build.transpile).toBeUndefined()
  })

  it('handles empty options build transpile init', async () => {
    nuxtMock = {
      options: {
        css: [],
        build: {
          /* transpile is undefined */
        }
      }
    }
    ;(yhNuxtModule as any).setup({ buildTranspile: true }, nuxtMock)
    expect(nuxtMock.options.build.transpile).toBeTruthy()
  })

  it('does not duplicate published CSS entry when importStyle is "all"', async () => {
    nuxtMock = {
      options: {
        css: [PUBLISHED_CSS_ENTRY],
        build: { transpile: [] }
      }
    }
    ;(yhNuxtModule as any).setup({ importStyle: 'all' }, nuxtMock)

    expect(nuxtMock.options.css).toEqual([PUBLISHED_CSS_ENTRY])
  })

  it('imports all style when importStyle is "all"', async () => {
    nuxtMock = {
      options: {
        css: [],
        build: { transpile: [] }
      }
    }
    ;(yhNuxtModule as any).setup({ importStyle: 'all' }, nuxtMock)
    expect(nuxtMock.options.css).toContain(PUBLISHED_CSS_ENTRY)
  })

  it('registers a Vite plugin to inject styles on demand when importStyle is true', async () => {
    nuxtMock = {
      options: {
        css: [],
        build: { transpile: [] }
      }
    }
    ;(yhNuxtModule as any).setup({ importStyle: true }, nuxtMock)

    expect(kit.extendViteConfig).toHaveBeenCalled()
    const calls = vi.mocked(kit.extendViteConfig).mock.calls
    const extendFn = calls.find((call) => {
      const mockConfig: any = { plugins: [] }
      call[0](mockConfig)
      return (
        mockConfig.plugins && mockConfig.plugins.some((p: any) => p.name === 'yh-ui:style-import')
      )
    })?.[0]

    expect(extendFn).toBeDefined()
    const mockConfig: any = { plugins: [] }
    extendFn(mockConfig)
    const plugin = mockConfig.plugins.find((p: any) => p.name === 'yh-ui:style-import')
    expect(plugin).toBeDefined()

    // Test transform hook
    const code = 'import { YhButton } from "@yh-ui/components"'
    const transformed = plugin.transform(code, 'test.vue')
    expect(transformed).toBeDefined()
    expect(transformed.code).toContain('@yh-ui/components/dist/button/src/button.css')
  })
})
