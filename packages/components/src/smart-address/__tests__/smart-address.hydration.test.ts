import { describe, it, expect } from 'vitest'
import SmartAddress from '../src/smart-address.vue'
import { testHydration } from '../../__tests__/utils/ssr'

describe('SmartAddress Hydration', () => {
  it('hydrates parser-enabled default layout without mismatch', async () => {
    const result = await testHydration(SmartAddress, {
      modelValue: {
        name: 'Alice',
        phone: '13800138000',
        province: 'Zhejiang',
        city: 'Hangzhou',
        district: 'Xihu',
        street: '',
        detail: 'No. 1'
      },
      required: true,
      parsePlaceholder: 'Paste address',
      parseButtonText: 'Parse'
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates parser-disabled top-label street layout without mismatch', async () => {
    const result = await testHydration(SmartAddress, {
      modelValue: {
        name: 'Bob',
        phone: '13900139000',
        province: '330000',
        city: '330100',
        district: '330106',
        street: 'Gudun Road',
        detail: 'No. 8'
      },
      showParser: false,
      showStreet: true,
      labelPlacement: 'top',
      themeOverrides: {
        labelWidth: '140px'
      }
    })

    expect(result.isMatch).toBe(true)
  })
})
