/**
 * YH-UI AI SDK - 生产 RAG 测试
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createInMemoryVectorStore } from '../src/vector-store'
import { createProductionRAG } from '../src/rag-production'

describe('ProductionRAG', () => {
  let store: ReturnType<typeof createInMemoryVectorStore>
  let rag: ReturnType<typeof createProductionRAG>

  beforeEach(() => {
    store = createInMemoryVectorStore()
    rag = createProductionRAG({
      vectorStore: store,
      embed: async (text: string) => {
        // 简化 embedding：基于字符生成伪向量
        const vec = new Array(3).fill(0)
        for (let i = 0; i < text.length; i++) {
          vec[i % 3] += text.charCodeAt(i)
        }
        return vec.map((v) => v / text.length)
      }
    })
  })

  it('should add documents and retrieve by similarity', async () => {
    await rag.addDocuments([
      { content: 'TypeScript is a typed superset of JavaScript', metadata: { source: 'doc1' } },
      { content: 'Python is a high-level programming language', metadata: { source: 'doc2' } }
    ])

    const results = await rag.retrieve('TypeScript')

    expect(results.length).toBeGreaterThan(0)
  })

  it('should query with LLM and return answer with sources', async () => {
    await rag.addDocuments([
      { content: 'The capital of France is Paris', metadata: { source: 'geo' } }
    ])

    const mockLlm = async (prompt: string) => {
      if (prompt.includes('Paris')) return 'Paris is the capital of France.'
      return "I don't know."
    }

    const result = await rag.query('What is the capital of France?', mockLlm)

    expect(result.answer).toContain('Paris')
    expect(result.sources.length).toBeGreaterThan(0)
  })

  it('should return empty answer when no relevant docs', async () => {
    const mockLlm = async () => 'Answer'
    const result = await rag.query('xyz unRelated query', mockLlm)

    expect(result.answer).toContain('抱歉')
    expect(result.sources.length).toBe(0)
  })

  it('should clear knowledge base', async () => {
    await rag.addDocuments([{ content: 'Test doc' }])
    await rag.clear()

    const results = await rag.retrieve('Test')
    expect(results.length).toBe(0)
  })
})
