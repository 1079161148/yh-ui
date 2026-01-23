/**
 * Badge Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Badge from '../src/badge.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhBadge SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Badge, {
      value: 12,
      type: 'primary'
    })

    expectSSRHasClass(html, 'yh-badge')
    expect(html).toContain('12')
  })

  it('should render dot mode in SSR', async () => {
    const html = await renderSSR(Badge, {
      isDot: true
    })
    expectSSRHasClass(html, 'is-dot')
  })

  it('should render max value in SSR', async () => {
    const html = await renderSSR(Badge, {
      value: 100,
      max: 99
    })
    expect(html).toContain('99+')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Badge, {
      value: 'new',
      type: 'danger'
    })
    expect(result.isMatch).toBe(true)
  })
})
