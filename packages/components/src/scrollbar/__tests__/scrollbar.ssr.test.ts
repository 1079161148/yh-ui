/**
 * Scrollbar Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Scrollbar from '../src/scrollbar.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhScrollbar SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Scrollbar,
      {
        height: '200px',
        viewClass: 'custom-view'
      },
      {
        default: () => '<div class="content">SSR Scrollbar</div>'
      }
    )

    expectSSRHasClass(html, 'yh-scrollbar')
    expect(html).toContain('yh-scrollbar__wrap')
    expect(html).toContain('custom-view')
    expect(html).toContain('SSR Scrollbar')
  })

  it('should render native state in SSR', async () => {
    const html = await renderSSR(Scrollbar, {
      native: true
    })
    // In native mode, should not have hidden-native class
    expect(html).not.toContain('yh-scrollbar__wrap--hidden-native')
    // Should not render custom thumb components in SSR when native
    expect(html).not.toContain('yh-scrollbar__bar')
  })

  it('should render non-native state in SSR', async () => {
    const html = await renderSSR(Scrollbar, {
      native: false
    })
    expectSSRHasClass(html, 'yh-scrollbar__wrap--hidden-native')
  })

  it('should render custom tag in SSR', async () => {
    const html = await renderSSR(Scrollbar, {
      tag: 'ul'
    })
    expect(html).toContain('<ul')
    expect(html).toContain('</ul>')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Scrollbar,
      {
        height: '200px',
        always: true
      },
      {
        default: () => 'Hydrated Content'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
