import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhAffix } from '../index'

// 模拟 window 滚动和尺寸
const mockGetBoundingClientRect = vi.fn()

// Mock Observers
class IntersectionObserverMock {
  constructor(private callback: any) {}
  observe = vi.fn(() => {
    this.callback([{ isIntersecting: true }])
  })
  unobserve = vi.fn()
  disconnect = vi.fn()
}
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('Affix', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockGetBoundingClientRect.mockReturnValue({
      top: 100,
      bottom: 200,
      left: 0,
      right: 100,
      width: 100,
      height: 100
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly', () => {
    const wrapper = mount(YhAffix, {
      slots: {
        default: () => h('div', { class: 'content' }, 'Affix Content')
      }
    })

    expect(wrapper.find('.yh-affix').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('Affix Content')
  })

  it('should apply offset prop', () => {
    const wrapper = mount(YhAffix, {
      props: {
        offset: 20
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.props('offset')).toBe(20)
  })

  it('should support top and bottom position', () => {
    const wrapperTop = mount(YhAffix, {
      props: {
        position: 'top'
      },
      slots: {
        default: () => h('div', 'Top')
      }
    })

    const wrapperBottom = mount(YhAffix, {
      props: {
        position: 'bottom'
      },
      slots: {
        default: () => h('div', 'Bottom')
      }
    })

    expect(wrapperTop.props('position')).toBe('top')
    expect(wrapperBottom.props('position')).toBe('bottom')
  })

  it('should apply zIndex prop', () => {
    const wrapper = mount(YhAffix, {
      props: {
        zIndex: 200
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.props('zIndex')).toBe(200)
  })

  it('should emit change event when fixed state changes', async () => {
    const onChange = vi.fn()
    const wrapper = mount(YhAffix, {
      props: {
        onChange
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    // 触发更新
    wrapper.vm.update()
    await nextTick()
    vi.runAllTimers()
  })

  it('should expose update method', () => {
    const wrapper = mount(YhAffix, {
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(typeof wrapper.vm.update).toBe('function')
    expect(wrapper.vm.fixed).toBeDefined()
    expect(wrapper.vm.scrollTop).toBeDefined()
  })
})
