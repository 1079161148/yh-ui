import type { FlowPlugin, FlowInstance } from '../plugin'

// ============================================
// MiniMap Plugin - 小地图插件
// ============================================

export interface MiniMapPluginOptions {
  enabled?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  width?: number
  height?: number
  nodeColor?: string
  nodeStrokeColor?: string
  maskColor?: string
}

const defaultOptions: Required<MiniMapPluginOptions> = {
  enabled: true,
  position: 'bottom-right',
  width: 200,
  height: 150,
  nodeColor: '#fff',
  nodeStrokeColor: '#999',
  maskColor: 'rgba(240, 240, 240, 0.6)'
}

/**
 * 创建小地图插件
 */
export function createMiniMapPlugin(options: MiniMapPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }
  let container: HTMLElement | null = null

  return {
    id: 'minimap',
    name: 'MiniMap',
    version: '1.0.0',
    description: '显示流程图小地图',

    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return
      console.log(`[MiniMap Plugin] Installed with options:`, mergedOptions)

      flow.on('viewport:change', (event) => {
        if (container) {
          // 在原生插件模式下同步小地图视口
          // 注意: 更推荐直接使用暴露的 <Minimap> Vue 组件（最佳实践）
          console.log('[MiniMap Plugin] Viewport changed:', event)
        }
      })
    },

    destroy() {
      if (container) {
        container.remove()
        container = null
      }
      console.log('[MiniMap Plugin] Destroyed')
    }
  }
}

// ============================================
// Controls Plugin - 控制栏插件
// ============================================

export interface ControlsPluginOptions {
  enabled?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
}

const defaultControlsOptions: Required<ControlsPluginOptions> = {
  enabled: true,
  position: 'bottom-right',
  showZoom: true,
  showFitView: true,
  showInteractive: true
}

/**
 * 创建控制栏插件
 */
export function createControlsPlugin(options: ControlsPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultControlsOptions, ...options }

  return {
    id: 'controls',
    name: 'Controls',
    version: '1.0.0',
    description: '显示缩放控制栏',

    install(_flow: FlowInstance) {
      console.log(`[Controls Plugin] Installed with options:`, mergedOptions)
    },

    destroy() {
      console.log('[Controls Plugin] Destroyed')
    }
  }
}

// ============================================
// Grid Plugin - 网格插件
// ============================================

export interface GridPluginOptions {
  enabled?: boolean
  type?: 'dots' | 'lines' | 'cross'
  color?: string
  distance?: number
}

const defaultGridOptions: Required<GridPluginOptions> = {
  enabled: true,
  type: 'dots',
  color: '#e5e5e5',
  distance: 20
}

/**
 * 创建网格插件
 */
export function createGridPlugin(options: GridPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultGridOptions, ...options }

  return {
    id: 'grid',
    name: 'Grid',
    version: '1.0.0',
    description: '显示网格背景',

    install(_flow: FlowInstance) {
      console.log(`[Grid Plugin] Installed with options:`, mergedOptions)
    },

    destroy() {
      console.log('[Grid Plugin] Destroyed')
    }
  }
}

// ============================================
// Snap Plugin - 吸附插件
// ============================================

export interface SnapPluginOptions {
  enabled?: boolean
  snapToGrid?: boolean
  gridSize?: number
  snapSensitivity?: number
}

const defaultSnapOptions: Required<SnapPluginOptions> = {
  enabled: true,
  snapToGrid: true,
  gridSize: 15,
  snapSensitivity: 10
}

/**
 * 创建吸附插件
 */
export function createSnapPlugin(options: SnapPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultSnapOptions, ...options }

  return {
    id: 'snap',
    name: 'Snap',
    version: '1.0.0',
    description: '启用节点网格吸附',

    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return
      console.log(`[Snap Plugin] Installed with options:`, mergedOptions)

      // 注册节点拖拽结束事件，计算吸附位置
      flow.on('node:dragend', (payload) => {
        if (!payload || !payload.node) return
        const node = payload.node

        if (mergedOptions.snapToGrid) {
          const grid = mergedOptions.gridSize
          const snapX = Math.round(node.position.x / grid) * grid
          const snapY = Math.round(node.position.y / grid) * grid

          if (
            Math.abs(snapX - node.position.x) <= mergedOptions.snapSensitivity &&
            Math.abs(snapY - node.position.y) <= mergedOptions.snapSensitivity
          ) {
            flow.updateNode(node.id, {
              position: { x: snapX, y: snapY }
            })
          }
        }
      })
    },

    destroy() {
      console.log('[Snap Plugin] Destroyed')
    }
  }
}

// ============================================
// Keyboard Plugin - 键盘快捷键插件
// ============================================

export interface KeyboardPluginOptions {
  enabled?: boolean
  delete?: boolean
  copy?: boolean
  paste?: boolean
  undo?: boolean
  redo?: boolean
  selectAll?: boolean
}

const defaultKeyboardOptions: Required<KeyboardPluginOptions> = {
  enabled: true,
  delete: true,
  copy: true,
  paste: true,
  undo: true,
  redo: true,
  selectAll: true
}

/**
 * 创建键盘快捷键插件
 */
