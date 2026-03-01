import { ref, computed } from 'vue'
import { type StreamChunkParser, plainTextParser } from './use-ai-stream'

// ─── 类型定义 ─────────────────────────────────────────────────────────────────

export interface AiChatMessage {
  /** 唯一标识，避免使用 index 做 key */
  id: string
  /** 消息发送方 */
  role: 'user' | 'assistant' | 'system'
  /** 消息内容 */
  content: string
  /**
   * 消息状态
   * - loading: 初始加载中（占位）
   * - generating: 流式生成中
   * - success: 已成功完成
   * - error: 发生错误
   * - stopped: 被用户中途打断
   */
  status?: 'loading' | 'generating' | 'success' | 'error' | 'stopped'
  /** 消息时间戳（ms） */
  createAt: number
  /** 用于展示的时间字符串（可选，不传则自动格式化） */
  time?: string
  /** 扩展字段 */
  [key: string]: unknown
}

export interface UseAiChatOptions {
  /** 初始化的消息列表 */
  initialMessages?: AiChatMessage[]
  /** 自定义生成 ID 的函数 */
  idGenerator?: () => string
  /**
   * 请求适配器
   * 支持：
   * - AsyncGenerator<string>：最原始的字符流，每次 yield 一段字符
   * - Promise<string>：直接返回完整回复
   * - Promise<Response>：SSE 流式响应
   */
  request?: (
    message: string,
    history: AiChatMessage[],
    abortSignal: AbortSignal
  ) => AsyncGenerator<string, void, unknown> | Promise<string | Response>

  /**
   * SSE / 流式块的解析器（适配不同厂商格式）
   * 传入各厂商对应的 parser（来自 useAiStream 模块）
   * @default plainTextParser
   */
  parser?: StreamChunkParser

  /**
   * 是否启用打字机平滑输出效果
   * @default true
   */
  typewriter?: boolean

  /**
   * 打字机每帧输出字符数（越大越快）
   * @default 3
   */
  charsPerFrame?: number

  /**
   * 系统 Prompt（会自动插入到历史的首位）
   */
  systemPrompt?: string

  /** 出现错误时的回调 */
  onError?: (err: Error) => void
  /** 消息发送完成回调 */
  onFinish?: (message: AiChatMessage) => void
}

// ─── 打字机引擎（内聚在 useAiChat 内部）──────────────────────────────────────

function createTypewriter(
  onChar: (char: string) => void,
  charsPerFrame: number
): { push: (text: string) => void; flush: () => void; cancel: () => void } {
  const queue: string[] = []
  let rafId: number | null = null

  const schedule = () => {
    rafId = requestAnimationFrame(() => {
      rafId = null
      if (queue.length === 0) return
      const batch = queue.splice(0, charsPerFrame).join('')
      onChar(batch)
      if (queue.length > 0) schedule()
    })
  }

  return {
    push(text: string) {
      queue.push(...text.split(''))
      if (rafId === null) schedule()
    },
    flush() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (queue.length > 0) {
        onChar(queue.splice(0).join(''))
      }
    },
    cancel() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      queue.length = 0
    }
  }
}

// ─── Hook 主体 ────────────────────────────────────────────────────────────────

/**
 * useAiChat - 核心 AI 会话管理 Hook
 *
 * 特性：
 * - 消息列表 CRUD + 状态机管理
 * - 支持流式 / 非流式响应
 * - 内置多厂商适配器接口（通过 parser 选项传入）
 * - rAF 打字机平滑效果（可关闭）
 * - 完整的 AbortController 取消支持
 * - 系统 Prompt 自动注入
 */
