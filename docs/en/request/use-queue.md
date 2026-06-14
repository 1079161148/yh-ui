# useQueue

`useQueue` is a general-purpose **task queue management Hook** for controlling request concurrency, sequencing tasks, failure retries, and more. It is especially suitable for enterprise scenarios like batch export, bulk operations, and file uploads.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueue } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ====== Demo 1: Basic Concurrency Control ======
const {
  tasks: basicTasks,
  pendingTasks: basicPending,
  runningTasks: basicRunning,
  completedTasks: basicCompleted,
  completedCount: basicCompletedCount,
  totalCount: basicTotal,
  isAllComplete: basicAllDone,
  isRunning: basicIsRunning,
  add: basicAdd,
  start: basicStart,
  pause: basicPause,
  resume: basicResume,
  clear: basicClear
} = useQueue({
  concurrency: 2,
  autoStart: false,
  continueOnError: true
})

const addBasicTasks = () => {
  basicClear()
  for (let i = 1; i <= 6; i++) {
    const delay = 800 + Math.random() * 1200
    basicAdd(async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
      return `Task ${i} done`
    }, { metadata: { name: `Task ${i}`, duration: Math.round(delay) } })
  }
}

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: '#909399', running: '#409eff',
    fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c'
  }
  return map[status] || '#909399'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: 'Pending', running: 'Running',
    fulfilled: 'Done', rejected: 'Failed', canceled: 'Canceled'
  }
  return map[status] || status
}

// ====== Demo 2: Priority & Retry ======
const {
  tasks: retryTasks,
  failedTasks: retryFailed,
  add: retryAdd,
  start: retryStart,
  clear: retryClear,
  retryAll: retryAllFn
} = useQueue({
  concurrency: 3,
  autoStart: false,
  continueOnError: true
})

const addRetryTasks = () => {
  retryClear()
  // High-priority tasks
  for (let i = 1; i <= 3; i++) {
    retryAdd(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      return `High-priority ${i}`
    }, { priority: 10, metadata: { name: `⭐ High-priority ${i}` } })
  }
  // Low-priority tasks (task 2 will fail)
  for (let i = 1; i <= 3; i++) {
    retryAdd(async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      if (i === 2) throw new Error('Simulated failure')
      return `Normal ${i}`
    }, { priority: 1, metadata: { name: `Normal ${i}` } })
  }
}

const tsQueueDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="addAndStart">Add 6 tasks & Run</yh-button>
      <yh-button @click="pause" :disabled="!isRunning">Pause</yh-button>
      <yh-button type="success" @click="resume">Resume</yh-button>
      <yh-button type="danger" @click="clear">Clear</yh-button>
      <yh-tag :type="isRunning ? 'primary' : (isAllComplete ? 'success' : 'info')">
        {{ isRunning ? 'Running (concurrency ≤ 2)' : (isAllComplete ? 'All Done ✓' : 'Idle') }}
      </yh-tag>
    </div>

    <div v-if="totalCount > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        Progress: {{ completedCount }} / {{ totalCount }}
      </div>
      <yh-progress :percentage="totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0" />
    </div>

    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px">
      <div v-for="task in tasks" :key="task.id"
        style="padding:10px 12px; border-radius:8px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
        <div style="font-weight:500; margin-bottom:4px">{{ task.metadata?.name }}</div>
        <div :style="{ color: statusColor(task.status), fontSize: '12px' }">
          ● {{ statusText(task.status) }}
        </div>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useQueue } from '@yh-ui/request'

const {
  tasks, completedCount, totalCount,
  isRunning, isAllComplete,
  add, start, pause, resume, clear
} = useQueue({ concurrency: 2, autoStart: false, continueOnError: true })

