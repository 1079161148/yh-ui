import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DatePicker from '../src/date-picker.vue'
import dayjs from 'dayjs'

// Mock useNamespace
vi.mock('@yh-ui/hooks', () => ({
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
  useId: () => 'test-id'
}))

// Mock useConfig
vi.mock('../../hooks/use-config', () => ({
  useConfig: () => ({
    globalSize: ref('default')
  })
}))

describe('YhDatePicker', () => {
  beforeEach(() => {
    // 模拟 getBoundingClientRect
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

  describe('基础渲染', () => {
    it('应该正确渲染基础组件', () => {
      const wrapper = mount(DatePicker)
      expect(wrapper.find('.yh-date-picker').exists()).toBe(true)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('应该支持不同尺寸', () => {
      const wrapperLarge = mount(DatePicker, { props: { size: 'large' } })
      expect(wrapperLarge.find('.yh-date-picker').classes()).toContain('yh-date-picker--large')

      const wrapperSmall = mount(DatePicker, { props: { size: 'small' } })
      expect(wrapperSmall.find('.yh-date-picker').classes()).toContain('yh-date-picker--small')
    })

    it('应该支持禁用状态', () => {
      const wrapper = mount(DatePicker, { props: { disabled: true } })
      expect(wrapper.find('.yh-date-picker').classes()).toContain('is-disabled')
    })
  })

  describe('交互逻辑', () => {
    it('应该能够打开/关闭面板', async () => {
      const wrapper = mount(DatePicker, { props: { teleported: false } })
      await wrapper.trigger('click')
      await nextTick()
      expect(wrapper.find('.yh-date-picker__panel').attributes('style')).not.toContain(
        'display: none'
      )
    })

    it('单选日期应该更新值并关闭面板', async () => {
      const value = ref(null)
      const wrapper = mount(DatePicker, {
        props: {
          modelValue: value.value,
          'onUpdate:modelValue': (val: any) => (value.value = val),
          teleported: false
        }
      })

      await wrapper.trigger('click')
      await nextTick()

      const cell = wrapper.find('.yh-date-picker__cell.is-current-month')
      await cell.trigger('click')

      expect(value.value).not.toBeNull()
      await nextTick()
      // 面板应该被设为不可见
      expect(wrapper.find('.yh-date-picker__panel').exists()).toBe(false)
    })

    it('应该支持清空功能', async () => {
      const value = ref(new Date())
      const wrapper = mount(DatePicker, {
        props: {
          modelValue: value.value,
          clearable: true,
          'onUpdate:modelValue': (val: any) => (value.value = val)
        }
      })

      await wrapper.trigger('mouseenter')
      await nextTick()

      const clearBtn = wrapper.find('.yh-date-picker__clear')
      await clearBtn.trigger('click')

      expect(value.value).toBeNull()
    })
  })

  describe('周期导航', () => {
    it('应该支持月份切换', async () => {
      const wrapper = mount(DatePicker, { props: { teleported: false } })
      await wrapper.trigger('click')
      await nextTick()

      const initialHeader = wrapper.find('.yh-date-picker__header-label').text()
      const nextBtn = wrapper.findAll('.yh-date-picker__header-btns')[3] // 后一月

      await nextBtn.trigger('click')
      await nextTick()

      expect(wrapper.find('.yh-date-picker__header-label').text()).not.toBe(initialHeader)
    })
  })

  describe('高级特性', () => {
    it('应该支持 presets 快捷项', async () => {
      const presets = [{ label: '测试项', value: new Date() }]
      const wrapper = mount(DatePicker, { props: { presets, teleported: false } })

      await wrapper.trigger('click')
      await nextTick()

      const presetBtn = wrapper.find('.yh-date-picker__presets button')
      expect(presetBtn.text()).toBe('测试项')
    })

    it('范围模式的基本渲染', () => {
      const wrapper = mount(DatePicker, { props: { type: 'daterange' } })
      expect(wrapper.findAll('.yh-date-picker__range-input').length).toBe(2)
    })
  })
})
