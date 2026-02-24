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
