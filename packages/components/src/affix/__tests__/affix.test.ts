/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhAffix } from '../index'

// Mock Observers
let ioCallback: any
class IntersectionObserverMock {
  constructor(public callback: any) {
    ioCallback = callback
  }
  observe = vi.fn(() => {
    ioCallback([{ isIntersecting: true }])
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
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      configurable: true
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = mount(YhAffix, {
      slots: {
        default: () => h('div', { class: 'content' }, 'Affix Content')
      }
    })
    expect(wrapper.find('.yh-affix').exists()).toBe(true)
  })

  it('should pin to top when scrolled past offset', async () => {
    const wrapper = mount(YhAffix, {
      props: {
        offset: 50,
        position: 'top'
      }
    })

    const vm = wrapper.vm as any
    const rootEl = wrapper.element as HTMLElement

    rootEl.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 200,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    vm.update()
    expect(vm.fixed).toBe(false)

    rootEl.getBoundingClientRect = vi.fn(() => ({
      top: 40,
      bottom: 140,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    vm.update()
    await nextTick()

    expect(vm.fixed).toBe(true)
    const inner = wrapper.find('.yh-affix__inner')
    expect(inner.classes()).toContain('is-fixed')
    expect((inner.element as HTMLElement).style.top).toBe('50px')
  })

  it('should pin to bottom correctly', async () => {
    const wrapper = mount(YhAffix, {
      props: {
        offset: 50,
        position: 'bottom'
      }
    })

    const vm = wrapper.vm as any
    const rootEl = wrapper.element as HTMLElement

    rootEl.getBoundingClientRect = vi.fn(() => ({
      top: 900,
      bottom: 1000,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))
    vm.update()
    await nextTick()

    expect(vm.fixed).toBe(true)
    const inner = wrapper.find('.yh-affix__inner')
    expect((inner.element as HTMLElement).style.bottom).toBe('50px')
  })

  it('should handle target container', async () => {
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)

    const wrapper = mount(YhAffix, {
      props: {
        target: '#container',
        offset: 0
      },
      attachTo: document.body
    })

    const vm = wrapper.vm as any
    const rootEl = wrapper.element as HTMLElement

    rootEl.getBoundingClientRect = vi.fn(() => ({
      top: -100,
      bottom: 0,
      width: 100,
      height: 100,
      left: 0,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    container.getBoundingClientRect = vi.fn(() => ({
      top: -200,
      bottom: 50,
      width: 100,
      height: 250,
      left: 0,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    vm.update()
    await nextTick()

    expect(vm.fixed).toBe(true)
    expect(vm.transform).toBe(-50)

    document.body.removeChild(container)
    wrapper.unmount()
  })

  it('should emit events', async () => {
    const wrapper = mount(YhAffix, {
      props: { offset: 0 }
    })
    const vm = wrapper.vm as any
    const rootEl = wrapper.element as HTMLElement

    rootEl.getBoundingClientRect = vi.fn(() => ({
      top: -10,
      bottom: 90,
      width: 100,
      height: 100,
      left: 0,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    vm.update()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('scroll')).toBeTruthy()
  })
})
