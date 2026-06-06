/**
 * Tag Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Tag from '../src/tag.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhTag SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Tag,
      {
        type: 'success'
      },
      {
        default: () => 'Success Tag'
      }
    )

    expectSSRHasClass(html, 'yh-tag')
    expectSSRHasClass(html, 'yh-tag--success')
    expect(html).toContain('Success Tag')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['large', 'default', 'small'] as const
    for (const size of sizes) {
      const html = await renderSSR(Tag, { size })
      if (size !== 'default') {
        expectSSRHasClass(html, `yh-tag--${size}`)
      }
    }
  })

  it('should render closable state in SSR', async () => {
    const html = await renderSSR(Tag, {
      closable: true
    })
    expect(html).toContain('yh-tag__close')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Tag,
      {
        type: 'warning',
        closable: true,
        round: true
      },
      {
        default: () => 'Round Tag'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
