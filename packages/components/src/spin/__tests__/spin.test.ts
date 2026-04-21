import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { YhSpin } from '../index'

describe('Spin', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

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

  it('should cancel delayed show when hidden before the timer completes', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhSpin, {
      props: {
        show: true,
        delay: 300
      }
    })

    await wrapper.setProps({ show: false })
    vi.advanceTimersByTime(400)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.yh-spin').exists()).toBe(false)
    expect(wrapper.emitted('show')).toBeFalsy()
    expect(wrapper.emitted('hide')).toHaveLength(1)
  })

  it('should support object gradients and alternate spinner types', () => {
    const wrapper = mount(YhSpin, {
      props: {
        type: 'gear',
        color: {
          '0%': '#ff4d4f',
          '100%': '#1677ff'
        }
      }
    })

    expect(wrapper.find('.yh-spin__gear').exists()).toBe(true)
    expect(wrapper.findAll('stop')).toHaveLength(2)
    expect(wrapper.find('.yh-spin').attributes('style')).toContain('--yh-spin-color-is-gradient: true')
  })

  it('should render wrapper mode and glass class when default content is provided', () => {
    const wrapper = mount(YhSpin, {
      props: {
        show: true
      },
      slots: {
        default: () => h('div', { class: 'content' }, 'inner')
      }
    })

    expect(wrapper.find('.yh-spin-wrapper').exists()).toBe(true)
    expect(wrapper.find('.yh-spin').classes()).toContain('is-glass')
    expect(wrapper.text()).toContain('inner')
  })

  it('should fallback to default size for unsupported size strings', () => {
    const wrapper = mount(YhSpin, {
      props: {
        show: true,
        size: 'unknown' as any
      }
    })

    expect(wrapper.find('.yh-spin').classes()).toContain('yh-spin--unknown')
    expect(wrapper.find('.yh-spin__svg').attributes('style')).toContain('width: 32px;')
    expect(wrapper.find('.yh-spin__svg').attributes('style')).toContain('height: 32px;')
  })

  it('should support array gradient colors without throwing', () => {
    const wrapper = mount(YhSpin, {
      props: {
        show: true,
        type: 'circle',
        color: ['#ff4d4f', '#faad14', '#1677ff']
      }
    })

    expect(wrapper.findAll('stop')).toHaveLength(3)
    expect(wrapper.find('.yh-spin').classes()).toContain('is-gradient')
  })
})
