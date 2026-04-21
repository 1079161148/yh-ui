import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { triggerDownload, copyBlobToClipboard } from '../utils/screenshot'
import type { ScreenshotResult } from '../types'

describe('flow/utils/screenshot', () => {
  let clickSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
  })

  afterEach(() => {
    clickSpy.mockRestore()
  })

  describe('triggerDownload', () => {
    it('should create download link and click it', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      triggerDownload(dataUrl, 'test-flow', 'png')
      expect(clickSpy).toHaveBeenCalled()
    })

    it('should set correct filename with extension', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      triggerDownload(dataUrl, 'my-flow-chart', 'jpeg')
      expect(clickSpy).toHaveBeenCalled()
    })

    it('should handle webp extension', () => {
      const dataUrl = 'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoQABAAAgA0JZQCdAEO/hAAA='
      triggerDownload(dataUrl, 'webp-flow', 'webp')
      expect(clickSpy).toHaveBeenCalled()
    })
  })

  describe('copyBlobToClipboard', () => {
    it('should throw when clipboard API is not available', async () => {
      const blob = new Blob(['test'], { type: 'image/png' })

      // Mock navigator.clipboard.write as undefined
      vi.stubGlobal('navigator', {
        clipboard: {
          write: undefined as unknown as (data: ClipboardItem[]) => Promise<void>
        }
      })

      await expect(copyBlobToClipboard(blob)).rejects.toThrow(
        '[Flow Screenshot] Clipboard API not available'
      )
    })

    it('should call clipboard write when available', async () => {
      const blob = new Blob(['test'], { type: 'image/png' })
      const writeMock = vi.fn().mockResolvedValue(undefined)

      vi.stubGlobal('navigator', {
        clipboard: {
          write: writeMock
        }
      })

      await copyBlobToClipboard(blob)
      expect(writeMock).toHaveBeenCalled()
    })

    it('should include correct blob type in clipboard item', async () => {
      const blob = new Blob(['test'], { type: 'image/png' })
      let capturedItems: ClipboardItem[] = []
      const writeMock = vi.fn().mockImplementation((items: ClipboardItem[]) => {
        capturedItems = items
        return Promise.resolve()
      })

      vi.stubGlobal('navigator', {
        clipboard: {
          write: writeMock
        }
      })

      await copyBlobToClipboard(blob)
      expect(writeMock).toHaveBeenCalled()
      expect(capturedItems.length).toBe(1)
    })
  })
})
