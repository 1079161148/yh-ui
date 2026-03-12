import type { FlowInstance, FlowPlugin } from '../plugin'

export interface ExportOptions {
  enabled?: boolean
  fileName?: string
  exportImage?: boolean
  exportJson?: boolean
  includeHiddenNodes?: boolean
}

const defaultOptions: Required<ExportOptions> = {
  enabled: true,
  fileName: 'flow-chart',
  exportImage: true,
  exportJson: true,
  includeHiddenNodes: false
}

export function createExportPlugin(options: ExportOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'export',
    name: 'Export',
    install(_flow: FlowInstance) {
      console.log('Export plugin installed', mergedOptions)
    }
  }
}
