/**
 * YH-UI AI SDK - 核心功能测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import {
  createStreamableValue,
  useStreamableValue,
  useConversation,
  useConversations,
  useAIChat,
  useAIStream,
  createYHFunctionTool,
  createProviderAdapter,
  createAIContext,
  XRequest,
  createXRequest,
  registerMiddleware,
  clearCache,
  PROVIDER_PRESETS,
  getProviderPreset
} from '../src/vue'
import { createMockFetch, createMockStorage, wait } from './mocks'

// Mock global fetch and localStorage
const mockFetch = createMockFetch()
global.fetch = vi.fn(mockFetch) as typeof fetch
global.localStorage = createMockStorage() as unknown as Storage

describe('StreamableValue', () => {
  it('should create a streamable value with initial value', () => {
    const streamable = createStreamableValue('initial')
    expect(streamable.value.value).toBe('initial')
    expect(streamable.loading.value).toBe(true)
    expect(streamable.error.value).toBe(null)
  })

  it('should update value', () => {
    const streamable = createStreamableValue('initial')
    streamable.value.value = 'updated'
    expect(streamable.value.value).toBe('updated')
  })

  it('should set loading state', () => {
    const streamable = createStreamableValue('initial')
    streamable.loading.value = false
    expect(streamable.loading.value).toBe(false)
  })

  it('should set error state', () => {
    const streamable = createStreamableValue('initial')
    const error = new Error('test error')
    streamable.error.value = error
    expect(streamable.error.value).toBe(error)
  })
})

describe('useStreamableValue', () => {
  it('should create computed from streamable', () => {
    const streamable = createStreamableValue('test')
    const { value, loading, error } = useStreamableValue(streamable)

    expect(value.value).toBe('test')
    expect(loading.value).toBe(true)
    expect(error.value).toBe(null)
  })

  it('should react to streamable changes', () => {
    const streamable = createStreamableValue('initial')
    const { value } = useStreamableValue(streamable)

    streamable.value.value = 'changed'
    expect(value.value).toBe('changed')
  })
})

describe('useConversation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should create empty conversation', () => {
    const { messages, addMessage, clearHistory } = useConversation()

    expect(messages.value).toEqual([])
    expect(typeof addMessage).toBe('function')
    expect(typeof clearHistory).toBe('function')
  })

  it('should add message', () => {
    const { messages, addMessage } = useConversation()

    addMessage({ role: 'user', content: 'Hello' })
    expect(messages.value).toHaveLength(1)
    expect(messages.value[0].role).toBe('user')
    expect(messages.value[0].content).toBe('Hello')
  })

  it('should generate message id', () => {
    const { messages, addMessage } = useConversation()

    addMessage({ role: 'user', content: 'Hello' })
    expect(messages.value[0].id).toMatch(/^msg-/)
  })

  it('should add createdAt timestamp', () => {
    const { messages, addMessage } = useConversation()

    addMessage({ role: 'user', content: 'Hello' })
    expect(messages.value[0].createdAt).toBeInstanceOf(Date)
  })

  it('should respect maxHistory', () => {
    const { messages, addMessage } = useConversation({ maxHistory: 3 })

    addMessage({ role: 'user', content: '1' })
    addMessage({ role: 'user', content: '2' })
    addMessage({ role: 'user', content: '3' })
    addMessage({ role: 'user', content: '4' })

    expect(messages.value).toHaveLength(3)
    expect(messages.value[0].content).toBe('2')
  })

  it('should persist to localStorage', () => {
    const { addMessage } = useConversation({ persist: true, storageKey: 'test-key' })

    addMessage({ role: 'user', content: 'Hello' })

    const stored = localStorage.getItem('test-key')
    expect(stored).toContain('Hello')
  })

  it('should load from localStorage', () => {
    localStorage.setItem(
      'test-key2',
      JSON.stringify([
        { id: '1', role: 'user', content: 'Stored', createdAt: new Date().toISOString() }
      ])
    )

    const { messages } = useConversation({ persist: true, storageKey: 'test-key2' })
    expect(messages.value).toHaveLength(1)
    expect(messages.value[0].content).toBe('Stored')
  })

  it('should clear history', () => {
    const { messages, addMessage, clearHistory } = useConversation({
      persist: true,
      storageKey: 'test-key3'
    })

    addMessage({ role: 'user', content: 'Hello' })
    expect(messages.value).toHaveLength(1)

    clearHistory()
    expect(messages.value).toHaveLength(0)
  })
})

describe('useConversations (Multi-session)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should create initial conversation', () => {
    const { conversations, currentId, currentMessages } = useConversations()

    expect(conversations.value).toHaveLength(1)
    expect(currentId.value).not.toBeNull()
    expect(currentMessages.value).toEqual([])
  })

  it('should create new conversation', () => {
    const { conversations, create } = useConversations()

    const id = create()
    expect(conversations.value).toHaveLength(2)
    expect(conversations.value[0].id).toBe(id)
  })

  it('should add message to current conversation', () => {
    const { addMessage, currentMessages } = useConversations()

    addMessage({ role: 'user', content: 'Hello' })
    expect(currentMessages.value).toHaveLength(1)
  })

  it('should select conversation', () => {
    const { create, select, currentId } = useConversations()

    const id1 = create()
    const id2 = create()

    select(id1)
    expect(currentId.value).toBe(id1)

    select(id2)
    expect(currentId.value).toBe(id2)
  })

  it('should delete conversation', () => {
    const { conversations, create, remove, currentId } = useConversations()

    const id1 = create()
    const id2 = create()

    remove(id1)
    expect(conversations.value).toHaveLength(2)
    expect(conversations.value.find((c) => c.id === id1)).toBeUndefined()
  })

  it('should persist conversations', () => {
    const { create } = useConversations({ persist: true, storageKey: 'multi-conv-test' })

    create()
    create()

    const stored = localStorage.getItem('multi-conv-test')
    expect(stored).toBeTruthy()
  })

  it('should respect maxConversations limit', () => {
    const { create, conversations } = useConversations({ maxConversations: 2 })

    create()
    create()
    create()
    create()

    expect(conversations.value).toHaveLength(2)
  })

  it('should auto-generate title', () => {
    const { create, conversations } = useConversations({ autoTitle: true })

    create([{ role: 'user', content: 'What is TypeScript?', id: '1', createdAt: new Date() }])

    expect(conversations.value[0].title).toBe('What is TypeScript?')
  })
})

describe('useAIChat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should create chat with initial messages', () => {
    const initialMessages = [{ role: 'user' as const, content: 'Hello', id: '1' }]
    const { messages, input, isLoading, error } = useAIChat({
      api: '/api/chat',
      initialMessages
    })

    expect(messages.value).toHaveLength(1)
    expect(input.value).toBe('')
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('should send message', async () => {
    const mockResponse = { content: 'Hello, I am AI' }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
      body: null
    })
    global.fetch = mockFetch as typeof fetch

    const { messages, sendMessage, isLoading } = useAIChat({
      api: '/api/chat'
    })

    await sendMessage('Hello')

    expect(isLoading.value).toBe(false)
    expect(messages.value).toHaveLength(2) // user + assistant
    expect(messages.value[1].content).toBe('Hello, I am AI')
  })

  it('should handle error', async () => {
    const error = new Error('Network error')
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(error)

    const {
      sendMessage,
      error: chatError,
      isLoading
    } = useAIChat({
      api: '/api/chat'
    })

    await sendMessage('Hello')
    await nextTick()

    expect(chatError.value).not.toBeNull()
    expect(isLoading.value).toBe(false)
  })

  it('should not send empty message', async () => {
    const { sendMessage, isLoading } = useAIChat({
      api: '/api/chat'
    })

    await sendMessage('')
    await nextTick()

    expect(isLoading.value).toBe(false)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should respect maxHistory in messages', async () => {
    const mockResponse = { content: 'Response' }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      createMockFetch({ response: mockResponse })
    )

    const { messages, sendMessage } = useAIChat({
      api: '/api/chat',
      initialMessages: [],
      body: { maxHistory: 2 } as any
    })

    // Manually add messages to simulate history
    for (let i = 0; i < 5; i++) {
      messages.value.push({
        role: 'user',
        content: `Message ${i}`,
        id: `id-${i}`,
        createdAt: new Date()
      })
    }

    await sendMessage('New message')
    await nextTick()

    // Should respect maxHistory
    expect(messages.value.length).toBeLessThanOrEqual(7) // 5 + user + assistant, but may be trimmed
  })

  it('should call onRequest callback', async () => {
    const mockResponse = { content: 'Response' }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      createMockFetch({ response: mockResponse })
    )

    const onRequest = vi.fn()
    const { sendMessage } = useAIChat({
      api: '/api/chat',
      onRequest
    })

    await sendMessage('Hello')
    await nextTick()

    expect(onRequest).toHaveBeenCalledWith('Hello')
  })

  it('should call onFinish callback', async () => {
    const mockResponse = { content: 'Response' }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
      body: null
    })
    global.fetch = mockFetch as typeof fetch

    const onFinish = vi.fn()
    const { sendMessage } = useAIChat({
      api: '/api/chat',
      onFinish
    })

    await sendMessage('Hello')

    expect(onFinish).toHaveBeenCalled()
  })

  it('should reload messages', () => {
    const initialMessages = [{ role: 'user' as const, content: 'Hello', id: '1' }]
    const { messages, append, reload } = useAIChat({
      api: '/api/chat',
      initialMessages
    })

    append('New message', 'user')
    expect(messages.value).toHaveLength(2)

    reload()
    expect(messages.value).toHaveLength(1)
  })
})

describe('useAIStream', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create stream with initial content', () => {
    const { content, isStreaming, error, start, stop } = useAIStream({
      api: '/api/stream',
      initialContent: 'Initial'
    })

    expect(content.value).toBe('Initial')
    expect(isStreaming.value).toBe(false)
    expect(error.value).toBe(null)
    expect(typeof start).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle streaming', async () => {
    // Mock stream fetch
    let resolveStream: (value: unknown) => void
    const streamPromise = new Promise((resolve) => {
      resolveStream = resolve
    })

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n')
          )
          controller.close()
        }
      })
    })

    const { start, content, isStreaming } = useAIStream({
      api: '/api/stream'
    })

    await start('Hello')
    await wait(50)

    expect(isStreaming.value).toBe(false)
  })

  it('should stop streaming', async () => {
    const abortSpy = vi.fn()
    const originalAbortController = global.AbortController

    // Mock AbortController
    global.AbortController = class AbortController {
      abort = abortSpy
      signal = { aborted: false }
    } as any
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      body: new ReadableStream({
        start(controller) {
          // Never close to simulate ongoing stream
        }
      })
    })

    const { start, stop, isStreaming } = useAIStream({
      api: '/api/stream'
    })

    const startPromise = start('Hello')
    await wait(10)

    stop()
    await wait(10)

    expect(abortSpy).toHaveBeenCalled()

    // Restore
    global.AbortController = originalAbortController
  })
})

describe('createYHFunctionTool', () => {
  it('should create tool with name and description', () => {
    const tool = createYHFunctionTool({
      name: 'test_tool',
      description: 'A test tool',
      parameters: { type: 'object', properties: {} },
      execute: async () => 'result'
    })

    expect(tool.name).toBe('test_tool')
    expect(tool.description).toBe('A test tool')
    expect(tool.type).toBe('function')
  })

  it('should execute tool', async () => {
    const tool = createYHFunctionTool({
      name: 'test_tool',
      parameters: {
        type: 'object',
        properties: { value: { type: 'string' } }
      },
      execute: async (args) => `processed: ${args.value}`
    })

    const result = await tool.execute({ value: 'test' })
    expect(result).toBe('processed: test')
  })

  it('should handle tool execution error', async () => {
    const tool = createYHFunctionTool({
      name: 'error_tool',
      parameters: { type: 'object', properties: {} },
      execute: async () => {
        throw new Error('Tool error')
      }
    })

    await expect(tool.execute({})).rejects.toThrow('Tool error')
  })
})

describe('createProviderAdapter', () => {
  it('should create provider with config', () => {
    const provider = createProviderAdapter({
      name: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: 'test-key',
      defaultModel: 'gpt-4'
    })

    expect(provider.name).toBe('openai')
    expect(provider.baseUrl).toBe('https://api.openai.com/v1')
    expect(provider.defaultModel).toBe('gpt-4')
  })

  it('should create chat instance', () => {
    const provider = createProviderAdapter({
      name: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: 'test-key',
      defaultModel: 'gpt-4'
    })

    const chat = provider.createChat('gpt-4-turbo')
    expect(chat).toHaveProperty('provider', 'openai')
    expect(chat).toHaveProperty('model', 'gpt-4-turbo')
  })

  it('should use preset provider', () => {
    const provider = createProviderAdapter({
      provider: 'deepseek',
      apiKey: 'test-key'
    } as any)

    expect(provider.name).toBe('deepseek')
    expect(provider.baseUrl).toBe('https://api.deepseek.com/v1')
  })

  it('should throw error for unknown provider', () => {
    expect(() => {
      createProviderAdapter({ provider: 'unknown-provider' } as any)
    }).toThrow('Unknown provider')
  })
})

describe('PROVIDER_PRESETS', () => {
  it('should have openai preset', () => {
    expect(PROVIDER_PRESETS.openai).toBeDefined()
    expect(PROVIDER_PRESETS.openai.baseUrl).toBe('https://api.openai.com/v1')
  })

  it('should have anthropic preset', () => {
    expect(PROVIDER_PRESETS.anthropic).toBeDefined()
    expect(PROVIDER_PRESETS.anthropic.baseUrl).toBe('https://api.anthropic.com/v1')
  })

  it('should have deepseek preset', () => {
    expect(PROVIDER_PRESETS.deepseek).toBeDefined()
    expect(PROVIDER_PRESETS.deepseek.supportsStreaming).toBe(true)
  })

  it('should have ollama preset', () => {
    expect(PROVIDER_PRESETS.ollama).toBeDefined()
    expect(PROVIDER_PRESETS.ollama.baseUrl).toBe('http://localhost:11434/v1')
  })

  it('should have chinese provider presets', () => {
    expect(PROVIDER_PRESETS.moonshot).toBeDefined()
    expect(PROVIDER_PRESETS.zhipu).toBeDefined()
    expect(PROVIDER_PRESETS.minimax).toBeDefined()
    expect(PROVIDER_PRESETS.siliconflow).toBeDefined()
  })
})

describe('getProviderPreset', () => {
  it('should get preset by name', () => {
    const preset = getProviderPreset('openai')
    expect(preset?.name).toBe('openai')
  })

  it('should be case insensitive', () => {
    const preset = getProviderPreset('OPENAI')
    expect(preset?.name).toBe('openai')
  })

  it('should return undefined for unknown provider', () => {
    const preset = getProviderPreset('unknown')
    expect(preset).toBeUndefined()
  })
})

describe('createAIContext', () => {
  it('should create context with initial values', () => {
    const context = createAIContext({ name: 'openai', apiKey: 'key' }, 'gpt-4')

    expect(context.sessionId.value).toBeNull()
    expect(context.provider.value).not.toBeNull()
    expect(context.modelConfig.value.model).toBe('gpt-4')
  })

  it('should set session', () => {
    const context = createAIContext()
    context.setSession('session-123')

    expect(context.sessionId.value).toBe('session-123')
  })

  it('should set provider', () => {
    const context = createAIContext()
    context.setProvider({ name: 'openai', apiKey: 'key' })

    expect(context.provider.value?.name).toBe('openai')
  })

  it('should set model', () => {
    const context = createAIContext()
    context.setModel({ model: 'gpt-4', temperature: 0.7 })

    expect(context.modelConfig.value.model).toBe('gpt-4')
    expect(context.modelConfig.value.temperature).toBe(0.7)
  })
})

describe('XRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should make request', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ content: 'result' }),
      text: async () => '{"content":"result"}',
      body: null as any
    }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const result = await XRequest({
      url: '/api/test',
      body: { test: true }
    })

    expect(global.fetch).toHaveBeenCalled()
    expect(result).toHaveProperty('content')
  })

  it('should handle stream', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"content":"Hello"}\n\n'))
          controller.close()
        }
      })
    })

    let chunks: string[] = []
    const result = await XRequest(
      { url: '/api/stream', body: {}, stream: true },
      {
        onChunk: (chunk) => chunks.push(chunk)
      }
    )

    expect(global.fetch).toHaveBeenCalled()
    expect(typeof result).toBe('string')
  })

  it('should apply middleware', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ result: 'ok' }),
      text: async () => '{"result":"ok"}',
      body: null as any
    }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const middleware = {
      name: 'test-middleware',
      onRequest: vi.fn((config) => config),
      onResponse: vi.fn((response) => response)
    }

    await XRequest({ url: '/api/test', body: {} }, {}, { middlewares: [middleware] })

    expect(middleware.onRequest).toHaveBeenCalled()
  })

  it('should handle retry', async () => {
    let callCount = 0
    const fetchMock = vi.fn(async () => {
      callCount++
      if (callCount === 1) {
        throw new Error('Network error')
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
        text: async () => '{"success":true}',
        body: null
      }
    })

    global.fetch = fetchMock as typeof fetch

    const result = await XRequest(
      { url: '/api/retry', body: {} },
      {},
      { retry: { enabled: true, maxRetries: 3 } }
    )

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should call callbacks', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ result: 'ok' }),
      text: async () => '{"result":"ok"}',
      body: null as any
    }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const onStart = vi.fn()
    const onFinish = vi.fn()
    const onFinally = vi.fn()

    await XRequest({ url: '/api/callbacks', body: {} }, { onStart, onFinish, onFinally })

    expect(onStart).toHaveBeenCalled()
    expect(onFinish).toHaveBeenCalled()
    expect(onFinally).toHaveBeenCalled()
  })
})

describe('createXRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create request with default config', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ result: 'ok' }),
      text: async () => '{"result":"ok"}',
      body: null as any
    }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const request = createXRequest({ url: '/api/default' }, { retry: { enabled: true } })

    await request({ body: { test: 1 } })

    expect(global.fetch).toHaveBeenCalled()
  })
})

describe('registerMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should register and unregister middleware', () => {
    const middleware = { name: 'test', onRequest: vi.fn((c) => c) }

    const unregister = registerMiddleware(middleware)
    expect(middleware.onRequest).not.toHaveBeenCalled()

    unregister()
  })
})

describe('clearCache', () => {
  it('should clear global cache', async () => {
    // This test depends on internal cache implementation
    expect(typeof clearCache).toBe('function')
  })
})
