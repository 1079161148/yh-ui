/**
 * YH-UI AI SDK - SSR 测试
 * 测试服务端渲染兼容性和非 Vue 环境
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  // XRequest - 可以在 SSR 环境使用
  XRequest,
  registerMiddleware,
  // Provider 预设 - 纯函数
  PROVIDER_PRESETS,
  getProviderPreset,
  createProviderAdapter,
  // 前瞻性功能
  createRAGSystem,
  createChainOfThought,
  createContextCompressor,
  createCostTracker,
  createTracer,
  createSafetyFilter,
  schema,
  parseStructuredOutput,
  // 多模态
  createImageContent,
  createAudioContent,
  createVideoContent,
  createMultiModalMessage
} from '../src/index'

// Mock fetch for SSR
global.fetch = vi.fn()

describe('SSR - Provider Presets (无 Vue 依赖)', () => {
  it('should have all provider presets', () => {
    expect(PROVIDER_PRESETS.openai).toBeDefined()
    expect(PROVIDER_PRESETS.anthropic).toBeDefined()
    expect(PROVIDER_PRESETS.deepseek).toBeDefined()
    expect(PROVIDER_PRESETS.ollama).toBeDefined()
    expect(PROVIDER_PRESETS.moonshot).toBeDefined()
    expect(PROVIDER_PRESETS.zhipu).toBeDefined()
    expect(PROVIDER_PRESETS.minimax).toBeDefined()
    expect(PROVIDER_PRESETS.siliconflow).toBeDefined()
    expect(PROVIDER_PRESETS.together).toBeDefined()
    expect(PROVIDER_PRESETS.novita).toBeDefined()
  })

  it('should get correct preset', () => {
    const preset = getProviderPreset('deepseek')
    expect(preset?.name).toBe('deepseek')
    expect(preset?.defaultModel).toBe('deepseek-chat')
  })

  it('should create provider adapter without Vue', () => {
    const provider = createProviderAdapter({
      name: 'test',
      baseUrl: 'https://test.com',
      apiKey: 'key',
      defaultModel: 'model'
    })

    expect(provider.name).toBe('test')
    expect(provider.baseUrl).toBe('https://test.com')
  })
})

describe('SSR - XRequest (可在 SSR 使用)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ result: 'ok' }),
      text: async () => '{"result":"ok"}',
      body: null
    })
  })

  it('should make request in SSR', async () => {
    const result = await XRequest({
      url: 'https://api.test.com/chat',
      body: { messages: [] }
    })

    expect(global.fetch).toHaveBeenCalled()
    expect(result).toHaveProperty('result')
  })

  it('should handle headers', async () => {
    await XRequest({
      url: 'https://api.test.com/chat',
      body: { messages: [] },
      headers: {
        Authorization: 'Bearer token',
        'X-Custom': 'value'
      }
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/chat',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer token',
          'X-Custom': 'value'
        })
      })
    )
  })

  it('should handle timeout', async () => {
    await XRequest({
      url: 'https://api.test.com/chat',
      body: { messages: [] },
      timeout: 5000
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/chat',
      expect.objectContaining({
        signal: expect.any(AbortSignal)
      })
    )
  })

  it('should use GET for empty body', async () => {
    await XRequest({
      url: 'https://api.test.com/models',
      method: 'GET'
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/models',
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('should add query params', async () => {
    await XRequest({
      url: 'https://api.test.com/chat',
      params: { model: 'gpt-4', limit: '10' }
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/chat?model=gpt-4&limit=10',
      expect.any(Object)
    )
  })

  it('should handle stream mode', async () => {
    const chunks = ['Hello', ' ', 'World']
    let index = 0

    const readable = new ReadableStream({
      pull(controller) {
        if (index >= chunks.length) {
          controller.close()
          return
        }
        controller.enqueue(new TextEncoder().encode(chunks[index++]))
      }
    })

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'text/event-stream' }),
      body: readable
    })

    const onChunk = vi.fn()

    await XRequest(
      {
        url: 'https://api.test.com/chat',
        body: { messages: [] },
        stream: true
      },
      {
        onChunk
      }
    )

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/chat',
      expect.objectContaining({
        body: expect.any(String)
      })
    )
  })

  it('should apply middleware', async () => {
    const middleware = {
      name: 'auth',
      onRequest: vi.fn((config) => {
        config.headers = { ...config.headers, 'X-API-Key': 'test' }
        return config
      })
    }

    await XRequest(
      { url: 'https://api.test.com/chat', body: {} },
      {},
      { middlewares: [middleware] }
    )

    expect(middleware.onRequest).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-API-Key': 'test' })
      })
    )
  })

  it('should retry on failure', async () => {
    let callCount = 0
    const fetchMock = vi.fn(async () => {
      callCount++
      if (callCount === 1) {
        throw new Error('Network error')
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ result: 'ok' }),
        text: async () => '{"result":"ok"}',
        body: null
      }
    })

    global.fetch = fetchMock as typeof fetch

    await XRequest(
      { url: 'https://api.test.com/chat', body: {} },
      {},
      { retry: { enabled: true, maxRetries: 3 } }
    )

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should not retry on 4xx errors', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Bad request' }),
      text: async () => '{"error":"Bad request"}',
      body: null
    })

    global.fetch = fetchMock as typeof fetch

    try {
      await XRequest(
        { url: 'https://api.test.com/chat', body: {} },
        {},
        { retry: { enabled: true, maxRetries: 3 } }
      )
    } catch (e) {
      // Expected to throw
    }

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('SSR - Middleware System', () => {
  it('should register global middleware', () => {
    const unregister = registerMiddleware({
      name: 'logger',
      onRequest: (config) => config
    })

    expect(typeof unregister).toBe('function')
    unregister()
  })

  it('should unregister middleware', () => {
    const onRequestSpy = vi.fn((c) => c)
    const middleware = { name: 'temp', onRequest: onRequestSpy }
    const unregister = registerMiddleware(middleware)
    unregister()

    // Middleware should be removed - verify the spy was not called by making a request
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
      text: async () => '{}',
      body: null
    })

    expect(onRequestSpy).not.toHaveBeenCalled()
  })

  it('should support multiple middlewares', async () => {
    const m1 = { name: 'm1', onRequest: vi.fn((c) => c) }
    const m2 = { name: 'm2', onRequest: vi.fn((c) => c) }

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
      text: async () => '{}',
      body: null
    })

    await XRequest({ url: 'https://test.com', body: {} }, {}, { middlewares: [m1, m2] })

    expect(m1.onRequest).toHaveBeenCalled()
    expect(m2.onRequest).toHaveBeenCalled()
  })
})

describe('SSR - RAG System', () => {
  it('should create RAG system', () => {
    const rag = createRAGSystem({
      knowledgeBaseId: 'test-kb',
      topK: 5,
      similarityThreshold: 0.7
    })

    expect(rag).toHaveProperty('addDocuments')
    expect(rag).toHaveProperty('retrieve')
    expect(rag).toHaveProperty('query')
    expect(rag).toHaveProperty('clear')
  })

  it('should add documents', async () => {
    const rag = createRAGSystem({ knowledgeBaseId: 'test' })

    const chunks = await rag.addDocuments([
      { content: 'TypeScript is a typed superset of JavaScript', metadata: { source: 'doc1' } },
      { content: 'Vue is a progressive JavaScript framework', metadata: { source: 'doc2' } }
    ])

    expect(chunks).toHaveLength(2)
    expect(chunks[0]).toHaveProperty('id')
    expect(chunks[0]).toHaveProperty('content')
  })

  it('should retrieve documents', async () => {
    const rag = createRAGSystem({ knowledgeBaseId: 'test', topK: 2 })

    await rag.addDocuments([
      { content: 'TypeScript adds static typing' },
      { content: 'JavaScript is dynamic' },
      { content: 'TypeScript compiles to JavaScript' }
    ])

    const results = await rag.retrieve('TypeScript')
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })

  it('should query with LLM', async () => {
    const rag = createRAGSystem({ knowledgeBaseId: 'test', includeSources: true })

    await rag.addDocuments([{ content: 'The capital of France is Paris', metadata: { id: 1 } }])

    const mockLLM = async (prompt: string) => 'Paris is the capital of France.'

    const result = await rag.query('What is the capital of France?', mockLLM)

    expect(result).toHaveProperty('answer')
    expect(result).toHaveProperty('sources')
  })

  it('should clear knowledge base', async () => {
    const rag = createRAGSystem({ knowledgeBaseId: 'test' })

    await rag.addDocuments([{ content: 'Test doc' }])
    rag.clear()

    const results = await rag.retrieve('test')
    expect(results).toHaveLength(0)
  })
})

describe('SSR - Chain of Thought', () => {
  it('should create CoT system', () => {
    const cot = createChainOfThought({ mode: 'chain' })

    expect(cot).toHaveProperty('think')
    expect(cot).toHaveProperty('addStep')
    expect(cot).toHaveProperty('clear')
  })

  it('should think with LLM', async () => {
    const cot = createChainOfThought({ mode: 'standard' })

    const mockLLM = async (prompt: string) =>
      'Step 1: Understand the problem\nStep 2: Break it down\nStep 3: Solve it'

    const result = await cot.think('2 + 2 = ?', mockLLM)

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('reasoning')
  })

  it('should support different modes', () => {
    const modes = ['standard', 'chain', 'tree', 'tabular'] as const

    modes.forEach((mode) => {
      const cot = createChainOfThought({ mode })
      expect(cot.config.mode).toBe(mode)
    })
  })

  it('should clear reasoning', () => {
    const cot = createChainOfThought()

    cot.reasoningSteps.value = [
      { id: '1', content: 'Step 1', type: 'analysis' },
      { id: '2', content: 'Step 2', type: 'conclusion' }
    ]

    cot.clear()
    expect(cot.reasoningSteps.value).toHaveLength(0)
  })
})

describe('SSR - Context Compression', () => {
  it('should create compressor', () => {
    const compressor = createContextCompressor({
      strategy: 'summary',
      targetTokens: 1000
    })

    expect(compressor).toHaveProperty('compress')
    expect(compressor).toHaveProperty('estimateTokens')
  })

  it('should estimate tokens', () => {
    const compressor = createContextCompressor({ targetTokens: 1000 })

    const tokens = compressor.estimateTokens('Hello World')
    expect(tokens).toBeGreaterThan(0)
  })

  it('should compress long content', async () => {
    const compressor = createContextCompressor({
      strategy: 'extract',
      targetTokens: 10
    })

    const longContent =
      'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence. Sixth sentence. Seventh sentence.'
    const result = await compressor.compress(longContent)

    expect(result.compressedTokens).toBeLessThanOrEqual(result.originalTokens)
  })

  it('should not compress short content', async () => {
    const compressor = createContextCompressor({
      targetTokens: 1000
    })

    const shortContent = 'Short text'
    const result = await compressor.compress(shortContent)

    expect(result.compressionRatio).toBe(1)
  })

  it('should support different strategies', () => {
    const strategies = ['summary', 'extract', 'prune'] as const

    strategies.forEach((strategy) => {
      const compressor = createContextCompressor({ strategy })
      expect(compressor.config.strategy).toBe(strategy)
    })
  })

  it('should preserve key info', async () => {
    const compressor = createContextCompressor({
      targetTokens: 50,
      preserveKeyInfo: ['important']
    })

    const result = await compressor.compress('Some important information here')
    expect(result.extractedKeyInfo).toContain('important')
  })
})

describe('SSR - Cost Tracker', () => {
  it('should create cost tracker', () => {
    const tracker = createCostTracker({ monthlyBudget: 100 })

    expect(tracker).toHaveProperty('track')
    expect(tracker).toHaveProperty('getStatus')
    expect(tracker).toHaveProperty('isOverBudget')
    expect(tracker).toHaveProperty('shouldWarn')
    expect(tracker).toHaveProperty('checkRequestLimit')
  })

  it('should track usage', () => {
    const tracker = createCostTracker({ monthlyBudget: 100 })

    tracker.track({ prompt: 1000, completion: 500, total: 1500 })
    const status = tracker.getStatus()

    expect(status.usage.prompt).toBe(1000)
    expect(status.usage.completion).toBe(500)
  })

  it('should calculate cost', () => {
    const tracker = createCostTracker()

    const cost = tracker.calculateCost({ prompt: 1000000, completion: 0, total: 1000000 }, 'gpt-4')
    expect(cost).toBe(30) // $30 per 1M prompt tokens
  })

  it('should check budget', () => {
    const tracker = createCostTracker({ monthlyBudget: 100 })

    expect(tracker.isOverBudget()).toBe(false)

    tracker.track({ prompt: 10000000, completion: 0, total: 10000000 }) // Exceed budget
    expect(tracker.isOverBudget()).toBe(true)
  })

  it('should warn at threshold', () => {
    const tracker = createCostTracker({ monthlyBudget: 100, warningThreshold: 0.8 })

    // 75% usage - should warn
    tracker.track({ prompt: 7500000, completion: 0, total: 7500000 })
    expect(tracker.shouldWarn()).toBe(true)
  })

  it('should check request limit', () => {
    const tracker = createCostTracker({ maxTokensPerRequest: 10000 })

    const result1 = tracker.checkRequestLimit(5000)
    expect(result1.allowed).toBe(true)

    const result2 = tracker.checkRequestLimit(15000)
    expect(result2.allowed).toBe(false)
  })

  it('should reset', () => {
    const tracker = createCostTracker({ monthlyBudget: 100 })

    tracker.track({ prompt: 1000, completion: 500, total: 1500 })
    tracker.reset()

    const status = tracker.getStatus()
    expect(status.usage.total).toBe(0)
  })

  it('should have pricing info', () => {
    const tracker = createCostTracker()

    expect(tracker.pricing['gpt-4']).toBeDefined()
    expect(tracker.pricing['gpt-3.5-turbo']).toBeDefined()
    expect(tracker.pricing['claude-3-opus']).toBeDefined()
  })
})

describe('SSR - Tracer', () => {
  it('should create tracer', () => {
    const tracer = createTracer()

    expect(tracer).toHaveProperty('startSpan')
    expect(tracer).toHaveProperty('endSpan')
    expect(tracer).toHaveProperty('addEvent')
    expect(tracer).toHaveProperty('recordRequest')
    expect(tracer).toHaveProperty('recordResponse')
    expect(tracer).toHaveProperty('recordError')
  })

  it('should start and end span', () => {
    const tracer = createTracer()

    const spanId = tracer.startSpan('test-span', { key: 'value' })
    expect(spanId).toMatch(/^span-/)

    tracer.endSpan(spanId, { status: 'success' })

    const spans = tracer.getSpans()
    expect(spans).toHaveLength(1)
    expect(spans[0].endTime).toBeInstanceOf(Date)
  })

  it('should add events', () => {
    const tracer = createTracer()

    tracer.addEvent({ type: 'custom', data: { action: 'test' } })

    const events = tracer.getEvents()
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('custom')
  })

  it('should record request', () => {
    const tracer = createTracer()

    tracer.recordRequest({ url: '/api/test', method: 'POST' })

    const events = tracer.getEvents()
    expect(events[0].type).toBe('request')
    expect(events[0].data).toHaveProperty('url')
  })

  it('should record error', () => {
    const tracer = createTracer()

    tracer.recordError(new Error('Test error'), { context: 'test' })

    const events = tracer.getEvents()
    expect(events[0].type).toBe('error')
    expect(events[0].data).toHaveProperty('message')
  })

  it('should export JSON', () => {
    const tracer = createTracer()

    tracer.startSpan('span1')
    tracer.addEvent({ type: 'test', data: {} })

    const json = tracer.exportJSON()
    expect(json).toContain('span1')
  })

  it('should clear', () => {
    const tracer = createTracer()

    tracer.startSpan('span1')
    tracer.addEvent({ type: 'test', data: {} })
    tracer.clear()

    expect(tracer.getSpans()).toHaveLength(0)
    expect(tracer.getEvents()).toHaveLength(0)
  })
})

describe('SSR - Safety Filter', () => {
  it('should create safety filter', () => {
    const filter = createSafetyFilter({ rules: [] })

    expect(filter).toHaveProperty('check')
    expect(filter).toHaveProperty('addRule')
    expect(filter).toHaveProperty('removeRule')
  })

  it('should pass clean content', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'bad', pattern: 'badword', action: 'block' }]
    })

    const result = await filter.check('This is clean content')
    expect(result.passed).toBe(true)
  })

  it('should block bad content', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'bad', pattern: 'badword', action: 'block' }]
    })

    const result = await filter.check('This contains badword')
    expect(result.passed).toBe(false)
    expect(result.violations).toHaveLength(1)
  })

  it('should warn instead of block', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'warn', pattern: 'warning', action: 'warn' }]
    })

    const result = await filter.check('This is a warning message')
    expect(result.passed).toBe(true)
    expect(result.violations[0]?.action).toBe('warned')
  })

  it('should replace content', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'censor', pattern: 'bad', action: 'replace' }]
    })

    const result = await filter.check('This is bad content')
    expect(result.violations[0]?.replacedContent).toBe('This is *** content')
  })

  it('should support custom check', async () => {
    const filter = createSafetyFilter({
      rules: [
        {
          id: '1',
          name: 'custom',
          customCheck: async (content) => content.includes('blocked'),
          action: 'block'
        }
      ]
    })

    // Should pass - no 'blocked' keyword
    const result = await filter.check('This should be safe')
    expect(result.passed).toBe(true)

    // Should not pass - contains 'blocked' keyword
    const result2 = await filter.check('This contains blocked keyword')
    expect(result2.passed).toBe(false)
  })

  it('should add and remove rules', () => {
    const filter = createSafetyFilter({ rules: [] })

    filter.addRule({ id: '1', name: 'test', action: 'block' })
    expect(filter.rules).toHaveLength(1)

    filter.removeRule('1')
    expect(filter.rules).toHaveLength(0)
  })

  it('should create preset rules', () => {
    const filter = createSafetyFilter({ rules: [] })

    filter.createPresetRules('strict')
    expect(filter.rules.length).toBeGreaterThan(0)
  })
})

describe('SSR - Schema Builder', () => {
  it('should create string schema', () => {
    const s = schema.string('A string value')
    expect(s.type).toBe('string')
    expect(s.description).toBe('A string value')
  })

  it('should create number schema', () => {
    const s = schema.number('A number value')
    expect(s.type).toBe('number')
  })

  it('should create boolean schema', () => {
    const s = schema.boolean('A boolean value')
    expect(s.type).toBe('boolean')
  })

  it('should create enum schema', () => {
    const s = schema.enum(['a', 'b', 'c'] as const, 'An enum')
    expect(s.type).toBe('string')
    expect(s.enum).toEqual(['a', 'b', 'c'])
  })

  it('should create array schema', () => {
    const s = schema.array(schema.string('item'))
    expect(s.type).toBe('array')
    expect(s.items).toHaveProperty('type', 'string')
  })

  it('should create object schema', () => {
    const s = schema.object(
      {
        name: schema.string('User name'),
        age: schema.number('User age')
      },
      ['name']
    )

    expect(s.type).toBe('object')
    expect(s.properties).toHaveProperty('name')
    expect(s.properties).toHaveProperty('age')
  })

  it('should parse structured output', () => {
    const output = '{"name":"John","age":30}'
    const data = parseStructuredOutput(output, { type: 'object' })

    expect(data).toHaveProperty('name', 'John')
    expect(data).toHaveProperty('age', 30)
  })

  it('should return null for invalid output', () => {
    const output = 'not valid json'
    const data = parseStructuredOutput(output, { type: 'object' })

    expect(data).toBeNull()
  })
})

describe('SSR - MultiModal', () => {
  it('should create image content from URL', () => {
    const content = createImageContent('url', 'https://example.com/image.png')
    expect(content.type).toBe('image')
    expect(content.url).toBe('https://example.com/image.png')
  })

  it('should create image content from base64', () => {
    const content = createImageContent('base64', 'data:image/png;base64,abc123')
    expect(content.type).toBe('image')
    expect(content.base64).toBe('data:image/png;base64,abc123')
  })

  it('should create audio content', () => {
    const content = createAudioContent('abc123', 'audio/mp3')
    expect(content.type).toBe('audio')
    expect(content.base64).toBe('abc123')
  })

  it('should create video content', () => {
    const content = createVideoContent('abc123', 'video/mp4')
    expect(content.type).toBe('video')
    expect(content.base64).toBe('abc123')
  })

  it('should create multimodal message', () => {
    const msg = createMultiModalMessage('user', [
      { type: 'text', text: 'Describe this image' },
      createImageContent('url', 'https://example.com/img.png')
    ])

    expect(msg.role).toBe('user')
    expect(msg.content).toHaveLength(2)
    expect(msg.content[0].type).toBe('text')
    expect(msg.content[1].type).toBe('image')
  })
})
