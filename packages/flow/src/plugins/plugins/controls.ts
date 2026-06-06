import { markRaw } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import Controls from '../../renderer/Controls.vue'

export interface ControlsPluginOptions {
  enabled?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
}

const defaultControlsOptions: Required<ControlsPluginOptions> = {
  enabled: true,
  position: 'bottom-left',
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
    description: 'Displays a set of controls for zooming and fitting the view',
    component: markRaw(Controls),
    componentProps: {
      position: mergedOptions.position,
      showZoom: mergedOptions.showZoom,
      showFitView: mergedOptions.showFitView,
      showInteractive: mergedOptions.showInteractive
    },
    install(_flow: FlowInstance) {
      console.log(`[Controls Plugin] Installed`)
    }
  }
}
