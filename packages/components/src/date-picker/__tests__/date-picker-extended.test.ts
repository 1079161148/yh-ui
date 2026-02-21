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
      // Year selection check
    })

    it('should support quarter type', async () => {
      const wrapper = mount(DatePicker, {
        props: { type: 'quarter', panelOnly: true }
      })
      await nextTick()
      expect(wrapper.findComponent(QuarterTable).exists()).toBe(true)

      const cell = wrapper.find('.yh-date-picker__cell')
      await cell.trigger('click')
    })
  })

  describe('Range pickers', () => {
    it('should support daterange type', async () => {
      const value = ref([])
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
})
