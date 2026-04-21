export type StreamChunkParser = (raw: string) => string | null
/**
 * OpenAI / DeepSeek 格式解析器
 * data: {"choices":[{"delta":{"content":"hello"}}]}
 */
export declare const openaiParser: StreamChunkParser
/**
 * 文心一言 / ERNIE 格式解析器
 * data: {"result":"hello","is_end":false}
 */
export declare const ernieParser: StreamChunkParser
/**
 * 通义千问 / Qwen 格式解析器
 * data: {"output":{"text":"hello"},"finish_reason":null}
 */
export declare const qwenParser: StreamChunkParser
/**
 * Anthropic / Claude 格式解析器
 * data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hello"}}
 */
export declare const claudeParser: StreamChunkParser
/**
 * Google / Gemini 格式解析器
 * data: {"candidates":[{"content":{"parts":[{"text":"hello"}]}}]}
 */
export declare const geminiParser: StreamChunkParser
/**
 * 纯文本流解析器（AsyncGenerator 输出的原始字符串）
 */
export declare const plainTextParser: StreamChunkParser
/**
 * 基于 requestAnimationFrame 的平滑打字机效果
 * 将一次性的大量文字拆分为每帧若干字符的均匀输出
 */
declare class TypewriterThrottle {
  private queue
  private rafId
  private onUpdate
  private charsPerFrame
  constructor(onUpdate: (content: string) => void, charsPerFrame?: number)
  push(text: string): void
  private schedule
  flush(): void
  cancel(): void
}
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
export declare function useAiStream(options: AiStreamOptions): {
  isStreaming: import('vue').Ref<boolean, boolean>
  currentContent: import('vue').Ref<string, string>
  fetchStream: (query: string, ...args: unknown[]) => Promise<void>
  stop: () => void
  parsers: {
    openaiParser: StreamChunkParser
    ernieParser: StreamChunkParser
    qwenParser: StreamChunkParser
    claudeParser: StreamChunkParser
    geminiParser: StreamChunkParser
    plainTextParser: StreamChunkParser
  }
}
export declare const __test__: {
  TypewriterThrottle: typeof TypewriterThrottle
}
export {}
