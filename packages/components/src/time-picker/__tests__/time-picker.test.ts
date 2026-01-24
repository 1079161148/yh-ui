import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import TimePicker from '../src/time-picker.vue'

// Mock useNamespace hook
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

describe('YhTimePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // 模拟 getBoundingClientRect 避免位置计算报错
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
    it('应该正确渲染组件', () => {
      const wrapper = mount(TimePicker)
      expect(wrapper.find('.yh-time-picker').exists()).toBe(true)
      expect(wrapper.find('.yh-time-picker__wrapper').exists()).toBe(true)
    })

    it('应该显示占位文本', () => {
      const wrapper = mount(TimePicker, {
        props: {
          placeholder: '请选择时间'
        }
      })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('请选择时间')
    })

    it('应该支持 disabled 状态', () => {
      const wrapper = mount(TimePicker, {
        props: {
          disabled: true
        }
      })
      expect(wrapper.find('.yh-time-picker').classes()).toContain('is-disabled')
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })
  })

  describe('尺寸', () => {
    it('应该支持 large 尺寸', () => {
      const wrapper = mount(TimePicker, {
        props: { size: 'large' }
      })
      expect(wrapper.find('.yh-time-picker').classes()).toContain('yh-time-picker--large')
    })

    it('应该支持 small 尺寸', () => {
      const wrapper = mount(TimePicker, {
        props: { size: 'small' }
      })
      expect(wrapper.find('.yh-time-picker').classes()).toContain('yh-time-picker--small')
    })
  })

  describe('面板交互', () => {
    it('点击应该打开面板', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          teleported: false
        }
      })
      await wrapper.find('.yh-time-picker').trigger('click')
      await nextTick()
      await nextTick()
      const panel = wrapper.find('.yh-time-picker__panel')
      expect(panel.exists()).toBe(true)
      expect(panel.attributes('style')).not.toContain('display: none')
    })

    it('禁用时不应该打开面板', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          disabled: true,
          teleported: false
        }
      })
      await wrapper.find('.yh-time-picker').trigger('click')
      await nextTick()
      const panel = wrapper.find('.yh-time-picker__panel')
      if (panel.exists()) {
        expect(panel.attributes('style')).toContain('display: none')
      }
    })
  })

  describe('值绑定', () => {
    it('应该正确显示绑定的时间值', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          modelValue: '14:30:00',
          format: 'HH:mm:ss'
        }
      })
      await nextTick()
      const input = wrapper.find('input')
      expect((input.element as HTMLInputElement).value).toBe('14:30:00')
    })

    it('应该支持清空功能', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          modelValue: '14:30:00',
          clearable: true
        }
      })
      await wrapper.trigger('mouseenter')
      await nextTick()
      const clearBtn = wrapper.find('.yh-time-picker__clear')
      if (clearBtn.exists()) {
        await clearBtn.trigger('click')
        expect(wrapper.emitted('clear')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })
  })

  describe('事件', () => {
    it('应该触发 focus/blur 事件', async () => {
      const wrapper = mount(TimePicker)
      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
      await input.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('范围选择', () => {
    it('应该正确渲染范围选择模式', () => {
      const wrapper = mount(TimePicker, {
        props: {
          isRange: true
        }
      })
      expect(wrapper.find('.yh-time-picker').classes()).toContain('is-range')
      expect(wrapper.findAll('.yh-time-picker__range-input').length).toBe(2)
    })

    it('在默认严格模式下，如果结束时间早于开始时间，不应触发确认', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          isRange: true,
          teleported: false,
          modelValue: ['10:00:00', '09:00:00']
        }
      })
      await wrapper.find('.yh-time-picker').trigger('click')
      await nextTick()
      const confirmBtn = wrapper.find('.yh-time-picker__footer-btn--confirm')
      await confirmBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('当 orderOnConfirm 为 true 时，应在点击确定后自动交换时间', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          isRange: true,
          teleported: false,
          modelValue: ['10:00:00', '08:00:00'],
          orderOnConfirm: true
        }
      })
      await wrapper.find('.yh-time-picker').trigger('click')
      await nextTick()
      await wrapper.find('.yh-time-picker__footer-btn--confirm').trigger('click')
      const updateEvent = wrapper.emitted('update:modelValue')
      expect(updateEvent).toBeTruthy()
      expect(updateEvent![0][0]).toEqual(['08:00:00', '10:00:00'])
    })
  })

  describe('键盘导航', () => {
    it('Enter 键应该打开面板', async () => {
      const wrapper = mount(TimePicker, {
        props: { teleported: false }
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      await nextTick()
      const panel = wrapper.find('.yh-time-picker__panel')
      expect(panel.attributes('style')).not.toContain('display: none')
    })
  })

  describe('expose 方法', () => {
    it('应该暴露核心方法', () => {
      const wrapper = mount(TimePicker)
      expect(wrapper.vm.focus).toBeDefined()
      expect(wrapper.vm.blur).toBeDefined()
      expect(wrapper.vm.open).toBeDefined()
      expect(wrapper.vm.close).toBeDefined()
    })
  })
})
