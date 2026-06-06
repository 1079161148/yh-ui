# useQueue

`useQueue` is a general-purpose **task queue management Hook** used to control request concurrency, queue task execution, failure retry and other scenarios, especially suitable for enterprise application requirements like import/export and batch operations.

## Basic Usage

```typescript
import { useQueue } from '@yh-ui/request'

const {
  tasks, // All tasks
  pendingTasks, // Pending tasks
  runningTasks, // Running tasks
  completedTasks, // Completed tasks
  failedTasks, // Failed tasks
  isRunning,
  add,
  start,
  pause,
  resume,
  clear,
  retry,
  retryAll
} = useQueue({
  concurrency: 3, // Max concurrent tasks
  autoStart: false, // Whether to auto start
  continueOnError: false // Whether to continue when task fails
})
```

## Options

| Option            | Type                    | Default | Description                        |
| ----------------- | ----------------------- | ------- | ---------------------------------- |
| `concurrency`     | `number`                | `1`     | Max concurrent tasks               |
| `autoStart`       | `boolean`               | `true`  | Auto start when tasks are added    |
| `continueOnError` | `boolean`               | `false` | Continue running when a task fails |
| `onTaskComplete`  | `(task) => void`        | -       | Callback when a task completes     |
| `onTaskError`     | `(task, error) => void` | -       | Callback when a task fails         |
| `onAllComplete`   | `(tasks) => void`       | -       | Callback when all tasks complete   |

## Queue Task Structure

```typescript
interface QueueTask<T = unknown> {
  id: string
  key?: string // Task deduplication key
  task: () => Promise<T> // Actual execution function
  priority?: number // Priority (higher number executes first)
  status: 'pending' | 'running' | 'fulfilled' | 'rejected' | 'canceled'
  result?: T
  error?: Error
  metadata?: Record<string, unknown>
  createdAt: number
  startTime?: number
  endTime?: number
  delay?: number // Delayed execution time (ms)
}
```

## Add Tasks

```typescript
// Add a request task
const taskId = add(
  async () => {
    const res = await request.get('/api/report/1')
    return res.data
  },
  {
    key: 'report-1', // Same key can be used for business deduplication
    priority: 10, // Priority, higher executes first
    delay: 1000, // Delay 1s before execution
    metadata: { type: 'report' }
  }
)

// Start queue execution
start()
```

## Control Concurrency

```typescript
const { add, start, pause, resume, isRunning } = useQueue({
  concurrency: 5, // Max 5 tasks at the same time
  autoStart: true
})

// Add 100 request tasks
for (let i = 0; i < 100; i++) {
  add(() => request.get(`/api/item/${i}`).then((res) => res.data))
}
```

## Error and Retry

```typescript
const { failedTasks, retry, retryAll } = useQueue({
  concurrency: 2,
  continueOnError: true, // Continue executing other tasks when one fails
  onTaskError: (task, error) => {
    console.error('Task failed:', task.id, error)
  },
  onAllComplete: (tasks) => {
    console.log('All tasks completed:', tasks.length)
  }
})

// Retry single task
retry(taskId)

// Retry all failed tasks
retryAll()
```

## Combine with Requests

### Batch Export

```typescript
const exportIds = ref<string[]>([])

const queue = useQueue({
  concurrency: 2,
  autoStart: true,
  onTaskComplete: (task) => {
    YhMessage.success(`Export successful: ${task.metadata?.name}`)
  },
  onTaskError: (task, error) => {
    YhMessage.error(`Export failed: ${task.metadata?.name}`)
  }
})

const startExport = () => {
  exportIds.value.forEach((id) => {
    queue.add(
      async () => {
        const res = await request.get('/api/export', { params: { id } })
        // Trigger browser download...
        return res.data
      },
      {
        key: id,
        priority: 1,
        metadata: { name: `Task ${id}` }
      }
    )
  })
}
```

### Upload Queue

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

## Common API Overview

| Method / State                                                     | Description                    |
| ------------------------------------------------------------------ | ------------------------------ |
| `add(task, options)`                                               | Add task, returns task ID      |
| `remove(taskId)`                                                   | Remove task                    |
| `clear()`                                                          | Clear queue                    |
| `start()`                                                          | Start queue execution          |
| `pause()` / `resume()`                                             | Pause / Resume queue           |
| `cancel(taskId)` / `cancelAll()`                                   | Cancel task                    |
| `retry(taskId)` / `retryAll()`                                     | Retry task                     |
| `getTask(taskId)`                                                  | Get task by ID                 |
| `pendingTasks` / `runningTasks` / `completedTasks` / `failedTasks` | Task lists of different states |
| `isRunning` / `isEmpty` / `isAllComplete`                          | Overall queue state            |
| `completedCount` / `totalCount`                                    | Completed count / Total count  |

## Advanced: Combine with useRequestQueue

The source also provides `useRequestQueue` (not expanded in this document), which adds encapsulation for request level on top of `useQueue`, suitable for further abstracting complex business. You can directly combine `useQueue` + `request` to complete most queue/concurrency scenarios.
