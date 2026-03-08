import { ref, shallowRef, onUnmounted, type Ref, type ShallowRef } from 'vue'
import { type RequestOptions } from './types'

// ==================== 类型定义 ====================

/** SSE 事件类型 */
export type SSEEventType =
  | 'message' // 文本消息
  | 'start' // 开始
  | 'chunk' // 内容块
  | 'done' // 完成
  | 'error' // 错误
  | 'tool' // 工具调用
  | 'thinking' // 思考中
  | 'custom' // 自定义事件

/** SSE 消息 */
export interface SSEMessage<T = unknown> {
  /** 事件类型 */
  event: SSEEventType
  /** 数据 */
  data: T
  /** 原始行数据 */
  raw: string
  /** 是否为最后一个消息 */
  done: boolean
  /** 错误信息（如有） */
  error?: Error
}

/** SSE Hook 配置 */
export interface UseSSEOptions extends RequestOptions {
  /** 自动解析 JSON */
  parseJSON?: boolean
  /** 解码器 */
  decoder?: TextDecoder
  /** 消息分隔符 */
  separator?: string
  /** 自定义事件前缀 */
  eventPrefix?: string
  /** 开始回调 */
  onStart?: () => void
  /** 消息回调 */
  onMessage?: (message: SSEMessage) => void
  /** 完成回调 */
  onDone?: (fullContent: string) => void
  /** 错误回调 */
  onError?: (error: Error) => void
  /** 自定义事件回调 */
  onCustomEvent?: (event: string, data: unknown) => void
}

/** SSE Hook 返回值 */
export interface UseSSEReturn {
  /** 是否正在连接/接收 */
  loading: Ref<boolean>
  /** 当前接收到的文本 */
  content: Ref<string>
  /** 完整消息列表 */
  messages: Ref<SSEMessage[]>
  /** 错误 */
  error: ShallowRef<Error | undefined>
  /** 启动流式请求 */
  start: (options?: RequestOptions) => void
  /** 停止流式请求 */
  stop: () => void
  /** 重置状态 */
  reset: () => void
}

/** Fetch 请求头类型 */
type FetchHeaders = Record<string, string>

// ==================== SSE Hook ====================

/**
 * useSSE - Server-Sent Events 流式请求 Hook
 *
 * 适用于 AI 应用中的流式响应
 *
 * @example
 * const { content, loading, messages, start, stop } = useSSE({
 *   onMessage: (msg) => console.log(msg.data),
 *   onDone: (full) => console.log('Complete:', full),
 * })
 *
 * // 发起请求
 * start({
 *   url: '/api/chat',
 *   method: 'POST',
 *   data: { messages: [...] },
 * })
 */
