import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useCache } from '../index'

describe('useCache SSR', () => {
  it('should be safe to use in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { data, execute } = useCache('ssr-key', () => 'ssr-data')
        // Synchronous execute for demo (though usually it's handled by Nuxt's useAsyncData)
        return () => h('div', data.value || 'loading')
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('loading')
  })
})
