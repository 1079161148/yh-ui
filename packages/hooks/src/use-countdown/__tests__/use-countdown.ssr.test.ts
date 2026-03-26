import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useCountdown } from '../index'

const TestComponent = defineComponent({
  setup() {
    const { remain } = useCountdown({ time: 5000 })
    return () => h('div', {}, `Remain: ${remain.value}`)
  }
})

describe('useCountdown SSR', () => {
  it('should render remaining time initially', async () => {
    const html = await renderSSR(TestComponent)
    expect(html).toContain('Remain: 5000')
  })
})
