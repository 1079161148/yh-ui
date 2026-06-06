/**
 * ============================================
 * Flow Theme System
 * Flow 流程图主题系统
 * ============================================
 */

export interface FlowTheme {
  // 节点样式
  'flow-node-background': string
  'flow-node-border': string
  'flow-node-border-radius': string
  'flow-node-padding': string
  'flow-node-shadow': string
  'flow-node-selected-border': string
  'flow-node-selected-shadow': string
  'flow-node-dragging-opacity': string

  // 节点文字
  'flow-node-label-color': string
  'flow-node-label-font-size': string
  'flow-node-label-font-weight': string
  'flow-node-description-color': string
  'flow-node-description-font-size': string

  // 连接点（Handle）
  'flow-handle-background': string
  'flow-handle-border': string
  'flow-handle-border-radius': string
  'flow-handle-size': string
  'flow-handle-hover-background': string
  'flow-handle-connected-background': string

  // 连线样式
  'flow-edge-stroke': string
  'flow-edge-stroke-width': string
  'flow-edge-selected-stroke': string
  'flow-edge-animated-stroke': string
  'flow-edge-label-background': string
  'flow-edge-label-color': string

  // BPMN 节点
  'flow-bpmn-start-fill': string
  'flow-bpmn-start-stroke': string
  'flow-bpmn-end-fill': string
  'flow-bpmn-end-stroke': string
  'flow-bpmn-task-fill': string
  'flow-bpmn-task-stroke': string
  'flow-bpmn-gateway-fill': string
  'flow-bpmn-gateway-stroke': string
  'flow-bpmn-gateway-color': string

  // AI 节点
  'flow-ai-node-background': string
  'flow-ai-node-border': string
  'flow-ai-node-accent': string

  // 背景
  'flow-background-color': string
  'flow-grid-color': string
  'flow-grid-size': string

  // 辅助线
  'flow-alignment-line-color': string
  'flow-alignment-line-active-color': string

  // 选框
  'flow-selection-box-border': string
  'flow-selection-box-background': string

  // 控制按钮
  'flow-control-background': string
  'flow-control-border': string
  'flow-control-icon-color': string
  'flow-control-hover-background': string
  'flow-control-active-background': string

  // 小地图
  'flow-minimap-background': string
  'flow-minimap-mask-background': string
  'flow-minimap-node-color': string
  'flow-minimap-viewport-border': string

  // 编辑面板
  'flow-panel-background': string
  'flow-panel-border': string
  'flow-panel-shadow': string
  'flow-panel-header-background': string
  'flow-panel-title-color': string

  // 工具栏
  'flow-toolbar-background': string
  'flow-toolbar-border': string
  'flow-toolbar-icon-color': string
  'flow-toolbar-hover-background': string
  'flow-toolbar-active-background': string
}

