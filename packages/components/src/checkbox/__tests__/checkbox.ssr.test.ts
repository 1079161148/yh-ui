/**
 * Checkbox Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Checkbox from '../src/checkbox.vue'
import CheckboxGroup from '../src/checkbox-group.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhCheckbox SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Checkbox,
      {
        modelValue: true
      },
      {
        default: () => 'Checkbox Label'
      }
    )
    expectSSRHasClass(html, 'yh-checkbox')
    expect(html).toContain('Checkbox Label')
  })

  it('should render checked state in SSR', async () => {
    const html = await renderSSR(Checkbox, {
      modelValue: true
    })
    expectSSRHasClass(html, 'is-checked')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Checkbox, {
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Checkbox,
      {
        modelValue: true
      },
      {
        default: () => 'Hydration Test'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})

describe('YhCheckboxGroup SSR', () => {
  it('should render group correctly in SSR', async () => {
    const html = await renderSSR(CheckboxGroup, {
      modelValue: ['opt1']
    })
    expectSSRHasClass(html, 'yh-checkbox-group')
  })

  it('should hydrate group without mismatch', async () => {
    const result = await testHydration(CheckboxGroup, {
      modelValue: ['opt1']
    })
    expect(result.isMatch).toBe(true)
  })
})
