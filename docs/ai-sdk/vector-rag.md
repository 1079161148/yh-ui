# 向量存储与 RAG

YH-UI 提供完整的向量存储抽象层与生产级 RAG 支持。

## createInMemoryVectorStore - 内存向量存储

适用于开发与小规模场景，使用余弦相似度检索。

```typescript
import { createInMemoryVectorStore } from '@yh-ui/ai-sdk'

const vectorStore = createInMemoryVectorStore()

// 添加文档向量
await vectorStore.add([
  {
    id: 'doc-1',
    content: 'Vue 3 是一个渐进式 JavaScript 框架',
    embedding: [0.1, 0.2, 0.3 /* ... */],
    metadata: { source: 'vue-docs' }
  }
])

// 相似度检索
const results = await vectorStore.search([0.1, 0.2, 0.3], {
  topK: 5,
  threshold: 0.7
})

console.log(results[0].content)
```

### API

| 方法                              | 说明         |
| --------------------------------- | ------------ |
| `add(documents, namespace?)`      | 添加文档向量 |
| `search(queryEmbedding, options)` | 相似度检索   |
| `delete(ids, namespace?)`         | 按 ID 删除   |
| `clear(namespace?)`               | 清空命名空间 |

## 外部向量存储接口

YH-UI 为 Pinecone、Weaviate、Qdrant 提供配置类型，可自行实现适配器。

```typescript
import type {
  VectorStoreConfig,
  PineconeVectorStoreConfig,
  WeaviateVectorStoreConfig,
  QdrantVectorStoreConfig
} from '@yh-ui/ai-sdk'

// Pinecone 配置示例
const pineconeConfig: PineconeVectorStoreConfig = {
  apiKey: 'your-api-key',
  indexName: 'your-index',
  environment: 'us-east1-aws'
}
```

## createProductionRAG - 生产级 RAG

构建完整的 RAG 流程：文档加载、向量化、存储、检索、生成。

```typescript
import { createProductionRAG, createInMemoryVectorStore } from '@yh-ui/ai-sdk'

// 创建 RAG 系统
const rag = createProductionRAG({
  namespace: 'my-knowledge-base',
  topK: 5,
  similarityThreshold: 0.5,
  includeSources: true,
  vectorStore: createInMemoryVectorStore(),
  embed: async (text) => {
    // 调用嵌入 API 获取向量
    const response = await fetch('/api/embed', {
      method: 'POST',
      body: JSON.stringify({ text })
    })
    return response.json()
  }
})

// 添加文档（自动向量化）
await rag.addDocuments([
  { content: 'Vue 3 的核心特性包括响应式系统', metadata: { source: 'vue' } },
  { content: 'Composition API 是 Vue 3 的新特性', metadata: { source: 'vue' } }
])

// 查询
const result = await rag.query('Vue 3 有什么新特性？', async (prompt) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  return response.json()
})

console.log(result.answer) // LLM 生成的回答
console.log(result.sources) // 引用来源
```

### API

| 方法                      | 说明                 |
| ------------------------- | -------------------- |
| `addDocuments(documents)` | 添加文档，自动向量化 |
| `retrieve(query, k?)`     | 仅检索文档           |
| `query(question, llm)`    | 检索 + 生成答案      |
| `clear()`                 | 清空知识库           |

### 返回值

```typescript
interface RAGResult {
  answer: string // LLM 生成的回答
  sources: Array<{
    // 引用来源
    content: string
    metadata: Record<string, unknown>
    score: number
  }>
  contextUsed: string // 使用的上下文（用于调试）
}
```

::: tip
配合 `@yh-ui/ai-sdk` 的[文档加载器](./future#文档加载器)使用，效果更佳。
:::

::: warning 注意

1. `embed` 函数需要自行实现或调用嵌入 API（如 OpenAI Embedding、Azure OpenAI Embedding 等）
2. 生产环境建议使用 Pinecone、Weaviate 等云向量存储
3. 合理设置 `similarityThreshold`，过高可能导致无检索结果
   :::
