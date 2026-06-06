import { describe, it, expect, vi } from 'vitest'
import {
  useAiStream,
  openaiParser,
  ernieParser,
  qwenParser,
  claudeParser,
  geminiParser
} from '../use-ai-stream'

describe('useAiStream Parsers', () => {
  it('openaiParser should parse data correctly', () => {
    const raw =
      'data: {"choices":[{"delta":{"content":"hello"}}]}\ndata: {"choices":[{"delta":{"content":" world"}}]}'
    expect(openaiParser(raw)).toBe('hello world')
    expect(openaiParser('data: [DONE]')).toBe(null)
  })

  it('ernieParser should parse data correctly', () => {
    const raw = 'data: {"result":"hello"}\ndata: {"result":" bit"}'
    expect(ernieParser(raw)).toBe('hello bit')
  })

  it('qwenParser should parse data correctly', () => {
    const raw = 'data: {"output":{"text":"hello qwen"}}'
    expect(qwenParser(raw)).toBe('hello qwen')
  })

  it('claudeParser should parse data correctly', () => {
    const raw =
      'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"claude msg"}}'
    expect(claudeParser(raw)).toBe('claude msg')
  })

  it('geminiParser should parse data correctly', () => {
    const raw = '{"candidates":[{"content":{"parts":[{"text":"gemini hi"}]}}]}'
    expect(geminiParser(raw)).toBe('gemini hi')
    const rawWithData = 'data: {"candidates":[{"content":{"parts":[{"text":"gemini data"}]}}]}'
    expect(geminiParser(rawWithData)).toBe('gemini data')
  })
})

describe('useAiStream', () => {
  it('should handle AsyncGenerator request', async () => {
    async function* mockGenerator() {
      yield 'chunk1'
      yield 'chunk2'
    }

    const { currentContent, fetchStream, isStreaming } = useAiStream({
      request: () => mockGenerator(),
      typewriter: false
    })

    const p = fetchStream('test')
    expect(isStreaming.value).toBe(true)
    await p
    expect(isStreaming.value).toBe(false)
    expect(currentContent.value).toBe('chunk1chunk2')
  })

  it('should handle fetch Response request', async () => {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('resp1'))
        controller.enqueue(encoder.encode('resp2'))
        controller.close()
      }
    })

    const mockResponse = new Response(stream)
    const { currentContent, fetchStream } = useAiStream({
      request: async () => mockResponse,
      typewriter: false
    })

    await fetchStream('test')
    expect(currentContent.value).toBe('resp1resp2')
  })

  it('should handle stop/abort', async () => {
    let aborted = false
    async function* mockGenerator() {
      yield '1'
      await new Promise((r) => setTimeout(r, 100))
      yield '2'
    }

    const { fetchStream, stop, isStreaming } = useAiStream({
      request: () => mockGenerator(),
      typewriter: false
    })

    const p = fetchStream('test')
    stop()
    await p
    expect(isStreaming.value).toBe(false)
  })

  it('should support typewriter effect with rAF', async () => {
    let rafHandler: FrameRequestCallback | null = null
    const mockRaf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafHandler = cb
      return 1
    })

    async function* mockGenerator() {
      yield 'a'
      await new Promise((r) => setTimeout(r, 50))
      yield 'bc'
    }

    const { currentContent, fetchStream } = useAiStream({
      request: () => mockGenerator(),
      typewriter: true,
      charsPerFrame: 1
    })

    const p = fetchStream('test')

    // Wait for 'a' to be pushed
    await vi.waitFor(() => {
      if (!rafHandler) throw new Error('no raf for a')
    })

    if (rafHandler) {
      const h: FrameRequestCallback = rafHandler
      rafHandler = null
      h(0)
    }
    // It should at least have one character
    expect(currentContent.value.length).toBeGreaterThanOrEqual(1)

    // Wait for generation to finish or next chars
    await p
    expect(currentContent.value).toBe('abc')

    mockRaf.mockRestore()
  })
})