export function useSSE(options: UseSSEOptions = {}): UseSSEReturn {
  const {
    parseJSON = true,
    separator = '\n\n',
    eventPrefix = 'event:',
    onStart,
    onMessage,
    onDone,
    onError,
    onCustomEvent,
    ...fetchOptions
  } = options

  // 状态
  const loading = ref(false)
  const content = ref('')
  const messages = ref<SSEMessage[]>([])
  const error = shallowRef<Error | undefined>(undefined)

  // 内部状态
  let abortController: AbortController | null = null
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null
  let decoder: TextDecoder | undefined

  // 解码器
  const getDecoder = () => {
    if (!decoder) {
      decoder = new TextDecoder()
    }
    return decoder
  }

  // 解析 SSE 行
  const parseLine = (line: string): { event?: string; data: string } => {
    const result: { event?: string; data: string } = { data: '' }

    if (!line || line.startsWith('#')) return result

    // 解析事件类型
    if (line.startsWith(eventPrefix)) {
      result.event = line.slice(eventPrefix.length).trim()
      return result
    }

    // 解析数据
    if (line.startsWith('data:')) {
      result.data = line.slice(5).trim()
    }

    return result
  }

  // 解析 SSE 消息
  const parseSSE = (rawData: string): SSEMessage | null => {
    const lines = rawData.split('\n')
    let eventType: SSEEventType = 'message'
    let eventData = ''
    let done = false

    for (const line of lines) {
      const { event, data } = parseLine(line)

      if (event) {
        // 映射事件名称
        switch (event.toLowerCase()) {
          case 'start':
            eventType = 'start'
            break
          case 'chunk':
          case 'content':
            eventType = 'chunk'
            break
          case 'done':
          case 'stop':
            eventType = 'done'
            done = true
            break
          case 'error':
            eventType = 'error'
            break
          case 'tool':
          case 'function':
            eventType = 'tool'
            break
          case 'thinking':
          case 'thinking_start':
          case 'thinking_end':
            eventType = 'thinking'
            break
          default:
            // 自定义事件
            eventType = 'custom'
            if (onCustomEvent) {
              try {
                const parsed = parseJSON ? JSON.parse(data) : data
                onCustomEvent(event, parsed)
              } catch {
                // 解析失败时忽略
              }
            }
            break
        }
      }

      if (data) {
        eventData += data
      }
    }

    // 跳过空消息
    if (!eventData && eventType !== 'done') return null

    // 解析 JSON
    let finalData: unknown = eventData
    if (parseJSON && eventData) {
      try {
        finalData = JSON.parse(eventData)
      } catch {
        // 保持原始字符串
      }
    }

    return {
      event: eventType,
      data: finalData,
      raw: rawData,
      done
    }
  }

  // 启动 SSE 请求
  const start = async (requestOptions?: RequestOptions) => {
    // 停止之前的请求
    stop()
    reset()

    // 合并配置
    const config: RequestOptions = {
      ...fetchOptions,
      ...requestOptions
    }

    loading.value = true
    error.value = undefined

    // 开始回调
    onStart?.()

    try {
      // 构建 URL
      let url = config.url || ''
      if (config.baseURL) {
        url = url.startsWith('http') ? url : config.baseURL + url
      }

      // 添加查询参数
      if (config.params) {
        const params = new URLSearchParams()
        Object.entries(config.params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, String(v)))
          } else {
            params.append(key, String(value))
          }
        })
        const sep = url.includes('?') ? '&' : '?'
        url += sep + params.toString()
      }

      // 准备 fetch 选项
      const headers: FetchHeaders = (config.headers || {}) as FetchHeaders
      const fetchInit: RequestInit = {
        method: config.method || 'POST',
        headers,
        credentials: config.credentials || 'same-origin'
      }

      // 添加请求体
      if (config.data && config.method !== 'GET') {
        fetchInit.body = JSON.stringify(config.data)
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json'
        }
      }

      // 创建 AbortController
      abortController = new AbortController()
      fetchInit.signal = abortController.signal

      // 发送请求
      const response = await fetch(url, fetchInit)

      if (!response.ok) {
        throw new Error(`SSE request failed: ${response.status} ${response.statusText}`)
      }

      // 获取响应体
      const body = response.body
      if (!body) {
        throw new Error('Response body is null')
      }

      reader = body.getReader()
      const textDecoder = getDecoder()
      let buffer = ''

      // 读取流
      while (true) {
        const { done: readDone, value } = await reader.read()

        if (readDone) {
          // 处理剩余缓冲
          if (buffer) {
            const msg = parseSSE(buffer)
            if (msg) {
              handleMessage(msg)
            }
          }
          break
        }

        // 解码
        const chunk = textDecoder.decode(value, { stream: true })
        buffer += chunk

        // 按分隔符分割
        const parts = buffer.split(separator)
        buffer = parts.pop() || ''

        // 处理每个完整的消息
        for (const part of parts) {
          const msg = parseSSE(part)
          if (msg) {
            handleMessage(msg)

            // 如果是完成信号，停止读取
            if (msg.done) {
              onDone?.(content.value)
              loading.value = false
              return
            }
          }
        }
      }

      // 完成
      onDone?.(content.value)
    } catch (err: unknown) {
      // 检查是否被取消
      const errWithName = err as { name?: string }
      if (errWithName?.name === 'AbortError') {
        return
      }

      const errObj = err instanceof Error ? err : new Error(String(err))
      error.value = errObj
      onError?.(errObj)
    } finally {
      loading.value = false
    }
  }

  // 处理消息
  const handleMessage = (message: SSEMessage) => {
    // 更新内容
    if (typeof message.data === 'string') {
      content.value += message.data
    }

    // 存储消息
    messages.value.push(message)

    // 消息回调
    onMessage?.(message)
  }

  // 停止 SSE 请求
  const stop = () => {
    if (reader) {
      reader.cancel()
      reader = null
    }
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    loading.value = false
  }

  // 重置状态
  const reset = () => {
    content.value = ''
    messages.value = []
    error.value = undefined
  }

  // 清理
  onUnmounted(() => {
    stop()
  })

  return {
    loading,
    content,
    messages,
    error,
    start,
    stop,
    reset
  }
}
