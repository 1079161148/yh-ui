/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhWaterfall } from '../index'
import { nextTick } from 'vue'

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('Waterfall', () => {
  const items = [
    { id: 1, title: 'Card 1', height: 200 },
    { id: 2, title: 'Card 2', height: 300 },
    { id: 3, title: 'Card 3', height: 150 },
    { id: 4, title: 'Card 4', height: 400 }
  ]

  it('should render correctly with default props', () => {
    const wrapper = mount(YhWaterfall, {
      props: { items }
    })
    expect(wrapper.classes()).toContain('yh-waterfall')
    expect(wrapper.findAll('.yh-waterfall__column').length).toBe(2)
  })

  it('should support responsive columns', async () => {
    const wrapper = mount(YhWaterfall, {
      props: {
        items,
        cols: { xs: 1, sm: 2, md: 3, lg: 4 },
        responsive: true
      }
    })

    const vm = wrapper.vm as any
    // Mock containerWidth directly since we can't easily change physical offsetWidth in happy-dom
    vm.containerWidth = 800
    await nextTick()
    expect(wrapper.findAll('.yh-waterfall__column').length).toBe(3)

    vm.containerWidth = 600
    await nextTick()
    expect(wrapper.findAll('.yh-waterfall__column').length).toBe(2)
  })

  it('should use shortest column algorithm', async () => {
    const wrapper = mount(YhWaterfall, {
      props: {
        items,
        cols: 2,
        heightProperty: 'height',
        gap: 10
      }
    })

    await nextTick()
    const columns = wrapper.findAll('.yh-waterfall__column')
    expect(columns[0].findAll('.yh-waterfall__item').length).toBe(2)
    expect(columns[1].findAll('.yh-waterfall__item').length).toBe(2)
  })

  it('should handle image load and update layout', async () => {
    const wrapper = mount(YhWaterfall, {
      props: { items }
    })

    // We check if it sets containerWidth (initial is 0)
    const vm = wrapper.vm as any
    const initialWidth = vm.containerWidth

    // Mock offsetWidth
    Object.defineProperty(wrapper.element, 'offsetWidth', { value: 1024, configurable: true })

    const img = document.createElement('img')
    const event = new Event('load', { bubbles: true })
    Object.defineProperty(event, 'target', { value: img })

    wrapper.element.dispatchEvent(event)

    // Wait for nextTick and requestAnimationFrame
    await nextTick()
    await new Promise((r) => setTimeout(r, 20))

    expect(vm.containerWidth).toBe(1024)
  })

  it('should handle loading states', async () => {
    const wrapper = mount(YhWaterfall, {
      props: { items: [], loading: true }
    })

    expect(wrapper.findAll('.yh-waterfall__item--skeleton').length).toBeGreaterThan(0)

    await wrapper.setProps({ loading: false })
    await nextTick()
    expect(wrapper.find('.yh-waterfall__empty').exists()).toBe(true)
  })

  it('should support Refresh Overlay', async () => {
    const wrapper = mount(YhWaterfall, {
      props: { items, loading: true }
    })
    // when items > 0 and loading is true, isRefreshing is true
    expect(wrapper.find('.yh-waterfall__refresh-overlay').exists()).toBe(true)
  })
})
