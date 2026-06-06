import { describe, it, expect } from 'vitest'
import DatePicker from '../src/date-picker.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const trimTextBoundaryWhitespace = (html: string) =>
  html.replace(/>\s*([^<]*?)\s*</g, (_, text: string) => `>${text.trim()}<`)

const normalizeTeleportDisabled = (html: string) => html.replace('<teleport disabled to=', '<teleport to=')

describe('YhDatePicker Hydration', () => {
  it('hydrates single date markup without mismatch', async () => {
    const result = await testHydration(DatePicker, {
      modelValue: '2024-01-01',
      format: 'YYYY-MM-DD',
      teleported: false
    })

    expect(normalizeTeleportDisabled(trimTextBoundaryWhitespace(result.ssrHtml))).toBe(
      normalizeTeleportDisabled(trimTextBoundaryWhitespace(result.csrHtml))
    )
  })

  it('hydrates range markup without mismatch', async () => {
    const result = await testHydration(DatePicker, {
      type: 'daterange',
      modelValue: ['2024-01-01', '2024-01-10'],
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
      teleported: false
    })

    expect(normalizeTeleportDisabled(trimTextBoundaryWhitespace(result.ssrHtml))).toBe(
      normalizeTeleportDisabled(trimTextBoundaryWhitespace(result.csrHtml))
    )
  })
})
