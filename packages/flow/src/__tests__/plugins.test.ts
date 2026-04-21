import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { createControlsPlugin } from '../plugins/plugins/controls'
import { createGridPlugin } from '../plugins/plugins/grid'
import { createKeyboardPlugin } from '../plugins/plugins/keyboard'
import { createMiniMapPlugin } from '../plugins/plugins/minimap'
import { createSnapPlugin } from '../plugins/plugins/snap'

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

describe('flow/plugins/plugins/controls', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('createControlsPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createControlsPlugin()
      expect(plugin.id).toBe('controls')
      expect(plugin.name).toBe('Controls')
      expect(plugin.version).toBe('1.0.0')
      expect(plugin.description).toBe('Displays a set of controls for zooming and fitting the view')
    })

    it('should have a component', () => {
      const plugin = createControlsPlugin()
      expect(plugin.component).toBeDefined()
    })

    it('should install with default options', () => {
      const flow = createMockFlowInstance()
      const plugin = createControlsPlugin()
      plugin.install(flow)
      expect(consoleLogSpy).toHaveBeenCalledWith('[Controls Plugin] Installed')
    })

    it('should merge custom options', () => {
      const plugin = createControlsPlugin({
        enabled: true,
        position: 'top-right',
        showZoom: true,
        showFitView: false,
        showInteractive: false
      })
      expect(plugin.componentProps).toEqual({
        position: 'top-right',
        showZoom: true,
        showFitView: false,
        showInteractive: false
      })
    })

    it('should use default position when not provided', () => {
      const plugin = createControlsPlugin()
      expect(plugin.componentProps?.position).toBe('bottom-left')
    })

    it('should use default show options', () => {
      const plugin = createControlsPlugin()
      expect(plugin.componentProps?.showZoom).toBe(true)
      expect(plugin.componentProps?.showFitView).toBe(true)
      expect(plugin.componentProps?.showInteractive).toBe(true)
    })

    it('should support all position options', () => {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ]
      for (const pos of positions) {
        const plugin = createControlsPlugin({ position: pos })
        expect(plugin.componentProps?.position).toBe(pos)
      }
    })
  })
})

describe('flow/plugins/plugins/grid', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('createGridPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createGridPlugin()
      expect(plugin.id).toBe('grid')
      expect(plugin.name).toBe('Grid')
      expect(plugin.version).toBe('1.0.0')
      expect(plugin.description).toBe('Displays a grid or dots background')
    })

    it('should have a component', () => {
      const plugin = createGridPlugin()
      expect(plugin.component).toBeDefined()
    })

    it('should install with default options', () => {
      const flow = createMockFlowInstance()
      const plugin = createGridPlugin()
      plugin.install(flow)
      expect(consoleLogSpy).toHaveBeenCalledWith('[Grid Plugin] Installed')
    })

    it('should merge custom options', () => {
      const plugin = createGridPlugin({
        enabled: true,
        type: 'grid',
        color: '#ff0000',
        gap: 30
      })
      expect(plugin.componentProps).toEqual({
        type: 'grid',
        color: '#ff0000',
        gap: 30
      })
    })

    it('should use default type dots', () => {
      const plugin = createGridPlugin()
      expect(plugin.componentProps?.type).toBe('dots')
    })

    it('should use default gap', () => {
      const plugin = createGridPlugin()
      expect(plugin.componentProps?.gap).toBe(20)
    })

    it('should use default color', () => {
      const plugin = createGridPlugin()
      expect(plugin.componentProps?.color).toBe('#e5e5e5')
    })

    it('should support grid type', () => {
      const plugin = createGridPlugin({ type: 'grid' })
      expect(plugin.componentProps?.type).toBe('grid')
    })
  })
})

describe('flow/plugins/plugins/keyboard', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('createKeyboardPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createKeyboardPlugin()
      expect(plugin.id).toBe('keyboard')
      expect(plugin.name).toBe('Keyboard')
    })

    it('should install with default options', () => {
      const flow = createMockFlowInstance()
      const plugin = createKeyboardPlugin()
      plugin.install(flow)
      expect(consoleLogSpy).toHaveBeenCalledWith('Keyboard plugin installed', {
        enabled: true,
        delete: true,
        backspace: true,
        ctrlZ: true,
        ctrlY: true,
        escape: true
      })
    })

    it('should merge custom options', () => {
      const plugin = createKeyboardPlugin({
        enabled: false,
        delete: false,
        backspace: false,
        ctrlZ: false,
        ctrlY: false,
        escape: false
      })
      plugin.install(createMockFlowInstance())
      expect(consoleLogSpy).toHaveBeenCalledWith('Keyboard plugin installed', {
        enabled: false,
        delete: false,
        backspace: false,
        ctrlZ: false,
        ctrlY: false,
        escape: false
      })
    })

    it('should accept partial options', () => {
      const plugin = createKeyboardPlugin({ delete: false })
      expect(plugin.id).toBe('keyboard')
    })

    it('should override individual options', () => {
      const plugin = createKeyboardPlugin({
        ctrlZ: false,
        ctrlY: false
      })
      plugin.install(createMockFlowInstance())
      expect(consoleLogSpy).toHaveBeenCalledWith('Keyboard plugin installed', {
        enabled: true,
        delete: true,
        backspace: true,
        ctrlZ: false,
        ctrlY: false,
        escape: true
      })
    })
  })
})

