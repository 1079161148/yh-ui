import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useEventListener } from '../index'

describe('useEventListener SSR', () => {
  it('should not throw in SSR environment', async () => {
    const TestComponent = defineComponent({
      setup() {
        const handler = vi.fn()
        useEventListener(globalThis as any, 'scroll', handler)
        return () => h('div', 'Content')
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Content')
  })
})
