/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ref,
  shallowRef,
  computed,
  onMounted,
  getCurrentInstance,
  type Ref,
  type ShallowRef
} from 'vue'
import { type RequestResponse } from './types'

// ==================== 类型定义 ====================

/**
 * useLoadMore - 无限滚动加载更多 Hook
 *
 * @example
 * const {
 *   data, loading, loadingMore, noMore,
 *   loadMore, refresh, reload
 * } = useLoadMore(
 *   (page, size) => request.get('/api/list', { params: { page, size } }),
 *   { initialPage: 1, pageSize: 10 }
 * )
 */

/** 加载更多配置 */
export interface UseLoadMoreOptions<TData, TParams extends unknown[] = unknown[]> {
  /** 请求函数（当作为第一个参数传入时可省略） */
  service?: (page: number, pageSize: number, ...args: TParams) => Promise<RequestResponse<TData>>
  /** 初始页码 */
  initialPage?: number
  /** 每页条数 */
  pageSize?: number
  /** 是否在底部触发加载 */
  isLoadMore?: boolean
  /** 距离底部多少像素触发加载 */
  threshold?: number
  /** 加载更多的请求函数（可以与 service 不同） */
  loadMoreService?: (page: number, pageSize: number) => Promise<RequestResponse<TData>>
  /** 成功回调 */
  onSuccess?: (data: TData, params: TParams) => void
  /** 错误回调 */
  onError?: (error: unknown, params: TParams) => void
  /** 完成后回调 */
  onFinally?: (params: TParams) => void
  /** 是否手动触发 */
  manual?: boolean
  /** 默认参数 */
  defaultParams?: TParams
}

/** 加载更多返回 */
export interface UseLoadMoreReturn<TData, TParams extends unknown[] = unknown[]> {
  /** 当前页码 */
  current: Ref<number>
  /** 每页条数 */
  pageSize: Ref<number>
  /** 总数 */
  total: Ref<number>
  /** 总页数 */
  totalPages: Ref<number>
  /** 数据 */
  data: ShallowRef<TData | undefined>
  /** 加载状态 */
  loading: Ref<boolean>
  /** 刷新状态 */
  refreshing: Ref<boolean>
  /** 加载更多状态 */
  loadingMore: Ref<boolean>
  /** 错误 */
  error: ShallowRef<unknown>
  /** 请求参数 */
  params: Ref<TParams>
  /** 是否没有更多 */
  noMore: Ref<boolean>
  /** 是否可以加载更多 */
  canLoadMore: Ref<boolean>
  /** 加载更多 */
  loadMore: () => Promise<void>
  /** 重新加载（重置分页） */
  reload: () => Promise<void>
  /** 刷新 */
  refresh: () => Promise<void>
  /** 分页方法 */
  pagination: {
    loadPage: (page: number) => Promise<void>
    nextPage: () => Promise<void>
    prevPage: () => Promise<void>
    firstPage: () => Promise<void>
    lastPage: () => Promise<void>
    refresh: () => Promise<void>
    setPageSize: (size: number) => void
    setTotal: (total: number) => void
  }
}

/** 分页数据结构（用于提取 total） */
interface PaginatedData {
  total?: number
  totalCount?: number
  totalElements?: number
}

// ==================== 加载更多 Hook ====================

