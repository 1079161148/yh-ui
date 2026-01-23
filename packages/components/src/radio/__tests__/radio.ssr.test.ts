/**
 * Radio Component SSR Tests
 * @description 测试 Radio 组件在 SSR 环境下的行为
 */
import { describe, it, expect } from 'vitest'
import Radio from '../src/radio.vue'
import RadioButton from '../src/radio-button.vue'
import RadioGroup from '../src/radio-group.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhRadio SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Radio,
      {
        modelValue: 'option1',
        label: 'option1'
      },
      {
        default: () => 'Radio Label'
      }
    )

    expectSSRHasClass(html, 'yh-radio')
    expect(html).toContain('Radio Label')
  })

  it('should render checked state in SSR', async () => {
    const html = await renderSSR(
      Radio,
      {
        modelValue: 'selected',
        label: 'selected'
      },
      {
        default: () => 'Selected'
      }
    )

    expectSSRHasClass(html, 'is-checked')
  })

  it('should render unchecked state in SSR', async () => {
    const html = await renderSSR(
      Radio,
      {
        modelValue: 'other',
        label: 'selected'
      },
      {
        default: () => 'Not Selected'
      }
    )

    expectSSRHasClass(html, 'yh-radio')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(
      Radio,
      {
        modelValue: '',
        label: 'option',
        disabled: true
      },
      {
        default: () => 'Disabled'
      }
    )

    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const

    for (const size of sizes) {
      const html = await renderSSR(
        Radio,
        {
          modelValue: '',
          label: 'test',
          size
        },
        {
          default: () => `Size ${size}`
        }
      )

      if (size !== 'default') {
        expectSSRHasClass(html, `yh-radio--${size}`)
      }
    }
  })

  it('should render border style in SSR', async () => {
    const html = await renderSSR(
      Radio,
      {
        modelValue: '',
        label: 'bordered',
        border: true
      },
      {
        default: () => 'Bordered'
      }
    )

    expectSSRHasClass(html, 'is-bordered')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Radio,
      {
        modelValue: 'test',
        label: 'test'
      },
      {
        default: () => 'Hydration Test'
      }
    )

    expect(result.isMatch).toBe(true)
  })
})

describe('YhRadioButton SSR', () => {
  it('should render button style in SSR', async () => {
    const html = await renderSSR(
      RadioButton,
      {
        modelValue: 'button1',
        label: 'button1'
      },
      {
        default: () => 'Button Radio'
      }
    )

    expectSSRHasClass(html, 'yh-radio-button')
  })

  it('should render checked button in SSR', async () => {
    const html = await renderSSR(
      RadioButton,
      {
        modelValue: 'active',
        label: 'active'
      },
      {
        default: () => 'Active Button'
      }
    )

    expectSSRHasClass(html, 'is-active')
  })
})

describe('YhRadioGroup SSR', () => {
  it('should render group correctly in SSR', async () => {
    const html = await renderSSR(RadioGroup, {
      modelValue: 'option1'
    })

    expectSSRHasClass(html, 'yh-radio-group')
  })

  it('should hydrate group without mismatch', async () => {
    const result = await testHydration(RadioGroup, {
      modelValue: 'option2'
    })

    expect(result.isMatch).toBe(true)
  })

  it('should render group with size in SSR', async () => {
    const html = await renderSSR(RadioGroup, {
      modelValue: '',
      size: 'large'
    })

    expectSSRHasClass(html, 'yh-radio-group--large')
  })

  it('should render disabled group in SSR', async () => {
    const html = await renderSSR(RadioGroup, {
      modelValue: '',
      disabled: true
    })

    expectSSRHasClass(html, 'yh-radio-group')
  })
})
