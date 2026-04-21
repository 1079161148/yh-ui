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

    // css
    expect(nuxtMock.options.css).toContain(PUBLISHED_CSS_ENTRY)

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
    const configFn = vi.mocked(kit.extendViteConfig).mock.calls[0][0]
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

  it('does not duplicate published CSS entry', async () => {
    nuxtMock = {
        options: {
        css: [PUBLISHED_CSS_ENTRY],
        build: { transpile: [] }
      }
    }
    ;(yhNuxtModule as any).setup({ importStyle: true }, nuxtMock)

    expect(nuxtMock.options.css).toEqual([PUBLISHED_CSS_ENTRY])
  })
})
