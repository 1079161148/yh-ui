import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide, computed } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useConfig, configProviderContextKey, type ConfigProviderContext } from '../index'

describe('useConfig SSR', () => {
  it('should generate consistent config in SSR', async () => {
    const mockConfig = computed<ConfigProviderContext>(() => ({
      size: 'large',
      zIndex: 3000
    }))

    const Child = defineComponent({
      setup() {
        const { globalSize, globalZIndex } = useConfig()
        return () =>
          h('div', {
            'data-size': globalSize.value,
            'data-z-index': globalZIndex.value
          })
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(configProviderContextKey, mockConfig)
        return () => h(Child)
      }
    })

    const html = await renderSSR(Parent)
    expect(html).toContain('data-size="large"')
    expect(html).toContain('data-z-index="3000"')
  })

  it('should use default values in SSR when no provider exists', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { globalSize, globalZIndex } = useConfig()
        return () =>
          h('div', {
            'data-size': globalSize.value,
            'data-z-index': globalZIndex.value
          })
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('data-size="default"')
    expect(html).toContain('data-z-index="2000"')
  })
})
