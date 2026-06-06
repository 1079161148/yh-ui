import { describe, it, expect } from 'vitest'
import { usePagination } from '../usePagination'

describe('usePagination SSR', () => {
  it('should be defined', () => {
    expect(usePagination).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const mockService = async () => ({ data: { total: 10, list: [] } })
    const { current, pageSize, loading, total } = usePagination(mockService as any, {
      manual: true
    })

    expect(current.value).toBe(1)
    expect(pageSize.value).toBe(10)
    expect(loading.value).toBe(false)
    expect(total.value).toBe(0)
  })
})
