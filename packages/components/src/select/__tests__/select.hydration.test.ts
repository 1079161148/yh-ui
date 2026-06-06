import { describe, it, expect } from 'vitest'
import Select from '../src/select.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const trimTextBoundaryWhitespace = (html: string) =>
  html.replace(/>\s*([^<]*?)\s*</g, (_, text: string) => `>${text.trim()}<`)

describe('YhSelect Hydration', () => {
  it('hydrates single select markup without mismatch', async () => {
    const result = await testHydration(Select, {
      modelValue: 'option1',
      clearable: true,
      placeholder: 'Select option',
      teleported: false
    })

    expect(trimTextBoundaryWhitespace(result.ssrHtml)).toBe(
      trimTextBoundaryWhitespace(result.csrHtml)
    )
  })

  it('hydrates multiple collapsed tag markup without mismatch', async () => {
    const result = await testHydration(Select, {
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ],
      multiple: true,
      modelValue: ['option1', 'option2', 'option3'],
      collapseTags: true,
      maxCollapseTags: 1,
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })
})
