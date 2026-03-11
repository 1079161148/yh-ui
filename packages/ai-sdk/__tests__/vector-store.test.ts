/**
 * YH-UI AI SDK - 向量存储测试
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createInMemoryVectorStore } from '../src/vector-store'

describe('InMemoryVectorStore', () => {
  let store: ReturnType<typeof createInMemoryVectorStore>

  beforeEach(() => {
    store = createInMemoryVectorStore()
  })

  it('should add and search documents', async () => {
    const docs = [
      { id: '1', content: 'Hello world', embedding: [1, 0, 0] },
      { id: '2', content: 'Hello there', embedding: [0.9, 0.1, 0] },
      { id: '3', content: 'Unrelated text', embedding: [0, 0, 1] }
    ]

    await store.add(docs, 'test-ns')

    const results = await store.search([1, 0, 0], { topK: 2, namespace: 'test-ns' })

    expect(results.length).toBe(2)
    expect(results[0].id).toBe('1')
    expect(results[0].score).toBeGreaterThan(results[1].score)
  })

  it('should filter by threshold', async () => {
    await store.add([
      { id: '1', content: 'Similar', embedding: [1, 0, 0] },
      { id: '2', content: 'Dissimilar', embedding: [0, 0, 1] }
    ])

    const results = await store.search([1, 0, 0], { topK: 2, threshold: 0.8 })

    expect(results.length).toBe(1)
    expect(results[0].id).toBe('1')
  })

  it('should delete documents by id', async () => {
    await store.add([
      { id: '1', content: 'To delete', embedding: [1, 0, 0] },
      { id: '2', content: 'To keep', embedding: [0, 1, 0] }
    ])

    await store.delete(['1'])

    const results = await store.search([1, 0, 0], { topK: 10 })
    expect(results.length).toBe(1)
    expect(results[0].id).toBe('2')
  })

  it('should clear namespace', async () => {
    await store.add([{ id: '1', content: 'Test', embedding: [1, 0, 0] }], 'ns1')

    await store.clear('ns1')

    const results = await store.search([1, 0, 0], { topK: 10, namespace: 'ns1' })
    expect(results.length).toBe(0)
  })

  it('should support multiple namespaces', async () => {
    await store.add([{ id: '1', content: 'Doc 1', embedding: [1, 0, 0] }], 'ns1')
    await store.add([{ id: '2', content: 'Doc 2', embedding: [0, 1, 0] }], 'ns2')

    const r1 = await store.search([1, 0, 0], { topK: 1, namespace: 'ns1' })
    const r2 = await store.search([0, 1, 0], { topK: 1, namespace: 'ns2' })

    expect(r1[0].id).toBe('1')
    expect(r2[0].id).toBe('2')
  })
})
