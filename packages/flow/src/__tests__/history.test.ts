import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge } from '../types'
import { useHistory } from '../core/useHistory'

describe('flow/core/useHistory', () => {
  it('should push, undo, redo', () => {
    const nodes = ref<Node[]>([{ id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} }])
    const edges = ref<Edge[]>([])

    const historyEvents: Array<{ canUndo: boolean; canRedo: boolean }> = []
    const h = useHistory(nodes, edges, {
      maxHistory: 10,
      onHistoryChange: (canUndo, canRedo) => historyEvents.push({ canUndo, canRedo })
    })

    // initial push
    h.push({ nodes: nodes.value, edges: edges.value })
    expect(h.canUndo.value).toBe(false)
    expect(h.canRedo.value).toBe(false)

    // mutate and push
    nodes.value[0].position.x = 100
    h.push({ nodes: nodes.value, edges: edges.value })
    expect(h.canUndo.value).toBe(true)
    expect(h.canRedo.value).toBe(false)

    // undo should restore x=0
    h.undo()
    expect(nodes.value[0].position.x).toBe(0)
    expect(h.canRedo.value).toBe(true)

    // redo should restore x=100
    h.redo()
    expect(nodes.value[0].position.x).toBe(100)

    // clear
    h.clear()
    expect(h.canUndo.value).toBe(false)
    expect(h.canRedo.value).toBe(false)
    expect(historyEvents.length).toBeGreaterThan(0)
  })

  it('should respect maxHistory', () => {
    const nodes = ref<Node[]>([{ id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} }])
    const edges = ref<Edge[]>([])
    const h = useHistory(nodes, edges, { maxHistory: 2 })

    h.push({ nodes: nodes.value, edges: edges.value }) // state0
    nodes.value[0].position.x = 1
    h.push({ nodes: nodes.value, edges: edges.value }) // state1
    nodes.value[0].position.x = 2
    h.push({ nodes: nodes.value, edges: edges.value }) // state2 (state0 should be dropped)

    // only one undo available (to state1)
    h.undo()
    expect(nodes.value[0].position.x).toBe(1)
    expect(h.canUndo.value).toBe(false)
  })
})
