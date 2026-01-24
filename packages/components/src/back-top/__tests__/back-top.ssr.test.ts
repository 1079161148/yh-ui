/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import BackTop from '../src/back-top.vue'

describe('YhBackTop SSR', () => {
  it('should render on server without error', async () => {
    const html = await renderToString(h(BackTop))
    expect(html).toBeDefined()
  })
})
