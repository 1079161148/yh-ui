/**
 * Rate Component SSR Tests
 * @description 测试 Rate 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import Rate from '../src/rate.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhRate SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 0
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should render with value in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 3
    })

    expectSSRHasClass(html, 'yh-rate')
    // 应该有3个激活的星星
    const activeStars = (html.match(/yh-rate__item--active/g) || []).length
    expect(activeStars).toBeGreaterThan(0)
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 3,
      disabled: true
    })

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(Rate, {
        modelValue: 2,
        size
      })

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-rate--${size}`)
      }
    }
  })

  it('should render max count in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 0,
      max: 10
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should render with half stars in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 3.5,
      allowHalf: true
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should render readonly state in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 4,
      readonly: true
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should render show text in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 3,
      showText: true,
      texts: ['极差', '失望', '一般', '满意', '惊喜']
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should render show score in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 4.5,
      showScore: true
    })

    expect(html).toContain('4.5')
  })

  it('should render custom color in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 3,
      voidColor: '#f0f0f0',
      activeColor: '#ff6b6b'
    })

    expectSSRHasClass(html, 'yh-rate')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Rate, {
      modelValue: 4,
      max: 5
    })

    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with half stars', async () => {
    const result = await testHydration(Rate, {
      modelValue: 3.5,
      allowHalf: true
    })

    expect(result.isMatch).toBe(true)
  })

  it('should render with custom icon in SSR', async () => {
    const html = await renderSSR(Rate, {
      modelValue: 2,
      iconClass: 'custom-icon'
    })

    expectSSRHasClass(html, 'yh-rate')
  })
})
