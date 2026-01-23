/**
 * Button Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Button from '../src/button.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhButton SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Button,
      {
        type: 'primary',
        size: 'large'
      },
      {
        default: () => 'SSR Button'
      }
    )

    expectSSRHasClass(html, 'yh-button')
    expectSSRHasClass(html, 'yh-button--primary')
    expectSSRHasClass(html, 'yh-button--large')
    expect(html).toContain('SSR Button')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Button, {
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render loading state in SSR', async () => {
    const html = await renderSSR(Button, {
      loading: true
    })
    expectSSRHasClass(html, 'is-loading')
    expect(html).toContain('svg') // Should contain loading icon
  })

  it('should render plain, round, circle in SSR', async () => {
    const props = ['plain', 'round', 'circle'] as const
    for (const prop of props) {
      const html = await renderSSR(Button, { [prop]: true })
      expectSSRHasClass(html, `is-${prop}`)
    }
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Button,
      {
        type: 'success',
        icon: 'check',
        round: true
      },
      {
        default: () => 'Check'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
