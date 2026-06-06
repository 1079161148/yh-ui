/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useWebSocket } from '../websocket'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onUnmounted: vi.fn()
  }
})

describe('useWebSocket SSR', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 强制模拟 WebSocket 未定义环境
    vi.stubGlobal('WebSocket', undefined)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('should be initialized in ssr environment without error', () => {
    const { isConnected, state } = useWebSocket({
      url: 'ws://localhost'
    })

    expect(isConnected.value).toBe(false)
    expect(state.value).toBe('disconnected')
  })

  it('connect should handle missing WebSocket global safely', async () => {
    const { connect } = useWebSocket({ url: 'ws://localhost' })

    // 使用 try-catch 避免 await expect().rejects 超时挂起
    let error: any
    try {
      await connect()
    } catch (e) {
      error = e
    }

    expect(error?.message).toContain('WebSocket is not supported')
  }, 1000) // 缩短超时时间
})
