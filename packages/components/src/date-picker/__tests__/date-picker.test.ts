import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import DatePicker from '../src/date-picker.vue'
import DateTable from '../src/date-table.vue'
import MonthTable from '../src/month-table.vue'
import YearTable from '../src/year-table.vue'
import QuarterTable from '../src/quarter-table.vue'

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

  it('selects date values with valueFormat and clears when hovering', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(2024, 0, 1),
        valueFormat: 'YYYY/MM/DD',
        clearable: true,
        teleported: false
      },
      slots: {
        'prefix-icon': () => h('span', { class: 'prefix-slot' }, 'P'),
        'clear-icon': () => h('span', { class: 'clear-slot' }, 'C')
      }
    })

    await wrapper.trigger('click')
    wrapper.findComponent(DateTable).vm.$emit('select', new Date(2024, 4, 6))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2024/05/06'])

    await wrapper.trigger('mouseenter')
    await nextTick()
    expect(wrapper.find('.clear-slot').exists()).toBe(true)
    await wrapper.find('.yh-date-picker__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.find('.prefix-slot').exists()).toBe(true)
  })

  it('navigates year/month/quarter panel selection paths', async () => {
    const year = mount(DatePicker, {
      props: { type: 'year', panelOnly: true, valueFormat: 'YYYY' }
    })
    year.findComponent(YearTable).vm.$emit('select', 2030)
    await nextTick()
    expect(year.emitted('update:modelValue')?.[0]).toEqual(['2030'])

    const month = mount(DatePicker, {
      props: { type: 'month', panelOnly: true, valueFormat: 'YYYY-MM' }
    })
    month.findComponent(MonthTable).vm.$emit('select', 5)
    await nextTick()
    expect(month.emitted('update:modelValue')?.[0]?.[0]).toMatch(/-06$/)

    const quarter = mount(DatePicker, {
      props: { type: 'quarter', panelOnly: true, valueFormat: 'YYYY-MM-DD' }
    })
    quarter.findComponent(QuarterTable).vm.$emit('select', 2)
    await nextTick()
    expect(quarter.emitted('update:modelValue')?.[0]?.[0]).toContain('-04-')
  })

  it('covers range ordering, presets, extra/footer slots and confirm', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'daterange',
        modelValue: [new Date(2024, 4, 10), null],
        orderOnConfirm: false,
        teleported: false,
        presets: [{ label: 'Today', value: () => [new Date(2024, 0, 1), new Date(2024, 0, 2)] }]
      },
      slots: {
        extra: '<div class="extra-slot">Extra</div>',
        footer: '<button class="footer-slot">Footer</button>',
        'date-cell': '<span class="date-cell-slot">D</span>'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.find('.extra-slot').exists()).toBe(true)
    expect(wrapper.find('.footer-slot').exists()).toBe(true)
    expect(wrapper.find('.yh-date-picker__preset-item').exists()).toBe(true)

    wrapper.findComponent(DateTable).vm.$emit('select', new Date(2024, 4, 1))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([new Date(2024, 4, 1), null])

    await wrapper.find('.yh-date-picker__preset-item').trigger('click')
    const changes = wrapper.emitted('change') || []
    expect(changes[changes.length - 1]?.[0]).toEqual([new Date(2024, 0, 1), new Date(2024, 0, 2)])
  })

  it('keeps disabled, readonly and panel-only pickers from toggling', async () => {
    const disabled = mount(DatePicker, { props: { disabled: true } })
    await disabled.trigger('click')
    expect(disabled.find('.yh-date-picker__panel').exists()).toBe(false)

    const readonly = mount(DatePicker, { props: { readonly: true } })
    await readonly.trigger('click')
    expect(readonly.find('.yh-date-picker__panel').exists()).toBe(false)

    const panelOnly = mount(DatePicker, { props: { panelOnly: true } })
    expect(panelOnly.find('.yh-date-picker__panel').exists()).toBe(true)
    expect(panelOnly.classes()).toContain('is-panel-only')
  })

  it('covers header navigation, footer, outside click and teleport positioning', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'daterange',
        modelValue: [new Date(2024, 0, 1), new Date(2024, 0, 2)],
        defaultValue: [new Date(2023, 6, 1), null],
        teleported: true,
        popperClass: 'custom-popper'
      },
      attachTo: document.body
    })

    await wrapper.trigger('click')
    await nextTick()
    expect(document.body.querySelector('.custom-popper')).toBeTruthy()

    const headerLabel = document.body.querySelector('.yh-date-picker__header-label') as HTMLElement
    headerLabel.click()
    await nextTick()
    expect(document.body.querySelector('.yh-date-picker__table--month')).toBeTruthy()
    headerLabel.click()
    await nextTick()
    expect(document.body.querySelector('.yh-date-picker__table--year')).toBeTruthy()
    ;(document.body.querySelector('.yh-date-picker__footer-btn') as HTMLElement).click()
    await nextTick()
    expect(document.body.querySelector('.custom-popper')).toBeFalsy()

    await wrapper.trigger('click')
    await nextTick()
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('.custom-popper')).toBeFalsy()
    wrapper.unmount()
  })

  it('updates currentView and innerDate when type changes', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'date',
        panelOnly: true
      }
    })
    expect(wrapper.findComponent(DateTable).exists()).toBe(true)

    await wrapper.setProps({ type: 'month' })
    await nextTick()
    expect(wrapper.findComponent(MonthTable).exists()).toBe(true)

    await wrapper.setProps({ type: 'year' })
    await nextTick()
    expect(wrapper.findComponent(YearTable).exists()).toBe(true)
  })

  it('updates innerDate when modelValue changes', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'date',
        panelOnly: true,
        modelValue: new Date(2024, 0, 1)
      }
    })
    await wrapper.setProps({ modelValue: new Date(2025, 4, 1) })
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.innerDate.getFullYear()).toBe(2025)
    expect(vm.innerDate.getMonth()).toBe(4)
  })

  it('emits focus, blur, and visible-change events', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'date',
        teleported: false
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('visible-change')?.[1]).toEqual([false])
  })

  it('emits panel-change when currentView or innerDate changes', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        type: 'date',
        panelOnly: true
      }
    })

    const vm = wrapper.vm as any
    vm.currentView = 'month'
    await nextTick()
    expect(wrapper.emitted('panel-change')).toBeTruthy()
    const lastEmit = wrapper.emitted('panel-change')?.slice(-1)[0]
    expect(lastEmit?.[1]).toBe('month')
  })
})
