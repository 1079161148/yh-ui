/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import YhBackTop from '../src/back-top.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhBackTop', () => {
  let container: HTMLElement

  beforeEach(() => {
    vi.useFakeTimers()

    container = document.createElement('div')
    container.id = 'scroll-container'
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true })
    Object.defineProperty(container, 'scrollHeight', { value: 2000, writable: true })
    Object.defineProperty(container, 'clientHeight', { value: 500, writable: true })
    document.body.appendChild(container)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.removeChild(container)
  })

  it('should be invisible initially', () => {
    const wrapper = mount(YhBackTop, {
      props: {
        target: '#scroll-container',
        visibilityHeight: 200
      }
    })
    expect(wrapper.find('.yh-back-top').exists()).toBe(false)
  })

  it('should be visible after scrolling down', async () => {
    const wrapper = mount(YhBackTop, {
      props: {
        target: '#scroll-container',
        visibilityHeight: 100
      }
    })

    container.scrollTop = 150
    // @ts-ignore
    wrapper.vm.handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()
    expect(wrapper.find('.yh-back-top').exists()).toBe(true)
  })

  it('should show progress circle when showProgress is true', async () => {
    const wrapper = mount(YhBackTop, {
      props: {
        target: '#scroll-container',
        visibilityHeight: 0,
        showProgress: true
      }
    })

    container.scrollTop = 500 // 50% progress
    // @ts-ignore
    wrapper.vm.handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()

    expect(wrapper.find('.yh-back-top__progress').exists()).toBe(true)
  })

  it('should scroll to top on click', async () => {
    const wrapper = mount(YhBackTop, {
      props: {
        target: '#scroll-container',
        visibilityHeight: 0,
        duration: 100
      }
    })

    container.scrollTop = 500
    // @ts-ignore
    wrapper.vm.handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()

    const scrollToSpy = vi.fn()
    container.scrollTo = scrollToSpy

    await wrapper.find('.yh-back-top').trigger('click')

    // Fast-forward animation
    vi.advanceTimersByTime(200)

    expect(scrollToSpy).toHaveBeenCalled()
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should use locale aria-label and keep themeOverrides prop', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(YhBackTop, {
            target: '#scroll-container',
            visibilityHeight: 0,
            themeOverrides: { bgColor: '#101010' }
          })
      }
    })

    container.scrollTop = 150
    const backTop = wrapper.findComponent(YhBackTop)
    ;(backTop.vm as any).handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()

    expect(wrapper.get('.yh-back-top').attributes('aria-label')).toBe('Back to Top')
    expect(backTop.props('themeOverrides')).toEqual({ bgColor: '#101010' })
  })

  it('renders custom slot and zero-height progress fallback', async () => {
    Object.defineProperty(container, 'scrollTop', { value: 250, writable: true })
    Object.defineProperty(container, 'scrollHeight', { value: 500, writable: true })
    Object.defineProperty(container, 'clientHeight', { value: 500, writable: true })
    const scrollTo = vi.fn()
    container.scrollTo = scrollTo

    const wrapper = mount(YhBackTop, {
      props: {
        target: '#scroll-container',
        visibilityHeight: 100,
        showProgress: true,
        progressColor: '#123456',
        right: 24,
        bottom: 32,
        duration: 1
      },
      slots: {
        default: '<button class="custom-back">Top</button>'
      }
    })

    ;(wrapper.vm as any).handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()

    expect(wrapper.find('.custom-back').exists()).toBe(true)
    expect(wrapper.find('.yh-back-top').attributes('style')).toContain('right: 24px')
    expect(wrapper.find('.yh-back-top__progress-bar').attributes('style')).toContain('#123456')

    await wrapper.find('.yh-back-top').trigger('click')
    vi.advanceTimersByTime(20)
    expect(scrollTo).toHaveBeenCalled()
  })

  it('covers window target branch and capped progress', async () => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 16))
    Object.defineProperty(window, 'scrollY', { value: 1200, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 500, writable: true, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      writable: true,
      configurable: true
    })
    const scrollTo = vi.fn()
    document.documentElement.scrollTo = scrollTo

    const wrapper = mount(YhBackTop, {
      props: {
        visibilityHeight: 100,
        showProgress: true,
        duration: 1
      }
    })

    ;(wrapper.vm as any).handleScroll()
    vi.advanceTimersByTime(16)
    await nextTick()

    expect(wrapper.findComponent(YhBackTop).exists()).toBe(true)
    expect(typeof scrollTo).toBe('function')
  })
})
