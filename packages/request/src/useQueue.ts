import { ref, reactive, computed, onUnmounted, type Ref, type ComputedRef } from 'vue'

// ==================== 类型定义 ====================

/** 队列任务状态 */
export type QueueTaskStatus = 'pending' | 'running' | 'fulfilled' | 'rejected' | 'canceled'

/** 队列任务 */
export interface QueueTask<T = unknown> {
  /** 任务 ID */
  id: string
  /** 任务 key（用于去重） */
  key?: string
  /** 任务函数 */
  task: () => Promise<T>
  /** 任务优先级（数字越大优先级越高） */
  priority?: number
  /** 任务状态 */
  status: QueueTaskStatus
  /** 任务结果 */
  result?: T
  /** 任务错误 */
  error?: Error
  /** 任务元数据 */
  metadata?: Record<string, unknown>
  /** 开始时间 */
  startTime?: number
  /** 结束时间 */
  endTime?: number
  /** 延迟时间 (ms) */
  delay?: number
  /** 创建时间 */
  createdAt: number
}

/** 队列配置 */
export interface UseQueueOptions {
  /** 最大并发数 */
  concurrency?: number
  /** 是否自动开始 */
  autoStart?: boolean
  /** 任务失败时是否继续 */
  continueOnError?: boolean
  /** 任务完成回调 */
  onTaskComplete?: <T>(task: QueueTask<T>) => void
  /** 任务错误回调 */
  onTaskError?: <T>(task: QueueTask<T>, error: Error) => void
  /** 所有任务完成回调 */
  onAllComplete?: <T>(tasks: QueueTask<T>[]) => void
}

/** 添加任务选项 */
export interface AddTaskOptions {
  key?: string
  priority?: number
  delay?: number
  metadata?: Record<string, unknown>
}

/** 队列 Hook 返回值 */
export interface UseQueueReturn<T = unknown> {
  /** 队列任务列表 */
  tasks: ComputedRef<QueueTask<T>[]>
  /** 待执行的任务 */
  pendingTasks: ComputedRef<QueueTask<T>[]>
  /** 正在执行的任务 */
  runningTasks: ComputedRef<QueueTask<T>[]>
  /** 已完成的任务 */
  completedTasks: ComputedRef<QueueTask<T>[]>
  /** 失败的任务 */
  failedTasks: ComputedRef<QueueTask<T>[]>
  /** 队列是否正在运行 */
  isRunning: Ref<boolean>
  /** 队列是否为空 */
  isEmpty: ComputedRef<boolean>
  /** 队列是否全部完成 */
  isAllComplete: ComputedRef<boolean>
  /** 已完成数量 */
  completedCount: ComputedRef<number>
  /** 总数量 */
  totalCount: ComputedRef<number>
  /** 添加任务 */
  add: <R = unknown>(task: () => Promise<R>, options?: AddTaskOptions) => string
  /** 移除任务 */
  remove: (taskId: string) => void
  /** 清空队列 */
  clear: () => void
  /** 开始执行队列 */
  start: () => void
  /** 暂停队列 */
  pause: () => void
  /** 继续队列 */
  resume: () => void
  /** 取消任务 */
  cancel: (taskId: string) => void
  /** 取消所有任务 */
  cancelAll: () => void
  /** 重试任务 */
  retry: (taskId: string) => void
  /** 重试所有失败任务 */
  retryAll: () => void
  /** 获取任务 */
  getTask: (taskId: string) => QueueTask<T> | undefined
}

// ==================== 工具函数 ====================

/**
 * 生成唯一 ID
 */
let taskIdCounter = 0
function generateTaskId(): string {
  return `task_${Date.now()}_${++taskIdCounter}`
}

// ==================== 队列 Hook ====================

/**
 * useQueue - 请求队列管理 Hook
 *
 * 支持并发控制、优先级、延迟执行、失败重试等功能
 *
 * @example
 * const {
 *   tasks, pendingTasks, runningTasks, isRunning,
 *   add, remove, start, pause, clear
 * } = useQueue({
 *   concurrency: 3,
 *   autoStart: true,
 * })
 *
 * // 添加任务
 * add(async () => {
 *   const res = await request.get('/api/item/1')
 *   return res.data
 * }, { priority: 1 })
 */
