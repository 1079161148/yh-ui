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
