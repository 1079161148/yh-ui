/**
 * 调试拦截器
 * 提供请求/响应的调试信息
 */

import type { InternalRequestOptions, RequestResponse, RequestError } from '../types'

/** 调试日志级别 */
export type DebugLevel = 'log' | 'warn' | 'error'

/** 调试信息 */
export interface DebugInfo {
  /** 请求 ID */
  requestId: string
  /** 请求 URL */
  url: string
  /** 请求方法 */
  method: string
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求体 */
  data?: unknown
  /** 响应数据 */
  response?: unknown
  /** 响应状态 */
  status?: number
  /** 耗时 (ms) */
  duration?: number
  /** 错误信息 */
  error?: string
  /** 时间戳 */
  timestamp: number
  /** 日志消息 */
  message?: string
}

/** 调试配置 */
export interface DebugInterceptorOptions {
  /** 是否启用调试 */
  enabled?: boolean
  /** 日志级别 */
  level?: DebugLevel
  /** 是否打印请求体 */
  logRequestBody?: boolean
  /** 是否打印响应体 */
  logResponseBody?: boolean
  /** 脱敏处理 */
  sanitize?: (info: DebugInfo) => DebugInfo
  /** 自定义日志输出 */
  logger?: (info: DebugInfo) => void
}

/**
 * 创建调试拦截器
 */
export function createDebugInterceptor(options: DebugInterceptorOptions = {}) {
  const {
    enabled = false,
    level = 'log',
    logRequestBody = true,
    logResponseBody = true,
    sanitize,
    logger
  } = options

  const loggers: Record<DebugLevel, (...args: unknown[]) => void> = {
    log: console.log,
    warn: console.warn,
    error: console.error
  }

  const log = logger || loggers[level]

  /**
   * 创建日志信息
   */
  const createDebugInfo = (
    config: InternalRequestOptions,
    response?: RequestResponse,
    error?: RequestError
  ): DebugInfo => {
    const info: DebugInfo = {
      requestId: config.requestId || '',
      url: config.fullPath || config.url || '',
      method: config.method || 'GET',
      timestamp: Date.now()
    }

    if (logRequestBody) {
      info.headers = config.headers
      info.data = config.data
    }

    if (response) {
      info.status = response.response.status
      info.duration = response.duration

      if (logResponseBody) {
        info.response = response.data
      }
    }

    if (error) {
      info.error = error.message
      info.status = error.response?.status
    }

    return info
  }

  /**
   * 打印调试信息
   */
  const printDebug = (info: DebugInfo): void => {
    if (!enabled) return

    // 脱敏处理
    const sanitizedInfo = sanitize ? sanitize(info) : info

    // 格式化输出
    const prefix = `[YH-Request] ${sanitizedInfo.method} ${sanitizedInfo.requestId}`
    const status = sanitizedInfo.status ? ` [${sanitizedInfo.status}]` : ''
    const duration = sanitizedInfo.duration ? ` (${sanitizedInfo.duration}ms)` : ''

    if (sanitizedInfo.error) {
      log({
        ...sanitizedInfo,
        message: `${prefix}${status}${duration} - ${sanitizedInfo.error}`
      })
    } else {
      log({
        ...sanitizedInfo,
        message: `${prefix}${status}${duration}`
      })
    }
  }

  return {
    /**
     * 请求拦截
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      if (!enabled) return config

      const info = createDebugInfo(config)
      printDebug({
        ...info,
        message: `[YH-Request] → ${info.method} ${info.url}`
      })

      return config
    },

    /**
     * 响应拦截
     */
    onResponse: <T>(response: RequestResponse<T>): RequestResponse<T> => {
      if (!enabled) return response

      const info = createDebugInfo(response.config, response)

      // 添加耗时
      const duration = Date.now() - info.timestamp
      info.duration = duration

      printDebug(info)

      return response
    },

    /**
     * 错误拦截
     */
    onError: (error: RequestError): RequestError => {
      if (!enabled) return error

      const info = createDebugInfo(error.config || {}, undefined, error)
      printDebug(info)

      return error
    }
  }
}

/**
 * 调试日志工具
 */
export class DebugLogger {
  private logs: DebugInfo[] = []
  private maxLogs = 100

  /**
   * 添加日志
   */
  addLog(info: DebugInfo): void {
    this.logs.push(info)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
  }

  /**
   * 获取所有日志
   */
  getLogs(): DebugInfo[] {
    return [...this.logs]
  }

  /**
   * 清除日志
   */
  clear(): void {
    this.logs = []
  }

  /**
   * 根据请求 ID 查找日志
   */
  findByRequestId(requestId: string): DebugInfo[] {
    return this.logs.filter((log) => log.requestId === requestId)
  }

  /**
   * 导出日志
   */
  export(): string {
    return JSON.stringify(this.logs, null, 2)
  }
}

// 创建全局调试日志实例
export const debugLogger = new DebugLogger()
