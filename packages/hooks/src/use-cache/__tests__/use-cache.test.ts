import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCache, clearCache } from '../index'

describe('useCache', () => {
  beforeEach(() => {
    clearCache()
  })

  it('should initialize with null data when cache is empty', () => {
    const { data } = useCache('test-key', () => 'data')
    expect(data.value).toBeNull()
  })

  it('should execute fetcher and update data', async () => {
    const fetcher = vi.fn().mockReturnValue('cached-data')
    const { data, execute } = useCache('test-key', fetcher)

    await execute()
    expect(fetcher).toHaveBeenCalled()
    expect(data.value).toBe('cached-data')
  })

  it('should initialize with cached data if key exists in cache', async () => {
    const fetcher1 = vi.fn().mockReturnValue('value-1')
    const cache1 = useCache('shared-key', fetcher1)
    await cache1.execute()
    expect(cache1.data.value).toBe('value-1')

    const fetcher2 = vi.fn().mockReturnValue('value-2')
    const cache2 = useCache('shared-key', fetcher2)
    // Should initialize with value-1 immediately
    expect(cache2.data.value).toBe('value-1')

    // execute should still be able to update
    await cache2.execute()
    expect(cache2.data.value).toBe('value-2')
  })

  it('should handle async fetchers', async () => {
    const fetcher = async () => 'async-data'
    const { data, execute } = useCache('test-key', fetcher)

    await execute()
    expect(data.value).toBe('async-data')
  })

  it('should handle errors in fetcher', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetcher = () => {
      throw new Error('fetch error')
    }
    const { data, execute } = useCache('test-key', fetcher)

    await execute()
    expect(data.value).toBeNull()
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
