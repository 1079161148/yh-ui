import {
  ref,
  shallowRef,
  computed,
  watch,
  onMounted,
  onUnmounted,
  type Ref,
  type ComputedRef,
  type ShallowRef
} from 'vue'
import { type RequestOptions, type RequestResponse, type RequestError } from './types'
import { Request } from './request'
import { debounce, throttle } from '@yh-ui/utils'

// ==================== 类型定义 ====================

/** 请求 Hook 配置 */
export interface UseRequestOptions<
  TData,
  TParams extends unknown[] = unknown[]
> extends RequestOptions {
  /** 手动触发 */
  manual?: boolean
  /** 默认参数 */
  defaultParams?: TParams
  /** 防抖等待时间 (ms) */
  debounceWait?: number
  /** 节流等待时间 (ms) */
  throttleWait?: number
  /** 请求实例 */
  request?: Request
  /** 请求函数 */
  service?: (...args: TParams) => Promise<RequestResponse<TData>>
  /** 格式化返回数据 */
  formatResult?: (response: RequestResponse<TData>) => TData
  /** 成功回调 */
  onSuccess?: (data: TData, params: TParams) => void
  /** 错误回调 */
  onError?: (error: RequestError, params: TParams) => void
  /** 完成回调 */
  onFinally?: (params: TParams) => void
}

/** SWR 配置 */
export interface UseRequestSWROptions<TData, TParams extends unknown[]> extends UseRequestOptions<
  TData,
  TParams
> {
  /** SWR 模式 */
  swr?: boolean
  /** 缓存 key */
  cacheKey?: string
  /** 缓存数据过期时间 (ms) */
  staleTime?: number
  /** 缓存数据存活时间 (ms) */
  cacheTime?: number
  /** 缓存数据 */
  getCache?: (key: string) => TData | undefined
  /** 设置缓存 */
  setCache?: (key: string, value: TData) => void
  /** 窗口聚焦重新请求 */
  refreshOnWindowFocus?: boolean
  /** 重新请求防抖等待 (ms) */
  refreshDepsWait?: number
  /** 依赖变化时重新请求 */
  refreshDeps?: Ref<unknown>[]
}

/** 轮询配置 */
export interface UseRequestPollingOptions<
  TData,
  TParams extends unknown[]
> extends UseRequestOptions<TData, TParams> {
  /** 轮询模式 */
  polling?: boolean
  /** 轮询间隔 (ms) */
  pollingInterval?: number
  /** 轮询在页面隐藏时暂停 */
  pollingWhenHidden?: boolean
}

/** 请求状态 */
export interface UseRequestState<TData, TParams extends unknown[]> {
  /** 加载状态 */
  loading: Ref<boolean>
  /** 数据 */
  data: ShallowRef<TData | undefined>
  /** 错误 */
  error: ShallowRef<RequestError | undefined>
  /** 请求参数 */
  params: Ref<TParams>
  /** 是否为首次加载 */
  loadingMore: Ref<boolean>
  /** 是否有更多数据 */
  noMore: Ref<boolean>
}

/** 请求方法 */
export interface UseRequestReturn<TData, TParams extends unknown[]> extends UseRequestState<
  TData,
  TParams
> {
  /** 立即执行请求 */
  run: (...params: TParams) => Promise<RequestResponse<TData>> & { cancel: () => void }
  /** 手动触发请求 */
  mutate: (data?: TData | ((oldData?: TData) => TData)) => void
  /** 取消请求 */
  cancel: () => void
  /** 刷新 */
  refresh: () => Promise<void>
  /** 加载更多 */
  loadMore: () => Promise<void>
  /** 禁用 */
  disabled: ComputedRef<boolean>
}

/** 可取消的错误类型 */
interface CancelableError extends Error {
  isCanceled?: boolean
}

// ==================== 缓存管理 ====================

const globalCache = new Map<string, { data: unknown; expireTime: number }>()

function setCache<T>(key: string, value: T, cacheTime?: number): void {
  const expireTime = Date.now() + (cacheTime || 5 * 60 * 1000) // 默认 5 分钟
  globalCache.set(key, { data: value, expireTime })
}

// ==================== 核心 Hook ====================

/**
 * useRequest - 强大的请求 Hook
 *
 * @example
 * const { data, loading, error, run, refresh, cancel } = useRequest(
 *   (id) => request.get(`/api/user/${id}`),
 *   {
 *     manual: false,
 *     defaultParams: [1],
 *     onSuccess: (data) => console.log(data),
 *   }
 * )
 */
