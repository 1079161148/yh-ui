/**
 * LangChain Integration for YH-UI
 *
 * 提供与 LangChain 的深度集成
 * 支持流式输出、函数调用、对话历史管理
 */

import { ref, onUnmounted, type Ref } from 'vue'
import type { BaseMessage } from '@langchain/core/messages'
import type { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { HumanMessage, AIMessage, SystemMessage, ToolMessage } from '@langchain/core/messages'

// ============================================
// Types
// ============================================

export interface LangChainMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  name?: string
  toolCallId?: string
  createdAt?: Date
  additionalKwargs?: Record<string, unknown>
}

export interface LangChainConfig {
  /** LangChain ChatModel 实例 */
  model: BaseChatModel
  /** 系统提示词 */
  systemMessage?: string
  /** 温度参数 */
  temperature?: number
  /** 最大 token 数 */
  maxTokens?: number
  /** 流式输出 */
  streaming?: boolean
  /** 回调函数 */
  callbacks?: {
    onChunk?: (chunk: string) => void
    onFinish?: (message: LangChainMessage) => void
    onError?: (error: Error) => void
  }
}

export interface UseLangChainChatOptions {
  /** LangChain ChatModel 实例 */
  model: BaseChatModel
  /** 初始消息 */
  initialMessages?: LangChainMessage[]
  /** 系统提示词 */
  systemMessage?: string
  /** 最大历史消息数 */
  maxHistory?: number
  /** 温度参数 */
  temperature?: number
  /** 是否流式输出 */
  streaming?: boolean
  /** 回调：收到 chunk */
  onChunk?: (chunk: string) => void
  /** 回调：完成 */
  onFinish?: (message: LangChainMessage) => void
  /** 回调：出错 */
  onError?: (error: Error) => void
}

export interface UseLangChainChatReturn {
  /** 消息列表 */
  messages: Ref<LangChainMessage[]>
  /** 输入内容 */
  input: Ref<string>
  /** 是否正在加载 */
  isLoading: Ref<boolean>
  /** 错误 */
  error: Ref<Error | null>
  /** 发送消息 */
  sendMessage: (content: string) => Promise<void>
  /** 清空历史 */
  clearHistory: () => void
  /** 重新生成最后一条回复 */
  reload: () => void
}

export interface UseLangChainStreamOptions {
  /** LangChain ChatModel 实例 */
  model: BaseChatModel
  /** 系统提示词 */
  systemMessage?: string
  /** 温度参数 */
  temperature?: number
  /** 最大 token 数 */
  maxTokens?: number
}

export interface UseLangChainStreamReturn {
  /** 当前内容 */
  content: Ref<string>
  /** 是否正在流式 */
  isStreaming: Ref<boolean>
  /** 错误 */
  error: Ref<Error | null>
  /** 开始流式请求 */
  start: (prompt: string, history?: LangChainMessage[]) => Promise<void>
  /** 停止 */
  stop: () => void
}

/**
 * LangChain Runtime - LangChain.js 在浏览器中的运行时
 *
 * @example
 * ```ts
 * import { ChatOpenAI } from '@langchain/openai'
 * import { langChainRuntime } from '@yh-ui/ai-sdk'
 *
 * const model = new ChatOpenAI({
 *   model: 'gpt-4',
 *   apiKey: yourApiKey
 * })
 *
 * const result = await langChainRuntime.invoke(model, '你好')
 * ```
 */
