/**
 * 跨平台适配器
 * 支持 Node.js、Deno、Bun、边缘计算环境
 */

import type { InternalRequestOptions, RequestResponse, HttpAdapter } from '../types'

// ==================== 类型定义 ====================

/** 环境类型 */
export type RuntimeEnvironment = 'browser' | 'node' | 'deno' | 'bun' | 'edge'

/** 平台检测结果 */
export interface PlatformInfo {
  /** 当前环境 */
  environment: RuntimeEnvironment
  /** 是否支持 fetch */
  supportsFetch: boolean
  /** 是否支持 FormData */
  supportsFormData: boolean
  /** 是否支持 AbortController */
  supportsAbortController: boolean
}

// ==================== 全局类型声明 ====================

// 声明 Deno 全局对象
declare const Deno:
  | {
      version: string
      env: {
        get(key: string): string | undefined
      }
    }
  | undefined

// 声明 Bun 全局对象
declare const Bun:
  | {
      version: string
    }
  | undefined

// ==================== 环境检测 ====================

/**
 * 检测当前运行环境
 */
export function detectPlatform(): PlatformInfo {
  const globalObj =
    typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {}

  // 检测 Deno
  if (typeof Deno !== 'undefined') {
    return {
      environment: 'deno',
      supportsFetch: true,
      supportsFormData: true,
      supportsAbortController: true
    }
  }

  // 检测 Bun
  if (typeof Bun !== 'undefined') {
    return {
      environment: 'bun',
      supportsFetch: true,
      supportsFormData: true,
      supportsAbortController: true
    }
  }

  // 检测边缘计算环境 (Cloudflare Workers, Vercel Edge, etc.)
  if (
    (globalObj as { edgeRuntime?: unknown }).edgeRuntime !== undefined ||
    (typeof navigator !== 'undefined' && navigator.userAgent.includes('Cloudflare')) ||
    (globalObj as { caches?: unknown }).caches !== undefined
  ) {
    return {
      environment: 'edge',
      supportsFetch: true,
      supportsFormData: true,
      supportsAbortController: true
    }
  }

  // 检测 Node.js
  if (
    typeof process !== 'undefined' &&
    (process as { versions?: { node?: string } }).versions?.node
  ) {
    return {
      environment: 'node',
      supportsFetch: typeof fetch !== 'undefined',
      supportsFormData: typeof FormData !== 'undefined',
      supportsAbortController: typeof AbortController !== 'undefined'
    }
  }

  // 默认为浏览器
  return {
    environment: 'browser',
    supportsFetch: typeof fetch !== 'undefined',
    supportsFormData: typeof FormData !== 'undefined',
    supportsAbortController: typeof AbortController !== 'undefined'
  }
}

/**
 * 获取当前平台信息
 */
export const platform = detectPlatform()

// ==================== Node.js 适配器 ====================

/**
 * Node.js HTTP 适配器
 * 使用原生 http/https 模块，无需额外依赖
 */
export class NodeHttpAdapter implements HttpAdapter {
  name = 'node-http'

  private http = NodeHttpAdapter.getHttpModule()

  private static getHttpModule(): typeof import('http') | typeof import('https') {
    // 动态导入 http/https
    try {
      // Node.js 18+ 内置 fetch，但为了兼容性我们优先使用 http 模块
      return require('http')
    } catch {
      throw new Error('Node.js http module is not available')
    }
  }

