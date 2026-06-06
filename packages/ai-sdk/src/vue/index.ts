/**
 * Vue-specific AI composables
 *
 * 提供与 YH-UI 组件深度集成的 Vue 3 Composition API
 * 增强版本：多会话支持、XRequest 中间件、缓存重试
 */

import { ref, shallowRef, computed, onUnmounted, type Ref } from 'vue'

// ============================================
// Types - 基础类型
// ============================================

export interface StreamableValue<T = unknown> {
  value: Ref<T>
  loading: Ref<boolean>
  error: Ref<Error | null>
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  name?: string
  toolCallId?: string
  toolCalls?: ToolCall[]
  createdAt?: Date
  metadata?: Record<string, unknown>
}

export interface ToolCall {
  id: string
  type: 'function'
  name: string
  arguments: Record<string, unknown>
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
  stop?: string[]
}

// ============================================
// 新增：XRequest 请求配置
// ============================================

export interface XRequestConfig {
  /** 请求 URL */
  url: string
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求体 */
  body?: Record<string, unknown>
  /** 查询参数 */
  params?: Record<string, string>
  /** 超时时间 (ms) */
  timeout?: number
  /** 是否启用流式 */
  stream?: boolean
  /** 请求标识 */
  requestId?: string
  /** 额外数据 */
  extra?: Record<string, unknown>
}

export interface XRequestCallbacks {
  /** 请求开始 */
  onStart?: (config: XRequestConfig) => void
  /** 收到响应头 */
  onResponse?: (response: Response) => void
  /** 流式 chunk */
  onChunk?: (chunk: string, data?: unknown) => void
  /** 流式完成 */
  onFinish?: (fullContent: string, data?: unknown) => void
  /** 请求错误 */
  onError?: (error: Error) => void
  /** 请求完成 (无论成功失败) */
  onFinally?: () => void
}

// ============================================
// 新增：中间件类型
// ============================================

export interface AIMiddleware {
  /** 中间件名称 */
  name: string
  /** 请求前拦截 */
  onRequest?: (config: XRequestConfig) => XRequestConfig | Promise<XRequestConfig>
  /** 响应后拦截 */
  onResponse?: (response: unknown, config: XRequestConfig) => unknown
  /** 流式 chunk 拦截 */
  onChunk?: (chunk: string, config: XRequestConfig) => string
  /** 错误拦截 */
  onError?: (error: Error, config: XRequestConfig) => Error
}

// ============================================
// 新增：缓存配置
// ============================================

export interface CacheConfig {
  /** 启用缓存 */
  enabled?: boolean
  /** 缓存 key */
  key?: string
  /** 缓存时间 (ms) */
  ttl?: number
  /** 缓存策略 */
  strategy?: 'memory' | 'localStorage' | 'sessionStorage'
}

// ============================================
// 新增：重试配置
// ============================================

export interface RetryConfig {
  /** 启用重试 */
  enabled?: boolean
  /** 最大重试次数 */
  maxRetries?: number
  /** 重试延迟 (ms) */
  retryDelay?: number
  /** 重试条件 */
  retryCondition?: (error: Error) => boolean
}

// ============================================
// 新增：多会话类型
// ============================================

export interface Conversation {
  id: string
  title: string
  messages: ConversationMessage[]
  createdAt: Date
  updatedAt: Date
  metadata?: Record<string, unknown>
}

