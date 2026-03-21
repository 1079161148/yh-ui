import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { createNodeGroupPlugin } from '../plugins/plugins/node-group'
import type { Node, Edge, FlowInstance } from '../types'

// ============================================================
// createNodeGroupPlugin - 节点成组插件测试
// ============================================================

function createMockFlow(
  initialNodes: Node[] = [],
  initialEdges: Edge[] = []
): FlowInstance & Record<string, unknown> {
  const nodes = ref<Node[]>(initialNodes)
  const edges = ref<Edge[]>(initialEdges)

  const flow = {
    nodes,
    edges,
    viewport: ref({ x: 0, y: 0, zoom: 1 }),
    addNode: vi.fn((node: Node) => {
      nodes.value = [...nodes.value, node]
    }),
    removeNode: vi.fn((id: string) => {
      nodes.value = nodes.value.filter((n) => n.id !== id)
    }),
    updateNode: vi.fn((id: string, data: Partial<Node>) => {
      nodes.value = nodes.value.map((n) => (n.id === id ? { ...n, ...data } : n))
    }),
    getNode: vi.fn((id: string) => nodes.value.find((n) => n.id === id)),
    addEdge: vi.fn(),
    removeEdge: vi.fn(),
    updateEdge: vi.fn((id: string, data: Partial<Edge>) => {
      edges.value = edges.value.map((e) => (e.id === id ? { ...e, ...data } : e))
    }),
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
    on: vi.fn(),
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

describe('createNodeGroupPlugin', () => {
  it('should be created with correct metadata', () => {
    const plugin = createNodeGroupPlugin()
    expect(plugin.id).toBe('node-group')
    expect(plugin.name).toBe('NodeGroup')
  })

  it('should expose groupSelectedNodes on flow instance after install', () => {
    const flow = createMockFlow()
    const plugin = createNodeGroupPlugin()
    plugin.install(flow)

    expect(typeof (flow as Record<string, unknown>).groupSelectedNodes).toBe('function')
    expect(typeof (flow as Record<string, unknown>).ungroupNodes).toBe('function')
    expect(typeof (flow as Record<string, unknown>).toggleGroupCollapse).toBe('function')
    expect(typeof (flow as Record<string, unknown>).isGroupCollapsed).toBe('function')
    expect(typeof (flow as Record<string, unknown>).getGroupChildren).toBe('function')
    expect(typeof (flow as Record<string, unknown>).getGroupRegistry).toBe('function')
  })

  it('should return null when fewer than 2 nodes are selected', () => {
    const nodes: Node[] = [
      { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {}, selected: true }
    ]
    const flow = createMockFlow(nodes)
    const plugin = createNodeGroupPlugin()
    plugin.install(flow)

    const result = (flow as Record<string, unknown>).groupSelectedNodes as (
      label?: string
    ) => string | null
    expect(result()).toBeNull()
  })

  it('should create a group node when 2+ nodes are selected', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'default',
        position: { x: 100, y: 100 },
        data: {},
        selected: true,
        width: 150,
        height: 50
      },
      {
        id: '2',
        type: 'default',
        position: { x: 300, y: 100 },
        data: {},
        selected: true,
        width: 150,
        height: 50
      }
    ]
    const flow = createMockFlow(nodes)
    const plugin = createNodeGroupPlugin({ groupIdPrefix: 'grp' })
    plugin.install(flow)

    const groupSelected = (flow as Record<string, unknown>).groupSelectedNodes as (
      label?: string
    ) => string | null
    const groupId = groupSelected('Test Group')

    expect(groupId).toBeTruthy()
    expect(groupId).toMatch(/^grp-/)
    // addNode 应该被调用（创建 group 节点）
    expect(flow.addNode).toHaveBeenCalled()
  })

  it('should register group info in registry after grouping', () => {
    const nodes: Node[] = [
      {
        id: 'a',
        type: 'default',
        position: { x: 50, y: 50 },
        data: {},
        selected: true,
        width: 100,
        height: 50
      },
      {
        id: 'b',
        type: 'default',
        position: { x: 200, y: 50 },
        data: {},
        selected: true,
        width: 100,
        height: 50
      }
    ]
    const flow = createMockFlow(nodes)
    const plugin = createNodeGroupPlugin()
    plugin.install(flow)

    const groupSelected = (flow as Record<string, unknown>).groupSelectedNodes as (
      label?: string
    ) => string | null
    const groupId = groupSelected()!

    const registry = (
      (flow as Record<string, unknown>).getGroupRegistry as () => Map<string, unknown>
    )()
    expect(registry.has(groupId)).toBe(true)
  })

  it('should toggle group collapse and hide children', () => {
    const childNodes: Node[] = [
      {
        id: 'c1',
        type: 'default',
        position: { x: 20, y: 20 },
        data: {},
        parentId: 'group-1',
        width: 100,
        height: 40
      }
    ]
    const flow = createMockFlow(childNodes)
    const plugin = createNodeGroupPlugin()
    plugin.install(flow)

    // 手动注入分组信息
    const registry = (
      (flow as Record<string, unknown>).getGroupRegistry as () => Map<string, unknown>
    )()
    registry.set('group-1', {
      groupId: 'group-1',
      childIds: ['c1'],
      collapsed: false,
      originalPositions: {}
    })

    // 模拟 group 节点存在
    flow.nodes.value.push({
      id: 'group-1',
      type: 'group',
      position: { x: 0, y: 0 },
      data: {},
      style: { width: 200, height: 150 },
      width: 200,
      height: 150
    })

    const toggleCollapse = (flow as Record<string, unknown>).toggleGroupCollapse as (
      id: string
    ) => void
    toggleCollapse('group-1')

    // updateNode 应该被调用来隐藏子节点
    expect(flow.updateNode).toHaveBeenCalledWith('c1', expect.objectContaining({ hidden: true }))
  })

  it('should cleanup registry on destroy', () => {
    const flow = createMockFlow()
    const plugin = createNodeGroupPlugin()
    plugin.install(flow)

    plugin.destroy?.()

    const registry = (
      (flow as Record<string, unknown>).getGroupRegistry as () => Map<string, unknown>
    )()
    expect(registry.size).toBe(0)
  })

  it('should not install when disabled', () => {
    const flow = createMockFlow()
    const plugin = createNodeGroupPlugin({ enabled: false })
    plugin.install(flow)

    // 因为 enabled=false，不应挂载方法
    expect((flow as Record<string, unknown>).groupSelectedNodes).toBeUndefined()
  })
})
