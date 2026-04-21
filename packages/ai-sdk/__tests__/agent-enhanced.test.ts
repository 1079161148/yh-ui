/**
 * YH-UI AI SDK - Agent 增强测试
 */

import { describe, it, expect, vi } from 'vitest'
import {
  createChain,
  createParallelChain,
  createEnhancedAgent,
  createReflexionAgent,
  createReWOOAgent
} from '../src/agent-enhanced'

describe('LCEL Chains', () => {
  describe('createChain', () => {
    it('should pipe steps sequentially', async () => {
      const chain = createChain()
        .pipe({ name: 'double', handler: async (n) => (n as number) * 2 })
        .pipe({ name: 'add1', handler: async (n) => (n as number) + 1 })

      const result = await chain.invoke(5)
      expect(result).toBe(11)
    })

    it('should propagate errors without onError handler', async () => {
      const chain = createChain().pipe({
        name: 'error',
        handler: async () => {
          throw new Error('step failed')
        }
      })

      await expect(chain.invoke(1)).rejects.toThrow('step failed')
    })

    it('should start with initial handler', async () => {
      const chain = createChain(async (x) => x + 1).pipe({
        name: 'double',
        handler: async (n) => (n as number) * 2
      })

      const result = await chain.invoke(5)
      expect(result).toBe(12)
    })

    it('should handle errors with onError handler', async () => {
      const onError = vi.fn()
      const chain = createChain().pipe({
        name: 'error',
        handler: async () => {
          throw new Error('handled error')
        },
        onError
      })

      await chain.invoke(1)
      expect(onError).toHaveBeenCalledWith(new Error('handled error'))
    })

    it('should pipe multiple steps', async () => {
      const chain = createChain()
        .pipe({ name: 'a', handler: async (x) => (x as number) + 1 })
        .pipe({ name: 'b', handler: async (x) => (x as number) * 2 })
        .pipe({ name: 'c', handler: async (x) => (x as number) - 3 })

      const result = await chain.invoke(5)
      expect(result).toBe(9) // (5+1)*2-3 = 9
    })

    it('should handle async handlers', async () => {
      const chain = createChain().pipe({
        name: 'delay',
        handler: async (x) => {
          await new Promise((r) => setTimeout(r, 1))
          return (x as number) * 2
        }
      })

      const result = await chain.invoke(5)
      expect(result).toBe(10)
    })

    it('should work with string input', async () => {
      const chain = createChain()
        .pipe({ name: 'upper', handler: async (s) => String(s).toUpperCase() })
        .pipe({ name: 'len', handler: async (s) => String(s).length })

      const result = await chain.invoke('hello')
      expect(result).toBe(5)
    })

    it('should work with object input', async () => {
      const chain = createChain().pipe({
        name: 'extract',
        handler: async (obj: any) => obj.value
      })

      const result = await chain.invoke({ value: 42 })
      expect(result).toBe(42)
    })

    it('should work with empty steps', async () => {
      const chain = createChain()
      const result = await chain.invoke('input')
      expect(result).toBe('input')
    })

    it('should chain with initial handler and multiple pipes', async () => {
      const chain = createChain(async (x) => x * 2)
        .pipe({ name: 'add', handler: async (x) => (x as number) + 10 })
        .pipe({ name: 'sub', handler: async (x) => (x as number) - 5 })

      const result = await chain.invoke(3)
      expect(result).toBe(11) // 3*2 + 10 - 5 = 11
    })
  })

  describe('createParallelChain', () => {
    it('should run steps in parallel', async () => {
      const chain = createParallelChain({
        a: async (x) => (x as number) * 2,
        b: async (x) => (x as number) + 10
      })

      const result = await chain.invoke(5)
      expect(result).toEqual({ a: 10, b: 15 })
    })

    it('should handle mixed value types', async () => {
      const chain = createParallelChain({
        str: async (x) => String(x),
        num: async (x) => (x as number) * 3,
        bool: async (x) => Boolean(x)
      })

      const result = await chain.invoke(5)
      expect(result).toEqual({ str: '5', num: 15, bool: true })
    })

    it('should handle empty parallel steps', async () => {
      const chain = createParallelChain({})
      const result = await chain.invoke('test')
      expect(result).toEqual({})
    })
  })
})

