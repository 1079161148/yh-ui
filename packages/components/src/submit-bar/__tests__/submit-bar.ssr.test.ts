/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import SubmitBar from '../src/submit-bar.vue'

describe('SubmitBar SSR', () => {
  const props = {
    price: 3050,
    centUnit: true,
    buttonText: 'Submit Now'
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(SubmitBar, props))
    expect(html).toContain('yh-submit-bar')
    // 3050 => 30.50
    expect(html).toContain('30')
    expect(html).toContain('50')
    expect(html).toContain('Submit Now')
  })
})
