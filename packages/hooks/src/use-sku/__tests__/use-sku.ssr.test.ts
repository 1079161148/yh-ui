import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useSKU } from '../index'

const specs = [
  {
    id: 'size',
    name: '尺寸',
    values: [
      { id: 's', name: 'S' },
      { id: 'm', name: 'M' }
    ]
  }
]
const skus = [
  { id: 1, specValueIds: ['s'], price: 100, stock: 10 },
  { id: 2, specValueIds: ['m'], price: 110, stock: 5 }
]

const TestComponent = defineComponent({
  setup() {
    const { selectedValueIds } = useSKU(specs, skus)
    return () =>
      h('div', {}, `Selected: ${selectedValueIds.value.length === 0 ? 'None' : 'Values'}`)
  }
})

describe('useSKU SSR', () => {
  it('should render initial state', async () => {
    const html = await renderSSR(TestComponent)
    expect(html).toContain('Selected: None')
  })
})
