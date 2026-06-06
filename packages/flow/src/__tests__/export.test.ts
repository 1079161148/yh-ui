import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { createExportPlugin } from '../plugins/plugins/export'

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

describe('flow/plugins/plugins/export', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.useFakeTimers({ shouldAdvanceTime: false })
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    vi.useRealTimers()
  })

  describe('createExportPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createExportPlugin()
      expect(plugin.id).toBe('export')
      expect(plugin.name).toBe('Export')
    })

    it('should install exportJson method', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = [
        { id: 'n1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } }
      ]
      flow.edges.value = [{ id: 'e1', source: 'n1', target: 'n2', type: 'default' }]

      const plugin = createExportPlugin()
      plugin.install(flow)

      expect(typeof flow.exportJson).toBe('function')
    })

    it('should exportJson return correct JSON structure', () => {
      const flow = createMockFlowInstance()
      const testNode = { id: 'n1', type: 'default', position: { x: 100, y: 200 }, data: {} }
      flow.nodes.value = [testNode]
      flow.edges.value = [{ id: 'e1', source: 'n1', target: 'n2', type: 'default' }]

      const plugin = createExportPlugin()
      plugin.install(flow)

      const json = flow.exportJson!()
      const parsed = JSON.parse(json)

      expect(parsed.nodes).toHaveLength(1)
      expect(parsed.edges).toHaveLength(1)
      expect(parsed.nodes[0].id).toBe('n1')
    })

    it('should exportJson with formatted output', () => {
      const flow = createMockFlowInstance()
      flow.nodes.value = []
      flow.edges.value = []

      const plugin = createExportPlugin()
      plugin.install(flow)

      const json = flow.exportJson!()
      // Formatted with 2-space indent
      expect(json).toContain('\n')
    })

    it('should include viewport in exportJson', () => {
      const flow = createMockFlowInstance()
      flow.viewport.value = { x: 50, y: 100, zoom: 1.5 }

      const plugin = createExportPlugin()
      plugin.install(flow)

      const json = flow.exportJson!()
      const parsed = JSON.parse(json)

      expect(parsed.viewport).toEqual({ x: 50, y: 100, zoom: 1.5 })
    })

    it('should support custom fileName option', () => {
      const plugin = createExportPlugin({ fileName: 'custom-flow-name' })
      expect(plugin.id).toBe('export')
    })

    it('should support different image types', () => {
      const pluginPng = createExportPlugin({ imageType: 'png' })
      const pluginJpeg = createExportPlugin({ imageType: 'jpeg' })
      const pluginWebp = createExportPlugin({ imageType: 'webp' })

      expect(pluginPng.id).toBe('export')
      expect(pluginJpeg.id).toBe('export')
      expect(pluginWebp.id).toBe('export')
    })

    it('should support custom imageQuality', () => {
      const plugin = createExportPlugin({ imageQuality: 0.8 })
      expect(plugin.id).toBe('export')
    })

    it('should support custom pixelRatio', () => {
      const plugin = createExportPlugin({ pixelRatio: 3 })
      expect(plugin.id).toBe('export')
    })

    it('should support custom backgroundColor', () => {
      const plugin = createExportPlugin({ backgroundColor: '#f0f0f0' })
      expect(plugin.id).toBe('export')
    })

    it('should support exportImage disabled', () => {
      const plugin = createExportPlugin({ exportImage: false })
      const flow = createMockFlowInstance()
      plugin.install(flow)

      expect(flow.exportImage).toBeUndefined()
    })

    it('should support exportJson disabled', () => {
      const plugin = createExportPlugin({ exportJson: false })
      const flow = createMockFlowInstance()
      plugin.install(flow)

      expect(flow.exportJson).toBeUndefined()
    })

    it('should not install when enabled is false', () => {
      const plugin = createExportPlugin({ enabled: false })
      const flow = createMockFlowInstance()
      plugin.install(flow)

      expect(flow.exportJson).toBeUndefined()
      expect(flow.exportImage).toBeUndefined()
    })

    it('should merge default options with provided options', () => {
      const plugin = createExportPlugin({ fileName: 'test', imageType: 'jpeg' })
      expect(plugin.id).toBe('export')
      expect(plugin.name).toBe('Export')
    })
  })

  describe('ExportPluginOptions interface', () => {
    it('should accept all option fields', () => {
      const options = {
        enabled: true,
        fileName: 'my-flow',
        exportImage: true,
        exportJson: true,
        imageType: 'png' as const,
        imageQuality: 0.9,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      }

      const plugin = createExportPlugin(options)
      expect(plugin.id).toBe('export')
    })

    it('should accept partial options', () => {
      const plugin = createExportPlugin({ fileName: 'partial' })
      expect(plugin.id).toBe('export')
    })
  })
})
