/**
 * @yh-ui/request 严格类型定义
 * 杜绝 any，全链路类型安全
 */

// ==================== 基础类型 ====================

/** HTTP 方法 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/** 响应数据类型 */
export type ResponseType = 'json' | 'text' | 'blob' | 'arraybuffer' | 'formdata'

/** 可序列化的查询参数值 */
export type ParamValue = string | number | boolean | string[] | number[]

/** 查询参数对象 */
export type ParamsRecord = Record<string, ParamValue>

/** 请求体类型约束 */
export type RequestBody = Record<string, unknown> | FormData | Blob | ArrayBuffer | string | null

// ==================== 重试延迟计算器 ====================

/** 重试延迟计算器类型 */
export type RetryDelayCalculator = (retryCount: number, defaultDelay: number) => number

// ==================== 路径参数类型 ====================

/**
 * 从 URL 路径中提取路径参数
 * @example
 * type Params = PathParams<'/api/users/:id'>
 * // => { id: string }
 */
export type PathParams<T extends string> = T extends `${infer _}:${infer Param}/${infer Rest}`
  ? Param extends string
    ? { [K in Param]: string } & PathParams<Rest>
    : never
  : T extends `${infer _}:${infer Param}`
    ? { [K in Param]: string }
    : Record<string, never>

/**
 * 构建带路径参数的 URL
 * @example
 * const url = buildPath('/api/users/:id', { id: '123' })
 * // => '/api/users/123'
 */
export function buildPath<T extends string>(path: T, params: PathParams<T>): string {
  let result: string = path
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`:${key}`, encodeURIComponent(String(value)))
  }
  return result
}

// ==================== 请求配置 ====================

export interface RequestOptions<TRequest = unknown> {
  /** 请求基础 URL */
  baseURL?: string
  /** 请求路径 */
  url?: string
  /** 请求方法 */
  method?: HttpMethod
  /** URL 查询参数 */
  params?: ParamsRecord
  /** 请求体数据 */
  data?: TRequest
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求超时时间 (ms) */
  timeout?: number
  /** credentials 模式 */
  credentials?: RequestCredentials
  /** 响应类型 */
  responseType?: ResponseType
  /** 是否 retry */
  retry?: boolean
  /** 重试次数 */
  retryTimes?: number
  /** 重试延迟 (ms) */
  retryDelay?: number
  /** 重试条件函数 */
  retryCondition?: (error: RequestError) => boolean
  /** 重试延迟计算器 */
  retryDelayCalculator?: RetryDelayCalculator
  /** 请求拦截器 */
  requestInterceptor?: (
    config: InternalRequestOptions
  ) => InternalRequestOptions | Promise<InternalRequestOptions>
  /** 响应拦截器 */
  responseInterceptor?: <T>(
    response: RequestResponse<T>
  ) => RequestResponse<T> | Promise<RequestResponse<T>>
  /** 错误处理函数 */
  errorHandler?: (error: RequestError) => void
  /** 是否返回原始响应 */
  rawResponse?: boolean
  /** 是否自动序列化 params */
  serializeParams?: boolean
  /** 是否 abort 上一个相同 key 的请求 */
  abortSameKey?: boolean
  /** 请求唯一标识 key（用于去重） */
  requestKey?: string
  /** 调试模式 */
  debug?: boolean
  /** 回退数据（请求失败时返回） */
  fallbackData?: unknown
  /** AbortSignal */
  signal?: AbortSignal
}

export interface InternalRequestOptions<TRequest = unknown> extends RequestOptions<TRequest> {
  /** 完整的请求 URL */
  fullPath?: string
  /** AbortSignal */
  signal?: AbortSignal
  /** 请求 ID */
  requestId?: string
}

// ==================== 响应类型 ====================

export interface RequestResponse<T = unknown> {
  /** 响应数据 */
  data: T
  /** 原始响应 */
  response: Response
  /** 请求配置 */
  config: InternalRequestOptions
  /** 请求 ID */
  requestId: string
  /** 请求耗时 (ms) */
  duration?: number
}

// ==================== 错误类型 ====================

export interface RequestError extends Error {
  message: string
  name: string
  code?: string
  originalError?: Error
  config?: InternalRequestOptions
  response?: Response
  isTimeout?: boolean
  isNetworkError?: boolean
  isCanceled?: boolean
  requestId?: string
}

// ==================== 拦截器 ====================

export interface InterceptorManager<T> {
  use(
    onFulfilled: (value: T) => T | Promise<T>,
    onRejected?: (error: RequestError) => T | Promise<T>
  ): number
  eject(id: number): void
  clear(): void
  execute(value: T): Promise<T>
}

// ==================== 适配器架构 ====================

/** HTTP 适配器接口 - 支持多运行时 */
export interface HttpAdapter {
  /** 适配器名称 */
  name: string
  /** 发送请求 */
  request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>>
  /** 是否支持当前环境 */
  isSupported(): boolean
}

// ==================== 请求实例 ====================

export interface RequestInstance {
  request<TResponse = unknown, TRequest = unknown>(
    options: RequestOptions<TRequest> & { url: string }
  ): Promise<RequestResponse<TResponse>>
  get<T = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    options?: Omit<RequestOptions<D>, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    options?: Omit<RequestOptions<D>, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  delete<T = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    options?: Omit<RequestOptions<D>, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  head<T = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ): Promise<RequestResponse<T>>
  options<T = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ): Promise<RequestResponse<T>>

  setConfig(config: Partial<RequestOptions>): void
  getConfig(): RequestOptions
  interceptors: {
    request: InterceptorManager<InternalRequestOptions>
    response: InterceptorManager<RequestResponse<unknown>>
  }
  cancelAll(): void
  cancel(key: string): void
}

// ==================== 创建选项 ====================

export interface CreateRequestOptions extends Partial<RequestOptions> {
  defaultOptions?: Partial<RequestOptions>
  instanceId?: string
  /** 自定义适配器 */
  adapter?: HttpAdapter
}
