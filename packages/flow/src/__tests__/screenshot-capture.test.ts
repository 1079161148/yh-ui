import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { captureElement } from '../utils/screenshot'
import type { CaptureElementOptions } from '../utils/screenshot'

describe('flow/utils/screenshot - captureElement', () => {
  let mockToPng: ReturnType<typeof vi.fn>
  let mockToJpeg: ReturnType<typeof vi.fn>
  let mockToWebp: ReturnType<typeof vi.fn>
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      mockFetch = vi.fn().mockResolvedValue(
        new Response(new Blob(['test'], { type: 'image/png' }))
      )
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createMockHtmlToImage = () => {
    mockToPng = vi.fn().mockResolvedValue('data:image/png;base64,test')
    mockToJpeg = vi.fn().mockResolvedValue('data:image/jpeg;base64,test')
    mockToWebp = vi.fn().mockResolvedValue('data:image/webp;base64,test')
    return { toPng: mockToPng, toJpeg: mockToJpeg, toWebp: mockToWebp }
  }

  const createMockElement = (): HTMLElement => {
    const el = document.createElement('div')
    Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })
    Object.defineProperty(el, 'offsetHeight', { value: 200, configurable: true })
    return el
  }

  const defaultOptions: CaptureElementOptions = {
    imageType: 'png',
    imageQuality: 1,
    pixelRatio: 2,
    backgroundColor: '#ffffff'
  }

  describe('png capture', () => {
    it('should capture as png', async () => {
      vi.doMock('html-to-image', () => createMockHtmlToImage(), { virtual: true })
      const mod = await import('html-to-image')
      const htmlToImage = mod.toPng ? mod : mod.default

      // Use the actual module
      const el = createMockElement()
      const result = await captureElement(el, { ...defaultOptions, imageType: 'png' })
      expect(result.extension).toBe('png')
      expect(result.mimeType).toBe('image/png')
    })
  })

  describe('jpeg capture', () => {
    it('should capture as jpeg', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      const result = await captureElement(el, { ...defaultOptions, imageType: 'jpeg' })
      expect(result.extension).toBe('jpeg')
      expect(result.mimeType).toBe('image/jpeg')
    })
  })

  describe('webp capture', () => {
    it('should capture as webp when supported', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      const result = await captureElement(el, { ...defaultOptions, imageType: 'webp' })
      expect(result.extension).toBe('webp')
      expect(result.mimeType).toBe('image/webp')
    })

    it('should fall back to png when webp not supported', async () => {
      const htmlToImage = {
        toPng: vi.fn().mockResolvedValue('data:image/png;base64,test'),
        toJpeg: vi.fn().mockResolvedValue('data:image/jpeg;base64,test'),
        toWebp: undefined
      }
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      const result = await captureElement(el, { ...defaultOptions, imageType: 'webp' })
      expect(result.extension).toBe('png')
    })
  })

  describe('dimensions', () => {
    it('should calculate dimensions with pixel ratio', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      const result = await captureElement(el, { ...defaultOptions, pixelRatio: 3 })
      expect(result.width).toBe(300) // 100 * 3
      expect(result.height).toBe(600) // 200 * 3
    })
  })

  describe('image quality', () => {
    it('should pass quality option for jpeg', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      await captureElement(el, { ...defaultOptions, imageType: 'jpeg', imageQuality: 0.8 })
      expect(mockToJpeg).toHaveBeenCalledWith(el, expect.objectContaining({ quality: 0.8 }))
    })

    it('should pass quality option for webp', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      await captureElement(el, { ...defaultOptions, imageType: 'webp', imageQuality: 0.9 })
      expect(mockToWebp).toHaveBeenCalledWith(el, expect.objectContaining({ quality: 0.9 }))
    })
  })

  describe('background color', () => {
    it('should pass background color option', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      await captureElement(el, { ...defaultOptions, backgroundColor: '#ff0000' })
      expect(mockToPng).toHaveBeenCalledWith(el, expect.objectContaining({ backgroundColor: '#ff0000' }))
    })
  })

  describe('data URL to blob conversion', () => {
    it('should convert data URL to blob', async () => {
      const htmlToImage = createMockHtmlToImage()
      vi.doMock('html-to-image', () => htmlToImage, { virtual: true })

      const el = createMockElement()
      const result = await captureElement(el, defaultOptions)
      expect(result.blob).toBeInstanceOf(Blob)
      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
