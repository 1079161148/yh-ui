/**
 * TimeSelect Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import TimeSelect from '../src/time-select.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhTimeSelect SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(TimeSelect, {
      modelValue: '',
      placeholder: 'Select time'
    })

    expectSSRHasClass(html, 'yh-time-select')
    expect(html).toContain('Select time')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(TimeSelect, {
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const
    for (const size of sizes) {
      const html = await renderSSR(TimeSelect, { size })
      if (size !== 'default') {
        expectSSRHasClass(html, `yh-time-select--${size}`)
      }
    }
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(TimeSelect, {
      modelValue: '10:00',
      start: '08:30',
      step: '00:15',
      end: '18:30'
    })
    expect(result.isMatch).toBe(true)
  })
})
