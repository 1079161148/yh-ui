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
import { useSSE } from '../useSSE'

describe('useSSE', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('initializes correctly', () => {
    const { loading, content, messages, error } = useSSE()
    expect(loading.value).toBe(false)
    expect(content.value).toBe('')
    expect(messages.value).toEqual([])
    expect(error.value).toBeUndefined()
  })

  it('can start SSE request successfully', async () => {
    const mockOnMessage = vi.fn()
    const mockOnDone = vi.fn()
    const { start, loading, content, messages } = useSSE({
      onMessage: mockOnMessage,
      onDone: mockOnDone
    })

    const enc = new TextEncoder()
    const chunks = [
      'event: chunk\ndata: Hello\n\n',
      'event: chunk\ndata: World\n\n',
      'event: done\n\n'
    ]

    let chunkIndex = 0
    const mockReader = {
      read: vi.fn().mockImplementation(async () => {
        if (chunkIndex < chunks.length) {
          return { done: false, value: enc.encode(chunks[chunkIndex++]) }
        }
        return { done: true }
      }),
      cancel: vi.fn()
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      body: { getReader: () => mockReader }
    } as any)

    start({ url: '/api/sse' })
    expect(loading.value).toBe(true)

    // Await microtasks for reader to process chunks
    await Promise.resolve()
    await nextTick()
    await vi.runAllTimersAsync()

    expect(content.value).toBe('HelloWorld')
    expect(messages.value.length).toBe(3)
    expect(messages.value[0].event).toBe('chunk')
    expect(messages.value[0].data).toBe('Hello')

    expect(mockOnMessage).toHaveBeenCalledTimes(3)
    expect(mockOnDone).toHaveBeenCalledWith('HelloWorld')
    expect(loading.value).toBe(false)
  })

  it('handles custom events correctly', async () => {
    const mockOnCustom = vi.fn()
    const { start, messages } = useSSE({
      onCustomEvent: mockOnCustom
    })

    const mockReader = {
      read: vi
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('event: custom\ndata: {"foo":"bar"}\n\n')
        })
        .mockResolvedValueOnce({ done: true }),
      cancel: vi.fn()
    }

    vi.mocked(fetch).mockResolvedValue({ ok: true, body: { getReader: () => mockReader } } as any)

    await start({ url: '/api/sse' })
    await Promise.resolve()
    await vi.runAllTimersAsync()

    expect(mockOnCustom).toHaveBeenCalledWith('custom', { foo: 'bar' })
    expect(messages.value.length).toBe(1)
    expect(messages.value[0].event).toBe('custom')
    expect(messages.value[0].data).toEqual({ foo: 'bar' })
  })

  it('handles fetch errors', async () => {
    const mockOnError = vi.fn()
    const { start, error, loading } = useSSE({ onError: mockOnError })

    vi.mocked(fetch).mockRejectedValue(new Error('Network Error'))

    await start({ url: '/api/sse' })

    expect(error.value?.message).toBe('Network Error')
    expect(mockOnError).toHaveBeenCalled()
    expect(loading.value).toBe(false)
  })

  it('handles non-ok responses', async () => {
    const { start, error } = useSSE()
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Error'
    } as any)

    await start({ url: '/api/sse' })

    expect(error.value?.message).toBe('SSE request failed: 500 Internal Error')
  })

  it('can stop manually', async () => {
    const { start, stop, loading } = useSSE()

    const mockReader = {
      read: vi.fn().mockImplementation(() => new Promise(() => {})), // Hangs forever
      cancel: vi.fn()
    }
    vi.mocked(fetch).mockResolvedValue({ ok: true, body: { getReader: () => mockReader } } as any)

    start({ url: '/api/sse' })
    expect(loading.value).toBe(true)

    await Promise.resolve() // let fetch initiate

    stop()
    expect(loading.value).toBe(false)
    expect(mockReader.cancel).toHaveBeenCalled()
  })
})
