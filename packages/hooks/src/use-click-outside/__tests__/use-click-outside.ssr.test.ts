import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useClickOutside } from '../index'

describe('useClickOutside SSR', () => {
  it('should not throw in SSR environment', async () => {
    const TestComponent = defineComponent({
      setup() {
        const divRef = ref(null)
        const handler = vi.fn()
        useClickOutside(divRef, handler)
        return () => h('div', { ref: divRef }, 'Click Target')
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Click Target')
  })
})