export interface UseConversationsOptions {
  /** 最大会话数 */
  maxConversations?: number
  /** 是否持久化 */
  persist?: boolean
  /** 存储 key */
  storageKey?: string
  /** 自动生成标题 */
  autoTitle?: boolean
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
// 新增：XRequest 请求层 (类似 Ant Design X)
// ============================================

/**
 * 全局中间件注册表
 */
const globalMiddlewares: AIMiddleware[] = []

/**
 * 注册全局中间件
 */
export function registerMiddleware(middleware: AIMiddleware): () => void {
  globalMiddlewares.push(middleware)
  return () => {
    const index = globalMiddlewares.indexOf(middleware)
    if (index > -1) {
      globalMiddlewares.splice(index, 1)
    }
  }
}

/**
 * 全局缓存存储
 */
const cacheStorage = new Map<string, { data: unknown; expiry: number }>()

/**
 * 生成缓存 key
 */
function generateCacheKey(config: XRequestConfig): string {
  const { url, method = 'POST', body, params } = config
  const keyData = { url, method, body, params }
  return `yh-ai-cache-${JSON.stringify(keyData)}`
}

/**
 * 获取缓存
 */
function getCache(config: XRequestConfig, cacheConfig: CacheConfig): unknown | null {
  if (!cacheConfig.enabled) return null

  const key = cacheConfig.key || generateCacheKey(config)
  const cached = cacheStorage.get(key)

  if (cached && cached.expiry > Date.now()) {
    return cached.data
  }

  if (cached) {
    cacheStorage.delete(key)
  }

  return null
}

/**
 * 设置缓存
 */
function setCache(config: XRequestConfig, cacheConfig: CacheConfig, data: unknown): void {
  if (!cacheConfig.enabled) return

  const key = cacheConfig.key || generateCacheKey(config)
  const ttl = cacheConfig.ttl || 5 * 60 * 1000 // 默认 5 分钟

  cacheStorage.set(key, {
    data,
    expiry: Date.now() + ttl
  })
}

/**
 * 清理过期缓存
 */
export function clearCache(): void {
  const now = Date.now()
  for (const [key, value] of cacheStorage.entries()) {
    if (value.expiry < now) {
      cacheStorage.delete(key)
    }
  }
}

/**
 * XRequest - 增强版请求函数
 *
 * @example
 * ```ts
 * // 基础使用
 * const result = await XRequest({
 *   url: '/api/chat',
 *   body: { messages: [{ role: 'user', content: '你好' }] }
 * })
 *
 * // 流式使用
 * XRequest({
 *   url: '/api/chat/stream',
 *   body: { messages: [{ role: 'user', content: '你好' }] },
 *   stream: true,
 *   callbacks: {
 *     onChunk: (chunk) => console.log('收到:', chunk),
 *     onFinish: (content) => console.log('完成:', content)
 *   }
 * })
 * ```
 */
export async function XRequest(
  config: XRequestConfig,
  callbacks?: XRequestCallbacks,
  options?: {
    middlewares?: AIMiddleware[]
    cache?: CacheConfig
    retry?: RetryConfig
  }
): Promise<unknown> {
  const { middlewares = [], cache = {}, retry = {} } = options || {}
  const allMiddlewares = [...globalMiddlewares, ...middlewares]

  // 合并回调
  const mergedCallbacks: XRequestCallbacks = {
    onStart: callbacks?.onStart,
    onResponse: callbacks?.onResponse,
    onChunk: callbacks?.onChunk,
    onFinish: callbacks?.onFinish,
    onError: callbacks?.onError,
    onFinally: callbacks?.onFinally
  }

  // 构建最终配置
  let finalConfig = { ...config }

  // 应用请求前中间件
  for (const mw of allMiddlewares) {
    if (mw.onRequest) {
      finalConfig = await mw.onRequest(finalConfig)
    }
  }

  // 触发开始回调
  mergedCallbacks.onStart?.(finalConfig)

  // 检查缓存 (仅对非流式请求)
  if (!finalConfig.stream && cache.enabled) {
    const cachedData = getCache(finalConfig, cache)
    if (cachedData) {
      mergedCallbacks.onFinish?.(cachedData as string, cachedData)
      mergedCallbacks.onFinally?.()
      return cachedData
    }
  }

  // 构建 URL
  let url = finalConfig.url
  if (finalConfig.params) {
    const searchParams = new URLSearchParams(finalConfig.params)
    url += `?${searchParams.toString()}`
  }

  // 重试逻辑
  const maxRetries = retry.enabled === true ? retry.maxRetries || 3 : 0
  const retryDelay = retry.retryDelay || 1000
  const retryCondition =
    retry.retryCondition ||
    ((error: Error) => {
      // 默认重试网络错误和 5xx 错误（不区分大小写）
      const msg = error.message.toLowerCase()
      return msg.includes('fetch') || msg.includes('network')
    })

  let lastError: Error | null = null
  let attempt = 0

  while (true) {
    try {
      attempt++

      const response = await fetch(url, {
        method: finalConfig.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...finalConfig.headers
        },
        body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
        signal: finalConfig.timeout ? AbortSignal.timeout(finalConfig.timeout) : undefined
      })

      mergedCallbacks.onResponse?.(response)

      // 流式处理
      if (finalConfig.stream && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullContent = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          let processedChunk = chunk

          // 应用 chunk 中间件
          for (const mw of allMiddlewares) {
            if (mw.onChunk) {
              processedChunk = mw.onChunk(processedChunk, finalConfig)
            }
          }

          fullContent += processedChunk
          mergedCallbacks.onChunk?.(processedChunk, { done: false })
        }

        mergedCallbacks.onFinish?.(fullContent, { done: true })

        // 缓存结果
        if (cache.enabled) {
          setCache(finalConfig, cache, fullContent)
        }

        mergedCallbacks.onFinally?.()
        return fullContent
      }

      // 非流式处理
      const data = await response.json()

      // 应用响应中间件
      let processedData = data
      for (const mw of allMiddlewares) {
        if (mw.onResponse) {
          processedData = mw.onResponse(processedData, finalConfig)
        }
      }

      // 缓存结果
      if (cache.enabled) {
        setCache(finalConfig, cache, processedData)
      }

      mergedCallbacks.onFinish?.(processedData, processedData)
      mergedCallbacks.onFinally?.()
      return processedData
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // 检查是否应该重试 (最多重试 maxRetries 次)
      if (attempt <= maxRetries && retryCondition(lastError)) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt))
        continue
      }

      // 应用错误中间件
      for (const mw of allMiddlewares) {
        if (mw.onError) {
          lastError = mw.onError(lastError, finalConfig)
        }
      }

      mergedCallbacks.onError?.(lastError)
      mergedCallbacks.onFinally?.()
      throw lastError
    }
  }

  mergedCallbacks.onFinally?.()
  throw lastError
}

