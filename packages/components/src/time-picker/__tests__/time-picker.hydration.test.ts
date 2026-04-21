import { describe, it, expect } from 'vitest'
import TimePicker from '../src/time-picker.vue'
import { testHydration } from '../../__tests__/utils/ssr'

describe('YhTimePicker Hydration', () => {
  it('hydrates single-value markup without mismatch', async () => {
    const result = await testHydration(TimePicker, {
      modelValue: '14:30:00',
      format: 'HH:mm:ss',
      clearable: true,
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates range markup without mismatch', async () => {
    const result = await testHydration(TimePicker, {
      isRange: true,
      modelValue: ['09:00:00', '18:00:00'],
      startPlaceholder: 'Start',
      endPlaceholder: 'End',
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })
})
