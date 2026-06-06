# Vector Storage & RAG

YH-UI provides a complete vector storage abstraction layer and production-ready RAG support.

## createInMemoryVectorStore - In-Memory Vector Storage

Suitable for development and small-scale scenarios, uses cosine similarity for retrieval.

```typescript
import { createInMemoryVectorStore } from '@yh-ui/ai-sdk'

const vectorStore = createInMemoryVectorStore()

// Add document vectors
await vectorStore.add([
  {
    id: 'doc-1',
    content: 'Vue 3 is a progressive JavaScript framework',
    embedding: [0.1, 0.2, 0.3 /* ... */],
    metadata: { source: 'vue-docs' }
  }
])

// Similarity search
const results = await vectorStore.search([0.1, 0.2, 0.3], {
  topK: 5,
  threshold: 0.7
})

console.log(results[0].content)
```

### API

| Method                            | Description          |
| --------------------------------- | -------------------- |
| `add(documents, namespace?)`      | Add document vectors |
| `search(queryEmbedding, options)` | Similarity search    |
| `delete(ids, namespace?)`         | Delete by IDs        |
| `clear(namespace?)`               | Clear namespace      |

## External Vector Storage Interfaces

YH-UI provides configuration types for Pinecone, Weaviate, and Qdrant. You can implement your own adapters.

```typescript
import type {
  VectorStoreConfig,
  PineconeVectorStoreConfig,
  WeaviateVectorStoreConfig,
  QdrantVectorStoreConfig
} from '@yh-ui/ai-sdk'

// Pinecone configuration example
const pineconeConfig: PineconeVectorStoreConfig = {
  apiKey: 'your-api-key',
  indexName: 'your-index',
  environment: 'us-east1-aws'
}
```

## createProductionRAG - Production-Ready RAG

Build complete RAG pipeline: document loading, vectorization, storage, retrieval, and generation.

```typescript
import { createProductionRAG, createInMemoryVectorStore } from '@yh-ui/ai-sdk'

// Create RAG system
const rag = createProductionRAG({
  namespace: 'my-knowledge-base',
  topK: 5,
  similarityThreshold: 0.5,
  includeSources: true,
  vectorStore: createInMemoryVectorStore(),
  embed: async (text) => {
    // Call embedding API to get vectors
    const response = await fetch('/api/embed', {
      method: 'POST',
      body: JSON.stringify({ text })
    })
    return response.json()
  }
})

// Add documents (auto-vectorization)
await rag.addDocuments([
  { content: 'Vue 3 core features include reactive system', metadata: { source: 'vue' } },
  { content: 'Composition API is a new feature of Vue 3', metadata: { source: 'vue' } }
])

// Query
const result = await rag.query('What are the new features of Vue 3?', async (prompt) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  return response.json()
})

console.log(result.answer) // LLM generated answer
console.log(result.sources) // Referenced sources
```

### API

| Method                    | Description                   |
| ------------------------- | ----------------------------- |
| `addDocuments(documents)` | Add documents, auto-vectorize |
| `retrieve(query, k?)`     | Retrieve documents only       |
| `query(question, llm)`    | Retrieve + generate answer    |
| `clear()`                 | Clear knowledge base          |

### Return Values

```typescript
interface RAGResult {
  answer: string // LLM generated answer
  sources: Array<{
    // Referenced sources
    content: string
    metadata: Record<string, unknown>
    score: number
  }>
  contextUsed: string // Context used (for debugging)
}
```

::: tip
Use with `@yh-ui/ai-sdk`'s [Document Loaders](./future#document-loaders) for better results.
:::

::: warning Important Notes

1. The `embed` function needs to be implemented by yourself or call embedding APIs (e.g., OpenAI Embedding, Azure OpenAI Embedding)
2. For production, it is recommended to use cloud vector stores like Pinecone, Weaviate
3. Set `similarityThreshold` appropriately; too high may result in no retrieval results
   :::
