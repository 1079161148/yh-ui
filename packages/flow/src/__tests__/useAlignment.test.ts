import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { Node } from '../types'
import { useAlignment } from '../core/useAlignment'

const node = (id: string, x: number, y: number, w = 200, h = 50): Node => ({
  id,
  type: 'default',
  position: { x, y },
  data: {},
  width: w,
  height: h
})

describe('flow/core/useAlignment', () => {
  it('should return same position when no other nodes', () => {
    const nodes = ref<Node[]>([node('1', 100, 50)])
    const a = useAlignment({ nodes, snapThreshold: 10 })

    const result = a.getAlignmentSnap('1', { x: 100, y: 50 })
    expect(result.x).toBe(100)
    expect(result.y).toBe(50)
    expect(result.snappedX).toBe(false)
    expect(result.snappedY).toBe(false)
  })

  it('should snap Y when dragging node center aligns with other center', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 300, 100)])
    const a = useAlignment({ nodes, snapThreshold: 10 })

    const pos = { x: 300, y: 100 }
    const result = a.getAlignmentSnap('1', pos)
    expect(result.snappedY).toBe(true)
    expect(result.y).toBe(100)
  })

  it('should snap X when left edges align', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 100, 200)])
    const a = useAlignment({ nodes, snapThreshold: 15 })

    const pos = { x: 98, y: 200 }
    const result = a.getAlignmentSnap('1', pos)
    expect(result.snappedX).toBe(true)
    expect(result.x).toBe(100)
  })

  it('snapToAlignment should return only x,y', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 100, 100)])
    const a = useAlignment({ nodes, snapThreshold: 20 })

    const out = a.snapToAlignment('1', { x: 105, y: 105 })
    expect(out).toHaveProperty('x')
    expect(out).toHaveProperty('y')
    expect(Object.keys(out)).toHaveLength(2)
  })

  it('should not snap when nodes are far apart vertically', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 0, 500)])
    const a = useAlignment({ nodes, snapThreshold: 10 })

    const pos = { x: 0, y: 100 }
    const result = a.getAlignmentSnap('1', pos)
    expect(result.snappedY).toBe(false)
  })

  it('should not snap when nodes are far apart horizontally', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 500, 0)])
    const a = useAlignment({ nodes, snapThreshold: 10 })

    const pos = { x: 100, y: 0 }
    const result = a.getAlignmentSnap('1', pos)
    expect(result.snappedX).toBe(false)
  })

  it('should use default snap threshold of 10', () => {
    const nodes = ref<Node[]>([node('1', 0, 0), node('2', 210, 0)])
    const a = useAlignment({ nodes })
    // Node 1 right edge (0+200)=200, node 2 left=210, gap=10, no snap since gap == threshold
    const result = a.getAlignmentSnap('1', { x: 0, y: 0 })
    expect(result.snappedX).toBe(false)
  })

  it('should return position when nodeId not found', () => {
    const nodes = ref<Node[]>([node('1', 0, 0)])
    const a = useAlignment({ nodes })

    const result = a.getAlignmentSnap('missing', { x: 50, y: 50 })
    expect(result).toEqual({ x: 50, y: 50, snappedX: false, snappedY: false })
  })
})