// 默认主题 - 明亮模式
export const flowTheme: FlowTheme = {
  // 节点样式
  'flow-node-background': '#ffffff',
  'flow-node-border': '#dcdfe6',
  'flow-node-border-radius': '8px',
  'flow-node-padding': '10px',
  'flow-node-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
  'flow-node-selected-border': '#409eff',
  'flow-node-selected-shadow': '0 0 8px rgba(64, 158, 255, 0.4)',
  'flow-node-dragging-opacity': '0.8',

  // 节点文字
  'flow-node-label-color': '#303133',
  'flow-node-label-font-size': '14px',
  'flow-node-label-font-weight': '500',
  'flow-node-description-color': '#909399',
  'flow-node-description-font-size': '12px',

  // 连接点（Handle）
  'flow-handle-background': '#ffffff',
  'flow-handle-border': '#409eff',
  'flow-handle-border-radius': '50%',
  'flow-handle-size': '12px',
  'flow-handle-hover-background': '#409eff',
  'flow-handle-connected-background': '#67c23a',

  // 连线样式
  'flow-edge-stroke': '#b1b3b8',
  'flow-edge-stroke-width': '2',
  'flow-edge-selected-stroke': '#409eff',
  'flow-edge-animated-stroke': '#409eff',
  'flow-edge-label-background': '#ffffff',
  'flow-edge-label-color': '#606266',

  // BPMN 节点
  'flow-bpmn-start-fill': '#e6f7ed',
  'flow-bpmn-start-stroke': '#67c23a',
  'flow-bpmn-end-fill': '#fef0f0',
  'flow-bpmn-end-stroke': '#f56c6c',
  'flow-bpmn-task-fill': '#ecf5ff',
  'flow-bpmn-task-stroke': '#409eff',
  'flow-bpmn-gateway-fill': '#fdf6ec',
  'flow-bpmn-gateway-stroke': '#e6a23c',
  'flow-bpmn-gateway-color': '#e6a23c',

  // AI 节点
  'flow-ai-node-background': '#f0f9ff',
  'flow-ai-node-border': '#0ea5e9',
  'flow-ai-node-accent': '#0284c7',

  // 背景
  'flow-background-color': '#fafafa',
  'flow-grid-color': '#e4e7ed',
  'flow-grid-size': '20',

  // 辅助线
  'flow-alignment-line-color': '#c0c4cc',
  'flow-alignment-line-active-color': '#409eff',

  // 选框
  'flow-selection-box-border': '#409eff',
  'flow-selection-box-background': 'rgba(64, 158, 255, 0.1)',

  // 控制按钮
  'flow-control-background': '#ffffff',
  'flow-control-border': '#dcdfe6',
  'flow-control-icon-color': '#606266',
  'flow-control-hover-background': '#f5f7fa',
  'flow-control-active-background': '#ecf5ff',

  // 小地图
  'flow-minimap-background': '#f5f7fa',
  'flow-minimap-mask-background': 'rgba(255, 255, 255, 0.8)',
  'flow-minimap-node-color': '#c0c4cc',
  'flow-minimap-viewport-border': '#409eff',

  // 编辑面板
  'flow-panel-background': '#ffffff',
  'flow-panel-border': '#e4e7ed',
  'flow-panel-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
  'flow-panel-header-background': '#fafafa',
  'flow-panel-title-color': '#303133',

  // 工具栏
  'flow-toolbar-background': '#ffffff',
  'flow-toolbar-border': '#e4e7ed',
  'flow-toolbar-icon-color': '#606266',
  'flow-toolbar-hover-background': '#f5f7fa',
  'flow-toolbar-active-background': '#ecf5ff'
}

// 暗色主题
export const flowThemeDark: FlowTheme = {
  // 节点样式
  'flow-node-background': '#1f1f1f',
  'flow-node-border': '#3a3a3a',
  'flow-node-border-radius': '8px',
  'flow-node-padding': '10px',
  'flow-node-shadow': '0 2px 8px rgba(0, 0, 0, 0.3)',
  'flow-node-selected-border': '#409eff',
  'flow-node-selected-shadow': '0 0 8px rgba(64, 158, 255, 0.5)',
  'flow-node-dragging-opacity': '0.7',

  // 节点文字
  'flow-node-label-color': '#e5e5e5',
  'flow-node-label-font-size': '14px',
  'flow-node-label-font-weight': '500',
  'flow-node-description-color': '#8c8c8c',
  'flow-node-description-font-size': '12px',

  // 连接点（Handle）
  'flow-handle-background': '#262626',
  'flow-handle-border': '#409eff',
  'flow-handle-border-radius': '50%',
  'flow-handle-size': '12px',
  'flow-handle-hover-background': '#409eff',
  'flow-handle-connected-background': '#67c23a',

  // 连线样式
  'flow-edge-stroke': '#5c5c5c',
  'flow-edge-stroke-width': '2',
  'flow-edge-selected-stroke': '#409eff',
  'flow-edge-animated-stroke': '#409eff',
  'flow-edge-label-background': '#1f1f1f',
  'flow-edge-label-color': '#e5e5e5',

  // BPMN 节点
  'flow-bpmn-start-fill': '#1a2e1a',
  'flow-bpmn-start-stroke': '#67c23a',
  'flow-bpmn-end-fill': '#2e1a1a',
  'flow-bpmn-end-stroke': '#f56c6c',
  'flow-bpmn-task-fill': '#1a2a33',
  'flow-bpmn-task-stroke': '#409eff',
  'flow-bpmn-gateway-fill': '#2e2a1a',
  'flow-bpmn-gateway-stroke': '#e6a23c',
  'flow-bpmn-gateway-color': '#e6a23c',

  // AI 节点
  'flow-ai-node-background': '#1a1a2e',
  'flow-ai-node-border': '#0ea5e9',
  'flow-ai-node-accent': '#38bdf8',

  // 背景
  'flow-background-color': '#141414',
  'flow-grid-color': '#2a2a2a',
  'flow-grid-size': '20',

  // 辅助线
  'flow-alignment-line-color': '#404040',
  'flow-alignment-line-active-color': '#409eff',

  // 选框
  'flow-selection-box-border': '#409eff',
  'flow-selection-box-background': 'rgba(64, 158, 255, 0.2)',

  // 控制按钮
  'flow-control-background': '#1f1f1f',
  'flow-control-border': '#3a3a3a',
  'flow-control-icon-color': '#8c8c8c',
  'flow-control-hover-background': '#2a2a2a',
  'flow-control-active-background': '#1a2a33',

  // 小地图
  'flow-minimap-background': '#1a1a1a',
  'flow-minimap-mask-background': 'rgba(0, 0, 0, 0.7)',
  'flow-minimap-node-color': '#404040',
  'flow-minimap-viewport-border': '#409eff',

  // 编辑面板
  'flow-panel-background': '#1f1f1f',
  'flow-panel-border': '#3a3a3a',
  'flow-panel-shadow': '0 4px 12px rgba(0, 0, 0, 0.5)',
  'flow-panel-header-background': '#262626',
  'flow-panel-title-color': '#e5e5e5',

  // 工具栏
  'flow-toolbar-background': '#1f1f1f',
  'flow-toolbar-border': '#3a3a3a',
  'flow-toolbar-icon-color': '#8c8c8c',
  'flow-toolbar-hover-background': '#2a2a2a',
  'flow-toolbar-active-background': '#1a2a33'
}

