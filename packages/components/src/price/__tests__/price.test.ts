import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Price from '../src/price.vue'

describe('Price', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  it('renders symbol, tag and unit slots', () => {
    const wrapper = mount(Price, {
      props: {
        value: 88,
        tagType: 'success'
      },
      slots: {
        symbol: '<span class="symbol-slot">USD</span>',
        tag: '<span class="tag-slot">Member</span>',
        unit: '<span class="unit-slot">month</span>'
      }
    })

    expect(wrapper.find('.symbol-slot').text()).toBe('USD')
    expect(wrapper.find('.tag-slot').text()).toBe('Member')
    expect(wrapper.find('.unit-slot').text()).toBe('month')
    expect(wrapper.find('.yh-price__tag--success').exists()).toBe(true)
  })

  it('animates value and maxValue updates', async () => {
    const frames: FrameRequestCallback[] = []
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      frames.push(cb)
      return frames.length
    })
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    vi.spyOn(performance, 'now').mockReturnValue(0)

    const wrapper = mount(Price, {
      props: {
        value: 100,
        maxValue: 200,
        animated: true
      }
    })

    expect(raf).toHaveBeenCalled()
    frames.splice(0).forEach((frame) => frame(1000))
    await nextTick()
    expect(wrapper.text()).toContain('100.00')
    expect(wrapper.text()).toContain('200.00')

    await wrapper.setProps({ value: 150, maxValue: 250 })
    expect(cancel).toHaveBeenCalledWith(2)
    frames.splice(0).forEach((frame) => frame(1000))
    await nextTick()
    expect(wrapper.text()).toContain('150.00')
    expect(wrapper.text()).toContain('250.00')
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
