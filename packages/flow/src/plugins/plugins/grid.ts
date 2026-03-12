import type { FlowInstance, FlowPlugin } from '../plugin'

export interface GridOptions {
  enabled?: boolean
  type?: 'dots' | 'lines' | 'cross'
  color?: string
  distance?: number
  showHyperlinks?: boolean
  minDistance?: number
  maxDistance?: number
}

const defaultOptions: Required<GridOptions> = {
  enabled: true,
  type: 'dots',
  color: '#e5e5e5',
  distance: 20,
  showHyperlinks: false,
  minDistance: 5,
  maxDistance: 50
}

export function createGridPlugin(options: GridOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'grid',
    name: 'Grid',
    install(_flow: FlowInstance) {
      console.log('Grid plugin installed', mergedOptions)
    }
  }
}
