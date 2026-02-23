/**
 * Input Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Input from '../src/input.vue'
import { YhInput } from '../index'
import { inputTypes, inputSizes, inputVariants, inputStatuses } from '../src/input'

describe('YhInput', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Input)
    expect(wrapper.classes()).toContain('yh-input')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // v-model 测试
  it('should work with v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })
    expect(wrapper.find('input').element.value).toBe('test')

    await wrapper.find('input').setValue('new value')
    expect(wrapper.props('modelValue')).toBe('new value')
  })

  // placeholder 测试
  it('should display placeholder', () => {
    const wrapper = mount(Input, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入内容')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // 只读状态测试
  it('should be readonly when readonly prop is true', () => {
    const wrapper = mount(Input, {
      props: { readonly: true }
    })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  // 尺寸测试
  it('should apply size class', () => {
    const wrapper = mount(Input, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('yh-input--large')
  })

  // 可清空测试
  it('should show clear button when clearable', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    // 模拟聚焦以显示清除按钮
    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-input__clear').exists()).toBe(true)
  })

  // 密码切换测试
  it('should toggle password visibility', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'password',
        modelValue: 'password123',
        showPassword: true
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')

    await wrapper.find('.yh-input__password').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('should export valid constants', () => {
    expect(inputTypes).toBeTruthy()
    expect(inputSizes).toBeTruthy()
    expect(inputVariants).toBeTruthy()
    expect(inputStatuses).toBeTruthy()
  })
  // 字数统计测试
  it('should show word limit count', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        maxlength: 10,
        showWordLimit: true
      }
    })

    expect(wrapper.find('.yh-input__count').exists()).toBe(true)
    expect(wrapper.find('.yh-input__count').text()).toBe('5 / 10')
  })

  // 文本域测试
  it('should render textarea when type is textarea', () => {
    const wrapper = mount(Input, {
      props: { type: 'textarea' }
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
  })

  // 事件测试
  it('should emit focus and blur events', async () => {
    const wrapper = mount(Input)

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // 前后置插槽测试
  it('should render prepend and append slots', () => {
    const wrapper = mount(Input, {
      slots: {
        prepend: '<span>http://</span>',
        append: '<span>.com</span>'
      }
    })

    expect(wrapper.find('.yh-input__prepend').exists()).toBe(true)
    expect(wrapper.find('.yh-input__append').exists()).toBe(true)
  })
})
