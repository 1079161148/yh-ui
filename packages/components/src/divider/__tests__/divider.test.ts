/**
 * Divider Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Divider from '../src/divider.vue'

describe('YhDivider', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Divider)
    expect(wrapper.classes()).toContain('yh-divider')
    expect(wrapper.classes()).toContain('yh-divider--horizontal')
    expect(wrapper.attributes('role')).toBe('separator')
  })

  // 垂直方向测试
  it('should support vertical direction', () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'vertical'
      }
    })
    expect(wrapper.classes()).toContain('yh-divider--vertical')
  })

  // 内容文字和位置测试
  it('should render content with specific position', () => {
    const positions = ['left', 'right'] as const
    positions.forEach((position) => {
      const wrapper = mount(Divider, {
        props: {
          contentPosition: position
        },
        slots: {
          default: 'Divider Text'
        }
      })
      expect(wrapper.find('.yh-divider__text').exists()).toBe(true)
      expect(wrapper.find('.yh-divider__text').text()).toBe('Divider Text')
      expect(wrapper.classes()).toContain(`yh-divider--content-${position}`)
      expect(wrapper.find('.yh-divider__text').classes()).toContain(`is-${position}`)
    })
  })

  // 垂直方向不应渲染文字测试
  it('should not render text when direction is vertical', () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'vertical'
      },
      slots: {
        default: 'Text'
      }
    })
    expect(wrapper.find('.yh-divider__text').exists()).toBe(false)
  })

  // 自定义样式测试
  it('should apply custom styles correctly', () => {
    const wrapper = mount(Divider, {
      props: {
        borderStyle: 'dashed',
        borderWidth: 2,
        color: 'red'
      }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('--yh-divider-border-style: dashed')
    expect(style).toContain('--yh-divider-border-width: 2px')
    expect(style).toContain('--yh-divider-border-color: red')
  })

  // 边框宽度支持字符串测试
  it('should support string border width', () => {
    const wrapper = mount(Divider, {
      props: {
        borderWidth: '1rem'
      }
    })
    expect(wrapper.attributes('style')).toContain('--yh-divider-border-width: 1rem')
  })
})
