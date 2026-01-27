import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { YhUpload } from '../index'

describe('Upload SSR', () => {
  it('should render correctly on server', async () => {
    const wrapper = mount(YhUpload, {
      props: {
        action: 'http://localhost/upload'
      }
    })

    const html = await renderToString(wrapper.vm.$.vnode)
    expect(html).toContain('yh-upload')
    expect(html).toContain('type="file"')
  })

  it('should render picture-card mode correctly on server', async () => {
    const wrapper = mount(YhUpload, {
      props: {
        action: '#',
        listType: 'picture-card'
      }
    })

    const html = await renderToString(wrapper.vm.$.vnode)
    expect(html).toContain('yh-upload--picture-card')
  })
})