export function useAiChat(options: UseAiChatOptions = {}) {
  const {
    idGenerator = () => Math.random().toString(36).substring(2, 9),
    parser = plainTextParser,
    typewriter: enableTypewriter = true,
    charsPerFrame = 3,
    systemPrompt
  } = options

  const messages = ref<AiChatMessage[]>(options.initialMessages ?? [])
  const isGenerating = ref(false)
  const isSending = computed(() => isGenerating.value)
  let abortController: AbortController | null = null

  // ── 停止生成 ──────────────────────────────────────────────────────────────
  const stop = () => {
    if (abortController && isGenerating.value) {
      abortController.abort()
      isGenerating.value = false
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg?.role === 'assistant' && lastMsg.status === 'generating') {
        lastMsg.status = 'stopped'
      }
    }
  }

  // ── 清空会话 ──────────────────────────────────────────────────────────────
  const clear = () => {
    stop()
    messages.value = []
  }

  // ── 移除单条消息 ──────────────────────────────────────────────────────────
  const removeMessage = (id: string) => {
    const idx = messages.value.findIndex((m) => m.id === id)
    if (idx !== -1) messages.value.splice(idx, 1)
  }

  // ── 更新单条消息内容 ──────────────────────────────────────────────────────
  const updateMessage = (id: string, patch: Partial<AiChatMessage>) => {
    const msg = messages.value.find((m) => m.id === id)
    if (msg) Object.assign(msg, patch)
  }

  // ── 发送消息（核心逻辑）───────────────────────────────────────────────────
  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim() || isGenerating.value) return

    // 1. 追加用户消息
    messages.value.push({
      id: idGenerator(),
      role: 'user',
      content,
      createAt: Date.now(),
      status: 'success'
    })

    if (!options.request) return

    // 2. 创建 assistant 占位消息
    const assId = idGenerator()
    const assistantMsg: AiChatMessage = {
      id: assId,
      role: 'assistant',
      content: '',
      createAt: Date.now(),
      status: 'loading'
    }
    messages.value.push(assistantMsg)
    isGenerating.value = true
    abortController = new AbortController()

    // 3. 构建历史（排除当前占位）
    const history: AiChatMessage[] = []
    if (systemPrompt) {
      history.push({
        id: 'system',
        role: 'system',
        content: systemPrompt,
        createAt: 0,
        status: 'success'
      })
    }
    history.push(...messages.value.slice(0, -2)) // 排除刚加入的 user + assistant 占位

    try {
      const response = await options.request(content, history, abortController.signal)
      const targetMsg = messages.value.find((m) => m.id === assId)!
      targetMsg.status = 'generating'

      // 4. 打字机实例（每次 sendMessage 创建独立实例）
      let typewriterInstance: ReturnType<typeof createTypewriter> | null = null
      if (enableTypewriter && typeof requestAnimationFrame !== 'undefined') {
        typewriterInstance = createTypewriter((chars) => {
          targetMsg.content += chars
        }, charsPerFrame)
      }

      const pushChunk = (text: string) => {
        if (!text) return
        if (typewriterInstance) {
          typewriterInstance.push(text)
        } else {
          targetMsg.content += text
        }
      }

      // 5. 消费响应
      // 模式 A: AsyncGenerator（字符流）
      if (typeof response === 'object' && response !== null && Symbol.asyncIterator in response) {
        for await (const chunk of response as AsyncGenerator<string, void, unknown>) {
          if (abortController.signal.aborted) break
          const parsed = parser(chunk)
          if (parsed) pushChunk(parsed)
        }
      }
      // 模式 B: SSE fetch Response
      else if (response instanceof Response && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        while (true) {
          if (abortController.signal.aborted) {
            reader.cancel()
            break
          }
          const { done, value } = await reader.read()
          if (done) break
          const chunkStr = decoder.decode(value, { stream: true })
          const parsed = parser(chunkStr)
          if (parsed) pushChunk(parsed)
        }
      }
      // 模式 C: 直接字符串回复
      else if (typeof response === 'string') {
        pushChunk(response)
      }

      // 6. 等待打字机输出完毕
      if (typewriterInstance) {
        typewriterInstance.flush()
      }

      if (!abortController.signal.aborted) {
        targetMsg.status = 'success'
        options.onFinish?.(targetMsg)
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        const targetMsg = messages.value.find((m) => m.id === assId)
        if (targetMsg) targetMsg.status = 'error'
        options.onError?.(e as Error)
      }
    } finally {
      if (isGenerating.value) {
        isGenerating.value = false
      }
    }
  }

  return {
    /** 会话历史 */
    messages,
    /** 是否正在生成（等同 isSending，别名友好） */
    isGenerating,
    /** 同 isGenerating，语义别名 */
    isSending,
    /** 触发发送（自动处理流、打字机） */
    sendMessage,
    /** 停止/中断当前生成 */
    stop,
    /** 移除单条消息 */
    removeMessage,
    /** 修改单条消息内容 */
    updateMessage,
    /** 重置清空所有会话 */
    clear
  }
}
