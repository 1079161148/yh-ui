import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { createHistoryPlugin } from '../plugins/plugins/history'
import type { Node, Edge, FlowInstance } from '../types'

// ============================================================
// createHistoryPlugin - 历史记录插件测试
// ============================================================

function createMockFlow(): FlowInstance & Record<string, unknown> {
  const nodes = ref<Node[]>([
    { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'A' } }
  ])
  const edges = ref<Edge[]>([])

  const eventHandlers: Record<string, ((...args: unknown[]) => void)[]> = {}

  const flow = {
    nodes,
    edges,
    viewport: ref({ x: 0, y: 0, zoom: 1 }),
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
    getNodes: () => nodes.value,
    getEdges: () => edges.value,
    getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
    screenToCanvas: vi.fn().mockReturnValue({ x: 0, y: 0 }),
    canvasToScreen: vi.fn().mockReturnValue({ x: 0, y: 0 }),
    on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
      if (!eventHandlers[event]) eventHandlers[event] = []
      eventHandlers[event].push(handler)
    }),
    off: vi.fn(),
    emit: vi.fn(),
    isValidConnection: vi.fn().mockReturnValue(true),
    $el: undefined,
    draggingNodeId: ref(null),
    draggingPosition: ref(null),
    usePlugin: vi.fn(),
    removePlugin: vi.fn()
  }

  return flow as unknown as FlowInstance & Record<string, unknown>
}

describe('createHistoryPlugin', () => {
  it('should be created with correct metadata', () => {
    const plugin = createHistoryPlugin()
    expect(plugin.id).toBe('history')
    expect(plugin.name).toBe('History')
    expect(plugin.version).toBe('1.0.0')
  })

  it('should install and expose undo/redo on flow instance', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    expect(typeof (flow as unknown as Record<string, unknown>).undo).toBe('function')
    expect(typeof (flow as unknown as Record<string, unknown>).redo).toBe('function')
    expect(typeof (flow as unknown as Record<string, unknown>).saveSnapshot).toBe('function')
    expect(typeof (flow as unknown as Record<string, unknown>).clearHistory).toBe('function')
    expect(typeof (flow as unknown as Record<string, unknown>).jumpToStep).toBe('function')
    expect(typeof (flow as unknown as Record<string, unknown>).getHistory).toBe('function')
  })

  it('should save initial snapshot on install', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    const history = plugin.getHistory()
    expect(history.length).toBe(1)
    expect(history[0].description).toBe('initial')
  })

  it('should correctly undo and redo node position changes', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    // 修改节点位置后保存快照
    flow.nodes.value[0].position.x = 100
    plugin.saveSnapshot('move node')

    expect(plugin.canUndo.value).toBe(true)
    expect(plugin.canRedo.value).toBe(false)

    // 撤销
    plugin.undo()
    expect(flow.nodes.value[0].position.x).toBe(0)
    expect(plugin.canRedo.value).toBe(true)

    // 重做
    plugin.redo()
    expect(flow.nodes.value[0].position.x).toBe(100)
  })

  it('should clear redo stack when new snapshot is pushed after undo', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    flow.nodes.value[0].position.x = 50
    plugin.saveSnapshot('step1')

    flow.nodes.value[0].position.x = 100
    plugin.saveSnapshot('step2')

    // 撤销到 step1
    plugin.undo()
    expect(flow.nodes.value[0].position.x).toBe(50)
    expect(plugin.canRedo.value).toBe(true)

    // 新操作应清空重做栈
    flow.nodes.value[0].position.x = 200
    plugin.saveSnapshot('step3')
    expect(plugin.canRedo.value).toBe(false)
  })

  it('should respect maxHistory limit', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin({ maxHistory: 3 })
    plugin.install(flow)

    // 保存 5 个快照（含 initial，共超过 maxHistory）
    for (let i = 1; i <= 5; i++) {
      flow.nodes.value[0].position.x = i * 10
      plugin.saveSnapshot(`step${i}`)
    }

    expect(plugin.getHistory().length).toBe(3)
  })

  it('should clear history', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    flow.nodes.value[0].position.x = 100
    plugin.saveSnapshot('move')

    plugin.clearHistory()
    expect(plugin.getHistory().length).toBe(0)
    expect(plugin.canUndo.value).toBe(false)
    expect(plugin.canRedo.value).toBe(false)
  })

  it('should call onHistoryChange callback', () => {
    const onHistoryChange = vi.fn()
    const flow = createMockFlow()
    const plugin = createHistoryPlugin({ onHistoryChange })
    plugin.install(flow)

    // install 时会保存 initial 快照，触发通知
    expect(onHistoryChange).toHaveBeenCalled()
  })

  it('should jump to a specific step', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    flow.nodes.value[0].position.x = 100
    plugin.saveSnapshot('step1')

    flow.nodes.value[0].position.x = 200
    plugin.saveSnapshot('step2')

    // 跳回 step0 (initial)
    plugin.jumpToStep(0)
    expect(flow.nodes.value[0].position.x).toBe(0)
  })

  it('should not undo below 0 or redo beyond end', () => {
    const flow = createMockFlow()
    const plugin = createHistoryPlugin()
    plugin.install(flow)

    // 初始只有 1 个快照，canUndo = false
    expect(plugin.canUndo.value).toBe(false)
    plugin.undo() // 不应抛错

    expect(plugin.canRedo.value).toBe(false)
    plugin.redo() // 不应抛错
  })

  it('should destroy and cleanup', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    const flow = createMockFlow()
    const plugin = createHistoryPlugin({ enableKeyboard: true })
    plugin.install(flow)

    plugin.destroy?.()
    expect(removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
