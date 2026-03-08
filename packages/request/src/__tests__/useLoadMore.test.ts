import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})
import { useLoadMore } from '../useLoadMore'

describe('useLoadMore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should initialize with default states', () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 0, items: [] } })
    const { current, pageSize, total, totalPages, loadingMore, noMore, canLoadMore } = useLoadMore(
      mockService as any,
      { manual: true }
    )

    expect(current.value).toBe(1)
    expect(pageSize.value).toBe(10)
    expect(total.value).toBe(0)
    expect(totalPages.value).toBe(0)
    expect(loadingMore.value).toBe(false)
    expect(noMore.value).toBe(false)
    expect(canLoadMore.value).toBe(true)
  })

  it('should load data and update current page', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 30, items: [1, 2, 3] } })
    const { reload, total, totalPages, data, current } = useLoadMore(mockService as any, {
      manual: true
    })

    await reload()

    expect(mockService).toHaveBeenCalledWith(1, 10)
    expect(total.value).toBe(30)
    expect(totalPages.value).toBe(3)
    // When using reload/refresh, data is replaced and current becomes initial + 1
    expect(data.value).toEqual({ total: 30, items: [1, 2, 3] })
    expect(current.value).toBe(2)
  })

  it('should append data correctly when loadMore is called', async () => {
    let callCount = 0
    const mockService = vi.fn().mockImplementation(async () => {
      callCount++
      if (callCount === 1) return { data: [1] } // Using bare array response which loadMore handles
      if (callCount === 2) return { data: [2] }
      return { data: [] }
    })

    const { reload, loadMore, data, current } = useLoadMore(mockService as any, { manual: true })

    await reload() // Fetches page 1, data is [1], current becomes 2
    expect(data.value).toEqual([1])
    expect(current.value).toBe(2)

    await loadMore() // Fetches page 2, data is [1, 2], current becomes 3
    expect(data.value).toEqual([1, 2])
    expect(current.value).toBe(3)
  })

  it('noMore state works correctly based on totalPages', async () => {
    const mockService = vi.fn().mockResolvedValue({ data: { total: 15, items: [] } })
    const { reload, loadMore, noMore, totalPages, canLoadMore } = useLoadMore(mockService as any, {
      manual: true,
      pageSize: 10
    })

    await reload() // current becomes 2
    expect(totalPages.value).toBe(2)
    expect(noMore.value).toBe(true) // current (2) >= totalPages (2)
    expect(canLoadMore.value).toBe(false)

    // Attempting loadMore should be a no-op when noMore is true
    mockService.mockClear()
    await loadMore()
    expect(mockService).not.toHaveBeenCalled()
  })

  it('handles errors cleanly', async () => {
    const err = new Error('request failed')
    const mockService = vi.fn().mockRejectedValue(err)
    const onError = vi.fn()
    const onFinally = vi.fn()

    const { reload, error } = useLoadMore(mockService as any, { manual: true, onError, onFinally })

    await reload()

    expect(error.value).toBe(err)
    expect(onError).toHaveBeenCalledWith(err, [])
    expect(onFinally).toHaveBeenCalledWith([])
  })
})