  isSupported(): boolean {
    return typeof process !== 'undefined' && !!process.versions?.node
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const { fullPath, method = 'GET', headers = {}, data, signal, credentials } = config

    return new Promise((resolve, reject) => {
      const urlObj = new URL(fullPath!)
      const isHttps = urlObj.protocol === 'https:'
      const httpModule = isHttps ? (require('https') as typeof import('https')) : this.http

      const options: import('http').RequestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method,
        headers: {
          ...headers,
          // 处理凭证
          ...(credentials === 'include' ? { Cookie: '' } : {})
        },
        timeout: config.timeout || 30000
      }

      // 处理 HTTPS 请求
      if (isHttps) {
        Object.assign(options, {
          rejectUnauthorized: false // 允许自签名证书（可选配置）
        })
      }

      const req = httpModule.request(options, (res) => {
        // 收集响应数据
        const chunks: Buffer[] = []

        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk)
        })

        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf-8')

          // 解析响应
          let responseData: T
          if (config.responseType === 'text') {
            responseData = body as T
          } else if (config.responseType === 'arraybuffer') {
            responseData = Buffer.from(body).buffer as T
          } else if (config.responseType === 'blob') {
            responseData = Buffer.from(body) as unknown as T
          } else {
            try {
              responseData = body ? JSON.parse(body) : (null as T)
            } catch {
              responseData = body as T
            }
          }

          // 构建模拟 Response 对象
          const mockResponse = {
            ok: (res.statusCode || 200) >= 200 && (res.statusCode || 200) < 300,
            status: res.statusCode || 200,
            statusText: res.statusMessage || '',
            headers: res.headers,
            text: () => Promise.resolve(body),
            json: () => Promise.resolve(responseData),
            blob: () => Promise.resolve(Buffer.from(body) as unknown as Blob),
            arrayBuffer: () => Promise.resolve(Buffer.from(body).buffer),
            formData: () => Promise.resolve(new URLSearchParams(body) as unknown as FormData)
          } as unknown as Response

          resolve({
            data: responseData,
            response: mockResponse,
            config,
            requestId: config.requestId!
          })
        })
      })

      // 超时处理
      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Request timeout'))
      })

      // 错误处理
      req.on('error', (error) => {
        reject(error)
      })

      // 处理 AbortSignal
      if (signal) {
        signal.addEventListener('abort', () => {
          req.destroy()
          reject(new DOMException('Aborted', 'AbortError'))
        })
      }

      // 发送请求体
      if (data && method !== 'GET') {
        const body = typeof data === 'string' ? data : JSON.stringify(data)
        req.write(body)
      }

      req.end()
    })
  }
}

// ==================== Deno 适配器 ====================

/**
 * Deno 适配器
 * 使用 Deno 标准库 fetch
 */
export class DenoAdapter implements HttpAdapter {
  name = 'deno'

  isSupported(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (globalThis as any).Deno !== 'undefined'
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const {
      fullPath,
      method = 'GET',
      headers = {},
      data,
      signal,
      credentials,
      responseType,
      timeout
    } = config

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: credentials as RequestCredentials
    }

    // 处理请求体
    if (data && method !== 'GET') {
      if (data instanceof FormData) {
        fetchOptions.body = data as BodyInit
      } else {
        fetchOptions.body = JSON.stringify(data)
        if (!headers['Content-Type']) {
          ;(fetchOptions.headers as Record<string, string>)['Content-Type'] = 'application/json'
        }
      }
    }

    // 处理超时和中止
    const controller = new AbortController()
    fetchOptions.signal = controller.signal

    if (timeout) {
      setTimeout(() => controller.abort(), timeout).unref?.()
    }

    if (signal) {
      signal.addEventListener('abort', () => controller.abort())
    }

    const response = await fetch(fullPath!, fetchOptions)

    // 解析响应
    let responseData: T

    switch (responseType) {
      case 'text':
        responseData = (await response.text()) as T
        break
      case 'blob':
        responseData = (await response.blob()) as T
        break
      case 'arraybuffer':
        responseData = (await response.arrayBuffer()) as T
        break
      case 'formdata':
        responseData = (await response.formData()) as T
        break
      default:
        const text = await response.text()
        responseData = text ? JSON.parse(text) : (null as T)
    }

    return {
      data: responseData,
      response,
      config,
      requestId: config.requestId!
    }
  }
}

// ==================== Bun 适配器 ====================

/**
 * Bun 适配器
 * 使用 Bun 原生 fetch 和 FormData
 */
export class BunAdapter implements HttpAdapter {
  name = 'bun'

  isSupported(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (globalThis as any).Bun !== 'undefined'
  }

