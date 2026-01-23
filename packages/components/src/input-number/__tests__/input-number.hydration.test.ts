/**
 * InputNumber Hydration Tests
 */
import { describe, it, expect } from 'vitest'
import InputNumber from '../src/input-number.vue'
import { testHydration } from '../../__tests__/utils/ssr'

describe('YhInputNumber Hydration', () => {
  it('should hydrate without mismatch', async () => {
    const result = await testHydration(InputNumber, {
      modelValue: 100,
      min: 0,
      max: 200,
      step: 10
    })

    expect(result.ssrHtml).toBe(result.csrHtml)
  })

  it('should hydrate with precision', async () => {
    const result = await testHydration(InputNumber, {
      modelValue: 3.14159,
      precision: 2
    })

    expect(result.ssrHtml).toBe(result.csrHtml)
  })
})
