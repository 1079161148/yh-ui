import {
  type RequestOptions,
  type InternalRequestOptions,
  type RequestResponse,
  type RequestError,
  type RequestInstance,
  type InterceptorManager,
  type CreateRequestOptions,
  type ParamsRecord,
  type ParamValue
} from './types'

/**
 * 生成唯一请求 ID
 */
let requestIdCounter = 0
export function generateRequestId(): string {
  return `req_${Date.now()}_${++requestIdCounter}`
}

/**
 * 序列化 URL 参数
 */
export function serializeParams(params: ParamsRecord): string {
  const searchParams = new URLSearchParams()

  const encode = (value: ParamValue): string => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  const addParam = (key: string, value: ParamValue) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, encode(value))
    }
  }

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v: string | number) => addParam(key, v))
    } else {
      addParam(key, value as ParamValue)
    }
  }

  return searchParams.toString()
}

/**
 * 构建完整 URL
 */
export function buildURL(options: InternalRequestOptions): string {
  const { baseURL = '', url = '', params, serializeParams: sp = true } = options

  let fullPath = url
  if (baseURL) {
    fullPath = url.startsWith('http') ? url : baseURL + url
  }

  if (params && Object.keys(params).length > 0 && sp) {
    const queryString = serializeParams(params)
    const separator = fullPath.includes('?') ? '&' : '?'
    fullPath += separator + queryString
  }

  return fullPath
}

/**
 * 创建请求错误
 */
export function createRequestError(
  error: Error | string,
  config?: InternalRequestOptions,
  response?: Response
): RequestError {
  const err = typeof error === 'string' ? new Error(error) : error

  const requestError: RequestError = {
    name: err.name,
    message: err.message,
    config,
    response,
    requestId: config?.requestId
  }

  // 判断错误类型
  if (error instanceof TypeError && error.message.includes('fetch')) {
    requestError.isNetworkError = true
    requestError.code = 'NETWORK_ERROR'
  } else if (config?.signal?.aborted) {
    requestError.isCanceled = true
    requestError.code = 'CANCELED'
  } else if (response) {
    requestError.code = `HTTP_${response.status}`
  }

  return requestError
}

/**
 * 拦截器管理器
 */
export class InterceptorManagerImpl<T> implements InterceptorManager<T> {
  private handlers: Array<{
    fulfilled: (value: T) => T | Promise<T>
    rejected?: (error: RequestError) => T | Promise<T>
  } | null> = []

  use(
    onFulfilled: (value: T) => T | Promise<T>,
    onRejected?: (error: RequestError) => T | Promise<T>
  ): number {
    this.handlers.push({ fulfilled: onFulfilled, rejected: onRejected })
    return this.handlers.length - 1
  }

  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  clear(): void {
    this.handlers = []
  }

  async execute(value: T): Promise<T> {
    let result = value

    for (const handler of this.handlers) {
      if (handler) {
        try {
          result = await handler.fulfilled(result)
        } catch (error) {
          if (handler.rejected) {
            result = (await handler.rejected(error as RequestError)) as T
          } else {
            throw error
          }
        }
      }
    }

    return result
  }
}

/**
 * 请求客户端类
 */
export class Request implements RequestInstance {
  public defaults: RequestOptions
  public interceptors: {
    request: InterceptorManager<InternalRequestOptions>
    response: InterceptorManager<RequestResponse<unknown>>
  }

  private abortControllers: Map<string, AbortController> = new Map()

  constructor(options: CreateRequestOptions = {}) {
    this.defaults = {
      timeout: 30000,
      credentials: 'same-origin',
      responseType: 'json',
      serializeParams: true,
      retry: false,
      retryTimes: 3,
      retryDelay: 1000,
      retryCondition: (error: RequestError) => {
        // 默认重试条件：网络错误或 5xx 错误
        return error.isNetworkError || (error.response?.status ?? 0) >= 500
      },
      ...options.defaultOptions
    }

    this.interceptors = {
      request: new InterceptorManagerImpl(),
      response: new InterceptorManagerImpl()
    }
  }

