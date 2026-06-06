/**
 * Autocomplete Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Autocomplete from '../src/autocomplete.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhAutocomplete SSR', () => {
  const fetchSuggestions = (queryString: string, cb: any) => {
    cb([{ value: 'Vue' }, { value: 'React' }])
  }

  it('should render placeholder in SSR', async () => {
    const html = await renderSSR(Autocomplete, {
      modelValue: '',
      placeholder: 'Type something',
      fetchSuggestions
    })

    expectSSRHasClass(html, 'yh-autocomplete')
    expect(html).toContain('Type something')
  })

  it('should render modelValue in SSR', async () => {
    const html = await renderSSR(Autocomplete, {
      modelValue: 'test',
      fetchSuggestions
    })

    expect(html).toContain('value="test"')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Autocomplete, {
      disabled: true,
      fetchSuggestions
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render clearable in SSR', async () => {
    const html = await renderSSR(Autocomplete, {
      modelValue: 'content',
      clearable: true,
      fetchSuggestions
    })
    expectSSRHasClass(html, 'yh-autocomplete')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Autocomplete, {
      modelValue: 'Vue',
      fetchSuggestions,
      triggerOnFocus: true
    })
    expect(result.isMatch).toBe(true)
  })
})
