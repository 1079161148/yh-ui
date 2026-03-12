import type { FlowInstance, FlowPlugin } from '../plugin'

export interface SnapOptions {
  enabled?: boolean
  grid?: boolean
  gridSize?: number
  snapToGrid?: boolean
  gridSteps?: number
  throwErrorOnSnap?: boolean
}

const defaultOptions: Required<SnapOptions> = {
  enabled: true,
  grid: true,
  gridSize: 15,
  snapToGrid: true,
  gridSteps: 5,
  throwErrorOnSnap: false
}

export function createSnapPlugin(options: SnapOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'snap',
    name: 'Snap',
    install(_flow: FlowInstance) {
      console.log('Snap plugin installed', mergedOptions)
    }
  }
}
