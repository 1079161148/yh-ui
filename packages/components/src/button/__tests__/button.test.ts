/**
 * Button Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('YhButton', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.classes()).toContain('yh-button')
  })

  // 类型测试
  it('should apply type class', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: 'Primary' }
    })
    expect(wrapper.classes()).toContain('yh-button--primary')
  })

  // 尺寸测试
  it('should apply size class', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' },
      slots: { default: 'Large' }
    })
    expect(wrapper.classes()).toContain('yh-button--large')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  // 加载状态测试
  it('should show loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading' }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.yh-button__loading-icon').exists()).toBe(true)
  })

  // 朴素按钮测试
  it('should apply plain class', () => {
    const wrapper = mount(Button, {
      props: { plain: true },
      slots: { default: 'Plain' }
    })
    expect(wrapper.classes()).toContain('is-plain')
  })

  // 圆角按钮测试
  it('should apply round class', () => {
    const wrapper = mount(Button, {
      props: { round: true },
      slots: { default: 'Round' }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  // 圆形按钮测试
  it('should apply circle class', () => {
    const wrapper = mount(Button, {
      props: { circle: true }
    })
    expect(wrapper.classes()).toContain('is-circle')
  })

  it('should apply circle class with different types', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'] as const
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { circle: true, type }
      })
      expect(wrapper.classes()).toContain('is-circle')
      expect(wrapper.classes()).toContain(`yh-button--${type}`)
    })
  })

  // 点击事件测试
  it('should emit click event', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  // 禁用状态不触发点击事件
  it('should not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 加载状态不触发点击事件
  it('should not emit click event when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 原生类型测试
  it('should set native type', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
      slots: { default: 'Submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  // 块级按钮测试
  it('should apply block class', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      slots: { default: 'Block' }
    })
    expect(wrapper.classes()).toContain('is-block')
  })

  // 文字按钮测试
  it('should apply text class', () => {
    const wrapper = mount(Button, {
      props: { text: true },
      slots: { default: 'Text' }
    })
    expect(wrapper.classes()).toContain('is-text')
  })

  // 链接按钮测试
  it('should apply link class', () => {
    const wrapper = mount(Button, {
      props: { link: true },
      slots: { default: 'Link' }
    })
    expect(wrapper.classes()).toContain('is-link')
  })

  // 自定义颜色测试
  it('should apply custom color style', () => {
    const wrapper = mount(Button, {
      props: { color: '#6366f1' },
      slots: { default: 'Custom' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('--yh-button-bg-color: #6366f1')
  })

  // 自定义标签测试
  it('should render custom tag', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' },
      slots: { default: 'Link' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })
})
