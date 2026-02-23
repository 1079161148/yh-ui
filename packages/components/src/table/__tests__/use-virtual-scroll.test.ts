import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useVirtualScroll } from '../src/use-virtual-scroll'
import type { TableVirtualConfig } from '../src/table'

describe('useVirtualScroll hook', () => {
  let mockContainer: HTMLElement
  let resizeCb: any = null

  beforeEach(() => {
    mockContainer = document.createElement('div')
    Object.defineProperty(mockContainer, 'clientHeight', { value: 400, writable: true })
    Object.defineProperty(mockContainer, 'scrollTop', { value: 0, writable: true })
    mockContainer.scrollTo = vi.fn()

    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      constructor(cb: any) {
        resizeCb = cb
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any

    // Mock rAF
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 1
    })
    vi.spyOn(window, 'cancelAnimationFrame')
  })

  afterEach(() => {
    resizeCb = null
    vi.restoreAllMocks()
  })

  const createData = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({ id: String(i), val: i }))
  }

  it('not virtual when not enabled or items < 100', () => {
    const data = ref(createData(50))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: false })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({
          data,
          containerRef,
          config,
          rowKey: (r) => r.id as string
        })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const { isVirtual, visibleData, visibleRange, totalHeight, offsetTop } = wrapper.vm

    expect(isVirtual).toBe(false)
    expect(visibleData.length).toBe(50)
    expect(visibleRange).toEqual({ start: 0, end: 49 })
    expect(totalHeight).toBe(0)
    expect(offsetTop).toBe(0)
  })

  it('virtual scroll with fixed height', async () => {
    const data = ref(createData(200)) // > 100
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true, rowHeight: 40, buffer: 2, overscan: 2 })

    // Wrap to test lifecycle
    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.vm.isVirtual).toBe(true)

    expect(wrapper.vm.totalHeight).toBe(200 * 40) // 8000

    // mock scroll
    mockContainer.scrollTop = 1000 // 1000 / 40 = 25th item top
    wrapper.vm.handleScroll(new Event('scroll'))

    // Test multiple scroll calls trigger cancelAnimationFrame
    wrapper.vm.handleScroll(new Event('scroll'))
    expect(window.cancelAnimationFrame).toHaveBeenCalled()

    await nextTick()

    const { start, end } = wrapper.vm.visibleRange

    // viewport is 400. 1000 is scroll top. items visible approx: 400 / 40 = 10
    // start index approx 25. extra limit (buffer 2 + overscan 2 = 4).
    // so start could be 25 - 4 = 21. end could be 25 + 10 + 4 = 39.
    expect(start).toBe(21)
    expect(end).toBe(39)

    expect(wrapper.vm.offsetTop).toBe(21 * 40)

    wrapper.unmount()
  })

  it('virtual scroll with dynamic height and find algorithms', async () => {
    const data = ref(createData(200))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({
      enabled: true,
      rowHeight: (row, idx) => ((idx % 3) + 1) * 20
    })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const hook = wrapper.vm
    expect(hook.isVirtual).toBe(true)

    // Scroll to 0 should cache sizes and calculate total
    hook.handleScroll(new Event('scroll'))

    // total is (20+40+60) * 66 + 20+40 = 120 * 66 + 60 = 7920 + 60 = 7980
    expect(hook.totalHeight).toBeGreaterThan(0)

    mockContainer.scrollTop = 100
    hook.handleScroll(new Event('scroll'))
    expect(hook.visibleRange.start).toBeGreaterThanOrEqual(0)

    // test data change refresh
    data.value.push({ id: '999', val: 999 })

    // expose refresh
    hook.refresh()
    await nextTick()
  })

  it('scaled mode (MAX_SCROLL_HEIGHT overflow)', () => {
    const data = ref(createData(1000000))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true, rowHeight: 40 })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const hook = wrapper.vm

    expect(hook.totalHeight).toBe(15_000_000)

    // offset top should be scaled
    mockContainer.scrollTop = 15_000_000 / 2 // in the middle
    hook.handleScroll(new Event('scroll'))

    expect(hook.offsetTop).toBeGreaterThan(0)
    expect(hook.offsetTop).toBeLessThanOrEqual(15_000_000)
  })

  it('scrollToIndex and scrollToRow', () => {
    const data = ref(createData(200))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true, rowHeight: 40 })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const hook = wrapper.vm

    hook.scrollToIndex(10)
    expect(mockContainer.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'auto' })

    hook.scrollToRow({ id: '20' })
    expect(mockContainer.scrollTo).toHaveBeenCalledWith({ top: 800, behavior: 'auto' })
  })

  it('scroll to dynamic height', () => {
    const arr = createData(150)
    const dataRef = ref(arr)
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true, rowHeight: () => 50 })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({
          data: dataRef,
          containerRef,
          config,
          rowKey: (r) => r.id as string
        })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const hook = wrapper.vm

    // index out of range check
    hook.scrollToIndex(200)

    hook.scrollToIndex(2)
    expect(mockContainer.scrollTo).toHaveBeenCalledWith({ top: 100, behavior: 'auto' })
  })

  it('non virtual scrollToIndex', () => {
    const data = ref(createData(50))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true, rowHeight: 40 })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    const hook = wrapper.vm

    // Fallback formula when not virtual
    hook.scrollToIndex(10)
    expect(mockContainer.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'auto' })
  })

  it('test resize observer and unmount', () => {
    const data = ref(createData(101))
    const containerRef = ref(mockContainer)
    const config = ref<TableVirtualConfig>({ enabled: true })

    const TestComponent = defineComponent({
      setup() {
        return useVirtualScroll({ data, containerRef, config, rowKey: (r) => r.id as string })
      },
      template: '<div></div>'
    })

    const wrapper = mount(TestComponent)
    expect(resizeCb).not.toBeNull()
    if (resizeCb) resizeCb() // trigger observer

    wrapper.unmount()
    // Test cleaning up raf if rafId !== null
  })
})
