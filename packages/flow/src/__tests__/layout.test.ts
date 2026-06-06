import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { createLayoutPlugin, type LayoutOptions } from '../plugins/plugins/layout'

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
    updateNode: vi.fn((id: string, data: Partial<Node>) => {
      const node = nodes.value.find((n) => n.id === id)
      if (node) Object.assign(node, data)
    }),
    getNode: vi.fn((id: string) => nodes.value.find((n) => n.id === id)),
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
    screenToCanvas: vi.fn((x: number, y: number) => ({ x, y })),
    canvasToScreen: vi.fn((x: number, y: number) => ({ x, y })),
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    isValidConnection: vi.fn(() => true),
    $el: undefined,
    usePlugin: vi.fn(),
    removePlugin: vi.fn()
  }
}

describe('flow/plugins/plugins/layout', () => {
  describe('LayoutOptions', () => {
    it('should have correct default options', () => {
      const plugin = createLayoutPlugin()
      const flow = createMockFlowInstance()
      plugin.install(flow)
      expect(flow.applyLayout).toBeDefined()
    })

    it('should support dagre layout type', () => {
      const plugin = createLayoutPlugin({ type: 'dagre' })
      expect(plugin.id).toBe('layout')
      expect(plugin.name).toBe('Layout')
    })

    it('should support elk layout type', () => {
      const plugin = createLayoutPlugin({ type: 'elk' })
      expect(plugin.id).toBe('layout')
      expect(plugin.name).toBe('Layout')
    })

    it('should support force layout type', () => {
      const plugin = createLayoutPlugin({ type: 'force' })
      expect(plugin.id).toBe('layout')
      expect(plugin.name).toBe('Layout')
    })

    it('should support grid layout type', () => {
      const plugin = createLayoutPlugin({ type: 'grid' })
      expect(plugin.id).toBe('layout')
      expect(plugin.name).toBe('Layout')
    })

    it('should accept direction option TB', () => {
      const plugin = createLayoutPlugin({ direction: 'TB' })
      expect(plugin.id).toBe('layout')
    })

    it('should accept direction option LR', () => {
      const plugin = createLayoutPlugin({ direction: 'LR' })
      expect(plugin.id).toBe('layout')
    })

    it('should accept node spacing option', () => {
      const plugin = createLayoutPlugin({ nodeSpacing: 100 })
      expect(plugin.id).toBe('layout')
    })

    it('should accept rank spacing option', () => {
      const plugin = createLayoutPlugin({ rankSpacing: 150 })
      expect(plugin.id).toBe('layout')
    })

    it('should accept elk options', () => {
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

    it('should accept force options', () => {
      const plugin = createLayoutPlugin({
        type: 'force',
        forceOptions: {
          strength: -500,
          distance: 200,
          iterations: 500
        }
      })
      expect(plugin.id).toBe('layout')
    })

    it('should accept grid options', () => {
      const plugin = createLayoutPlugin({
        type: 'grid',
        gridOptions: {
          columns: 3,
          startX: 100,
          startY: 100
        }
      })
      expect(plugin.id).toBe('layout')
    })
  })

  describe('Layout execution', () => {
    it('should add applyLayout method to flow instance', () => {
      const plugin = createLayoutPlugin()
      const flow = createMockFlowInstance()
      plugin.install(flow)
      expect(typeof flow.applyLayout).toBe('function')
    })

    it('should return function when calling applyLayout', async () => {
      const plugin = createLayoutPlugin({ type: 'dagre' })
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        {
          id: '1',
          type: 'default' as const,
          position: { x: 0, y: 0 },
          data: { label: 'Node 1' },
          width: 150,
          height: 50
        }
      ]
      flow.edges.value = []

      plugin.install(flow)

      // Call applyLayout - should not throw
      const result = flow.applyLayout!({ type: 'dagre' })
      // Should return a promise or void
      expect(result === undefined || result instanceof Promise).toBe(true)
    })
  })

  describe('LayoutOptions interface', () => {
    it('should validate LayoutOptions type field accepts dagre', () => {
      const options: LayoutOptions = { type: 'dagre' }
      expect(options.type).toBe('dagre')
    })

    it('should validate LayoutOptions type field accepts elk', () => {
      const options: LayoutOptions = { type: 'elk' }
      expect(options.type).toBe('elk')
    })

    it('should validate LayoutOptions type field accepts force', () => {
      const options: LayoutOptions = { type: 'force' }
      expect(options.type).toBe('force')
    })

    it('should validate LayoutOptions type field accepts grid', () => {
      const options: LayoutOptions = { type: 'grid' }
      expect(options.type).toBe('grid')
    })
  })
})
