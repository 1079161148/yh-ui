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
})
