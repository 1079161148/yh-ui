import {
  ref,
  shallowRef,
  computed,
  watch,
  onMounted,
  onUnmounted,
  getCurrentInstance,
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
  service?: (
    ...args: [...TParams, { signal?: AbortSignal }?] | unknown[]
  ) => Promise<RequestResponse<TData>>
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
  /** 是否网络忙 */
  loadingMore: Ref<boolean>
  /** 是否没有更多 */
  noMore: Ref<boolean>
}

/** 请求返回类型 */
export interface UseRequestReturn<TData, TParams extends unknown[]> extends UseRequestState<
  TData,
  TParams
> {
  /** 执行请求 */
  run: (...params: TParams) => Promise<RequestResponse<TData>>
  /** 手动修改数据 */
  mutate: (newData?: TData | ((oldData?: TData) => TData)) => void
  /** 取消请求 */
  cancel: () => void
  /** 刷新请求 */
  refresh: () => Promise<void>
  /** 加载更多 */
  loadMore: () => Promise<void>
  /** 按钮禁用状态 */
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

function getCache<T>(key: string): T | undefined {
  const cached = globalCache.get(key)
  if (cached) {
    if (Date.now() < cached.expireTime) {
      return cached.data as T
    }
    globalCache.delete(key)
  }
  return undefined
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
      !('config' in (response as object) && 'requestId' in (response as object))
    ) {
      return response as TData
    }
    const res = response as { data?: TData }
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
      const response = await (service as (...args: unknown[]) => Promise<unknown>)(...runParams, {
        signal: abortController.signal
      })

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
    runCount.value++
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    cancelFn?.()
    loading.value = false
  }

  // 刷新（使用上次的参数）
  const refresh = async () => {
    await run(...params.value).catch(() => {})
  }

  // 加载更多
  const loadMore = async () => {
    if (loadingMore.value || noMore.value) return
    loadingMore.value = true
    try {
      await run(...params.value).catch(() => {})
    } finally {
      loadingMore.value = false
    }
  }

  // 防抖/节流处理
  type RunFn = (...params: TParams) => Promise<RequestResponse<TData>>
  type CancelableRunFn = RunFn & { cancel: () => void }

  let wrappedRun = run as unknown as CancelableRunFn
  let cancelFn: (() => void) | undefined
  let pendingPromises: Array<{
    resolve: (val: RequestResponse<TData>) => void
    reject: (err: unknown) => void
  }> = []

  if (debounceWait) {
    const debounced = debounce(
      (async (...args: TParams) => {
        const currentPromises = [...pendingPromises]
        pendingPromises = []
        try {
          const res = await run(...args)
          currentPromises.forEach((p) => p.resolve(res))
        } catch (err) {
          currentPromises.forEach((p) => p.reject(err))
        }
      }) as unknown as (...args: unknown[]) => void,
      debounceWait
    )
    wrappedRun = ((...args: TParams) => {
      return new Promise<RequestResponse<TData>>((resolve, reject) => {
        pendingPromises.push({ resolve, reject })
        debounced(...args)
      })
    }) as unknown as CancelableRunFn
    wrappedRun.cancel = () => {
      debounced.cancel()
      const currentPromises = [...pendingPromises]
      pendingPromises = []
      const cancelError: CancelableError = new Error('Request canceled')
      cancelError.isCanceled = true
      currentPromises.forEach((p) => p.reject(cancelError))
    }
    cancelFn = wrappedRun.cancel
  } else if (throttleWait) {
    const throttled = throttle(
      (async (...args: TParams) => {
        const currentPromises = [...pendingPromises]
        pendingPromises = []
        try {
          const res = await run(...args)
          currentPromises.forEach((p) => p.resolve(res))
        } catch (err) {
          currentPromises.forEach((p) => p.reject(err))
        }
      }) as unknown as (...args: unknown[]) => void,
      throttleWait
    )
    wrappedRun = ((...args: TParams) => {
      return new Promise<RequestResponse<TData>>((resolve, reject) => {
        pendingPromises.push({ resolve, reject })
        throttled(...args)
      })
    }) as unknown as CancelableRunFn
    wrappedRun.cancel = () => {
      throttled.cancel()
      const currentPromises = [...pendingPromises]
      pendingPromises = []
      const cancelError: CancelableError = new Error('Request canceled')
      cancelError.isCanceled = true
      currentPromises.forEach((p) => p.reject(cancelError))
    }
    cancelFn = wrappedRun.cancel
  }

  // 组件卸载时取消所有请求和定时器
  if (getCurrentInstance()) {
    onUnmounted(() => {
      cancel()
    })
  }

  // 自动执行
  if (!manual) {
    if (getCurrentInstance()) {
      onMounted(() => {
        if (!debounceWait && !throttleWait) {
          run(...defaultParams).catch(() => {})
        }
      })
    } else {
      if (!debounceWait && !throttleWait) {
        run(...defaultParams).catch(() => {})
      }
    }
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
    run: wrappedRun as UseRequestReturn<TData, TParams>['run'],
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
  service: (key: string, options?: { signal?: AbortSignal }) => Promise<RequestResponse<TData>>,
  options: UseRequestSWROptions<TData, [string]> = {}
): UseRequestReturn<TData, [string]> {
  const {
    cacheTime = 10 * 60 * 1000,
    setCache: customSetCache,
    getCache: customGetCache,
    refreshOnWindowFocus = false,
    refreshDepsWait = 1000,
    refreshDeps = [],
    manual = false,
    ...requestOptions
  } = options

  // 缓存操作函数
  const setCacheFn =
    customSetCache || ((key: string, value: TData) => setCache(key, value, cacheTime))
  const getCacheFn = customGetCache || getCache

  // 获取缓存 key
  const getKey = () => {
    const key = typeof cacheKey === 'function' ? cacheKey() : cacheKey
    return key
  }

  // 请求
  const {
    loading,
    data,
    error,
    params,
    run: originalRun,
    mutate,
    cancel,
    disabled
  } = useRequest<TData, [string]>(
    (key: string, options?: { signal?: AbortSignal }) => service(key, options),
    {
      manual,
      defaultParams: (manual ? [] : [getKey()]) as unknown as [string],
      ...requestOptions
    }
  )

  // SWR: read cache and populate data on initialization
  const initialKey = getKey()
  if (initialKey) {
    const cachedVal = getCacheFn(initialKey)
    if (cachedVal !== undefined) {
      data.value = cachedVal as TData
    }
  }

  const swrRun = async (key: string): Promise<RequestResponse<TData>> => {
    const cachedVal = getCacheFn(key)
    if (cachedVal !== undefined) {
      data.value = cachedVal as TData
    }
    return originalRun(key)
  }

  const swrRefresh = async (): Promise<void> => {
    const key = params.value[0] || getKey()
    if (key) {
      await swrRun(key).catch(() => {})
    }
  }

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
  if (refreshOnWindowFocus && !manual && getCurrentInstance()) {
    const handleFocus = () => {
      const key = getKey()
      if (key && !loading.value) {
        swrRefresh()
      }
    }

    if (getCurrentInstance()) {
      onMounted(() => {
        window.addEventListener('visibilitychange', handleFocus)
        window.addEventListener('focus', handleFocus)
      })

      onUnmounted(() => {
        window.removeEventListener('visibilitychange', handleFocus)
        window.removeEventListener('focus', handleFocus)
      })
    }
  }

  // 依赖变化重新请求
  if (refreshDeps && refreshDeps.length > 0 && !manual) {
    watch(
      () => refreshDeps.map((dep) => dep.value),
      () => {
        const key = getKey()
        if (key) {
          const cachedVal = getCacheFn(key)
          if (cachedVal !== undefined) {
            data.value = cachedVal as TData
          }
          setTimeout(() => swrRun(key).catch(() => {}), refreshDepsWait)
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
    run: swrRun,
    mutate,
    cancel,
    refresh: swrRefresh,
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
    run(...(params.value as TParams)).catch(() => {})

    // 设置定时器
    pollingTimer.value = setInterval(() => {
      // 检查页面可见性
      if (!pollingWhenHidden && document.hidden) {
        return
      }
      run(...(params.value as TParams)).catch(() => {})
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
  if (getCurrentInstance()) {
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
  } else {
    // 自动开始轮询 (非组件环境)
    if (polling) {
      startPolling()
    }
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
