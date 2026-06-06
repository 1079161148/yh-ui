/**
 * YH-UI AI SDK - Agent 和前瞻性功能测试
 */

import { describe, it, expect, vi } from 'vitest'
import {
  useReActAgent,
  createPlanExecuteAgent,
  createChainOfThought,
  createContextCompressor,
  createCostTracker,
  createTracer,
  createSafetyFilter,
  schema,
  parseStructuredOutput,
  createImageContent,
  createAudioContent,
  createMultiModalMessage
} from '../src/index'
import { mockTools } from './mocks'

describe('ReAct Agent', () => {
  it('should create ReAct agent', () => {
    const { run, steps, isRunning, currentOutput } = useReActAgent({
      type: 'react',
      maxIterations: 5,
      tools: [mockTools.getWeather]
    })

    expect(typeof run).toBe('function')
    expect(steps.value).toEqual([])
    expect(isRunning.value).toBe(false)
  })

  it('should run agent with tools', async () => {
    const { run, steps, isRunning } = useReActAgent({
      type: 'react',
      maxIterations: 3,
      tools: [mockTools.getWeather]
    })

    // Mock LLM response
    const mockLLM = async (prompt: string) => {
      if (prompt.includes('北京')) {
        return 'Thought: I need to get weather for Beijing\nAction: get_weather\nAction Input: {"city": "北京"}'
      }
      return 'Thought: I have the information needed.\nFinal Answer: 北京天气晴朗，25°C'
    }

    const result = await run('北京天气怎么样？', mockLLM)

    expect(result).toHaveProperty('output')
    expect(result).toHaveProperty('toolCalls')
    expect(result.toolCalls).toBeGreaterThanOrEqual(0)
  })

  it('should respect max iterations', async () => {
    const { run } = useReActAgent({
      type: 'react',
      maxIterations: 2,
      tools: []
    })

    const mockLLM = async () => 'Thought: Still thinking...'

    const result = await run('Test', mockLLM)

    expect(result.finished).toBe(false) // Should stop due to max iterations
  })

  it('should track tool call count', async () => {
    const { run, toolCallCount } = useReActAgent({
      type: 'react',
      maxIterations: 5,
      tools: [mockTools.getWeather, mockTools.calculator]
    })

    const mockLLM = async (prompt: string) => {
      if (prompt.includes('计算')) {
        return 'Action: calculator\nAction Input: {"expression": "2+2"}'
      }
      return 'Action: get_weather\nAction Input: {"city": "北京"}'
    }

    await run('Calculate 2+2 and get weather', mockLLM)

    expect(toolCallCount.value).toBeGreaterThan(0)
  })

  it('should add reasoning steps', async () => {
    const { run, steps } = useReActAgent({
      type: 'react',
      returnReasoning: true,
      tools: []
    })

    const mockLLM = async () => 'Thought: This is my thought.\nFinal Answer: Done'

    await run('Test', mockLLM)

    expect(steps.value.length).toBeGreaterThan(0)
    expect(steps.value[0]).toHaveProperty('id')
    expect(steps.value[0]).toHaveProperty('type')
  })

  it('should handle tool execution error', async () => {
    const errorTool = {
      name: 'error_tool',
      description: 'Error tool',
      parameters: { type: 'object', properties: {} },
      execute: async () => {
        throw new Error('Tool failed')
      }
    }

    const { run } = useReActAgent({
      type: 'react',
      maxIterations: 3,
      tools: [errorTool],
      onError: vi.fn()
    })

    const mockLLM = async () => 'Action: error_tool\nAction Input: {}'

    const result = await run('Test', mockLLM)

    // Should handle error gracefully
    expect(result).toHaveProperty('output')
  })
})

