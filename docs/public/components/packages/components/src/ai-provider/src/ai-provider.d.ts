import type { InjectionKey, Ref } from 'vue'
import type { StreamChunkParser } from '@yh-ui/hooks'
/**
 * 请求拦截器 - 类似 Axios Interceptors
 */
export interface AiRequestInterceptor {
  /**
   * 请求 ID（用于识别和移除）
   */
  id?: string
  /**
   * 请求前拦截（可修改 headers、追加 token 等）
   */
  onRequest?: (config: {
    url: string
    headers: Record<string, string>
    body: unknown
    method?: string
  }) =>
    | {
        url: string
        headers: Record<string, string>
        body: unknown
        method?: string
      }
    | void
    | Promise<{
        url: string
        headers: Record<string, string>
        body: unknown
        method?: string
      } | void>
  /**
   * 请求错误拦截器
   */
  onRequestError?: (error: Error) => void
}
/**
 * 响应拦截器
 */
export interface AiResponseInterceptor {
  /**
   * 请求 ID（用于识别和移除）
   */
  id?: string
  /**
   * 响应成功拦截器
   */
  onResponse?: (response: Response) => Response | void | Promise<Response | void>
  /**
   * 响应错误拦截器
   */
  onResponseError?: (error: Error) => void
}
/**
 * 拦截器管理器
 */
export declare class AiInterceptorManager<T> {
  private interceptors
  /**
   * 添加拦截器
   */
  use(interceptor: T): number
  /**
   * 移除拦截器
   */
  eject(id: number): void
  /**
   * 清空所有拦截器
   */
  clear(): void
  /**
   * 遍历所有拦截器
   */
  forEach(fn: (interceptor: T, index: number) => void): void
  /**
   * 获取所有拦截器
   */
  getAll(): (T | null)[]
}
/**
 * 请求配置
 */
export interface AiRequestConfig {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
  [key: string]: unknown
}
/**
 * 响应数据
 */
export interface AiResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}
/**
 * 请求错误
 */
export declare class AiRequestError extends Error {
  config?: AiRequestConfig
  code?: string
  status?: number
  constructor(message: string, config?: AiRequestConfig, code?: string)
}
/**
 * YhAiProvider 全局配置上下文
 */
export interface AiProviderConfig {
  /**
   * 全局 AI 接口基础 URL
   */
  baseUrl?: string
  /**
   * 鉴权 Token（Bearer）
   */
  token?: string | Ref<string>
  /**
   * 全局请求头追加
   */
  headers?: Record<string, string>
  /**
   * 全局 SSE/流解析器
   * 默认使用明文字符串解析，可传入openaiParser等
   */
  parser?: StreamChunkParser
  /**
   * 用户头像（用于对话气泡展示）
   */
  userAvatar?: string
  /**
   * 助手头像
   */
  assistantAvatar?: string
  /**
   * 用户显示名称
   */
  userName?: string
  /**
   * 助手显示名称
   */
  assistantName?: string
  /**
   * 全局系统 Prompt
   */
  systemPrompt?: string
  /**
   * 打字机效果设置
   */
  typewriter?: {
    enabled?: boolean
    charsPerFrame?: number
  }
  /**
   * 请求拦截器（已废弃，请使用 interceptors.request）
   */
  interceptors?: AiRequestInterceptor
  /**
   * 请求拦截器管理器
   */
  requestInterceptors?: AiInterceptorManager<AiRequestInterceptor>
  /**
   * 响应拦截器管理器
   */
  responseInterceptors?: AiInterceptorManager<AiResponseInterceptor>
  /**
   * 全局错误处理
   */
  onError?: (err: Error) => void
  /**
   * 请求超时时间（毫秒）
   */
  timeout?: number
  /**
   * 是否允许携带凭证
   */
  withCredentials?: boolean
  /**
   * 默认请求模式
   */
  mode?: 'cors' | 'no-cors' | 'same-origin'
  /**
   * 默认缓存模式
   */
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
}
export interface AiProviderProps {
  baseUrl?: string
  token?: string
  headers?: Record<string, string>
  userAvatar?: string
  assistantAvatar?: string
  userName?: string
  assistantName?: string
  systemPrompt?: string
  typewriter?: {
    enabled?: boolean
    charsPerFrame?: number
  }
  timeout?: number
  withCredentials?: boolean
  mode?: 'cors' | 'no-cors' | 'same-origin'
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
}
export interface AiProviderSlots {
  default?: () => unknown
}
export interface AiProviderExpose {
  addRequestInterceptor: (interceptor: AiRequestInterceptor) => number
  addResponseInterceptor: (interceptor: AiResponseInterceptor) => number
  removeRequestInterceptor: (id: number) => void
  removeResponseInterceptor: (id: number) => void
  clearInterceptors: () => void
}
/**
 * 创建拦截器管理器
 */
export declare function createInterceptors(): {
  request: AiInterceptorManager<AiRequestInterceptor>
  response: AiInterceptorManager<AiResponseInterceptor>
}
/**
 * 注入 key（内部使用）
 */
export declare const AI_PROVIDER_KEY: InjectionKey<AiProviderConfig>
