import type { Node, Edge, ViewportTransform, FlowInstance } from '../types'
export type { FlowInstance }

/**
 * 插件生命周期钩子
 */
export interface PluginHooks {
  onInit?: () => void
  onDestroy?: () => void
  onViewportChange?: (viewport: ViewportTransform) => void
  onNodesChange?: (nodes: Node[]) => void
  onEdgesChange?: (edges: Edge[]) => void
  onSelectionChange?: (selectedNodes: Node[], selectedEdges: Edge[]) => void
}

/**
 * 插件配置选项
 */
export interface PluginOptions {
  id: string
  name: string
  version?: string
  description?: string
  enabled?: boolean
}

/**
 * Flow 插件接口
 */
export interface FlowPlugin {
  /** 插件唯一标识 */
  id: string
  /** 插件名称 */
  name: string
  /** 插件版本 */
  version?: string
  /** 插件描述 */
  description?: string
  /** 是否启用 */
  enabled?: boolean
  /** 插件安装函数 */
  install: (flow: FlowInstance, options?: Record<string, unknown>) => void
  /** 插件销毁函数 */
  destroy?: () => void
}

/**
 * 创建插件的配置工厂
 */
export interface FlowPluginFactory<T = Record<string, unknown>> {
  (options?: T): FlowPlugin
}

// ============================================
// Plugin System - 插件系统核心
// ============================================

/**
 * 插件管理器 - 负责插件的注册、加载、卸载
 */
export class PluginManager {
  private plugins: Map<string, FlowPlugin> = new Map()
  private flowInstance: FlowInstance | null = null

  /**
   * 初始化插件管理器
   */
  init(flow: FlowInstance): void {
    this.flowInstance = flow
  }

  /**
   * 注册插件
   */
  register(plugin: FlowPlugin, options?: Record<string, unknown>): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[YhFlow] Plugin ${plugin.id} is already registered, skipping...`)
      return
    }

    // 如果没有通过 init 初始化，尝试使用传入的 options 作为 flow 实例
    const flowInstance = this.flowInstance || (options as unknown as FlowInstance)

    if (!flowInstance) {
      console.error(
        '[YhFlow] PluginManager not initialized, call init() first or provide flow instance'
      )
      return
    }

    // 安装插件
    plugin.install(flowInstance, options)
    this.plugins.set(plugin.id, plugin)

    console.log(`[YhFlow] Plugin ${plugin.name} (${plugin.id}) registered`)
  }

  /**
   * 卸载插件
   */
  unregister(pluginId: string): void {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      console.warn(`[YhFlow] Plugin ${pluginId} not found`)
      return
    }

    // 调用销毁钩子
    if (plugin.destroy) {
      plugin.destroy()
    }

    this.plugins.delete(pluginId)
    console.log(`[YhFlow] Plugin ${plugin.name} (${pluginId}) unregistered`)
  }

  /**
   * 获取已注册的插件
   */
  getPlugin(pluginId: string): FlowPlugin | undefined {
    return this.plugins.get(pluginId)
  }

  /**
   * 获取所有插件
   */
  getPlugins(): FlowPlugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 检查插件是否已注册
   */
  hasPlugin(pluginId: string): boolean {
    return this.plugins.has(pluginId)
  }

  /**
   * 销毁所有插件
   */
  destroyAll(): void {
    this.plugins.forEach((plugin) => {
      if (plugin.destroy) {
        plugin.destroy()
      }
    })
    this.plugins.clear()
  }
}

// ============================================
// Plugin Factory - 插件工厂函数
// ============================================

/**
 * 创建插件的工厂函数
 */
export function createPlugin<T extends PluginOptions>(
  options: T,
  install: (flow: FlowInstance, options: T) => void
): FlowPlugin {
  return {
    id: options.id,
    name: options.name,
    version: options.version,
    description: options.description,
    enabled: options.enabled ?? true,
    install: (flow: FlowInstance) => {
      if (options.enabled !== false) {
        install(flow, options)
      }
    }
  }
}

/**
 * 插件高阶函数 - 添加生命周期钩子支持
 */
export function withHooks(plugin: FlowPlugin, hooks: PluginHooks): FlowPlugin {
  const originalInstall = plugin.install

  return {
    ...plugin,
    install: (flow: FlowInstance, options?: Record<string, unknown>) => {
      // 执行原始安装
      originalInstall(flow, options)

      // 执行 onInit 钩子
      hooks.onInit?.()

      // 注册事件钩子
      if (hooks.onViewportChange) {
        flow.on('viewport:change', (event) => hooks.onViewportChange?.(event.transform))
      }
      if (hooks.onNodesChange) {
        flow.on('node:selected', () => hooks.onNodesChange?.(flow.nodes.value))
      }
      if (hooks.onEdgesChange) {
        flow.on('edge:selected', () => hooks.onEdgesChange?.(flow.edges.value))
      }
    },
    destroy: () => {
      hooks.onDestroy?.()
      plugin.destroy?.()
    }
  }
}