export function useRequest<TData = unknown, TParams extends unknown[] = unknown[]>(
  service: (...args: TParams) => Promise<RequestResponse<TData>>,
  options: UseRequestOptions<TData, TParams> = {}
): UseRequestReturn<TData, TParams> {
  const {
    manual = false,
    defaultParams = [] as unknown as TParams,
    debounceWait,
    throttleWait,
    formatResult,
    onSuccess,
    onError,
    onFinally
  } = options

  // 状态
  const loading = ref(false)
  const loadingMore = ref(false)
  const data = shallowRef<TData | undefined>(undefined)
  const error = shallowRef<RequestError | undefined>(undefined)
  const params = ref<TParams>(defaultParams) as Ref<TParams>
  const noMore = ref(false)

  // 内部请求计数器（用于取消）
  const runCount = ref(0)

  // 当前请求的 AbortController
  let abortController: AbortController | null = null

  // 格式化结果
  const format = (response: RequestResponse<TData> | TData | unknown): TData => {
    if (formatResult) {
      return formatResult(response as RequestResponse<TData>)
    }
    // 兼容直接从 service 返回的数据 (没有 .data 包装或不是标准 RequestResponse 结构)
    if (
      response &&
      typeof response === 'object' &&
      !('config' in response && 'requestId' in response)
    ) {
      return response as TData
    }
    const res = response as Record<string, unknown>
    return (res?.data ?? res) as TData
  }

  // 执行请求
  const run = async (...runParams: TParams): Promise<RequestResponse<TData>> => {
    const currentRunCount = ++runCount.value

    // 取消之前的请求
    if (abortController) {
      abortController.abort()
    }
    abortController = new AbortController()

    // 更新参数
    params.value = runParams

    // 设置 loading
    loading.value = true
    error.value = undefined

    try {
      // 执行请求
      const response = await service(...runParams)

      // 检查是否被取消
      if (currentRunCount !== runCount.value) {
        const cancelError: CancelableError = new Error('Request canceled')
        cancelError.isCanceled = true
        throw cancelError
      }

      // 格式化数据
      const formattedData = format(response as RequestResponse<TData>)

      // 更新数据
      data.value = formattedData

      // 成功回调
      if (onSuccess) {
        onSuccess(formattedData, runParams)
      }

      return response as RequestResponse<TData>
    } catch (err: unknown) {
      const cancelableErr = err as CancelableError
      // 检查是否被取消
      if (cancelableErr?.isCanceled || cancelableErr?.name === 'AbortError') {
        throw err
      }

      // 设置错误
      error.value = err as RequestError

      // 错误回调
      if (onError) {
        onError(err as RequestError, runParams)
      }

      throw err
    } finally {
      if (currentRunCount === runCount.value) {
        loading.value = false
        if (onFinally) {
          onFinally(runParams)
        }
      }
    }
  }

  // 手动触发请求
  const mutate = (newData?: TData | ((oldData?: TData) => TData)) => {
    if (typeof newData === 'function') {
      const oldData = data.value
      data.value = (newData as (oldData?: TData) => TData)(oldData)
    } else if (newData !== undefined) {
      data.value = newData
    }
  }

  // 取消请求
  const cancel = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    loading.value = false
  }

  // 刷新（使用上次的参数）
  const refresh = async () => {
    await run(...params.value)
  }

  // 加载更多
  const loadMore = async () => {
    if (loadingMore.value || noMore.value) return
    loadingMore.value = true
    try {
      await run(...params.value)
    } finally {
      loadingMore.value = false
    }
  }

  // 防抖/节流处理
  let wrappedRun: typeof run & { cancel: () => void } = run as typeof run & { cancel: () => void }
  let cancelFn: (() => void) | undefined

  if (debounceWait) {
    const debounced = debounce(run as (...args: unknown[]) => unknown, debounceWait)
    wrappedRun = ((...args: TParams) => run(...args)) as typeof wrappedRun
    wrappedRun.cancel = () => debounced.cancel()
    cancelFn = () => debounced.cancel()
  } else if (throttleWait) {
    const throttled = throttle(run as (...args: unknown[]) => unknown, throttleWait)
    wrappedRun = ((...args: TParams) => run(...args)) as typeof wrappedRun
    wrappedRun.cancel = () => throttled.cancel()
    cancelFn = () => throttled.cancel()
  }

  // 组件卸载时取消防抖/节流
  onUnmounted(() => {
    cancelFn?.()
  })

  // 自动执行
  if (!manual && defaultParams.length > 0) {
    onMounted(() => {
      if (!debounceWait && !throttleWait) {
        run(...defaultParams)
      }
    })
  }

  // 计算属性
  const disabled = computed(() => loading.value)

  return {
    loading,
    loadingMore,
    data,
    error,
    params,
    noMore,
    run: wrappedRun as unknown as UseRequestReturn<TData, TParams>['run'],
    mutate,
    cancel,
    refresh,
    loadMore,
    disabled
  }
}

// ==================== SWR Hook ====================

/**
 * useRequestSWR - 带 SWR 缓存的请求 Hook
 *
 * @example
 * const { data, loading } = useRequestSWR(
 *   () => `/api/user/${id.value}`,
 *   (url) => request.get(url),
 *   { cacheKey: 'user' }
 * )
 */
