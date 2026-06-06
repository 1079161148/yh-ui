import { describe, it, expect } from 'vitest'
import Transfer from '../src/transfer.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const data = Array.from({ length: 8 }, (_, i) => ({
  key: i + 1,
  label: `Option ${i + 1}`,
  disabled: i === 5
}))

describe('YhTransfer Hydration', () => {
  it('hydrates basic transfer markup without mismatch', async () => {
    const result = await testHydration(Transfer, {
      data,
      modelValue: [1, 3],
      titles: ['Source', 'Target']
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates filterable virtual panels without mismatch', async () => {
    const result = await testHydration(Transfer, {
      data,
      modelValue: [2],
      filterable: true,
      virtual: true,
      itemHeight: 36,
      height: 240
    })

    expect(result.isMatch).toBe(true)
  })
})
