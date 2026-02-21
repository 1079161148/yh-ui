import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Space from '../src/space.vue'

describe('YhSpace 组件', () => {
  it('应该正确渲染基础结构', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    expect(wrapper.find('.yh-space').exists()).toBe(true)
    expect(wrapper.findAll('.yh-space__item')).toHaveLength(2)
  })

  it('应该支持水平方向（默认）', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    expect(wrapper.find('.yh-space').classes()).toContain('yh-space--horizontal')
  })

  it('应该支持垂直方向', () => {
    const wrapper = mount(Space, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    expect(wrapper.find('.yh-space').classes()).toContain('yh-space--vertical')
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('flex-direction: column')
  })

  it('应该支持预设尺寸 size', () => {
    const wrapper = mount(Space, {
      props: { size: 'large' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('gap: 24px')
  })

  it('应该支持自定义数字尺寸', () => {
    const wrapper = mount(Space, {
      props: { size: 40 },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('gap: 40px')
  })

  it('应该支持数组尺寸 [column, row]', () => {
    const wrapper = mount(Space, {
      props: { size: [10, 20] as [number, number] },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('column-gap: 10px')
    expect(style).toContain('row-gap: 20px')
  })

  it('应该支持自动换行 wrap', () => {
    const wrapper = mount(Space, {
      props: { wrap: true },
      slots: {
        default: () => Array.from({ length: 10 }, (_, i) => h('div', `Item ${i}`))
      }
    })
    expect(wrapper.find('.yh-space').classes()).toContain('is-wrap')
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('flex-wrap: wrap')
  })

  it('应该正确展平 v-for Fragment 子节点实现换行', () => {
    // 模拟 v-for 产生的 Fragment VNode
    const wrapper = mount(Space, {
      props: { wrap: true },
      slots: {
        default: () => Array.from({ length: 5 }, (_, i) => h('span', { key: i }, `B${i}`))
      }
    })
    expect(wrapper.findAll('.yh-space__item')).toHaveLength(5)
  })

  it('应该支持 fill 属性', () => {
    const wrapper = mount(Space, {
      props: { fill: true },
      slots: {
        default: () => [h('div', 'A')]
      }
    })
    expect(wrapper.find('.yh-space').classes()).toContain('is-fill')
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('width: 100%')
  })

  it('应该支持对齐方式 align', () => {
    const wrapper = mount(Space, {
      props: { align: 'start' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('align-items: start')
  })

  it('应该支持主轴对齐 justify', () => {
    const wrapper = mount(Space, {
      props: { justify: 'space-between', fill: true },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('justify-content: space-between')
  })

  it('应该支持 spacer prop 分隔符', () => {
    const wrapper = mount(Space, {
      props: { spacer: '|' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B'), h('div', 'C')]
      }
    })
    const spacers = wrapper.findAll('.yh-space__spacer')
    expect(spacers).toHaveLength(2)
    expect(spacers[0].text()).toBe('|')
    expect(spacers[1].text()).toBe('|')
  })

  it('应该支持 #spacer 插槽自定义分隔符', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => [h('div', 'A'), h('div', 'B'), h('div', 'C')],
        spacer: () => h('span', { class: 'custom-sep' }, '—')
      }
    })
    const spacers = wrapper.findAll('.yh-space__spacer')
    expect(spacers).toHaveLength(2)
    expect(spacers[0].find('.custom-sep').exists()).toBe(true)
    expect(spacers[0].find('.custom-sep').text()).toBe('—')
  })

  it('分隔符不应出现在最后一个元素之后', () => {
    const wrapper = mount(Space, {
      props: { spacer: '|' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const spacers = wrapper.findAll('.yh-space__spacer')
    expect(spacers).toHaveLength(1)
  })

  it('无分隔符时不应渲染 spacer 元素', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    expect(wrapper.findAll('.yh-space__spacer')).toHaveLength(0)
  })

  it('单个子元素时不应渲染分隔符', () => {
    const wrapper = mount(Space, {
      props: { spacer: '|' },
      slots: {
        default: () => [h('div', 'Only')]
      }
    })
    expect(wrapper.findAll('.yh-space__spacer')).toHaveLength(0)
  })

  it('应该支持 mini 尺寸', () => {
    const wrapper = mount(Space, {
      props: { size: 'mini' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('gap: 4px')
  })

  it('应该支持 medium 尺寸', () => {
    const wrapper = mount(Space, {
      props: { size: 'medium' },
      slots: {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    })
    const style = wrapper.find('.yh-space').attributes('style')
    expect(style).toContain('gap: 16px')
  })
})
