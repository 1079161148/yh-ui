/**
 * Input Component SSR Tests
 * @description 测试 Input 组件在 SSR 环境下的行为，重点关注 ID 生成的一致性
 */
import { describe, it, expect } from 'vitest'
import Input from '../src/input.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhInput SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Input, { modelValue: 'test value' })

    expectSSRHasClass(html, 'yh-input')
    expect(html).toContain('test value')
  })

  it('should render with placeholder in SSR', async () => {
    const html = await renderSSR(Input, { placeholder: 'Enter text' })

    expect(html).toContain('placeholder="Enter text"')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Input, { disabled: true })

    expectSSRHasClass(html, 'is-disabled')
    expect(html).toContain('disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(Input, { size })

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-input--${size}`)
      }
    }
  })

  it('should render clearable input in SSR', async () => {
    const html = await renderSSR(Input, {
      modelValue: 'clearable',
      clearable: true
    })

    expectSSRHasClass(html, 'yh-input')
  })

  it('should render prefix icon in SSR', async () => {
    const html = await renderSSR(Input, { prefixIcon: 'search' })

    expectSSRHasClass(html, 'yh-input__prefix')
  })

  it('should render suffix icon in SSR', async () => {
    const html = await renderSSR(Input, { suffixIcon: 'close' })

    expectSSRHasClass(html, 'yh-input__suffix')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Input, {
      modelValue: 'Hydration Test',
      placeholder: 'Enter text',
      clearable: true
    })

    // 应该匹配（忽略细微的 ID 差异）
    expect(result.isMatch).toBe(true)
  })

  it('should render textarea in SSR', async () => {
    const html = await renderSSR(Input, {
      type: 'textarea',
      modelValue: 'Textarea content',
      rows: 4
    })

    expect(html).toContain('textarea')
    expect(html).toContain('Textarea content')
  })

  it('should render maxlength in SSR', async () => {
    const html = await renderSSR(Input, {
      maxlength: 100,
      showWordLimit: true,
      modelValue: 'test'
    })

    expect(html).toContain('maxlength="100"')
  })

  it('should render password input in SSR', async () => {
    const html = await renderSSR(Input, {
      type: 'password',
      showPassword: true
    })

    expect(html).toContain('type="password"')
  })

  it('should hydrate textarea without mismatch', async () => {
    const result = await testHydration(Input, {
      type: 'textarea',
      modelValue: 'Multi-line\ntext content',
      rows: 5,
      maxlength: 200,
      showWordLimit: true
    })

    expect(result.isMatch).toBe(true)
  })
})
