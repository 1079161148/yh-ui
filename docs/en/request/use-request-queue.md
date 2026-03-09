# useRequestQueue

`useRequestQueue` is a specialized Hook for **HTTP request queue management**, built on top of `useQueue` to provide convenient request-level queue control. It supports concurrency limits, task cancellation, priority, failure retry, and other enterprise-grade request scenarios.

## Basic Usage

```typescript
import { useRequestQueue } from '@yh-ui/request'

const {
  tasks, // All tasks
  pendingTasks, // Pending tasks
  runningTasks, // Running tasks
  completedTasks, // Completed tasks
  failedTasks, // Failed tasks
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
  concurrency: 3, // Maximum concurrent requests
  autoStart: true, // Auto-start when tasks are added
  continueOnError: false // Continue on task failure
})
```

## Adding Requests

```typescript
// Add a GET request
const taskId = addRequest(() => request.get('/api/user/1'), {
  key: 'user-1', // Used for cancellation and deduplication
  priority: 10, // Priority, higher runs first
  delay: 1000, // Delay execution by 1 second
  metadata: { type: 'fetch' }
})

// Add a POST request
addRequest(() => request.post('/api/order', { id: 123 }), { key: 'order-123' })
```

## Cancel by Key

```typescript
// Cancel a specific request by key
cancelByKey('user-1')

// Scenario: Cancel previous tab's requests when user switches tabs quickly
const loadUser = (userId: string) => {
  cancelByKey('current-user') // Cancel previous request
  addRequest(() => request.get(`/api/user/${userId}`), { key: 'current-user' })
}
```

## Concurrency Control

```typescript
const { addRequest, isRunning, pause, resume } = useRequestQueue({
  concurrency: 2, // Max 2 concurrent requests
  autoStart: true
})

// Add 10 requests, but only 2 will run concurrently
for (let i = 1; i <= 10; i++) {
  addRequest(() => request.get(`/api/item/${i}`))
}

// Dynamic control
const handlePause = () => pause()
const handleResume = () => resume()
```

## Error Handling & Retry

```typescript
const { failedTasks, retry, retryAll, addRequest } = useRequestQueue({
  concurrency: 2,
  continueOnError: true, // Don't block other requests on failure
  onTaskError: (task, error) => {
    console.error('Request failed:', task.key, error)
    YhMessage.error(`Request failed: ${task.key}`)
  },
  onAllComplete: (tasks) => {
    console.log(`All complete: ${tasks.length} tasks`)
  }
})

// Retry a single failed request
retry(taskId)

// Retry all failed requests
retryAll()
```

## Complete API

### Options

| Param             | Type                    | Default | Description                        |
| ----------------- | ----------------------- | ------- | ---------------------------------- |
| `concurrency`     | `number`                | `1`     | Maximum concurrent requests        |
| `autoStart`       | `boolean`               | `true`  | Auto-start when tasks are added    |
| `continueOnError` | `boolean`               | `false` | Continue executing on task failure |
| `onTaskComplete`  | `(task) => void`        | -       | Task complete callback             |
| `onTaskError`     | `(task, error) => void` | -       | Task error callback                |
| `onAllComplete`   | `(tasks) => void`       | -       | All tasks complete callback        |

### Return Values

| Property/Method                  | Description                       |
| -------------------------------- | --------------------------------- |
| `tasks`                          | All tasks                         |
| `pendingTasks`                   | Pending tasks                     |
| `runningTasks`                   | Running tasks                     |
| `completedTasks`                 | Completed tasks                   |
| `failedTasks`                    | Failed tasks                      |
| `isRunning`                      | Whether queue is running          |
| `isEmpty`                        | Whether queue is empty            |
| `isAllComplete`                  | Whether all tasks complete        |
| `completedCount`                 | Number of completed tasks         |
| `totalCount`                     | Total number of tasks             |
| `addRequest(requestFn, options)` | Add request task, returns task ID |
| `cancelByKey(key)`               | Cancel request by key             |
| `remove(taskId)`                 | Remove specific task              |
| `clear()`                        | Clear queue                       |
| `start()`                        | Start queue execution             |
| `pause()`                        | Pause queue                       |
| `resume()`                       | Resume queue                      |
| `cancel(taskId)`                 | Cancel specific task              |
| `cancelAll()`                    | Cancel all tasks                  |
| `retry(taskId)`                  | Retry specific task               |
| `retryAll()`                     | Retry all failed tasks            |
| `getTask(taskId)`                | Get task info by ID               |

## Difference from useQueue

| Feature       | useQueue              | useRequestQueue                    |
| ------------- | --------------------- | ---------------------------------- |
| Use Case      | Generic task queue    | HTTP requests only                 |
| Add Task      | `add(task, options)`  | `addRequest(requestFn, options)`   |
| Cancel by Key | Manual implementation | Native `cancelByKey(key)` support  |
| Metadata      | Manual setup          | Auto-marked with `type: 'request'` |

## Typical Scenarios

### Batch Export

```typescript
const exportQueue = useRequestQueue({
  concurrency: 2,
  autoStart: true,
  onTaskComplete: (task) => {
    YhMessage.success(`Export success: ${task.metadata?.name}`)
  },
  onTaskError: (task) => {
    YhMessage.error(`Export failed: ${task.metadata?.name}`)
  }
})

const startExport = (ids: string[]) => {
  ids.forEach((id) => {
    exportQueue.addRequest(() => request.get('/api/export', { params: { id } }), {
      key: `export-${id}`,
      metadata: { name: `Export-${id}` }
    })
  })
}
```

### File Upload Queue

```typescript
const uploadQueue = useRequestQueue({
  concurrency: 3,
  autoStart: true,
  onTaskComplete: (task) => {
    console.log(`Upload success: ${task.metadata?.fileName}`)
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

### Request Debouncing & Cancellation

```typescript
const searchQueue = useRequestQueue({
  concurrency: 1,
  autoStart: true
})

const handleSearch = (keyword: string) => {
  // Auto-cancel previous search request
  searchQueue.cancelByKey('search')

  searchQueue.addRequest(() => request.get('/api/search', { params: { q: keyword } }), {
    key: 'search'
  })
}
```
