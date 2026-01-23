/**
 * Col Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Col from '../src/col.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhCol SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Col,
      {
        span: 12,
        offset: 4,
        push: 2,
        pull: 2
      },
      {
        default: () => 'Col Content'
      }
    )

    expectSSRHasClass(html, 'yh-col')
    expectSSRHasClass(html, 'yh-col-12')
    expectSSRHasClass(html, 'yh-col-offset-4')
    expectSSRHasClass(html, 'yh-col-push-2')
    expectSSRHasClass(html, 'yh-col-pull-2')
  })

  it('should render responsive props in SSR', async () => {
    const html = await renderSSR(Col, {
      xs: 24,
      sm: { span: 12, offset: 4 },
      md: 8
    })
    expectSSRHasClass(html, 'yh-col-xs-24')
    expectSSRHasClass(html, 'yh-col-sm-12')
    expectSSRHasClass(html, 'yh-col-sm-offset-4')
    expectSSRHasClass(html, 'yh-col-md-8')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Col, {
      span: 6,
      tag: 'aside'
    })
    expect(result.isMatch).toBe(true)
  })
})
