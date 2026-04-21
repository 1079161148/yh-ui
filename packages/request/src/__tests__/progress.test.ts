/**
 * YH-UI Request - Progress Interceptor 测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createProgressInterceptor,
  XHRProgressHandler,
  FetchProgressHandler,
  type ProgressEvent
} from '../interceptors/progress'
import type { InternalRequestOptions, RequestResponse } from '../types'

describe('Progress Interceptor', () => {
  describe('createProgressInterceptor', () => {
    it('should create progress interceptor', () => {
      const interceptor = createProgressInterceptor({})
      expect(interceptor).toBeDefined()
      expect(typeof interceptor.onRequest).toBe('function')
      expect(typeof interceptor.onResponse).toBe('function')
      expect(typeof interceptor.getUploadHandler).toBe('function')
      expect(typeof interceptor.getDownloadHandler).toBe('function')
    })

    it('should call onUploadProgress callback', () => {
      const onUploadProgress = vi.fn()
      const interceptor = createProgressInterceptor({ onUploadProgress })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/upload'
      } as InternalRequestOptions

      interceptor.onRequest(config)

      interceptor.getUploadHandler({ loaded: 500, total: 1000, percent: 50 })

      expect(onUploadProgress).toHaveBeenCalled()
    })

    it('should call onDownloadProgress callback', () => {
      const onDownloadProgress = vi.fn()
      const interceptor = createProgressInterceptor({ onDownloadProgress })

      const response: RequestResponse<any> = {
        data: 'test',
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalRequestOptions
      } as RequestResponse<any>

      interceptor.onResponse(response)

      interceptor.getDownloadHandler({ loaded: 500, total: 1000, percent: 50 })

      expect(onDownloadProgress).toHaveBeenCalled()
    })

    it('should calculate rate and estimated time', () => {
      const progressEvent: ProgressEvent = {
        loaded: 500,
        total: 1000,
        percent: 50
      }

      const interceptor = createProgressInterceptor({
        onUploadProgress: (event) => {
          expect(event.rate).toBeDefined()
        }
      })

      interceptor.getUploadHandler({ loaded: 500, total: 1000, percent: 50 })
    })

    it('returns undefined estimated when total is zero', () => {
      const onUploadProgress = vi.fn()
      const i = createProgressInterceptor({ onUploadProgress })
      i.onRequest({} as InternalRequestOptions)
      i.getUploadHandler({ loaded: 0, total: 0, percent: 0 })
      expect(onUploadProgress.mock.calls[0][0].estimated).toBeUndefined()
    })

    it('FetchProgressHandler reports zero percent when total unknown until set', () => {
      const onDownloadProgress = vi.fn()
      const handler = new FetchProgressHandler({ onDownloadProgress })
      const reader = handler.getReaderHandler()
      handler.startDownload()
      reader(new Uint8Array([1, 2]), undefined)
      expect(onDownloadProgress.mock.calls[0][0].percent).toBe(0)
    })
  })
})

describe('XHRProgressHandler', () => {
  let handler: XHRProgressHandler

  beforeEach(() => {
    handler = new XHRProgressHandler({})
  })

  it('should create XHR handler', () => {
    expect(handler).toBeDefined()
  })

  it('should handle upload progress', () => {
    const onUploadProgress = vi.fn()
    handler = new XHRProgressHandler({ onUploadProgress })

    const mockXHR = {
      upload: {
        addEventListener: vi.fn((event: string, callback: (e: any) => void) => {
          if (event === 'progress') {
            callback({
              lengthComputable: true,
              loaded: 500,
              total: 1000
            })
          }
        })
      },
      addEventListener: vi.fn()
    } as any

    handler.bind(mockXHR)
    handler.startUpload()

    expect(mockXHR.upload.addEventListener).toHaveBeenCalled()
  })

  it('should handle download progress', () => {
    const onDownloadProgress = vi.fn()
    handler = new XHRProgressHandler({ onDownloadProgress })

    const mockXHR = {
      upload: { addEventListener: vi.fn() },
      addEventListener: vi.fn((event: string, callback: (e: any) => void) => {
        if (event === 'progress') {
          callback({
            lengthComputable: true,
            loaded: 500,
            total: 1000
          })
        }
      })
    } as any

    handler.bind(mockXHR)
    handler.startDownload()

    expect(mockXHR.addEventListener).toHaveBeenCalled()
  })

  it('should start upload timer', () => {
    expect(typeof handler.startUpload).toBe('function')
    handler.startUpload()
  })

  it('should start download timer', () => {
    expect(typeof handler.startDownload).toBe('function')
    handler.startDownload()
  })

  it('should handle progress with computable length', () => {
    const onUploadProgress = vi.fn()
    handler = new XHRProgressHandler({ onUploadProgress })

    const mockXHR = {
      upload: {
        addEventListener: vi.fn((event: string, callback: (e: any) => void) => {
          if (event === 'progress') {
            callback({
              lengthComputable: true,
              loaded: 750,
              total: 1000
            })
          }
        })
      },
      addEventListener: vi.fn()
    } as any

    handler.bind(mockXHR)
    handler.startUpload()

    expect(onUploadProgress).toHaveBeenCalled()
    const calledEvent = onUploadProgress.mock.calls[0][0]
    expect(calledEvent.loaded).toBe(750)
    expect(calledEvent.total).toBe(1000)
  })

  it('should handle non-computable progress', () => {
    const onUploadProgress = vi.fn()
    handler = new XHRProgressHandler({ onUploadProgress })

    const mockXHR = {
      upload: {
        addEventListener: vi.fn((event: string, callback: (e: any) => void) => {
          if (event === 'progress') {
            callback({
              lengthComputable: false
            })
          }
        })
      },
      addEventListener: vi.fn()
    } as any

    handler.bind(mockXHR)
    handler.startUpload()

    expect(onUploadProgress).not.toHaveBeenCalled()
  })
})

describe('FetchProgressHandler', () => {
  let handler: FetchProgressHandler

  beforeEach(() => {
    handler = new FetchProgressHandler({})
  })

  it('should create fetch handler', () => {
    expect(handler).toBeDefined()
  })

  it('should create reader handler', () => {
    expect(typeof handler.getReaderHandler).toBe('function')
  })

  it('should start download timer', () => {
    expect(typeof handler.startDownload).toBe('function')
    handler.startDownload()
  })

  it('should set total bytes', () => {
    expect(typeof handler.setTotal).toBe('function')
    handler.setTotal(1000)
  })

  it('should handle chunk reading', () => {
    const onDownloadProgress = vi.fn()
    handler = new FetchProgressHandler({ onDownloadProgress })

    const readerHandler = handler.getReaderHandler()
    handler.setTotal(1000)
    handler.startDownload()

    readerHandler(new Uint8Array([1, 2, 3, 4, 5]), 1000)

    expect(onDownloadProgress).toHaveBeenCalled()
  })

  it('should calculate progress correctly', () => {
    const onDownloadProgress = vi.fn()
    handler = new FetchProgressHandler({ onDownloadProgress })

    const readerHandler = handler.getReaderHandler()
    handler.setTotal(100)
    handler.startDownload()

    readerHandler(new Uint8Array([1, 2, 3, 4, 5]), 100)

    const calledEvent = onDownloadProgress.mock.calls[0][0]
    expect(calledEvent.percent).toBe(5)
  })

  it('should update total when provided in chunk', () => {
    const onDownloadProgress = vi.fn()
    handler = new FetchProgressHandler({ onDownloadProgress })

    const readerHandler = handler.getReaderHandler()
    handler.startDownload()

    readerHandler(new Uint8Array([1, 2, 3]), 500)

    const calledEvent = onDownloadProgress.mock.calls[0][0]
    expect(calledEvent.total).toBe(500)
  })

  it('should handle zero total gracefully', () => {
    const onDownloadProgress = vi.fn()
    handler = new FetchProgressHandler({ onDownloadProgress })

    const readerHandler = handler.getReaderHandler()
    handler.setTotal(0)
    handler.startDownload()

    readerHandler(new Uint8Array([1, 2, 3]), 0)

    expect(onDownloadProgress).toHaveBeenCalled()
  })
})
