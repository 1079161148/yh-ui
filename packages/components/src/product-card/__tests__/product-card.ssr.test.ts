/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import ProductCard from '../src/product-card.vue'

describe('ProductCard SSR', () => {
  const props = {
    title: 'Test Product',
    image: 'https://test.com/img.jpg',
    price: 99.9
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(ProductCard, props))
    expect(html).toContain('yh-product-card')
    expect(html).toContain('Test Product')
    expect(html).toContain('99')
    expect(html).toContain('.90')
  })
})
