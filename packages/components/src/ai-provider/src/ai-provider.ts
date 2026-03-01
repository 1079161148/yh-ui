import type { InjectionKey, Ref } from 'vue'
import type { StreamChunkParser } from '@yh-ui/hooks'

/**
 * 请求拦截器 - 类似 Axios Interceptors
 */
export interface AiRequestInterceptor {
  /**
   * 请求前拦截（可修改 headers、追加 token 等）
   */
  onRequest?: (config: {
    url: string
    headers: Record<string, string>
    body: unknown
  }) => { url: string; headers: Record<string, string>; body: unknown } | void

  /**
   * 响应后拦截（可做日志、全局错误处理等）
   */
  onResponse?: (response: Response) => Response | void

  /**
   * 错误拦截器
   */
  onError?: (error: Error) => void
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
   * 请求拦截器
   */
  interceptors?: AiRequestInterceptor

  /**
   * 全局错误处理
   */
  onError?: (err: Error) => void
}

/**
 * 注入 key（内部使用）
 */
export const AI_PROVIDER_KEY: InjectionKey<AiProviderConfig> = Symbol('YhAiProvider')