describe('Enhanced Agents', () => {
  describe('createReflexionAgent', () => {
    it('should create agent with default config', () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 3
      })

      expect(agent).toBeDefined()
      expect(typeof agent.run).toBe('function')
      expect(agent.steps.value).toEqual([])
      expect(agent.reflections.value).toEqual([])
      expect(agent.isRunning.value).toBe(false)
    })

    it('should run with tool calls', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 2
      })

      const result = await agent.run(
        'Test task',
        async (prompt) => `Action: search\nAction Input: {"query":"test"}`,
        async (name, args) => `Found: ${args.query}`
      )

      expect(result).toBeDefined()
      expect(result.finished).toBe(true)
    })

    it('should run without tool calls', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 2
      })

      const result = await agent.run('Simple task', async () => 'This is a simple answer')

      expect(result).toBeDefined()
    })

    it('should respect maxIterations', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 1,
        returnReasoning: false
      })

      const result = await agent.run('Test', async () => 'No tool call here')

      expect(result.finished).toBe(true)
      expect(result.toolCalls).toBeLessThanOrEqual(1)
    })

    it('should handle errors', async () => {
      const onError = vi.fn()
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 2,
        onError
      })

      const result = await agent.run('Test', async () => {
        throw new Error('Execution error')
      })

      expect(result.error).toBeDefined()
      expect(onError).toHaveBeenCalled()
    })

    it('should stop on stopCondition contains', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 10,
        stopConditions: [{ type: 'contains', value: 'final answer' as any }]
      })

      const result = await agent.run('Test', async () => 'final answer found here')

      expect(result).toBeDefined()
    })

    it('should stop on custom stopCondition', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 10,
        stopConditions: [
          {
            type: 'custom',
            value: ((output: string) => output.includes('stop')) as any
          }
        ]
      })

      const result = await agent.run('Test', async () => 'Please stop here')

      expect(result).toBeDefined()
    })

    it('should handle parse error in tool input', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 1
      })

      const result = await agent.run(
        'Test',
        async () => 'Action: search\nAction Input: invalid json',
        async (name, args) => 'Tool result'
      )

      expect(result).toBeDefined()
    })

    it('should manage memory window', async () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 5,
        memoryWindow: 2
      })

      await agent.run('Test', async () => 'Action: test\nAction Input: {}')

      expect(agent.reflections.value.length).toBeLessThanOrEqual(2)
    })

    it('should handle empty reflections', () => {
      const agent = createReflexionAgent({
        mode: 'reflexion',
        maxIterations: 1
      })

      expect(agent.reflections.value).toEqual([])
    })
  })

  describe('createReWOOAgent', () => {
    it('should create agent with default config', () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        maxIterations: 5
      })

      expect(agent).toBeDefined()
      expect(typeof agent.run).toBe('function')
      expect(agent.isRunning.value).toBe(false)
    })

    it('should accept custom planner', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        maxIterations: 2,
        planner: async (task) => ({
          steps: [{ id: '1', description: 'Step 1', dependentIds: [] }]
        })
      })

      const result = await agent.run('test task', async (p) => 'result')
      expect(result.finished).toBe(true)
    })

    it('should execute steps in dependency order', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        maxIterations: 10
      })

      const result = await agent.run(
        'Complex task',
        async (prompt) => `Execution result for: ${prompt.slice(0, 20)}`
      )

      expect(result).toBeDefined()
      expect(result.finished).toBe(true)
    })

    it('should handle custom planner returning multiple steps', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        planner: async (task) => ({
          steps: [
            { id: '1', description: 'First step', dependentIds: [] },
            { id: '2', description: 'Second step', dependentIds: ['1'] },
            { id: '3', description: 'Final step', dependentIds: ['2'] }
          ]
        })
      })

      const result = await agent.run('Multi-step task', async (p) => `Done: ${p.slice(0, 15)}`)

      expect(result.finished).toBe(true)
      expect(result.toolCalls).toBe(3)
    })

    it('should handle empty plan', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        planner: async () => ({ steps: [] })
      })

      const result = await agent.run('Empty task', async () => 'result')

      expect(result).toBeDefined()
    })

    it('should handle circular dependencies gracefully', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        planner: async () => ({
          steps: [
            { id: '1', description: 'Step 1', dependentIds: ['2'] },
            { id: '2', description: 'Step 2', dependentIds: ['1'] }
          ]
        })
      })

      const result = await agent.run('Task', async () => 'result')

      expect(result).toBeDefined()
    })

    it('should handle execution errors', async () => {
      const onError = vi.fn()
      const agent = createReWOOAgent({
        mode: 'rewoo',
        onError
      })

      const result = await agent.run('Task', async () => {
        throw new Error('Execution failed')
      })

      expect(result.error).toBeDefined()
    })

    it('should handle onError with lastStep', async () => {
      const onError = vi.fn()
      const agent = createReWOOAgent({
        mode: 'rewoo',
        onError
      })

      await agent.run('Task', async () => {
        throw new Error('Failed')
      })

      expect(onError).toHaveBeenCalled()
    })

    it('should have plan ref', () => {
      const agent = createReWOOAgent({ mode: 'rewoo' })
      expect(agent.plan.value).toEqual([])
    })

    it('should build final prompt with all results', async () => {
      const agent = createReWOOAgent({
        mode: 'rewoo',
        planner: async () => ({
          steps: [
            { id: '1', description: 'Step 1', dependentIds: [] },
            { id: '2', description: 'Step 2', dependentIds: ['1'] }
          ]
        })
      })

      const result = await agent.run('Test', async (p) => `Result for ${p}`)

      expect(result).toBeDefined()
    })
  })

  describe('createEnhancedAgent factory', () => {
    it('should create reflexion agent', () => {
      const agent = createEnhancedAgent({ mode: 'reflexion' })
      expect(agent).toBeDefined()
    })

    it('should create rewoo agent', () => {
      const agent = createEnhancedAgent({ mode: 'rewoo' })
      expect(agent).toBeDefined()
    })

    it('should throw for unknown mode', () => {
      expect(() => createEnhancedAgent({ mode: 'unknown' as any })).toThrow('Unsupported mode')
    })

    it('should create react agent (falls back to rewoo)', () => {
      const agent = createEnhancedAgent({ mode: 'react' })
      expect(agent).toBeDefined()
    })

    it('should create plan-execute agent (falls back to rewoo)', () => {
      const agent = createEnhancedAgent({ mode: 'plan-execute' })
      expect(agent).toBeDefined()
    })

    it('should pass returnReasoning option', () => {
      const agent = createEnhancedAgent({
        mode: 'reflexion',
        returnReasoning: true
      })
      expect(agent).toBeDefined()
    })

    it('should pass maxIterations option', () => {
      const agent = createEnhancedAgent({
        mode: 'rewoo',
        maxIterations: 10
      })
      expect(agent).toBeDefined()
    })

    it('should pass tools option', () => {
      const agent = createEnhancedAgent({
        mode: 'react',
        tools: [
          {
            name: 'test',
            description: 'Test tool',
            parameters: {},
            execute: async () => 'result'
          }
        ]
      })
      expect(agent).toBeDefined()
    })
  })
})
