import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge } from '../types'
import { useEdges } from '../core/useEdges'

const node = (id: string): Node => ({ id, type: 'default', position: { x: 0, y: 0 }, data: {} })
const edge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
  type: 'bezier'
})

describe('flow/core/useEdges', () => {
  it('should add and remove edge', () => {
    const edges = ref<Edge[]>([])
    const nodes = ref<Node[]>([node('1'), node('2')])
    const e = useEdges({ edges, nodes })

    e.addEdge(edge('e1', '1', '2'))
    expect(edges.value).toHaveLength(1)
    expect(e.getEdge('e1')).toBeDefined()

    e.removeEdge('e1')
    expect(edges.value).toHaveLength(0)
  })

  it('should not add duplicate connection', () => {
    const edges = ref<Edge[]>([edge('e1', '1', '2')])
    const nodes = ref<Node[]>([node('1'), node('2')])
    const e = useEdges({ edges, nodes })

    e.addEdge(edge('e2', '1', '2'))
    expect(edges.value).toHaveLength(1)
  })

  it('should respect isValidConnection', () => {
    const edges = ref<Edge[]>([])
    const nodes = ref<Node[]>([node('1'), node('2'), node('3')])
    const e = useEdges({
      edges,
      nodes,
      isValidConnection: (c) => c.target !== '2'
    })

    e.addEdge(edge('e1', '1', '2'))
    expect(edges.value).toHaveLength(0)

    e.addEdge(edge('e2', '1', '3'))
    expect(edges.value).toHaveLength(1)
  })

  it('should update edge', () => {
    const edges = ref<Edge[]>([edge('e1', '1', '2')])
    const nodes = ref<Node[]>([node('1'), node('2')])
    const e = useEdges({ edges, nodes })

    e.updateEdge('e1', { label: 'updated', type: 'straight' })
    expect(edges.value[0].label).toBe('updated')
    expect(edges.value[0].type).toBe('straight')
  })

  it('should select edge single and multi', () => {
    const edges = ref<Edge[]>([
      { ...edge('e1', '1', '2'), selected: true },
      { ...edge('e2', '2', '3'), selected: false }
    ])
    const nodes = ref<Node[]>([node('1'), node('2'), node('3')])
    const e = useEdges({ edges, nodes })

    e.selectEdge('e2', true, false)
    expect(edges.value.find((x) => x.id === 'e1')?.selected).toBe(false)
    expect(edges.value.find((x) => x.id === 'e2')?.selected).toBe(true)

    e.selectEdge('e1', true, true)
    expect(edges.value.filter((x) => x.selected)).toHaveLength(2)
  })

  it('should getEdgesForNode and getConnectedEdges', () => {
    const edges = ref<Edge[]>([edge('e1', '1', '2'), edge('e2', '2', '3'), edge('e3', '1', '3')])
    const nodes = ref<Node[]>([node('1'), node('2'), node('3')])
    const e = useEdges({ edges, nodes })

    expect(e.getEdgesForNode('1')).toHaveLength(2)
    expect(e.getConnectedEdges('2')).toHaveLength(2)
  })

  it('should clearSelection and setEdges', () => {
    const edges = ref<Edge[]>([{ ...edge('e1', '1', '2'), selected: true }])
    const nodes = ref<Node[]>([node('1'), node('2')])
    const e = useEdges({ edges, nodes })

    e.clearSelection()
    expect(edges.value[0].selected).toBeFalsy()

    e.setEdges([edge('e2', '1', '2')])
    expect(edges.value).toHaveLength(1)
    expect(edges.value[0].id).toBe('e2')
  })
})
