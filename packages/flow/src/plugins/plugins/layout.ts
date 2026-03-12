import type { FlowInstance, FlowPlugin } from '../plugin'

export interface LayoutOptions {
  enabled?: boolean
  type?: 'dagre' | 'elk' | 'force'
  direction?: 'TB' | 'BT' | 'LR' | 'RL'
  nodeSpacing?: number
  rankSpacing?: number
}

const defaultOptions: Required<LayoutOptions> = {
  enabled: true,
  type: 'dagre',
  direction: 'TB',
  nodeSpacing: 50,
  rankSpacing: 50
}

export function createLayoutPlugin(options: LayoutOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'layout',
    name: 'Layout',
    install(_flow: FlowInstance) {
      console.log('Layout plugin installed', mergedOptions)
    }
  }
}
