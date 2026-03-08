/**
 * Carousel Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Carousel from '../src/carousel.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhCarousel SSR', () => {
  it('应该在 SSR 环境下正确渲染', async () => {
    const html = await renderSSR(
      Carousel,
      { currentIndex: 0, effect: 'fade' },
      {
        default: () => '<div>SSR Content</div>'
      }
    )

    expectSSRHasClass(html, 'yh-carousel')
    expectSSRHasClass(html, 'yh-carousel--fade')
    expect(html).toContain('SSR Content')
  })

  it('应该能够无缝进行水合 (Hydration)', async () => {
    const result = await testHydration(
      Carousel,
      { autoplay: false },
      {
        default: () => '<div>Hydration Test</div>'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
