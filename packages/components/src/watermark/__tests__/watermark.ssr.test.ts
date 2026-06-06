import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { YhWatermark } from '../index'

describe('Watermark SSR', () => {
  it('should render correctly on server', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'SSR Watermark'
      },
      slots: {
        default: '<div class="content">Content</div>'
      }
    })

    const html = await renderToString(wrapper.vm.$.vnode)

    // Check container class
    expect(html).toContain('yh-watermark')
    // Check slot content
    expect(html).toContain('Content')
    expect(html).toContain('class="content"')
  })

  it('should render fullscreen mode correctly on server', async () => {
    const wrapper = mount(YhWatermark, {
      props: {
        content: 'Global WM',
        fullScreen: true
      }
    })

    const html = await renderToString(wrapper.vm.$.vnode)
    expect(html).toContain('yh-watermark--fullscreen')
  })
})
