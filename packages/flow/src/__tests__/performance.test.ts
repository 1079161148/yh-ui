import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  ReactiveGraph,
  generateId,
  debounce,
  throttle,
  memo,
  clearMemoCache
} from '../utils/performance'

describe('flow/utils/performance', () => {
  describe('ReactiveGraph', () => {
    it('should initialize with empty nodes and edges', () => {
      const graph = new ReactiveGraph()
      expect(graph.nodes).toEqual([])
      expect(graph.edges).toEqual([])
    })

    it('should set and get nodes', () => {
      const graph = new ReactiveGraph()
      const nodes = [{ id: 'n1', type: 'default' as const, position: { x: 0, y: 0 }, data: {} }]
      graph.nodes = nodes
      expect(graph.nodes).toBe(nodes)
    })

    it('should set and get edges', () => {
      const graph = new ReactiveGraph()
      const edges = [{ id: 'e1', source: 'n1', target: 'n2', type: 'default' as const }]
      graph.edges = edges
      expect(graph.edges).toBe(edges)
    })

    it('should get connected edges for a node', () => {
      const graph = new ReactiveGraph()
      graph.nodes = [
        { id: 'n1', type: 'default' as const, position: { x: 0, y: 0 }, data: {} },
        { id: 'n2', type: 'default' as const, position: { x: 100, y: 0 }, data: {} },
        { id: 'n3', type: 'default' as const, position: { x: 200, y: 0 }, data: {} }
      ]
      graph.edges = [
        { id: 'e1', source: 'n1', target: 'n2', type: 'default' as const },
        { id: 'e2', source: 'n2', target: 'n3', type: 'default' as const }
      ]

      const connectedEdges = graph.getConnectedEdges('n2')
      expect(connectedEdges).toHaveLength(2)
    })

    it('should get connected nodes for a node', () => {
      const graph = new ReactiveGraph()
      graph.nodes = [
        { id: 'n1', type: 'default' as const, position: { x: 0, y: 0 }, data: {} },
        { id: 'n2', type: 'default' as const, position: { x: 100, y: 0 }, data: {} },
        { id: 'n3', type: 'default' as const, position: { x: 200, y: 0 }, data: {} }
      ]
      graph.edges = [
        { id: 'e1', source: 'n1', target: 'n2', type: 'default' as const },
        { id: 'e2', source: 'n2', target: 'n3', type: 'default' as const }
      ]

      const connectedNodes = graph.getConnectedNodes('n1')
      expect(connectedNodes).toHaveLength(1)
      expect(connectedNodes[0].id).toBe('n2')
    })

    it('should return empty array for node with no connections', () => {
      const graph = new ReactiveGraph()
      graph.nodes = [
        { id: 'n1', type: 'default' as const, position: { x: 0, y: 0 }, data: {} },
        { id: 'n2', type: 'default' as const, position: { x: 100, y: 0 }, data: {} }
      ]
      graph.edges = []

      const connected = graph.getConnectedNodes('n1')
      expect(connected).toHaveLength(0)
    })

    it('should batch update nodes', () => {
      const graph = new ReactiveGraph()
      graph.nodes = [{ id: 'n1', type: 'default' as const, position: { x: 0, y: 0 }, data: {} }]

      graph.batchUpdateNodes((nodes) => [
        ...nodes,
        { id: 'n2', type: 'default' as const, position: { x: 100, y: 0 }, data: {} }
      ])

      expect(graph.nodes).toHaveLength(2)
    })

    it('should batch update edges', () => {
      const graph = new ReactiveGraph()
      graph.edges = [{ id: 'e1', source: 'n1', target: 'n2', type: 'default' as const }]

      graph.batchUpdateEdges((edges) => [
        ...edges,
        { id: 'e2', source: 'n2', target: 'n3', type: 'default' as const }
      ])

      expect(graph.edges).toHaveLength(2)
    })
  })

  describe('generateId', () => {
    it('should generate id with default prefix', () => {
      const id = generateId()
      expect(id).toMatch(/^id-\d+-\d+$/)
    })

    it('should generate id with custom prefix', () => {
      const id = generateId('node')
      expect(id).toMatch(/^node-\d+-\d+$/)
    })

    it('should generate unique ids', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      expect(id1).not.toBe(id2)
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should debounce function calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced('a')
      debounced('b')
      debounced('c')

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('c')
    })

    it('should pass arguments correctly', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 50)

      debounced('hello', 123)

      vi.advanceTimersByTime(50)

      expect(fn).toHaveBeenCalledWith('hello', 123)
    })

    it('should only call once for multiple rapid calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 200)

      for (let i = 0; i < 10; i++) {
        debounced(i)
      }

      vi.advanceTimersByTime(200)

      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should throttle function calls', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled('a')
      throttled('b')
      throttled('c')

      // First call should execute immediately
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('a')

      // Subsequent calls within limit should be ignored
      vi.advanceTimersByTime(50)
      throttled('d')
      expect(fn).toHaveBeenCalledTimes(1)

      // After limit, next call should execute
      vi.advanceTimersByTime(60)
      throttled('e')
      expect(fn).toHaveBeenCalledTimes(2)
      expect(fn).toHaveBeenCalledWith('e')
    })

    it('should pass arguments correctly', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled('test', true, 42)

      expect(fn).toHaveBeenCalledWith('test', true, 42)
    })
  })

  describe('memo', () => {
    beforeEach(() => {
      clearMemoCache()
    })

    it('should memoize function results', () => {
      let callCount = 0
      const memoized = memo('key1', () => {
        callCount++
        return 'result'
      })

      const result1 = memoized
      const result2 = memoized

      expect(callCount).toBe(1)
      expect(result1).toBe('result')
      expect(result2).toBe('result')
    })

    it('should cache different keys separately', () => {
      const fn = vi.fn().mockImplementation((key: string) => `result-${key}`)

      const result1 = memo('key-a', () => fn('a'))
      const result2 = memo('key-b', () => fn('b'))

      expect(fn).toHaveBeenCalledTimes(2)
      expect(result1).toBe('result-a')
      expect(result2).toBe('result-b')
    })

    it('should return cached result without calling function', () => {
      let callCount = 0
      const cached = memo('cache-key', () => {
        callCount++
        return 'cached'
      })

      const result1 = cached
      const result2 = cached
      const result3 = cached

      expect(callCount).toBe(1)
      expect(result1).toBe('cached')
      expect(result2).toBe('cached')
      expect(result3).toBe('cached')
    })
  })

  describe('clearMemoCache', () => {
    it('should clear memo cache', () => {
      const fn = vi.fn().mockReturnValue('value')
      memo('key-x', fn)
      memo('key-y', fn)

      expect(fn).toHaveBeenCalledTimes(2)

      clearMemoCache()

      // After clearing, memo calls should invoke the function again
      memo('key-x', fn)
      memo('key-y', fn)

      expect(fn).toHaveBeenCalledTimes(4)
    })
  })
})
