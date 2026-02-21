import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from '../src/grid.vue'
import GridItem from '../src/grid-item.vue'

describe('YhGrid', () => {
  it('应该渲染基础结构', () => {
    const wrapper = mount(Grid)
    expect(wrapper.find('.yh-grid').exists()).toBe(true)
  })

  it('默认 12 列', () => {
    const wrapper = mount(Grid)
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('grid-template-columns: repeat(12, 1fr)')
  })

  it('应该支持自定义列数', () => {
    const wrapper = mount(Grid, { props: { cols: 4 } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('grid-template-columns: repeat(4, 1fr)')
  })

  it('应该支持字符串列定义', () => {
    const wrapper = mount(Grid, { props: { cols: '200px 1fr 200px' } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('grid-template-columns: 200px 1fr 200px')
  })

  it('应该支持 gap 属性', () => {
    const wrapper = mount(Grid, { props: { gap: 16 } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('gap: 16px')
  })

  it('应该支持数组 gap [col, row]', () => {
    const wrapper = mount(Grid, { props: { gap: [8, 16] } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('column-gap: 8px')
    expect(style).toContain('row-gap: 16px')
  })

  it('应该支持 colGap/rowGap', () => {
    const wrapper = mount(Grid, { props: { colGap: 10, rowGap: 20 } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('column-gap: 10px')
    expect(style).toContain('row-gap: 20px')
  })

  it('应该支持 justifyItems', () => {
    const wrapper = mount(Grid, { props: { justifyItems: 'center' } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('justify-items: center')
  })

  it('应该支持 alignItems', () => {
    const wrapper = mount(Grid, { props: { alignItems: 'end' } })
    const style = wrapper.find('.yh-grid').attributes('style')
    expect(style).toContain('align-items: end')
  })

  it('应该渲染插槽内容', () => {
    const wrapper = mount(Grid, {
      slots: { default: '<div class="child">内容</div>' }
    })
    expect(wrapper.find('.child').exists()).toBe(true)
  })
})

describe('YhGridItem', () => {
  it('应该渲染基础结构', () => {
    const wrapper = mount(GridItem)
    expect(wrapper.find('.yh-grid-item').exists()).toBe(true)
  })

  it('应该支持 span 跨列', () => {
    const wrapper = mount(GridItem, { props: { span: 3 } })
    const style = wrapper.find('.yh-grid-item').attributes('style')
    expect(style).toContain('grid-column: span 3')
  })

  it('span 为 1 时不设置 grid-column', () => {
    const wrapper = mount(GridItem, { props: { span: 1 } })
    const style = wrapper.find('.yh-grid-item').attributes('style') || ''
    expect(style).not.toContain('grid-column')
  })

  it('应该支持 offset 偏移', () => {
    const wrapper = mount(GridItem, { props: { offset: 2, span: 3 } })
    const style = wrapper.find('.yh-grid-item').attributes('style')
    expect(style).toContain('grid-column: 3 / span 3')
  })

  it('应该支持 suffix 定位到行末', () => {
    const wrapper = mount(GridItem, { props: { suffix: true } })
    expect(wrapper.find('.yh-grid-item').classes()).toContain('is-suffix')
  })

  it('应该渲染插槽内容', () => {
    const wrapper = mount(GridItem, {
      slots: { default: '<span>网格项</span>' }
    })
    expect(wrapper.text()).toBe('网格项')
  })
})
