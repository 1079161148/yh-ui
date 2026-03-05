import { describe, it, expect, vi } from 'vitest'
import { useCache } from '../index'

describe('useCache', () => {
  it('should initialize with null data', () => {
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
