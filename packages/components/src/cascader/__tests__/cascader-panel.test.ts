import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CascaderPanel from '../src/cascader-panel.vue'

describe('YhCascaderPanel', () => {
  const options = [
    {
      value: 'v1',
      label: 'L1',
      children: [
        { value: 'v1-1', label: 'L1-1' },
        { value: 'v1-2', label: 'L1-2' }
      ]
    },
    {
      value: 'v2',
      label: 'L2',
      disabled: true
    }
  ]

  const defaultConfig = {
    value: 'value',
    label: 'label',
    children: 'children',
    disabled: 'disabled',
    leaf: 'leaf',
    expandTrigger: 'click',
    checkStrictly: false,
    multiple: false,
    emitPath: true,
    lazy: false
  } as any

  it('should render correct number of levels', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: ['v1'],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })
    expect(wrapper.findAll('.yh-cascader__menu').length).toBe(2)
  })

  it('should handle node click and emit expand', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })

    await wrapper.find('.yh-cascader__node').trigger('click')
    expect(wrapper.emitted('expand')).toBeTruthy()
    expect(wrapper.emitted('expand')?.[0]).toEqual([options[0], 0])
  })

  it('should handle leaf node check', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: ['v1'],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })

    const secondMenu = wrapper.findAll('.yh-cascader__menu')[1]
    const item = secondMenu.find('.yh-cascader__node')
    await item.trigger('click')

    expect(wrapper.emitted('check')).toBeTruthy()
    expect(wrapper.emitted('check')?.[0]).toEqual([options[0].children?.[0], ['v1', 'v1-1']])
  })

  it('should ignore disabled options', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })

    const disabledNode = wrapper.find('.is-disabled')
    await disabledNode.trigger('click')
    expect(wrapper.emitted('expand')).toBeUndefined()
  })

  it('should support hover trigger', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: [],
        config: { ...defaultConfig, expandTrigger: 'hover' },
        isMultiple: false,
        isChecked: () => false
      }
    })

    await wrapper.find('.yh-cascader__node').trigger('mouseenter')
    expect(wrapper.emitted('expand')).toBeTruthy()
  })

  it('should support multiple choice', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: ['v1'],
        config: defaultConfig,
        isMultiple: true,
        isChecked: (path: any) => path[path.length - 1] === 'v1-1'
      }
    })

    const secondMenu = wrapper.findAll('.yh-cascader__menu')[1]
    expect(secondMenu.find('.yh-cascader__checkbox').exists()).toBe(true)
    expect(secondMenu.find('.is-checked').exists()).toBe(true)

    await secondMenu.find('.yh-cascader__checkbox').trigger('click')
    expect(wrapper.emitted('check')).toBeTruthy()
  })

  it('should not check parent nodes in multiple mode unless checkStrictly leaf branch applies', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: true,
        isChecked: () => false
      }
    })

    await wrapper.find('.yh-cascader__node').trigger('click')
    expect(wrapper.emitted('check')).toBeFalsy()
    expect(wrapper.emitted('expand')).toBeTruthy()
  })

  it('should allow checking child nodes in multiple + checkStrictly mode', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: ['v1'],
        config: { ...defaultConfig, checkStrictly: true },
        isMultiple: true,
        isChecked: () => false
      }
    })

    const secondMenu = wrapper.findAll('.yh-cascader__menu')[1]
    await secondMenu.find('.yh-cascader__node').trigger('click')
    expect(wrapper.emitted('check')?.[0]).toEqual([options[0].children?.[0], ['v1', 'v1-1']])
  })

  it('should treat explicit leaf parents as selectable even with children', async () => {
    const leafOptions = [
      {
        value: 'parent',
        label: 'Parent',
        leaf: true,
        children: [{ value: 'child', label: 'Child' }]
      }
    ]
    const wrapper = mount(CascaderPanel, {
      props: {
        options: leafOptions as any,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })

    await wrapper.find('.yh-cascader__node').trigger('click')
    expect(wrapper.emitted('expand')).toBeTruthy()
    expect(wrapper.emitted('check')?.[0]).toEqual([leafOptions[0], ['parent']])
  })

  it('should support virtual scrolling', async () => {
    const manyOptions = Array.from({ length: 100 }, (_, i) => ({ value: i, label: `L${i}` }))
    const wrapper = mount(CascaderPanel, {
      props: {
        options: manyOptions,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false,
        virtual: true,
        itemHeight: 30
      }
    })

    expect(wrapper.find('.is-virtual').exists()).toBe(true)
    const menu = wrapper.find('.yh-cascader__menu')

    menu.element.scrollTop = 300
    await menu.trigger('scroll')
    await nextTick()

    const firstNode = wrapper.find('.yh-cascader__node')
    expect((firstNode.element as HTMLElement).style.position).toBe('absolute')
  })

  it('should clamp virtual start index and reset scroll after menu change', async () => {
    const manyOptions = Array.from({ length: 30 }, (_, i) => ({ value: i, label: `L${i}` }))
    const wrapper = mount(CascaderPanel, {
      props: {
        options: manyOptions,
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false,
        virtual: true,
        itemHeight: 34
      }
    })

    const menu = wrapper.find('.yh-cascader__menu')
    menu.element.scrollTop = 9999
    await menu.trigger('scroll')
    await nextTick()

    const renderedLabels = wrapper.findAll('.yh-cascader__label').map((node) => node.text())
    expect(renderedLabels[0]).toBe('L19')

    await wrapper.setProps({ options: manyOptions.slice(0, 2) })
    await nextTick()

    const resetLabels = wrapper.findAll('.yh-cascader__label').map((node) => node.text())
    expect(resetLabels[0]).toBe('L0')
  })

  it('should stop building menus when expanded path has no matching children', () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: ['missing'],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })

    expect(wrapper.findAll('.yh-cascader__menu')).toHaveLength(1)
  })

  it('should not expand disabled nodes on hover trigger', async () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options,
        expandedPath: [],
        config: { ...defaultConfig, expandTrigger: 'hover' },
        isMultiple: false,
        isChecked: () => false
      }
    })

    await wrapper.find('.is-disabled').trigger('mouseenter')
    expect(wrapper.emitted('expand')).toBeFalsy()
  })

  it('should render empty state', () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options: [],
        expandedPath: [],
        config: defaultConfig,
        isMultiple: false,
        isChecked: () => false
      }
    })
    expect(wrapper.find('.yh-cascader__empty').exists()).toBe(true)
  })
})
