import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Flow from '../Flow.vue'
import type { Node, Edge } from '../types'

describe('Flow history emits', () => {
  it('should emit update:nodes and update:edges on undo and redo', async () => {
    const nodes: Node[] = [
      { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'A' } }
    ]
    const edges: Edge[] = []

    const wrapper = mount(Flow, {
      props: {
        nodes,
        edges,
        history: true
      }
    })

    await wrapper.vm.$nextTick()

    const flowInstance = wrapper.vm as any

    expect(flowInstance.undo).toBeDefined()
    expect(flowInstance.redo).toBeDefined()

    // Trigger state update
    const newNodes = [
      { id: '1', type: 'default', position: { x: 100, y: 100 }, data: { label: 'A' } }
    ]
    flowInstance.nodes = newNodes
    flowInstance.saveSnapshot('move node')

    await wrapper.vm.$nextTick()

    // Reset emits tracker
    if (wrapper.emitted('update:nodes')) {
      wrapper.emitted('update:nodes')!.length = 0
    }
    if (wrapper.emitted('update:edges')) {
      wrapper.emitted('update:edges')!.length = 0
    }

    // Call undo
    flowInstance.undo()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:nodes')).toBeDefined()
    expect(wrapper.emitted('update:edges')).toBeDefined()
    expect(flowInstance.nodes[0].position.x).toBe(0)

    // Reset emits tracker
    if (wrapper.emitted('update:nodes')) {
      wrapper.emitted('update:nodes')!.length = 0
    }
    if (wrapper.emitted('update:edges')) {
      wrapper.emitted('update:edges')!.length = 0
    }

    // Call redo
    flowInstance.redo()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:nodes')).toBeDefined()
    expect(wrapper.emitted('update:edges')).toBeDefined()
    expect(flowInstance.nodes[0].position.x).toBe(100)
  })
})
