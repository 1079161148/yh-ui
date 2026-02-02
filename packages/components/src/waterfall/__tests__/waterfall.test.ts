import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhWaterfall } from '../index'

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

describe('Waterfall', () => {
  const items = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    { id: 4, title: 'Card 4' }
  ]

  it('should render correctly with default props', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items }
    })
    expect(wrapper.classes()).toContain('yh-waterfall')
    // Default cols is 2
    expect(wrapper.findAll('.yh-waterfall__column').length).toBe(2)
  })

  it('should render correct number of columns', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items, cols: 3 }
    })
    expect(wrapper.findAll('.yh-waterfall__column').length).toBe(3)
  })

  it('should apply gap style', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items, gap: 20 }
    })
    const el = wrapper.element as HTMLElement
    expect(el.style.gap).toBe('20px')

    const columns = wrapper.findAll('.yh-waterfall__column')
    columns.forEach((col) => {
      expect((col.element as HTMLElement).style.gap).toBe('20px')
    })
  })

  it('should distribution items to columns correctly', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items, cols: 2 }
    })
    const columns = wrapper.findAll('.yh-waterfall__column')
    // 4 items, 2 cols -> 2 items per col (simple distribution)
    expect(columns[0].findAll('.yh-waterfall__item').length).toBe(2)
    expect(columns[1].findAll('.yh-waterfall__item').length).toBe(2)
  })

  it('should support custom row-key', () => {
    const customItems = [{ uuid: 'a' }, { uuid: 'b' }]
    const wrapper = mount(YhWaterfall, {
      props: {
        items: customItems,
        rowKey: 'uuid'
      },
      slots: {
        default: '<div class="test-item"></div>'
      }
    })
    expect(wrapper.findAll('.yh-waterfall__item').length).toBe(2)
  })

  it('should toggle animation', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items, animation: false }
    })
    expect(wrapper.find('.yh-waterfall__item--animated').exists()).toBe(false)

    const animatedWrapper = mount(YhWaterfall, {
      props: { items, animation: true }
    })
    expect(animatedWrapper.find('.yh-waterfall__item--animated').exists()).toBe(true)
  })

  it('should show empty state when items is empty', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items: [] }
    })
    expect(wrapper.find('.yh-waterfall__empty').exists()).toBe(true)
    expect(wrapper.find('.yh-waterfall__empty').text()).toBe('暂无数据')
  })
})
