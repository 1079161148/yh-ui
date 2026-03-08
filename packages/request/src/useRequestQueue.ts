import { useQueue, type UseQueueOptions, type QueueTask } from './useQueue'

/**
 * useRequestQueue - 请求队列 Hook
 *
 * 专用于 HTTP 请求的队列管理，支持并发限制、优先级
 *
 * @example
 * const { addRequest, cancelByKey } = useRequestQueue({
 *   concurrency: 2,
 * })
 *
 * addRequest(() => request.get('/api/item/1'), { key: 'item-1' })
 */

/** 请求队列配置 */
export interface UseRequestQueueOptions extends UseQueueOptions {
  /** 请求实例 */
  request?: unknown
}

/** 请求队列返回 */
export interface UseRequestQueueReturn {
  tasks: ReturnType<typeof useQueue>['tasks']
  pendingTasks: ReturnType<typeof useQueue>['pendingTasks']
  runningTasks: ReturnType<typeof useQueue>['runningTasks']
  completedTasks: ReturnType<typeof useQueue>['completedTasks']
  failedTasks: ReturnType<typeof useQueue>['failedTasks']
  isRunning: ReturnType<typeof useQueue>['isRunning']
  isEmpty: ReturnType<typeof useQueue>['isEmpty']
  isAllComplete: ReturnType<typeof useQueue>['isAllComplete']
  completedCount: ReturnType<typeof useQueue>['completedCount']
  totalCount: ReturnType<typeof useQueue>['totalCount']
  addRequest: <T = unknown>(
    requestFn: () => Promise<T>,
    options?: {
      key?: string
      priority?: number
      delay?: number
      metadata?: Record<string, unknown>
    }
  ) => string
  cancelByKey: (key: string) => void
  remove: (taskId: string) => void
  clear: () => void
  start: () => void
  pause: () => void
  resume: () => void
  cancel: (taskId: string) => void
  cancelAll: () => void
  retry: (taskId: string) => void
  retryAll: () => void
  getTask: (taskId: string) => QueueTask | undefined
}

/**
 * useRequestQueue - HTTP 请求队列 Hook
 */
export function useRequestQueue(options: UseRequestQueueOptions = {}): UseRequestQueueReturn {
  const { request: _customRequest, ...queueOptions } = options

  const queue = useQueue(queueOptions)

  const addRequest = <T = unknown>(
    requestFn: () => Promise<T>,
    addOptions: {
      key?: string
      priority?: number
      delay?: number
      metadata?: Record<string, unknown>
    } = {}
  ): string => {
    return queue.add(requestFn, {
      ...addOptions,
      metadata: {
        ...addOptions.metadata,
        type: 'request'
      }
    })
  }

  const cancelByKey = (key: string): void => {
    const pending = (queue.pendingTasks as { value: QueueTask[] }).value ?? []
    const running = (queue.runningTasks as { value: QueueTask[] }).value ?? []
    const task = [...pending, ...running].find((t) => t.key === key)
    if (task) {
      queue.cancel(task.id)
    }
  }

  return {
    ...queue,
    addRequest,
    cancelByKey
  }
}