/**
 * 应用主题到 DOM
 */
export function applyFlowTheme(theme: FlowTheme, target: HTMLElement | Document = document): void {
  const root = target instanceof Document ? target.documentElement : target

  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value)
  }
}

/**
 * 创建自定义主题
 */
export function createCustomTheme(overrides: Partial<FlowTheme>): FlowTheme {
  return { ...flowTheme, ...overrides }
}

/**
 * 主题预设
 */
export const flowThemePresets = {
  default: flowTheme,
  dark: flowThemeDark,
  blue: createCustomTheme({
    'flow-node-background': '#e6f7ff',
    'flow-node-border': '#91d5ff',
    'flow-node-selected-border': '#1890ff',
    'flow-node-selected-shadow': '0 0 8px rgba(24, 144, 255, 0.4)',
    'flow-handle-border': '#1890ff',
    'flow-edge-selected-stroke': '#1890ff',
    'flow-edge-animated-stroke': '#1890ff',
    'flow-background-color': '#f0f7ff',
    'flow-grid-color': '#d0e6ff',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#722ed1',
    'flow-ai-node-accent': '#b37feb'
  }),
  green: createCustomTheme({
    'flow-node-background': '#f6ffed',
    'flow-node-border': '#b7eb8f',
    'flow-node-selected-border': '#52c41a',
    'flow-node-selected-shadow': '0 0 8px rgba(82, 196, 26, 0.4)',
    'flow-handle-border': '#52c41a',
    'flow-edge-selected-stroke': '#52c41a',
    'flow-edge-animated-stroke': '#52c41a',
    'flow-background-color': '#f6ffed',
    'flow-grid-color': '#d9f7be',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#13c2c2',
    'flow-ai-node-accent': '#36cfc9'
  }),
  purple: createCustomTheme({
    'flow-node-background': '#f9f0ff',
    'flow-node-border': '#d3adf7',
    'flow-node-selected-border': '#722ed1',
    'flow-node-selected-shadow': '0 0 8px rgba(114, 46, 209, 0.4)',
    'flow-handle-border': '#722ed1',
    'flow-edge-selected-stroke': '#722ed1',
    'flow-edge-animated-stroke': '#722ed1',
    'flow-background-color': '#f9f0ff',
    'flow-grid-color': '#efdbff',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#722ed1',
    'flow-ai-node-accent': '#b37feb'
  })
}

export type FlowThemeName = keyof typeof flowThemePresets
