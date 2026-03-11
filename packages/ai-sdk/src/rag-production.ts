/**
 * YH-UI AI SDK - 生产级 RAG
 *
 * 依赖向量存储抽象与可选嵌入函数，可与文档加载器配合使用。
 */

import type { IVectorStore, VectorDocument, VectorSearchResult } from './vector-store'
import type { RAGResult, DocumentChunk } from './future'

export interface ProductionRAGConfig {
  /** 知识库/命名空间 */
  namespace?: string
  /** 检索数量 */
  topK?: number
  /** 相似度阈值 */
  similarityThreshold?: number
  /** 是否返回源信息 */
  includeSources?: boolean
  /** 向量存储（必填） */
  vectorStore: IVectorStore
  /** 嵌入函数（必填，用于 query 与 addDocuments） */
  embed: (text: string) => Promise<number[]>
}

/**
 * 生产级 RAG：使用真实向量存储与嵌入
 */
export function createProductionRAG(config: ProductionRAGConfig) {
  const {
    namespace = 'default',
    topK = 5,
    similarityThreshold = 0.5,
    includeSources = true,
    vectorStore,
    embed
  } = config

  async function addDocuments(
    documents: Array<{ content: string; metadata?: Record<string, unknown> }>
  ) {
    const vectors: VectorDocument[] = []
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      const embedding = await embed(doc.content)
      vectors.push({
        id: `chunk-${Date.now()}-${i}`,
        content: doc.content,
        embedding,
        metadata: doc.metadata || {}
      })
    }
    await vectorStore.add(vectors, namespace)
    return vectors.map((v) => ({
      id: v.id,
      content: v.content,
      metadata: v.metadata,
      embedding: v.embedding
    }))
  }

  async function retrieve(query: string, k: number = topK): Promise<DocumentChunk[]> {
    const queryEmbedding = await embed(query)
    const results = await vectorStore.search(queryEmbedding, {
      topK: k,
      threshold: similarityThreshold,
      namespace
    })
    return results.map((r: VectorSearchResult) => ({
      id: r.id,
      content: r.content,
      metadata: r.metadata || {},
      score: r.score,
      embedding: r.embedding
    }))
  }

  async function query(
    question: string,
    llm: (prompt: string) => Promise<string>
  ): Promise<RAGResult> {
    const relevantDocs = await retrieve(question)
    if (relevantDocs.length === 0) {
      return {
        answer: '抱歉，知识库中没有找到相关信息。',
        sources: [],
        contextUsed: ''
      }
    }

    const context = relevantDocs.map((doc, i) => `[文档 ${i + 1}]\n${doc.content}`).join('\n\n')

    const prompt = `基于以下知识库内容，用中文回答用户的问题。如果知识库中的信息不能回答问题，请说明。

知识库内容:
${context}

用户问题: ${question}

请给出回答：`

    const answer = await llm(prompt)

    return {
      answer,
      sources: includeSources
        ? relevantDocs.map((doc) => ({
            content: doc.content.slice(0, 200) + (doc.content.length > 200 ? '...' : ''),
            metadata: doc.metadata,
            score: doc.score ?? 0
          }))
        : [],
      contextUsed: context.slice(0, 500)
    }
  }

  async function clear() {
    await vectorStore.clear(namespace)
  }

  return {
    addDocuments,
    retrieve,
    query,
    clear,
    config: { topK, similarityThreshold, namespace }
  }
}
