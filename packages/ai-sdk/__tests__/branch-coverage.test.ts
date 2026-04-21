/**
 * 补充分支覆盖：将 ai-sdk 在 scoped coverage 下的四门指标推过 80%（尤其 branches）。
 */

import { describe, it, expect, vi } from 'vitest'
import {
  useReActAgent,
  createPlanExecuteAgent,
  createRAGSystem,
  createContextCompressor,
  createCostTracker,
  createTracer,
  createSafetyFilter,
  createImageUrlContent,
  createVideoContent,
  fromZodSchema,
  createJSONSchema,
  parseStructuredOutput
} from '../src/index'
import { loadMarkdown, chunkText } from '../src/loaders'
import { createProductionRAG } from '../src/rag-production'
import { createInMemoryVectorStore } from '../src/vector-store'
import type { IVectorStore, VectorSearchResult } from '../src/vector-store'
import { MCPServer, useMCPServer } from '../src/mcp-server'
import { createLocalStorageCache, createSessionStorageCache } from '../src/cache-adapter'

describe('branch coverage — ReAct / Plan / RAG', () => {
  it('useReActAgent: stopConditions contains + custom, concurrent run, LLM throw', async () => {
    const noop = {
      name: 'noop',
      description: 'n',
      parameters: {},
      execute: async () => 'ok'
    }

    const { run } = useReActAgent({
      type: 'react',
      maxIterations: 5,
      tools: [noop],
      stopConditions: [{ type: 'contains', value: 'HALT' }]
    })

    const mockLLM = async () =>
      'Thought: before HALT marker\nAction: noop\nAction Input: {}'
    const r1 = await run('t', mockLLM)
    expect(r1.finished).toBe(false)

    const { run: run2 } = useReActAgent({
      type: 'react',
      maxIterations: 3,
      tools: [noop],
      stopConditions: [{ type: 'custom', value: (out: string) => out.includes('DONE') }]
    })
    const mockLLM2 = async () =>
      'Thought: has DONE marker here\nAction: noop\nAction Input: {}'
    const r2 = await run2('t2', mockLLM2)
    expect(r2.output).toContain('DONE')

    const { run: run3 } = useReActAgent({ type: 'react', maxIterations: 2, tools: [] })
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const slowRun = run3('overlap', async () => {
      await gate
      return 'Thought: ok\nFinal Answer: done'
    })
    await Promise.resolve()
    await expect(run3('second', async () => 'Thought: x\nFinal Answer: y')).rejects.toThrow(
      'already running'
    )
    release()
    await slowRun

    const { run: run4 } = useReActAgent({ type: 'react', maxIterations: 2, tools: [] })
    const r4 = await run4('z', async () => {
      throw new Error('llm boom')
    })
    expect(r4.error?.message).toBe('llm boom')
  })

  it('createPlanExecuteAgent: invalid plan JSON + exec without tool', async () => {
    const agent = createPlanExecuteAgent({
      tools: [
        {
          name: 'noop',
          description: 'noop',
          parameters: {},
          execute: async () => 'ok'
        }
      ]
    })

    const llm = async (prompt: string) => {
      if (prompt.includes('分解')) return 'not valid json {'
      if (prompt.includes('根据当前步骤')) return '{}'
      return 'summary'
    }

    const out = await agent.execute('task', llm)
    expect(out.plan.length).toBeGreaterThan(0)
    expect(out.result).toBe('summary')
  })

  it('createRAGSystem: with kb, query, includeSources false, clear', async () => {
    const rag = createRAGSystem({
      knowledgeBaseId: 'kb1',
      topK: 2,
      similarityThreshold: 0,
      includeSources: false
    })

    await rag.addDocuments([{ content: 'alpha beta', metadata: { src: 'a' } }])
    const q = await rag.query('alpha', async () => 'ans')
    expect(q.answer).toBe('ans')
    expect(q.sources).toEqual([])

    rag.clear()
    const empty = await rag.retrieve('alpha')
    expect(empty.length).toBe(0)
  })

  it('createRAGSystem: no knowledgeBaseId keeps retrieve empty', async () => {
    const rag = createRAGSystem({ topK: 3 })
    await rag.addDocuments([{ content: 'orphan' }])
    expect((await rag.retrieve('x')).length).toBe(0)
  })
})

describe('branch coverage — compressor / cost / tracer / safety', () => {
  it('createContextCompressor: array input + summary with llm', async () => {
    const c = createContextCompressor({ strategy: 'summary', targetTokens: 5 })
    const long = 'word '.repeat(200)
    const r1 = await c.compress([{ role: 'user', content: long }, { role: 'assistant', content: 'ok' }])
    expect(r1.compressionRatio).toBeLessThan(1)

    const r2 = await c.compress(long, async () => 'short')
    expect(r2.compressedContent).toBe('short')
  })

  it('createCostTracker: unknown model pricing, budget gate on request, reset', () => {
    const t = createCostTracker({ monthlyBudget: 0.00001, maxTokensPerRequest: 1e9 })
    const exotic = t.calculateCost({ prompt: 1e6, completion: 0, total: 1e6 }, 'unknown-model-xyz')
    const gpt4 = t.calculateCost({ prompt: 1e6, completion: 0, total: 1e6 }, 'gpt-4')
    expect(exotic).toBe(gpt4)

    t.track({ prompt: 1e12, completion: 0, total: 1e12 })
    const gate = t.checkRequestLimit(1000)
    expect(gate.allowed).toBe(false)
    expect(gate.reason).toContain('预算')

    t.reset()
    expect(t.getStatus().usage.total).toBe(0)
  })

  it('createTracer: endSpan with unknown id is a no-op', () => {
    const tr = createTracer()
    tr.endSpan('missing-span-id')
    expect(tr.getSpans()).toHaveLength(0)
  })

  it('createSafetyFilter: warn action + removeRule no-op', async () => {
    const f = createSafetyFilter({
      rules: [{ id: 'w1', name: 'w', pattern: 'warnme', action: 'warn' }]
    })
    const r = await f.check('has warnme inside')
    expect(r.passed).toBe(true)
    expect(r.violations[0].action).toBe('warned')

    f.removeRule('does-not-exist')
    expect(f.rules.some((x) => x.id === 'w1')).toBe(true)
  })

  it('structured helpers', () => {
    expect(createImageUrlContent('https://x', 'high').mimeType).toBe('high')
    expect(createVideoContent('b64').mimeType).toBe('video/mp4')
    const z = fromZodSchema({ _type: 'zod' })
    expect(z.toJSONSchema()).toEqual({ _type: 'zod' })
    expect(createJSONSchema({ type: 'object' }).type).toBe('object')
    expect(parseStructuredOutput('no json here', { type: 'object' })).toBeNull()
    expect(parseStructuredOutput('prefix {broken', { type: 'object' })).toBeNull()
  })
})

