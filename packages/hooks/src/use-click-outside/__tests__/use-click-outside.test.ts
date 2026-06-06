/**
 * hooks/src/use-click-outside.ts 单元测试
 * 由于 useClickOutside 内部依赖 useEventListener（需 Vue 组件生命周期）
 * 需在组件上下文中调用
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useClickOutside } from '../../use-click-outside'

/**
 * 工厂：在 Vue 组件 setup 内执行 hook，返回 wrapper（已 mounted）
 */
function withClickOutside(targetEl: HTMLElement, handler: (evt: MouseEvent | TouchEvent) => void) {
  const TestComp = defineComponent({
    setup() {
      useClickOutside(targetEl, handler)
      return {}
    },
    template: '<div/>'
  })
  return mount(TestComp, { attachTo: document.body })
}

describe('useClickOutside', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('should call handler when clicking outside target', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const handler: (evt: MouseEvent | TouchEvent) => void = vi.fn()

    const wrapper = withClickOutside(target, handler)
    await nextTick()

    const outside = document.createElement('span')
    document.body.appendChild(outside)

    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'composedPath', {
      value: () => [outside, document.body, document.documentElement, window]
    })
    window.dispatchEvent(event)

    expect(vi.mocked(handler)).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should NOT call handler when clicking inside target', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const handler: (evt: MouseEvent | TouchEvent) => void = vi.fn()

    const wrapper = withClickOutside(target, handler)
    await nextTick()

    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'composedPath', {
      value: () => [target, document.body, document.documentElement, window]
    })
    window.dispatchEvent(event)

    expect(vi.mocked(handler)).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with a ref target — calls handler for outside click', async () => {
    // ref 版本：target 本身不在 path 中 => handler 被调用
    const target = document.createElement('div')
    document.body.appendChild(target)
    const targetRef = ref<HTMLElement | null>(target)
    const handler: (evt: MouseEvent | TouchEvent) => void = vi.fn()

    const TestComp = defineComponent({
      setup() {
        useClickOutside(targetRef, handler)
        return {}
      },
      template: '<div/>'
    })
    const wrapper = mount(TestComp, { attachTo: document.body })
    await nextTick()

    // 构造 composedPath 不含 target => outside click
    const outside = document.createElement('button')
    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'composedPath', {
      configurable: true,
      value: () => [outside, document.body, document.documentElement, window]
    })
    window.dispatchEvent(event)

    // useEventListener 注册到 window，handler 内部检查 composedPath
    // 只要 composedPath 不包含 target，handler 应被调用
    expect(vi.mocked(handler)).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should NOT call handler when target ref is null', async () => {
    const nullRef = ref<HTMLElement | null>(null)
    const handler: (evt: MouseEvent | TouchEvent) => void = vi.fn()

    const TestComp = defineComponent({
      setup() {
        useClickOutside(nullRef, handler)
        return {}
      },
      template: '<div/>'
    })
    const wrapper = mount(TestComp, { attachTo: document.body })
    await nextTick()

    const event = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(event, 'composedPath', { value: () => [document.body] })
    window.dispatchEvent(event)

    expect(vi.mocked(handler)).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should handle touchstart events outside target', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const handler: (evt: MouseEvent | TouchEvent) => void = vi.fn()

    const wrapper = withClickOutside(target, handler)
    await nextTick()

    const outside = document.createElement('span')
    document.body.appendChild(outside)
    const event = new TouchEvent('touchstart', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'composedPath', {
      value: () => [outside, document.body, document.documentElement, window]
    })
    window.dispatchEvent(event)

    expect(vi.mocked(handler)).toHaveBeenCalled()
    wrapper.unmount()
  })
})