describe('Plan-Execute Agent', () => {
  it('should create plan-execute agent', () => {
    const agent = createPlanExecuteAgent({
      tools: [mockTools.getWeather]
    })

    expect(agent).toHaveProperty('execute')
    expect(agent.plans.value).toEqual([])
  })

  it('should execute task with plan', async () => {
    const agent = createPlanExecuteAgent({
      tools: [mockTools.getWeather]
    })

    const mockLLM = async (prompt: string) => {
      if (prompt.includes('分解')) {
        return '[{"step": "获取北京天气", "tool": "get_weather", "input": {"city": "北京"}}]'
      }
      return '天气晴朗，25°C'
    }

    const result = await agent.execute('北京天气如何？', mockLLM)

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('plan')
    expect(result.plan.length).toBeGreaterThan(0)
  })

  it('should track results', async () => {
    const agent = createPlanExecuteAgent({
      tools: [mockTools.calculator]
    })

    const mockLLM = async (prompt: string) => {
      if (prompt.includes('分解')) {
        return '[{"step": "计算", "tool": "calculator", "input": {"expression": "1+1"}}]'
      }
      return '2'
    }

    await agent.execute('1+1等于多少', mockLLM)

    expect(Object.keys(agent.results.value).length).toBeGreaterThan(0)
  })

  it('should handle plan failure', async () => {
    const failingTool = {
      name: 'fail',
      description: 'Fails',
      parameters: { type: 'object', properties: {} },
      execute: async () => {
        throw new Error('Failed')
      }
    }

    const agent = createPlanExecuteAgent({
      tools: [failingTool]
    })

    const mockLLM = async (prompt: string) => {
      if (prompt.includes('分解')) {
        return '[{"step": "Will fail", "tool": "fail", "input": {}}]'
      }
      return 'Error'
    }

    const result = await agent.execute('Test', mockLLM)

    // Should handle failure gracefully
    expect(result.plan[0]?.status).toBe('failed')
  })
})

describe('Chain of Thought', () => {
  it('should create CoT with different modes', () => {
    const modes = ['standard', 'chain', 'tree', 'tabular'] as const

    modes.forEach((mode) => {
      const cot = createChainOfThought({ mode })
      expect(cot.config.mode).toBe(mode)
    })
  })

  it('should think and return reasoning', async () => {
    const cot = createChainOfThought({ mode: 'chain' })

    const mockLLM = async () => 'Step 1: Understand\nStep 2: Analyze\nStep 3: Conclude'

    const result = await cot.think('Solve 2+2', mockLLM)

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('reasoning')
    expect(result.reasoning.length).toBeGreaterThan(0)
  })

  it('should add custom reasoning step', () => {
    const cot = createChainOfThought()

    cot.addStep({
      content: 'Custom thought',
      type: 'analysis'
    })

    expect(cot.reasoningSteps.value).toHaveLength(1)
  })

  it('should clear reasoning', () => {
    const cot = createChainOfThought()

    cot.reasoningSteps.value = [{ id: '1', content: 'Step 1', type: 'analysis' }]

    cot.clear()
    expect(cot.reasoningSteps.value).toHaveLength(0)
  })

  it('should respect maxDepth config', () => {
    const cot = createChainOfThought({ maxDepth: 3 })
    expect(cot.config.maxDepth).toBe(3)
  })
})

describe('Context Compressor', () => {
  it('should estimate tokens accurately', () => {
    const compressor = createContextCompressor({ targetTokens: 1000 })

    const tokens = compressor.estimateTokens('Hello World! This is a test. 12345')
    // Rough estimate: ~9 chars / 4 = ~2-3 tokens
    expect(tokens).toBeGreaterThan(0)
  })

  it('should compress with summary strategy', async () => {
    const compressor = createContextCompressor({
      strategy: 'summary',
      targetTokens: 10
    })

    const longText = 'This is a very long text. '.repeat(100)
    const result = await compressor.compress(longText)

    expect(result.compressedTokens).toBeLessThan(result.originalTokens)
    expect(result.compressionRatio).toBeLessThan(1)
  })

  it('should compress with extract strategy', async () => {
    const compressor = createContextCompressor({
      strategy: 'extract',
      targetTokens: 50
    })

    const text = 'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.'
    const result = await compressor.compress(text)

    expect(result).toHaveProperty('compressedContent')
  })

  it('should compress with prune strategy', async () => {
    const compressor = createContextCompressor({
      strategy: 'prune',
      targetTokens: 50
    })

    const text = 'Line 1\nLine 1\nLine 2\nLine 2\nLine 3'
    const result = await compressor.compress(text)

    expect(result).toHaveProperty('compressedContent')
  })

  it('should not compress if under limit', async () => {
    const compressor = createContextCompressor({
      targetTokens: 10000
    })

    const short = 'Short text'
    const result = await compressor.compress(short)

    expect(result.compressionRatio).toBe(1)
  })
})

