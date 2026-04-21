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

  it('renders advanced server branches without client-only state', async () => {
    const html = await renderToString(
      h(ProductCard, {
        title: 'SSR Product',
        image: 'https://test.com/ssr.jpg',
        price: 88,
        vipPrice: 66,
        marketPrice: 128,
        stockProgress: 120,
        stockText: 'Only 3 left',
        soldOut: true,
        tag: 'NEW',
        badgePosition: 'inline',
        badges: [
          { text: 'VIP', color: '#fa8c16' },
          { text: 'FAST', type: 'success' }
        ],
        ribbon: 'Limited',
        ribbonColor: '#722ed1',
        themeOverrides: {
          'price-color': '#ff4d4f'
        }
      })
    )

    expect(html).toContain('yh-product-card')
    expect(html).toContain('is-sold-out')
    expect(html).toContain('SSR Product')
    expect(html).toContain('Only 3 left')
    expect(html).toContain('Limited')
    expect(html).toContain('NEW')
    expect(html).toContain('VIP')
    expect(html).toContain('FAST')
    expect(html).toContain('--yh-product-card-price-color:#ff4d4f')
  })
})