export function useRequestSWR<TData = unknown>(
  cacheKey: string | (() => string),
  service: (key: string) => Promise<RequestResponse<TData>>,
  options: UseRequestSWROptions<TData, [string]> = {}
): UseRequestReturn<TData, [string]> {
  const {
    cacheTime = 10 * 60 * 1000,
    setCache: customSetCache,
    refreshOnWindowFocus = false,
    refreshDepsWait = 1000,
    refreshDeps = [],
    manual = false,
    ...requestOptions
  } = options

  // 缓存操作函数
  const setCacheFn =
    customSetCache || ((key: string, value: TData) => setCache(key, value, cacheTime))

  // 获取缓存 key
  const getKey = () => {
    const key = typeof cacheKey === 'function' ? cacheKey() : cacheKey
    return key
  }

  // 请求
  const { loading, data, error, params, run, mutate, cancel, refresh, disabled } = useRequest<
    TData,
    [string]
  >((key: string) => service(key), {
    manual,
    defaultParams: manual ? ([] as unknown as [string]) : [getKey()],
    ...requestOptions
  })

  // 写入缓存
  const updateCache = (newData: TData) => {
    const key = getKey()
    if (key) {
      setCacheFn(key, newData)
    }
  }

  // 监听数据变化，自动缓存
  watch(
    () => data.value,
    (newData: TData | undefined) => {
      if (newData !== undefined) {
        updateCache(newData)
      }
    },
    { immediate: true }
  )

  // 窗口聚焦重新请求
  if (refreshOnWindowFocus && !manual) {
    onMounted(() => {
      const handleFocus = () => {
        const key = getKey()
        if (key && !loading.value) {
          refresh()
        }
      }

      window.addEventListener('visibilitychange', handleFocus)
      window.addEventListener('focus', handleFocus)

      onUnmounted(() => {
        window.removeEventListener('visibilitychange', handleFocus)
        window.removeEventListener('focus', handleFocus)
      })
    })
  }

  // 依赖变化重新请求
  if (refreshDeps && refreshDeps.length > 0 && !manual) {
    watch(
      () => refreshDeps.map((dep) => dep.value),
      () => {
        const key = getKey()
        if (key) {
          setTimeout(() => run(key), refreshDepsWait)
        }
      },
      { deep: true }
    )
  }

  return {
    loading,
    data,
    error,
    params,
    loadingMore: ref(false),
    noMore: ref(false),
    run,
    mutate,
    cancel,
    refresh,
    loadMore: async () => {
      /* no-op for SWR */ return Promise.resolve()
    },
    disabled
  }
}

// ==================== 轮询 Hook ====================

/**
 * useRequestPolling - 带轮询的请求 Hook
 *
 * @example
 * const { data, pause, resume } = useRequestPolling(
 *   () => request.get('/api/status'),
 *   { pollingInterval: 5000 }
 * )
 */
export function useRequestPolling<TData = unknown, TParams extends unknown[] = unknown[]>(
  service: (...args: TParams) => Promise<RequestResponse<TData>>,
  options: UseRequestPollingOptions<TData, TParams> = {}
): UseRequestReturn<TData, TParams> & {
  /** 暂停轮询 */
  pause: () => void
  /** 恢复轮询 */
  resume: () => void
} {
  const {
    polling = false,
    pollingInterval = 3000,
    pollingWhenHidden = false,
    ...requestOptions
  } = options

  // 请求 Hook
  const {
    loading,
    data,
    error,
    params,
    loadingMore,
    noMore,
    run,
    mutate,
    cancel,
    refresh,
    loadMore,
    disabled
  } = useRequest<TData, TParams>(service, {
    manual: true,
    ...requestOptions
  })

  // 轮询状态
  const isPolling = ref(false)
  const pollingTimer = ref<ReturnType<typeof setInterval> | null>(null)

  // 轮询
  const startPolling = () => {
    if (pollingTimer.value) return

    isPolling.value = true

    // 立即执行一次
    run(...(params.value as TParams))

    // 设置定时器
    pollingTimer.value = setInterval(() => {
      // 检查页面可见性
      if (!pollingWhenHidden && document.hidden) {
        return
      }
      run(...(params.value as TParams))
    }, pollingInterval)
  }

  // 暂停轮询
  const pause = () => {
    if (pollingTimer.value) {
      clearInterval(pollingTimer.value)
      pollingTimer.value = null
    }
    isPolling.value = false
  }

  // 恢复轮询
  const resume = () => {
    if (polling && !pollingTimer.value) {
      startPolling()
    }
  }

  // 清理
  onUnmounted(() => {
    pause()
    cancel()
  })

  // 自动开始轮询
  if (polling) {
    onMounted(() => {
      startPolling()
    })
  }

  return {
    loading,
    data,
    error,
    params,
    loadingMore,
    noMore,
    run,
    mutate,
    cancel,
    refresh,
    loadMore,
    disabled,
    pause,
    resume
  }
}
