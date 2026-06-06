/**
 * YH-UI AI SDK - 向量存储抽象层
 *
 * 支持多种后端，便于对接 Pinecone / Weaviate / Qdrant 等生产级向量库。
 * 内置内存实现，可选接入外部向量服务。
 */

export interface VectorDocument {
  id: string
  content: string
  embedding: number[]
  metadata?: Record<string, unknown>
}

export interface VectorSearchResult {
  id: string
  content: string
  metadata?: Record<string, unknown>
  score: number
  embedding?: number[]
}

export interface VectorStoreConfig {
  /** 命名空间/索引名 */
  namespace?: string
  /** 向量维度 (部分后端需要) */
  dimension?: number
}

/**
 * 向量存储统一接口
 * 实现此接口即可接入 Pinecone / Weaviate / Qdrant 等
 */
export interface IVectorStore {
  /** 添加文档（含向量） */
  add(documents: VectorDocument[], namespace?: string): Promise<void>

  /** 相似度检索 */
  search(
    queryEmbedding: number[],
    options: {
      topK?: number
      threshold?: number
      namespace?: string
      filter?: Record<string, unknown>
    }
  ): Promise<VectorSearchResult[]>

  /** 按 ID 删除 */
  delete(ids: string[], namespace?: string): Promise<void>

  /** 清空命名空间 */
  clear(namespace?: string): Promise<void>
}

/**
 * 内存向量存储（内置实现，适用于开发与小规模）
 * 使用余弦相似度检索
 */
export function createInMemoryVectorStore(_config?: VectorStoreConfig): IVectorStore {
  const store = new Map<string, VectorDocument[]>()

  function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0
    let dot = 0
    let normA = 0
    let normB = 0
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB)
    return denom === 0 ? 0 : dot / denom
  }

  return {
    async add(documents: VectorDocument[], namespace = 'default') {
      const list = store.get(namespace) || []
      for (const doc of documents) {
        const idx = list.findIndex((d) => d.id === doc.id)
        if (idx >= 0) list[idx] = doc
        else list.push(doc)
      }
      store.set(namespace, list)
    },

    async search(
      queryEmbedding: number[],
      options: { topK?: number; threshold?: number; namespace?: string } = {}
    ): Promise<VectorSearchResult[]> {
      const topK = options.topK ?? 10
      const threshold = options.threshold ?? 0
      const namespaceOpt = options.namespace ?? 'default'
      const list = store.get(namespaceOpt) || []
      const scored = list
        .map((doc) => ({
          ...doc,
          score: cosineSimilarity(doc.embedding, queryEmbedding)
        }))
        .filter((d) => d.score >= threshold)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)

      return scored.map(({ id, content, metadata, score, embedding }) => ({
        id,
        content,
        metadata,
        score,
        embedding
      }))
    },

    async delete(ids: string[], namespace: string = 'default') {
      const list = store.get(namespace) || []
      const set = new Set(ids)
      store.set(
        namespace,
        list.filter((d) => !set.has(d.id))
      )
    },

    async clear(namespace: string = 'default') {
      store.set(namespace, [])
    }
  }
}

/**
 * Pinecone 适配器接口（由用户或可选包实现）
 * 安装 @pinecone-database/pinecone 后可实现
 */
export type PineconeVectorStoreConfig = VectorStoreConfig & {
  apiKey: string
  indexName: string
  environment?: string
}

/**
 * Weaviate 适配器接口
 */
export type WeaviateVectorStoreConfig = VectorStoreConfig & {
  url: string
  apiKey?: string
  className?: string
}

/**
 * Qdrant 适配器接口
 */
export type QdrantVectorStoreConfig = VectorStoreConfig & {
  url: string
  apiKey?: string
  collectionName?: string
}