export function createKeyboardPlugin(options: KeyboardPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultKeyboardOptions, ...options }
  let keyHandler: ((event: KeyboardEvent) => void) | null = null

  return {
    id: 'keyboard',
    name: 'Keyboard',
    version: '1.0.0',
    description: '启用键盘快捷键支持',

    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return

      console.log(`[Keyboard Plugin] Installed with options:`, mergedOptions)

      keyHandler = (event: KeyboardEvent) => {
        const ctrl = event.ctrlKey || event.metaKey

        // Delete - 删除选中
        if (mergedOptions.delete && (event.key === 'Delete' || event.key === 'Backspace')) {
          // 由 Flow 核心处理
        }

        // Ctrl+Z - 撤销
        if (mergedOptions.undo && ctrl && event.key === 'z' && !event.shiftKey) {
          event.preventDefault()
          // 由 Flow 核心处理
        }

        // Ctrl+Shift+Z / Ctrl+Y - 重做
        if (
          (mergedOptions.redo && ctrl && event.key === 'z' && event.shiftKey) ||
          (ctrl && event.key === 'y')
        ) {
          event.preventDefault()
          // 由 Flow 核心处理
        }

        // Ctrl+A - 全选
        if (mergedOptions.selectAll && ctrl && event.key === 'a') {
          event.preventDefault()
          // 由 Flow 核心处理
        }

        // Escape - 取消选择
        if (event.key === 'Escape') {
          flow.clearSelection()
        }
      }

      document.addEventListener('keydown', keyHandler)
    },

    destroy() {
      if (keyHandler) {
        document.removeEventListener('keydown', keyHandler)
        keyHandler = null
      }
      console.log('[Keyboard Plugin] Destroyed')
    }
  }
}

// ============================================
// Export Plugin - 导出插件
// ============================================

export interface ExportPluginOptions {
  enabled?: boolean
  fileName?: string
  exportImage?: boolean
  exportJson?: boolean
  imageType?: 'png' | 'jpeg' | 'webp'
  imageQuality?: number
}

const defaultExportOptions: Required<ExportPluginOptions> = {
  enabled: true,
  fileName: 'flow-chart',
  exportImage: true,
  exportJson: true,
  imageType: 'png',
  imageQuality: 1
}

/**
 * 创建导出插件
 */
export function createExportPlugin(options: ExportPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultExportOptions, ...options }

  return {
    id: 'export',
    name: 'Export',
    version: '1.0.0',
    description: '导出流程图为图片或 JSON',

    install(flow: FlowInstance) {
      console.log(`[Export Plugin] Installed with options:`, mergedOptions)

      // 导出为 JSON
      const exportJson = () => {
        return JSON.stringify(
          {
            nodes: flow.nodes.value,
            edges: flow.edges.value,
            viewport: flow.viewport.value
          },
          null,
          2
        )
      }

      // 导出为图片
      const exportImage = async (_container?: HTMLElement) => {
        // 使用 html2canvas 或类似库
        console.log('[Export Plugin] Exporting as image...')
      }

      // 挂载到 flow 实例供外部调用
      flow.exportJson = exportJson
      flow.exportImage = exportImage
    },

    destroy() {
      console.log('[Export Plugin] Destroyed')
    }
  }
}

// ============================================
// Layout Plugin - 自动布局插件
// ============================================

export interface LayoutPluginOptions {
  enabled?: boolean
  type?: 'dagre' | 'elk' | 'force'
  direction?: 'TB' | 'BT' | 'LR' | 'RL'
  nodeSpacing?: number
  rankSpacing?: number
}

const defaultLayoutOptions: Required<LayoutPluginOptions> = {
  enabled: true,
  type: 'dagre',
  direction: 'TB',
  nodeSpacing: 50,
  rankSpacing: 50
}

/**
 * 创建自动布局插件
 */
export function createLayoutPlugin(options: LayoutPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultLayoutOptions, ...options }

  return {
    id: 'layout',
    name: 'Layout',
    version: '1.0.0',
    description: '自动布局算法',

    install(flow: FlowInstance) {
      console.log(`[Layout Plugin] Installed with options:`, mergedOptions)

      // 布局函数
      const applyLayout = (layoutOptions?: unknown) => {
        const opts = { ...mergedOptions, ...(layoutOptions as Record<string, unknown>) }
        console.log('[Layout Plugin] Applying layout with options:', opts)
      }

      flow.applyLayout = applyLayout
    },

    destroy() {
      console.log('[Layout Plugin] Destroyed')
    }
  }
}

// ============================================
// Validation Plugin - 连线校验插件
// ============================================

export interface ValidationPluginOptions {
  enabled?: boolean
  allowSelfLoop?: boolean
  allowMultipleEdges?: boolean
  validateConnection?: (source: string, target: string) => boolean
}

const defaultValidationOptions: Required<ValidationPluginOptions> = {
  enabled: true,
  allowSelfLoop: false,
  allowMultipleEdges: true,
  validateConnection: () => true
}

/**
 * 创建连线校验插件
 */
export function createValidationPlugin(options: ValidationPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultValidationOptions, ...options }

  return {
    id: 'validation',
    name: 'Validation',
    version: '1.0.0',
    description: '连线规则校验',

    install(flow: FlowInstance) {
      console.log(`[Validation Plugin] Installed with options:`, mergedOptions)

      // 设置验证函数
      flow.isValidConnection = (connection) => {
        // 检查自环
        if (!mergedOptions.allowSelfLoop && connection.source === connection.target) {
          return false
        }

        // 检查多重连线
        if (!mergedOptions.allowMultipleEdges) {
          const exists = flow.edges.value.some(
            (e) => e.source === connection.source && e.target === connection.target
          )
          if (exists) return false
        }

        // 自定义验证
        return mergedOptions.validateConnection(connection.source, connection.target)
      }
    },

    destroy() {
      // 访问 flow 实例
      console.log('[Validation Plugin] Destroyed')
    }
  }
}
