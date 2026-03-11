/**
 * YH-UI AI SDK - Agent 增强测试
 */

import { describe, it, expect } from 'vitest'
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
  })
})
