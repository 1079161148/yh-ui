import { describe, it, expect } from 'vitest'
import ProductCard from '../src/product-card.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const trimTextBoundaryWhitespace = (html: string) =>
  html.replace(/>\s*([^<]*?)\s*</g, (_, text: string) => `>${text.trim()}<`)

describe('ProductCard Hydration', () => {
  it('hydrates sold-out inline badge markup without mismatch', async () => {
    const result = await testHydration(ProductCard, {
      title: 'Hydration Product',
      image: 'https://test.com/hydration.jpg',
      price: 128,
      soldOut: true,
      tag: 'HOT',
      badgePosition: 'inline',
      badges: [
        { text: 'VIP', color: '#fa8c16' },
        { text: 'FAST', type: 'success' }
      ],
      marketPrice: 168,
      stockProgress: 75,
      stockText: 'Stock running low'
    })

    expect(trimTextBoundaryWhitespace(result.ssrHtml)).toBe(
      trimTextBoundaryWhitespace(result.csrHtml)
    )
  })

  it('hydrates readonly layout with vip pricing and theme overrides', async () => {
    const result = await testHydration(ProductCard, {
      title: 'Readonly Product',
      image: 'https://test.com/readonly.jpg',
      price: 88,
      vipPrice: 66,
      vipLabel: 'Member',
      readonly: true,
      border: false,
      shadow: false,
      themeOverrides: {
        'price-color': '#13c2c2'
      }
    })

    expect(trimTextBoundaryWhitespace(result.ssrHtml)).toBe(
      trimTextBoundaryWhitespace(result.csrHtml)
    )
  })
})
