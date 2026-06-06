/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Price from '../src/price.vue'

describe('Price SSR', () => {
  it('renders correctly on server', async () => {
    const html = await renderToString(
      h(Price, {
        value: 123.45,
        symbol: '$',
        precision: 2
      })
    )
    expect(html).toContain('yh-price')
    expect(html).toContain('123')
    expect(html).toContain('.45')
    expect(html).toContain('$')
  })
})
