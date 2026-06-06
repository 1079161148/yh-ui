/**
 * Switch Component SSR Tests
 * @description 测试 Switch 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import Switch from '../src/switch.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhSwitch SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: false
    })

    expectSSRHasClass(html, 'yh-switch')
  })

  it('should render checked state in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: true
    })

    expectSSRHasClass(html, 'is-checked')
  })

  it('should render unchecked state in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: false
    })

    expectSSRHasClass(html, 'yh-switch')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: false,
      disabled: true
    })

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render loading state in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: false,
      loading: true
    })

    expectSSRHasClass(html, 'is-loading')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(Switch, {
        modelValue: false,
        size
      })

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-switch--${size}`)
      }
    }
  })

  it('should render with active text in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: true,
      activeText: 'On'
    })

    expect(html).toContain('On')
  })

  it('should render with inactive text in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: false,
      inactiveText: 'Off'
    })

    expect(html).toContain('Off')
  })

  it('should render custom colors in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: true,
      activeColor: '#13ce66',
      inactiveColor: '#ff4949'
    })

    expectSSRHasClass(html, 'yh-switch')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Switch, {
      modelValue: true,
      activeText: 'ON',
      inactiveText: 'OFF'
    })

    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with loading state', async () => {
    const result = await testHydration(Switch, {
      modelValue: false,
      loading: true
    })

    expect(result.isMatch).toBe(true)
  })

  it('should render with custom active value in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: 'yes',
      activeValue: 'yes',
      inactiveValue: 'no'
    })

    expectSSRHasClass(html, 'is-checked')
  })

  it('should render with custom inactive value in SSR', async () => {
    const html = await renderSSR(Switch, {
      modelValue: 'no',
      activeValue: 'yes',
      inactiveValue: 'no'
    })

    expectSSRHasClass(html, 'yh-switch')
  })
})
