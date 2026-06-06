import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DatePicker from '../src/date-picker.vue'
import MonthTable from '../src/month-table.vue'
import YearTable from '../src/year-table.vue'
import QuarterTable from '../src/quarter-table.vue'
import DateTable from '../src/date-table.vue'
import dayjs from 'dayjs'

import { zhCn } from '@yh-ui/locale'

// Mock hooks
vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => {
      const b = (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`)
      return {
        b,
        e: (element: string) => `${b()}__${element}`,
        m: (modifier: string) => `${b()}--${modifier}`,
        em: (element: string, modifier: string) => `${b()}__${element}--${modifier}`,
        is: (state: string, value?: boolean) => {
          if (value === undefined) return `is-${state}`
          return value ? `is-${state}` : ''
        }
      }
    },
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

describe('YhDatePicker Extended', () => {
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

  describe('Other picker types', () => {
    it('should support month type', async () => {
      const value = ref(null)
      const wrapper = mount(DatePicker, {
        props: {
          type: 'month',
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val),
          panelOnly: true
        }
      })
      await nextTick()
      expect(wrapper.findComponent(MonthTable).exists()).toBe(true)

      const cell = wrapper.find('.yh-date-picker__cell')
      await cell.trigger('click')
      expect(value.value).not.toBeNull()
    })

    it('should support year type', async () => {
      const wrapper = mount(DatePicker, {
        props: { type: 'year', panelOnly: true }
      })
      await nextTick()
      expect(wrapper.findComponent(YearTable).exists()).toBe(true)

      const cell = wrapper.find('.yh-date-picker__cell')
      await cell.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('should support quarter type', async () => {
      const value = ref(null)
      const wrapper = mount(DatePicker, {
        props: {
          type: 'quarter',
          panelOnly: true,
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val)
        }
      })
      await nextTick()
      expect(wrapper.findComponent(QuarterTable).exists()).toBe(true)

      const cell = wrapper.find('.yh-date-picker__cell')
      await cell.trigger('click')
      expect(value.value).not.toBeNull()
    })
  })

  describe('Range pickers', () => {
    it('should support daterange type', async () => {
      const value = ref<[any, any]>([null, null])
      const wrapper = mount(DatePicker, {
        props: {
          type: 'daterange',
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val),
          panelOnly: true
        }
      })
      await nextTick()

      const cells = wrapper.findAll('.yh-date-picker__cell.is-current-month')
      await cells[10].trigger('click')
      await nextTick()
      await cells[20].trigger('click')
      await nextTick()

      expect(value.value.length).toBe(2)
    })

    it('should support monthrange type', async () => {
      const wrapper = mount(DatePicker, {
        props: { type: 'monthrange', panelOnly: true }
      })
      await nextTick()
      expect(wrapper.findComponent(MonthTable).exists()).toBe(true)
    })
  })

  describe('Navigation & View Switching', () => {
    it('should switch between views', async () => {
      const wrapper = mount(DatePicker, { props: { panelOnly: true } })
      await nextTick()

      expect(wrapper.findComponent(DateTable).exists()).toBe(true)

      // Click header to switch to month view
      await wrapper.find('.yh-date-picker__header-label').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(MonthTable).exists()).toBe(true)

      // Click header to switch to year view
      await wrapper.find('.yh-date-picker__header-label').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(YearTable).exists()).toBe(true)
    })
  })

  describe('DateTable extra coverage', () => {
    it('should support week selection mode', async () => {
      const value = ref(null)
      const wrapper = mount(DatePicker, {
        props: {
          type: 'week',
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val),
          panelOnly: true
        }
      })
      await nextTick()
      const cell = wrapper.find('.yh-date-picker__cell.is-current-month')
      await cell.trigger('click')
      expect(value.value).not.toBeNull()
      // Should be first day of week
    })

    it('should support cellRender prop', async () => {
      const cellRender = (date: Date) => {
        return { text: 'custom', className: 'custom-cell-class' }
      }
      const wrapper = mount(DatePicker, {
        props: { cellRender, panelOnly: true }
      })
      await nextTick()
      expect(wrapper.find('.custom-cell-class').exists()).toBe(true)
      expect(wrapper.find('.custom-cell-class').text()).toBe('custom')
    })

    it('should handle range selection hovering', async () => {
      const value = ref<any>(null)
      const wrapper = mount(DatePicker, {
        props: {
          type: 'daterange',
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => {
            value.value = val
            wrapper.setProps({ modelValue: val })
          },
          panelOnly: true
        }
      })
      await nextTick()
      const cells = wrapper.findAll('.yh-date-picker__cell.is-current-month')

      // Click first date
      await cells[10].trigger('click')
      await nextTick()

      // Hover over another date
      await cells[15].trigger('mouseenter')
      await nextTick()
      expect(wrapper.find('.is-in-range').exists()).toBe(true)

      // Mouse leave table
      await wrapper.find('.yh-date-picker__table').trigger('mouseleave')
      await nextTick()
      expect(wrapper.find('.is-in-range').exists()).toBe(false)
    })
  })

  describe('Footer & Presets', () => {
    it('should handle presets', async () => {
      const presets = [{ label: 'Today', value: new Date() }]
      const wrapper = mount(DatePicker, {
        props: { presets, panelOnly: true }
      })
      await nextTick()
      const presetBtn = wrapper.find('.yh-date-picker__preset-item')
      await presetBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('should support datetime type', async () => {
      const wrapper = mount(DatePicker, {
        props: { type: 'datetime', panelOnly: true }
      })
      await nextTick()
      expect(wrapper.find('.yh-date-picker__footer').exists()).toBe(true)
    })

    it('should handle footer confirm button', async () => {
      const onConfirm = vi.fn()
      const wrapper = mount(DatePicker, {
        props: { type: 'daterange', onConfirm, panelOnly: true }
      })
      await nextTick()
      const confirmBtn = wrapper.find('.yh-date-picker__footer-btn--confirm')
      await confirmBtn.trigger('click')
      expect(onConfirm).toHaveBeenCalled()
    })
  })

  describe('Navigation & Miscellaneous', () => {
    it('should handle navigation buttons', async () => {
      const wrapper = mount(DatePicker, { props: { panelOnly: true } })
      await nextTick()

      // Find specific buttons by their icon names or classes
      const prevYearBtn = wrapper.find('.yh-date-picker__header-btns--double-left')
      const nextYearBtn = wrapper.find('.yh-date-picker__header-btns--double-right')
      const prevMonthBtn = wrapper.find('.yh-date-picker__header-btns--left')
      const nextMonthBtn = wrapper.find('.yh-date-picker__header-btns--right')

      if (prevYearBtn.exists()) await prevYearBtn.trigger('click')
      if (nextYearBtn.exists()) await nextYearBtn.trigger('click')
      if (prevMonthBtn.exists()) await prevMonthBtn.trigger('click')
      if (nextMonthBtn.exists()) await nextMonthBtn.trigger('click')

      expect(wrapper.findComponent(DateTable).exists()).toBe(true)
    })

    it('should handle clear action', async () => {
      const onUpdateModelValue = vi.fn()
      const value = new Date()
      const wrapper = mount(DatePicker, {
        props: {
          modelValue: value,
          clearable: true,
          'onUpdate:modelValue': (val: any) => onUpdateModelValue(val)
        }
      })
      await nextTick()
      const clearBtn = wrapper.find('.yh-date-picker__clear')
      if (clearBtn.exists()) {
        await clearBtn.trigger('click')
        expect(onUpdateModelValue).toHaveBeenCalledWith(null)
      }
    })

    it('should handle disabled dates', async () => {
      const disabledDate = (date: Date) => date.getTime() < Date.now()
      const wrapper = mount(DatePicker, {
        props: { disabledDate, panelOnly: true }
      })
      await nextTick()
      expect(wrapper.find('.is-disabled').exists()).toBe(true)
    })

    it('should support firstDayOfWeek prop', async () => {
      const wrapper = mount(DatePicker, {
        props: { firstDayOfWeek: 1, panelOnly: true }
      })
      await nextTick()
      const header = wrapper.findAll('.yh-date-picker__table th')
      expect(header[0].text()).toBe('datepicker.weeks.mon')
    })

    it('should handle reverse range selection', async () => {
      const value = ref<[any, any]>([null, null])
      const wrapper = mount(DatePicker, {
        props: {
          type: 'daterange',
          orderOnConfirm: true,
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val),
          panelOnly: true
        }
      })
      await nextTick()

      const cells = wrapper.findAll('.yh-date-picker__cell.is-current-month')
      // Select later date first
      await cells[20].trigger('click')
      await nextTick()

      // Update prop to reflect selection
      await wrapper.setProps({ modelValue: value.value })
      await nextTick()

      // Select earlier date second
      await cells[10].trigger('click')
      await nextTick()

      // Should auto sort
      expect(dayjs(value.value[0]).isBefore(value.value[1])).toBe(true)
    })

    it('should handle reverse range selection without orderOnConfirm', async () => {
      const value = ref<[any, any]>([null, null])
      const wrapper = mount(DatePicker, {
        props: {
          type: 'daterange',
          orderOnConfirm: false,
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => {
            value.value = val
            wrapper.setProps({ modelValue: val })
          },
          panelOnly: true
        }
      })
      await nextTick()

      const cells = wrapper.findAll('.yh-date-picker__cell.is-current-month')
      // Select later date first
      await cells[20].trigger('click')
      await nextTick()
      // Select earlier date second
      await cells[10].trigger('click')
      await nextTick()

      // Should reset start date and nullify end date
      expect(value.value[1]).toBeNull()
    })
  })

  describe('View Drilling', () => {
    it('should drill down from year to date view', async () => {
      const wrapper = mount(DatePicker, { props: { type: 'date', panelOnly: true } })
      await nextTick()

      // Go to year view
      await wrapper.find('.yh-date-picker__header-label').trigger('click')
      await nextTick()
      await wrapper.find('.yh-date-picker__header-label').trigger('click')
      await nextTick()

      // Select a year
      await wrapper.find('.yh-date-picker__cell').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(MonthTable).exists()).toBe(true)

      // Select a month
      await wrapper.find('.yh-date-picker__cell').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(DateTable).exists()).toBe(true)
    })
  })

  describe('Selected states in tables', () => {
    it('should show selected state in month/year/quarter tables', async () => {
      const date = new Date(2024, 5, 15) // June 2024

      const monthWrapper = mount(MonthTable, { props: { date, selectedDate: date } })
      expect(monthWrapper.find('.is-selected').exists()).toBe(true)

      const yearWrapper = mount(YearTable, { props: { date, selectedDate: date } })
      expect(yearWrapper.find('.is-selected').exists()).toBe(true)

      const quarterWrapper = mount(QuarterTable, { props: { date, selectedDate: date } })
      expect(quarterWrapper.find('.is-selected').exists()).toBe(true)
    })

    it('should show range states in month/year tables', async () => {
      const from = new Date(2024, 0, 1)
      const to = new Date(2024, 11, 31)
      const date = new Date(2024, 5, 1)
      const rangeState = { from, to, hovering: null }

      const monthWrapper = mount(MonthTable, { props: { date, rangeState } })
      expect(monthWrapper.findAll('.is-in-range').length).toBeGreaterThan(0)

      const yearWrapper = mount(YearTable, { props: { date, rangeState } })
      expect(yearWrapper.find('.is-range-start').exists()).toBe(true)
    })
  })

  describe('Component Props & UI', () => {
    it('should handle status prop', () => {
      const wrapper = mount(DatePicker, { props: { status: 'error' } })
      expect(wrapper.classes()).toContain('yh-date-picker--error')
    })

    it('should respect disabled and readonly props', async () => {
      const wrapper = mount(DatePicker, { props: { disabled: true } })
      await wrapper.trigger('click')
      expect(wrapper.find('.yh-date-picker__panel').exists()).toBe(false)

      const wrapper2 = mount(DatePicker, { props: { readonly: true } })
      await wrapper2.trigger('click')
      expect(wrapper2.find('.yh-date-picker__panel').exists()).toBe(false)
    })

    it('should render custom icons', async () => {
      const wrapper = mount(DatePicker, {
        props: { prefixIcon: 'calendar', clearIcon: 'close', modelValue: new Date() }
      })
      await wrapper.trigger('mouseenter')
      await nextTick()
      expect(wrapper.find('.yh-date-picker__icon').exists()).toBe(true)
      expect(wrapper.find('.yh-date-picker__clear').exists()).toBe(true)
    })

    it('should handle valueFormat', async () => {
      let emittedValue: any = null
      const wrapper = mount(DatePicker, {
        props: {
          type: 'date',
          valueFormat: 'YYYY/MM/DD',
          'onUpdate:modelValue': (val: any) => (emittedValue = val)
        }
      })
      await nextTick()
      const vm = wrapper.vm as any
      vm.handleSelect(new Date(2024, 0, 1))
      await nextTick()
      expect(emittedValue).toBe('2024/01/01')
    })
  })

  describe('Outside interactions', () => {
    it('should close on outside click', async () => {
      const wrapper = mount(DatePicker, { props: { teleported: false } })
      const vm = wrapper.vm as any
      vm.visible = true
      await nextTick()

      // Simulate outside click
      const event = new MouseEvent('click', { bubbles: true })
      document.dispatchEvent(event)
      await nextTick()
      expect(vm.visible).toBe(false)
    })

    it('should handle position update when opened', async () => {
      const wrapper = mount(DatePicker, { props: { teleported: true } })
      const vm = wrapper.vm as any
      vm.visible = true
      await nextTick()
      // updatePosition should have been called
      expect(vm.dropdownStyle).toBeDefined()
    })
  })

  describe('Pre-selected states and input display', () => {
    it('should show pre-selected week', async () => {
      const date = new Date(2024, 5, 15)
      const wrapper = mount(DatePicker, {
        props: { type: 'week', modelValue: date, panelOnly: true }
      })
      await nextTick()
      expect(wrapper.find('.is-selected').exists()).toBe(true)
    })

    it('should show pre-selected range in date/month/quarter tables', async () => {
      const from = new Date(2024, 0, 1) // Jan 1st 2024
      const to = new Date(2024, 6, 1) // Jul 1st 2024
      const modelValue: any = [from, to]

      const dateWrapper = mount(DatePicker, {
        props: { type: 'daterange', modelValue, panelOnly: true }
      })
      await nextTick()
      expect(dateWrapper.findAll('.is-in-range').length).toBeGreaterThan(0)

      const monthWrapper = mount(DatePicker, {
        props: { type: 'monthrange', modelValue, panelOnly: true }
      })
      await nextTick()
      expect(monthWrapper.findAll('.is-in-range').length).toBeGreaterThan(0)

      const quarterWrapper = mount(DatePicker, {
        props: { type: 'quarterrange', modelValue, panelOnly: true }
      })
      await nextTick()
      expect(quarterWrapper.findAll('.is-in-range').length).toBeGreaterThan(0)
    })

    it('should display formatted range in inputs', async () => {
      const from = new Date(2024, 0, 1)
      const to = new Date(2024, 0, 2)
      const wrapper = mount(DatePicker, {
        props: { type: 'daterange', modelValue: [from, to] }
      })
      await nextTick()
      const inputs = wrapper.findAll('.yh-date-picker__range-input')
      expect(inputs[0].element.getAttribute('value')).toBe('2024-01-01')
      expect(inputs[1].element.getAttribute('value')).toBe('2024-01-02')
    })
  })
})
