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
})
