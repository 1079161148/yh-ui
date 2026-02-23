import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h, ref, defineComponent } from 'vue'
import { YhInfiniteScroll } from '../index'
import { vInfiniteScroll } from '../src/directive'

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: any
  elements: Set<Element> = new Set()
  constructor(callback: any) {
    this.callback = callback
  }
  observe(el: Element) {
    this.elements.add(el)
  }
  unobserve(el: Element) {
    this.elements.delete(el)
  }
  disconnect() {
    this.elements.clear()
  }
  trigger(entry = { isIntersecting: true }) {
    this.callback([entry], this)
  }
}

// @ts-ignore
global.IntersectionObserver = MockIntersectionObserver

describe('InfiniteScroll Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: { loading: false, finished: false },
      slots: { default: () => h('div', { class: 'list-item' }, 'Item') }
    })
    expect(wrapper.find('.yh-infinite-scroll').exists()).toBe(true)
    expect(wrapper.find('.list-item').exists()).toBe(true)
  })

  it('should show loading state', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: { loading: true }
    })
    expect(wrapper.find('.yh-infinite-scroll__loading').exists()).toBe(true)
  })

  it('should show finished state', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: { finished: true, loading: false }
    })
    expect(wrapper.find('.yh-infinite-scroll__finished').exists()).toBe(true)
  })

  it('should handle retry click', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: { error: true }
    })
    await wrapper.find('.yh-infinite-scroll__error').trigger('click')
    expect(wrapper.emitted('update:error')![0]).toEqual([false])
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('should support manual check method', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: { useObserver: false, threshold: 50 }
    })
    expect(typeof wrapper.vm.check).toBe('function')
    wrapper.vm.check()
  })

  it('should fallback to scroll listener when useObserver is false', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      attachTo: document.body,
      props: { useObserver: false, target: '.yh-infinite-scroll', threshold: 100 }
    })
    await nextTick()

    const container = wrapper.element as HTMLElement

    // 模拟 vertical scroll
    Object.defineProperty(container, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(container, 'clientHeight', { value: 500, configurable: true })
    Object.defineProperty(container, 'scrollTop', {
      value: 490,
      configurable: true,
      writable: true
    })

    // trigger load directly
    wrapper.vm.check()
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('should handle horizontal scroll correctly', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      attachTo: document.body,
      props: {
        useObserver: false,
        target: '.yh-infinite-scroll',
        direction: 'horizontal',
        threshold: 100
      }
    })
    await nextTick()

    // 模拟 horizontal scroll
    const container = wrapper.element as HTMLElement
    Object.defineProperty(container, 'scrollWidth', { value: 1000, configurable: true })
    Object.defineProperty(container, 'clientWidth', { value: 500, configurable: true })
    Object.defineProperty(container, 'scrollLeft', {
      value: 490,
      configurable: true,
      writable: true
    })

    wrapper.vm.check()
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('should handle dynamic useObserver switching', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      attachTo: document.body,
      props: { useObserver: false, target: '.yh-infinite-scroll', threshold: 100 }
    })
    // 切换到 true
    await wrapper.setProps({ useObserver: true })
    // 这里会调用断开传统事件并重新挂载 IntersectionObserver
    expect(wrapper.vm).toBeDefined()

    // 再切回 false
    await wrapper.setProps({ useObserver: false })
  })

  it('should handle loading change and re-evaluate', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      attachTo: document.body,
      props: {
        loading: true,
        immediateCheck: true,
        useObserver: false,
        target: '.yh-infinite-scroll',
        threshold: 100
      }
    })
    await nextTick()

    const container = wrapper.element as HTMLElement
    Object.defineProperty(container, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(container, 'clientHeight', { value: 500, configurable: true })
    Object.defineProperty(container, 'scrollTop', {
      value: 490,
      configurable: true,
      writable: true
    })

    await wrapper.setProps({ loading: false })
    await nextTick() // evaluate watcher callback
    await nextTick() // evaluating checkLoad from nextTick inside watcher handler

    expect(wrapper.emitted('load')).toBeTruthy()
  })
})

describe('InfiniteScroll Directive', () => {
  it('should trigger callback when intersecting', async () => {
    const onLoad = vi.fn()
    const instances: MockIntersectionObserver[] = []

    const Original = global.IntersectionObserver
    // @ts-ignore
    global.IntersectionObserver = class extends MockIntersectionObserver {
      constructor(cb: any) {
        super(cb)
        instances.push(this)
      }
    }

    const TestComponent = defineComponent({
      directives: { InfiniteScroll: vInfiniteScroll },
      setup() {
        return { onLoad }
      },
      template: '<div v-infinite-scroll="onLoad"></div>'
    })

    const wrapper = mount(TestComponent)
    expect(instances.length).toBeGreaterThan(0)

    instances[0].trigger({ isIntersecting: true })
    expect(onLoad).toHaveBeenCalled()

    global.IntersectionObserver = Original
  })

  it('should handle disabled attribute in directive', async () => {
    const onLoad = vi.fn()
    const disabled = ref(true)
    const instances: MockIntersectionObserver[] = []

    const Original = global.IntersectionObserver
    // @ts-ignore
    global.IntersectionObserver = class extends MockIntersectionObserver {
      constructor(cb: any) {
        super(cb)
        instances.push(this)
      }
    }

    const TestComponent = defineComponent({
      directives: { InfiniteScroll: vInfiniteScroll },
      setup() {
        return { onLoad, disabled }
      },
      template: '<div v-infinite-scroll="onLoad" :infinite-scroll-disabled="disabled"></div>'
    })

    const wrapper = mount(TestComponent)
    instances[0].trigger({ isIntersecting: true })
    expect(onLoad).not.toHaveBeenCalled()

    disabled.value = false
    await nextTick()

    instances[0].trigger({ isIntersecting: true })
    expect(onLoad).toHaveBeenCalled()

    global.IntersectionObserver = Original
  })
})
