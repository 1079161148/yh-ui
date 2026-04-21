import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { useNodeDistribution } from '../core/useNodeDistribution'

function createMockFlowInstance(): FlowInstance {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
  const draggingNodeId = ref<string | null>(null)

  return {
    nodes,
    edges,
    viewport,
    draggingNodeId,
    addNode: vi.fn(),
    removeNode: vi.fn(),
    updateNode: vi.fn(),
    getNode: vi.fn(),
    addEdge: vi.fn(),
    removeEdge: vi.fn(),
    updateEdge: vi.fn(),
    getEdge: vi.fn(),
    setViewport: vi.fn(),
    fitView: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    centerView: vi.fn(),
    selectNode: vi.fn(),
    selectEdge: vi.fn(),
    clearSelection: vi.fn(),
    getNodes: vi.fn(() => nodes.value),
    getEdges: vi.fn(() => edges.value),
    getViewport: vi.fn(() => viewport.value),
    screenToCanvas: vi.fn(),
    canvasToScreen: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    isValidConnection: vi.fn(() => true),
    $el: undefined,
    usePlugin: vi.fn(),
    removePlugin: vi.fn()
  }
}

describe('flow/core/useNodeDistribution', () => {
  it('should return all distribution functions', () => {
    const flow = createMockFlowInstance()
    const {
      distributeHorizontally,
      distributeVertically,
      alignNodesHorizontal,
      alignNodesVertical
    } = useNodeDistribution({ nodes: flow.nodes })

    expect(typeof distributeHorizontally).toBe('function')
    expect(typeof distributeVertically).toBe('function')
    expect(typeof alignNodesHorizontal).toBe('function')
    expect(typeof alignNodesVertical).toBe('function')
  })

  describe('distributeHorizontally', () => {
    it('should not distribute when fewer than 3 nodes', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} },
        { id: '2', type: 'default', position: { x: 100, y: 0 }, data: {} }
      ]
      const { distributeHorizontally } = useNodeDistribution({ nodes: flow.nodes })

      distributeHorizontally(['1', '2'])
      expect(flow.nodes.value[0].position.x).toBe(0)
      expect(flow.nodes.value[1].position.x).toBe(100)
    })

    it('should distribute 3 nodes horizontally with custom gap', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '2', type: 'default', position: { x: 50, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '3', type: 'default', position: { x: 100, y: 0 }, data: {}, width: 50, height: 50 }
      ]
      const { distributeHorizontally } = useNodeDistribution({ nodes: flow.nodes })

      distributeHorizontally(['1', '2', '3'], 100)

      const positions = flow.nodes.value.map((n) => n.position.x)
      expect(positions[0]).toBe(0)
      // Each node: 50 width + 100 gap = 150 apart
      expect(positions[1]).toBe(150)
      expect(positions[2]).toBe(300)
    })

    it('should distribute nodes that are too close', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '2', type: 'default', position: { x: 10, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '3', type: 'default', position: { x: 20, y: 0 }, data: {}, width: 50, height: 50 }
      ]
      const { distributeHorizontally } = useNodeDistribution({ nodes: flow.nodes })

      distributeHorizontally(['1', '2', '3'], 50)

      const positions = flow.nodes.value.map((n) => n.position.x)
      // Should spread them out
      expect(positions[0]).toBe(0)
      expect(positions[1]).toBeGreaterThan(positions[0])
      expect(positions[2]).toBeGreaterThan(positions[1])
    })

    it('should use selected nodes when no nodeIds provided', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        {
          id: '1',
          type: 'default',
          position: { x: 0, y: 0 },
          data: {},
          width: 50,
          height: 50,
          selected: true
        },
        {
          id: '2',
          type: 'default',
          position: { x: 50, y: 0 },
          data: {},
          width: 50,
          height: 50,
          selected: true
        },
        {
          id: '3',
          type: 'default',
          position: { x: 100, y: 0 },
          data: {},
          width: 50,
          height: 50,
          selected: true
        }
      ]
      const { distributeHorizontally } = useNodeDistribution({ nodes: flow.nodes })

      distributeHorizontally(undefined, 50)

      const positions = flow.nodes.value.map((n) => n.position.x)
      expect(positions[0]).toBe(0)
      expect(positions[1]).toBe(100)
      expect(positions[2]).toBe(200)
    })
  })

  describe('distributeVertically', () => {
    it('should not distribute when fewer than 3 nodes', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} },
        { id: '2', type: 'default', position: { x: 0, y: 100 }, data: {} }
      ]
      const { distributeVertically } = useNodeDistribution({ nodes: flow.nodes })

      distributeVertically(['1', '2'])
      expect(flow.nodes.value[0].position.y).toBe(0)
      expect(flow.nodes.value[1].position.y).toBe(100)
    })

    it('should distribute 3 nodes vertically', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '2', type: 'default', position: { x: 0, y: 50 }, data: {}, width: 50, height: 50 },
        { id: '3', type: 'default', position: { x: 0, y: 100 }, data: {}, width: 50, height: 50 }
      ]
      const { distributeVertically } = useNodeDistribution({ nodes: flow.nodes })

      distributeVertically(['1', '2', '3'], 100)

      const positions = flow.nodes.value.map((n) => n.position.y)
      expect(positions[0]).toBe(0)
      expect(positions[1]).toBe(150)
      expect(positions[2]).toBe(300)
    })

    it('should distribute nodes that are too close vertically', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 50, height: 50 },
        { id: '2', type: 'default', position: { x: 0, y: 10 }, data: {}, width: 50, height: 50 },
        { id: '3', type: 'default', position: { x: 0, y: 20 }, data: {}, width: 50, height: 50 }
      ]
      const { distributeVertically } = useNodeDistribution({ nodes: flow.nodes })

      distributeVertically(['1', '2', '3'], 50)

      const positions = flow.nodes.value.map((n) => n.position.y)
      expect(positions[0]).toBe(0)
      expect(positions[1]).toBeGreaterThan(positions[0])
      expect(positions[2]).toBeGreaterThan(positions[1])
    })
  })

  describe('alignNodesHorizontal', () => {
    it('should not align when fewer than 2 nodes', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesHorizontal } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesHorizontal(['1'])
      expect(flow.nodes.value[0].position.x).toBe(0)
    })

    it('should align to left edge', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 50, y: 50 }, data: {}, width: 100, height: 50 },
        { id: '3', type: 'default', position: { x: 100, y: 100 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesHorizontal } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesHorizontal(['1', '2', '3'], 'left')

      // All should align to the leftmost x (0)
      expect(flow.nodes.value[0].position.x).toBe(0)
      expect(flow.nodes.value[1].position.x).toBe(0)
      expect(flow.nodes.value[2].position.x).toBe(0)
    })

    it('should align to right edge', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 50, y: 50 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesHorizontal } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesHorizontal(['1', '2'], 'right')

      // All should align to the rightmost right edge (150)
      expect(flow.nodes.value[0].position.x).toBe(50)
      expect(flow.nodes.value[1].position.x).toBe(50)
    })

    it('should align to center', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 50, y: 50 }, data: {}, width: 200, height: 50 }
      ]
      const { alignNodesHorizontal } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesHorizontal(['1', '2'], 'center')

      // Center of first node: 0 + 50 = 50
      // Center of second node: 50 + 100 = 150
      // Average: (50 + 150) / 2 = 100
      // Node 1 should be at 100 - 50 = 50
      // Node 2 should be at 100 - 100 = 0
      expect(flow.nodes.value[0].position.x).toBe(50)
      expect(flow.nodes.value[1].position.x).toBe(0)
    })

    it('should use selected nodes when no nodeIds provided', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        {
          id: '1',
          type: 'default',
          position: { x: 0, y: 0 },
          data: {},
          width: 100,
          height: 50,
          selected: true
        },
        {
          id: '2',
          type: 'default',
          position: { x: 50, y: 0 },
          data: {},
          width: 100,
          height: 50,
          selected: true
        }
      ]
      const { alignNodesHorizontal } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesHorizontal(undefined, 'left')

      expect(flow.nodes.value[0].position.x).toBe(0)
      expect(flow.nodes.value[1].position.x).toBe(0)
    })
  })

  describe('alignNodesVertical', () => {
    it('should not align when fewer than 2 nodes', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesVertical } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesVertical(['1'])
      expect(flow.nodes.value[0].position.y).toBe(0)
    })

    it('should align to top edge', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 0, y: 50 }, data: {}, width: 100, height: 50 },
        { id: '3', type: 'default', position: { x: 0, y: 100 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesVertical } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesVertical(['1', '2', '3'], 'top')

      // All should align to topmost y (0)
      expect(flow.nodes.value[0].position.y).toBe(0)
      expect(flow.nodes.value[1].position.y).toBe(0)
      expect(flow.nodes.value[2].position.y).toBe(0)
    })

    it('should align to bottom edge', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 0, y: 50 }, data: {}, width: 100, height: 50 }
      ]
      const { alignNodesVertical } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesVertical(['1', '2'], 'bottom')

      // Bottom of first node: 0 + 50 = 50
      // Bottom of second node: 50 + 50 = 100
      // All should align to 100
      expect(flow.nodes.value[0].position.y).toBe(50)
      expect(flow.nodes.value[1].position.y).toBe(50)
    })

    it('should align to middle', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, width: 100, height: 50 },
        { id: '2', type: 'default', position: { x: 0, y: 50 }, data: {}, width: 100, height: 100 }
      ]
      const { alignNodesVertical } = useNodeDistribution({ nodes: flow.nodes })

      alignNodesVertical(['1', '2'], 'middle')

      // Middle of first: 0 + 25 = 25
      // Middle of second: 50 + 50 = 100
      // Average: (25 + 100) / 2 = 62.5
      // Node 1 at 62.5 - 25 = 37.5
      // Node 2 at 62.5 - 50 = 12.5
      expect(flow.nodes.value[0].position.y).toBe(37.5)
      expect(flow.nodes.value[1].position.y).toBe(12.5)
    })
  })
})
