import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhAffix } from '../index'

describe('Affix Bottom Logic', () => {
  let mockRect = {
    top: 500,
    bottom: 600,
    left: 100,
    width: 200,
    height: 100
  }

  beforeEach(() => {
    vi.stubGlobal('innerHeight', 800)

    // 模拟 getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      ...mockRect,
      right: mockRect.left + mockRect.width,
      toJSON: () => {}
    })) as any

    // 模拟 IntersectionObserver
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback) => {
        // 模拟立即触发相交
        setTimeout(() => {
          callback([{ isIntersecting: true }])
        }, 0)
        return {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn()
        }
      })
    )

    // 模拟 ResizeObserver
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
      }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('should not be fixed when distance from bottom is large', async () => {
    mockRect.bottom = 600 // Distance from bottom = 800 - 600 = 200 > offset 20
    const wrapper = mount(YhAffix, {
      props: { position: 'bottom', offset: 20 },
      slots: { default: () => h('div', 'content') }
    })

    // 等待 IntersectionObserver 的 setTimeout 回调
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()

    wrapper.vm.update()
    await nextTick()

    expect(wrapper.vm.fixed).toBe(false)
  })

  it('should be fixed when distance from bottom is small', async () => {
    mockRect.bottom = 790 // Distance from bottom = 800 - 790 = 10 < offset 20
    const wrapper = mount(YhAffix, {
      props: { position: 'bottom', offset: 20 },
      slots: { default: () => h('div', 'content') }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()

    wrapper.vm.update()
    await nextTick()

    expect(wrapper.vm.fixed).toBe(true)
  })

  it('should apply correct fixed style for bottom', async () => {
    mockRect.bottom = 790
    const wrapper = mount(YhAffix, {
      props: { position: 'bottom', offset: 20 },
      slots: { default: () => h('div', 'content') }
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()

    wrapper.vm.update()
    await nextTick()

    const inner = wrapper.find('.yh-affix__inner')
    const style = inner.attributes('style')
    expect(style).toContain('position: fixed')
    expect(style).toContain('bottom: 20px')
    expect(style).toContain('left: 100px')
  })
})
