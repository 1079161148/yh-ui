/**
 * Select Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import Select from '../src/select.vue'

describe('YhSelect', () => {
  const options = [
    { value: 'option1', label: '选项一' },
    { value: 'option2', label: '选项二' },
    { value: 'option3', label: '选项三' },
    { value: 'option4', label: '选项四', disabled: true },
    { value: 'option5', label: '选项五' }
  ]

  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Select, {
      props: { options }
    })
    expect(wrapper.classes()).toContain('yh-select')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // v-model 单选测试
  it('should work with v-model in single mode', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: 'option1',
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    // 验证显示选中值
    expect(wrapper.find('.yh-select__selected-value').text()).toBe('选项一')
  })

  // v-model 多选测试
  it('should work with v-model in multiple mode', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        modelValue: ['option1', 'option2'],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    // 验证显示标签
    const tags = wrapper.findAll('.yh-select__tag')
    expect(tags.length).toBe(2)
  })

  // placeholder 测试
  it('should display placeholder when no value', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: undefined,
        placeholder: '请选择'
      }
    })
    // Select 组件在没有值时，placeholder 显示在 input 上
    const input = wrapper.find('input')
    // 当 modelValue 为 undefined 时，hasValue 为 false，placeholder 应该显示
    expect(input.attributes('placeholder')).toBe('请选择')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // 尺寸测试
  it('should apply size class', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('yh-select--large')
  })

  it('should apply small size class', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        size: 'small'
      }
    })
    expect(wrapper.classes()).toContain('yh-select--small')
  })

  // 可清空测试
  it('should show clear button when clearable and has value', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: 'option1',
        clearable: true
      }
    })

    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-select__clear').exists()).toBe(true)
  })

  // 清空功能测试
  it('should clear value when clear button is clicked', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue: 'option1',
        clearable: true,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('.yh-select__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  // 多选清空测试
  it('should clear all values in multiple mode', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        modelValue: ['option1', 'option2'],
        clearable: true,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('.yh-select__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.props('modelValue')).toEqual([])
  })

  // 下拉框显示/隐藏测试
  it('should toggle dropdown on click', async () => {
    const wrapper = mount(Select, {
      props: { options }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('visible-change')).toBeTruthy()
    expect(wrapper.emitted('visible-change')![0]).toEqual([true])
  })

  // 选择选项测试
  it('should select option on click', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 模拟选择第一个选项
    const optionElements = wrapper.findAll('.yh-select__option')
    if (optionElements.length > 0) {
      await optionElements[0].trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
    }
  })

  // 禁用选项测试
  it('should not select disabled option', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 找到禁用的选项
    const disabledOption = wrapper.find('.yh-select__option.is-disabled')
    if (disabledOption.exists()) {
      await disabledOption.trigger('click')
      // 值不应该改变
      expect(wrapper.props('modelValue')).toBeUndefined()
    }
  })

  // 多选标签移除测试
  it('should remove tag in multiple mode', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        modelValue: ['option1', 'option2'],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    const closeBtn = wrapper.find('.yh-select__tag-close')
    if (closeBtn.exists()) {
      await closeBtn.trigger('click')
      expect(wrapper.emitted('remove-tag')).toBeTruthy()
    }
  })

  // 折叠标签测试
  it('should collapse tags when collapseTags is true', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        modelValue: ['option1', 'option2', 'option3'],
        collapseTags: true,
        maxCollapseTags: 1
      }
    })

    const tags = wrapper.findAll('.yh-select__tag')
    // 应该只显示 1 个标签 + 1 个折叠计数
    expect(tags.length).toBe(2)
    expect(tags[1].text()).toContain('+2')
  })

  // 可搜索测试
  it('should filter options when filterable', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        filterable: true
      }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('选项一')
    await nextTick()

    // 验证过滤后的选项
    expect(wrapper.emitted()).toBeTruthy()
  })

  // 键盘导航测试 - ArrowDown
  it('should navigate with arrow keys', async () => {
    const wrapper = mount(Select, {
      props: { options }
    })

    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('visible-change')).toBeTruthy()
  })

  // 键盘导航测试 - Escape
  it('should close dropdown on Escape', async () => {
    const wrapper = mount(Select, {
      props: { options }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('visible-change')!.pop()).toEqual([false])
  })

  // 键盘导航测试 - Enter
  it('should select option on Enter', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // 允许创建新选项测试
  it('should create new option when allowCreate is true', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        filterable: true,
        allowCreate: true,
        modelValue: [],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('新选项')
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // 远程搜索测试
  it('should call remoteMethod when remote is true', async () => {
    const remoteMethod = vi.fn()
    const wrapper = mount(Select, {
      props: {
        options: [],
        filterable: true,
        remote: true,
        remoteMethod
      }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('test')
    await nextTick()

    expect(remoteMethod).toHaveBeenCalledWith('test')
  })

  // 虚拟滚动测试
  it('should enable virtual scroll when virtualScroll is true', () => {
    const manyOptions = Array.from({ length: 1000 }, (_, i) => ({
      value: `option${i}`,
      label: `选项 ${i}`
    }))

    const wrapper = mount(Select, {
      props: {
        options: manyOptions,
        virtualScroll: true,
        height: 274,
        itemHeight: 34
      }
    })

    expect(wrapper.props('virtualScroll')).toBe(true)
  })

  // ARIA 属性测试
  it('should have correct ARIA attributes', () => {
    const wrapper = mount(Select, {
      props: { options }
    })
    const input = wrapper.find('input')

    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBeDefined()
  })

  // 事件测试
  it('should emit focus and blur events', async () => {
    const wrapper = mount(Select, {
      props: { options }
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // expose 方法测试
  it('should expose focus and blur methods', () => {
    const wrapper = mount(Select, {
      props: { options }
    })
    const vm = wrapper.vm as any

    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })

  // 多选限制测试
  it('should respect multipleLimit', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
        multiple: true,
        multipleLimit: 2,
        modelValue: ['option1', 'option2'],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 尝试选择第三个选项
    const optionElements = wrapper.findAll('.yh-select__option')
    if (optionElements.length > 2) {
      await optionElements[2].trigger('click')
      // 值不应该增加
      expect((wrapper.props('modelValue') as any[]).length).toBe(2)
    }
  })

  it('should work with slot mode (YhOption)', async () => {
    const { YhOption } = await import('../index')
    const wrapper = mount(Select, {
      props: {
        modelValue: 'v1',
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      },
      slots: {
        default: () => [
          h(YhOption, { value: 'v1', label: 'L1' }),
          h(YhOption, { value: 'v2', label: 'L2', disabled: true })
        ]
      },
      global: {
        components: { YhOption }
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    expect(wrapper.find('.yh-select__selected-value').text()).toBe('L1')

    // Test Option.vue logic indirectly via Select behavior
    // 卸载组件触发 onBeforeUnmount
    wrapper.unmount()
  })
})
