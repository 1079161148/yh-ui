/**
 * Slider Component SSR Tests
 * @description 测试 Slider 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import Slider from '../src/slider.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhSlider SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 0
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render with value in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 50
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 30,
      disabled: true
    })

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(Slider, {
        modelValue: 20,
        size
      })

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-slider--${size}`)
      }
    }
  })

  it('should render with min and max in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 50,
      min: 0,
      max: 100
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render with step in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 20,
      step: 10
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render show stops in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 50,
      step: 25,
      showStops: true
    })

    expectSSRHasClass(html, 'yh-slider__stop')
  })

  it('should render show tooltip in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 40,
      showTooltip: true
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render vertical mode in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 30,
      vertical: true,
      height: '200px'
    })

    expectSSRHasClass(html, 'is-vertical')
  })

  it('should render range mode in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: [20, 60],
      range: true
    })

    expectSSRHasClass(html, 'yh-slider')
  })

  it('should render with marks in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 50,
      marks: {
        0: '0°C',
        50: '50°C',
        100: '100°C'
      }
    })

    expectSSRHasClass(html, 'yh-slider__marks')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Slider, {
      modelValue: 45,
      min: 0,
      max: 100,
      step: 5
    })

    expect(result.isMatch).toBe(true)
  })

  it('should hydrate range mode', async () => {
    const result = await testHydration(Slider, {
      modelValue: [25, 75],
      range: true
    })

    expect(result.isMatch).toBe(true)
  })

  it('should render show input in SSR', async () => {
    const html = await renderSSR(Slider, {
      modelValue: 60,
      showInput: true
    })

    expectSSRHasClass(html, 'yh-slider')
  })
})
