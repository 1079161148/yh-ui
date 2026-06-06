import { describe, it, expect } from 'vitest'
import { IndexedDBAdapter, APIClient } from '../index'

describe('Storage Adapters SSR', () => {
  it('should be safe to construct IndexedDBAdapter in SSR', () => {
    const adapter = new IndexedDBAdapter()
    expect(adapter).toBeDefined()
  })

  it('should be safe to construct APIClient in SSR', () => {
    const client = new APIClient('http://api.com')
    expect(client).toBeDefined()
  })
})
