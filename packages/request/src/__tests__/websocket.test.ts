import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onUnmounted: vi.fn()
  }
})
import { nextTick } from 'vue'
import { useWebSocket, WebSocketClient } from '../websocket'

// 模拟 WebSocket
class MockWebSocket {
  url: string
  protocols?: string | string[]
  readyState: number = 0 // CONNECTING
  binaryType: string = 'blob'
  onopen: ((event: any) => void) | null = null
  onclose: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onmessage: ((event: any) => void) | null = null

  static readonly CONNECTING = 0
  static readonly OPEN = 1
  static readonly CLOSING = 2
  static readonly CLOSED = 3

  constructor(url: string, protocols?: string | string[]) {
    this.url = url
    this.protocols = protocols
    // 模拟异步连接
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      if (this.onopen) this.onopen({ type: 'open' })
    }, 0)
  }

  send(data: any) {
    if (this.readyState !== MockWebSocket.OPEN) throw new Error('Not open')
  }

  close(code?: number, reason?: string) {
    this.readyState = MockWebSocket.CLOSING
    setTimeout(() => {
      this.readyState = MockWebSocket.CLOSED
      this.onclose?.({ code, reason, type: 'close' })
    }, 10)
  }
}

describe('WebSocket', () => {
  beforeEach(() => {
    vi.stubGlobal('WebSocket', MockWebSocket)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  describe('WebSocketClient', () => {
    it('should connect and update state', async () => {
      const client = new WebSocketClient({ url: 'ws://localhost' })
      expect(client.state.value).toBe('disconnected')

      const promise = client.connect()
      expect(client.state.value).toBe('connecting')

      vi.runAllTimers()
      await promise

      expect(client.state.value).toBe('connected')
      expect(client.isConnected.value).toBe(true)
    })

    it('should handle incoming messages', async () => {
      const client = new WebSocketClient({ url: 'ws://localhost' })
      const promise = client.connect()
      vi.runAllTimers()
      await promise

      const ws = (client as any).ws as MockWebSocket
      const testData = { id: 'msg1', message: 'hello' }

      ws.onmessage?.({
        data: JSON.stringify(testData),
        type: 'message'
      } as any)

      expect(client.lastMessage.value?.data).toEqual(testData)
    })

    it('should send messages and queue if not connected', async () => {
      const client = new WebSocketClient({ url: 'ws://localhost' })
      const sendSpy = vi.spyOn(MockWebSocket.prototype, 'send')

      client.send('queued message')
      expect(sendSpy).not.toHaveBeenCalled()

      const promise = client.connect()
      vi.runAllTimers()
      await promise

      expect(sendSpy).toHaveBeenCalledWith(JSON.stringify('queued message'))
    })

    it('should handle reconnection', async () => {
      const client = new WebSocketClient({
        url: 'ws://localhost',
        reconnect: true,
        reconnectInterval: 100
      })
      const promise = client.connect()
      vi.runAllTimers()
      await promise

      const ws = (client as any).ws as MockWebSocket
      ws.onclose?.({ code: 1001, reason: 'Going away' } as any)

      // 自动重连会立即将状态设置为 reconnecting
      expect(client.state.value).toBe('reconnecting')

      // 运行重连定时器及其内部的所有定时任务 (如 MockWebSocket 的连接延迟)
      vi.runAllTimers()
      await nextTick()
      await nextTick()

      expect(client.state.value).toBe('connected')
    })
  })

  describe('useWebSocket hook', () => {
    it('should work correctly', async () => {
      const { state, connect, isConnected } = useWebSocket({ url: 'ws://localhost' })

      expect(state.value).toBe('disconnected')
      connect()

      vi.advanceTimersByTime(20)
      await nextTick()

      expect(isConnected.value).toBe(true)
    })
  })
})