const addAndStart = () => {
  clear()
  for (let i = 1; i <= 6; i++) {
    add(async () => {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))
    }, { metadata: { name: \`Task \${i}\` } })
  }
  start()
}

const statusText = (s: string) =>
  ({ pending: 'Pending', running: 'Running', fulfilled: 'Done', rejected: 'Failed', canceled: 'Canceled' }[s] || s)
const statusColor = (s: string) =>
  ({ pending: '#909399', running: '#409eff', fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c' }[s] || '#909399')
</${_S}>`
</script>

## Basic Concurrency Control

Run 6 tasks with a concurrency limit of 2. The queue demo shows real-time state transitions.

<DemoBlock title="Task Queue Concurrency Demo" :ts-code="tsQueueDemo" :js-code="toJs(tsQueueDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addBasicTasks(); basicStart() }">Add 6 tasks & Run</yh-button>
      <yh-button @click="basicPause" :disabled="!basicIsRunning">Pause</yh-button>
      <yh-button type="success" @click="basicResume">Resume</yh-button>
      <yh-button type="danger" @click="basicClear">Clear</yh-button>
      <yh-tag :type="basicIsRunning ? 'primary' : (basicAllDone ? 'success' : 'info')">
        {{ basicIsRunning ? 'Running (concurrency ≤ 2)' : (basicAllDone ? 'All Done ✓' : 'Idle') }}
      </yh-tag>
    </div>
    <div v-if="basicTotal > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        Progress: {{ basicCompletedCount }} / {{ basicTotal }}
        &nbsp;·&nbsp;Pending: {{ basicPending.length }}
        &nbsp;·&nbsp;Running: {{ basicRunning.length }}
        &nbsp;·&nbsp;Done: {{ basicCompleted.length }}
      </div>
      <yh-progress :percentage="basicTotal > 0 ? Math.round(basicCompletedCount / basicTotal * 100) : 0" />
    </div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px">
      <div v-for="t in basicTasks" :key="t.id"
        style="padding:10px 12px; border-radius:8px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px; transition:all 0.3s">
        <div style="font-weight:500; margin-bottom:4px">{{ t.metadata?.name }}</div>
        <div style="font-size:11px; color:var(--yh-text-color-placeholder)">~{{ t.metadata?.duration }}ms</div>
        <div :style="{ color: getStatusColor(t.status), fontSize: '12px', marginTop:'4px' }">
          ● {{ getStatusText(t.status) }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Options

| Option            | Type                    | Default | Description                                       |
| ----------------- | ----------------------- | ------- | ------------------------------------------------- |
| `concurrency`     | `number`                | `1`     | Max number of tasks running simultaneously        |
| `autoStart`       | `boolean`               | `true`  | Whether to auto-start after adding a task         |
| `continueOnError` | `boolean`               | `false` | Whether to continue the queue when a task fails   |
| `onTaskComplete`  | `(task) => void`        | -       | Callback when a single task completes             |
| `onTaskError`     | `(task, error) => void` | -       | Callback when a single task fails                 |
| `onAllComplete`   | `(tasks) => void`       | -       | Callback when all tasks in the queue are finished |

## Priority Sorting & Failure Retry

High-priority tasks execute first. Failed tasks can be retried individually or all at once.

<DemoBlock title="Priority & Retry Demo">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addRetryTasks(); retryStart() }">Add tasks (includes 1 failure)</yh-button>
      <yh-button type="warning" @click="retryAllFn" :disabled="retryFailed.length === 0">Retry All Failed</yh-button>
      <yh-button type="danger" @click="retryClear">Clear</yh-button>
    </div>
    <div v-if="retryTasks.length > 0" style="display:flex; flex-direction:column; gap:6px">
      <div v-for="t in retryTasks" :key="t.id"
        style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; background:var(--yh-bg-color-page); font-size:13px">
        <span>{{ t.metadata?.name }}</span>
        <div style="display:flex; align-items:center; gap:8px">
          <yh-tag v-if="t.priority && t.priority >= 10" type="warning" size="small">High Priority</yh-tag>
          <span :style="{ color: getStatusColor(t.status), fontSize:'12px' }">
            ● {{ getStatusText(t.status) }}
          </span>
          <span v-if="t.error" style="font-size:11px; color:var(--yh-color-danger)">{{ t.error?.message }}</span>
        </div>
      </div>
    </div>
    <div v-else style="color:var(--yh-text-color-placeholder); font-size:13px; padding:20px 0; text-align:center">
      Click the button to add tasks
    </div>
  </div>
</DemoBlock>

## Task Structure

```typescript
interface QueueTask<T = unknown> {
  id: string
  key?: string // Deduplication key
  task: (options: { signal: AbortSignal }) => Promise<T>
  priority?: number // Higher = runs first
  status: 'pending' | 'running' | 'fulfilled' | 'rejected' | 'canceled'
  result?: T
  error?: Error
  metadata?: Record<string, unknown>
  createdAt: number
  startTime?: number
  endTime?: number
  delay?: number // Delay before execution (ms)
}
```

## Adding Tasks

```typescript
const taskId = add(
  async ({ signal }) => {
    const res = await request.get('/api/report/1', { signal })
    return res.data
  },
  {
    key: 'report-1', // Used for deduplication / cancellation
    priority: 10, // Higher number = higher priority
    delay: 1000, // Wait 1s before starting
    metadata: { type: 'report' }
  }
)

start()
```

## Concurrency Control

```typescript
const { add, start, pause, resume, isRunning } = useQueue({
  concurrency: 5, // Max 5 tasks simultaneously
  autoStart: true
})

for (let i = 0; i < 100; i++) {
  add(() => request.get(`/api/item/${i}`).then((res) => res.data))
}
```

## Error & Retry

```typescript
const { failedTasks, retry, retryAll } = useQueue({
  concurrency: 2,
  continueOnError: true,
  onTaskError: (task, error) => {
    console.error('Task failed:', task.id, error)
  },
  onAllComplete: (tasks) => {
    console.log('All tasks done:', tasks.length)
  }
})

retry(taskId) // Retry a single task
retryAll() // Retry all failed tasks
```

## API Reference

| Method / State                                                     | Description                 |
| ------------------------------------------------------------------ | --------------------------- |
| `add(task, options)`                                               | Add a task, returns task ID |
| `remove(taskId)`                                                   | Remove a task               |
| `clear()`                                                          | Clear the entire queue      |
| `start()`                                                          | Start processing the queue  |
| `pause()` / `resume()`                                             | Pause / resume processing   |
| `cancel(taskId)` / `cancelAll()`                                   | Cancel task(s)              |
| `retry(taskId)` / `retryAll()`                                     | Retry failed task(s)        |
| `getTask(taskId)`                                                  | Get a task by ID            |
| `pendingTasks` / `runningTasks` / `completedTasks` / `failedTasks` | Task lists by state         |
| `isRunning` / `isEmpty` / `isAllComplete`                          | Overall queue state         |
| `completedCount` / `totalCount`                                    | Completion / total count    |

## Advanced: useRequestQueue

The library also provides `useRequestQueue`, which wraps `useQueue` with HTTP-request-level conveniences (built-in `addRequest()` and `cancelByKey()`). See the [useRequestQueue](./use-request-queue) page for more.
