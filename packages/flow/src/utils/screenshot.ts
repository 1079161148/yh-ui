/**
 * 截图工具：将 DOM 元素导出为图片（DataURL + Blob）
 * - 动态加载 html-to-image，零默认体积
 * - 严格类型，无 any
 * - 支持 png / jpeg / webp，可调质量与 pixelRatio
 */

import type { ScreenshotImageType, ScreenshotResult } from '../types'

export interface CaptureElementOptions {
  imageType: ScreenshotImageType
  imageQuality: number
  pixelRatio: number
  backgroundColor: string
}

const MIME_MAP: Record<ScreenshotImageType, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp'
}

const EXT_MAP: Record<ScreenshotImageType, string> = {
  png: 'png',
  jpeg: 'jpeg',
  webp: 'webp'
}

/** 将 Data URL 转为 Blob */
function dataUrlToBlob(dataUrl: string, _mimeType: string): Promise<Blob> {
  return fetch(dataUrl).then((res) => res.blob())
}

/**
 * 截取指定 DOM 元素为图片（仅负责「当前视野」的 DOM → 图，不处理 full 模式视口）
 * 依赖可选：html-to-image（动态 import，未安装时抛出）
 */
export async function captureElement(
  element: HTMLElement,
  options: CaptureElementOptions
): Promise<ScreenshotResult> {
  const { imageType, imageQuality, pixelRatio, backgroundColor } = options

  type HtmlToImage = {
    toPng: (
      el: HTMLElement,
      opts: { backgroundColor?: string; pixelRatio?: number }
    ) => Promise<string>
    toJpeg: (
      el: HTMLElement,
      opts: { backgroundColor?: string; quality?: number; pixelRatio?: number }
    ) => Promise<string>
    toWebp?: (
      el: HTMLElement,
      opts: { backgroundColor?: string; quality?: number; pixelRatio?: number }
    ) => Promise<string>
  }

  const mod = await import('html-to-image')
  const htmlToImage = (typeof mod.toPng === 'function'
    ? mod
    : mod.default) as unknown as HtmlToImage

  const baseOptions = {
    backgroundColor,
    pixelRatio
  }

  let dataUrl: string
  let resolvedType = imageType
  switch (imageType) {
    case 'jpeg':
      dataUrl = await htmlToImage.toJpeg(element, { ...baseOptions, quality: imageQuality })
      break
    case 'webp':
      if (typeof htmlToImage.toWebp === 'function') {
        dataUrl = await htmlToImage.toWebp(element, { ...baseOptions, quality: imageQuality })
      } else {
        resolvedType = 'png'
        dataUrl = await htmlToImage.toPng(element, baseOptions)
      }
      break
    case 'png':
    default:
      dataUrl = await htmlToImage.toPng(element, baseOptions)
      break
  }

  const mimeType = MIME_MAP[resolvedType]
  const blob = await dataUrlToBlob(dataUrl, mimeType)
  const width = Math.round(element.offsetWidth * pixelRatio)
  const height = Math.round(element.offsetHeight * pixelRatio)

  return {
    dataUrl,
    blob,
    width,
    height,
    mimeType,
    extension: EXT_MAP[resolvedType]
  }
}

/** 触发浏览器下载（文件名 + 扩展名） */
export function triggerDownload(dataUrl: string, fileName: string, extension: string): void {
  const link = document.createElement('a')
  link.download = `${fileName}.${extension}`
  link.href = dataUrl
  link.click()
}

/** 将 Blob 写入剪贴板（需现代浏览器 Clipboard API） */
export async function copyBlobToClipboard(blob: Blob): Promise<void> {
  if (typeof navigator?.clipboard?.write === 'function') {
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
  } else {
    throw new Error('[Flow Screenshot] Clipboard API not available')
  }
}
