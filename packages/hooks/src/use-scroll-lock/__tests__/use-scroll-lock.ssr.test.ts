import { describe, it, expect } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useScrollLock } from '../index'

describe('useScrollLock SSR', () => {
  it('should not throw in SSR environment', async () => {
    const TestComponent = defineComponent({
      setup() {
        const trigger = ref(true)
        useScrollLock(trigger)
        return () => h('div', 'Content')
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Content')
  })
})
