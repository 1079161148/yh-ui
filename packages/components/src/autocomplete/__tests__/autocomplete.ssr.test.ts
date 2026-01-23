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

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Autocomplete, {
      modelValue: 'test',
      placeholder: 'Type something',
      fetchSuggestions
    })

    expectSSRHasClass(html, 'yh-autocomplete')
    expect(html).toContain('Type something')
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
    expect(html).toContain('yh-input__clear')
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
