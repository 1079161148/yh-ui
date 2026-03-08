/**
 * WebSocket 支持
 * 提供 WebSocket 连接管理、自动重连、心跳检测等功能
 */

import { ref, type Ref, onUnmounted } from 'vue'

// ==================== 类型定义 ====================

/** WebSocket 状态 */
export type WebSocketState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'reconnecting'
  | 'error'

/** WebSocket 消息数据 */
export type WebSocketData = string | ArrayBuffer | Blob

/** WebSocket 消息 */
export interface WebSocketMessage<T = unknown> {
  /** 消息类型 */
  type: 'text' | 'binary' | 'ping' | 'pong' | 'error'
  /** 消息数据 */
  data: T
  /** 原始数据 */
  raw: WebSocketData
  /** 时间戳 */
  timestamp: number
}

/** WebSocket 配置 */
export interface WebSocketOptions {
  /** WebSocket URL */
  url: string
  /** 协议子数组 */
  protocols?: string | string[]
  /** 自动重连 */
  reconnect?: boolean
  /** 重连最大次数 */
  reconnectMaxAttempts?: number
  /** 重连初始延迟 (ms) */
  reconnectInterval?: number
  /** 重连最大延迟 (ms) */
  reconnectMaxDelay?: number
  /** 心跳启用 */
  heartbeat?: boolean
  /** 心跳间隔 (ms) */
  heartbeatInterval?: number
  /** 心跳超时 (ms) */
  heartbeatTimeout?: number
  /** 自定义请求头 (仅浏览器) */
  headers?: Record<string, string>
  /** 二进制数据类型 */
  binaryType?: BinaryType
  /** 消息编码器 */
  encode?: (data: unknown) => string | ArrayBuffer
  /** 消息解码器 */
  decode?: (data: WebSocketData) => unknown
}

// ==================== WebSocket 客户端 ====================

/**
 * WebSocket 客户端类
 * 支持自动重连、心跳检测、消息队列等功能
 */
