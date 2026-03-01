import { ref } from 'vue'

export interface AiChatMessage {
  /**
   * 唯一标识，避免使用 index 做 key
   */
  id: string
  /**
   * 消息发送方：'user' 表示用户，'assistant' 表示模型，'system' 表示系统提示词
   */
  role: 'user' | 'assistant' | 'system'
  /**
   * 消息内容
   */
  content: string
  /**
   * 消息状态
   */
  status?: 'sending' | 'success' | 'error' | 'generating' | 'stopped'
  createAt: number
}

export interface UseAiChatOptions {
  /**
   * 初始化的消息列表
   */
  initialMessages?: AiChatMessage[]
  /**
   * 自定义生成 ID 的函数
   */
  idGenerator?: () => string
  /**
   * 请求发送的函数适配器，返回大文本流（AsyncGenerator）或直接的字符串（Promise）
   * @param message 当前待发送的消息
   * @param history 历史记录消息
   * @param abortSignal 请求取消的信号对象 AbortSignal
   */
  request?: (
    message: string,
    history: AiChatMessage[],
    abortSignal: AbortSignal
  ) => AsyncGenerator<string, void, unknown> | Promise<string>

  /**
   * 出现错误时的回掉
   */
  onError?: (err: Error) => void
}

/**
 * Headless Hook: 用于管理 AI 会话流，抽离业务数据和视觉渲染
 */
export function useAiChat(options: UseAiChatOptions = {}) {
  const messages = ref<AiChatMessage[]>(options.initialMessages || [])
  const isGenerating = ref(false)
  let abortController: AbortController | null = null

  const defaultIdGen = () => Math.random().toString(36).substring(2, 9)
  const generateId = options.idGenerator || defaultIdGen

  /**
   * 停止当前生成的 AI 消息
   */
  const stop = () => {
    if (abortController && isGenerating.value) {
      abortController.abort()
      isGenerating.value = false
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg && lastMsg.role === 'assistant') {
        lastMsg.status = 'stopped'
      }
    }
  }

  /**
   * 清空所有消息历史
   */
  const clear = () => {
    stop()
    messages.value = []
  }

  /**
   * 发送一条消息
   * @param content 文字内容
   */
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // 1. 本地新增用户的消息
    messages.value.push({
      id: generateId(),
      role: 'user',
      content,
      createAt: Date.now(),
      status: 'success'
    })

    if (!options.request) return

    // 2. 占位：新增一个将要生成的 Assistant 的消息
    const assId = generateId()
    const currentAssistantMessage: AiChatMessage = {
      id: assId,
      role: 'assistant',
      content: '', // 初始内容为空
      createAt: Date.now(),
      status: 'generating'
    }
    messages.value.push(currentAssistantMessage)

    isGenerating.value = true
    abortController = new AbortController()

    try {
      // 提取历史：不能包含刚刚加入的用户消息和空的占位消息
      const history = messages.value.slice(0, messages.value.length - 2)

      const response = await options.request(content, history, abortController.signal)

      const assistantMsg = messages.value.find((m) => m.id === assId)!

      // 处理流式（Generator）
      if (typeof response === 'object' && response !== null && Symbol.asyncIterator in response) {
        for await (const chunk of response as AsyncGenerator<string, void, unknown>) {
          if (abortController.signal.aborted) break
          assistantMsg.content += chunk
        }
      }
      // 处理直接返回一段大文字的情况 (Promise)
      else if (typeof response === 'string') {
        assistantMsg.content = response
      }

      // 如果未被取消，置为成功完成状态
      if (!abortController.signal.aborted) {
        assistantMsg.status = 'success'
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        const assistantMsg = messages.value.find((m) => m.id === assId)
        if (assistantMsg) {
          assistantMsg.status = 'error'
        }
        options.onError?.(e as Error)
      }
    } finally {
      if (isGenerating.value) {
        // 有可能在循环中已经被 cancel
        isGenerating.value = false
      }
    }
  }

  /**
   * 移除单条消息（重绘、撤回等场景）
   */
  const removeMessage = (id: string) => {
    const index = messages.value.findIndex((m) => m.id === id)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  return {
    /** 会话历史 */
    messages,
    /** 是否正在思考/生成 */
    isGenerating,
    /** 触发发送（支持流） */
    sendMessage,
    /** 暂停当前的流输出 */
    stop,
    /** 移除单条 */
    removeMessage,
    /** 重置/清空所有会话 */
    clear
  }
}
