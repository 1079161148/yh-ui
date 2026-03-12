import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge } from '../types'
import { useSelection } from '../core/useSelection'

const node = (id: string, x: number, y: number, w = 100, h = 50): Node => ({
  id,
  type: 'default',
  position: { x, y },
  data: {},
  width: w,
  height: h,
  selected: false
})
const edge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
  type: 'bezier',
  selected: false
})

describe('flow/core/useSelection', () => {
  it('should start and update selection rect', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 200, 100)])
    const edges = ref<Edge[]>([])
    const s = useSelection({ nodes, edges })

    s.startSelection(10, 20)
    expect(s.isSelecting.value).toBe(true)
    expect(s.selectionRect.value).toEqual({ x: 10, y: 20, width: 0, height: 0 })

    s.updateSelection(50, 60)
    expect(s.selectionRect.value).toEqual({ x: 10, y: 20, width: 40, height: 40 })
  })

  it('should select nodes inside rect on updateSelection', () => {
    const nodes = ref<Node[]>([node('1', 20, 20, 50, 50), node('2', 100, 100, 50, 50)])
    const edges = ref<Edge[]>([])
    const s = useSelection({ nodes, edges })

    s.startSelection(0, 0)
    s.updateSelection(80, 80)
    expect(nodes.value.find((n) => n.id === '1')?.selected).toBe(true)
    expect(nodes.value.find((n) => n.id === '2')?.selected).toBe(false)
  })

  it('should end selection and clear rect', () => {
    const nodes = ref<Node[]>([node('1', 0, 0)])
    const edges = ref<Edge[]>([])
    const s = useSelection({ nodes, edges })

    s.startSelection(0, 0)
    s.updateSelection(10, 10)
    s.endSelection()

    expect(s.isSelecting.value).toBe(false)
    expect(s.selectionRect.value).toBeNull()
  })

  it('should clearSelection clear nodes and edges selected', () => {
    const nodes = ref<Node[]>([{ ...node('1', 0, 0), selected: true }])
    const edges = ref<Edge[]>([{ ...edge('e1', '1', '2'), selected: true }])
    const s = useSelection({ nodes, edges })

    s.clearSelection()

    expect(nodes.value[0].selected).toBeFalsy()
    expect(edges.value[0].selected).toBeFalsy()
  })

  it('should call onSelectionChange on endSelection', () => {
    const nodes = ref<Node[]>([node('1', 20, 20, 50, 50)])
    const edges = ref<Edge[]>([])
    let captured: { nodes: Node[]; edges: Edge[] } | null = null
    const s = useSelection({
      nodes,
      edges,
      onSelectionChange: (selectedNodes, selectedEdges) => {
        captured = { nodes: selectedNodes, edges: selectedEdges }
      }
    })

    s.startSelection(0, 0)
    s.updateSelection(80, 80)
    s.endSelection()

    expect(captured).not.toBeNull()
    expect(Array.isArray(captured!.nodes)).toBe(true)
    expect(Array.isArray(captured!.edges)).toBe(true)
  })
})