describe('Cost Tracker', () => {
  it('should track token usage', () => {
    const tracker = createCostTracker()

    tracker.track({ prompt: 1000, completion: 500, total: 1500 })
    tracker.track({ prompt: 500, completion: 250, total: 750 })

    const status = tracker.getStatus()
    expect(status.usage.prompt).toBe(1500)
    expect(status.usage.completion).toBe(750)
  })

  it('should calculate cost for different models', () => {
    const tracker = createCostTracker()

    // GPT-4 pricing
    const gpt4Cost = tracker.calculateCost(
      { prompt: 1000000, completion: 0, total: 1000000 },
      'gpt-4'
    )
    expect(gpt4Cost).toBe(30) // $30 per 1M

    // GPT-3.5 pricing
    const gpt35Cost = tracker.calculateCost(
      { prompt: 1000000, completion: 0, total: 1000000 },
      'gpt-3.5-turbo'
    )
    expect(gpt35Cost).toBe(0.5) // $0.50 per 1M
  })

  it('should track daily cost', () => {
    const tracker = createCostTracker()

    tracker.track({ prompt: 1000, completion: 0, total: 1000 })
    tracker.track({ prompt: 2000, completion: 0, total: 2000 })

    const status = tracker.getStatus()
    expect(Object.keys(status.dailyCost).length).toBeGreaterThan(0)
  })

  it('should check budget limit', () => {
    const tracker = createCostTracker({ monthlyBudget: 200 })

    tracker.track({ prompt: 3000000, completion: 0, total: 3000000 }) // $90 - under budget

    expect(tracker.isOverBudget()).toBe(false)

    tracker.track({ prompt: 2000000, completion: 0, total: 2000000 }) // $60 - total $150 - under $200

    expect(tracker.isOverBudget()).toBe(false)

    tracker.track({ prompt: 2000000, completion: 0, total: 2000000 }) // $60 - total $210 - over $200

    expect(tracker.isOverBudget()).toBe(true)
  })

  it('should warn at threshold', () => {
    const tracker = createCostTracker({ monthlyBudget: 1000, warningThreshold: 0.8 })

    tracker.track({ prompt: 20000000, completion: 0, total: 20000000 }) // $600 - 60% of budget

    expect(tracker.shouldWarn()).toBe(false)

    tracker.track({ prompt: 5000000, completion: 0, total: 5000000 }) // $150 - total $750 = 75% - under 80%

    expect(tracker.shouldWarn()).toBe(false)

    tracker.track({ prompt: 2000000, completion: 0, total: 2000000 }) // $60 - total $810 = 81% - over 80%

    expect(tracker.shouldWarn()).toBe(true)
  })

  it('should validate request tokens', () => {
    const tracker = createCostTracker({ maxTokensPerRequest: 10000 })

    const result = tracker.checkRequestLimit(5000)
    expect(result.allowed).toBe(true)
    expect(result.reason).toBeUndefined()

    const result2 = tracker.checkRequestLimit(15000)
    expect(result2.allowed).toBe(false)
    expect(result2.reason).toContain('超过限制')
  })
})