  /**
   * 创建请求实例的静态方法
   */
  static create(options?: CreateRequestOptions): Request {
    return new Request(options)
  }

  /**
   * 生成 AbortSignal
   */
  private createAbortSignal(options: InternalRequestOptions): AbortSignal {
    const controller = new AbortController()

    // 存储 AbortController
    if (options.requestKey) {
      // 取消之前的相同 key 请求
      const prevController = this.abortControllers.get(options.requestKey)
      if (prevController) {
        prevController.abort()
      }
      this.abortControllers.set(options.requestKey, controller)
    }

    // 超时自动取消
    if (options.timeout) {
      const timeoutId = setTimeout(() => {
        controller.abort(new Error('Request timeout'))
      }, options.timeout)

      // 清理 timeout
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId)
      })
    }

    return controller.signal
  }

  /**
   * 执行请求
   */
  async request<T = unknown>(
    options: RequestOptions & { url: string }
  ): Promise<RequestResponse<T>> {
    const requestId = generateRequestId()

    // 合并默认配置和传入配置
    const mergedOptions: InternalRequestOptions = {
      ...this.defaults,
      ...options,
      requestId
    }

    // 生成完整 URL
    mergedOptions.fullPath = buildURL(mergedOptions)

    // 创建 AbortSignal
    mergedOptions.signal = this.createAbortSignal(mergedOptions)

    // 请求拦截器
    let config = await this.interceptors.request.execute(mergedOptions)

    // 外部传入的请求拦截器
    if (config.requestInterceptor) {
      config = await config.requestInterceptor(config)
    }

    // 发送请求（带重试逻辑）
    const executeRequest = async (): Promise<RequestResponse<T>> => {
      try {
        // 准备 fetch 参数
        const fetchOptions: RequestInit = {
          method: config.method || 'GET',
          headers: config.headers,
          credentials: config.credentials,
          signal: config.signal
        }

        // 添加请求体
        if (config.data !== undefined && config.method !== 'GET') {
          if (config.responseType === 'formdata' || config.data instanceof FormData) {
            fetchOptions.body = config.data as BodyInit
          } else {
            fetchOptions.body = JSON.stringify(config.data)
            if (!fetchOptions.headers) {
              fetchOptions.headers = {}
            }
            const headers = fetchOptions.headers as Record<string, string>
            if (!headers['Content-Type']) {
              headers['Content-Type'] = 'application/json'
            }
          }
        }

        // 发送请求
        let response: Response

        try {
          response = await fetch(config.fullPath!, fetchOptions)
        } catch (error) {
          throw createRequestError(error as Error, config)
        }

        // 处理非 2xx 状态码
        if (!response.ok) {
          const error = createRequestError(
            `Request failed with status ${response.status}`,
            config,
            response
          )

          // 响应拦截器
          try {
            await this.interceptors.response.execute({
              data: undefined,
              response,
              config,
              requestId
            } as RequestResponse)
          } catch {}

          throw error
        }

        // 解析响应数据
        let data: T

        if (config.rawResponse) {
          data = response as unknown as T
        } else {
          switch (config.responseType) {
            case 'text':
              data = (await response.text()) as T
              break
            case 'blob':
              data = (await response.blob()) as T
              break
            case 'arraybuffer':
              data = (await response.arrayBuffer()) as T
              break
            case 'formdata':
              data = (await response.formData()) as T
              break
            case 'json':
            default:
              const text = await response.text()
              data = text ? JSON.parse(text) : null
              break
          }
        }

        const requestResponse: RequestResponse<T> = {
          data,
          response,
          config,
          requestId
        }

        // 响应拦截器
        const finalResponse = (await this.interceptors.response.execute(
          requestResponse
        )) as RequestResponse<T>

        return finalResponse
      } catch (error: unknown) {
        const requestError = error as RequestError

        // 获取重试次数 (从 config 中获取当前重试次数，或默认为 0)
        const currentRetryCount = (config as unknown as { _retryCount?: number })._retryCount ?? 0
        const maxRetries = config.retryTimes ?? 3

        // 重试逻辑
        const shouldRetry =
          config.retry &&
          currentRetryCount < maxRetries &&
          (!config.retryCondition || config.retryCondition(requestError))

        if (shouldRetry) {
          // 使用延迟计算器计算延迟时间
          const baseDelay = config.retryDelay || 1000
          const delayCalculator = config.retryDelayCalculator || defaultExponentialBackoff
          const delay = delayCalculator(currentRetryCount, baseDelay)

          // 如果返回 -1，表示不再重试
          if (delay < 0) {
            // 错误处理
            if (config.errorHandler) {
              config.errorHandler(requestError)
            }
            throw requestError
          }

          // 等待延迟后重试
          await new Promise((resolve) => setTimeout(resolve, delay))

          // 更新重试计数
          ;(config as unknown as { _retryCount?: number })._retryCount = currentRetryCount + 1

          return executeRequest()
        }

        // 错误处理
        if (config.errorHandler) {
          config.errorHandler(requestError)
        }

        throw requestError
      }
    }

    return executeRequest()
  }

  /**
   * 便捷方法
   */
  get<T = unknown>(url: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'GET' })
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'POST', data })
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'PUT', data })
  }

  delete<T = unknown>(url: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'DELETE' })
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'PATCH', data })
  }

  head<T = unknown>(url: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'HEAD' })
  }

  options<T = unknown>(url: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>({ ...options, url, method: 'OPTIONS' })
  }

  /**
   * 设置默认配置
   */
  setConfig(config: Partial<RequestOptions>): void {
    this.defaults = { ...this.defaults, ...config }
  }

  /**
   * 获取默认配置
   */
  getConfig(): RequestOptions {
    return { ...this.defaults }
  }

  /**
   * 取消所有请求
   */
  cancelAll(): void {
    this.abortControllers.forEach((controller) => {
      controller.abort()
    })
    this.abortControllers.clear()
  }

  /**
   * 取消指定 key 的请求
   */
  cancel(key: string): void {
    const controller = this.abortControllers.get(key)
    if (controller) {
      controller.abort()
      this.abortControllers.delete(key)
    }
  }
}

