import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import TimePicker from '../src/time-picker.vue'

import { zhCn } from '@yh-ui/locale'

vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => ({
      b: (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`),
      e: (element: string) => `yh-${name}__${element}`,
      m: (modifier: string) => `yh-${name}--${modifier}`,
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

describe('YhTimePicker', () => {
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
    const wrapper = mount(TimePicker)

    expect(wrapper.find('.yh-time-picker').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('uses locale keys for default placeholders', () => {
    const wrapper = mount(TimePicker)

    expect(wrapper.find('input').attributes('placeholder')).toBe('timepicker.placeholder')
  })

  it('opens the panel when clicked', async () => {
    const wrapper = mount(TimePicker, {
      props: { teleported: false }
    })

    await wrapper.find('.yh-time-picker').trigger('click')
    await nextTick()

    expect(wrapper.find('.yh-time-picker__panel').exists()).toBe(true)
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(TimePicker, {
      props: {
        themeOverrides: {
          activeColor: '#00aa88'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-time-picker-active-color: #00aa88')
  })

  it('exposes inputRef as a live ref', async () => {
    const wrapper = mount(TimePicker)

    await nextTick()

    const exposed = (wrapper.vm as any).$?.exposed
    expect(exposed?.inputRef?.value).toBeInstanceOf(HTMLInputElement)
  })
})
