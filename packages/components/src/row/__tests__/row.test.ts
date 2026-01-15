/**
 * Row Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Row from '../src/row.vue'

describe('YhRow', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Row, {
      slots: {
        default: 'Row Content'
      }
    })
    expect(wrapper.text()).toContain('Row Content')
    expect(wrapper.classes()).toContain('yh-row')
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  // 自定义标签测试
  it('should render with custom tag', () => {
    const wrapper = mount(Row, {
      props: {
        tag: 'section'
      }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
  })

  // 间隔测试 (Gutter)
  it('should apply gutter styles correctly', () => {
    const gutter = 20
    const wrapper = mount(Row, {
      props: {
        gutter
      }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain(`margin-left: -${gutter / 2}px`)
    expect(style).toContain(`margin-right: -${gutter / 2}px`)
  })

  // 水平对齐方式测试 (Justify)
  it('should apply justify classes correctly', () => {
    const justifyList = ['center', 'end', 'space-around', 'space-between', 'space-evenly'] as const
    justifyList.forEach((justify) => {
      const wrapper = mount(Row, {
        props: {
          justify
        }
      })
      expect(wrapper.classes()).toContain(`is-justify-${justify}`)
    })

    // 默认 start 不应该有 is-justify-start 类名 (根据代码逻辑)
    const wrapperDefault = mount(Row, {
      props: {
        justify: 'start'
      }
    })
    expect(wrapperDefault.classes()).not.toContain('is-justify-start')
  })

  // 垂直对齐方式测试 (Align)
  it('should apply align classes correctly', () => {
    const alignList = ['middle', 'bottom'] as const
    alignList.forEach((align) => {
      const wrapper = mount(Row, {
        props: {
          align
        }
      })
      expect(wrapper.classes()).toContain(`is-align-${align}`)
    })

    // 默认 top 不应该有 is-align-top 类名
    const wrapperDefault = mount(Row, {
      props: {
        align: 'top'
      }
    })
    expect(wrapperDefault.classes()).not.toContain('is-align-top')
  })

  // 综合测试
  it('should apply multiple props correctly', () => {
    const wrapper = mount(Row, {
      props: {
        tag: 'nav',
        gutter: 30,
        justify: 'center',
        align: 'middle'
      },
      slots: {
        default: 'Combined'
      }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('nav')
    expect(wrapper.classes()).toContain('is-justify-center')
    expect(wrapper.classes()).toContain('is-align-middle')
    expect(wrapper.attributes('style')).toContain('margin-left: -15px')
    expect(wrapper.text()).toBe('Combined')
  })
})
