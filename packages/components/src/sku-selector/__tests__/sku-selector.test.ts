import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import SkuSelector from '../src/sku-selector.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

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

  it('uses config-provider locale summary placeholder', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(SkuSelector, {
            specs,
            skus,
            showSelectedSummary: true
          })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('Select specifications')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        themeOverrides: {
          'value-active-border': '#409eff'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-sku-selector-value-active-border: #409eff')
  })

  it('supports allowUnselect=false branch (active value cannot be toggled off)', async () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        modelValue: ['101'],
        allowUnselect: false
      }
    })
    const first = wrapper.findAll('.yh-sku-selector__value')[0]
    await first.trigger('click')

    const updates = wrapper.emitted('update:modelValue') || []
    expect(updates.length).toBe(0)
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('disabled=true should prevent value change', async () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        disabled: true
      }
    })
    const first = wrapper.findAll('.yh-sku-selector__value')[0]
    await first.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('renders summary text with custom prefix when selected', () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        modelValue: ['101'],
        showSelectedSummary: true,
        summaryPrefix: '已选'
      }
    })
    expect(wrapper.text()).toContain('已选: S')
  })

  it('renders color and image mode branches', () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs: [
          {
            id: '1',
            name: 'Color',
            mode: 'color',
            values: [{ id: 'c1', name: 'Red', color: '#f00' }]
          },
          {
            id: '2',
            name: 'Image',
            mode: 'image',
            values: [{ id: 'i1', name: 'Pic', image: 'https://a.com/1.png', tag: 'HOT' }]
          }
        ],
        skus: [{ id: 's1', specValueIds: ['c1', 'i1'], price: 10, stock: 5 }]
      }
    })
    expect(wrapper.find('.yh-sku-selector__color-swatch').exists()).toBe(true)
    expect(wrapper.find('.yh-sku-selector__item-img').exists()).toBe(true)
    expect(wrapper.text()).toContain('HOT')
  })

  it('supports summary/label/value slots', () => {
    const wrapper = mount(SkuSelector, {
      props: {
        specs,
        skus,
        showSelectedSummary: true
      },
      slots: {
        summary: '<div class="custom-summary">SLOT_SUMMARY</div>',
        label: '<span class="custom-label">SLOT_LABEL</span>',
        value: '<span class="custom-value">SLOT_VALUE</span>'
      }
    })
    expect(wrapper.find('.custom-summary').exists()).toBe(true)
    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })
})
