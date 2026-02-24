/**
 * Select Component SSR Tests
 * @description 测试 Select 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import Select from '../src/select.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhSelect SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Select, {
      modelValue: '',
      placeholder: 'Please select'
    })

    expectSSRHasClass(html, 'yh-select')
    expect(html).toContain('Please select')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Select, {
      disabled: true,
      placeholder: 'Disabled select'
    })

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const
    for (const size of sizes) {
      const html = await renderSSR(Select, { size, placeholder: 'Select' })
      if (size !== 'default') {
        expectSSRHasClass(html, `yh-select--${size}`)
      }
    }
  })

  it('should render multiple select in SSR', async () => {
    const html = await renderSSR(Select, {
      modelValue: ['1', '2'],
      multiple: true,
      placeholder: 'Multiple select'
    })
    expectSSRHasClass(html, 'yh-select')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Select, {
      modelValue: '1',
      placeholder: 'Select option',
      clearable: true
    })
    expect(result.isMatch).toBe(true)
  })

  it('should render loading state in SSR', async () => {
    const html = await renderSSR(Select, {
      loading: true,
      placeholder: 'Loading...'
    })
    expectSSRHasClass(html, 'yh-select')
  })
})
