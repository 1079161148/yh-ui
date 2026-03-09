# useRequestQueue

`useRequestQueue` 是一个专用于 **HTTP 请求队列管理** 的 Hook，基于 `useQueue` 封装，提供更便捷的请求级别队列控制。支持并发限制、任务取消、优先级、失败重试等企业级请求场景。

## 基础用法

```typescript
import { useRequestQueue } from '@yh-ui/request'

const {
  tasks, // 所有任务
  pendingTasks, // 待执行
  runningTasks, // 执行中
  completedTasks, // 已完成
  failedTasks, // 失败
  isRunning,
  isEmpty,
  isAllComplete,
  addRequest,
  cancelByKey,
  start,
  pause,
  resume,
  clear,
  retry,
  retryAll
} = useRequestQueue({
  concurrency: 3, // 最大并发数
  autoStart: true, // 添加任务后自动开始
  continueOnError: false // 任务失败时是否继续执行
})
```

## 添加请求

```typescript
// 添加 GET 请求
const taskId = addRequest(() => request.get('/api/user/1'), {
  key: 'user-1', // 用于取消和去重
  priority: 10, // 优先级，越大越先执行
  delay: 1000, // 延迟 1s 后执行
  metadata: { type: 'fetch' }
})

// 添加 POST 请求
addRequest(() => request.post('/api/order', { id: 123 }), { key: 'order-123' })
```

## 按 key 取消请求

```typescript
// 根据 key 取消特定请求
cancelByKey('user-1')

// 场景：用户快速切换标签页时，取消上一个标签页的请求
const loadUser = (userId: string) => {
  cancelByKey('current-user') // 取消之前的请求
  addRequest(() => request.get(`/api/user/${userId}`), { key: 'current-user' })
}
```

## 并发控制

```typescript
const { addRequest, isRunning, pause, resume } = useRequestQueue({
  concurrency: 2, // 最多同时 2 个请求
  autoStart: true
})

// 添加 10 个请求，但最多只有 2 个并发执行
for (let i = 1; i <= 10; i++) {
  addRequest(() => request.get(`/api/item/${i}`))
}

// 动态控制
const handlePause = () => pause()
const handleResume = () => resume()
```

## 错误处理与重试

```typescript
const { failedTasks, retry, retryAll, addRequest } = useRequestQueue({
  concurrency: 2,
  continueOnError: true, // 单个请求失败时不阻塞其他请求
  onTaskError: (task, error) => {
    console.error('请求失败:', task.key, error)
    YhMessage.error(`请求失败: ${task.key}`)
  },
  onAllComplete: (tasks) => {
    console.log(`全部完成: ${tasks.length} 个任务`)
  }
})

// 重试单个失败请求
retry(taskId)

// 重试所有失败请求
retryAll()
```

## 完整 API

### 配置项

| 参数              | 类型                    | 默认值  | 说明                               |
| ----------------- | ----------------------- | ------- | ---------------------------------- |
| `concurrency`     | `number`                | `1`     | 最大并发数                         |
| `autoStart`       | `boolean`               | `true`  | 添加任务后自动开始执行             |
| `continueOnError` | `boolean`               | `false` | 单个任务失败时是否继续执行后续任务 |
| `onTaskComplete`  | `(task) => void`        | -       | 任务完成回调                       |
| `onTaskError`     | `(task, error) => void` | -       | 任务失败回调                       |
| `onAllComplete`   | `(tasks) => void`       | -       | 全部任务完成回调                   |

### 返回值

| 属性/方法                        | 说明                      |
| -------------------------------- | ------------------------- |
| `tasks`                          | 所有任务列表              |
| `pendingTasks`                   | 待执行任务                |
| `runningTasks`                   | 执行中任务                |
| `completedTasks`                 | 已完成任务                |
| `failedTasks`                    | 失败任务                  |
| `isRunning`                      | 队列是否正在运行          |
| `isEmpty`                        | 队列是否为空              |
| `isAllComplete`                  | 是否全部完成              |
| `completedCount`                 | 已完成任务数              |
| `totalCount`                     | 总任务数                  |
| `addRequest(requestFn, options)` | 添加请求任务，返回任务 ID |
| `cancelByKey(key)`               | 根据 key 取消请求         |
| `remove(taskId)`                 | 移除指定任务              |
| `clear()`                        | 清空队列                  |
| `start()`                        | 开始执行队列              |
| `pause()`                        | 暂停队列                  |
| `resume()`                       | 恢复队列                  |
| `cancel(taskId)`                 | 取消指定任务              |
| `cancelAll()`                    | 取消所有任务              |
| `retry(taskId)`                  | 重试指定任务              |
| `retryAll()`                     | 重试所有失败任务          |
| `getTask(taskId)`                | 获取指定任务信息          |

## 与 useQueue 的区别

| 特性        | useQueue             | useRequestQueue                  |
| ----------- | -------------------- | -------------------------------- |
| 适用场景    | 通用任务队列         | 专用于 HTTP 请求                 |
| 添加任务    | `add(task, options)` | `addRequest(requestFn, options)` |
| 按 key 取消 | 需手动实现           | `cancelByKey(key)` 原生支持      |
| 元数据      | 手动设置             | 自动标记 `type: 'request'`       |

## 典型场景

### 批量导出

```typescript
const exportQueue = useRequestQueue({
  concurrency: 2,
  autoStart: true,
  onTaskComplete: (task) => {
    YhMessage.success(`导出成功: ${task.metadata?.name}`)
  },
  onTaskError: (task) => {
    YhMessage.error(`导出失败: ${task.metadata?.name}`)
  }
})

const startExport = (ids: string[]) => {
  ids.forEach((id) => {
    exportQueue.addRequest(() => request.get('/api/export', { params: { id } }), {
      key: `export-${id}`,
      metadata: { name: `导出-${id}` }
    })
  })
}
```

### 文件上传队列

```typescript
const uploadQueue = useRequestQueue({
  concurrency: 3,
  autoStart: true,
  onTaskComplete: (task) => {
    console.log(`上传成功: ${task.metadata?.fileName}`)
  }
})

const handleUpload = (files: FileList) => {
  Array.from(files).forEach((file) => {
    uploadQueue.addRequest(
      async () => {
        const formData = new FormData()
        formData.append('file', file)
        return await request.post('/api/upload', formData)
      },
      {
        key: file.name,
        metadata: { fileName: file.name }
      }
    )
  })
}
```

### 请求防抖与取消

```typescript
const searchQueue = useRequestQueue({
  concurrency: 1,
  autoStart: true
})

const handleSearch = (keyword: string) => {
  // 自动取消上一次的搜索请求
  searchQueue.cancelByKey('search')

  searchQueue.addRequest(() => request.get('/api/search', { params: { q: keyword } }), {
    key: 'search'
  })
}
```
