/**
 * Divider Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Divider from '../src/divider.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhDivider SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Divider,
      {
        contentPosition: 'center'
      },
      {
        default: () => 'Divider Content'
      }
    )

    expectSSRHasClass(html, 'yh-divider')
    expect(html).toContain('Divider Content')
  })

  it('should render vertical orientation in SSR', async () => {
    const html = await renderSSR(Divider, {
      direction: 'vertical'
    })
    expectSSRHasClass(html, 'yh-divider--vertical')
  })

  it('should render different border styles in SSR', async () => {
    const borderStyles = ['solid', 'dashed', 'dotted'] as const
    for (const borderStyle of borderStyles) {
      const html = await renderSSR(Divider, { borderStyle })
      expect(html).toContain(`--yh-divider-border-style:${borderStyle}`)
    }
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Divider,
      {
        contentPosition: 'left',
        borderStyle: 'dashed'
      },
      {
        default: () => 'Left Text'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
