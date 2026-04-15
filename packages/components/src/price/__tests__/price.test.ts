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
})
