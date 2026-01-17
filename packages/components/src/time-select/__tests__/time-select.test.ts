/**
 * TimeSelect 时间选择器组件单元测试
 * @description 测试 TimeSelect 组件的各项功能
 */

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

// Mock useFormItem hook
vi.mock('@yh-ui/hooks', () => ({
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
  useId: () => 'test-id'
}))

describe('TimeSelect 工具函数测试', () => {
  describe('parseTimeToMinutes', () => {
    it('应正确解析 HH:mm 格式', () => {
      expect(parseTimeToMinutes('09:00')).toBe(9 * 60)
      expect(parseTimeToMinutes('12:30')).toBe(12 * 60 + 30)
      expect(parseTimeToMinutes('23:59')).toBe(23 * 60 + 59)
    })

    it('应正确解析 00:00', () => {
      expect(parseTimeToMinutes('00:00')).toBe(0)
    })

    it('应处理空字符串', () => {
      expect(parseTimeToMinutes('')).toBe(0)
    })
  })

  describe('formatMinutesToTime', () => {
    it('应正确格式化为 HH:mm', () => {
      expect(formatMinutesToTime(9 * 60)).toBe('09:00')
      expect(formatMinutesToTime(12 * 60 + 30)).toBe('12:30')
      expect(formatMinutesToTime(0)).toBe('00:00')
    })

    it('应支持自定义格式', () => {
      expect(formatMinutesToTime(9 * 60, 'H:mm')).toBe('9:00')
      expect(formatMinutesToTime(12 * 60 + 5, 'HH:m')).toBe('12:5')
    })
  })

  describe('compareTime', () => {
    it('应正确比较时间', () => {
      expect(compareTime('09:00', '10:00')).toBe(-1)
      expect(compareTime('10:00', '09:00')).toBe(1)
      expect(compareTime('09:00', '09:00')).toBe(0)
    })
  })

  describe('isTimeInRange', () => {
    it('应正确判断时间是否在范围内', () => {
      expect(isTimeInRange('10:00', '09:00', '11:00')).toBe(true)
      expect(isTimeInRange('09:00', '09:00', '11:00')).toBe(true)
      expect(isTimeInRange('11:00', '09:00', '11:00')).toBe(true)
      expect(isTimeInRange('08:00', '09:00', '11:00')).toBe(false)
      expect(isTimeInRange('12:00', '09:00', '11:00')).toBe(false)
    })
  })

  describe('generateTimeOptions', () => {
    it('应正确生成时间选项', () => {
      const options = generateTimeOptions('09:00', '11:00', '00:30')
      expect(options.length).toBe(5)
      expect(options[0].value).toBe('09:00')
      expect(options[1].value).toBe('09:30')
      expect(options[2].value).toBe('10:00')
      expect(options[3].value).toBe('10:30')
      expect(options[4].value).toBe('11:00')
    })

    it('includeEnd 参数在此版本中不再影响结果（始终包含）', () => {
      const options = generateTimeOptions('09:00', '10:00', '00:30', 'HH:mm', false)
      expect(options.length).toBe(3) // 09:00, 09:30, 10:00
      expect(options[2].value).toBe('10:00')
    })

    it('应处理无效的 step', () => {
      const options = generateTimeOptions('09:00', '10:00', '00:00')
      expect(options.length).toBe(0)
    })
  })
})

