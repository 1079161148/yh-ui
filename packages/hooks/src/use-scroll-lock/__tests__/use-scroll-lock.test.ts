import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useScrollLock } from '../index'

describe('useScrollLock', () => {
  let html: HTMLElement
  let body: HTMLElement

  beforeEach(() => {
    html = document.documentElement
    body = document.body

    // Mock scrollbar width calculation
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
    Object.defineProperty(html, 'clientWidth', { writable: true, configurable: true, value: 1000 })

    // Reset styles
    html.style.overflow = ''
    html.style.paddingRight = ''
    body.style.overflow = ''
    body.style.paddingRight = ''
    html.classList.remove('yh-popup-parent--hidden')

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should lock scroll when trigger is true', async () => {
    const trigger = ref(false)
    useScrollLock(trigger)

    trigger.value = true
    await nextTick()

    expect(html.style.overflow).toBe('hidden')
    expect(body.style.overflow).toBe('hidden')
    expect(html.classList.contains('yh-popup-parent--hidden')).toBe(true)
    // 1024 - 1000 = 24px
    expect(html.style.getPropertyValue('--yh-scrollbar-width')).toBe('24px')
  })

  it('should unlock scroll when trigger is false', async () => {
    const trigger = ref(true)
    const { isLocked } = useScrollLock(trigger)

    // Already locked because ref(true) triggers watch immediately (if implemented so) or on mount
    // Wait, watch is default lazy unless immediate is true.
    // Let's re-trigger it.
    trigger.value = false
    await nextTick()
    trigger.value = true
    await nextTick()

    expect(html.style.overflow).toBe('hidden')

    trigger.value = false
    await nextTick()

    expect(html.style.overflow).toBe('')
    expect(body.style.overflow).toBe('')
    expect(html.classList.contains('yh-popup-parent--hidden')).toBe(false)

    // Check deferred cleanup
    expect(html.style.getPropertyValue('--yh-scrollbar-width')).toBe('24px')
    vi.advanceTimersByTime(400)
    expect(html.style.getPropertyValue('--yh-scrollbar-width')).toBe('')
  })

  it('should cleanup on unmount', async () => {
    const trigger = ref(false)
    const TestComp = {
      setup() {
        useScrollLock(trigger)
        return () => null
      }
    }

    const { mount } = await import('@vue/test-utils')
    const wrapper = mount(TestComp)

    trigger.value = true
    await nextTick()
    expect(html.style.overflow).toBe('hidden')

    wrapper.unmount()
    expect(html.style.overflow).toBe('')
  })
})