export class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string = ''
  private protocols?: string | string[]
  private options: Required<WebSocketOptions>

  // 状态
  private _state: WebSocketState = 'disconnected'
  private reconnectAttempts = 0
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private heartbeatTimer: ReturnType<typeof setTimeout> | null = null
  private heartbeatTimeoutTimer: ReturnType<typeof setTimeout> | null = null
  private messageQueue: WebSocketData[] = []

  // 回调
  private onOpenCallback: (() => void) | null = null
  private onCloseCallback: ((code: number, reason: string) => void) | null = null
  private onErrorCallback: ((error: Event) => void) | null = null
  private onMessageCallback: ((message: WebSocketMessage) => void) | null = null
  private onStateChangeCallback: ((state: WebSocketState) => void) | null = null

  // 响应式状态 (供 Vue 使用)
  public readonly state: Ref<WebSocketState>
  public readonly isConnected: Ref<boolean>
  public readonly lastMessage: Ref<WebSocketMessage | null>

  constructor(options: WebSocketOptions) {
    this.url = options.url
    this.protocols = options.protocols

    // 设置默认选项 - 使用类型断言避免 undefined 问题
    this.options = {
      url: options.url,
      protocols: options.protocols as string | string[],
      reconnect: options.reconnect ?? true,
      reconnectMaxAttempts: options.reconnectMaxAttempts ?? 10,
      reconnectInterval: options.reconnectInterval ?? 1000,
      reconnectMaxDelay: options.reconnectMaxDelay ?? 30000,
      heartbeat: options.heartbeat ?? false,
      heartbeatInterval: options.heartbeatInterval ?? 30000,
      heartbeatTimeout: options.heartbeatTimeout ?? 10000,
      headers: options.headers ?? {},
      binaryType: options.binaryType ?? 'blob',
      encode: options.encode ?? ((data) => JSON.stringify(data)),
      decode:
        options.decode ??
        ((data) => {
          if (typeof data === 'string') {
            try {
              return JSON.parse(data)
            } catch {
              return data
            }
          }
          return data
        })
    }

    // 初始化响应式状态
    this.state = ref<WebSocketState>('disconnected')
    this.isConnected = ref(false)
    this.lastMessage = ref<WebSocketMessage | null>(null)

    // 绑定 this
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
  }

  /**
   * 获取当前状态
   */
  getState(): WebSocketState {
    return this._state
  }

  /**
   * 设置状态
   */
  private setState(newState: WebSocketState): void {
    this._state = newState
    this.state.value = newState
    this.isConnected.value = newState === 'connected'
    this.onStateChangeCallback?.(newState)
  }

  /**
   * 连接
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        this.ws &&
        (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)
      ) {
        resolve()
        return
      }

      this.setState('connecting')

      try {
        // 注意：浏览器 WebSocket 不支持自定义 headers
        // 如果需要自定义 headers，可能需要通过其他方式（如代理）
        this.ws = this.protocols ? new WebSocket(this.url, this.protocols) : new WebSocket(this.url)

        this.ws.binaryType = this.options.binaryType

        this.ws.onopen = (event) => {
          this.handleOpen(event)
          resolve()
        }

        this.ws.onclose = this.handleClose
        this.ws.onerror = this.handleError
        this.ws.onmessage = this.handleMessage
      } catch (error) {
        this.setState('error')
        reject(error)
      }
    })
  }

  /**
   * 断开连接
   */
  disconnect(code: number = 1000, reason: string = 'Client disconnect'): void {
    this.clearTimers()
    this.setState('disconnecting')

    if (this.ws) {
      this.ws.close(code, reason)
      this.ws = null
    }

    this.setState('disconnected')
  }

  /**
   * 发送消息
   */
  send(data: unknown): boolean {
    // 如果未连接，加入队列
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.messageQueue.push(this.options.encode(data) as WebSocketData)
      return false
    }

    const encoded = this.options.encode(data)
    this.ws.send(encoded)
    return true
  }

  /**
   * 发送并等待响应
   */
  sendAndWait<T = unknown>(data: unknown, timeout: number = 30000): Promise<T> {
    return new Promise((resolve, reject) => {
      const messageId = Date.now().toString()

      const timer = setTimeout(() => {
        reject(new Error('WebSocket message timeout'))
      }, timeout)

      // 临时监听消息
      const originalCallback = this.onMessageCallback
      this.onMessageCallback = (message) => {
        const decoded = message.data as { id?: string; result?: T }
        if (decoded && decoded.id === messageId) {
          clearTimeout(timer)
          this.onMessageCallback = originalCallback
          resolve(decoded.result as T)
        } else {
          originalCallback?.(message)
        }
      }

      // 发送消息带上 ID
      this.send({ id: messageId, ...(data as object) })
    })
  }

  /**
   * 事件回调
   */
  onOpen(callback: () => void): this {
    this.onOpenCallback = callback
    return this
  }

  onClose(callback: (code: number, reason: string) => void): this {
    this.onCloseCallback = callback
    return this
  }

  onError(callback: (error: Event) => void): this {
    this.onErrorCallback = callback
    return this
  }

  onMessage(callback: (message: WebSocketMessage) => void): this {
    this.onMessageCallback = callback
    return this
  }

  onStateChange(callback: (state: WebSocketState) => void): this {
    this.onStateChangeCallback = callback
    return this
  }

  // ==================== 内部方法 ====================

  private handleOpen(_event: Event): void {
    this.setState('connected')
    this.reconnectAttempts = 0

    // 清空消息队列
    while (this.messageQueue.length > 0) {
      const data = this.messageQueue.shift()
      if (data && this.ws) {
        this.ws.send(data)
      }
    }

    // 启动心跳
    if (this.options.heartbeat) {
      this.startHeartbeat()
    }

    this.onOpenCallback?.()
  }

  private handleClose(event: CloseEvent): void {
    this.clearTimers()
    this.setState('disconnected')

    // 自动重连
    if (this.options.reconnect && this.reconnectAttempts < this.options.reconnectMaxAttempts) {
      this.reconnect()
    }

    this.onCloseCallback?.(event.code, event.reason)
  }

  private handleError(event: Event): void {
    this.setState('error')
    this.onErrorCallback?.(event)
  }

  private handleMessage(event: MessageEvent): void {
    const raw = event.data as WebSocketData
    let data: unknown

    // 处理 Pong
    if (event.data === 'pong') {
      this.clearHeartbeatTimeout()
      return
    }

    try {
      data = this.options.decode(raw)
    } catch {
      data = raw
    }

    const message: WebSocketMessage = {
      type: event.data instanceof ArrayBuffer || event.data instanceof Blob ? 'binary' : 'text',
      data,
      raw,
      timestamp: Date.now()
    }

    this.lastMessage.value = message
    this.onMessageCallback?.(message)
  }

  private reconnect(): void {
    this.setState('reconnecting')
    this.reconnectAttempts++

    // 指数退避计算延迟
    const delay = Math.min(
      this.options.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
      this.options.reconnectMaxDelay
    )

    this.reconnectTimer = setTimeout(() => {
      this.connect().catch(() => {
        // 连接失败会自动重试
      })
    }, delay)
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('ping')

        // 设置超时
        this.heartbeatTimeoutTimer = setTimeout(() => {
          // 心跳超时，断开连接
          this.disconnect(4000, 'Heartbeat timeout')
        }, this.options.heartbeatTimeout)
      }
    }, this.options.heartbeatInterval)
  }

  private clearHeartbeatTimeout(): void {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer)
      this.heartbeatTimeoutTimer = null
    }
  }

  private clearTimers(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    this.clearHeartbeatTimeout()
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.disconnect()
    this.onOpenCallback = null
    this.onCloseCallback = null
    this.onErrorCallback = null
    this.onMessageCallback = null
    this.onStateChangeCallback = null
  }
}

