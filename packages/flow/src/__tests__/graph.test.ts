import { describe, it, expect } from 'vitest'
import {
  hasCycle,
  topologicalSort,
  findAllPaths,
  findConnectedComponents,
  bfs,
  dfs
} from '../utils/graph'

describe('flow/utils/graph', () => {
  it('hasCycle should detect cycle', () => {
    const edges = [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'A' }
    ]
    expect(hasCycle(edges, 'A')).toBe(true)
  })

  it('hasCycle should return false for DAG', () => {
    const edges = [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' }
    ]
    expect(hasCycle(edges, 'A')).toBe(false)
  })

  it('topologicalSort should return order for DAG', () => {
    const nodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }]
    const edges = [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' }
    ]
    const order = topologicalSort(nodes, edges)
    expect(order).toHaveLength(3)
    const ai = order.indexOf('A')
    const bi = order.indexOf('B')
    const ci = order.indexOf('C')
    expect(ai).toBeLessThan(bi)
    expect(bi).toBeLessThan(ci)
  })

  it('findAllPaths should return paths between two nodes', () => {
    const edges = [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '2', target: '4' },
      { source: '3', target: '4' }
    ]
    const paths = findAllPaths(edges, '1', '4')
    expect(paths.length).toBeGreaterThanOrEqual(1)
    expect(paths.every((p) => p[0] === '1' && p[p.length - 1] === '4')).toBe(true)
  })

  it('findConnectedComponents should return components', () => {
    const nodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }]
    const edges = [
      { source: 'A', target: 'B' },
      { source: 'C', target: 'D' }
    ]
    const components = findConnectedComponents(nodes, edges)
    expect(components).toHaveLength(2)
    expect(components.some((c) => c.includes('A') && c.includes('B'))).toBe(true)
    expect(components.some((c) => c.includes('C') && c.includes('D'))).toBe(true)
  })

  it('bfs should traverse in breadth order', () => {
    const adj = new Map<string, string[]>()
    adj.set('1', ['2', '3'])
    adj.set('2', ['4'])
    adj.set('3', [])
    adj.set('4', [])
    const result = bfs(adj, '1')
    expect(result).toContain('1')
    expect(result).toContain('2')
    expect(result).toContain('3')
    expect(result).toContain('4')
    expect(result[0]).toBe('1')
  })

  it('dfs should traverse in depth order', () => {
    const adj = new Map<string, string[]>()
    adj.set('1', ['2', '3'])
    adj.set('2', ['4'])
    adj.set('3', [])
    adj.set('4', [])
    const result = dfs(adj, '1')
    expect(result).toHaveLength(4)
    expect(result[0]).toBe('1')
  })
})
