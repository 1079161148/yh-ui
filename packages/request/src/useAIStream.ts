import { ref, type Ref } from 'vue'
import { type UseSSEOptions, type SSEMessage, useSSE } from './useSSE'

// ==================== 类型定义 ====================

/** AI 流式响应消息 */
export interface AIStreamMessage {
  /** 内容类型 */
  type: 'text' | 'tool_call' | 'tool_result' | 'thinking' | 'done' | 'error'
  /** 内容 */
  content: string
  /** 工具调用 */
  toolCalls?: Array<{
    id: string
    name: string
    arguments: unknown
  }>
  /** 工具结果 */
  toolResults?: Array<{
    toolCallId: string
    result: unknown
  }>
  /** 思考内容 */
  thinking?: string
  /** 元数据 */
  metadata?: Record<string, unknown>
}

/** AI 消息数据结构 */
interface AIMessageData {
  content?: string
  text?: string
  delta?: string
  thinking?: string
  tool_calls?: AIStreamMessage['toolCalls']
}

/** AI 流式响应 Hook 配置 */
export interface UseAIStreamOptions extends UseSSEOptions {
  /** 解析 AI 消息格式 */
  parseAIMessage?: boolean
  /** 文本追加模式（用于打字机效果） */
  appendMode?: boolean
  /** AI 消息回调 */
  onText?: (text: string, delta: string) => void
  /** 工具调用回调 */
  onToolCall?: (toolCalls: AIStreamMessage['toolCalls']) => void
  /** 思考更新回调 */
  onThinking?: (thinking: string) => void
}

/** AI 流式响应 Hook 返回值 */
export interface UseAIStreamReturn {
  /** 是否正在加载 */
  loading: Ref<boolean>
  /** 内容 */
  content: Ref<string>
  /** 消息列表 */
  messages: Ref<SSEMessage[]>
  /** 错误 */
  error: Ref<Error | undefined>
  /** 当前文本 */
  text: Ref<string>
  /** 思考内容 */
  thinking: Ref<string>
  /** 工具调用列表 */
  toolCalls: Ref<AIStreamMessage['toolCalls']>
  /** 是否完成 */
  done: Ref<boolean>
  /** 启动流式请求 */
  start: (options?: UseAIStreamOptions) => void
  /** 停止流式请求 */
  stop: () => void
  /** 重置状态 */
  reset: () => void
}

/**
 * useAIStream - AI 流式响应 Hook
 *
 * 专为 AI 应用设计，支持打字机效果、工具调用等
 *
 * @example
 * const { text, thinking, toolCalls, done, loading, start, stop } = useAIStream({
 *   onText: (text, delta) => {
 *     // 打字机效果
 *     content.value += delta
 *   },
 *   onThinking: (thinking) => {
 *     // 更新思考内容
 *   },
 *   onToolCall: (tools) => {
 *     // 处理工具调用
 *   },
 * })
 *
 * // 发起 AI 请求
 * start({
 *   url: '/api/ai/chat',
 *   method: 'POST',
 *   data: { messages: [...] },
 * })
 */
export function useAIStream(options: UseAIStreamOptions = {}): UseAIStreamReturn {
  const {
    parseAIMessage = true,
    appendMode = true,
    onText,
    onThinking,
    onToolCall,
    onMessage: userOnMessage,
    ...sseOptions
  } = options

  // AI 相关状态
  const text = ref('')
  const thinking = ref('')
  const toolCalls = ref<AIStreamMessage['toolCalls']>([])
  const done = ref(false)

  // 自定义消息处理
  const handleMessage = (message: SSEMessage) => {
    if (!parseAIMessage) return

    const { event, data } = message

    switch (event) {
      case 'chunk':
      case 'message':
        // 文本内容
        if (typeof data === 'string') {
          const delta = data
          text.value += delta
          onText?.(text.value, delta)
        } else if (data !== null && typeof data === 'object') {
          // 可能是结构化数据
          const aiData = data as AIMessageData
          const delta = aiData.content || aiData.text || aiData.delta || ''
          if (delta) {
            if (appendMode) {
              text.value += delta
            } else {
              text.value = delta
            }
            onText?.(text.value, delta)
          }

          // 思考内容
          if (aiData.thinking) {
            thinking.value = aiData.thinking
            onThinking?.(aiData.thinking)
          }

          // 工具调用
          if (aiData.tool_calls) {
            toolCalls.value = aiData.tool_calls
            onToolCall?.(aiData.tool_calls)
          }
        }
        break

      case 'thinking':
        // 思考内容
        if (typeof data === 'string') {
          thinking.value = data
          onThinking?.(data)
        } else if (data !== null && typeof data === 'object') {
          const aiData = data as AIMessageData
          const thinkContent = aiData.thinking || aiData.content || ''
          thinking.value = thinkContent
          onThinking?.(thinkContent)
        }
        break

      case 'tool':
        // 工具调用
        if (data !== null && typeof data === 'object') {
          const aiData = data as AIMessageData
          if (aiData.tool_calls) {
            toolCalls.value = aiData.tool_calls
            onToolCall?.(aiData.tool_calls)
          }
        }
        break

      case 'done':
        // 完成
        done.value = true
        break

      case 'error':
        // 错误
        done.value = true
        break
    }
  }

  // 包装原始的 onMessage
  const wrappedOnMessage = (msg: SSEMessage) => {
    handleMessage(msg)
    userOnMessage?.(msg)
  }

  // 使用基础 SSE Hook - 将包装后的 onMessage 传入
  const { loading, content, messages, error, start, stop, reset } = useSSE({
    ...sseOptions,
    onMessage: wrappedOnMessage
  })

  // 创建新的 start 函数
  const aiStart = (requestOptions?: UseAIStreamOptions) => {
    // 重置状态
    text.value = ''
    thinking.value = ''
    toolCalls.value = []
    done.value = false

    // 使用基础 SSE，但添加自定义处理 - 不再传入 onMessage，因为它在初始选项中处理
    start(requestOptions)
  }

  return {
    loading,
    content,
    text,
    thinking,
    toolCalls,
    done,
    messages,
    error,
    start: aiStart,
    stop,
    reset
  }
}
