/**
 * Vue-specific AI composables
 *
 * 提供与 YH-UI 组件深度集成的 Vue 3 Composition API
 */

import { ref, shallowRef, computed, onUnmounted, type Ref } from 'vue'

// ============================================
// Types
// ============================================

export interface StreamableValue<T = unknown> {
  value: Ref<T>
  loading: Ref<boolean>
  error: Ref<Error | null>
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
  metadata?: Record<string, unknown>
}

export interface ConversationConfig {
  /** 消息历史保留条数 */
  maxHistory?: number
  /** 是否自动保存到 localStorage */
  persist?: boolean
  /** localStorage key */
  storageKey?: string
}

export interface ToolCallHandler {
  name: string
  description?: string
  parameters?: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<unknown>
}

export interface ProviderAdapter {
  name: string
  baseUrl?: string
  apiKey?: string
  defaultModel?: string
}

export interface ModelConfig {
  model: string
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
}

// ============================================
// Streamable Value
// ============================================

/**
 * 创建可流式更新的值
 *
 * @example
 * ```ts
 * const { value, loading, error } = createStreamableValue<string>('')
 *
 * // 在流式更新时
 * value.value = 'Hello '
 * value.value = 'Hello World'
 * loading.value = false
 * ```
 */
export function createStreamableValue<T = unknown>(initialValue?: T): StreamableValue<T> {
  const value = shallowRef<T>(initialValue as T)
  const loading = ref(true)
  const error = shallowRef<Error | null>(null)

  return { value, loading, error }
}

/**
 * 组合使用 streamable value
 *
 * @example
 * ```ts
 * const streamable = createStreamableValue('')
 * const displayValue = useStreamableValue(streamable)
 * ```
 */
export function useStreamableValue<T>(streamable: StreamableValue<T>) {
  const isLoading = computed(() => streamable.loading.value)
  const data = computed(() => streamable.value.value)
  const err = computed(() => streamable.error.value)

  return {
    value: data,
    loading: isLoading,
    error: err
  }
}

// ============================================
// Conversation Management
// ============================================

/**
 * 对话历史管理
 *
 * @example
 * ```ts
 * const { messages, addMessage, clearHistory, loadHistory } = useConversation()
 *
 * // 添加消息
 * addMessage({ role: 'user', content: 'Hello' })
 *
 * // 获取历史
 * console.log(messages.value)
 * ```
 */
export function useConversation(config: ConversationConfig = {}) {
  const { maxHistory = 50, persist = false, storageKey = 'yh-ai-conversation' } = config

  const messages = ref<ConversationMessage[]>([])

  // 从 localStorage 加载历史
  const loadHistory = () => {
    if (persist) {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          messages.value = JSON.parse(stored)
        } catch {
          messages.value = []
        }
      }
    }
  }

  // 保存到 localStorage
  const saveHistory = () => {
    if (persist) {
      localStorage.setItem(storageKey, JSON.stringify(messages.value))
    }
  }

  // 添加消息
  const addMessage = (message: Omit<ConversationMessage, 'id' | 'createdAt'>) => {
    const newMessage: ConversationMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date()
    }

    messages.value = [...messages.value, newMessage].slice(-maxHistory)
    saveHistory()

    return newMessage
  }

  // 清空历史
  const clearHistory = () => {
    messages.value = []
    if (persist) {
      localStorage.removeItem(storageKey)
    }
  }

  // 初始化加载
  loadHistory()

  return {
    messages,
    addMessage,
    clearHistory,
    loadHistory,
    saveHistory
  }
}

// ============================================
// AI Chat Hook (兼容 Vercel AI SDK)
// ============================================

export interface UseAIChatOptions {
  /** API 端点 */
  api: string
  /** 初始消息 */
  initialMessages?: ConversationMessage[]
  /** 请求头 */
  headers?: Record<string, string>
  /** Body 额外参数 */
  body?: Record<string, unknown>
  /** 回调：发送前 */
  onRequest?: (message: string) => void
  /** 回调：收到响应 */
  onResponse?: (response: Response) => void
  /** 回调：完成 */
  onFinish?: (message: ConversationMessage) => void
  /** 回调：出错 */
  onError?: (error: Error) => void
}

export interface UseAIChatReturn {
  /** 消息列表 */
  messages: Ref<ConversationMessage[]>
  /** 输入内容 */
  input: Ref<string>
  /** 是否正在加载 */
  isLoading: Ref<boolean>
  /** 错误 */
  error: Ref<Error | null>
  /** 发送消息 */
  sendMessage: (content: string) => Promise<void>
  /** 追加内容（用于流式） */
  append: (content: string, role?: 'user' | 'assistant') => void
  /** 重置 */
  reload: () => void
}

/**
 * AI 对话 hook
 *
 * @example
 * ```ts
 * const { messages, input, isLoading, sendMessage } = useAIChat({
 *   api: '/api/chat',
 *   onFinish: (msg) => console.log('完成:', msg.content)
 * })
 *
 * await sendMessage('你好')
 * ```
 */
export function useAIChat(options: UseAIChatOptions): UseAIChatReturn {
  const {
    api,
    initialMessages = [],
    headers = {},
    body = {},
    onRequest,
    onResponse,
    onFinish,
    onError
  } = options

  const messages = ref<ConversationMessage[]>([...initialMessages])
  const input = ref('')
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const append = (content: string, role: 'user' | 'assistant' = 'user'): ConversationMessage => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role,
      content,
      createdAt: new Date()
    }
    messages.value = [...messages.value, newMessage]
    return newMessage
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading.value) return

    error.value = null
    isLoading.value = true

    // 添加用户消息
    append(content, 'user')
    input.value = ''

    try {
      onRequest?.(content)

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          messages: messages.value.map((m) => ({ role: m.role, content: m.content })),
          ...body
        })
      })

      onResponse?.(response)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // 添加助手消息
      const assistantMessage = append(data.content || data.message?.content || '', 'assistant')

      onFinish?.(assistantMessage)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      error.value = errorObj
      onError?.(errorObj)
    } finally {
      isLoading.value = false
    }
  }

  const reload = () => {
    messages.value = [...initialMessages]
    input.value = ''
    error.value = null
  }

  return {
    messages,
    input,
    isLoading,
    error,
    sendMessage,
    append,
    reload
  }
}

