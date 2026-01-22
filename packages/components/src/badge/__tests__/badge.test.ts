import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../src/badge.vue'

describe('Badge 组件', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12
      },
      slots: {
        default: '<button>按钮</button>'
      }
    })
    expect(wrapper.find('.yh-badge').exists()).toBe(true)
    expect(wrapper.find('.yh-badge__content').text()).toBe('12')
  })

  it('应该支持最大值限制', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 200,
        max: 99
      }
    })
    expect(wrapper.find('.yh-badge__content').text()).toBe('99+')
  })

  it('应该支持小红点模式', () => {
    const wrapper = mount(Badge, {
      props: {
        isDot: true
      }
    })
    expect(wrapper.find('.yh-badge__content').classes()).toContain('is-dot')
  })

  it('应该支持隐藏徽标', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12,
        hidden: true
      }
    })
    expect(wrapper.find('.yh-badge__content').exists()).toBe(false)
  })

  it('应该支持不同类型', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12,
        type: 'success'
      }
    })
    expect(wrapper.find('.yh-badge__content').classes()).toContain('yh-badge__content--success')
  })

  it('应该支持自定义颜色', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12,
        color: '#ff0000'
      }
    })
    const content = wrapper.find('.yh-badge__content')
    const style = content.attributes('style')
    expect(style).toMatch(/background-color:\s*(#ff0000|rgb\(255, 0, 0\))/i)
  })

  it('应该支持偏移设置', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12,
        offset: [10, 10]
      },
      slots: {
        default: '<button>按钮</button>'
      }
    })
    const content = wrapper.find('.yh-badge__content')
    expect(content.attributes('style')).toContain('transform')
  })

  it('当值为0且showZero为false时不显示', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 0,
        showZero: false
      }
    })
    expect(wrapper.find('.yh-badge__content').exists()).toBe(false)
  })

  it('当值为0且showZero为true时显示', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 0,
        showZero: true
      }
    })
    expect(wrapper.find('.yh-badge__content').text()).toBe('0')
  })

  it('应该支持自定义内容插槽', () => {
    const wrapper = mount(Badge, {
      slots: {
        content: '<span class="custom-content">Custom</span>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('Custom')
  })

  it('应该支持无边框模式', () => {
    const wrapper = mount(Badge, {
      props: {
        value: 12,
        showBorder: false
      }
    })
    expect(wrapper.find('.yh-badge__content').classes()).toContain('is-no-border')
  })
})