/**
 * 创建 XRequest 实例 (可复用的配置)
 */
export function createXRequest(
  defaultConfig: Partial<XRequestConfig> = {},
  defaultOptions?: {
    middlewares?: AIMiddleware[]
    cache?: CacheConfig
    retry?: RetryConfig
  }
) {
  return (config: XRequestConfig, callbacks?: XRequestCallbacks) => {
    return XRequest({ ...defaultConfig, ...config }, callbacks, defaultOptions)
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
// 新增：多会话管理 (类似 Ant Design X)
// ============================================

/**
 * 生成唯一 ID
 */
function generateId(): string {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * 生成会话标题
 */
function generateTitle(messages: ConversationMessage[]): string {
  const firstUserMessage = messages.find((m) => m.role === 'user')
  if (firstUserMessage) {
    const content = firstUserMessage.content
    return content.length > 30 ? content.slice(0, 30) + '...' : content
  }
  return '新会话'
}

/**
 * 多会话管理 Hook
 *
 * @example
 * ```ts
 * const {
 *   conversations,    // 会话列表
 *   currentId,        // 当前会话 ID
 *   currentMessages,  // 当前会话消息
 *   create,           // 创建会话
 *   remove,           // 删除会话
 *   select,           // 切换会话
 *   updateTitle       // 更新标题
 * } = useConversations({
 *   maxConversations: 50,
 *   persist: true,
 *   autoTitle: true
 * })
 * ```
 */
export function useConversations(options: UseConversationsOptions = {}) {
  const {
    maxConversations = 50,
    persist = false,
    storageKey = 'yh-ai-conversations',
    autoTitle = true
  } = options

  const conversations = ref<Conversation[]>([])
  const currentId = ref<string | null>(null)

  // 计算当前会话
  const currentConversation = computed(() => {
    return conversations.value.find((c) => c.id === currentId.value) || null
  })

  const currentMessages = computed(() => {
    return currentConversation.value?.messages || []
  })

  // 加载会话
  const loadConversations = () => {
    if (persist) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const parsed = JSON.parse(stored)
          conversations.value = parsed.conversations || []
          currentId.value = parsed.currentId || null

          // 确保当前会话存在
          if (currentId.value && !conversations.value.find((c) => c.id === currentId.value)) {
            currentId.value = conversations.value[0]?.id || null
          }
        }
      } catch {
        conversations.value = []
        currentId.value = null
      }
    }
  }

  // 保存会话
  const saveConversations = () => {
    if (persist) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          conversations: conversations.value,
          currentId: currentId.value
        })
      )
    }
  }

  // 创建会话
  const create = (initialMessages: ConversationMessage[] = []): string => {
    const now = new Date()
    const newConversation: Conversation = {
      id: generateId(),
      title: autoTitle ? generateTitle(initialMessages) : '新会话',
      messages: initialMessages,
      createdAt: now,
      updatedAt: now
    }

    conversations.value = [newConversation, ...conversations.value].slice(0, maxConversations)
    currentId.value = newConversation.id
    saveConversations()

    return newConversation.id
  }

  // 删除会话
  const remove = (id: string) => {
    const index = conversations.value.findIndex((c) => c.id === id)
    if (index === -1) return

    conversations.value = conversations.value.filter((c) => c.id !== id)

    // 如果删除的是当前会话，切换到第一个
    if (currentId.value === id) {
      currentId.value = conversations.value[0]?.id || null
    }

    saveConversations()
  }

  // 切换会话
  const select = (id: string) => {
    if (conversations.value.find((c) => c.id === id)) {
      currentId.value = id
      saveConversations()
    }
  }

  // 更新会话标题
  const updateTitle = (id: string, title: string) => {
    const conversation = conversations.value.find((c) => c.id === id)
    if (conversation) {
      conversation.title = title
      conversation.updatedAt = new Date()
      saveConversations()
    }
  }

  // 添加消息到当前会话
  const addMessage = (message: Omit<ConversationMessage, 'id' | 'createdAt'>) => {
    if (!currentId.value) {
      create()
    }

    const conversation = conversations.value.find((c) => c.id === currentId.value)
    if (conversation) {
      const newMessage: ConversationMessage = {
        ...message,
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: new Date()
      }
      conversation.messages.push(newMessage)

      // 自动生成标题
      if (autoTitle && conversation.messages.length <= 2) {
        conversation.title = generateTitle(conversation.messages)
      }

      conversation.updatedAt = new Date()
      saveConversations()

      return newMessage
    }
    return null
  }

  // 清空当前会话消息
  const clearCurrent = () => {
    const conversation = conversations.value.find((c) => c.id === currentId.value)
    if (conversation) {
      conversation.messages = []
      conversation.updatedAt = new Date()
      saveConversations()
    }
  }

  // 初始化
  loadConversations()

  // 如果没有会话，创建一个
  if (conversations.value.length === 0) {
    create()
  }

  return {
    conversations,
    currentId,
    currentConversation,
    currentMessages,
    create,
    remove,
    select,
    updateTitle,
    addMessage,
    clearCurrent
  }
}

