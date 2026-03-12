import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node } from '../../types'

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
  height: 150
}

export function createMinimapPlugin(options: MiniMapOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'minimap',
    name: 'Minimap',
    install(_flow: FlowInstance) {
      console.log('Minimap plugin installed', mergedOptions)
    }
  }
}
