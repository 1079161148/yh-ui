import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Price from '../src/price.vue'

describe('Price', () => {
  it('renders numeric values correctly', () => {
    const wrapper = mount(Price, {
      props: {
        value: 123.456
      }
    })
    expect(wrapper.text()).toContain('¥')
    expect(wrapper.text()).toContain('123')
    expect(wrapper.text()).toContain('.46') // default precision 2
  })

  it('customizes currency symbol', () => {
    const wrapper = mount(Price, {
      props: {
        value: 10,
        symbol: '$'
      }
    })
    expect(wrapper.text()).toContain('$')
  })

  it('renders line-through style', () => {
    const wrapper = mount(Price, {
      props: {
        value: 50,
        lineThrough: true
      }
    })
    expect(wrapper.classes()).toContain('is-line-through')
  })

  it('handles small/large sizes', () => {
    const wrapper = mount(Price, {
      props: {
        value: 10,
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('yh-price--large')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(Price, {
      props: {
        value: 10,
        themeOverrides: {
          '--yh-price-color': '#ff4d4f'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-price-color: #ff4d4f')
  })

  it('renders thousandth + range + delete value branches', () => {
    const wrapper = mount(Price, {
      props: {
        value: 12345.6,
        thousandth: true,
        maxValue: 20000,
        deleteValue: 30000,
        deleteLabel: '原价',
        unit: '/件',
        symbolPosition: 'after'
      }
    })

    expect(wrapper.text()).toContain('12,345.60')
    expect(wrapper.text()).toContain('20,000.00')
    expect(wrapper.text()).toContain('原价')
    expect(wrapper.text()).toContain('/件')
    expect(wrapper.findAll('.yh-price__symbol').length).toBe(1)
    expect(wrapper.find('.yh-price__delete-symbol').exists()).toBe(true)
  })

  it('renders prefix/tag/approx/suffix and gradient style', () => {
    const wrapper = mount(Price, {
      props: {
        value: 99,
        prefix: '约',
        suffix: '起',
        tag: '券后',
        approx: true,
        split: true,
        bold: true,
        gradient: ['#111111', '#222222']
      }
    })

    expect(wrapper.text()).toContain('约')
    expect(wrapper.text()).toContain('起')
    expect(wrapper.text()).toContain('券后')
    expect(wrapper.text()).toContain('~')
    expect(wrapper.classes()).toContain('is-gradient')
    expect(wrapper.classes()).toContain('is-bold')
    expect(wrapper.attributes('style')).toContain('linear-gradient')
  })

  it('handles invalid numeric input and zero precision', () => {
    const wrapper = mount(Price, {
      props: {
        value: Number.NaN,
        precision: 0
      }
    })
    expect(wrapper.text()).toContain('0')
  })
})
