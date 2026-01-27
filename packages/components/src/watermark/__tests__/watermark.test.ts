import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { YhWatermark } from '../index'

describe('Watermark', () => {
  it('render test', () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'Test Watermark'
      },
      slots: {
        default: '<div class="content">Content</div>'
      }
    })

    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.yh-watermark').exists()).toBe(true)
  })

  it('fullscreen test', () => {
    const wrapper = mount(YhWatermark, {
      props: {
        fullScreen: true
      }
    })
    expect(wrapper.classes()).toContain('yh-watermark--fullscreen')
  })
})
