import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import YhTimeSelect from '../src/time-select.vue'
import {
  parseTimeToMinutes,
  formatMinutesToTime,
  compareTime,
  isTimeInRange,
  generateTimeOptions
} from '../src/time-select'

vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => ({
      b: (modifier?: string) => (modifier ? `yh-${name}--${modifier}` : `yh-${name}`),
      e: (element: string) => `yh-${name}__${element}`,
      m: (modifier: string) => `yh-${name}--${modifier}`,
      is: (state: string, val?: boolean) => (val !== false ? `is-${state}` : '')
    }),
    useFormItem: () => ({
      form: null,
      formItem: null,
      validate: vi.fn()
    }),
    useId: () => 'test-id',
    useLocale: () => ({ t: (key: string) => key }),
    useConfig: () => ({ globalSize: 'default' }),
    useZIndex: () => ({ currentZIndex: 2000, nextZIndex: () => 2000 })
  }
})

describe('TimeSelect helpers', () => {
  it('parses and formats time values', () => {
    expect(parseTimeToMinutes('09:30')).toBe(570)
    expect(formatMinutesToTime(570)).toBe('09:30')
  })

  it('compares and validates ranges', () => {
    expect(compareTime('09:00', '10:00')).toBe(-1)
    expect(compareTime('10:00', '09:00')).toBe(1)
    expect(isTimeInRange('10:00', '09:00', '11:00')).toBe(true)
    expect(isTimeInRange('08:00', '09:00', '11:00')).toBe(false)
  })

  it('generates option lists', () => {
    const options = generateTimeOptions('09:00', '10:00', '00:30')

    expect(options.map((item) => item.value)).toEqual(['09:00', '09:30', '10:00'])
  })
})

describe('YhTimeSelect', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders the base input', () => {
    wrapper = mount(YhTimeSelect)

    expect(wrapper.classes()).toContain('yh-time-select')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('uses locale keys for default placeholders', () => {
    wrapper = mount(YhTimeSelect)

    expect(wrapper.find('input').attributes('placeholder')).toBe('timeselect.placeholder')
  })

  it('opens the dropdown and renders generated options', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        start: '09:00',
        end: '10:00',
        step: '00:30',
        teleported: false
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    expect(wrapper.findAll('.yh-time-select__option')).toHaveLength(3)
  })

  it('applies theme overrides as inline css vars', () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        themeOverrides: {
          borderColor: '#ff6600'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-time-select-border-color: #ff6600')
  })

  it('exposes inputRef as a live ref', async () => {
    wrapper = mount(YhTimeSelect)

    await nextTick()

    const exposed = (wrapper.vm as any).$?.exposed
    expect(exposed?.inputRef?.value).toBeInstanceOf(HTMLInputElement)
  })
})
