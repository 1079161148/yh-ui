/**
 * Marquee Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Marquee from '../src/marquee.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../../src/__tests__/utils/ssr'

describe('YhMarquee SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Marquee,
      {
        direction: 'horizontal',
        gap: '20px',
        duration: 15
      },
      {
        default: () => 'SSR Marquee Content'
      }
    )

    expectSSRHasClass(html, 'yh-marquee')
    expectSSRHasClass(html, 'yh-marquee--horizontal')
    expect(html).toContain('SSR Marquee Content')
    // Check if custom properties are rendered in style attribute
    expect(html).toContain('--yh-marquee-gap:20px')
    expect(html).toContain('--yh-marquee-duration:15s')
  })

  it('should render vertical direction in SSR', async () => {
    const html = await renderSSR(Marquee, {
      direction: 'vertical'
    })
    expectSSRHasClass(html, 'yh-marquee--vertical')
  })

  it('should render gradient overlay in SSR', async () => {
    const html = await renderSSR(Marquee, {
      gradient: true,
      gradientColor: '#000000',
      gradientWidth: '100px'
    })
    expectSSRHasClass(html, 'yh-marquee--gradient')
    expect(html).toContain('yh-marquee__overlay')
    expect(html).toContain('--yh-marquee-gradient-color:#000000')
    expect(html).toContain('--yh-marquee-gradient-width:100px')
  })

  it('should render pause states in SSR', async () => {
    const hoverHtml = await renderSSR(Marquee, { pauseOnHover: true })
    expectSSRHasClass(hoverHtml, 'yh-marquee--pause-on-hover')

    const clickHtml = await renderSSR(Marquee, { pauseOnClick: true })
    expectSSRHasClass(clickHtml, 'yh-marquee--pause-on-click')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Marquee,
      {
        direction: 'horizontal',
        play: true,
        gap: 10
      },
      {
        default: () => 'Hydration Test'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