// ==================== 重试延迟计算器 ====================

/**
 * 默认指数退避延迟计算器 (带随机抖动)
 * @param retryCount 当前重试次数 (从 0 开始)
 * @param defaultDelay 基础延迟时间 (ms)
 * @returns 实际延迟时间 (ms)
 *
 * @example
 * // 第 1 次重试: 1000ms * 2^0 + 随机(0-1000ms) = 1000-2000ms
 * // 第 2 次重试: 1000ms * 2^1 + 随机(0-1000ms) = 2000-3000ms
 * // 第 3 次重试: 1000ms * 2^2 + 随机(0-1000ms) = 4000-5000ms
 */
export function defaultExponentialBackoff(retryCount: number, defaultDelay: number = 1000): number {
  const baseDelay = defaultDelay * Math.pow(2, retryCount)
  const jitter = Math.random() * 1000
  return Math.min(baseDelay + jitter, 30000) // 最大 30 秒
}

/**
 * 线性退避延迟计算器
 * 每次重试延迟线性增长
 *
 * @example
 * // defaultDelay = 1000
 * // 第 1 次重试: 1000ms
 * // 第 2 次重试: 2000ms
 * // 第 3 次重试: 3000ms
 */
export function linearBackoff(retryCount: number, defaultDelay: number): number {
  return defaultDelay * (retryCount + 1)
}

/**
 * 固定延迟计算器
 * 每次重试使用相同的延迟
 */
export function fixedBackoff(_retryCount: number, defaultDelay: number): number {
  return defaultDelay
}

/**
 * 指数退避带最大重试次数限制
 */
export function exponentialBackoffWithMaxRetries(
  retryCount: number,
  defaultDelay: number,
  maxRetries: number = 10
): number {
  if (retryCount >= maxRetries) {
    return -1 // 返回 -1 表示不再重试
  }
  return defaultExponentialBackoff(retryCount, defaultDelay)
}

// 创建默认实例
export const request = new Request()

// 导出创建方法
export const createRequest = (options?: CreateRequestOptions) => new Request(options)

export default request