describe('flow/plugins/plugins/minimap', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('createMiniMapPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.id).toBe('minimap')
      expect(plugin.name).toBe('Minimap')
      expect(plugin.version).toBe('1.0.0')
      expect(plugin.description).toBe('Displays a minimap for navigation')
    })

    it('should have a component', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.component).toBeDefined()
    })

    it('should install with default options', () => {
      const flow = createMockFlowInstance()
      const plugin = createMiniMapPlugin()
      plugin.install(flow)
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    it('should use default position bottom-right', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.componentProps?.position).toBe('bottom-right')
    })

    it('should use default dimensions', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.componentProps?.width).toBe(200)
      expect(plugin.componentProps?.height).toBe(150)
    })

    it('should use default mask colors', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.componentProps?.maskColor).toBe('rgba(240, 240, 240, 0.6)')
      expect(plugin.componentProps?.maskStrokeColor).toBe('#ddd')
      expect(plugin.componentProps?.maskStrokeWidth).toBe(1)
    })

    it('should use default pannable and zoomable', () => {
      const plugin = createMiniMapPlugin()
      expect(plugin.componentProps?.pannable).toBe(true)
      expect(plugin.componentProps?.zoomable).toBe(true)
    })

    it('should support custom position', () => {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ]
      for (const pos of positions) {
        const plugin = createMiniMapPlugin({ position: pos })
        expect(plugin.componentProps?.position).toBe(pos)
      }
    })

    it('should support custom dimensions', () => {
      const plugin = createMiniMapPlugin({ width: 300, height: 200 })
      expect(plugin.componentProps?.width).toBe(300)
      expect(plugin.componentProps?.height).toBe(200)
    })

    it('should support custom node color functions', () => {
      const customNodeColor = (node: Node) => '#ff0000'
      const customNodeStrokeColor = (node: Node) => '#00ff00'
      const plugin = createMiniMapPlugin({
        nodeColor: customNodeColor,
        nodeStrokeColor: customNodeStrokeColor
      })
      expect(plugin.componentProps?.nodeColor).toBe(customNodeColor)
      expect(plugin.componentProps?.nodeStrokeColor).toBe(customNodeStrokeColor)
    })

    it('should support interactive option', () => {
      const pluginEnabled = createMiniMapPlugin({ interactive: true })
      const pluginDisabled = createMiniMapPlugin({ interactive: false })
      expect(pluginEnabled.componentProps?.interactive).toBe(true)
      expect(pluginDisabled.componentProps?.interactive).toBe(false)
    })

    it('should support layout controls options', () => {
      const plugin = createMiniMapPlugin({
        showLayoutControls: true,
        layoutType: 'dagre',
        layoutDirection: 'LR'
      })
      expect(plugin.componentProps?.showLayoutControls).toBe(true)
      expect(plugin.componentProps?.layoutType).toBe('dagre')
      expect(plugin.componentProps?.layoutDirection).toBe('LR')
    })

    it('should support all layout directions', () => {
      const directions: Array<'TB' | 'BT' | 'LR' | 'RL'> = ['TB', 'BT', 'LR', 'RL']
      for (const dir of directions) {
        const plugin = createMiniMapPlugin({ layoutDirection: dir })
        expect(plugin.componentProps?.layoutDirection).toBe(dir)
      }
    })

    it('should support all layout types', () => {
      const types: Array<'dagre' | 'elk' | 'force' | 'grid' | 'none'> = [
        'dagre',
        'elk',
        'force',
        'grid',
        'none'
      ]
      for (const type of types) {
        const plugin = createMiniMapPlugin({ layoutType: type })
        expect(plugin.componentProps?.layoutType).toBe(type)
      }
    })
  })
})

describe('flow/plugins/plugins/snap', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('createSnapPlugin', () => {
    it('should create plugin with correct id and name', () => {
      const plugin = createSnapPlugin()
      expect(plugin.id).toBe('snap')
      expect(plugin.name).toBe('Snap')
      expect(plugin.version).toBe('1.0.0')
      expect(plugin.description).toBe('Enables grid snapping and alignment lines')
    })

    it('should have a component when showAlignmentLines is true', () => {
      const plugin = createSnapPlugin({ showAlignmentLines: true })
      expect(plugin.component).toBeDefined()
    })

    it('should not have a component when showAlignmentLines is false', () => {
      const plugin = createSnapPlugin({ showAlignmentLines: false })
      expect(plugin.component).toBeUndefined()
    })

    it('should install with default options', () => {
      const flow = createMockFlowInstance()
      const plugin = createSnapPlugin()
      plugin.install(flow)
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    it('should not install when enabled is false', () => {
      const flow = createMockFlowInstance()
      const plugin = createSnapPlugin({ enabled: false })
      plugin.install(flow)
      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('should use default snap options', () => {
      const plugin = createSnapPlugin()
      expect(plugin.componentProps?.snapThreshold).toBe(10)
    })

    it('should support custom snap options', () => {
      const plugin = createSnapPlugin({
        snapToGrid: true,
        gridSize: 20,
        snapThreshold: 15
      })
      expect(plugin.componentProps?.snapThreshold).toBe(15)
    })
  })
})