export const langChainRuntime = {
  /**
   * 同步调用模型
   */
  async invoke(
    model: BaseChatModel,
    input: string | HumanMessage | BaseMessage,
    options?: {
      systemMessage?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<AIMessage> {
    const messages: BaseMessage[] = []

    if (options?.systemMessage) {
      messages.push(new SystemMessage(options.systemMessage))
    }

    if (typeof input === 'string') {
      messages.push(new HumanMessage(input))
    } else {
      messages.push(input)
    }

    const response = await model.invoke(messages)

    return response as AIMessage
  },

  /**
   * 流式调用模型
   */
  async stream(
    model: BaseChatModel,
    input: string | HumanMessage | BaseMessage,
    options?: {
      systemMessage?: string
      temperature?: number
      maxTokens?: number
      onChunk?: (chunk: string) => void
    }
  ): Promise<AIMessage> {
    const messages: BaseMessage[] = []

    if (options?.systemMessage) {
      messages.push(new SystemMessage(options.systemMessage))
    }

    if (typeof input === 'string') {
      messages.push(new HumanMessage(input))
    } else {
      messages.push(input)
    }

    const stream = await model.stream(messages)

    let fullContent = ''

    for await (const chunk of stream) {
      const content = String(chunk?.content || '')
      fullContent += content
      options?.onChunk?.(content)
    }

    return new AIMessage(fullContent)
  },

  /**
   * 带工具调用的流式调用
   */
  async streamWithTools(
    model: BaseChatModel,
    input: string | HumanMessage | BaseMessage,
    tools: unknown[],
    options?: {
      systemMessage?: string
      temperature?: number
      maxTokens?: number
      onChunk?: (chunk: string) => void
      onToolCall?: (toolCall: { name: string; args: Record<string, unknown> }) => void
    }
  ): Promise<{ message: AIMessage; toolCalls?: unknown[] }> {
    const messages: BaseMessage[] = []

    if (options?.systemMessage) {
      messages.push(new SystemMessage(options.systemMessage))
    }

    if (typeof input === 'string') {
      messages.push(new HumanMessage(input))
    } else {
      messages.push(input)
    }

    // Use bindTools for proper typing
    // @ts-expect-error - LangChain bind method
    const modelWithTools = model.bind({ tools })

    const stream = await modelWithTools.stream(messages)

    let fullContent = ''
    const toolCalls: unknown[] = []

    for await (const chunk of stream) {
      const content = String(chunk?.content || '')
      if (content) {
        fullContent += content
        options?.onChunk?.(content)
      }

      // 处理工具调用
      const additionalKwargs = chunk?.additional_kwargs
      if (additionalKwargs?.tool_calls) {
        for (const tc of additionalKwargs.tool_calls) {
          toolCalls.push(tc)
          options?.onToolCall?.({
            name: tc.function?.name || '',
            args: tc.function?.arguments ? JSON.parse(tc.function.arguments) : {}
          })
        }
      }
    }

    return {
      message: new AIMessage(fullContent),
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined
    }
  }
}

/**
 * 使用 LangChain 进行对话
 *
 * @example
 * ```ts
 * import { ChatOpenAI } from '@langchain/openai'
 * import { useLangChainChat } from '@yh-ui/ai-sdk'
 *
 * const model = new ChatOpenAI({ model: 'gpt-4' })
 *
 * const { messages, input, isLoading, sendMessage } = useLangChainChat({
 *   model,
 *   systemMessage: '你是一个有帮助的助手',
 *   streaming: true,
 *   onChunk: (chunk) => console.log('收到:', chunk)
 * })
 *
 * await sendMessage('你好')
 * ```
 */
export function useLangChainChat(options: UseLangChainChatOptions): UseLangChainChatReturn {
  const {
    model,
    initialMessages = [],
    systemMessage,
    maxHistory = 20,
    streaming = false,
    onChunk,
    onFinish,
    onError
  } = options

  const messages = ref<LangChainMessage[]>([...initialMessages])
  const input = ref('')
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  /**
   * 转换 LangChainMessage 为 BaseMessage
   */
  const toLangChainMessages = (msgs: LangChainMessage[]): BaseMessage[] => {
    return msgs.map((msg) => {
      switch (msg.role) {
        case 'user':
          return new HumanMessage(msg.content)
        case 'assistant':
          return new AIMessage(msg.content)
        case 'system':
          return new SystemMessage(msg.content)
        case 'tool':
          return new ToolMessage({
            content: msg.content,
            tool_call_id: msg.toolCallId || ''
          })
        default:
          return new HumanMessage(msg.content)
      }
    })
  }

  /**
   * 添加消息到历史
   */
  const addMessage = (msg: Omit<LangChainMessage, 'id' | 'createdAt'>) => {
    const newMessage: LangChainMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date()
    }
    messages.value = [...messages.value, newMessage].slice(-maxHistory)
    return newMessage
  }

  /**
   * 发送消息
   */
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading.value) return

    error.value = null
    isLoading.value = true

    // 添加用户消息
    addMessage({ role: 'user', content })
    input.value = ''

    try {
      // 构建消息列表
      const langChainMessages: BaseMessage[] = []

      // 添加系统消息
      if (systemMessage) {
        langChainMessages.push(new SystemMessage(systemMessage))
      }

      // 添加历史消息
      langChainMessages.push(...toLangChainMessages(messages.value.slice(0, -1)))

      if (streaming) {
        // 流式输出
        const stream = await model.stream(langChainMessages)

        // 添加空的助手消息占位
        const assistantMsg = addMessage({ role: 'assistant', content: '' })

        let fullContent = ''
        for await (const chunk of stream) {
          const chunkContent = String(chunk?.content || '')
          fullContent += chunkContent

          // 更新最后一条消息
          messages.value = messages.value.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: fullContent } : m
          )

          onChunk?.(chunkContent)
        }

        onFinish?.(messages.value[messages.value.length - 1])
      } else {
        // 非流式输出
        const response = await model.invoke(langChainMessages)

        const assistantMsg = addMessage({
          role: 'assistant',
          content: String((response as AIMessage).content)
        })

        onFinish?.(assistantMsg)
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      error.value = errorObj
      onError?.(errorObj)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 清空历史
   */
  const clearHistory = () => {
    messages.value = []
  }

  /**
   * 重新生成最后一条回复
   */
  const reload = async () => {
    if (messages.value.length > 0) {
      // 找到最后一条用户消息
      const lastUserMsg = [...messages.value].reverse().find((m) => m.role === 'user')
      if (lastUserMsg) {
        // 删除之后的所有消息
        const userMsgIndex = messages.value.findIndex((m) => m.id === lastUserMsg.id)
        messages.value = messages.value.slice(0, userMsgIndex + 1)

        // 重新发送
        await sendMessage(lastUserMsg.content)
      }
    }
  }

  return {
    messages,
    input,
    isLoading,
    error,
    sendMessage,
    clearHistory,
    reload
  }
}

