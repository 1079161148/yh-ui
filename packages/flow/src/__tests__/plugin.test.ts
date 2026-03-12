import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import { PluginManager, createPlugin } from '../plugins/plugin'

function createMockFlowInstance() {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
  return {
    nodes,
    edges,
    viewport,
    addNode: vi.fn((node: Node) => {
      nodes.value = [...nodes.value, node]
    }),
    removeNode: vi.fn(),
    updateNode: vi.fn(),
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
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    isValidConnection: null,
    screenToCanvas: vi.fn((x: number, y: number) => ({ x, y })),
    canvasToScreen: vi.fn((x: number, y: number) => ({ x, y })),
    usePlugin: vi.fn(),
    removePlugin: vi.fn()
  } as any
}

describe('flow/plugins/plugin', () => {
  it('PluginManager should register and unregister plugin', () => {
    const flow = createMockFlowInstance()
    const pm = new PluginManager()
    pm.init(flow)

    const install = vi.fn()
    const plugin = {
      id: 'test-plugin',
      name: 'Test',
      install
    }

    pm.register(plugin)
    expect(install).toHaveBeenCalledWith(flow, undefined)
    expect(pm.hasPlugin('test-plugin')).toBe(true)
    expect(pm.getPlugin('test-plugin')).toBe(plugin)

    pm.unregister('test-plugin')
    expect(pm.hasPlugin('test-plugin')).toBe(false)
    expect(pm.getPlugin('test-plugin')).toBeUndefined()
  })

  it('PluginManager should call destroy on unregister', () => {
    const flow = createMockFlowInstance()
    const pm = new PluginManager()
    pm.init(flow)
    const destroy = vi.fn()
    pm.register({
      id: 'd',
      name: 'D',
      install: vi.fn(),
      destroy
    })
    pm.unregister('d')
    expect(destroy).toHaveBeenCalledTimes(1)
  })

  it('PluginManager should not register same id twice', () => {
    const flow = createMockFlowInstance()
    const pm = new PluginManager()
    pm.init(flow)
    const install = vi.fn()
    const plugin = { id: 'dup', name: 'Dup', install }
    pm.register(plugin)
    pm.register(plugin)
    expect(install).toHaveBeenCalledTimes(1)
  })

  it('createPlugin should produce plugin with install', () => {
    const flow = createMockFlowInstance()
    const installFn = vi.fn()
    const plugin = createPlugin({ id: 'factory', name: 'Factory' }, installFn)
    expect(plugin.id).toBe('factory')
    expect(plugin.name).toBe('Factory')
    plugin.install(flow)
    expect(installFn).toHaveBeenCalledWith(flow, { id: 'factory', name: 'Factory' })
  })

  it('createPlugin with enabled false should not call install', () => {
    const flow = createMockFlowInstance()
    const installFn = vi.fn()
    const plugin = createPlugin({ id: 'disabled', name: 'Disabled', enabled: false }, installFn)
    plugin.install(flow)
    expect(installFn).not.toHaveBeenCalled()
  })

  it('destroyAll should clear all and call destroy', () => {
    const flow = createMockFlowInstance()
    const pm = new PluginManager()
    pm.init(flow)
    const destroy = vi.fn()
    pm.register({ id: 'a', name: 'A', install: vi.fn(), destroy })
    pm.register({ id: 'b', name: 'B', install: vi.fn() })
    pm.destroyAll()
    expect(destroy).toHaveBeenCalledTimes(1)
    expect(pm.getPlugins()).toHaveLength(0)
  })
})
