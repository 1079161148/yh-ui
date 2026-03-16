import { markRaw } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import AlignmentLines from '../../renderer/AlignmentLines.vue'

export interface SnapPluginOptions {
  enabled?: boolean
  snapToGrid?: boolean
  gridSize?: number
  snapThreshold?: number
  showAlignmentLines?: boolean
}

const defaultSnapOptions: Required<SnapPluginOptions> = {
  enabled: true,
  snapToGrid: true,
  gridSize: 15,
  snapThreshold: 10,
  showAlignmentLines: true
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
    description: 'Enables grid snapping and alignment lines',
    component: mergedOptions.showAlignmentLines ? markRaw(AlignmentLines) : undefined,
    componentProps: {
      snapThreshold: mergedOptions.snapThreshold
    },
    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return

      // 如果启用网格吸附，可以在此处通过事件监听或 hook 实现同步
      // 注意：目前 useNodes 已经支持 snapToGrid，此插件可以作为配置封装
      console.log(`[Snap Plugin] Installed with options:`, mergedOptions, flow)
    }
  }
}