describe('branch coverage — loaders / rag-production / vector-store', () => {
  it('loadMarkdown: heading split when buffer already large', () => {
    const filler = 'x'.repeat(120)
    const md = `${filler}\n# H\n${filler}`
    const parts = loadMarkdown(md, { split: true, chunkSize: 80, chunkOverlap: 10 })
    expect(parts.length).toBeGreaterThan(1)
  })

  it('chunkText: prefers break at space when in second half', () => {
    const text = `${'a'.repeat(100)} ${'b'.repeat(100)}`
    const chunks = chunkText(text, { chunkSize: 120, chunkOverlap: 20 })
    expect(chunks.length).toBeGreaterThanOrEqual(1)
  })

  it('createProductionRAG: includeSources false + short doc sources branch', async () => {
    const store = {
      async add() {},
      async search(): Promise<VectorSearchResult[]> {
        return [
          {
            id: '1',
            content: 'short',
            metadata: {},
            score: undefined as unknown as number
          }
        ]
      },
      async delete() {},
      async clear() {}
    } satisfies IVectorStore

    const rag = createProductionRAG({
      vectorStore: store,
      embed: async () => [1, 0, 0],
      includeSources: false
    })
    const res = await rag.query('q', async () => 'ok')
    expect(res.sources).toEqual([])
    expect(res.answer).toBe('ok')
  })

  it('createInMemoryVectorStore: zero-vector cosine + upsert same id', async () => {
    const s = createInMemoryVectorStore()
    await s.add([{ id: 'z', content: 'z', embedding: [0, 0, 0] }])
    const zeroScore = await s.search([1, 0, 0], { topK: 5, threshold: 0 })
    expect(zeroScore.some((x) => x.id === 'z')).toBe(true)

    await s.add([{ id: 'z', content: 'z2', embedding: [1, 0, 0] }])
    const updated = await s.search([1, 0, 0], { topK: 1 })
    expect(updated[0].content).toBe('z2')

    await s.clear()
    await s.add([{ id: 'a', content: 'a', embedding: [1, 0] }])
    const dimMismatch = await s.search([1, 0, 0], { topK: 5, threshold: 0 })
    expect(dimMismatch[0].score).toBe(0)
  })
})

describe('branch coverage — cache + MCP server', () => {
  it('localStorage cache: corrupt json + expiry path', () => {
    localStorage.setItem('yh-ai-cache-bad', 'not-json{')
    const c = createLocalStorageCache()
    expect(c.get('bad')).toBeNull()

    vi.useFakeTimers()
    const now = Date.now()
    vi.setSystemTime(now)
    const c2 = createLocalStorageCache('ttl-')
    c2.set('e', 'v', 1000)
    vi.setSystemTime(now + 5000)
    expect(c2.get('e')).toBeNull()
    vi.useRealTimers()
  })

  it('sessionStorage cache: expired entry', () => {
    vi.useFakeTimers()
    const c = createSessionStorageCache('sttl-')
    c.set('e', 'v', 1)
    vi.advanceTimersByTime(5)
    expect(c.get('e')).toBeNull()
    vi.useRealTimers()
  })

  it('MCPServer: tools/call missing name, tool throws, default initialize', async () => {
    const server = new MCPServer({
      config: { name: 't', version: '1' },
      tools: [
        {
          name: 'boom',
          description: '',
          inputSchema: {},
          execute: async () => {
            throw new Error('tool err')
          }
        }
      ]
    })

    const missingName = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { arguments: {} }
    })
    expect(missingName.error?.message).toContain('Missing tool name')

    const toolErr = await server.handleRequest({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: { name: 'boom', arguments: {} }
    })
    expect((toolErr.result as { isError?: boolean }).isError).toBe(true)

    const init = await server.handleRequest({
      jsonrpc: '2.0',
      id: 3,
      method: 'initialize'
    })
    expect((init.result as { protocolVersion: string }).protocolVersion).toBe('2024-11-05')
  })

  it('useMCPServer calls onToolsChange when adding/removing tools', () => {
    const onToolsChange = vi.fn()
    const { addTool, removeTool } = useMCPServer({
      name: 't',
      version: '1',
      onToolsChange
    })

    addTool({
      name: 'one',
      description: '',
      inputSchema: {},
      execute: async () => []
    })
    expect(onToolsChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ name: 'one' })])
    )

    removeTool('one')
    expect(onToolsChange).toHaveBeenCalled()
  })
})
