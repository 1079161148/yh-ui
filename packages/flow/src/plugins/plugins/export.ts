import type { FlowInstance, FlowPlugin } from '../plugin'

export interface ExportPluginOptions {
  enabled?: boolean
  fileName?: string
  exportImage?: boolean
  exportJson?: boolean
}

const defaultOptions: Required<ExportPluginOptions> = {
  enabled: true,
  fileName: 'flow-chart',
  exportImage: true,
  exportJson: true
}

export function createExportPlugin(options: ExportPluginOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'export',
    name: 'Export',
    version: '1.0.0',
    description: 'Provides methods to export the flow chart as JSON or Image',
    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return

      // 导出为 JSON
      if (mergedOptions.exportJson) {
        flow.exportJson = () => {
          return JSON.stringify(
            {
              nodes: flow.nodes.value,
              edges: flow.edges.value,
              viewport: flow.viewport.value
            },
            null,
            2
          )
        }
      }

      // 导出为图片的逻辑通常依赖外部库，这里提供钩子
      if (mergedOptions.exportImage) {
        flow.exportImage = async (_container?: HTMLElement) => {
          console.log('[Export Plugin] Exporting image...')
        }
      }
    }
  }
}
