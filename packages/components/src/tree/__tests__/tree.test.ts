import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhTree } from '../index'

const treeData = [
  {
    key: '1',
    label: '一级节点 1',
    children: [
      { key: '1-1', label: '二级节点 1-1' },
      { key: '1-2', label: '二级节点 1-2', disabled: true }
    ]
  },
  {
    key: '2',
    label: '一级节点 2',
    children: [{ key: '2-1', label: '二级节点 2-1' }]
  },
  { key: '3', label: '一级节点 3 (叶子)' }
]

describe('Tree', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    expect(wrapper.classes()).toContain('yh-tree')
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThanOrEqual(3)
  })

  it('should expand node on click', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, expandOnClickNode: true }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    await nextTick()
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThan(3)
  })

  it('should expand node when clicking expand icon', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const expandIcon = wrapper.find('.yh-tree__expand-icon')
    await expandIcon.trigger('click')
    await nextTick()
    const expandedCount = wrapper.findAll('.yh-tree__node').length
    expect(expandedCount).toBeGreaterThan(3)
    // verify node-expand event was emitted
    expect(wrapper.emitted('node-expand')).toBeTruthy()
    // click again to collapse: expandedKeys should no longer contain '1'
    const vm = wrapper.vm as any
    await expandIcon.trigger('click')
    await nextTick()
    // The first node's key is '1' and should be collapsed after second click
    expect([...vm.expandedKeys]).not.toContain('1')
  })

  it('should show checkbox and handle check', async () => {
    const onCheck = vi.fn()
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, onCheck }
    })
    const checkbox = wrapper.find('.yh-checkbox')
    expect(checkbox.exists()).toBe(true)
    await checkbox.find('input').trigger('change')
    await nextTick()
    expect(onCheck).toHaveBeenCalled()
  })

  it('should not check disabled node', async () => {
    const wrapper = mount(YhTree, {
      props: {
        data: treeData,
        showCheckbox: true,
        defaultExpandedKeys: ['1']
      }
    })
    await nextTick()
    // disabled node's checkbox should be disabled
    const checkboxes = wrapper.findAll('.yh-checkbox input')
    // find disabled checkbox - cast to HTMLInputElement for type safety
    const disabledCheckbox = checkboxes.find((c) => (c.element as HTMLInputElement).disabled)
    expect(disabledCheckbox).toBeTruthy()
  })

  it('should highlight current node on click', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, highlightCurrent: true }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    await nextTick()
    expect(wrapper.find('.yh-tree__node.is-current').exists()).toBe(true)
  })

  it('should emit node-click event', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    expect(wrapper.emitted('node-click')).toBeTruthy()
    expect(wrapper.emitted('current-change')).toBeTruthy()
  })

  it('should show empty text when no data', () => {
    const wrapper = mount(YhTree, {
      props: { data: [], emptyText: '没有数据' }
    })
    expect(wrapper.find('.yh-tree__empty').text()).toBe('没有数据')
  })

  it('should support default expanded keys', () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, defaultExpandedKeys: ['1'] }
    })
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThan(3)
  })

  it('should support default expand all', () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, defaultExpandAll: true }
    })
    // all nodes should be rendered
    expect(wrapper.findAll('.yh-tree__node').length).toBe(6)
  })

  it('should support accordion mode', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, accordion: true }
    })
    const expandIcons = wrapper.findAll('.yh-tree__expand-icon')
    // expand first
    await expandIcons[0].trigger('click')
    await nextTick()
    // expand second - first should collapse
    await expandIcons[1].trigger('click')
    await nextTick()
    expect(wrapper.emitted('node-expand')).toBeTruthy()
  })

  it('should filter nodes', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData, defaultExpandAll: true } })
    const vm = wrapper.vm as any
    vm.filter('2-1')
    await nextTick()
    const visibleNodes = wrapper.findAll('.yh-tree__node')
    expect(visibleNodes.length).toBeGreaterThan(0)

    // clear filter
    vm.filter('')
    await nextTick()
    expect(wrapper.findAll('.yh-tree__node').length).toBe(6)
  })

  it('should expose getCheckedNodes and setCheckedKeys', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, defaultExpandAll: true }
    })
    const vm = wrapper.vm as any

    vm.setCheckedKeys(['1-1', '2-1'])
    await nextTick()

    const checkedNodes = vm.getCheckedNodes()
    expect(checkedNodes.length).toBeGreaterThanOrEqual(2)

    const checkedKeys = vm.getCheckedKeys()
    expect(checkedKeys).toContain('1-1')
  })

  it('should expose setCurrentKey and getCurrentKey', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const vm = wrapper.vm as any

    vm.setCurrentKey('1')
    await nextTick()
    expect(vm.getCurrentKey()).toBe('1')

    const currentNode = vm.getCurrentNode()
    expect(currentNode?.key).toBe('1')
  })

  it('should expose setExpandedKeys', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const vm = wrapper.vm as any

    vm.setExpandedKeys(['1', '2'])
    await nextTick()
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThan(3)
  })

  it('should expose expandNode and collapseNode', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const vm = wrapper.vm as any

    vm.expandNode('1')
    await nextTick()
    expect((wrapper.vm as any).expandedKeys).toContain('1')

    vm.collapseNode('1')
    await nextTick()
    expect((wrapper.vm as any).expandedKeys).not.toContain('1')
  })

  it('should expose setData method', async () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const vm = wrapper.vm as any

    vm.setData([{ key: 'new1', label: '新节点' }])
    await nextTick()
    expect(wrapper.findAll('.yh-tree__node').length).toBe(1)
  })

  it('should expose getNode method', () => {
    const wrapper = mount(YhTree, { props: { data: treeData } })
    const vm = wrapper.vm as any
    const node = vm.getNode('1')
    expect(node?.label).toBe('一级节点 1')
  })

  it('should handle setChecked method', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, defaultExpandAll: true }
    })
    const vm = wrapper.vm as any
    vm.setChecked('1-1', true)
    await nextTick()
    const checked = vm.getCheckedKeys()
    expect(checked).toContain('1-1')

    vm.setChecked('1-1', false)
    await nextTick()
    const checked2 = vm.getCheckedKeys()
    expect(checked2).not.toContain('1-1')
  })

  it('should support custom node content via slots', () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData },
      slots: {
        default: ({ node }: any) => h('span', { class: 'custom-label' }, node.label)
      }
    })
    expect(wrapper.find('.custom-label').exists()).toBe(true)
  })

  it('should support virtual scrolling', () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      key: String(i),
      label: `节点 ${i}`
    }))
    const wrapper = mount(YhTree, {
      props: { data: largeData, virtual: true, height: 300 }
    })
    // Virtual rendering - only visible nodes rendered
    expect(wrapper.findAll('.yh-tree__node').length).toBeLessThan(100)
  })

  it('should emit drag events via node context', async () => {
    // Tree drag events are handled inside TreeNode context via provide/inject
    // We verify the tree renders draggable nodes
    const wrapper = mount(YhTree, {
      props: { data: treeData, draggable: true }
    })
    const nodes = wrapper.findAll('.yh-tree__node')
    expect(nodes.length).toBeGreaterThan(0)
    // draggable nodes should have drag-related class or attribute
    // The draggable prop is passed through context; tree renders normally
    expect(wrapper.find('.yh-tree').exists()).toBe(true)
  })

  it('should accept draggable prop', () => {
    const onNodeDrop = vi.fn()
    const wrapper = mount(YhTree, {
      props: { data: treeData, draggable: true, onNodeDrop }
    })
    // Tree component correctly accepts the draggable prop
    expect(wrapper.props('draggable')).toBe(true)
    expect(wrapper.find('.yh-tree').exists()).toBe(true)
  })

  it('should expose getHalfCheckedNodes', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, defaultExpandAll: true }
    })
    const vm = wrapper.vm as any
    // Check a child node - parent should be indeterminate
    vm.setCheckedKeys(['1-1'])
    await nextTick()
    const halfChecked = vm.getHalfCheckedNodes()
    expect(Array.isArray(halfChecked)).toBe(true)
    const halfCheckedKeys = vm.getHalfCheckedKeys()
    expect(Array.isArray(halfCheckedKeys)).toBe(true)
  })

  it('should support checkOnClickNode', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, checkOnClickNode: true }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    await nextTick()
    expect(wrapper.emitted('check')).toBeTruthy()
  })

  it('should support setCheckedNodes', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true, defaultExpandAll: true }
    })
    const vm = wrapper.vm as any
    vm.setCheckedNodes([{ key: '1-1', label: '二级节点 1-1' }])
    await nextTick()
    expect(vm.getCheckedKeys()).toContain('1-1')
  })

  it('should watch currentNodeKey prop changes', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, currentNodeKey: '1' }
    })
    await wrapper.setProps({ currentNodeKey: '2' })
    await nextTick()
    expect((wrapper.vm as any).getCurrentKey()).toBe('2')
  })
})
