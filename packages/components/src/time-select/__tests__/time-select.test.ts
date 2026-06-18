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
    expect(parseTimeToMinutes('')).toBe(0)
    expect(formatMinutesToTime(570)).toBe('09:30')
    expect(formatMinutesToTime(570, 'H:m')).toBe('9:30')
  })

  it('compares and validates ranges', () => {
    expect(compareTime('09:00', '10:00')).toBe(-1)
    expect(compareTime('10:00', '09:00')).toBe(1)
    expect(compareTime('10:00', '10:00')).toBe(0)
    expect(isTimeInRange('10:00', '09:00', '11:00')).toBe(true)
    expect(isTimeInRange('08:00', '09:00', '11:00')).toBe(false)
  })

  it('generates option lists', () => {
    const options = generateTimeOptions('09:00', '10:00', '00:30')

    expect(options.map((item) => item.value)).toEqual(['09:00', '09:30', '10:00'])
  })

  it('returns empty options when step is invalid and stops beyond 24 hours', () => {
    expect(generateTimeOptions('09:00', '10:00', '00:00')).toEqual([])
    expect(generateTimeOptions('23:30', '25:30', '00:30').map((item) => item.value)).toEqual([
      '23:30',
      '24:00'
    ])
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

  it('applies disabledHours/minTime/maxTime to option disabled states', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [
          { label: '09:00', value: '09:00' },
          { label: '09:30', value: '09:30' },
          { label: '10:00', value: '10:00' }
        ],
        disabledHours: [['09:00', '09:15']],
        minTime: '09:15',
        maxTime: '09:45'
      }
    })

    await wrapper.trigger('click')
    await nextTick()
    const opts = wrapper.findAll('.yh-time-select__option')
    expect(opts[0].classes()).toContain('is-disabled')
    expect(opts[2].classes()).toContain('is-disabled')
  })

  it('supports keyboard open / navigate / select / close', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [
          { label: '09:00', value: '09:00', disabled: true },
          { label: '09:30', value: '09:30' }
        ]
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['09:30'])

    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('visible-change')).toBeTruthy()
  })

  it('clears value and emits clear/change with valueOnClear', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        modelValue: '09:30',
        valueOnClear: '',
        teleported: false
      }
    })

    await wrapper.trigger('mouseenter')
    const input = wrapper.find('input')
    await input.trigger('focus')
    await nextTick()

    const clearBtn = wrapper.find('.yh-time-select__clear')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
  })

  it('ignores input when editable is false', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        editable: false,
        teleported: false
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('renders empty slot when query filters out all options', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [{ label: '09:00', value: '09:00' }]
      },
      slots: {
        empty: 'EMPTY_SLOT'
      }
    })

    await wrapper.trigger('click')
    const input = wrapper.find('input')
    await input.setValue('nomatch')
    await nextTick()
    expect(wrapper.text()).toContain('EMPTY_SLOT')
  })

  it('suppresses blur while clicking dropdown', async () => {
    vi.useFakeTimers()
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [{ label: '09:30', value: '09:30' }]
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    const input = wrapper.find('input')
    const dropdown = wrapper.find('.yh-time-select__dropdown')
    await dropdown.trigger('mousedown')
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeFalsy()

    await dropdown.trigger('mouseup')
    vi.runAllTimers()
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    vi.useRealTimers()
  })

  it('uses custom options, option slot and ignores disabled selections', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [
          { label: 'Morning', value: '09:00', disabled: true },
          { label: 'Noon', value: '12:00' }
        ],
        modelValue: '13:00'
      },
      slots: {
        prefix: '<span class="prefix-slot">P</span>',
        option: ({ option }: any) => `custom-${option.label}`
      }
    })

    expect(wrapper.find('.prefix-slot').exists()).toBe(true)
    expect(wrapper.find('.yh-time-select__display-value').text()).toBe('13:00')

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('custom-Morning')

    const options = wrapper.findAll('.yh-time-select__option')
    await options[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    await options[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['12:00'])
  })

  it('supports teleported positioning above the input and cleans up listeners', async () => {
    const addEventListener = vi.spyOn(window, 'addEventListener')
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    Object.defineProperty(window, 'innerHeight', { value: 300, configurable: true })

    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: true,
        popperClass: 'time-select-popper-extra',
        effect: 'dark',
        options: [{ label: '09:00', value: '09:00' }]
      },
      attachTo: document.body
    })
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 160,
      height: 32,
      top: 260,
      left: 40,
      bottom: 292,
      right: 200,
      x: 40,
      y: 260,
      toJSON: () => {}
    }))

    await wrapper.trigger('click')
    await nextTick()
    await nextTick()

    const dropdown = document.body.querySelector(
      '.yh-time-select__dropdown.time-select-popper-extra'
    ) as HTMLElement
    expect(dropdown).toBeTruthy()
    expect(dropdown.className).toContain('is-dark')
    expect(dropdown.style.bottom).toBeTruthy()
    expect(addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))

    wrapper.unmount()
    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    addEventListener.mockRestore()
    removeEventListener.mockRestore()
  })

  it('covers keyboard tab, arrow-up and enter-open paths', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        teleported: false,
        options: [
          { label: '09:00', value: '09:00' },
          { label: '09:30', value: '09:30', disabled: true },
          { label: '10:00', value: '10:00' }
        ]
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])

    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.findAll('.yh-time-select__option')[2].classes()).toContain('is-hovering')

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.findAll('.yh-time-select__option')[0].classes()).toContain('is-hovering')

    await input.trigger('keydown', { key: 'Tab' })
    expect(wrapper.emitted('visible-change')?.at(-1)).toEqual([false])
  })

  it('does not open when disabled and skips clear validation when disabled by props', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        disabled: true,
        teleported: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('visible-change')).toBeFalsy()
    expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
    wrapper = mount(YhTimeSelect, {
      props: {
        modelValue: '09:00',
        teleported: false,
        validateEvent: false
      }
    })
    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()
    await wrapper.find('.yh-time-select__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('supports prefixIcon and clearIcon components or strings', async () => {
    wrapper = mount(YhTimeSelect, {
      props: {
        prefixIcon: 'span',
        clearIcon: 'div',
        modelValue: '09:00',
        clearable: true
      }
    })
    // Check prefix icon element tag name is 'span' (since we pass prefixIcon: 'span')
    const prefix = wrapper.find('.yh-time-select__prefix span')
    expect(prefix.exists()).toBe(true)

    // Trigger hover and focus to show clear icon
    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    // Check clear icon element tag name is 'div' (since we pass clearIcon: 'div')
    const clear = wrapper.find('.yh-time-select__clear div')
    expect(clear.exists()).toBe(true)
  })
})
