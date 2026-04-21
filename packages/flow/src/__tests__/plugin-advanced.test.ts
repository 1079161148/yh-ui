import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import type { FlowInstance } from '../types'
import { PluginManager, createPlugin, withHooks, type PluginHooks } from '../plugins/plugin'

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

describe('flow/plugins/plugin - withHooks', () => {
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
  })

  describe('PluginManager - edge cases', () => {
    it('should warn when unregistering non-existent plugin', () => {
      const pm = new PluginManager()
      pm.unregister('non-existent')
      expect(consoleWarnSpy).toHaveBeenCalledWith('[YhFlow] Plugin non-existent not found')
    })

    it('should warn when registering without init and no options', () => {
      const pm = new PluginManager()
      const install = vi.fn()
      pm.register({ id: 'n', name: 'N', install })
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[YhFlow] PluginManager not initialized, call init() first or provide flow instance'
      )
      expect(install).not.toHaveBeenCalled()
    })

    it('should register with options as flow instance fallback', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      const install = vi.fn()
      pm.register({ id: 'fallback', name: 'Fallback', install }, flow as unknown as Record<string, unknown>)
      expect(install).toHaveBeenCalledWith(flow, flow)
    })

    it('should log when plugin is registered', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      pm.init(flow)
      pm.register({ id: 'log-test', name: 'LogTest', install: vi.fn() })
      expect(consoleLogSpy).toHaveBeenCalledWith('[YhFlow] Plugin LogTest (log-test) registered')
    })

    it('should log when plugin is unregistered', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      pm.init(flow)
      pm.register({ id: 'ul', name: 'UL', install: vi.fn() })
      pm.unregister('ul')
      expect(consoleLogSpy).toHaveBeenCalledWith('[YhFlow] Plugin UL (ul) unregistered')
    })

    it('should not call destroy if plugin has no destroy method', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      pm.init(flow)
      pm.register({ id: 'no-destroy', name: 'NoDestroy', install: vi.fn() })
      expect(() => pm.unregister('no-destroy')).not.toThrow()
    })
  })

  describe('withHooks', () => {
    it('should wrap plugin with onInit hook', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      pm.init(flow)

      const onInit = vi.fn()
      const install = vi.fn()
      const hooks: PluginHooks = { onInit }

      const basePlugin = createPlugin({ id: 'hooks-test', name: 'HooksTest' }, install)
      const hookedPlugin = withHooks(basePlugin, hooks)

      hookedPlugin.install(flow)
      expect(onInit).toHaveBeenCalled()
    })

    it('should register onViewportChange hook', () => {
      const flow = createMockFlowInstance()
      const onViewportChange = vi.fn()

      const basePlugin = createPlugin({ id: 'vp-hook', name: 'VpHook' }, vi.fn())
      const hookedPlugin = withHooks(basePlugin, { onViewportChange })

      hookedPlugin.install(flow)

      // Simulate viewport:change event
      const onHandler = (flow.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call) => call[0] === 'viewport:change'
      )
      expect(onHandler).toBeDefined()

      // Call the registered handler
      const handler = onHandler![1] as (event: { transform: ViewportTransform }) => void
      handler({ transform: { x: 100, y: 200, zoom: 2 } })
      expect(onViewportChange).toHaveBeenCalledWith({ x: 100, y: 200, zoom: 2 })
    })

    it('should register onNodesChange hook', () => {
      const flow = createMockFlowInstance()
      const onNodesChange = vi.fn()

      const basePlugin = createPlugin({ id: 'nodes-hook', name: 'NodesHook' }, vi.fn())
      const hookedPlugin = withHooks(basePlugin, { onNodesChange })

      hookedPlugin.install(flow)

      const onHandler = (flow.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call) => call[0] === 'node:selected'
      )
      expect(onHandler).toBeDefined()
    })

    it('should register onEdgesChange hook', () => {
      const flow = createMockFlowInstance()
      const onEdgesChange = vi.fn()

      const basePlugin = createPlugin({ id: 'edges-hook', name: 'EdgesHook' }, vi.fn())
      const hookedPlugin = withHooks(basePlugin, { onEdgesChange })

      hookedPlugin.install(flow)

      const onHandler = (flow.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call) => call[0] === 'edge:selected'
      )
      expect(onHandler).toBeDefined()
    })

    it('should call onDestroy when hooked plugin is destroyed', () => {
      const flow = createMockFlowInstance()
      const onDestroy = vi.fn()
      const baseDestroy = vi.fn()

      const basePlugin = createPlugin({ id: 'destroy-hook', name: 'DestroyHook' }, vi.fn())
      basePlugin.destroy = baseDestroy
      const hookedPlugin = withHooks(basePlugin, { onDestroy })

      hookedPlugin.destroy()
      expect(onDestroy).toHaveBeenCalled()
      expect(baseDestroy).toHaveBeenCalled()
    })

    it('should only register hooks that are provided', () => {
      const flow = createMockFlowInstance()
      const onInit = vi.fn()
      const hooks: PluginHooks = { onInit }

      const basePlugin = createPlugin({ id: 'partial-hooks', name: 'PartialHooks' }, vi.fn())
      const hookedPlugin = withHooks(basePlugin, hooks)

      hookedPlugin.install(flow)

      // Only onInit is called; no event registrations since other hooks are not provided
      expect(onInit).toHaveBeenCalled()
    })

    it('should keep plugin metadata from base plugin', () => {
      const basePlugin = createPlugin(
        { id: 'meta', name: 'Meta', version: '1.0.0', description: 'Test plugin' },
        vi.fn()
      )
      const hookedPlugin = withHooks(basePlugin, {})

      expect(hookedPlugin.id).toBe('meta')
      expect(hookedPlugin.name).toBe('Meta')
      expect(hookedPlugin.version).toBe('1.0.0')
      expect(hookedPlugin.description).toBe('Test plugin')
    })
  })

  describe('createPlugin', () => {
    it('should create plugin with default enabled true', () => {
      const installFn = vi.fn()
      const plugin = createPlugin({ id: 'default-enabled', name: 'DefaultEnabled' }, installFn)
      expect(plugin.enabled).toBe(true)
    })

    it('should create plugin with explicit enabled false', () => {
      const installFn = vi.fn()
      const plugin = createPlugin(
        { id: 'explicit-disabled', name: 'ExplicitDisabled', enabled: false },
        installFn
      )
      expect(plugin.enabled).toBe(false)
      plugin.install(createMockFlowInstance())
      expect(installFn).not.toHaveBeenCalled()
    })

    it('should pass options to install function', () => {
      const installFn = vi.fn()
      const plugin = createPlugin(
        { id: 'opts-pass', name: 'OptsPass', version: '2.0.0' },
        installFn
      )
      const flow = createMockFlowInstance()
      plugin.install(flow, { customOption: true })
      expect(installFn).toHaveBeenCalledWith(flow, { id: 'opts-pass', name: 'OptsPass', version: '2.0.0' })
    })
  })

  describe('getPlugins', () => {
    it('should return all registered plugins', () => {
      const pm = new PluginManager()
      const flow = createMockFlowInstance()
      pm.init(flow)

      pm.register({ id: 'p1', name: 'P1', install: vi.fn() })
      pm.register({ id: 'p2', name: 'P2', install: vi.fn() })

      const plugins = pm.getPlugins()
      expect(plugins).toHaveLength(2)
    })
  })
})
