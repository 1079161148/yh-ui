import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onUnmounted: vi.fn()
  }
})
import { nextTick } from 'vue'
import { useAIStream } from '../useAIStream'

// 模拟 Fetch 和 ReadableStream
const createMockResponse = (chunks: string[]) => {
  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(new TextEncoder().encode(chunk))
        await new Promise((resolve) => setTimeout(resolve, 10))
      }
      controller.close()
    }
  })
  return {
    ok: true,
    body: stream,
    headers: new Headers({ 'content-type': 'text/event-stream' })
  } as unknown as Response
}

describe('useAIStream', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('should handle simple text stream', async () => {
    const chunks = ['data: hello\n\n', 'data:  world\n\n', 'event: done\ndata: [DONE]\n\n']
    ;(global.fetch as any).mockResolvedValue(createMockResponse(chunks))

    const { text, done, start } = useAIStream()

    start({ url: '/api/ai' })

    // 等待流读取完成
    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()

    expect(text.value).toBe('hello world')
    expect(done.value).toBe(true)
  })

  it('should parse AI message structure', async () => {
    const chunks = [
      'data: {"content": "Hello"}\n\n',
      'data: {"thinking": "Searching..."}\n\n',
      'data: {"tool_calls": [{"id": "1", "name": "calc", "arguments": "{}"}]}\n\n',
      'event: done\ndata: {}\n\n'
    ]
    ;(global.fetch as any).mockResolvedValue(createMockResponse(chunks))

    const { text, thinking, toolCalls, start } = useAIStream()

    start({ url: '/api/ai' })

    await new Promise((resolve) => setTimeout(resolve, 150))
    await nextTick()

    expect(text.value).toBe('Hello')
    expect(thinking.value).toBe('Searching...')
    expect(toolCalls.value).toHaveLength(1)
    expect(toolCalls.value![0].name).toBe('calc')
  })

  it('should handle custom thinking and tool events', async () => {
    const chunks = [
      'event: thinking\ndata: I am thinking\n\n',
      'event: tool\ndata: {"tool_calls": [{"id": "2", "name": "web_search", "arguments": "{}"}]}\n\n'
    ]
    ;(global.fetch as any).mockResolvedValue(createMockResponse(chunks))

    const { thinking, toolCalls, start } = useAIStream()

    start({ url: '/api/ai' })

    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()

    expect(thinking.value).toBe('I am thinking')
    expect(toolCalls.value).toHaveLength(1)
    expect(toolCalls.value![0].name).toBe('web_search')
  })

  it('should reset state on start', async () => {
    const { text, thinking, start, reset } = useAIStream()

    text.value = 'old'
    thinking.value = 'old think'

    reset()
    expect(text.value).toBe('')
    expect(thinking.value).toBe('')
  })
})
