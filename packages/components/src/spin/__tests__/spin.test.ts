import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhSpin } from '../index'

describe('Spin', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhSpin, {
      props: {
        tip: 'loading'
      }
    })
    // 检查根节点或内部容器是否包含类名
    expect(wrapper.get('div').classes()).toContain('yh-spin')
    expect(wrapper.text()).toContain('loading')
  })

  it('should support dot mode', () => {
    const wrapper = mount(YhSpin, {
      props: {
        dot: true
      }
    })
    expect(wrapper.find('.yh-spin__dots').exists()).toBe(true)
    expect(wrapper.findAll('.yh-spin__dots i')).toHaveLength(4)
  })

  it('should support sizes', () => {
    const wrapper = mount(YhSpin, {
      props: {
        size: 'large'
      }
    })
    expect(wrapper.get('div').classes()).toContain('yh-spin--large')
  })

  it('should support color and gradients', async () => {
    const wrapper = mount(YhSpin, {
      props: {
        color: 'linear-gradient(to right, red, blue)'
      }
    })
    expect(wrapper.get('div').classes()).toContain('is-gradient')
    // SVG definition should exist
    expect(wrapper.find('linearGradient').exists()).toBe(true)
  })

  it('should support delay', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhSpin, {
      props: {
        show: true,
        delay: 500
      }
    })
    // 初始状态不应该渲染带有 yh-spin 类的 div
    expect(wrapper.find('.yh-spin').exists()).toBe(false)

    vi.advanceTimersByTime(501)
    await wrapper.vm.$nextTick()
    // 延迟后显示
    expect(wrapper.find('.yh-spin').exists()).toBe(true)

    vi.useRealTimers()
  })

  it('should support tip slot', () => {
    const wrapper = mount(YhSpin, {
      slots: {
        tip: '<span class="custom-tip">Custom Tip</span>'
      }
    })
    expect(wrapper.find('.custom-tip').exists()).toBe(true)
    expect(wrapper.find('.custom-tip').text()).toBe('Custom Tip')
  })

  it('should keep themeOverrides prop and expose visible state', () => {
    const wrapper = mount(YhSpin, {
      props: {
        themeOverrides: {
          color: '#ff4d4f'
        }
      }
    })

    expect(wrapper.props('themeOverrides')).toEqual({ color: '#ff4d4f' })
    expect(wrapper.vm.visible).toBe(true)
  })

  it('should render wrapper mode when default slot exists', () => {
    const wrapper = mount(YhSpin, {
      slots: {
        default: '<div class="inside">content</div>'
      },
      props: {
        show: true
      }
    })
    expect(wrapper.find('.yh-spin-wrapper').exists()).toBe(true)
    expect(wrapper.find('.inside').exists()).toBe(true)
  })

  it('should support chaser/gear/dual-ring/rect types', () => {
    const chaser = mount(YhSpin, { props: { type: 'chaser' } })
    expect(chaser.find('.yh-spin__chaser').exists()).toBe(true)
    const gear = mount(YhSpin, { props: { type: 'gear' } })
    expect(gear.find('.yh-spin__gear').exists()).toBe(true)
    const ring = mount(YhSpin, { props: { type: 'dual-ring' } })
    expect(ring.find('.yh-spin__dual-ring').exists()).toBe(true)
    const rect = mount(YhSpin, { props: { type: 'rect' } })
    expect(rect.find('.yh-spin__rect').exists()).toBe(true)
  })

  it('should emit hide when show toggles false', async () => {
    const wrapper = mount(YhSpin, {
      props: {
        show: true
      }
    })
    await wrapper.setProps({ show: false })
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  it('should support gradient object and array color branches', () => {
    const obj = mount(YhSpin, {
      props: { color: { '0%': '#f00', '100%': '#00f' } as any }
    })
    expect(obj.find('linearGradient').exists()).toBe(true)
    const arr = mount(YhSpin, {
      props: { color: ['#111', '#222', '#333'] as any }
    })
    expect(arr.find('linearGradient').exists()).toBe(true)
  })
})
