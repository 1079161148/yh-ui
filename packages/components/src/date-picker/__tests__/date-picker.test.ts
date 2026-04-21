import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DatePicker from '../src/date-picker.vue'

import { zhCn } from '@yh-ui/locale'

vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => ({
      b: (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`),
      e: (element: string) => `yh-${name}__${element}`,
      m: (modifier: string) => `yh-${name}--${modifier}`,
      em: (element: string, modifier: string) => `yh-${name}__${element}--${modifier}`,
      is: (state: string, value?: boolean) => (value !== false ? `is-${state}` : '')
    }),
    useFormItem: () => ({
      form: null,
      formItem: null,
      validate: vi.fn()
    }),
    useId: () => 'test-id',
    useLocale: () => ({
      t: (key: string) => key,
      locale: ref(zhCn),
      lang: ref('zh-cn')
    }),
    useConfig: () => ({
      globalSize: ref('default'),
      globalLocale: ref(zhCn)
    }),
    useZIndex: () => ({
      currentZIndex: ref(2000),
      nextZIndex: () => 2000
    })
  }
})

describe('YhDatePicker', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 220,
      height: 40,
      top: 100,
      left: 100,
      bottom: 140,
      right: 320,
      x: 100,
      y: 100,
      toJSON: () => {}
    }))
  })

  it('renders the base input', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('.yh-date-picker').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('uses locale keys for default placeholders', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('input').attributes('placeholder')).toBe('datepicker.selectDate')
  })

  it('renders range inputs in range mode', () => {
    const wrapper = mount(DatePicker, {
      props: { type: 'daterange' }
    })

    expect(wrapper.findAll('.yh-date-picker__range-input')).toHaveLength(2)
  })

  it('opens the panel when clicked', async () => {
    const wrapper = mount(DatePicker, {
      props: { teleported: false }
    })

    await wrapper.trigger('click')
    await nextTick()

    expect(wrapper.find('.yh-date-picker__panel').exists()).toBe(true)
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(DatePicker, {
      props: {
        themeOverrides: {
          primary: '#1677ff'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-date-picker-primary: #1677ff')
  })

  it('falls back to an empty display string for invalid values', () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: 'not-a-date'
      }
    })

    expect(wrapper.find('input').element.getAttribute('value') ?? '').toBe('')
  })
})