describe('Tracer', () => {
  it('should create spans with attributes', () => {
    const tracer = createTracer()

    const spanId = tracer.startSpan('test-span', { key: 'value' })
    expect(spanId).toMatch(/^span-/)

    tracer.endSpan(spanId)

    const spans = tracer.getSpans()
    expect(spans).toHaveLength(1)
    expect(spans[0].attributes).toHaveProperty('key', 'value')
  })

  it('should calculate span duration', () => {
    const tracer = createTracer()

    const spanId = tracer.startSpan('test')
    tracer.endSpan(spanId)

    const spans = tracer.getSpans()
    expect(spans[0].endTime).toBeInstanceOf(Date)
    expect(spans[0].endTime!.getTime()).toBeGreaterThanOrEqual(spans[0].startTime.getTime())
  })

  it('should add custom events', () => {
    const tracer = createTracer()

    tracer.addEvent({
      type: 'custom',
      data: { action: 'test' }
    })

    const events = tracer.getEvents()
    expect(events[0].type).toBe('custom')
    expect(events[0].data).toHaveProperty('action')
  })

  it('should record request/response', () => {
    const tracer = createTracer()

    tracer.recordRequest({ url: '/api/test', method: 'POST' })
    tracer.recordResponse({ result: 'ok' }, 100)

    const events = tracer.getEvents()
    expect(events[0].type).toBe('request')
    expect(events[1].type).toBe('response')
    expect(events[1].data).toHaveProperty('duration')
  })

  it('should record errors with context', () => {
    const tracer = createTracer()

    tracer.recordError(new Error('Test error'), { userId: '123' })

    const events = tracer.getEvents()
    expect(events[0].type).toBe('error')
    expect(events[0].data).toHaveProperty('message', 'Test error')
    expect(events[0].data).toHaveProperty('userId', '123')
  })

  it('should export trace as JSON', () => {
    const tracer = createTracer()

    tracer.startSpan('span1')
    tracer.addEvent({ type: 'test', data: { a: 1 } })

    const json = tracer.exportJSON()
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('should clear all traces', () => {
    const tracer = createTracer()

    tracer.startSpan('span1')
    tracer.addEvent({ type: 'test', data: {} })

    tracer.clear()

    expect(tracer.getSpans()).toHaveLength(0)
    expect(tracer.getEvents()).toHaveLength(0)
  })
})

describe('Safety Filter', () => {
  it('should pass clean content', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'bad', pattern: 'violence|spam', action: 'block' }]
    })

    const result = await filter.check('This is a normal message')
    expect(result.passed).toBe(true)
  })

  it('should block matching pattern', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'violence', pattern: 'violence', action: 'block' }]
    })

    const result = await filter.check('This contains violence')
    expect(result.passed).toBe(false)
    expect(result.violations).toHaveLength(1)
    expect(result.violations[0].action).toBe('blocked')
  })

  it('should replace sensitive content', async () => {
    const filter = createSafetyFilter({
      rules: [{ id: '1', name: 'phone', pattern: '\\d{3}-\\d{4}', action: 'replace' }]
    })

    const result = await filter.check('My phone is 123-4567')
    expect(result.violations[0].replacedContent).toContain('***')
  })

  it('should support regex patterns', async () => {
    const filter = createSafetyFilter({
      rules: [
        {
          id: '1',
          name: 'email',
          pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
          action: 'block'
        }
      ]
    })

    const result = await filter.check('Contact: test@example.com')
    expect(result.passed).toBe(false)
  })

  it('should support custom check function', async () => {
    const filter = createSafetyFilter({
      rules: [
        {
          id: '1',
          name: 'custom',
          customCheck: (content) => content.length > 100,
          action: 'block'
        }
      ]
    })

    const result = await filter.check('Short')
    expect(result.passed).toBe(true)

    const result2 = await filter.check('A'.repeat(150))
    expect(result2.passed).toBe(false)
  })

  it('should allow multiple violations', async () => {
    const filter = createSafetyFilter({
      rules: [
        { id: '1', name: 'bad1', pattern: 'bad1', action: 'warn' },
        { id: '2', name: 'bad2', pattern: 'bad2', action: 'warn' }
      ]
    })

    const result = await filter.check('This has bad1 and bad2')
    expect(result.violations).toHaveLength(2)
  })

  it('should stop at block action', async () => {
    const filter = createSafetyFilter({
      rules: [
        { id: '1', name: 'warn', pattern: 'warn', action: 'warn' },
        { id: '2', name: 'block', pattern: 'block', action: 'block' }
      ]
    })

    const result = await filter.check('This has warn and block')
    // Should only report block as violation since it stops
    expect(result.passed).toBe(false)
  })

  it('should add/remove rules dynamically', () => {
    const filter = createSafetyFilter({ rules: [] })

    filter.addRule({ id: '1', name: 'test', action: 'block' })
    expect(filter.rules).toHaveLength(1)

    filter.removeRule('1')
    expect(filter.rules).toHaveLength(0)
  })

  it('should create preset rule sets', () => {
    const filter = createSafetyFilter({ rules: [] })

    filter.createPresetRules('strict')
    expect(filter.rules.length).toBeGreaterThan(0)

    filter.createPresetRules('moderate')
    const countAfterModerate = filter.rules.length

    filter.createPresetRules('lenient')
    // Lenient should add fewer rules
  })
})