export function useLoadMore<TData = unknown, TParams extends unknown[] = unknown[]>(
  service: (page: number, pageSize: number, ...args: TParams) => Promise<RequestResponse<TData>>,
  options: UseLoadMoreOptions<TData, TParams> = {}
): UseLoadMoreReturn<TData, TParams> {
  const {
    initialPage = 1,
    pageSize: defaultPageSize = 10,
    isLoadMore = true,
    threshold: _threshold = 100,
    loadMoreService,
    onSuccess,
    onError,
    onFinally,
    manual = false,
    defaultParams = [] as unknown as TParams
  } = options

  // 状态
  const current = ref(initialPage)
  const pageSize = ref(defaultPageSize)
  const total = ref(0)
  const totalPages = computed(() => {
    if (total.value <= 0) return 0
    return Math.ceil(total.value / pageSize.value)
  })

  const data = shallowRef<TData | undefined>(undefined)
  const loading = ref(false)
  const refreshing = ref(false)
  const loadingMore = ref(false)
  const error = shallowRef<unknown>(undefined)
  const params = ref<TParams>(defaultParams) as Ref<TParams>

  // 记录上一次刷新（包括重新加载和切换页码）完成的时间戳，用于防止滚动页码漂移
  let lastRefreshTime = 0
  const lastLoadedPageSize = ref<number | null>(null)

  const noMore = computed(() => {
    if (total.value > 0) {
      return current.value >= totalPages.value
    }
    if (lastLoadedPageSize.value !== null && lastLoadedPageSize.value < pageSize.value) {
      return true
    }
    return false
  })

  const canLoadMore = computed(() => {
    return isLoadMore && !noMore.value && !loadingMore.value
  })

  // 实际使用的 service
  const loadService = loadMoreService || service

  // 加载数据
  const loadData = async (requestedPage: number, isRefresh = false): Promise<void> => {
    if (loading.value || loadingMore.value) return

    const isLoadMoreOp = !isRefresh
    loading.value = isLoadMoreOp ? false : true
    if (isRefresh) {
      refreshing.value = true
      total.value = 0
      lastLoadedPageSize.value = null
    }
    if (isLoadMoreOp) loadingMore.value = true

    error.value = undefined

    try {
      const extraParams = params.value
      const response = await loadService(requestedPage, pageSize.value, ...extraParams)
      const pageData = response.data

      // 尝试提取总数（优先从 pageData 中提取，其次从 response 本身提取）
      let totalNum: number | undefined

      if (pageData && typeof pageData === 'object') {
        const paginatedData = pageData as PaginatedData
        if (typeof paginatedData.total !== 'undefined') totalNum = paginatedData.total
        else if (typeof paginatedData.totalCount !== 'undefined')
          totalNum = paginatedData.totalCount
        else if (typeof paginatedData.totalElements !== 'undefined')
          totalNum = paginatedData.totalElements
      }

      if (typeof totalNum === 'undefined' && response && typeof response === 'object') {
        const resp = response as Record<string, any>
        if (typeof resp.total !== 'undefined') totalNum = resp.total
        else if (typeof resp.totalCount !== 'undefined') totalNum = resp.totalCount
        else if (typeof resp.totalElements !== 'undefined') totalNum = resp.totalElements
      }

      if (typeof totalNum !== 'undefined') {
        total.value = totalNum
      }

      // 计算本次加载的数据条数，辅助 noMore 判定
      let loadedSize = 0
      if (Array.isArray(pageData)) {
        loadedSize = pageData.length
      } else if (pageData && typeof pageData === 'object') {
        const arrayKeys = Object.keys(pageData).filter((k) =>
          Array.isArray((pageData as Record<string, any>)[k])
        )
        if (arrayKeys.length > 0) {
          const preferredKey = arrayKeys.find((k) => ['list', 'data', 'items'].includes(k))
          if (preferredKey) {
            loadedSize = (pageData as Record<string, any>)[preferredKey].length
          } else {
            loadedSize = (pageData as Record<string, any>)[arrayKeys[0]].length
          }
        }
      }
      lastLoadedPageSize.value = loadedSize

      // 刷新时替换，加载更多时追加
      if (isRefresh) {
        data.value = pageData
        lastRefreshTime = Date.now()
      } else {
        const oldData = data.value
        if (Array.isArray(oldData) && Array.isArray(pageData)) {
          data.value = [...oldData, ...pageData] as TData
        } else if (
          oldData &&
          typeof oldData === 'object' &&
          pageData &&
          typeof pageData === 'object'
        ) {
          const merged: Record<string, any> = { ...pageData }
          for (const key of Object.keys(pageData)) {
            const oldValue = (oldData as Record<string, any>)[key]
            const newValue = (pageData as Record<string, any>)[key]
            if (Array.isArray(oldValue) && Array.isArray(newValue)) {
              merged[key] = [...oldValue, ...newValue]
            }
          }
          data.value = merged as TData
        } else {
          data.value = pageData
        }
      }
      current.value = requestedPage

      onSuccess?.(pageData, params.value)
    } catch (err) {
      error.value = err
      onError?.(err, params.value)
    } finally {
      loading.value = false
      refreshing.value = false
      loadingMore.value = false
      onFinally?.(params.value)
    }
  }

  // 加载更多
  const loadMore = async (): Promise<void> => {
    if (noMore.value || loadingMore.value) return
    // 防止滚动容器在 loadPage/reload 等刷新操作后，由于 DOM 尺寸变化或滚动位置改变，
    // 立即自动触发滚动事件导致意外加载下一页（页码漂移问题）
    if (Date.now() - lastRefreshTime < 100) return
    await loadData(current.value + 1, false)
  }

  // 重新加载
  const reload = async (): Promise<void> => {
    await loadData(initialPage, true)
  }

  // 刷新
  const refresh = async (): Promise<void> => {
    await reload()
  }

  // 分页方法
  const pagination = {
    loadPage: async (page: number): Promise<void> => {
      if (page < 1 || (totalPages.value > 0 && page > totalPages.value)) return
      await loadData(page, true)
    },
    nextPage: async (): Promise<void> => {
      await pagination.loadPage(current.value + 1)
    },
    prevPage: async (): Promise<void> => {
      await pagination.loadPage(current.value - 1)
    },
    firstPage: async (): Promise<void> => {
      await pagination.loadPage(1)
    },
    lastPage: async (): Promise<void> => {
      await pagination.loadPage(totalPages.value)
    },
    refresh: reload,
    setPageSize: (size: number): void => {
      pageSize.value = size
    },
    setTotal: (newTotal: number): void => {
      total.value = newTotal
    }
  }

  // 自动加载
  if (!manual) {
    if (getCurrentInstance()) {
      onMounted(() => {
        loadData(current.value, true)
      })
    } else {
      loadData(current.value, true)
    }
  }

  return {
    current,
    pageSize,
    total,
    totalPages,
    data,
    loading,
    refreshing,
    loadingMore,
    error,
    params,
    noMore,
    canLoadMore,
    loadMore,
    reload,
    refresh,
    pagination
  }
}
