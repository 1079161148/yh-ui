/**
 * Switch Component Unit Tests
 * @description 开关组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YhSwitch from '../src/switch.vue'

describe('YhSwitch', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })
    expect(wrapper.classes()).toContain('yh-switch')
  })

  // 默认状态测试
  it('should be unchecked by default', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  // 选中状态测试
  it('should be checked when modelValue equals activeValue', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: true }
    })
    expect(wrapper.classes()).toContain('is-checked')
  })

  // 尺寸测试 - large
  it('should apply large size class', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, size: 'large' }
    })
    expect(wrapper.classes()).toContain('yh-switch--large')
  })

  // 尺寸测试 - small
  it('should apply small size class', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, size: 'small' }
    })
    expect(wrapper.classes()).toContain('yh-switch--small')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 加载状态测试
  it('should show loading state', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, loading: true }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.yh-switch__loading-icon').exists()).toBe(true)
  })

  // 点击切换测试
  it('should toggle value on click', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  // 禁用状态不触发切换
  it('should not toggle when disabled', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, disabled: true }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 加载状态不触发切换
  it('should not toggle when loading', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, loading: true }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // change 事件测试
  it('should emit change event', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  // 自定义 activeValue/inactiveValue 测试 - 字符串
  it('should work with custom string active/inactive values', async () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: '0',
        activeValue: '1',
        inactiveValue: '0'
      }
    })

    expect(wrapper.classes()).not.toContain('is-checked')

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['1'])
  })

  // 数字类型 value 测试
  it('should work with number type values', async () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: 0,
        activeValue: 100,
        inactiveValue: 0
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([100])
  })

  // 从 on 切换到 off
  it('should toggle from on to off', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: true }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  // beforeChange 返回 true 时切换
  it('should toggle when beforeChange returns true', async () => {
    const beforeChange = () => true
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, beforeChange }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // beforeChange 返回 false 时不切换
  it('should not toggle when beforeChange returns false', async () => {
    const beforeChange = () => false
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, beforeChange }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 文字描述测试 - 外部显示
  it('should show active/inactive text externally', () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeText: '开',
        inactiveText: '关'
      }
    })

    expect(wrapper.text()).toContain('开')
    expect(wrapper.text()).toContain('关')
  })

  // 文字描述测试 - 内嵌显示
  it('should show inner element when inlinePrompt is true', () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeText: '开',
        inlinePrompt: true
      }
    })

    const inner = wrapper.find('.yh-switch__inner')
    expect(inner.exists()).toBe(true)
  })

  // 自定义宽度测试
  it('should apply custom width', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, width: 60 }
    })

    const core = wrapper.find('.yh-switch__core')
    expect(core.attributes('style')).toContain('60px')
  })

  // input name 属性测试
  it('should set input name attribute', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, name: 'test-switch' }
    })

    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('test-switch')
  })

  // id 属性测试
  it('should set input id attribute', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false, id: 'my-switch' }
    })

    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('my-switch')
  })

  // role 属性测试
  it('should have switch role', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })
    expect(wrapper.attributes('role')).toBe('switch')
  })

  // aria-checked 测试
  it('should set aria-checked correctly', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })

    expect(wrapper.attributes('aria-checked')).toBe('false')

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.attributes('aria-checked')).toBe('true')
  })

  // expose focus 方法测试
  it('should expose focus method', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })
    expect(typeof wrapper.vm.focus).toBe('function')
  })

  // expose checked 属性测试
  it('should expose checked computed ref', () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: true }
    })
    expect(wrapper.vm.checked).toBe(true)
  })
})