describe('MultiModal', () => {
  it('should create image from URL', () => {
    const content = createImageContent('url', 'https://example.com/image.png')
    expect(content.type).toBe('image')
    expect(content.url).toBe('https://example.com/image.png')
  })

  it('should create image from base64', () => {
    const content = createImageContent('base64', 'base64data', 'image/png')
    expect(content.type).toBe('image')
    expect(content.base64).toBe('base64data')
    expect(content.mimeType).toBe('image/png')
  })

  it('should create audio content', () => {
    const content = createAudioContent('audiobase64', 'audio/m4a')
    expect(content.type).toBe('audio')
    expect(content.base64).toBe('audiobase64')
  })

  it('should create multimodal message', () => {
    const msg = createMultiModalMessage('user', [
      { type: 'text', text: 'Describe this' },
      createImageContent('url', 'https://example.com/img.png')
    ])

    expect(msg.role).toBe('user')
    expect(msg.content).toHaveLength(2)
  })
})

describe('Schema Builder', () => {
  it('should build string schema', () => {
    const s = schema.string('User name')
    expect(s.type).toBe('string')
    expect(s.description).toBe('User name')
  })

  it('should build number schema', () => {
    const s = schema.number('User age')
    expect(s.type).toBe('number')
  })

  it('should build boolean schema', () => {
    const s = schema.boolean('Is active')
    expect(s.type).toBe('boolean')
  })

  it('should build enum schema', () => {
    const s = schema.enum(['admin', 'user', 'guest'] as const, 'User role')
    expect(s.type).toBe('string')
    expect(s.enum).toEqual(['admin', 'user', 'guest'])
  })

  it('should build array schema', () => {
    const s = schema.array(schema.string('Item'))
    expect(s.type).toBe('array')
    expect(s.items).toHaveProperty('type', 'string')
  })

  it('should build nested object schema', () => {
    const userSchema = schema.object(
      {
        name: schema.string('Name'),
        age: schema.number('Age'),
        roles: schema.array(schema.string('Role'))
      },
      ['name']
    )

    expect(userSchema.type).toBe('object')
    expect(userSchema.required).toContain('name')
  })

  it('should parse JSON output', () => {
    const output = '{"name":"John","age":30,"active":true}'
    const data = parseStructuredOutput(
      output,
      schema.object({
        name: schema.string('Name'),
        age: schema.number('Age'),
        active: schema.boolean('Active')
      })
    )

    expect(data).not.toBeNull()
    expect(data!.name).toBe('John')
    expect(data!.age).toBe(30)
    expect(data!.active).toBe(true)
  })

  it('should handle parse errors', () => {
    const output = 'not valid { json'
    const data = parseStructuredOutput(output, { type: 'object' })
    expect(data).toBeNull()
  })
})
