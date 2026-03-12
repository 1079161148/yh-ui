import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Node, ViewportTransform } from '../types'
import { useNodes } from '../core/useNodes'

const defaultNode = (id: string, x = 0, y = 0): Node => ({
  id,
  type: 'default',
  position: { x, y },
  data: { label: id },
  width: 160,
  height: 50
})

describe('flow/core/useNodes', () => {
  it('should add and remove node', () => {
    const nodes = ref<Node[]>([])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.addNode(defaultNode('1'))
    expect(nodes.value).toHaveLength(1)
    expect(n.getNode('1')).toBeDefined()

    n.removeNode('1')
    expect(nodes.value).toHaveLength(0)
    expect(n.getNode('1')).toBeUndefined()
  })

  it('should update node and position', () => {
    const nodes = ref<Node[]>([defaultNode('1', 10, 20)])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.updateNode('1', { data: { label: 'updated' } })
    expect(nodes.value[0].data?.label).toBe('updated')

    n.updateNodePosition('1', { x: 100, y: 200 })
    expect(nodes.value[0].position).toEqual({ x: 100, y: 200 })
  })

  it('should snap position to grid when snapToGrid true', () => {
    const nodes = ref<Node[]>([defaultNode('1', 0, 0)])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes, snapToGrid: true, snapGrid: [20, 20] })

    n.updateNodePosition('1', { x: 17, y: 23 })
    expect(nodes.value[0].position.x).toBe(20)
    expect(nodes.value[0].position.y).toBe(20)
  })

  it('should select single node (clear others when multi false)', () => {
    const nodes = ref<Node[]>([
      { ...defaultNode('1'), selected: true },
      { ...defaultNode('2'), selected: false }
    ])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.selectNode('2', true, false)
    expect(nodes.value.find((x) => x.id === '1')?.selected).toBe(false)
    expect(nodes.value.find((x) => x.id === '2')?.selected).toBe(true)
  })

  it('should multi-select when multi true', () => {
    const nodes = ref<Node[]>([
      { ...defaultNode('1'), selected: true },
      { ...defaultNode('2'), selected: false }
    ])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.selectNode('2', true, true)
    expect(nodes.value.find((x) => x.id === '1')?.selected).toBe(true)
    expect(nodes.value.find((x) => x.id === '2')?.selected).toBe(true)
  })

  it('should selectNodes and clearSelection', () => {
    const nodes = ref<Node[]>([defaultNode('1'), defaultNode('2'), defaultNode('3')])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.selectNodes(['1', '3'], true)
    expect(n.getSelectedNodes()).toHaveLength(2)

    n.clearSelection()
    expect(n.getSelectedNodes()).toHaveLength(0)
  })

  it('should setNodes and findNode', () => {
    const nodes = ref<Node[]>([])
    const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const n = useNodes(viewport, { nodes })

    n.setNodes([defaultNode('a'), defaultNode('b')])
    expect(nodes.value).toHaveLength(2)
    expect(n.findNode('b')?.id).toBe('b')
  })
})
