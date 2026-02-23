import { describe, it, expect, vi } from 'vitest'
import plugin from '../../src/runtime/plugin'

vi.mock('nuxt/app', () => ({
  defineNuxtPlugin: (fn: any) => fn
}))

vi.mock('@yh-ui/hooks', () => ({
  createZIndexCounter: vi.fn(() => 'mock-counter'),
  zIndexCounterKey: 'mock-key'
}))

vi.mock('@yh-ui/components', () => ({
  vLoading: 'mock-loading',
  vYhInfiniteScroll: 'mock-infinite-scroll'
}))

describe('nuxt runtime plugin', () => {
  it('registers plugin correctly', () => {
    const provideMock = vi.fn()
    const directiveMock = vi.fn()

    const nuxtAppMock = {
      vueApp: {
        provide: provideMock,
        directive: directiveMock
      }
    }

    plugin(nuxtAppMock as any)

    expect(provideMock).toHaveBeenCalledWith('mock-key', 'mock-counter')
    expect(directiveMock).toHaveBeenCalledWith('yh-loading', 'mock-loading')
    expect(directiveMock).toHaveBeenCalledWith('yh-infinite-scroll', 'mock-infinite-scroll')
  })
})