// ============================================
// AI Chat Hook (增强版 - 支持流式和工具调用)
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
  /** 是否流式 */
  stream?: boolean
  /** 流式间隔 (ms) */
  streamInterval?: number
  /** 工具定义 */
  tools?: ToolCallHandler[]
  /** 回调：发送前 */
  onRequest?: (message: string) => void
  /** 回调：收到响应头 */
  onResponse?: (response: Response) => void
  /** 回调：收到每个 chunk (流式) */
  onChunk?: (chunk: string, message?: ConversationMessage) => void
  /** 回调：工具调用 */
  onToolCall?: (toolCall: { name: string; args: Record<string, unknown> }) => void
  /** 回调：工具调用结果 */
  onToolResult?: (toolName: string, result: unknown) => void
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
  /** 是否正在流式 */
  isStreaming: Ref<boolean>
  /** 错误 */
  error: Ref<Error | null>
  /** 当前消息 (流式时) */
  currentMessage: Ref<ConversationMessage | null>
  /** 发送消息 */
  sendMessage: (content: string) => Promise<void>
  /** 流式发送 (带增量更新) */
  sendMessageStream: (content: string) => Promise<void>
  /** 停止流式 */
  stop: () => void
  /** 追加内容（用于流式） */
  append: (content: string, role?: 'user' | 'assistant') => ConversationMessage
  /** 更新最后一条消息 */
  updateLastMessage: (updates: Partial<ConversationMessage>) => void
  /** 重置 */
  reload: () => void
}

/**
 * AI 对话 hook (增强版)
 *
 * @example
 * ```ts
 * // 基础对话
 * const { messages, input, isLoading, sendMessage } = useAIChat({
 *   api: '/api/chat',
 *   onFinish: (msg) => console.log('完成:', msg.content)
 * })
 *
 * // 流式对话
 * const { messages, isStreaming, currentMessage, sendMessageStream, stop } = useAIChat({
 *   api: '/api/chat/stream',
 *   stream: true,
 *   onChunk: (chunk, msg) => console.log('收到:', chunk),
 *   onFinish: (msg) => console.log('完成:', msg.content)
 * })
 *
 * // 工具调用
 * const { messages, sendMessage } = useAIChat({
 *   api: '/api/chat',
 *   tools: [
 *     {
 *       name: 'get_weather',
 *       description: '获取天气',
 *       parameters: { city: { type: 'string' } },
 *       execute: async ({ city }) => ({ temp: 25, weather: 'sunny' })
 *     }
 *   ],
 *   onToolCall: (tc) => console.log('调用工具:', tc.name),
 *   onToolResult: (name, result) => console.log('工具结果:', result)
 * })
 * ```
 */
