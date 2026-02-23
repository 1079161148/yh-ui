/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import YhAlert from '../src/alert.vue'

describe('YhAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Mock requestAnimationFrame to advance with setTimeout for testing
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 16))
    vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should render correctly with title and description', async () => {
    const wrapper = mount(YhAlert, {
      props: {
        title: 'Test Title',
        description: 'Test Description'
      }
    })
    const alert = wrapper.find('.yh-alert')
    expect(alert.exists()).toBe(true)
    expect(alert.find('.yh-alert__title').text()).toBe('Test Title')
    expect(alert.find('.yh-alert__description').text()).toBe('Test Description')
  })

  it('should show correct type and effect class', () => {
    const types = ['success', 'info', 'warning', 'error'] as const
    types.forEach((type) => {
      const wrapper = mount(YhAlert, { props: { type } })
      expect(wrapper.find('.yh-alert').classes()).toContain(`yh-alert--${type}`)
    })

    const effects = ['light', 'dark', 'outline', 'glass'] as const
    effects.forEach((effect) => {
      const wrapper = mount(YhAlert, { props: { effect } })
      expect(wrapper.find('.yh-alert').classes()).toContain(`yh-alert--${effect}`)
    })
  })

  it('should emit close event when clicked', async () => {
    const wrapper = mount(YhAlert, {
      props: { closable: true }
    })
    const closeBtn = wrapper.find('.yh-alert__close')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    // In Vitest, Transition might not remove the element immediately or at all in stub mode
    // We check the internal 'visible' state or if the class is gone?
    // Actually v-if="visible" should remove it from DOM.
    await nextTick()
    expect(wrapper.find('.yh-alert').exists()).toBe(false)
  })

  it('should handle auto-close and progress bar', async () => {
    const wrapper = mount(YhAlert, {
      props: {
        duration: 1000,
        showProgress: true
      }
    })

    expect(wrapper.find('.yh-alert__progress-track').exists()).toBe(true)

    // Advance half way
    vi.advanceTimersByTime(500)
    await nextTick()

    const vm = wrapper.vm as any
    expect(vm.progress).toBeLessThan(100)
    expect(vm.progress).toBeGreaterThan(0)

    // Finish
    vi.advanceTimersByTime(600)
    await nextTick()
    await nextTick() // Two ticks to ensure visibility update propagates
    expect(wrapper.find('.yh-alert').exists()).toBe(false)
  })

  it('should pause on hover', async () => {
    const wrapper = mount(YhAlert, {
      props: {
        duration: 2000,
        showProgress: true,
        pauseOnHover: true
      }
    })

    await nextTick()
    vi.advanceTimersByTime(100)
    await nextTick()
    const progressStart = (wrapper.vm as any).progress

    // Mouse enter
    await wrapper.find('.yh-alert').trigger('mouseenter')

    // Advance another 500ms
    vi.advanceTimersByTime(500)
    await nextTick()

    // Progress should be same (paused)
    expect((wrapper.vm as any).progress).toBe(progressStart)

    // Mouse leave
    await wrapper.find('.yh-alert').trigger('mouseleave')

    // Advance 100ms
    vi.advanceTimersByTime(100)
    await nextTick()

    // Progress should decrease again
    expect((wrapper.vm as any).progress).toBeLessThan(progressStart)
  })

  it('should support scrollable (marquee)', () => {
    const wrapper = mount(YhAlert, {
      props: {
        description: 'Long text...',
        scrollable: true
      }
    })
    expect(wrapper.find('.yh-alert').classes()).toContain('is-scrollable')
    // Should have 2 description copies for endless loop
    expect(wrapper.findAll('.yh-alert__description').length).toBe(2)
  })

  it('should render custom slots', () => {
    const wrapper = mount(YhAlert, {
      slots: {
        title: '<span class="custom-title">Custom</span>',
        default: '<span class="custom-desc">Desc</span>',
        action: '<button class="custom-action">OK</button>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })
})
