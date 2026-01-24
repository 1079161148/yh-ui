/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YhSkeleton from '../src/skeleton.vue'
import YhSkeletonItem from '../src/skeleton-item.vue'

describe('YhSkeleton', () => {
  it('should render correct number of rows', () => {
    const wrapper = mount(YhSkeleton, {
      props: {
        loading: true,
        rows: 5
      }
    })
    // 默认布局中有 rows 个 text 变体
    const items = wrapper.findAll('.yh-skeleton-item--text')
    expect(items.length).toBe(5)
  })

  it('should show avatar when props set', () => {
    const wrapper = mount(YhSkeleton, {
      props: {
        loading: true,
        avatar: true
      }
    })
    expect(wrapper.find('.yh-skeleton-item--circle').exists()).toBe(true)
  })

  it('should hidden when loading is false', () => {
    const wrapper = mount(YhSkeleton, {
      props: {
        loading: false
      },
      slots: {
        default: '<div class="real-content">Data</div>'
      }
    })
    expect(wrapper.find('.yh-skeleton').exists()).toBe(false)
    expect(wrapper.find('.real-content').exists()).toBe(true)
  })

  it('should handle throttle correctly', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhSkeleton, {
      props: {
        loading: true,
        throttle: 500
      }
    })
    // 初始不应显示
    expect(wrapper.find('.yh-skeleton').exists()).toBe(false)

    // 快进
    vi.advanceTimersByTime(501)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.yh-skeleton').exists()).toBe(true)
    vi.useRealTimers()
  })
})

describe('YhSkeletonItem', () => {
  it('should apply variant class', () => {
    const wrapper = mount(YhSkeletonItem, {
      props: { variant: 'button' }
    })
    expect(wrapper.classes()).toContain('yh-skeleton-item--button')
  })

  it('should repeat correctly', () => {
    const wrapper = mount(YhSkeletonItem, {
      props: { repeat: 3 }
    })
    // wrapper.findAll 返回的是根元素集合（如果有多个子元素且不在一个根下，VTU 的处理略有不同，但我们的实现是渲染多个节点）
    // 实际上我们在子组件使用了 template v-for，VTU mount 后包裹在了一个 div 中或者作为片段。
    // 我们检查 html 结构
    expect(wrapper.findAll('.yh-skeleton-item').length).toBe(3)
  })
})
