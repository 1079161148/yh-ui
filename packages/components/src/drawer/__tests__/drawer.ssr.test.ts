import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { YhDrawer } from '../index'

describe('Drawer SSR', () => {
  it('should render correctly on server', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        title: 'SSR Title',
        inner: true // Disable teleport via inner mode for SSR test
      },
      slots: {
        default: 'SSR Content'
      }
    })

    const html = await renderToString(wrapper.vm.$.vnode)
    expect(html).toContain('SSR Title')
    expect(html).toContain('SSR Content')
    expect(html).toContain('yh-drawer')
  })
})
