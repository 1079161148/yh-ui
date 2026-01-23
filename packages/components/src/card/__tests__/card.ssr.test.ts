/**
 * Card Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Card from '../src/card.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhCard SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Card,
      {
        header: 'Card Title'
      },
      {
        default: () => 'Card Content'
      }
    )

    expectSSRHasClass(html, 'yh-card')
    expect(html).toContain('Card Title')
    expect(html).toContain('Card Content')
  })

  it('should render shadow options in SSR', async () => {
    const shadows = ['always', 'hover', 'never'] as const
    for (const shadow of shadows) {
      const html = await renderSSR(Card, { shadow })
      expectSSRHasClass(html, `is-${shadow}-shadow`)
    }
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Card,
      {
        header: 'Header',
        shadow: 'hover'
      },
      {
        default: () => 'Main Content',
        footer: () => 'Footer Content'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
