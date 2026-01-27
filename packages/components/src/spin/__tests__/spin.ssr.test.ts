/**
 * Spin Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Spin from '../src/spin.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhSpin SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Spin, {
      tip: '正在加载...',
      size: 'large'
    })

    expectSSRHasClass(html, 'yh-spin')
    expectSSRHasClass(html, 'yh-spin--large')
    expect(html).toContain('正在加载...')
  })

  it('should render dot mode in SSR', async () => {
    const html = await renderSSR(Spin, {
      dot: true
    })
    expectSSRHasClass(html, 'is-dot')
    expect(html).toContain('yh-spin__dots')
  })

  it('should render vertical mode in SSR', async () => {
    const html = await renderSSR(Spin, {
      vertical: true,
      tip: 'Vertical'
    })
    expectSSRHasClass(html, 'is-vertical')
    expect(html).toContain('Vertical')
  })

  it('should not render hidden content in SSR when show is false', async () => {
    const html = await renderSSR(Spin, {
      show: false
    })
    expect(html).not.toContain('yh-spin')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Spin, {
      size: 'small',
      dot: true,
      tip: 'Hydration'
    })
    expect(result.isMatch).toBe(true)
  })
})
