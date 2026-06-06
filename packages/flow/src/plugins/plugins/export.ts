import { nextTick } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import type { ScreenshotOptions, ScreenshotResult } from '../../types'
import { captureElement, triggerDownload, copyBlobToClipboard } from '../../utils/screenshot'
import type { CaptureElementOptions } from '../../utils/screenshot'

export interface ExportPluginOptions {
  enabled?: boolean
  fileName?: string
  exportImage?: boolean
  exportJson?: boolean
  imageType?: 'png' | 'jpeg' | 'webp'
  imageQuality?: number
  pixelRatio?: number
  backgroundColor?: string
}

const defaultOptions: Required<ExportPluginOptions> = {
  enabled: true,
  fileName: 'flow-chart',
  exportImage: true,
  exportJson: true,
  imageType: 'png',
  imageQuality: 1,
  pixelRatio: 2,
  backgroundColor: '#ffffff'
}

function normalizeOptions(
  pluginOptions: Required<ExportPluginOptions>,
  arg?: ScreenshotOptions | HTMLElement
): ScreenshotOptions & { container?: HTMLElement } {
  if (arg == null) {
    return {}
  }
  if (arg instanceof HTMLElement) {
    return { container: arg }
  }
  return { ...arg }
}

function mergeCaptureOptions(
  plugin: Required<ExportPluginOptions>,
  options: ScreenshotOptions
): CaptureElementOptions {
  return {
    imageType: options.imageType ?? plugin.imageType,
    imageQuality: options.imageQuality ?? plugin.imageQuality,
    pixelRatio: options.pixelRatio ?? plugin.pixelRatio,
    backgroundColor: options.backgroundColor ?? plugin.backgroundColor
  }
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

      if (mergedOptions.exportImage) {
        flow.exportImage = async (
          optionsOrContainer?: ScreenshotOptions | HTMLElement
        ): Promise<ScreenshotResult> => {
          const opts = normalizeOptions(mergedOptions, optionsOrContainer)
          const container = opts.container ?? flow.$el

          if (!container) {
            throw new Error('[Export Plugin] No element found for export')
          }

          const mode = opts.mode ?? 'viewport'
          const download = opts.download !== false
          const copyToClipboard = opts.copyToClipboard === true
          const fileName = opts.fileName ?? mergedOptions.fileName
          const fullModePadding = opts.fullModePadding ?? 20

          let savedViewport: { x: number; y: number; zoom: number } | null = null

          try {
            if (mode === 'full') {
              savedViewport = { ...flow.getViewport() }
              flow.fitView?.({ padding: fullModePadding })
              await nextTick()
            }

            const captureOpts = mergeCaptureOptions(mergedOptions, opts)
            const result = await captureElement(container, captureOpts)

            if (download) {
              triggerDownload(result.dataUrl, fileName, result.extension)
            }
            if (copyToClipboard) {
              await copyBlobToClipboard(result.blob)
            }

            return result
          } finally {
            if (savedViewport) {
              flow.setViewport(savedViewport)
            }
          }
        }
      }
    }
  }
}