export function useQueue<T = unknown>(options: UseQueueOptions = {}): UseQueueReturn<T> {
  const {
    concurrency = 1,
    autoStart = false,
    continueOnError = false,
    onTaskComplete,
    onTaskError,
    onAllComplete
  } = options

  // 任务存储 (使用 reactive 获得深层响应式支持)
  const taskList = reactive<QueueTask<unknown>[]>([])

  // 快速查找 Map
  const taskMap = new Map<string, QueueTask<unknown>>()

  // 状态
  const isRunning = ref(false)
  const isPaused = ref(false)
  const currentTaskIds = new Set<string>()
  const version = ref(0) // 用于强制触发响应式更新

  const triggerUpdate = () => {
    version.value++
  }

  // 计算属性
  const tasks = computed(() => {
    void version.value
    return [...taskList] as QueueTask<T>[]
  })

  const pendingTasks = computed(() =>
    tasks.value
      .filter((t) => t.status === 'pending')
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  )

  const runningTasks = computed(() => tasks.value.filter((t) => t.status === 'running'))

  const completedTasks = computed(() => tasks.value.filter((t) => t.status === 'fulfilled'))

  const failedTasks = computed(() => tasks.value.filter((t) => t.status === 'rejected'))

  const isEmpty = computed(() => tasks.value.length === 0)

  const isAllComplete = computed(() => {
    if (tasks.value.length === 0) return false
    return tasks.value.every((t) => t.status === 'fulfilled' || t.status === 'rejected')
  })

  const completedCount = computed(() => completedTasks.value.length)
  const totalCount = computed(() => tasks.value.length)

  // 执行任务
  const executeTask = async <R>(task: QueueTask<R>): Promise<void> => {
    // console.log('executeTask start', task.id, task.status)
    if (task.status === 'canceled' || task.status === 'running') return

    // 更新状态
    task.status = 'running'
    task.startTime = Date.now()
    currentTaskIds.add(task.id)
    triggerUpdate()

    try {
      // 延迟执行
      if (task.delay && task.delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, task.delay))
      }

      // 执行任务 - 需要重新检查状态，因为可能在中途被取消
      if ((task.status as QueueTaskStatus) === 'canceled') return

      const result = await task.task()

      if ((task.status as QueueTaskStatus) === 'canceled') return

      // 更新状态
      task.status = 'fulfilled'
      task.result = result
      task.endTime = Date.now()
      triggerUpdate()

      // 回调
      onTaskComplete?.(task)
    } catch (error) {
      task.status = 'rejected'
      task.error = error instanceof Error ? error : new Error(String(error))
      task.endTime = Date.now()
      triggerUpdate()

      // 回调
      onTaskError?.(task, task.error)

      // 如果不继续，暂停队列
      if (!continueOnError) {
        pause()
      }
    } finally {
      currentTaskIds.delete(task.id)
    }
  }

  // 处理队列
  const processQueue = (): void => {
    if (isPaused.value || !isRunning.value) return

    // 检查并发数并启动任务
    let launched = 0
    const available = concurrency - currentTaskIds.size

    if (available <= 0) return

    // 获取当前待执行任务，手动过滤和排序以确保最新状态
    const pending = taskList
      .filter((t) => t.status === 'pending')
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))

    for (let i = 0; i < pending.length && launched < available; i++) {
      const nextTask = pending[i]
      if (nextTask) {
        launched++
        executeTask(nextTask).finally(() => {
          if (isRunning.value && !isPaused.value) {
            setTimeout(processQueue, 0)
          }
        })
      }
    }

    // 没有更多任务
    if (currentTaskIds.size === 0 && pending.length === 0 && isRunning.value) {
      isRunning.value = false
      onAllComplete?.(tasks.value)
    }
  }

  // 添加任务
  const add = <R = unknown>(task: () => Promise<R>, addOptions: AddTaskOptions = {}): string => {
    const id = generateTaskId()
    const newTask: QueueTask<R> = {
      id,
      key: addOptions.key,
      task,
      priority: addOptions.priority,
      delay: addOptions.delay,
      metadata: addOptions.metadata,
      status: 'pending',
      createdAt: Date.now()
    }

    taskMap.set(id, newTask as QueueTask<unknown>)
    taskList.push(newTask as QueueTask<unknown>)
    triggerUpdate()

    // 自动开始
    if (autoStart && !isRunning.value) {
      start()
    } else if (isRunning.value && !isPaused.value) {
      // 队列正在运行时，尝试执行新任务
      setTimeout(processQueue, 0)
    }

    return id
  }

  // 移除任务
  const remove = (taskId: string): void => {
    const task = taskMap.get(taskId)
    if (task && task.status === 'pending') {
      task.status = 'canceled'
      taskMap.delete(taskId)
      const index = taskList.findIndex((t) => t.id === taskId)
      if (index > -1) taskList.splice(index, 1)
      triggerUpdate()
    }
  }

  // 清空队列
  const clear = (): void => {
    // 取消所有待执行和正在执行的任务
    taskMap.forEach((task) => {
      if (task.status === 'pending' || task.status === 'running') {
        task.status = 'canceled'
      }
    })
    taskMap.clear()
    taskList.length = 0
    currentTaskIds.clear()
    isRunning.value = false
    triggerUpdate()
  }

  // 开始执行
  const start = (): void => {
    if (isRunning.value) return

    isRunning.value = true
    isPaused.value = false
    processQueue()
  }

  // 暂停队列
  const pause = (): void => {
    isPaused.value = true
  }

  // 继续队列
  const resume = (): void => {
    isPaused.value = false
    if (!isRunning.value) {
      start()
    } else {
      processQueue()
    }
  }

  // 取消任务
  const cancel = (taskId: string): void => {
    const task = taskMap.get(taskId)
    if (task) {
      if (task.status === 'pending') {
        task.status = 'canceled'
        taskMap.delete(taskId)
        const index = taskList.findIndex((t) => t.id === taskId)
        if (index > -1) taskList.splice(index, 1)
        triggerUpdate()
      } else if (task.status === 'running') {
        task.status = 'canceled'
        triggerUpdate()
      }
    }
  }

  // 取消所有任务
  const cancelAll = (): void => {
    taskMap.forEach((task) => {
      if (task.status === 'pending' || task.status === 'running') {
        task.status = 'canceled'
      }
    })
    currentTaskIds.clear()
    isRunning.value = false
    triggerUpdate()
  }

  // 重试任务
  const retry = (taskId: string): void => {
    const task = taskMap.get(taskId)
    if (task && (task.status === 'rejected' || task.status === 'canceled')) {
      task.status = 'pending'
      task.error = undefined
      task.result = undefined
      task.startTime = undefined
      task.endTime = undefined
      version.value++
      // triggerRef(taskList) // Removed triggerRef

      if (isRunning.value && !isPaused.value) {
        setTimeout(processQueue, 0)
      }
    }
  }

  // 重试所有失败任务
  const retryAll = (): void => {
    taskMap.forEach((task) => {
      if (task.status === 'rejected' || task.status === 'canceled') {
        task.status = 'pending'
        task.error = undefined
        task.result = undefined
        task.startTime = undefined
      }
    })
    triggerUpdate()

    if (!isRunning.value) {
      start()
    } else if (isPaused.value) {
      resume()
    }
  }

  // 获取任务
  const getTask = (taskId: string): QueueTask<T> | undefined => {
    return taskMap.get(taskId) as QueueTask<T> | undefined
  }

  // 清理
  onUnmounted(() => {
    cancelAll()
  })

  return {
    tasks,
    pendingTasks,
    runningTasks,
    completedTasks,
    failedTasks,
    isRunning,
    isEmpty,
    isAllComplete,
    completedCount,
    totalCount,
    add,
    remove,
    clear,
    start,
    pause,
    resume,
    cancel,
    cancelAll,
    retry,
    retryAll,
    getTask
  }
}
