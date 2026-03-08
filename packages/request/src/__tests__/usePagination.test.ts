import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})
import { nextTick } from 'vue'
import { usePagination } from '../usePagination'

describe('usePagination', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should initialize with default states', () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 0, items: [] } })
    const { current, pageSize, total, totalPages, noMore } = usePagination(mockService as any, {
      manual: true
    })

    expect(current.value).toBe(1)
    expect(pageSize.value).toBe(10)
    expect(total.value).toBe(0)
    expect(totalPages.value).toBe(0)
    expect(noMore.value).toBe(false)
  })

  it('should extract total from response correctly', async () => {
    const mockService = vi.fn().mockImplementation(async (page, size) => ({
      data: { total: 55, items: Array(size).fill(1) }
    }))

    // Using manual true to avoid auto-triggering on mounted and watch
    const { pagination, total, totalPages, noMore, data } = usePagination(mockService as any, {
      manual: true
    })

    await pagination.loadPage(1)

    expect(mockService).toHaveBeenCalledWith(1, 10)
    expect(total.value).toBe(55)
    expect(totalPages.value).toBe(6) // 55 / 10 = 5.5 -> ceil -> 6
    expect(noMore.value).toBe(false)
    expect(data.value).toEqual({ total: 55, items: Array(10).fill(1) })
  })

  it('should format total from fallback fields (totalCount, totalElements)', async () => {
    const mockServiceCount = vi.fn().mockResolvedValue({ data: { totalCount: 20 } })
    const { pagination: pagCount, total: totCount } = usePagination(mockServiceCount as any, {
      manual: true
    })
    await pagCount.loadPage(1)
    expect(totCount.value).toBe(20)

    const mockServiceElements = vi.fn().mockResolvedValue({ data: { totalElements: 30 } })
    const { pagination: pagEl, total: totEl } = usePagination(mockServiceElements as any, {
      manual: true
    })
    await pagEl.loadPage(1)
    expect(totEl.value).toBe(30)
  })

  it('should support loadPage, nextPage, prevPage, firstPage, lastPage', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 50, items: [] } })
    const { pagination, current } = usePagination(mockService as any, { manual: true })

    // Simulate setting initial total by first request
    await pagination.loadPage(1)
    expect(current.value).toBe(1)

    // next
    await pagination.nextPage()
    expect(current.value).toBe(2)

    // prev
    await pagination.prevPage()
    expect(current.value).toBe(1)

    // last
    await pagination.lastPage()
    expect(current.value).toBe(5) // (50 / 10 = 5)

    // next again (should not go beyond if noMore is true)
    await pagination.nextPage()
    expect(current.value).toBe(5) // Still 5
  })

  it('prevPage from 1 should not go to 0', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 50, items: [] } })
    const { pagination, current } = usePagination(mockService as any, { manual: true })
    await pagination.loadPage(1)
    expect(current.value).toBe(1)

    await pagination.prevPage() // Should clamp at 1
    expect(current.value).toBe(1)
  })

  it('should support refresh and setPageSize', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 50, items: [] } })
    const { pagination, current, pageSize } = usePagination(mockService as any, { manual: true })

    await pagination.loadPage(3)
    expect(current.value).toBe(3)

    await pagination.refresh()
    expect(current.value).toBe(1)

    pagination.setPageSize(20)
    expect(pageSize.value).toBe(20)
  })

  it('automatically fetches data on mount if manual is false', async () => {
    const mockService = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { total: 10 } }), 100))
      )

    usePagination(mockService as any, { manual: false })

    expect(mockService).toHaveBeenCalledWith(1, 10)

    vi.advanceTimersByTime(100)
    await nextTick()
  })

  it('handles errors via onError', async () => {
    const err = new Error('request failed')
    const mockService = vi.fn().mockRejectedValue(err)
    const onError = vi.fn()
    const onFinally = vi.fn()

    const { pagination, error } = usePagination(mockService as any, {
      manual: true,
      onError,
      onFinally
    })

    await pagination.loadPage(1)

    expect(error.value).toBe(err)
    expect(onError).toHaveBeenCalledWith(err, [])
    expect(onFinally).toHaveBeenCalledWith([])
  })
})
