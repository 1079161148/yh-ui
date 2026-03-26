/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import SkuSelector from '../src/sku-selector.vue'

describe('SkuSelector SSR', () => {
  const specs = [{ id: '1', name: 'Color', values: [{ id: '11', name: 'Red' }] }]
  const skus = [{ id: '1', specValueIds: ['11'], price: 100, stock: 10 }]

  it('renders correctly on server', async () => {
    const html = await renderToString(
      h(SkuSelector, {
        specs,
        skus
      })
    )
    expect(html).toContain('yh-sku-selector')
    expect(html).toContain('Color')
    expect(html).toContain('Red')
  })
})
