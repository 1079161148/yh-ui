import { describe, it, expect } from 'vitest'
import Spin from '../src/spin.vue'
import { testHydration } from '../../__tests__/utils/ssr'

describe('YhSpin Hydration', () => {
  it('hydrates dot mode markup without mismatch', async () => {
    const result = await testHydration(Spin, {
      show: true,
      dot: true,
      vertical: true,
      tip: 'Hydration'
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates wrapper mode with gradient spinner without mismatch', async () => {
    const result = await testHydration(
      Spin,
      {
        show: true,
        type: 'dual-ring',
        color: {
          '0%': '#ff4d4f',
          '100%': '#1677ff'
        }
      },
      {
        default: () => 'Wrapped'
      }
    )

    expect(result.isMatch).toBe(true)
  })
})
