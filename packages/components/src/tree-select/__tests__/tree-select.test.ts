import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import YhTreeSelect from '../src/tree-select.vue'

describe('YhTreeSelect', () => {
  const data = [
    {
      id: '1',
      name: '公司总部',
      items: [
        {
          id: '1-1',
          name: '研发中心',
          items: [
            { id: '1-1-1', name: '前端组' },
            { id: '1-1-2', name: '后端组' }
          ]
        },
        { id: '1-2', name: '产品部' }
      ]
    },
    {
      id: '2',
      name: '分公司',
      items: [{ id: '2-1', name: '市场部' }]
    }
  ]

  const propsAlias = { label: 'name', value: 'id', children: 'items' }

  it('renders correctly and supports custom props alias', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: data as any,
        props: propsAlias,
        nodeKey: 'id',
        modelValue: '1-1',
        teleported: false
      }
    })
    await nextTick()
    expect(wrapper.find('.yh-tree-select__selected-label').text()).toBe('研发中心')
  })

  it('emits visible-change event when opened/closed', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: { data: data as any, props: propsAlias, teleported: false }
    })
    const trigger = wrapper.find('.yh-tree-select__trigger')

    await trigger.trigger('click')
    expect(wrapper.emitted('visible-change')?.[0]).toEqual([true])

    await trigger.trigger('click')
    expect(wrapper.emitted('visible-change')?.[1]).toEqual([false])
  })

  it('emits node-click event with correct arguments', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: { data: data as any, props: propsAlias, nodeKey: 'id', teleported: false }
    })
    await wrapper.find('.yh-tree-select__trigger').trigger('click')
    const node = wrapper.find('.yh-tree-select__node')
    await node.trigger('click')

    const nodeClickEvent = wrapper.emitted('node-click')?.[0]
    expect(nodeClickEvent?.[0]).toMatchObject({ id: '1', name: '公司总部' })
    expect(nodeClickEvent?.[1]).toHaveProperty('key', '1')
    expect(nodeClickEvent?.[2]).toBeDefined() // MouseEvent
  })

  it('supports multiple selection events: check and check-change', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: data as any,
        props: propsAlias,
        multiple: true,
        showCheckbox: true,
        teleported: false,
        nodeKey: 'id',
        defaultExpandAll: true
      }
    })
    await wrapper.find('.yh-tree-select__trigger').trigger('click')
    const nodes = wrapper.findAll('.yh-tree-select__node')

    // 点击“公司总部”
    await nodes[0].trigger('click')

    expect(wrapper.emitted('check-change')).toBeDefined()
    const checkEvent = wrapper.emitted('check')?.[0]
    expect(checkEvent?.[0]).toMatchObject({ id: '1' })
    expect(checkEvent?.[1].checkedKeys).toContain('1')
    expect(checkEvent?.[1].checkedKeys).toContain('1-1-1')
  })

  it('respects disabled property of specific nodes', async () => {
    const disabledData = [
      { id: '1', name: 'Enabled' },
      { id: '2', name: 'Disabled', disabled: true }
    ]
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: disabledData as any,
        props: propsAlias,
        nodeKey: 'id',
        teleported: false
      }
    })
    await wrapper.find('.yh-tree-select__trigger').trigger('click')
    const nodes = wrapper.findAll('.yh-tree-select__node')

    expect(nodes[1].classes()).toContain('is-disabled')
    await nodes[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('filters nodes and shows correct subtree inheritance', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: data as any,
        props: propsAlias,
        nodeKey: 'id',
        filterable: true,
        teleported: false
      }
    })

    // 展开面板以触发 initial 渲染
    await wrapper.find('.yh-tree-select__trigger').trigger('click')

    const input = wrapper.find('input')
    await input.setValue('研发')

    // 强制触发一次 input 事件（有些组件库内部监听 input 而非 change）
    await input.trigger('input')

    await nextTick()
    await nextTick()

    // 搜索“研发”，预期命中“研发中心”，并自动带出其子节点“前端组”
    const nodes = wrapper.findAll('.yh-tree-select__node')
    const texts = nodes.map((n) => n.text().trim())

    expect(texts).toContain('研发中心')
    expect(texts).toContain('前端组')
    expect(texts).toContain('后端组')
    expect(texts).not.toContain('产品部')
  })

  it('syncs state when modelValue is updated externally', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: data as any,
        props: propsAlias,
        modelValue: '1',
        teleported: false,
        nodeKey: 'id'
      }
    })
    await nextTick()
    expect(wrapper.find('.yh-tree-select__selected-label').text()).toBe('公司总部')

    // 外部更新数值为 '2'
    await wrapper.setProps({ modelValue: '2' })
    await nextTick()

    expect(wrapper.find('.yh-tree-select__selected-label').text()).toBe('分公司')
  })

  it('supports collapse-tags', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: data as any,
        props: propsAlias,
        multiple: true,
        collapseTags: true,
        modelValue: ['1', '2', '1-1'],
        teleported: false,
        nodeKey: 'id'
      }
    })
    await nextTick()

    const tags = wrapper.findAll('.yh-tree-select__tag')
    // 默认 maxCollapseTags 是 1，所以应该渲染 1 个正常 Tag + 1 个 "+ 2" 占位 Tag
    expect(tags.length).toBe(2)
    expect(tags[1].text()).toContain('+ 2')
  })

  it('shows empty-text when no matching data found', async () => {
    const wrapper = mount(YhTreeSelect as any, {
      props: { data: [], emptyText: '没有数据哦', teleported: false }
    })
    await wrapper.find('.yh-tree-select__trigger').trigger('click')
    expect(wrapper.find('.yh-tree-select__empty').text()).toBe('没有数据哦')
  })

  it('lazy loading works correctly and auto-expands', async () => {
    const load = vi.fn((node, resolve) => {
      resolve([{ id: 'lazy-1', name: 'Lazy child', isLeaf: true }])
    })
    const wrapper = mount(YhTreeSelect as any, {
      props: {
        data: [{ id: '1', name: 'Root', items: [] }] as any,
        props: propsAlias,
        lazy: true,
        load,
        teleported: false,
        nodeKey: 'id'
      }
    })
    await wrapper.find('.yh-tree-select__trigger').trigger('click')
    await wrapper.find('.yh-tree-select__node').trigger('click')

    // 等待异步加载完成
    await new Promise((resolve) => setTimeout(resolve, 50))
    await nextTick()

    expect(load).toHaveBeenCalled()
    const allNodes = wrapper.findAll('.yh-tree-select__node')
    expect(allNodes.some((n) => n.text().includes('Lazy child'))).toBe(true)
  })
})