// ==================== Vue Hook ====================

/**
 * WebSocket Vue Hook
 *
 * @example
 * const {
 *   state, isConnected, lastMessage,
 *   connect, disconnect, send
 * } = useWebSocket({
 *   url: 'wss://example.com/ws',
 *   reconnect: true,
 *   heartbeat: true,
 * })
 */
export function useWebSocket(options: WebSocketOptions) {
  const client = new WebSocketClient(options)

  // 响应式状态
  const state = client.state
  const isConnected = client.isConnected
  const lastMessage = client.lastMessage

  // 清理
  onUnmounted(() => {
    client.dispose()
  })

  return {
    /** 当前状态 */
    state,
    /** 是否已连接 */
    isConnected,
    /** 最后收到的消息 */
    lastMessage,
    /** 连接 */
    connect: () => client.connect(),
    /** 断开连接 */
    disconnect: (code?: number, reason?: string) => client.disconnect(code, reason),
    /** 发送消息 */
    send: (data: unknown) => client.send(data),
    /** 发送并等待响应 */
    sendAndWait: <T = unknown>(data: unknown, timeout?: number) =>
      client.sendAndWait<T>(data, timeout),
    /** 事件监听 */
    onOpen: (callback: () => void) => client.onOpen(callback),
    onClose: (callback: (code: number, reason: string) => void) => client.onClose(callback),
    onError: (callback: (error: Event) => void) => client.onError(callback),
    onMessage: (callback: (message: WebSocketMessage) => void) => client.onMessage(callback),
    onStateChange: (callback: (state: WebSocketState) => void) => client.onStateChange(callback),
    /** 获取原始客户端 */
    getClient: () => client
  }
}

// ==================== 便捷函数 ====================

/**
 * 创建 WebSocket 客户端
 */
export function createWebSocket(options: WebSocketOptions): WebSocketClient {
  return new WebSocketClient(options)
}

/**
 * 判断浏览器是否支持 WebSocket
 */
export function isWebSocketSupported(): boolean {
  return typeof WebSocket !== 'undefined'
}
