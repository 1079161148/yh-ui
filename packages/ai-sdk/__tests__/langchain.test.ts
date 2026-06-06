/**
 * YH-UI AI SDK - LangChain 集成测试
 *
 * 由于 langchain.ts 强依赖 @langchain/core/messages 模块和 Vue Composition API 的运行时行为,
 * 这里主要测试使用纯 JavaScript 可验证的函数逻辑。
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  langChainRuntime,
  useLangChainChat,
  useLangChainStream,
  createLangChainChain,
  type LangChainMessage
} from '../src/langchain'

// Mock @langchain/core/messages - proper class mocks
vi.mock('@langchain/core/messages', () => {
  class MockHumanMessage {
    content: unknown
    constructor(content: unknown) {
      this.content = content
    }
  }
  class MockAIMessage {
    content: unknown
    constructor(content: unknown) {
      this.content = content
    }
  }
  class MockSystemMessage {
    content: unknown
    constructor(content: unknown) {
      this.content = content
    }
  }
  class MockToolMessage {
    opts: unknown
    constructor(opts: unknown) {
      this.opts = opts
    }
  }
  return {
    HumanMessage: MockHumanMessage,
    AIMessage: MockAIMessage,
    SystemMessage: MockSystemMessage,
    ToolMessage: MockToolMessage
  }
})

describe('langChainRuntime', () => {
  describe('invoke', () => {
    it('should invoke model with string input', async () => {
      const mockModel = {
        invoke: vi.fn().mockResolvedValue({ content: 'Hello response' })
      }

      const result = await langChainRuntime.invoke(mockModel as any, 'Hello')

      expect(mockModel.invoke).toHaveBeenCalled()
      expect(result).toBeDefined()
      expect(result.content).toBe('Hello response')
    })

    it('should invoke model with options and system message', async () => {
      const mockModel = {
        invoke: vi.fn().mockResolvedValue({ content: 'Response' })
      }

      await langChainRuntime.invoke(mockModel as any, 'Hello', {
        systemMessage: 'You are a helpful assistant',
        temperature: 0.7,
        maxTokens: 100
      })

      expect(mockModel.invoke).toHaveBeenCalled()
    })
  })

  describe('stream', () => {
    it('should stream response', async () => {
      const mockStream = {
        stream: vi.fn().mockResolvedValue({
          async *[Symbol.asyncIterator]() {
            yield { content: 'Hello' }
            yield { content: ' ' }
            yield { content: 'World' }
          }
        })
      }

      const onChunk = vi.fn()
      const result = await langChainRuntime.stream(mockStream as any, 'Hello', {
        onChunk
      })

      expect(onChunk).toHaveBeenCalledTimes(3)
      expect(result.content).toBe('Hello World')
    })

    it('should handle empty content chunks', async () => {
      const mockStream = {
        stream: vi.fn().mockResolvedValue({
          async *[Symbol.asyncIterator]() {
            yield { content: '' }
            yield { content: 'Text' }
          }
        })
      }

      const onChunk = vi.fn()
      await langChainRuntime.stream(mockStream as any, 'Hello', { onChunk })

      expect(onChunk).toHaveBeenCalled()
    })
  })

  describe('streamWithTools', () => {
    it('should stream with tools and handle tool calls', async () => {
      const mockStream = {
        stream: vi.fn().mockResolvedValue({
          async *[Symbol.asyncIterator]() {
            yield {
              content: 'Calling tool',
              additional_kwargs: {
                tool_calls: [
                  {
                    function: {
                      name: 'get_weather',
                      arguments: '{"city":"Beijing"}'
                    }
                  }
                ]
              }
            }
          }
        }),
        bind: vi.fn().mockReturnThis()
      }

      const onToolCall = vi.fn()
      const result = await langChainRuntime.streamWithTools(
        mockStream as any,
        'Get weather',
        [{ name: 'get_weather' }],
        { onToolCall }
      )

      expect(onToolCall).toHaveBeenCalledWith({
        name: 'get_weather',
        args: { city: 'Beijing' }
      })
      expect(result.toolCalls).toBeDefined()
      expect(result.toolCalls!.length).toBe(1)
    })

    it('should stream with tools but no tool calls', async () => {
      const mockStream = {
        stream: vi.fn().mockResolvedValue({
          async *[Symbol.asyncIterator]() {
            yield { content: 'Just text', additional_kwargs: {} }
          }
        }),
        bind: vi.fn().mockReturnThis()
      }

      const result = await langChainRuntime.streamWithTools(mockStream as any, 'Hello', [])

      expect(result.toolCalls).toBeUndefined()
    })
  })
})

describe('useLangChainChat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const mockModel = { invoke: vi.fn(), stream: vi.fn() } as any

    const result = useLangChainChat({ model: mockModel })

    expect(result.messages.value).toEqual([])
    expect(result.input.value).toBe('')
    expect(result.isLoading.value).toBe(false)
    expect(result.error.value).toBeNull()
    expect(typeof result.sendMessage).toBe('function')
    expect(typeof result.clearHistory).toBe('function')
    expect(typeof result.reload).toBe('function')
  })

  it('should initialize with initial messages', () => {
    const mockModel = { invoke: vi.fn(), stream: vi.fn() } as any
    const initialMessages: LangChainMessage[] = [
      { id: '1', role: 'user', content: 'Hello', createdAt: new Date() }
    ]

    const result = useLangChainChat({ model: mockModel, initialMessages })

    expect(result.messages.value).toHaveLength(1)
    expect(result.messages.value[0].content).toBe('Hello')
  })

  it('should send message non-streaming', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({ content: 'AI response' }),
      stream: vi.fn()
    } as any

    const onFinish = vi.fn()
    const result = useLangChainChat({
      model: mockModel,
      streaming: false,
      onFinish
    })

    await result.sendMessage('Hello')

    expect(result.messages.value.length).toBeGreaterThanOrEqual(1)
    expect(result.isLoading.value).toBe(false)
    expect(onFinish).toHaveBeenCalled()
  })

  it('should send message streaming', async () => {
    const mockModel = {
      invoke: vi.fn(),
      stream: vi.fn().mockResolvedValue({
        async *[Symbol.asyncIterator]() {
          yield { content: 'Part ' }
          yield { content: '1' }
          yield { content: '2' }
        }
      })
    } as any

    const onChunk = vi.fn()
    const result = useLangChainChat({
      model: mockModel,
      streaming: true,
      onChunk
    })

    await result.sendMessage('Hello streaming')

    expect(onChunk).toHaveBeenCalled()
    expect(result.isLoading.value).toBe(false)
  })

  it('should send message with empty content', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({ content: 'Response' }),
      stream: vi.fn()
    } as any

    const result = useLangChainChat({ model: mockModel, streaming: false })

    await result.sendMessage('   ')

    expect(result.messages.value).toEqual([])
    expect(mockModel.invoke).not.toHaveBeenCalled()
  })

  it('should handle error on sendMessage', async () => {
    const mockModel = {
      invoke: vi.fn().mockRejectedValue(new Error('API Error')),
      stream: vi.fn()
    } as any

    const onError = vi.fn()
    const result = useLangChainChat({
      model: mockModel,
      streaming: false,
      onError
    })

    await result.sendMessage('Hello')

    expect(result.error.value).not.toBeNull()
    expect(onError).toHaveBeenCalled()
    expect(result.isLoading.value).toBe(false)
  })

  it('should clear history', () => {
    const mockModel = { invoke: vi.fn(), stream: vi.fn() } as any

    const result = useLangChainChat({
      model: mockModel,
      initialMessages: [{ id: '1', role: 'user', content: 'Hello', createdAt: new Date() }]
    })

    expect(result.messages.value.length).toBe(1)

    result.clearHistory()

    expect(result.messages.value).toEqual([])
  })

  it('should not reload when no messages', async () => {
    const mockModel = { invoke: vi.fn(), stream: vi.fn() } as any

    const result = useLangChainChat({ model: mockModel, streaming: false })

    await result.reload()

    expect(mockModel.invoke).not.toHaveBeenCalled()
  })

  it('should respect maxHistory limit', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({ content: 'Response' }),
      stream: vi.fn()
    } as any

    const result = useLangChainChat({
      model: mockModel,
      streaming: false,
      maxHistory: 3
    })

    for (let i = 0; i < 5; i++) {
      await result.sendMessage(`Message ${i}`)
    }

    expect(result.messages.value.length).toBeLessThanOrEqual(3)
  })
})

describe('useLangChainStream', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const mockModel = { stream: vi.fn() } as any

    const result = useLangChainStream({ model: mockModel })

    expect(result.content.value).toBe('')
    expect(result.isStreaming.value).toBe(false)
    expect(result.error.value).toBeNull()
    expect(typeof result.start).toBe('function')
    expect(typeof result.stop).toBe('function')
  })

  it('should handle stream errors', async () => {
    const mockModel = {
      stream: vi.fn().mockRejectedValue(new Error('Stream error'))
    } as any

    const result = useLangChainStream({ model: mockModel })

    await result.start('Hello')

    expect(result.error.value).not.toBeNull()
    expect(result.isStreaming.value).toBe(false)
  })
})

describe('createLangChainChain', () => {
  it('should create chain with invoke', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({ content: 'Chain result' })
    } as any

    const chain = createLangChainChain(mockModel)
    const result = await chain.invoke('Hello')

    expect(mockModel.invoke).toHaveBeenCalled()
    expect(result).toBe('Chain result')
  })

  it('should create chain with streaming', async () => {
    const mockModel = {
      stream: vi.fn().mockResolvedValue({
        async *[Symbol.asyncIterator]() {
          yield { content: 'A' }
          yield { content: 'B' }
        }
      })
    } as any

    const chain = createLangChainChain(mockModel, { streaming: true })

    const chunks: string[] = []
    for await (const chunk of chain.stream('Hello')) {
      chunks.push(chunk as string)
    }

    expect(chunks).toEqual(['A', 'B'])
  })

  it('should create chain with invokeWithTools', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({ content: 'Response with tools' }),
      bind: vi.fn().mockReturnThis()
    } as any

    const chain = createLangChainChain(mockModel)

    const result = await chain.invokeWithTools(
      'Use the tool',
      [{ name: 'tool1' }],
      async (name, args) => {
        return `Tool ${name} executed`
      }
    )

    expect(result.message).toBeDefined()
  })

  it('should invokeWithTools without tool calls', async () => {
    const mockModel = {
      invoke: vi.fn().mockResolvedValue({
        content: 'No tool call',
        additional_kwargs: {}
      }),
      bind: vi.fn().mockReturnThis()
    } as any

    const chain = createLangChainChain(mockModel)

    const result = await chain.invokeWithTools('Simple message', [])

    expect(result.message).toBe('No tool call')
    expect(result.toolCalls).toBeUndefined()
  })
})

describe('Type exports', () => {
  it('should export types correctly', async () => {
    expect(typeof langChainRuntime).toBe('object')
    expect(typeof langChainRuntime.invoke).toBe('function')
    expect(typeof langChainRuntime.stream).toBe('function')
    expect(typeof langChainRuntime.streamWithTools).toBe('function')
  })
})