  // Bun 直接使用 fetch，与 FetchAdapter 相同
  // 但保留此类以便未来可能的 Bun 特定优化
  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const {
      fullPath,
      method = 'GET',
      headers = {},
      data,
      signal,
      credentials,
      responseType,
      timeout
    } = config

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: credentials as RequestCredentials
    }

    // 处理请求体
    if (data && method !== 'GET') {
      if (data instanceof FormData) {
        fetchOptions.body = data as BodyInit
      } else {
        fetchOptions.body = JSON.stringify(data)
        if (!headers['Content-Type']) {
          ;(fetchOptions.headers as Record<string, string>)['Content-Type'] = 'application/json'
        }
      }
    }

    // 处理超时
    if (timeout) {
      const controller = new AbortController()
      fetchOptions.signal = controller.signal
      setTimeout(() => controller.abort(), timeout)
    } else if (signal) {
      fetchOptions.signal = signal
    }

    const response = await fetch(fullPath!, fetchOptions)

    // 解析响应
    let responseData: T

    switch (responseType) {
      case 'text':
        responseData = (await response.text()) as T
        break
      case 'blob':
        responseData = (await response.blob()) as T
        break
      case 'arraybuffer':
        responseData = (await response.arrayBuffer()) as T
        break
      case 'formdata':
        responseData = (await response.formData()) as T
        break
      default:
        const text = await response.text()
        responseData = text ? JSON.parse(text) : (null as T)
    }

    return {
      data: responseData,
      response,
      config,
      requestId: config.requestId!
    }
  }
}

// ==================== 边缘计算适配器 ====================

/**
 * 边缘计算适配器
 * 针对 Cloudflare Workers、Vercel Edge 等环境优化
 */
export class EdgeAdapter implements HttpAdapter {
  name = 'edge'

  isSupported(): boolean {
    return platform.environment === 'edge'
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const {
      fullPath,
      method = 'GET',
      headers = {},
      data,
      signal,
      credentials,
      responseType,
      timeout
    } = config

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: credentials as RequestCredentials
    }

    // 处理请求体 - 边缘环境可能不支持 FormData
    if (data && method !== 'GET') {
      if (data instanceof URLSearchParams) {
        fetchOptions.body = data
      } else {
        fetchOptions.body = JSON.stringify(data)
        if (!headers['Content-Type']) {
          ;(fetchOptions.headers as Record<string, string>)['Content-Type'] = 'application/json'
        }
      }
    }

    // 处理超时
    if (timeout) {
      const controller = new AbortController()
      fetchOptions.signal = controller.signal
      setTimeout(() => controller.abort(), timeout)
    } else if (signal) {
      fetchOptions.signal = signal
    }

    const response = await fetch(fullPath!, fetchOptions)

    // 解析响应
    let responseData: T

    switch (responseType) {
      case 'text':
        responseData = (await response.text()) as T
        break
      case 'blob':
        responseData = (await response.blob()) as T
        break
      case 'arraybuffer':
        responseData = (await response.arrayBuffer()) as T
        break
      default:
        const text = await response.text()
        responseData = text ? JSON.parse(text) : (null as T)
    }

    return {
      data: responseData,
      response,
      config,
      requestId: config.requestId!
    }
  }
}

// ==================== 适配器工厂 ====================

/**
 * 自动选择最佳适配器
 */
export function getBestAdapter(): HttpAdapter {
  const { environment } = platform

  switch (environment) {
    case 'deno':
      return new DenoAdapter()
    case 'bun':
      return new BunAdapter()
    case 'edge':
      return new EdgeAdapter()
    case 'node':
      return new NodeHttpAdapter()
    case 'browser':
    default:
      // 浏览器环境使用 FetchAdapter
      return new (require('./fetch').FetchAdapter)()
  }
}

/**
 * 根据环境名称获取适配器
 */
export function getAdapter(environment: RuntimeEnvironment): HttpAdapter {
  switch (environment) {
    case 'deno':
      return new DenoAdapter()
    case 'bun':
      return new BunAdapter()
    case 'edge':
      return new EdgeAdapter()
    case 'node':
      return new NodeHttpAdapter()
    case 'browser':
    default:
      return new (require('./fetch').FetchAdapter)()
  }
}