/**
 * 使用 LangChain 进行流式文本生成
 *
 * @example
 * ```ts
 * import { ChatOpenAI } from '@langchain/openai'
 * import { useLangChainStream } from '@yh-ui/ai-sdk'
 *
 * const model = new ChatOpenAI({ model: 'gpt-4' })
 *
 * const { content, isStreaming, start, stop } = useLangChainStream({
 *   model,
 *   systemMessage: '你是一个有帮助的助手'
 * })
 *
 * await start('请介绍一下 Vue 3')
 * ```
 */
export function useLangChainStream(options: UseLangChainStreamOptions): UseLangChainStreamReturn {
  const { model, systemMessage } = options

  const content = ref('')
  const isStreaming = ref(false)
  const error = ref<Error | null>(null)
  let abortController: AbortController | null = null

  /**
   * 开始流式生成
   */
  const start = async (prompt: string, history: LangChainMessage[] = []) => {
    if (isStreaming.value) {
      stop()
    }

    error.value = null
    isStreaming.value = true
    content.value = ''

    try {
      const messages: BaseMessage[] = []

      // 添加系统消息
      if (systemMessage) {
        messages.push(new SystemMessage(systemMessage))
      }

      // 添加历史消息
      for (const msg of history) {
        switch (msg.role) {
          case 'user':
            messages.push(new HumanMessage(msg.content))
            break
          case 'assistant':
            messages.push(new AIMessage(msg.content))
            break
          case 'system':
            messages.push(new SystemMessage(msg.content))
            break
        }
      }

      // 添加当前输入
      messages.push(new HumanMessage(prompt))

      const stream = await model.stream(messages)

      for await (const chunk of stream) {
        const chunkContent = String(chunk?.content || '')
        content.value += chunkContent
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        error.value = errorObj
      }
    } finally {
      isStreaming.value = false
    }
  }

  /**
   * 停止流式生成
   */
  const stop = () => {
    if (abortController) {
      ;(abortController as AbortController).abort()
    }
    isStreaming.value = false
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

/**
 * 创建 LangChain 对话链
 *
 * @example
 * ```ts
 * import { ChatOpenAI } from '@langchain/openai'
 * import { createLangChainChain } from '@yh-ui/ai-sdk'
 *
 * const model = new ChatOpenAI({ model: 'gpt-4' })
 *
 * const chain = createLangChainChain(model, {
 *   systemMessage: '你是一个有帮助的助手',
 *   temperature: 0.7
 * })
 *
 * const result = await chain.invoke('你好')
 * ```
 */
export function createLangChainChain(
  model: BaseChatModel,
  config?: {
    systemMessage?: string
    temperature?: number
    maxTokens?: number
    streaming?: boolean
  }
) {
  return {
    /**
     * 同步调用
     */
    async invoke(input: string) {
      const messages: BaseMessage[] = []

      if (config?.systemMessage) {
        messages.push(new SystemMessage(config.systemMessage))
      }

      messages.push(new HumanMessage(input))

      const response = await model.invoke(messages)

      return (response as AIMessage).content
    },

    /**
     * 流式调用
     */
    async *stream(input: string) {
      const messages: BaseMessage[] = []

      if (config?.systemMessage) {
        messages.push(new SystemMessage(config.systemMessage))
      }

      messages.push(new HumanMessage(input))

      const stream = await model.stream(messages)

      for await (const chunk of stream) {
        yield chunk?.content || ''
      }
    },

    /**
     * 带工具调用
     */
    async invokeWithTools(
      input: string,
      tools: unknown[],
      toolHandler?: (toolName: string, args: Record<string, unknown>) => Promise<string>
    ) {
      const messages: BaseMessage[] = []

      if (config?.systemMessage) {
        messages.push(new SystemMessage(config.systemMessage))
      }

      messages.push(new HumanMessage(input))

      // @ts-expect-error - LangChain bind method
      const modelWithTools = model.bind({ tools })

      const response = await modelWithTools.invoke(messages)

      // 检查是否有工具调用
      const toolCalls = (response as AIMessage)?.additional_kwargs?.tool_calls

      if (toolCalls && toolCalls.length > 0 && toolHandler) {
        // 执行工具调用
        for (const tc of toolCalls) {
          const toolName = tc.function?.name || ''
          const args = tc.function?.arguments ? JSON.parse(tc.function.arguments) : {}

          const toolResult = await toolHandler(toolName, args)

          // 添加工具结果到消息
          messages.push(response)
          messages.push(
            new ToolMessage({
              content: toolResult,
              tool_call_id: tc.id || ''
            })
          )

          // 再次调用模型获取最终回复
          const finalResponse = await model.invoke(messages)
          return {
            message: (finalResponse as AIMessage).content,
            toolCalls
          }
        }
      }

      return {
        message: (response as AIMessage).content,
        toolCalls: undefined
      }
    }
  }
}

// Re-export types for convenience
export type {
  BaseChatModel,
  BaseChatModelCallOptions
} from '@langchain/core/language_models/chat_models'
export type {
  BaseMessage,
  AIMessage as LCAIMessage,
  HumanMessage as LCHumanMessage,
  SystemMessage as LCSystemMessage,
  ToolMessage as LCToolMessage
} from '@langchain/core/messages'

// Re-export classes
export { AIMessage, HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages'
