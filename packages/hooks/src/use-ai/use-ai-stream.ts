import { ref } from 'vue'

// ─── 适配器模式：抹平各大厂商格式差异 ───────────────────────────────────────

export type StreamChunkParser = (raw: string) => string | null

/**
 * OpenAI / DeepSeek 格式解析器
 * data: {"choices":[{"delta":{"content":"hello"}}]}
 */
export const openaiParser: StreamChunkParser = (raw) => {
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    if (data === '[DONE]') break
    try {
      const json = JSON.parse(data)
      const delta = json?.choices?.[0]?.delta?.content
      if (delta) text += delta
    } catch {
      // ignore parse error
    }
  }
  return text || null
}

/**
 * 文心一言 / ERNIE 格式解析器
 * data: {"result":"hello","is_end":false}
 */
export const ernieParser: StreamChunkParser = (raw) => {
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    try {
      const json = JSON.parse(data)
      if (json?.result) text += json.result
    } catch {
      // ignore
    }
  }
  return text || null
}

/**
 * 通义千问 / Qwen 格式解析器
 * data: {"output":{"text":"hello"},"finish_reason":null}
 */
export const qwenParser: StreamChunkParser = (raw) => {
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    try {
      const json = JSON.parse(data)
      const t = json?.output?.text
      if (t) text += t
    } catch {
      // ignore
    }
  }
  return text || null
}

/**
 * 纯文本流解析器（AsyncGenerator 输出的原始字符串）
 */
export const plainTextParser: StreamChunkParser = (raw) => raw || null

// ─── 打字机节流引擎 ───────────────────────────────────────────────────────────

/**
 * 基于 requestAnimationFrame 的平滑打字机效果
 * 将一次性的大量文字拆分为每帧若干字符的均匀输出
 */
class TypewriterThrottle {
  private queue: string[] = []
  private rafId: number | null = null
  private onUpdate: (content: string) => void
  private charsPerFrame: number

  constructor(onUpdate: (content: string) => void, charsPerFrame = 3) {
    this.onUpdate = onUpdate
    this.charsPerFrame = charsPerFrame
  }

  push(text: string): void {
    this.queue.push(...text.split(''))
    if (this.rafId === null) {
      this.schedule()
    }
  }

  private schedule(): void {
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null
      if (this.queue.length === 0) return

      // 每帧吐出 charsPerFrame 个字符
      const batch = this.queue.splice(0, this.charsPerFrame).join('')
      this.onUpdate(batch)

      // 继续调度
      if (this.queue.length > 0) {
        this.schedule()
      }
    })
  }

  flush(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    if (this.queue.length > 0) {
      const remaining = this.queue.splice(0).join('')
      this.onUpdate(remaining)
    }
  }

  cancel(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.queue = []
  }
}

// ─── 主 Hook 定义 ─────────────────────────────────────────────────────────────

export interface AiStreamOptions {
  /**
   * 请求适配器，返回 AsyncGenerator 或 fetch Response
   */
  request: (
    query: string,
    ...args: unknown[]
  ) =>
    | Promise<Response | AsyncGenerator<string, void, unknown>>
    | AsyncGenerator<string, void, unknown>

  /**
   * 流式块解析器，用于适配不同厂商的格式
   * @default plainTextParser（直接输出原始字符串）
   */
  parser?: StreamChunkParser

  /**
   * 是否启用打字机平滑节流效果
   * @default true
   */
  typewriter?: boolean

  /**
   * 每帧渲染的字符数（打字机速度控制）
   * @default 3
   */
  charsPerFrame?: number

  onUpdate?: (chunk: string, fullContent: string) => void
  onFinish?: (content: string) => void
  onError?: (err: Error) => void
}

/**
 * useAiStream - 多厂商兼容流式请求引擎
 *
 * 特性：
 * - 支持 OpenAI / DeepSeek / 文心一言 / 通义千问 等主流格式（Adapter 模式）
 * - 内置 rAF 打字机节流，保证平滑输出体验
 * - 完整的 AbortController 取消支持
 */
export function useAiStream(options: AiStreamOptions) {
  const isStreaming = ref(false)
  const currentContent = ref('')
  let abortController = new AbortController()
  let typewriter: TypewriterThrottle | null = null

  const parser = options.parser ?? plainTextParser
  const enableTypewriter = options.typewriter !== false
  const charsPerFrame = options.charsPerFrame ?? 3

  const stop = () => {
    if (isStreaming.value) {
      abortController.abort()
      isStreaming.value = false
      typewriter?.flush() // 立即渲染剩余字符
    }
  }

  const fetchStream = async (query: string, ...args: unknown[]) => {
    isStreaming.value = true
    currentContent.value = ''
    abortController = new AbortController()

    // 初始化打字机
    if (enableTypewriter) {
      typewriter = new TypewriterThrottle((chunk) => {
        currentContent.value += chunk
        options.onUpdate?.(chunk, currentContent.value)
      }, charsPerFrame)
    }

    const pushText = (text: string) => {
      if (!text) return
      if (enableTypewriter && typewriter) {
        typewriter.push(text)
      } else {
        currentContent.value += text
        options.onUpdate?.(text, currentContent.value)
      }
    }

    try {
      const response = await options.request(query, ...args)

      // 模式 A: AsyncGenerator（最简单，直接吐字符串）
      if (typeof response === 'object' && response !== null && Symbol.asyncIterator in response) {
        for await (const chunk of response as AsyncGenerator<string, void, unknown>) {
          if (abortController.signal.aborted) break
          const parsed = parser(chunk)
          if (parsed) pushText(parsed)
        }
      }
      // 模式 B: fetch Response（SSE / text stream）
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
          if (parsed) pushText(parsed)
        }
      }

      if (!abortController.signal.aborted) {
        // 等待打字机完成所有字符输出后再触发 onFinish
        if (enableTypewriter && typewriter) {
          typewriter.flush()
        }
        isStreaming.value = false
        options.onFinish?.(currentContent.value)
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        options.onError?.(e as Error)
      }
      typewriter?.cancel()
      isStreaming.value = false
    }
  }

  return {
    isStreaming,
    currentContent,
    fetchStream,
    stop,
    // 暴露解析器供测试/自定义使用
    parsers: { openaiParser, ernieParser, qwenParser, plainTextParser }
  }
}
