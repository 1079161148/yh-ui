/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { YhWatermark } from '../index'

describe('Watermark', () => {
  let createElementSpy: any
  const originalCreateElement = document.createElement

  beforeEach(() => {
    vi.useFakeTimers()

    // Mock document.createElement for canvas
    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'canvas') {
        const ctx = {
          scale: vi.fn(),
          translate: vi.fn(),
          rotate: vi.fn(),
          fillText: vi.fn(),
          drawImage: vi.fn(),
          measureText: vi.fn(() => ({ width: 10 }))
        }
        return {
          getContext: vi.fn(() => ctx),
          toDataURL: vi.fn(() => 'data:image/png;base64,mock'),
          width: 0,
          height: 0,
          style: {},
          className: '',
          parentNode: null,
          remove: vi.fn()
        } as any
      }
      return originalCreateElement.call(document, tagName)
    })

    // Mock Image
    vi.stubGlobal(
      'Image',
      class {
        onload: any = null
        set src(val: string) {
          setTimeout(() => {
            if (this.onload) this.onload()
          }, 10)
        }
      }
    )
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('basic render test', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'Test Watermark'
      }
    })

    await nextTick()
    expect(wrapper.find('.yh-watermark').exists()).toBe(true)
    const watermarkDiv = wrapper.element.querySelector('div[class^="yh-wm-"]')
    expect(watermarkDiv).toBeTruthy()
  })

  it('multiline content test', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: ['Line 1', 'Line 2']
      }
    })
    await nextTick()
    expect(wrapper.find('.yh-watermark').exists()).toBe(true)
  })

  it('fullscreen test', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        fullScreen: true
      }
    })
    await nextTick()
    expect(wrapper.classes()).toContain('yh-watermark--fullscreen')
  })

  it('image watermark test', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        image: 'test.png'
      }
    })

    vi.advanceTimersByTime(20)
    await nextTick()

    expect(wrapper.find('.yh-watermark').exists()).toBe(true)
    const watermarkDiv = wrapper.element.querySelector('div[class^="yh-wm-"]')
    expect(watermarkDiv).toBeTruthy()
  })

  it('anti-tamper: should recreate when removed', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'Protected',
        antiTamper: true
      },
      attachTo: document.body
    })

    await nextTick()
    const container = wrapper.element
    let watermarkNode = container.querySelector('div[class^="yh-wm-"]')
    expect(watermarkNode).toBeTruthy()

    // Manually remove
    watermarkNode?.remove()

    // Advance timer for setInterval check
    vi.advanceTimersByTime(4000)
    await nextTick()

    const newNode = container.querySelector('div[class^="yh-wm-"]')
    expect(newNode).toBeTruthy()
    expect(newNode).not.toBe(watermarkNode)

    wrapper.unmount()
  })

  it('should update when props change', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'Initial'
      }
    })

    await nextTick()
    const firstNode = wrapper.element.querySelector('div[class^="yh-wm-"]')

    await wrapper.setProps({ content: 'Updated' })
    await nextTick()

    const secondNode = wrapper.element.querySelector('div[class^="yh-wm-"]')
    expect(secondNode).not.toBe(firstNode)
  })
})
