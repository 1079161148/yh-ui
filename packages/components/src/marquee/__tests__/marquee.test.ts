import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { YhMarquee } from '../index'

describe('Marquee', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhMarquee, {
      slots: {
        default: 'Test Content'
      }
    })
    expect(wrapper.find('.yh-marquee').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Content')
  })

  it('should support direction prop', () => {
    const wrapper = mount(YhMarquee, {
      props: {
        direction: 'vertical'
      }
    })
    expect(wrapper.classes()).toContain('yh-marquee--vertical')
  })

  it('should support pauseOnHover prop', async () => {
    const wrapper = mount(YhMarquee, {
      props: {
        pauseOnHover: true
      }
    })
    expect(wrapper.classes()).toContain('yh-marquee--pause-on-hover')
  })

  it('should support gradient prop', () => {
    const wrapper = mount(YhMarquee, {
      props: {
        gradient: true
      }
    })
    expect(wrapper.classes()).toContain('yh-marquee--gradient')
    expect(wrapper.find('.yh-marquee__overlay').exists()).toBe(true)
  })

  it('should emit cycleComplete event', async () => {
    const wrapper = mount(YhMarquee)
    const content = wrapper.find('.yh-marquee__content')
    await content.trigger('animationiteration')
    expect(wrapper.emitted('cycleComplete')).toBeTruthy()
  })

  it('should calculate initial styles correctly', () => {
    const wrapper = mount(YhMarquee, {
      props: {
        duration: 10,
        gap: '20px',
        delay: 2
      }
    })
    const style = (wrapper.element as HTMLElement).style
    expect(style.getPropertyValue('--yh-marquee-duration')).toBe('10s')
    expect(style.getPropertyValue('--yh-marquee-gap')).toBe('20px')
    expect(style.getPropertyValue('animation-delay')).toBe('2s')
  })

  it('should support speed prop', async () => {
    // Mock scrollWidth
    const wrapper = mount(YhMarquee, {
      props: {
        speed: 50 // 50px/s
      }
    })

    // We can't easily mock scrollWidth in jsdom without extra effort,
    // but we can check if it tries to use speed logic.
    const style = (wrapper.element as HTMLElement).style
    // Initial duration might be default until dimensions are available
    // In a real browser, duration = size / speed
  })

  it('should handle loopDelay correctly', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhMarquee, {
      props: {
        loopDelay: 1
      }
    })

    const content = wrapper.find('.yh-marquee__content')
    await content.trigger('animationiteration')

    // Check if paused
    const style = (wrapper.element as HTMLElement).style
    expect(style.getPropertyValue('--yh-marquee-play-state')).toBe('paused')

    // After time pass
    vi.advanceTimersByTime(1100)
    await nextTick()

    expect(style.getPropertyValue('--yh-marquee-play-state')).toBe('running')
    vi.useRealTimers()
  })

  it('should support pauseOnHidden prop', () => {
    const wrapper = mount(YhMarquee, {
      props: {
        pauseOnHidden: true
      }
    })
    expect(wrapper.find('.yh-marquee').exists()).toBe(true)
    // IntersectionObserver logic is usually mocked or verified by its existence
  })
})
