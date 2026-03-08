import { ref, shallowRef, computed, watch, onMounted, type Ref, type ShallowRef } from 'vue'
import { type RequestResponse } from './types'

// ==================== 类型定义 ====================

/** 分页参数 */
export interface PaginationOptions {
  /** 当前页码 */
  current?: number
  /** 每页条数 */
  pageSize?: number
  /** 总数 */
  total?: number
  /** 总页数 */
  totalPages?: number
}

/** 分页 Hook 配置 */
export interface UsePaginationOptions<TData, TParams extends unknown[] = unknown[]> {
  /** 请求函数（当作为第一个参数传入时可省略） */
  service?: (...args: TParams) => Promise<RequestResponse<TData>>
  /** 默认分页配置 */
  defaultPagination?: PaginationOptions
  /** 请求实例 */
  request?: Request
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

/** 分页 Hook 返回值 */
export interface UsePaginationReturn<TData, TParams extends unknown[] = unknown[]> {
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
  /** 请求参数 */
  params: Ref<TParams>
  /** 错误 */
  error: ShallowRef<unknown>
  /** 是否还有更多 */
  noMore: Ref<boolean>
  /** 加载中 */
  loadingMore: Ref<boolean>
  /** 分页方法 */
  pagination: {
    /** 加载指定页 */
    loadPage: (page: number) => Promise<void>
    /** 下一页 */
    nextPage: () => Promise<void>
    /** 上一页 */
    prevPage: () => Promise<void>
    /** 首页 */
    firstPage: () => Promise<void>
    /** 末页 */
    lastPage: () => Promise<void>
    /** 刷新 */
    refresh: () => Promise<void>
    /** 设置每页条数 */
    setPageSize: (size: number) => void
    /** 设置总数 */
    setTotal: (total: number) => void
  }
}

/** 分页数据结构（用于提取 total） */
interface PaginatedData {
  total?: number
  totalCount?: number
  totalElements?: number
}

// ==================== 分页 Hook ====================

/**
 * usePagination - 分页请求 Hook
 *
 * @example
 * const {
 *   current, pageSize, total, data, loading,
 *   pagination: { loadPage, nextPage, prevPage, refresh }
 * } = usePagination(
 *   (page, size) => request.get('/api/list', { params: { page, size } }),
 *   { defaultPagination: { current: 1, pageSize: 10 } }
 * )
 */
export function usePagination<TData = unknown, TParams extends unknown[] = [number, number]>(
  service: (
    current: number,
    pageSize: number,
    ...args: unknown[]
  ) => Promise<RequestResponse<TData>>,
  options: UsePaginationOptions<TData, TParams> = {}
): UsePaginationReturn<TData, TParams> {
  const {
    defaultPagination = { current: 1, pageSize: 10 },
    onSuccess,
    onError,
    onFinally,
    manual = false,
    defaultParams = [] as unknown as TParams
  } = options

  // 分页状态
  const current = ref(defaultPagination.current || 1)
  const pageSize = ref(defaultPagination.pageSize || 10)
  const total = ref(defaultPagination.total || 0)

  // 计算属性
  const totalPages = computed(() => {
    if (total.value <= 0) return 0
    return Math.ceil(total.value / pageSize.value)
  })

  const noMore = computed(() => {
    return current.value >= totalPages.value && total.value > 0
  })

  // 数据状态
  const data = shallowRef<TData | undefined>(undefined)
  const loading = ref(false)
  const refreshing = ref(false)
  const loadingMore = ref(false)
  const error = shallowRef<unknown>(undefined)
  const params = ref<TParams>(defaultParams) as Ref<TParams>

  // 请求函数
  const loadData = async (): Promise<void> => {
    if (loading.value) return

    loading.value = true
    error.value = undefined

    try {
      const page = current.value
      const size = pageSize.value
      const extraParams = (params.value as unknown[]).slice(2)

      const response = await service(page, size, ...extraParams)
      const pageData = response.data

      // 尝试从响应中提取总数
      if (pageData && typeof pageData === 'object') {
        const paginatedData = pageData as PaginatedData
        if (typeof paginatedData.total !== 'undefined') {
          total.value = paginatedData.total
        }
        if (typeof paginatedData.totalCount !== 'undefined') {
          total.value = paginatedData.totalCount
        }
        if (typeof paginatedData.totalElements !== 'undefined') {
          total.value = paginatedData.totalElements
        }
      }

      data.value = pageData

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

  // 分页方法
  const loadPage = async (page: number): Promise<void> => {
    if (page < 1 || page > totalPages.value) return
    current.value = page
    await loadData()
  }

  const nextPage = async (): Promise<void> => {
    if (noMore.value) return
    await loadPage(current.value + 1)
  }

  const prevPage = async (): Promise<void> => {
    await loadPage(current.value - 1)
  }

  const firstPage = async (): Promise<void> => {
    await loadPage(1)
  }

  const lastPage = async (): Promise<void> => {
    await loadPage(totalPages.value)
  }

  const refresh = async (): Promise<void> => {
    current.value = 1
    refreshing.value = true
    await loadData()
  }

  const setPageSize = (size: number): void => {
    pageSize.value = size
    if (!manual) {
      refresh()
    }
  }

  const setTotal = (newTotal: number): void => {
    total.value = newTotal
  }

  // 监听分页变化
  watch([current, pageSize], () => {
    if (!manual) {
      loadData()
    }
  })

  // 自动加载
  if (!manual) {
    onMounted(() => {
      loadData()
    })
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
    pagination: {
      loadPage,
      nextPage,
      prevPage,
      firstPage,
      lastPage,
      refresh,
      setPageSize,
      setTotal
    }
  }
}
