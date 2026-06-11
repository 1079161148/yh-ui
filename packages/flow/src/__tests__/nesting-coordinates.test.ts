import { describe, it, expect } from 'vitest'
import { getNodeAbsolutePosition } from '../utils/custom-types'
import type { Node } from '../types'

describe('getNodeAbsolutePosition', () => {
  it('should return relative position directly for standalone node', () => {
    const nodes: Node[] = [
      { id: 'node-1', type: 'default', position: { x: 100, y: 150 }, data: {} }
    ]
    const result = getNodeAbsolutePosition(nodes[0], nodes)
    expect(result).toEqual({ x: 100, y: 150 })
  })

  it('should calculate absolute position for nested node (1 level)', () => {
    const nodes: Node[] = [
      { id: 'parent-1', type: 'group', position: { x: 100, y: 150 }, data: {} },
      { id: 'child-1', parentId: 'parent-1', type: 'default', position: { x: 30, y: 40 }, data: {} }
    ]
    const result = getNodeAbsolutePosition(nodes[1], nodes)
    expect(result).toEqual({ x: 130, y: 190 })
  })

  it('should calculate absolute position for deeply nested node (2 levels)', () => {
    const nodes: Node[] = [
      { id: 'grandparent', type: 'group', position: { x: 100, y: 150 }, data: {} },
      {
        id: 'parent',
        parentId: 'grandparent',
        type: 'group',
        position: { x: 50, y: 50 },
        data: {}
      },
      { id: 'child', parentId: 'parent', type: 'default', position: { x: 10, y: 20 }, data: {} }
    ]
    const result = getNodeAbsolutePosition(nodes[2], nodes)
    expect(result).toEqual({ x: 160, y: 220 })
  })

  it('should prevent infinite loops on cyclic parent reference', () => {
    const nodes: Node[] = [
      { id: 'node-a', parentId: 'node-b', type: 'group', position: { x: 10, y: 10 }, data: {} },
      { id: 'node-b', parentId: 'node-a', type: 'group', position: { x: 20, y: 20 }, data: {} }
    ]
    // Should not throw, should safely return within max depth
    const result = getNodeAbsolutePosition(nodes[0], nodes)
    expect(result.x).toBeGreaterThan(0)
    expect(result.y).toBeGreaterThan(0)
  })
})
