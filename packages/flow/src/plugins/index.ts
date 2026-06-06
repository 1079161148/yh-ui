import { FlowPlugin } from './plugin'

import {
  createMiniMapPlugin,
  createControlsPlugin,
  createGridPlugin,
  createSnapPlugin,
  createKeyboardPlugin,
  createExportPlugin,
  createLayoutPlugin,
  createHistoryPlugin,
  createNodeGroupPlugin
} from './plugins/index'

export type { FlowPlugin, FlowInstance, PluginHooks, PluginOptions } from './plugin'
export { PluginManager, createPlugin, withHooks } from './plugin'

// 内置插件导出
export {
  createMiniMapPlugin,
  createControlsPlugin,
  createGridPlugin,
  createSnapPlugin,
  createKeyboardPlugin,
  createExportPlugin,
  createLayoutPlugin,
  createHistoryPlugin,
  createNodeGroupPlugin
} from './plugins'

// 插件选项类型导出
export type {
  MiniMapOptions as MiniMapPluginOptions,
  ControlsPluginOptions,
  GridPluginOptions,
  SnapPluginOptions,
  KeyboardOptions as KeyboardPluginOptions,
  ExportPluginOptions,
  LayoutOptions as LayoutPluginOptions,
  HistoryPluginOptions,
  FlowHistorySnapshot,
  NodeGroupOptions,
  NodeGroupInfo
} from './plugins'

// ============================================
// 插件预设 - 一键安装所有内置插件
// ============================================

/**
 * 默认插件预设
 */
export const defaultPlugins = {
  minimap: createMiniMapPlugin,
  controls: createControlsPlugin,
  grid: createGridPlugin,
  snap: createSnapPlugin,
  keyboard: createKeyboardPlugin,
  export: createExportPlugin,
  layout: createLayoutPlugin,
  history: createHistoryPlugin,
  nodeGroup: createNodeGroupPlugin
}

/**
 * 创建完整插件集
 */
export function createDefaultPluginSet(options?: {
  minimap?: Parameters<typeof createMiniMapPlugin>[0]
  controls?: Parameters<typeof createControlsPlugin>[0]
  grid?: Parameters<typeof createGridPlugin>[0]
  snap?: Parameters<typeof createSnapPlugin>[0]
  keyboard?: Parameters<typeof createKeyboardPlugin>[0]
  export?: Parameters<typeof createExportPlugin>[0]
  layout?: Parameters<typeof createLayoutPlugin>[0]
  history?: Parameters<typeof createHistoryPlugin>[0]
  nodeGroup?: Parameters<typeof createNodeGroupPlugin>[0]
}): FlowPlugin[] {
  return [
    createMiniMapPlugin(options?.minimap),
    createControlsPlugin(options?.controls),
    createGridPlugin(options?.grid),
    createSnapPlugin(options?.snap),
    createKeyboardPlugin(options?.keyboard),
    createExportPlugin(options?.export),
    createLayoutPlugin(options?.layout),
    createHistoryPlugin(options?.history),
    createNodeGroupPlugin(options?.nodeGroup)
  ].filter(Boolean) as FlowPlugin[]
}
