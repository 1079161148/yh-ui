import { describe, it, expect } from 'vitest'
import { useLoadMore } from '../useLoadMore'

describe('useLoadMore SSR', () => {
  it('should be defined', () => {
    expect(useLoadMore).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const mockService = async () => ({ data: { total: 10, list: [] } })
    const { current, pageSize, loading, total, loadingMore } = useLoadMore(mockService as any, {
      manual: true
    })

    expect(current.value).toBe(1)
    expect(pageSize.value).toBe(10)
    expect(loading.value).toBe(false)
    expect(loadingMore.value).toBe(false)
    expect(total.value).toBe(0)
  })
})
