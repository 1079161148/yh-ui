import { describe, it, expect } from 'vitest'
import type { Node, Edge } from '../types'
import { createConnectionValidator, detectCycles, isValidConnection } from '../utils/validation'

describe('flow/utils/validation', () => {
  const nodeA: Node = { id: 'A', type: 'default', position: { x: 0, y: 0 }, data: {} }
  const nodeB: Node = { id: 'B', type: 'default', position: { x: 0, y: 0 }, data: {} }

  it('isValidConnection should fail when source/target missing', () => {
    expect(isValidConnection(undefined, nodeB, { source: 'A', target: 'B' }).isValid).toBe(false)
    expect(isValidConnection(nodeA, undefined, { source: 'A', target: 'B' }).isValid).toBe(false)
  })

  it('isValidConnection should reject self connection', () => {
    const r = isValidConnection(nodeA, nodeA, { source: 'A', target: 'A' })
    expect(r.isValid).toBe(false)
  })

  it('createConnectionValidator should allow when no rules', () => {
    const v = createConnectionValidator()
    expect(v({ source: 'a', target: 'b' })).toBe(true)
  })

  it('createConnectionValidator should match by exact id / wildcard', () => {
    const v = createConnectionValidator([{ source: 'A', target: '*' }])
    expect(v({ source: 'A', target: 'B' })).toBe(true)
    expect(v({ source: 'X', target: 'B' })).toBe(false)
  })

  it('createConnectionValidator should match by regex string', () => {
    const v = createConnectionValidator([{ source: '^node-\\d+$', target: '^node-\\d+$' }])
    expect(v({ source: 'node-1', target: 'node-2' })).toBe(true)
    expect(v({ source: 'A', target: 'node-2' })).toBe(false)
  })

  it('detectCycles should detect cycles after adding edge', () => {
    const edges: Edge[] = [
      { id: 'e1', source: 'A', target: 'B' },
      { id: 'e2', source: 'B', target: 'C' }
    ]
    expect(detectCycles(edges, { source: 'C', target: 'A' })).toBe(true)
    expect(detectCycles(edges, { source: 'C', target: 'D' })).toBe(false)
  })
})
