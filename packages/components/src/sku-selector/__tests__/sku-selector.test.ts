import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkuSelector from '../src/sku-selector.vue'

describe('SkuSelector', () => {
  const specs = [
    {
      id: '1',
      name: 'Size',
      values: [
        { id: '101', name: 'S' },
        { id: '102', name: 'M' }
      ]
    }
  ]
  const skus = [
    { id: '1', specValueIds: ['101'], price: 100, stock: 10 },
    { id: '2', specValueIds: ['102'], price: 200, stock: 0 }
  ]

  it('renders specs correctly', () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus
      }
    })
    expect(wrapper.text()).toContain('Size')
    expect(wrapper.text()).toContain('S')
    expect(wrapper.text()).toContain('M')
  })

  it('handles item selection', async () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        modelValue: []
      }
    })
    const items = wrapper.findAll('.yh-sku-selector__value')
    await items[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('disables item with no stock', async () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus
      }
    })
    const items = wrapper.findAll('.yh-sku-selector__value')
    expect(items[1].classes()).toContain('is-disabled')
  })
})
