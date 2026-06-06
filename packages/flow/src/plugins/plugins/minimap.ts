import { markRaw } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node } from '../../types'
import Minimap from '../../renderer/Minimap.vue'

export interface MiniMapOptions {
  enabled?: boolean
  nodeColor?: (node: Node) => string
  nodeStrokeColor?: (node: Node) => string
  nodeStrokeWidth?: number
  maskColor?: string
  maskStrokeColor?: string
  maskStrokeWidth?: number
  pannable?: boolean
  zoomable?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  width?: number
  height?: number
  /** Enable interactive click-to-navigate */
  interactive?: boolean
  /** Show layout control buttons */
  showLayoutControls?: boolean
  /** Current layout type */
  layoutType?: 'dagre' | 'elk' | 'force' | 'grid' | 'none'
  /** Layout direction */
  layoutDirection?: 'TB' | 'BT' | 'LR' | 'RL'
}

const defaultOptions: Required<MiniMapOptions> = {
  enabled: true,
  nodeColor: () => '#fff',
  nodeStrokeColor: () => '#999',
  nodeStrokeWidth: 1,
  maskColor: 'rgba(240, 240, 240, 0.6)',
  maskStrokeColor: '#ddd',
  maskStrokeWidth: 1,
  pannable: true,
  zoomable: true,
  position: 'bottom-right',
  width: 200,
  height: 150,
  interactive: false,
  showLayoutControls: false,
  layoutType: 'none',
  layoutDirection: 'TB'
}

export function createMiniMapPlugin(options: MiniMapOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'minimap',
    name: 'Minimap',
    version: '1.0.0',
    description: 'Displays a minimap for navigation',
    component: markRaw(Minimap),
    componentProps: {
      position: mergedOptions.position,
      width: mergedOptions.width,
      height: mergedOptions.height,
      nodeColor: mergedOptions.nodeColor,
      nodeStrokeColor: mergedOptions.nodeStrokeColor,
      nodeStrokeWidth: mergedOptions.nodeStrokeWidth,
      maskColor: mergedOptions.maskColor,
      maskStrokeColor: mergedOptions.maskStrokeColor,
      maskStrokeWidth: mergedOptions.maskStrokeWidth,
      pannable: mergedOptions.pannable,
      zoomable: mergedOptions.zoomable,
      interactive: mergedOptions.interactive,
      showLayoutControls: mergedOptions.showLayoutControls,
      layoutType: mergedOptions.layoutType,
      layoutDirection: mergedOptions.layoutDirection
    },
    install(flow: FlowInstance) {
      console.log('[Minimap Plugin] Installed', flow)
    }
  }
}
