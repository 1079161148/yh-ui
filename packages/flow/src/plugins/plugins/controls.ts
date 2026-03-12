import type { FlowInstance, FlowPlugin } from '../plugin'

export interface ControlsOptions {
  enabled?: boolean
  showZoom?: boolean
  showFitView?: boolean
  showLock?: boolean
  showInteractive?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const defaultOptions: Required<ControlsOptions> = {
  enabled: true,
  showZoom: true,
  showFitView: true,
  showLock: false,
  showInteractive: true,
  position: 'bottom-right'
}

export function createControlsPlugin(options: ControlsOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'controls',
    name: 'Controls',
    install(_flow: FlowInstance) {
      console.log('Controls plugin installed', mergedOptions)
    }
  }
}
