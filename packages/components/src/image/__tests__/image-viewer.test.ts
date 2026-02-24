import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YhImageViewer from '../src/image-viewer.vue'
import { nextTick } from 'vue'

const urlList = ['https://picsum.photos/400/300', 'https://picsum.photos/400/301']

describe('YhImageViewer', () => {
  it('render basic', () => {
    const wrapper = mount(YhImageViewer, {
      props: {
        urlList,
        teleported: false
      }
    })
    expect(wrapper.find('.yh-viewer').exists()).toBe(true)
    expect(wrapper.find('.yh-viewer__mask').exists()).toBe(true)
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[0])
  })

  it('close event', async () => {
    const wrapper = mount(YhImageViewer, {
      props: {
        urlList,
        teleported: false
      }
    })

    // Close button
    await wrapper.find('.yh-viewer__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()

    // Mask close
    await wrapper.find('.yh-viewer__mask').trigger('click')
    // Default hideOnClickModal is false
    expect(wrapper.emitted('close')).toHaveLength(1)

    // Enable hideOnClickModal
    await wrapper.setProps({ hideOnClickModal: true })
    await wrapper.find('.yh-viewer__mask').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(2)
  })

  it('switch image', async () => {
    const wrapper = mount(YhImageViewer, {
      props: {
        urlList,
        teleported: false
      }
    })

    const prevBtn = wrapper.find('.yh-viewer__prev')
    const nextBtn = wrapper.find('.yh-viewer__next')

    // Initial state
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[0])

    // Previous (should go to last if infinite)
    await prevBtn.trigger('click')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[1])
    expect(wrapper.emitted('switch')).toBeTruthy()
    expect(wrapper.emitted('switch')![0]).toEqual([1])

    // Next (should go to first)
    await nextBtn.trigger('click')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[0])
    expect(wrapper.emitted('switch')![1]).toEqual([0])
  })

  it('actions', async () => {
    const wrapper = mount(YhImageViewer, {
      props: {
        urlList,
        teleported: false
      }
    })

    const img = wrapper.find('.yh-viewer__canvas img')

    // Zoom In
    await wrapper.find('.yh-viewer__zoom-in').trigger('click')
    expect(img.attributes('style')).toContain('scale(1.2)')

    // Zoom Out
    await wrapper.find('.yh-viewer__zoom-out').trigger('click')
    // 1.2 / 1.2 = 1
    expect(img.attributes('style')).toContain('scale(1)')

    // Rotate Right
    await wrapper.find('.yh-viewer__rotate-right').trigger('click')
    expect(img.attributes('style')).toContain('rotate(90deg)')

    // Rotate Left
    await wrapper.find('.yh-viewer__rotate-left').trigger('click')
    expect(img.attributes('style')).toContain('rotate(0deg)')

    // Reset
    await wrapper.find('.yh-viewer__reset').trigger('click')
    expect(img.attributes('style')).toContain('scale(1)')
    expect(img.attributes('style')).toContain('rotate(0deg)')
  })

  it('keyboard support', async () => {
    const wrapper = mount(YhImageViewer, {
      props: {
        urlList,
        teleported: false
      }
    })

    // Create a keyboard event
    const triggerKey = async (key: string) => {
      const event = new KeyboardEvent('keydown', { key })
      window.dispatchEvent(event)
      await nextTick()
    }

    // Escape
    await triggerKey('Escape')
    expect(wrapper.emitted('close')).toBeTruthy()

    // ArrowLeft (Previous)
    await triggerKey('ArrowLeft')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[1])

    // ArrowRight (Next)
    await triggerKey('ArrowRight')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('src')).toBe(urlList[0])

    // ArrowUp (Zoom In)
    await triggerKey('ArrowUp')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('style')).toContain('scale(1.2)')

    // ArrowDown (Zoom Out)
    await triggerKey('ArrowDown')
    expect(wrapper.find('.yh-viewer__canvas img').attributes('style')).toContain('scale(1)')
  })
})
