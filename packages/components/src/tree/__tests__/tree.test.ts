import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhTree } from '../index'

describe('Tree', () => {
  const treeData = [
    {
      key: '1',
      label: '一级节点 1',
      children: [
        { key: '1-1', label: '二级节点 1-1' },
        { key: '1-2', label: '二级节点 1-2' }
      ]
    },
    {
      key: '2',
      label: '一级节点 2',
      children: [{ key: '2-1', label: '二级节点 2-1' }]
    }
  ]

  it('should render correctly', () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData }
    })
    expect(wrapper.classes()).toContain('yh-tree')
    // 初始状态下只渲染顶层节点（未展开）
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThanOrEqual(2)
  })

  it('should expand node on click', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, expandOnClickNode: true }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThan(2)
  })

  it('should show checkbox when showCheckbox is true', () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, showCheckbox: true }
    })
    expect(wrapper.find('.yh-checkbox').exists()).toBe(true)
  })

  it('should highlight current node', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData, highlightCurrent: true }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    expect(wrapper.find('.yh-tree__node.is-current').exists()).toBe(true)
  })

  it('should emit node-click event', async () => {
    const wrapper = mount(YhTree, {
      props: { data: treeData }
    })
    const node = wrapper.find('.yh-tree__content')
    await node.trigger('click')
    expect(wrapper.emitted('node-click')).toBeTruthy()
  })

  it('should show empty text when no data', () => {
    const wrapper = mount(YhTree, {
      props: { data: [], emptyText: '没有数据' }
    })
    expect(wrapper.find('.yh-tree__empty').text()).toBe('没有数据')
  })

  it('should support default expanded keys', () => {
    const wrapper = mount(YhTree, {
      props: {
        data: treeData,
        defaultExpandedKeys: ['1']
      }
    })
    // 第一个节点下的子节点应该可见
    expect(wrapper.findAll('.yh-tree__node').length).toBeGreaterThan(2)
  })
})
