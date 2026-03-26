/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import CouponCard from '../src/coupon-card.vue'

describe('CouponCard SSR', () => {
  const props = {
    amount: '100',
    threshold: '500',
    title: 'Coupon Title'
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(CouponCard, props))
    expect(html).toContain('yh-coupon-card')
    expect(html).toContain('100')
    expect(html).toContain('满 500 元可用')
    expect(html).toContain('Coupon Title')
  })
})
