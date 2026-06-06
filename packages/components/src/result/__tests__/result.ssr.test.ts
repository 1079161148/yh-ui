import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Result from '../src/result.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhResult SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Result, { title: 'Success', icon: 'success' })
    expectSSRHasClass(html, 'yh-result')
    expect(html).toContain('Success')
    expectSSRHasClass(html, 'yh-result__icon--success')
  })

  it('should render subtitle in SSR', async () => {
    const html = await renderSSR(Result, { title: 'Done', subTitle: 'Please go back' })
    expectSSRHasClass(html, 'yh-result__subtitle')
    expect(html).toContain('Please go back')
  })

  it('should render SVG icon in SSR', async () => {
    const html = await renderSSR(Result, { icon: 'error' })
    expect(html).toContain('<svg')
    expectSSRHasClass(html, 'yh-result__icon--error')
  })

  it('should render default slot in SSR', async () => {
    const html = await renderSSR(
      Result,
      { title: 'Done' },
      {
        default: () => h('button', 'Go Back')
      }
    )
    expectSSRHasClass(html, 'yh-result__actions')
    expect(html).toContain('Go Back')
  })

  it('should have role=status in SSR', async () => {
    const html = await renderSSR(Result)
    expect(html).toContain('role="status"')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Result, { title: 'OK', icon: 'success' })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with slots without mismatch', async () => {
    const result = await testHydration(
      Result,
      { title: 'Done', subTitle: 'Info' },
      {
        default: () => h('button', 'Action')
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
