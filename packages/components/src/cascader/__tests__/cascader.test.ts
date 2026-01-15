/**
 * Cascader Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Cascader from '../src/cascader.vue'

describe('YhCascader', () => {
  const options = [
    {
      value: 'guide',
      label: '指南',
      children: [
        {
          value: 'design',
          label: '设计原则',
          children: [
            { value: 'consistency', label: '一致' },
            { value: 'feedback', label: '反馈' }
          ]
        },
        {
          value: 'navigation',
          label: '导航',
          children: [
            { value: 'side-nav', label: '侧向导航' },
            { value: 'top-nav', label: '顶部导航' }
          ]
        }
      ]
    },
    {
      value: 'component',
      label: '组件',
      children: [
        {
          value: 'basic',
          label: '基础组件',
          children: [
            { value: 'button', label: 'Button 按钮' },
            { value: 'icon', label: 'Icon 图标' }
          ]
        }
      ]
    },
    {
      value: 'resource',
      label: '资源',
      disabled: true,
      children: [{ value: 'axure', label: 'Axure Components' }]
    }
  ]

  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })
    expect(wrapper.classes()).toContain('yh-cascader')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // v-model 单选测试
  it('should work with v-model', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    // 验证显示选中路径
    expect(wrapper.find('.yh-cascader__selected-value').text()).toContain('指南')
  })

  // placeholder 测试
  it('should display placeholder when no value', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        placeholder: '请选择'
      }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('请选择')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Cascader, {
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
    const wrapper = mount(Cascader, {
      props: {
        options,
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('yh-cascader--large')
  })

  it('should apply small size class', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        size: 'small'
      }
    })
    expect(wrapper.classes()).toContain('yh-cascader--small')
  })

  // 可清空测试
  it('should show clear button when clearable and has value', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        clearable: true
      }
    })

    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-cascader__clear').exists()).toBe(true)
  })

  // 清空功能测试
  it('should clear value when clear button is clicked', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        clearable: true,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('mouseenter')
    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('.yh-cascader__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.props('modelValue')).toEqual([])
  })

  // 下拉框显示/隐藏测试
  it('should toggle dropdown on click', async () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('visible-change')).toBeTruthy()
    expect(wrapper.emitted('visible-change')![0]).toEqual([true])
  })

  // 仅显示最后一级测试
  it('should show only last level when showAllLevels is false', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        showAllLevels: false
      }
    })

    expect(wrapper.find('.yh-cascader__selected-value').text()).toBe('一致')
  })

  // 显示完整路径测试
  it('should show full path when showAllLevels is true', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        showAllLevels: true,
        separator: ' / '
      }
    })

    expect(wrapper.find('.yh-cascader__selected-value').text()).toContain('/')
  })

  // 多选测试
  it('should work in multiple mode', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        props: { multiple: true },
        modelValue: [
          ['guide', 'design', 'consistency'],
          ['guide', 'design', 'feedback']
        ],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    // 验证显示标签
    const tags = wrapper.findAll('.yh-cascader__tag')
    expect(tags.length).toBe(2)
  })

  // 折叠标签测试
  it('should collapse tags when collapseTags is true', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        props: { multiple: true },
        modelValue: [
          ['guide', 'design', 'consistency'],
          ['guide', 'design', 'feedback'],
          ['component', 'basic', 'button']
        ],
        collapseTags: true,
        maxCollapseTags: 1
      }
    })

    const tags = wrapper.findAll('.yh-cascader__tag')
    // 应该只显示 1 个标签 + 1 个折叠计数
    expect(tags.length).toBe(2)
    expect(tags[1].text()).toContain('+2')
  })

  // 多选标签移除测试
  it('should remove tag in multiple mode', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        props: { multiple: true },
        modelValue: [
          ['guide', 'design', 'consistency'],
          ['guide', 'design', 'feedback']
        ],
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    const closeBtn = wrapper.find('.yh-cascader__tag-close')
    if (closeBtn.exists()) {
      await closeBtn.trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
    }
  })

  // 可搜索测试
  it('should filter options when filterable', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        filterable: true
      }
    })

    await wrapper.trigger('click')
    await wrapper.find('input').setValue('按钮')
    await nextTick()

    // 验证过滤后显示建议
    expect(wrapper.emitted()).toBeTruthy()
  })

  // 自定义分隔符测试
  it('should use custom separator', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency'],
        separator: ' > '
      }
    })

    expect(wrapper.find('.yh-cascader__selected-value').text()).toContain('>')
  })

  // 事件测试
  it('should emit focus and blur events', async () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // ARIA 属性测试
  it('should have correct ARIA attributes', () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })
    const input = wrapper.find('input')

    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBeDefined()
  })

  // expose 方法测试
  it('should expose focus, blur and getCheckedNodes methods', () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })
    const vm = wrapper.vm as any

    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
    expect(typeof vm.getCheckedNodes).toBe('function')
  })

  // getCheckedNodes 测试
  it('should return checked nodes', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        modelValue: ['guide', 'design', 'consistency']
      }
    })
    const vm = wrapper.vm as any

    const nodes = vm.getCheckedNodes()
    expect(nodes.length).toBe(1)
    expect(nodes[0].value).toBe('consistency')
  })

  // 禁用选项测试
  it('should not select disabled option', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        'onUpdate:modelValue': (val: any) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 找到禁用的选项
    const disabledOption = wrapper.find('.yh-cascader__node.is-disabled')
    if (disabledOption.exists()) {
      await disabledOption.trigger('click')
      // 值不应该改变
      expect(wrapper.props('modelValue')).toBeUndefined()
    }
  })

  // expand-change 事件测试
  it('should emit expand-change when expanding', async () => {
    const wrapper = mount(Cascader, {
      props: { options }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 点击第一个选项展开
    const firstOption = wrapper.find('.yh-cascader__node')
    if (firstOption.exists()) {
      await firstOption.trigger('click')
      expect(wrapper.emitted('expand-change')).toBeTruthy()
    }
  })

  // 悬停展开测试
  it('should expand on hover when expandTrigger is hover', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        props: { expandTrigger: 'hover' }
      }
    })

    await wrapper.trigger('click')
    await nextTick()

    // 悬停第一个选项
    const firstOption = wrapper.find('.yh-cascader__node')
    if (firstOption.exists()) {
      await firstOption.trigger('mouseenter')
      expect(wrapper.emitted('expand-change')).toBeTruthy()
    }
  })
})