export function useAIChat(options: UseAIChatOptions): UseAIChatReturn {
  const {
    api,
    initialMessages = [],
    headers = {},
    body = {},
    stream = false,
    streamInterval = 20,
    tools = [],
    onRequest,
    onResponse,
    onChunk,
    onToolCall,
    onToolResult,
    onFinish,
    onError
  } = options

  const messages = ref<ConversationMessage[]>([...initialMessages])
  const input = ref('')
  const isLoading = ref(false)
  const isStreaming = ref(false)
  const error = ref<Error | null>(null)
  const currentMessage = ref<ConversationMessage | null>(null)
  let abortController: AbortController | null = null

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

  const updateLastMessage = (updates: Partial<ConversationMessage>) => {
    if (messages.value.length > 0) {
      const lastIndex = messages.value.length - 1
      messages.value = messages.value.map((msg, i) =>
        i === lastIndex ? { ...msg, ...updates } : msg
      )
    }
  }

  const reload = () => {
    messages.value = [...initialMessages]
    input.value = ''
    error.value = null
    currentMessage.value = null
    if (abortController) {
      abortController.abort()
      abortController = null
    }
  }

  const stop = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    isStreaming.value = false
  }

  // 工具执行
  const executeTools = async (toolCalls: ToolCall[]): Promise<ConversationMessage[]> => {
    const results: ConversationMessage[] = []

    for (const toolCall of toolCalls) {
      const tool = tools.find((t) => t.name === toolCall.name)
      if (tool) {
        try {
          onToolCall?.({ name: toolCall.name, args: toolCall.arguments })
          const result = await tool.execute(toolCall.arguments)
          onToolResult?.(toolCall.name, result)

          results.push({
            id: `tool-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            role: 'tool',
            content: typeof result === 'string' ? result : JSON.stringify(result),
            name: toolCall.name,
            toolCallId: toolCall.id,
            createdAt: new Date()
          })
        } catch (err) {
          results.push({
            id: `tool-error-${Date.now()}`,
            role: 'tool',
            content: `Error: ${err instanceof Error ? err.message : String(err)}`,
            name: toolCall.name,
            toolCallId: toolCall.id,
            createdAt: new Date()
          })
        }
      }
    }

    return results
  }

  // 流式发送
  const sendMessageStream = async (content: string) => {
    if (!content.trim() || isStreaming.value) return

    error.value = null
    isStreaming.value = true
    isLoading.value = true

    // 添加用户消息
    append(content, 'user')
    input.value = ''

    // 创建空的助手消息占位
    const assistantMessage = append('', 'assistant')
    currentMessage.value = assistantMessage

    abortController = new AbortController()

    try {
      onRequest?.(content)

      // 构建消息列表，包含工具结果
      const allMessages = messages.value.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.name && { name: m.name }),
        ...(m.toolCallId && { tool_call_id: m.toolCallId })
      }))

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          messages: allMessages,
          stream: true,
          tools:
            tools.length > 0
              ? tools.map((t) => ({
                  type: 'function',
                  function: {
                    name: t.name,
                    description: t.description || '',
                    parameters: t.parameters || {}
                  }
                }))
              : undefined,
          ...body
        }),
        signal: abortController.signal
      })

      onResponse?.(response)

      if (!response.ok || !response.body) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''
      let currentToolCalls: ToolCall[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter((line) => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)

            // 处理 SSE 数据
            if (data === '[DONE]') {
              continue
            }

            try {
              const parsed = JSON.parse(data)

              // 处理文本增量
              if (parsed.choices?.[0]?.delta?.content) {
                const delta = parsed.choices[0].delta.content
                fullContent += delta
                currentMessage.value = { ...assistantMessage, content: fullContent }
                updateLastMessage({ content: fullContent })
                onChunk?.(delta, currentMessage.value)
              }

              // 处理工具调用
              if (parsed.choices?.[0]?.delta?.tool_calls) {
                const toolCalls = parsed.choices[0].delta.tool_calls
                for (const tc of toolCalls) {
                  const existingIndex = currentToolCalls.findIndex((t) => t.id === tc.id)
                  if (existingIndex >= 0) {
                    // 更新现有工具调用
                    currentToolCalls[existingIndex] = {
                      ...currentToolCalls[existingIndex],
                      arguments: {
                        ...currentToolCalls[existingIndex].arguments,
                        ...(tc.function?.arguments && JSON.parse(tc.function.arguments))
                      }
                    }
                  } else if (tc.id && tc.function?.name) {
                    // 新工具调用
                    currentToolCalls.push({
                      id: tc.id,
                      type: 'function',
                      name: tc.function.name,
                      arguments: tc.function.arguments ? JSON.parse(tc.function.arguments) : {}
                    })
                  }
                }
                updateLastMessage({ toolCalls: [...currentToolCalls] })
              }
            } catch {
              // 忽略解析错误
            }
          }
        }

        // 流式间隔
        if (streamInterval > 0) {
          await new Promise((resolve) => setTimeout(resolve, streamInterval))
        }
      }

      // 如果有工具调用，执行它们
      if (currentToolCalls.length > 0) {
        updateLastMessage({ toolCalls: currentToolCalls })
        const toolResults = await executeTools(currentToolCalls)

        // 添加工具结果到消息
        for (const result of toolResults) {
          messages.value.push(result)
        }

        // 再次调用 API 获取最终回复
        const finalMessages = messages.value.map((m) => ({
          role: m.role,
          content: m.content,
          ...(m.name && { name: m.name }),
          ...(m.toolCallId && { tool_call_id: m.toolCallId })
        }))

        const finalResponse = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({
            messages: finalMessages,
            ...body
          })
        })

        if (finalResponse.ok) {
          const finalData = await finalResponse.json()
          const finalContent = finalData.content || finalData.message?.content || ''
          updateLastMessage({ content: finalContent })
          currentMessage.value = { ...assistantMessage, content: finalContent }
        }
      }

      const finalMessage = messages.value[messages.value.length - 1]
      onFinish?.(finalMessage)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        error.value = errorObj
        onError?.(errorObj)
      }
    } finally {
      isLoading.value = false
      isStreaming.value = false
      abortController = null
    }
  }

  // 普通发送
  const sendMessage = async (content: string) => {
    if (stream) {
      return sendMessageStream(content)
    }

    if (!content.trim() || isLoading.value) return

    error.value = null
    isLoading.value = true

    // 添加用户消息
    append(content, 'user')
    input.value = ''

    try {
      onRequest?.(content)

      // 构建消息列表
      const allMessages = messages.value.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.name && { name: m.name }),
        ...(m.toolCallId && { tool_call_id: m.toolCallId })
      }))

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          messages: allMessages,
          tools:
            tools.length > 0
              ? tools.map((t) => ({
                  type: 'function',
                  function: {
                    name: t.name,
                    description: t.description || '',
                    parameters: t.parameters || {}
                  }
                }))
              : undefined,
          ...body
        })
      })

      onResponse?.(response)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // 处理工具调用
      let toolCalls = data.tool_calls || []
      let finalContent = data.content || data.message?.content || ''

      // 如果有工具调用，执行它们
      if (toolCalls.length > 0) {
        const toolResults = await executeTools(toolCalls)

        // 添加工具结果
        for (const result of toolResults) {
          messages.value.push(result)
        }

        // 再次调用获取最终回复
        const finalMessages = messages.value.map((m) => ({
          role: m.role,
          content: m.content,
          ...(m.name && { name: m.name }),
          ...(m.toolCallId && { tool_call_id: m.toolCallId })
        }))

        const finalResponse = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({
            messages: finalMessages,
            ...body
          })
        })

        if (finalResponse.ok) {
          const finalData = await finalResponse.json()
          finalContent = finalData.content || finalData.message?.content || ''
        }
      }

      // 添加助手消息
      const assistantMessage = append(finalContent, 'assistant')
      if (toolCalls.length > 0) {
        updateLastMessage({ toolCalls })
      }

      onFinish?.(assistantMessage)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      error.value = errorObj
      onError?.(errorObj)
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    input,
    isLoading,
    isStreaming,
    error,
    currentMessage,
    sendMessage,
    sendMessageStream,
    stop,
    append,
    updateLastMessage,
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
 * Provider 预设配置
 */
export interface ProviderPreset {
  name: string
  baseUrl: string
  defaultModel: string
  supportsStreaming?: boolean
  supportsFunctionCalling?: boolean
  needsProjectId?: boolean
}

/**
 * 内置 Provider 预设
 */
export const PROVIDER_PRESETS: Record<string, ProviderPreset> = {
  openai: {
    name: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  anthropic: {
    name: 'anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-3-5-sonnet-20241022',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  google: {
    name: 'google',
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    defaultModel: 'gemini-1.5-pro',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  deepseek: {
    name: 'deepseek',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  ollama: {
    name: 'ollama',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'llama2',
    supportsStreaming: true,
    supportsFunctionCalling: false
  },
  azure: {
    name: 'azure',
    baseUrl: '', // 需要配置
    defaultModel: '',
    supportsStreaming: true,
    supportsFunctionCalling: true,
    needsProjectId: true
  },
  moonshot: {
    name: 'moonshot',
    baseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-8k',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  minimax: {
    name: 'minimax',
    baseUrl: 'https://api.minimax.chat/v1',
    defaultModel: 'abab6.5s-chat',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  zhipu: {
    name: 'zhipu',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  siliconflow: {
    name: 'siliconflow',
    baseUrl: 'https://api.siliconflow.cn/v1',
    defaultModel: 'Qwen/Qwen2-7B-Instruct',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  together: {
    name: 'together',
    baseUrl: 'https://api.together.ai/v1',
    defaultModel: 'meta-llama/Llama-3-70b-chat-hf',
    supportsStreaming: true,
    supportsFunctionCalling: true
  },
  novita: {
    name: 'novita',
    baseUrl: 'https://api.novita.ai/v3',
    defaultModel: 'meta-llama/llama-3.1-70b-instruct',
    supportsStreaming: true,
    supportsFunctionCalling: true
  }
}

/**
 * 获取 Provider 预设
 */
export function getProviderPreset(name: string): ProviderPreset | undefined {
  return PROVIDER_PRESETS[name.toLowerCase()]
}

/**
 * 创建 AI Provider 适配器
 *
 * @example
 * ```ts
 * // 使用预设
 * const openai = createProviderAdapter({
 *   provider: 'openai',
 *   apiKey: process.env.OPENAI_API_KEY
 * })
 *
 * // 自定义配置
 * const openai = createProviderAdapter({
 *   name: 'openai',
 *   baseUrl: 'https://api.openai.com/v1',
 *   apiKey: process.env.OPENAI_API_KEY,
 *   defaultModel: 'gpt-4'
 * })
 * ```
 */
export function createProviderAdapter(
  config: ProviderAdapter | { provider: string; apiKey?: string }
): ProviderAdapter & {
  createChat: (model?: string | ModelConfig) => unknown
  preset?: ProviderPreset
} {
  // 处理预设引用
  let finalConfig: ProviderAdapter
  if ('provider' in config && !('baseUrl' in config)) {
    const preset = PROVIDER_PRESETS[config.provider.toLowerCase()]
    if (!preset) {
      throw new Error(`Unknown provider: ${config.provider}`)
    }
    finalConfig = {
      name: preset.name,
      baseUrl: preset.baseUrl,
      defaultModel: preset.defaultModel,
      apiKey: config.apiKey
    }
  } else {
    finalConfig = config as ProviderAdapter
  }

  return {
    ...finalConfig,
    createChat: (model?: string | ModelConfig) => {
      const modelConfig = typeof model === 'string' ? { model } : model || {}
      return {
        provider: finalConfig.name,
        baseUrl: finalConfig.baseUrl,
        apiKey: finalConfig.apiKey,
        ...modelConfig
      }
    }
  }
}

/**
 * 创建带 Vercel AI SDK 的 Provider 适配器
 *
 * @example
 * ```ts
 * import { createVercelAIProvider } from '@yh-ui/ai-sdk'
 * import { openai } from '@ai-sdk/openai'
 *
 * const provider = createVercelAIProvider(openai, {
 *   baseURL: 'https://api.openai.com/v1'
 * })
 * ```
 */
export function createVercelAIProvider(
  provider: unknown,
  config?: {
    baseURL?: string
    apiKey?: string
    headers?: Record<string, string>
  }
) {
  return {
    languageModel: (modelId: string) => {
      // 返回配置好的模型实例
      return {
        provider,
        modelId,
        config
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