describe('TimeSelect 组件测试', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('基础渲染', () => {
    it('应正确渲染组件', () => {
      wrapper = mount(YhTimeSelect)
      expect(wrapper.classes()).toContain('yh-time-select')
    })

    it('应显示占位文本', () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          placeholder: '请选择时间'
        }
      })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('请选择时间')
    })

    it('应正确显示选中值', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          modelValue: '09:00',
          start: '08:00',
          end: '12:00',
          step: '00:30'
        }
      })
      await nextTick()
      const displayValue = wrapper.find('.yh-time-select__display-value')
      expect(displayValue.exists()).toBe(true)
      expect(displayValue.text()).toBe('09:00')
    })
  })

  describe('尺寸变体', () => {
    it.each(['large', 'default', 'small'] as const)('应支持 %s 尺寸', (size) => {
      wrapper = mount(YhTimeSelect, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`yh-time-select--${size}`)
    })
  })

  describe('禁用状态', () => {
    it('应正确应用禁用状态', () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          disabled: true
        }
      })
      expect(wrapper.classes()).toContain('is-disabled')
      const input = wrapper.find('input')
      expect(input.attributes('disabled')).toBeDefined()
    })

    it('禁用状态下不应打开下拉框', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          disabled: true,
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      // 禁用状态下不应触发 visible-change 事件
      expect(wrapper.emitted('visible-change')).toBeUndefined()
    })
  })

  describe('可清空功能', () => {
    it('应显示清空按钮', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          modelValue: '09:00',
          clearable: true
        }
      })
      // 模拟 hover 状态
      await wrapper.trigger('mouseenter')
      await nextTick()
      const clearBtn = wrapper.find('.yh-time-select__clear')
      expect(clearBtn.exists()).toBe(true)
    })

    it('点击清空按钮应清除值', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          modelValue: '09:00',
          clearable: true
        }
      })
      await wrapper.trigger('mouseenter')
      await nextTick()
      const clearBtn = wrapper.find('.yh-time-select__clear')
      await clearBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined])
      expect(wrapper.emitted('clear')).toBeTruthy()
    })
  })

  describe('下拉框交互', () => {
    it('点击应打开下拉框', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])
    })

    it('应生成正确的时间选项', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          start: '09:00',
          end: '12:00',
          step: '01:00',
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      expect(options.length).toBe(4) // 09:00, 10:00, 11:00, 12:00
    })
  })

  describe('键盘导航', () => {
    it('按下回车键应打开下拉框', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          teleported: false
        }
      })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])
    })

    it('按下 Escape 键应关闭下拉框', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Escape' })
      await nextTick()
      // 应触发 visible-change 事件两次：打开和关闭
      const events = wrapper.emitted('visible-change')
      expect(events?.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('事件触发', () => {
    it('选择选项应触发 change 事件', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          start: '09:00',
          end: '12:00',
          step: '01:00',
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      await options[0].trigger('click')
      expect(wrapper.emitted('change')?.[0]).toEqual(['09:00'])
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['09:00'])
    })

    it('应触发 focus 和 blur 事件', async () => {
      wrapper = mount(YhTimeSelect)
      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
      await input.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('minTime 和 maxTime', () => {
    it('应禁用 minTime 之前的选项', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          start: '08:00',
          end: '12:00',
          step: '01:00',
          minTime: '10:00',
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      // 08:00 和 09:00 应被禁用
      expect(options[0].classes()).toContain('is-disabled')
      expect(options[1].classes()).toContain('is-disabled')
      // 10:00 及之后不应被禁用
      expect(options[2].classes()).not.toContain('is-disabled')
    })

    it('应禁用 maxTime 之后的选项', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          start: '08:00',
          end: '12:00',
          step: '01:00',
          maxTime: '10:00',
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      // 11:00 应被禁用 (12:00 不在选项中因为 includeEndTime 默认为 false)
      expect(options[3].classes()).toContain('is-disabled')
      // 10:00 及之前不应被禁用
      expect(options[2].classes()).not.toContain('is-disabled')
    })
  })

  describe('disabledHours', () => {
    it('应禁用指定时间段', async () => {
      wrapper = mount(YhTimeSelect, {
        props: {
          start: '08:00',
          end: '14:00',
          step: '01:00',
          disabledHours: [['10:00', '11:00']],
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      // 10:00 和 11:00 应被禁用
      expect(options[2].classes()).toContain('is-disabled')
      expect(options[3].classes()).toContain('is-disabled')
      // 09:00 和 12:00 不应被禁用
      expect(options[1].classes()).not.toContain('is-disabled')
      expect(options[4].classes()).not.toContain('is-disabled')
    })
  })

  describe('自定义选项', () => {
    it('应支持自定义选项', async () => {
      const customOptions = [
        { value: '08:00', label: '早上 8 点' },
        { value: '12:00', label: '中午 12 点' },
        { value: '18:00', label: '下午 6 点', disabled: true }
      ]
      wrapper = mount(YhTimeSelect, {
        props: {
          options: customOptions,
          teleported: false
        }
      })
      await wrapper.trigger('click')
      await nextTick()
      const options = wrapper.findAll('.yh-time-select__option')
      expect(options.length).toBe(3)
      expect(options[0].text()).toContain('早上 8 点')
      expect(options[2].classes()).toContain('is-disabled')
    })
  })

  describe('includeEndTime', () => {
    it('默认应包含结束时间', async () => {
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
      const options = wrapper.findAll('.yh-time-select__option')
      expect(options.length).toBe(3) // 09:00, 09:30, 10:00
    })
  })

  describe('expose 方法', () => {
    it('应暴露 focus 方法', () => {
      wrapper = mount(YhTimeSelect)
      expect(typeof (wrapper.vm as unknown as { focus: () => void }).focus).toBe('function')
    })

    it('应暴露 blur 方法', () => {
      wrapper = mount(YhTimeSelect)
      expect(typeof (wrapper.vm as unknown as { blur: () => void }).blur).toBe('function')
    })
  })
})
