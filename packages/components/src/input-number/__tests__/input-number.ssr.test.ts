/**
 * InputNumber Component SSR Tests
 * @description 测试 InputNumber 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import InputNumber from '../src/input-number.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhInputNumber SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 0
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should render with initial value in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 10
    })

    expect(html).toContain('10')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 5,
      disabled: true
    })

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(InputNumber, {
        modelValue: 0,
        size
      })

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-input-number--${size}`)
      }
    }
  })

  it('should render with min value in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 5,
      min: 0
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should render with max value in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 5,
      max: 10
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should render with step in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 0,
      step: 2
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should render with precision in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 1.5,
      precision: 2
    })

    expect(html).toContain('1.50')
  })

  it('should render controls position in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 0,
      controlsPosition: 'right'
    })

    expectSSRHasClass(html, 'yh-input-number--right')
  })

  it('should render without controls in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 0,
      controls: false
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(InputNumber, {
      modelValue: 100,
      min: 0,
      max: 200,
      step: 10
    })

    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with precision', async () => {
    const result = await testHydration(InputNumber, {
      modelValue: 3.14159,
      precision: 2
    })

    expect(result.isMatch).toBe(true)
  })

  it('should render readonly state in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: 10,
      readonly: true
    })

    expectSSRHasClass(html, 'yh-input-number')
  })

  it('should render placeholder in SSR', async () => {
    const html = await renderSSR(InputNumber, {
      modelValue: undefined,
      placeholder: 'Enter number'
    })

    expect(html).toContain('Enter number')
  })
})
