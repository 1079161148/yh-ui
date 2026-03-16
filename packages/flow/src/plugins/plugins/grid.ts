import { markRaw } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import Background from '../../renderer/Background.vue'

export interface GridPluginOptions {
  enabled?: boolean
  type?: 'dots' | 'grid'
  color?: string
  gap?: number
}

const defaultGridOptions: Required<GridPluginOptions> = {
  enabled: true,
  type: 'dots',
  color: '#e5e5e5',
  gap: 20
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
    description: 'Displays a grid or dots background',
    component: markRaw(Background),
    componentProps: {
      type: mergedOptions.type,
      color: mergedOptions.color,
      gap: mergedOptions.gap
    },
    install(_flow: FlowInstance) {
      console.log(`[Grid Plugin] Installed`)
    }
  }
}
