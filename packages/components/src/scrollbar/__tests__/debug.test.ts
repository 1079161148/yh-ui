import { describe, it } from 'vitest'
import * as fs from 'fs'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mount } from '@vue/test-utils'
import Scrollbar from '../src/scrollbar.vue'
import { normalizeHtml } from '../../__tests__/utils/ssr'

describe('DEBUG SSR', () => {
  it('debug', async () => {
    const props = { height: '200px' }
    const slots = { default: () => 'Content' }

    // SSR
    const app = createSSRApp({
      render() {
        return h(Scrollbar, props, slots)
      }
    })
    const ssrHtml = await renderToString(app)

    // CSR
    const wrapper = mount(Scrollbar, {
      props,
      slots,
      global: {
        stubs: {
          transition: false,
          'transition-group': false
        }
      }
    })
    const csrHtml = wrapper.html()

    const ssrNorm = normalizeHtml(ssrHtml)
    const csrNorm = normalizeHtml(csrHtml)

    fs.writeFileSync('ssr_debug.txt', `SSR:\n${ssrNorm}\n\nCSR:\n${csrNorm}`)

    console.log('--- SSR ---')
    ssrNorm.match(/.{1,80}/g)?.forEach((line) => console.log(line))
    console.log('--- CSR ---')
    csrNorm.match(/.{1,80}/g)?.forEach((line) => console.log(line))
    console.log('--- END ---')
  })
})
