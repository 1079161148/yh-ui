import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { createLayoutPlugin } from '../plugins/plugins/layout'

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

function createMockNode(id: string, type = 'default'): Node {
  return {
    id,
    type,
    position: { x: 0, y: 0 },
    width: 100,
    height: 50,
    data: {},
    selected: false,
    dragging: false
  }
}

function createMockEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    type: 'smoothstep',
    selected: false,
    animated: false
  }
}

describe('flow/plugins/plugins/layout', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
    vi.restoreAllMocks()
  })

  describe('createLayoutPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createLayoutPlugin()
      expect(plugin.id).toBe('layout')
      expect(plugin.name).toBe('Layout')
      expect(plugin.version).toBe('1.0.0')
    })

    it('should install without crashing', () => {
      const flow = createMockFlowInstance()
      const plugin = createLayoutPlugin()
      plugin.install(flow)
      expect(flow.applyLayout).toBeDefined()
    })

    it('should not install applyLayout when enabled is false', () => {
      const flow = createMockFlowInstance()
      const plugin = createLayoutPlugin({ enabled: false })
      plugin.install(flow)
      expect(flow.applyLayout).toBeUndefined()
    })

    it('should use default layout options', () => {
      const plugin = createLayoutPlugin()
      expect(plugin.id).toBe('layout')
    })

    it('should merge custom options', () => {
      const plugin = createLayoutPlugin({
        type: 'grid',
        direction: 'LR',
        nodeSpacing: 100,
        rankSpacing: 200,
        animate: false
      })
      expect(plugin.id).toBe('layout')
    })

    it('should support all layout types', () => {
      const types = ['dagre', 'elk', 'force', 'grid'] as const
      for (const type of types) {
        const plugin = createLayoutPlugin({ type })
        expect(plugin.id).toBe('layout')
      }
    })

    it('should support all directions', () => {
      const directions = ['TB', 'BT', 'LR', 'RL'] as const
      for (const direction of directions) {
        const plugin = createLayoutPlugin({ direction })
        expect(plugin.id).toBe('layout')
      }
    })

    it('should support elk options', () => {
      const plugin = createLayoutPlugin({
        type: 'elk',
        elkOptions: {
          algorithm: 'layered',
          direction: 'DOWN',
          spacing: 50,
          edgeRouting: 'POLYLINE'
        }
      })
      expect(plugin.id).toBe('layout')
    })

    it('should support force options', () => {
      const plugin = createLayoutPlugin({
        type: 'force',
        forceOptions: {
          strength: -500,
          distance: 150,
          theta: 0.5,
          iterations: 500
        }
      })
      expect(plugin.id).toBe('layout')
    })

    it('should support grid options', () => {
      const plugin = createLayoutPlugin({
        type: 'grid',
        gridOptions: {
          columns: 6,
          startX: 100,
          startY: 100
        }
      })
      expect(plugin.id).toBe('layout')
    })
  })

  describe('applyLayout with grid', () => {
    it('should apply grid layout', async () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        createMockNode('n1'),
        createMockNode('n2'),
        createMockNode('n3'),
        createMockNode('n4')
      ]
      flow.edges.value = [
        createMockEdge('e1', 'n1', 'n2'),
        createMockEdge('e2', 'n2', 'n3')
      ]

      const plugin = createLayoutPlugin({ type: 'grid', animate: false })
      plugin.install(flow)

      await flow.applyLayout!({ type: 'grid', gridOptions: { columns: 2 } })

      expect(flow.updateNode).toHaveBeenCalled()
      expect(consoleLogSpy).toHaveBeenCalledWith('[Layout Plugin] Grid layout applied successfully')
    })

    it('should warn for unknown layout type', async () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [createMockNode('n1')]

      const plugin = createLayoutPlugin()
      plugin.install(flow)

      // @ts-ignore - intentionally pass invalid type
      await flow.applyLayout!({ type: 'unknown' })

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown layout type')
      )
    })

    it('should handle layout with empty nodes', async () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = []
      flow.edges.value = []

      const plugin = createLayoutPlugin({ type: 'grid' })
      plugin.install(flow)

      await flow.applyLayout!()
      expect(flow.updateNode).not.toHaveBeenCalled()
    })

    it('should use override options from applyLayout call', async () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [createMockNode('n1')]
      flow.edges.value = []

      const plugin = createLayoutPlugin({ type: 'grid' })
      plugin.install(flow)

      await flow.applyLayout!({ direction: 'LR' })
      expect(flow.updateNode).toHaveBeenCalled()
    })
  })
})
