import { describe, it, expect, vi } from 'vitest'
import plugin from '../../src/runtime/plugin.mjs'

vi.mock('nuxt/app', () => ({
  defineNuxtPlugin: (fn: any) => fn
}))

vi.mock('@yh-ui/components', () => ({
  vLoading: 'mock-loading',
  vYhInfiniteScroll: 'mock-infinite-scroll'
}))

describe('nuxt runtime plugin', () => {
  it('registers plugin correctly', () => {
    const directiveMock = vi.fn()

    const nuxtAppMock = {
      vueApp: {
        directive: directiveMock
      }
    }

    plugin(nuxtAppMock as any)

    expect(directiveMock).toHaveBeenCalledWith('yh-loading', 'mock-loading')
    expect(directiveMock).toHaveBeenCalledWith('yh-infinite-scroll', 'mock-infinite-scroll')
  })
})
