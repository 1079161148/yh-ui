import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useVirtualScroll } from '../index'

describe('useVirtualScroll SSR', () => {
  it('should calculate initial state in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { totalHeight, visibleItems } = useVirtualScroll({
          itemHeight: 50,
          containerHeight: 300,
          items: [{ id: 1 }, { id: 2 }]
        })
        return () => h('div', `Total: ${totalHeight.value}, Visible: ${visibleItems.value.length}`)
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Total: 100')
    expect(html).toContain('Visible: 2')
  })
})
