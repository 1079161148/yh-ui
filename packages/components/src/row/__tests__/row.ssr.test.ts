/**
 * Row Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Row from '../src/row.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhRow SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Row,
      {
        gutter: 20,
        justify: 'center',
        align: 'middle'
      },
      {
        default: () => 'Row Content'
      }
    )

    expectSSRHasClass(html, 'yh-row')
    expectSSRHasClass(html, 'is-justify-center')
    expectSSRHasClass(html, 'is-align-middle')
    expect(html).toContain('margin-left:-10px')
    expect(html).toContain('margin-right:-10px')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Row, {
      gutter: 10,
      tag: 'section'
    })
    expect(result.isMatch).toBe(true)
  })
})
