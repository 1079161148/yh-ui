/**
 * InputTag Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import InputTag from '../src/input-tag.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhInputTag SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(InputTag, {
      modelValue: ['Tag 1', 'Tag 2']
    })

    expectSSRHasClass(html, 'yh-input-tag')
    expect(html).toContain('Tag 1')
    expect(html).toContain('Tag 2')
  })

  it('should render placeholder when no tags in SSR', async () => {
    const html = await renderSSR(InputTag, {
      modelValue: [],
      placeholder: 'Add tag'
    })

    expect(html).toContain('Add tag')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(InputTag, {
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different types in SSR', async () => {
    const types = ['success', 'warning', 'danger'] as const
    for (const type of types) {
      const html = await renderSSR(InputTag, { type, modelValue: ['tag'] })
      expectSSRHasClass(html, `is-${type}`)
    }
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(InputTag, {
      modelValue: ['vue', 'nuxt'],
      clearable: true,
      draggable: true
    })
    expect(result.isMatch).toBe(true)
  })
})