// ============================================
// Stream Hook
// ============================================

export interface UseAIStreamOptions {
  /** 流式 API 端点 */
  api: string
  /** 初始内容 */
  initialContent?: string
  /** 回调：每个 chunk */
  onChunk?: (chunk: string) => void
  /** 回调：完成 */
  onFinish?: (fullContent: string) => void
  /** 回调：出错 */
  onError?: (error: Error) => void
}

export interface UseAIStreamReturn {
  /** 当前内容 */
  content: Ref<string>
  /** 是否正在流式 */
  isStreaming: Ref<boolean>
  /** 错误 */
  error: Ref<Error | null>
  /** 开始流式请求 */
  start: (prompt: string) => Promise<void>
  /** 停止 */
  stop: () => void
}

/**
 * 流式文本生成 hook
 *
 * @example
 * ```ts
 * const { content, isStreaming, start, stop } = useAIStream({
 *   api: '/api/chat/stream',
 *   onChunk: (chunk) => console.log('收到:', chunk),
 *   onFinish: (text) => console.log('完成:', text)
 * })
 *
 * await start('请介绍一下 Vue 3')
 * ```
 */
export function useAIStream(options: UseAIStreamOptions): UseAIStreamReturn {
  const { api, initialContent = '', onChunk, onFinish, onError } = options

  const content = shallowRef(initialContent)
  const isStreaming = ref(false)
  const error = ref<Error | null>(null)
  let abortController: AbortController | null = null

  const start = async (prompt: string) => {
    if (isStreaming.value) {
      stop()
    }

    error.value = null
    isStreaming.value = true
    content.value = ''

    abortController = new AbortController()

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt }),
        signal: abortController.signal
      })

      if (!response.ok || !response.body) {
        throw new Error(`Stream Error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        content.value += chunk
        onChunk?.(chunk)
      }

      onFinish?.(content.value)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        error.value = errorObj
        onError?.(errorObj)
      }
    } finally {
      isStreaming.value = false
      abortController = null
    }
  }

  const stop = () => {
    if (abortController) {
      abortController.abort()
      isStreaming.value = false
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    content,
    isStreaming,
    error,
    start,
    stop
  }
}

// ============================================
// Tool Calling
// ============================================

/**
 * 创建 AI 函数工具
 *
 * @example
 * ```ts
 * const weatherTool = createYHFunctionTool({
 *   name: 'get_weather',
 *   description: '获取指定城市的天气',
 *   parameters: {
 *     type: 'object',
 *     properties: {
 *       city: { type: 'string', description: '城市名称' }
 *     },
 *     required: ['city']
 *   },
 *   execute: async ({ city }) => {
 *     return `当前${city}天气晴朗，25°C`
 *   }
 * })
 * ```
 */
export function createYHFunctionTool<_T extends Record<string, unknown> = Record<string, unknown>>(
  tool: ToolCallHandler
) {
  return {
    type: 'function' as const,
    name: tool.name,
    description: tool.description || '',
    parameters: tool.parameters || {},
    execute: tool.execute
  }
}

// ============================================
// Provider Adapter
// ============================================

/**
 * 创建 AI Provider 适配器
 *
 * @example
 * ```ts
 * const openai = createProviderAdapter({
 *   name: 'openai',
 *   baseUrl: 'https://api.openai.com/v1',
 *   apiKey: process.env.OPENAI_API_KEY,
 *   defaultModel: 'gpt-4'
 * })
 * ```
 */
export function createProviderAdapter(config: ProviderAdapter): ProviderAdapter & {
  createChat: (model?: string | ModelConfig) => unknown
} {
  return {
    ...config,
    createChat: (model?: string | ModelConfig) => {
      const modelConfig = typeof model === 'string' ? { model } : model || {}
      // 这里返回适配后的 chat 实例
      return {
        provider: config.name,
        ...modelConfig
      }
    }
  }
}

// ============================================
// AI Context (用于组件间共享)
// ============================================

export interface AIContextValue {
  /** 当前会话 ID */
  sessionId: Ref<string | null>
  /** 提供者配置 */
  provider: Ref<ProviderAdapter | null>
  /** 模型配置 */
  modelConfig: Ref<ModelConfig>
  /** 设置会话 */
  setSession: (id: string) => void
  /** 设置提供者 */
  setProvider: (provider: ProviderAdapter) => void
  /** 设置模型 */
  setModel: (config: ModelConfig) => void
}

const AIContextKey = Symbol('yh-ai-context')

/**
 * 创建 AI 上下文（供 provide/inject 使用）
 */
export function createAIContext(
  initialProvider?: ProviderAdapter,
  initialModel?: string
): AIContextValue {
  const sessionId = ref<string | null>(null)
  const provider = ref<ProviderAdapter | null>(initialProvider || null)
  const modelConfig = ref<ModelConfig>({ model: initialModel || 'gpt-4' })

  return {
    sessionId,
    provider,
    modelConfig,
    setSession: (id: string) => {
      sessionId.value = id
    },
    setProvider: (p: ProviderAdapter) => {
      provider.value = p
    },
    setModel: (config: ModelConfig) => {
      modelConfig.value = config
    }
  }
}

// Re-export for convenience
export { AIContextKey }
