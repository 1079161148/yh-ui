/**
 * 进度监听拦截器
 * 支持上传和下载进度
 */

import type { InternalRequestOptions, RequestResponse } from '../types'

/** 进度事件 */
export interface ProgressEvent {
  /** 已传输字节 */
  loaded: number
  /** 总字节 */
  total: number
  /** 进度百分比 (0-100) */
  percent: number
  /** 传输速率 (bytes/s) */
  rate?: number
  /** 预计剩余时间 (ms) */
  estimated?: number
}

/** 进度回调函数 */
export type ProgressCallback = (event: ProgressEvent) => void

/** 进度拦截器配置 */
export interface ProgressInterceptorOptions {
  /** 上传进度回调 */
  onUploadProgress?: ProgressCallback
  /** 下载进度回调 */
  onDownloadProgress?: ProgressCallback
}

/**
 * 创建进度拦截器
 */
export function createProgressInterceptor(options: ProgressInterceptorOptions) {
  const { onUploadProgress, onDownloadProgress } = options

  let uploadStartTime = 0
  let downloadStartTime = 0

  const calculateRate = (loaded: number, startTime: number): number => {
    const elapsed = (Date.now() - startTime) / 1000
    return elapsed > 0 ? loaded / elapsed : 0
  }

  const calculateEstimated = (loaded: number, total: number, rate: number): number | undefined => {
    if (rate <= 0 || total <= 0) return undefined
    const remaining = total - loaded
    return remaining > 0 ? (remaining / rate) * 1000 : 0
  }

  const createProgressHandler = (isUpload: boolean): ((event: ProgressEvent) => void) => {
    return (event: ProgressEvent) => {
      const startTime = isUpload ? uploadStartTime : downloadStartTime
      const rate = calculateRate(event.loaded, startTime)
      const estimated = calculateEstimated(event.loaded, event.total, rate)

      const progressEvent: ProgressEvent = {
        ...event,
        rate,
        estimated
      }

      if (isUpload) {
        onUploadProgress?.(progressEvent)
      } else {
        onDownloadProgress?.(progressEvent)
      }
    }
  }

  return {
    /**
     * 请求拦截 - 初始化上传进度
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      uploadStartTime = Date.now()
      return config
    },

    /**
     * 响应拦截 - 初始化下载进度
     */
    onResponse: <T>(response: RequestResponse<T>): RequestResponse<T> => {
      downloadStartTime = Date.now()
      return response
    },

    /**
     * 获取上传进度处理器
     */
    getUploadHandler: createProgressHandler(true),

    /**
     * 获取下载进度处理器
     */
    getDownloadHandler: createProgressHandler(false)
  }
}

/**
 * XHR 进度处理器
 * 用于传统浏览器的 XMLHttpRequest
 */
export class XHRProgressHandler {
  private xhr: XMLHttpRequest | null = null
  private onUploadProgress?: ProgressCallback
  private onDownloadProgress?: ProgressCallback
  private uploadStartTime = 0
  private downloadStartTime = 0

  constructor(options: ProgressInterceptorOptions) {
    this.onUploadProgress = options.onUploadProgress
    this.onDownloadProgress = options.onDownloadProgress
  }

  /**
   * 绑定 XHR 事件
   */
  bind(xhr: XMLHttpRequest): void {
    this.xhr = xhr

    // 上传进度
    if (this.onUploadProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          this.handleUploadProgress(
            event as unknown as ProgressEvent & { loaded: number; total: number }
          )
        }
      })
    }

    // 下载进度
    if (this.onDownloadProgress) {
      xhr.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          this.handleDownloadProgress(
            event as unknown as ProgressEvent & { loaded: number; total: number }
          )
        }
      })
    }
  }

  private handleUploadProgress(event: ProgressEvent & { loaded: number; total: number }): void {
    if (!this.onUploadProgress) return

    const now = Date.now()
    const elapsed = (now - this.uploadStartTime) / 1000
    const rate = elapsed > 0 ? event.loaded / elapsed : 0
    const estimated = rate > 0 ? ((event.total - event.loaded) / rate) * 1000 : undefined

    this.onUploadProgress({
      loaded: event.loaded,
      total: event.total,
      percent: (event.loaded / event.total) * 100,
      rate,
      estimated
    })
  }

  private handleDownloadProgress(event: ProgressEvent & { loaded: number; total: number }): void {
    if (!this.onDownloadProgress) return

    const now = Date.now()
    const elapsed = (now - this.downloadStartTime) / 1000
    const rate = elapsed > 0 ? event.loaded / elapsed : 0
    const estimated = rate > 0 ? ((event.total - event.loaded) / rate) * 1000 : undefined

    this.onDownloadProgress({
      loaded: event.loaded,
      total: event.total,
      percent: (event.loaded / event.total) * 100,
      rate,
      estimated
    })
  }

  /**
   * 开始上传
   */
  startUpload(): void {
    this.uploadStartTime = Date.now()
  }

  /**
   * 开始下载
   */
  startDownload(): void {
    this.downloadStartTime = Date.now()
  }
}

/**
 * Fetch 流式进度处理器
 * 用于 Fetch API 的响应体流式读取
 */
export class FetchProgressHandler {
  private onDownloadProgress?: ProgressCallback
  private downloadStartTime = 0
  private downloadedBytes = 0
  private totalBytes = 0

  constructor(options: ProgressInterceptorOptions) {
    this.onDownloadProgress = options.onDownloadProgress
  }

  /**
   * 获取读取处理器
   */
  getReaderHandler(): (chunk: Uint8Array, total?: number) => void {
    return (chunk: Uint8Array, total?: number) => {
      this.downloadedBytes += chunk.length

      if (total !== undefined) {
        this.totalBytes = total
      }

      if (this.onDownloadProgress) {
        const now = Date.now()
        const elapsed = (now - this.downloadStartTime) / 1000
        const rate = elapsed > 0 ? this.downloadedBytes / elapsed : 0
        const estimated =
          rate > 0 && this.totalBytes > 0
            ? ((this.totalBytes - this.downloadedBytes) / rate) * 1000
            : undefined

        this.onDownloadProgress({
          loaded: this.downloadedBytes,
          total: this.totalBytes,
          percent: this.totalBytes > 0 ? (this.downloadedBytes / this.totalBytes) * 100 : 0,
          rate,
          estimated
        })
      }
    }
  }

  /**
   * 开始下载
   */
  startDownload(): void {
    this.downloadStartTime = Date.now()
    this.downloadedBytes = 0
    this.totalBytes = 0
  }

  /**
   * 设置总字节数
   */
  setTotal(total: number): void {
    this.totalBytes = total
  }
}
