# useQueue

`useQueue` 是一个通用的 **任务队列管理 Hook**，可用于控制请求并发、排队执行任务、失败重试等场景，特别适合导入导出、大批量操作等企业应用需求。

## 基础用法

```typescript
import { useQueue } from '@yh-ui/request'

const {
  tasks, // 所有任务
  pendingTasks, // 待执行
  runningTasks, // 执行中
  completedTasks, // 已完成
  failedTasks, // 失败
  isRunning,
  add,
  start,
  pause,
  resume,
  clear,
  retry,
  retryAll
} = useQueue({
  concurrency: 3, // 最大并发数
  autoStart: false, // 是否自动开始
  continueOnError: false // 是否在任务失败时继续执行
})
```

## 配置项

| 参数              | 类型                    | 默认值  | 说明                               |
| ----------------- | ----------------------- | ------- | ---------------------------------- |
| `concurrency`     | `number`                | `1`     | 最大并发执行任务数                 |
| `autoStart`       | `boolean`               | `true`  | 添加任务后是否自动开始执行         |
| `continueOnError` | `boolean`               | `false` | 单个任务失败时是否继续执行后续任务 |
| `onTaskComplete`  | `(task) => void`        | -       | 单个任务完成回调                   |
| `onTaskError`     | `(task, error) => void` | -       | 单个任务失败回调                   |
| `onAllComplete`   | `(tasks) => void`       | -       | 全部任务完成回调                   |

## 队列任务结构

```typescript
interface QueueTask<T = unknown> {
  id: string
  key?: string // 任务去重 key
  task: () => Promise<T> // 实际执行函数
  priority?: number // 优先级（数字越大越先执行）
  status: 'pending' | 'running' | 'fulfilled' | 'rejected' | 'canceled'
  result?: T
  error?: Error
  metadata?: Record<string, unknown>
  createdAt: number
  startTime?: number
  endTime?: number
  delay?: number // 延迟执行时间（毫秒）
}
```

## 添加任务

```typescript
// 添加一个请求任务
const taskId = add(
  async () => {
    const res = await request.get('/api/report/1')
    return res.data
  },
  {
    key: 'report-1', // 相同 key 可用于业务去重
    priority: 10, // 优先级，越大越先执行
    delay: 1000, // 延迟 1s 后执行
    metadata: { type: 'report' }
  }
)

// 开始执行队列
start()
```

## 控制并发

```typescript
const { add, start, pause, resume, isRunning } = useQueue({
  concurrency: 5, // 最多同时执行 5 个任务
  autoStart: true
})

// 添加 100 个请求任务
for (let i = 0; i < 100; i++) {
  add(() => request.get(`/api/item/${i}`).then((res) => res.data))
}
```

## 错误与重试

```typescript
const { failedTasks, retry, retryAll } = useQueue({
  concurrency: 2,
  continueOnError: true, // 单个任务失败时继续执行其他任务
  onTaskError: (task, error) => {
    console.error('任务失败:', task.id, error)
  },
  onAllComplete: (tasks) => {
    console.log('全部任务完成:', tasks.length)
  }
})

// 重试单个任务
retry(taskId)

// 重试所有失败任务
retryAll()
```

## 与请求结合

### 批量导出

```typescript
const exportIds = ref<string[]>([])

const queue = useQueue({
  concurrency: 2,
  autoStart: true,
  onTaskComplete: (task) => {
    YhMessage.success(`导出成功: ${task.metadata?.name}`)
  },
  onTaskError: (task, error) => {
    YhMessage.error(`导出失败: ${task.metadata?.name}`)
  }
})

const startExport = () => {
  exportIds.value.forEach((id) => {
    queue.add(
      async () => {
        const res = await request.get('/api/export', { params: { id } })
        // 触发浏览器下载 ...
        return res.data
      },
      {
        key: id,
        priority: 1,
        metadata: { name: `任务 ${id}` }
      }
    )
  })
}
```

### 上传队列

```typescript
const uploadQueue = useQueue({
  concurrency: 3,
  autoStart: true
})

const handleFiles = (files: FileList) => {
  Array.from(files).forEach((file) => {
    uploadQueue.add(
      async () => {
        const form = new FormData()
        form.append('file', file)
        const res = await request.post('/api/upload', form)
        return res.data
      },
      { key: file.name }
    )
  })
}
```

## 常用 API 一览

| 方法 / 状态                                                        | 说明                  |
| ------------------------------------------------------------------ | --------------------- |
| `add(task, options)`                                               | 添加任务，返回任务 ID |
| `remove(taskId)`                                                   | 移除任务              |
| `clear()`                                                          | 清空队列              |
| `start()`                                                          | 开始执行队列          |
| `pause()` / `resume()`                                             | 暂停 / 恢复队列       |
| `cancel(taskId)` / `cancelAll()`                                   | 取消任务              |
| `retry(taskId)` / `retryAll()`                                     | 重试任务              |
| `getTask(taskId)`                                                  | 根据任务 ID 获取任务  |
| `pendingTasks` / `runningTasks` / `completedTasks` / `failedTasks` | 不同状态的任务列表    |
| `isRunning` / `isEmpty` / `isAllComplete`                          | 队列整体状态          |
| `completedCount` / `totalCount`                                    | 已完成数量 / 总任务数 |

## 进阶：结合 useRequestQueue

源码中还提供了 `useRequestQueue`（未在本篇展开），在 `useQueue` 的基础上增加了对请求级别的封装，适合进一步抽象复杂业务。你可以直接组合 `useQueue` + `request` 完成大多数队列/并发场景。
