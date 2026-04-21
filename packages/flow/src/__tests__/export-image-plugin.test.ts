import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { createExportPlugin } from '../plugins/plugins/export'
import * as screenshot from '../utils/screenshot'

vi.mock('../utils/screenshot', () => ({
  captureElement: vi.fn().mockResolvedValue({
    dataUrl: 'data:image/png;base64,xx',
    blob: new Blob(),
    extension: 'png'
  }),
  triggerDownload: vi.fn(),
  copyBlobToClipboard: vi.fn().mockResolvedValue(undefined)
}))

function createMockFlow(overrides: Partial<FlowInstance> = {}): FlowInstance {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
  const el = document.createElement('div')
  return {
    nodes,
    edges,
    viewport,
    draggingNodeId: ref(null),
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
    $el: el,
    usePlugin: vi.fn(),
    removePlugin: vi.fn(),
    ...overrides
  }
}

describe('flow export plugin exportImage', () => {
  beforeEach(() => {
    vi.mocked(screenshot.captureElement).mockClear()
    vi.mocked(screenshot.triggerDownload).mockClear()
    vi.mocked(screenshot.copyBlobToClipboard).mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('captures viewport and triggers download by default', async () => {
    const flow = createMockFlow()
    const plugin = createExportPlugin({ fileName: 'chart' })
    plugin.install(flow)
    await flow.exportImage!()
    expect(screenshot.captureElement).toHaveBeenCalled()
    expect(screenshot.triggerDownload).toHaveBeenCalled()
  })

  it('throws when no container is available', async () => {
    const flow = createMockFlow({ $el: undefined })
    const plugin = createExportPlugin()
    plugin.install(flow)
    await expect(flow.exportImage!()).rejects.toThrow(/No element found/)
  })

  it('uses explicit HTMLElement as capture target', async () => {
    const flow = createMockFlow({ $el: undefined })
    const plugin = createExportPlugin()
    plugin.install(flow)
    const box = document.createElement('div')
    await flow.exportImage!(box)
    expect(screenshot.captureElement).toHaveBeenCalledWith(
      box,
      expect.objectContaining({
        imageType: 'png',
        pixelRatio: 2
      })
    )
  })

  it('skips download when download: false', async () => {
    const flow = createMockFlow()
    const plugin = createExportPlugin()
    plugin.install(flow)
    await flow.exportImage!({ download: false })
    expect(screenshot.triggerDownload).not.toHaveBeenCalled()
  })

  it('copies to clipboard when copyToClipboard is true', async () => {
    const flow = createMockFlow()
    const plugin = createExportPlugin()
    plugin.install(flow)
    await flow.exportImage!({ copyToClipboard: true })
    expect(screenshot.copyBlobToClipboard).toHaveBeenCalled()
  })

  it('uses full mode with fitView and restores viewport', async () => {
    const vp = { x: 1, y: 2, zoom: 1.5 }
    const flow = createMockFlow({
      getViewport: vi.fn(() => vp),
      fitView: vi.fn()
    })
    const plugin = createExportPlugin()
    plugin.install(flow)
    await flow.exportImage!({ mode: 'full', fullModePadding: 12 })
    expect(flow.fitView).toHaveBeenCalledWith({ padding: 12 })
    expect(flow.setViewport).toHaveBeenCalledWith(vp)
  })
})
