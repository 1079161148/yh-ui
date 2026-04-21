import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})

import { nextTick } from 'vue'
import {
  WebSocketClient,
  useWebSocket,
  createWebSocket,
  isWebSocketSupported
} from '../websocket'
import { useSSE } from '../useSSE'

class MockWebSocket {
  url: string
  protocols?: string | string[]
  readyState: number = 0
  binaryType: string = 'blob'
  onopen: ((event: any) => void) | null = null
  onclose: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onmessage: ((event: any) => void) | null = null
  static readonly CONNECTING = 0
  static readonly OPEN = 1
  static readonly CLOSING = 2
  static readonly CLOSED = 3
  sent: any[] = []
  static last: MockWebSocket | null = null

  constructor(url: string, protocols?: string | string[]) {
    this.url = url
    this.protocols = protocols
    MockWebSocket.last = this
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      this.onopen?.({ type: 'open' })
    }, 0)
  }

  send(data: any) {
    this.sent.push(data)
  }

  close(code?: number, reason?: string) {
    this.readyState = MockWebSocket.CLOSING
    setTimeout(() => {
      this.readyState = MockWebSocket.CLOSED
      this.onclose?.({ code, reason, type: 'close' })
    }, 0)
  }
}

describe('websocket.ts extra branches', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('WebSocket', MockWebSocket as any)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('send queues before connect and flushes on open; heartbeat ping/pong clears timeout', async () => {
    const client = new WebSocketClient({
      url: 'ws://localhost',
      reconnect: false,
      heartbeat: true,
      heartbeatInterval: 1000,
      heartbeatTimeout: 50,
      encode: (d) => String((d as any).x ?? d),
      decode: (d) => d
    })

    // queue before connected
    const queued = client.send({ x: 'q1' })
    expect(queued).toBe(false)

    const p = client.connect()
    vi.runAllTimers()
    await p

    const ws = MockWebSocket.last!
    expect(ws).toBeTruthy()
    expect(ws.sent).toContain('q1')

    // heartbeat should send ping and schedule timeout
    vi.advanceTimersByTime(1000)
    expect(ws.sent).toContain('ping')

    // pong clears heartbeat timeout
    ws.onmessage?.({ data: 'pong' })
    vi.advanceTimersByTime(1000)
  })

  it('sendAndWait resolves when matching id arrives, and rejects on timeout', async () => {
    const client = new WebSocketClient({ url: 'ws://localhost', reconnect: false })
    const p = client.connect()
    vi.runAllTimers()
    await p
    const ws = MockWebSocket.last!

    const waitOk = client.sendAndWait<{ ok: boolean }>({ action: 'x' }, 1000)
    const sent = ws.sent.find((x) => typeof x === 'string') as string
    const parsed = JSON.parse(sent)
    ws.onmessage?.({ data: JSON.stringify({ id: parsed.id, result: { ok: true } }) })
    await expect(waitOk).resolves.toEqual({ ok: true })

    const waitTimeout = client.sendAndWait({ action: 'y' }, 10)
    vi.advanceTimersByTime(11)
    await expect(waitTimeout).rejects.toThrow('timeout')
  })

  it('reconnect triggers when enabled and attempts remain', async () => {
    const client = new WebSocketClient({
      url: 'ws://localhost',
      reconnect: true,
      reconnectMaxAttempts: 1,
      reconnectInterval: 10,
      reconnectMaxDelay: 10
    })
    const p = client.connect()
    vi.runAllTimers()
    await p
    const ws = MockWebSocket.last!

    // close triggers reconnect scheduling
    ws.onclose?.({ code: 1006, reason: 'x' })
    expect(client.getState()).toBe('reconnecting')
    vi.advanceTimersByTime(10)
  })

  it('callback registration helpers, getClient, support helper and dispose path', async () => {
    const hook = useWebSocket({ url: 'ws://localhost', reconnect: false })
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const onError = vi.fn()
    const onMessage = vi.fn()
    const onStateChange = vi.fn()

    hook.onOpen(onOpen)
    hook.onClose(onClose)
    hook.onError(onError)
    hook.onMessage(onMessage)
    hook.onStateChange(onStateChange)

    expect(isWebSocketSupported()).toBe(true)
    expect(createWebSocket({ url: 'ws://localhost' })).toBeInstanceOf(WebSocketClient)
    expect(hook.getClient()).toBeInstanceOf(WebSocketClient)

    const p = hook.connect()
    vi.runAllTimers()
    await p

    const ws = MockWebSocket.last!
    ws.onerror?.({ type: 'error' })
    ws.onmessage?.({ data: 'plain-text' })
    hook.disconnect(1000, 'bye')
    vi.runAllTimers()

    expect(onOpen).toHaveBeenCalled()
    expect(onError).toHaveBeenCalled()
    expect(onMessage).toHaveBeenCalled()
    expect(onStateChange).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
    hook.getClient().dispose()
  })
})

describe('useSSE extra branches', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('handles custom events, parseJSON false, and trailing buffer on stream end', async () => {
    const onCustomEvent = vi.fn()
    const onDone = vi.fn()
    const { start, content, messages } = useSSE({
      parseJSON: false,
      onCustomEvent,
      onDone
    })

    const enc = new TextEncoder()
    const chunks = [
      '# comment\n\n',
      'event: my_evt\ndata: hello\n\n',
      // last message without separator, should be handled when readDone=true
      'event: chunk\ndata: tail'
    ]
    let i = 0
    const reader = {
      read: vi.fn().mockImplementation(async () => {
        if (i < chunks.length) return { done: false, value: enc.encode(chunks[i++]) }
        return { done: true }
      }),
      cancel: vi.fn()
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      body: { getReader: () => reader }
    } as any)

    start({ url: '/sse' })
    await Promise.resolve()
    await nextTick()
    await vi.runAllTimersAsync()

    expect(onCustomEvent).toHaveBeenCalledWith('my_evt', 'hello')
    expect(content.value).toContain('tail')
    expect(messages.value.length).toBeGreaterThan(0)
    expect(onDone).toHaveBeenCalled()
  })

  it('handles non-ok response and null body error paths', async () => {
    const onError = vi.fn()
    const { start } = useSSE({ onError })

    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 400, statusText: 'Bad' } as any)
    await start({ url: '/bad' } as any)
    expect(onError).toHaveBeenCalled()

    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, body: null } as any)
    await start({ url: '/nobody' } as any)
    expect(onError).toHaveBeenCalled()
  })

  it('AbortError is ignored', async () => {
    const onError = vi.fn()
    const { start, stop } = useSSE({ onError })
    const reader = {
      read: vi.fn().mockRejectedValue(Object.assign(new Error('x'), { name: 'AbortError' })),
      cancel: vi.fn()
    }
    vi.mocked(fetch).mockResolvedValue({ ok: true, body: { getReader: () => reader } } as any)
    start({ url: '/abort' })
    stop()
    await Promise.resolve()
    await nextTick()
    await vi.runAllTimersAsync()
    expect(onError).not.toHaveBeenCalled()
  })
})

