# useRequestQueue

`useRequestQueue` is an HTTP-request-focused queue Hook built on top of `useQueue`. It provides concurrency control, keyed cancellation, priority execution, and failure retry — all tailored for real API request scenarios.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestQueue } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ====== Demo 1: Batch Request Queue ======
const requestLog = ref<{ text: string; type: 'success' | 'error' | 'info' }[]>([])

const {
  tasks: rqTasks,
  pendingTasks: rqPending,
  runningTasks: rqRunning,
  completedTasks: rqCompleted,
  failedTasks: rqFailed,
  completedCount: rqCompletedCount,
  totalCount: rqTotal,
  isRunning: rqIsRunning,
  addRequest: rqAddRequest,
  start: rqStart,
  pause: rqPause,
  resume: rqResume,
  clear: rqClear,
  retryAll: rqRetryAll
} = useRequestQueue({
  concurrency: 2,
  autoStart: false,
  continueOnError: true,
  onTaskComplete: (task) => {
    requestLog.value.unshift({ text: `✓ Done: ${task.metadata?.name}`, type: 'success' })
    if (requestLog.value.length > 8) requestLog.value.pop()
  },
  onTaskError: (task, err) => {
    requestLog.value.unshift({ text: `✗ Failed: ${task.metadata?.name} — ${err.message}`, type: 'error' })
    if (requestLog.value.length > 8) requestLog.value.pop()
  },
  onAllComplete: (tasks) => {
    requestLog.value.unshift({ text: `📋 Queue complete — ${tasks.length} requests`, type: 'info' })
  }
})

const addMockRequests = () => {
  rqClear()
  requestLog.value = []
  const items = [
    { name: 'User List',     delay: 700,  fail: false },
    { name: 'Order Export',  delay: 1200, fail: false },
    { name: 'Report Download', delay: 900, fail: true },  // simulated failure
    { name: 'Auth Check',    delay: 500,  fail: false },
    { name: 'Log Sync',      delay: 1100, fail: false },
    { name: 'Data Archive',  delay: 800,  fail: false }
  ]
  items.forEach(({ name, delay, fail }, idx) => {
    rqAddRequest(async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
      if (fail) throw new Error('Server Error 500')
      return { name }
    }, {
      key: `req-${idx}`,
      priority: idx === 3 ? 10 : 1,   // Auth Check has higher priority
      metadata: { name }
    })
  })
}

const getStatusColor = (status: string) => ({
  pending: '#909399', running: '#409eff',
  fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c'
}[status] || '#909399')

const getStatusText = (status: string) => ({
  pending: 'Pending', running: 'Running',
  fulfilled: 'Done', rejected: 'Failed', canceled: 'Canceled'
}[status] || status)

// ====== Demo 2: cancelByKey Search ======
const searchKeyword = ref('')
const searchResult = ref('')
const searchLoading = ref(false)

const {
  addRequest: searchAddRequest,
  cancelByKey: searchCancelByKey
} = useRequestQueue({ concurrency: 1, autoStart: true })

const handleSearch = (val: string | number) => {
  const keyword = String(val)
  searchKeyword.value = keyword
  if (!keyword.trim()) { searchResult.value = ''; searchLoading.value = false; return }
  searchCancelByKey('search')
  searchLoading.value = true
  searchAddRequest(async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    searchResult.value = keyword
      ? `Results for "${keyword}": ${Math.floor(Math.random() * 100)} items found`
      : ''
    searchLoading.value = false
  }, { key: 'search' })
}

const tsRequestQueueDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="addAndStart">Simulate 6 Requests</yh-button>
      <yh-button @click="pause" :disabled="!isRunning">Pause</yh-button>
      <yh-button type="success" @click="resume">Resume</yh-button>
      <yh-button type="warning" @click="retryAll" :disabled="failedTasks.length === 0">Retry Failed</yh-button>
      <yh-button type="danger" @click="clear">Clear</yh-button>
    </div>
    <div v-if="totalCount > 0">
      <yh-progress :percentage="totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0" />
    </div>
    <div style="display:flex; flex-direction:column; gap:6px">
      <div v-for="task in tasks" :key="task.id"
        style="display:flex; justify-content:space-between; padding:8px 12px; border-radius:6px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
        <div style="display:flex; gap:8px; align-items:center">
          <yh-tag v-if="task.priority >= 10" type="warning" size="small">High Priority</yh-tag>
          <span>{{ task.metadata?.name }}</span>
        </div>
        <div style="display:flex; gap:8px; align-items:center">
          <span v-if="task.error" style="font-size:11px; color:#f56c6c">{{ task.error?.message }}</span>
          <span :style="{ color: statusColor(task.status), fontSize:'12px' }">● {{ statusText(task.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useRequestQueue } from '@yh-ui/request'

const {
  tasks, completedCount, totalCount,
  isRunning, failedTasks,
  addRequest, start, pause, resume, clear, retryAll
} = useRequestQueue({ concurrency: 2, autoStart: false, continueOnError: true })

const addAndStart = () => {
  clear()
  const items = [
    { name: 'User List',     delay: 700,  fail: false },
    { name: 'Order Export',  delay: 1200, fail: false },
    { name: 'Report Download', delay: 900, fail: true },
    { name: 'Auth Check',    delay: 500,  fail: false },
    { name: 'Log Sync',      delay: 1100, fail: false },
    { name: 'Data Archive',  delay: 800,  fail: false }
  ]
  items.forEach(({ name, delay, fail }, idx) => {
    addRequest(async () => {
      await new Promise(r => setTimeout(r, delay))
      if (fail) throw new Error('Server Error 500')
    }, { key: \`req-\${idx}\`, priority: idx === 3 ? 10 : 1, metadata: { name } })
  })
  start()
}

const statusText = (s: string) =>
  ({ pending: 'Pending', running: 'Running', fulfilled: 'Done', rejected: 'Failed', canceled: 'Canceled' }[s] || s)
const statusColor = (s: string) =>
  ({ pending: '#909399', running: '#409eff', fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c' }[s] || '#909399')
</${_S}>`
</script>

## Basic Usage

<DemoBlock title="Batch Request Queue (Concurrency Control & Retry)" :ts-code="tsRequestQueueDemo" :js-code="toJs(tsRequestQueueDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addMockRequests(); rqStart() }">Simulate 6 requests (1 failure, 1 high priority)</yh-button>
      <yh-button @click="rqPause" :disabled="!rqIsRunning">Pause</yh-button>
      <yh-button type="success" @click="rqResume">Resume</yh-button>
      <yh-button type="warning" @click="rqRetryAll" :disabled="rqFailed.length === 0">Retry Failed</yh-button>
      <yh-button type="danger" @click="rqClear">Clear</yh-button>
    </div>
    <div v-if="rqTotal > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        Progress: {{ rqCompletedCount }} / {{ rqTotal }}
        &nbsp;·&nbsp;Pending: {{ rqPending.length }}
        &nbsp;·&nbsp;Running: {{ rqRunning.length }}
        &nbsp;·&nbsp;Failed: <span :style="{ color: rqFailed.length > 0 ? '#f56c6c' : 'inherit' }">{{ rqFailed.length }}</span>
      </div>
      <yh-progress :percentage="rqTotal > 0 ? Math.round(rqCompletedCount / rqTotal * 100) : 0" />
    </div>
    <div v-if="rqTasks.length > 0" style="display:flex; flex-direction:column; gap:6px">
      <div v-for="task in rqTasks" :key="task.id"
        style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-radius:6px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
        <div style="display:flex; align-items:center; gap:8px">
          <yh-tag v-if="task.priority && task.priority >= 10" type="warning" size="small">High Priority</yh-tag>
          <span>{{ task.metadata?.name }}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px">
          <span v-if="task.error" style="font-size:11px; color:#f56c6c">{{ task.error?.message }}</span>
          <span :style="{ color: getStatusColor(task.status), fontSize:'12px' }">● {{ getStatusText(task.status) }}</span>
        </div>
      </div>
    </div>
    <div v-if="requestLog.length > 0" style="background:var(--vp-c-bg-soft); border-radius:8px; padding:12px; font-family:monospace; font-size:12px; max-height:160px; overflow-y:auto">
      <div v-for="(entry, i) in requestLog" :key="i"
        :style="{ color: entry.type === 'success' ? '#67c23a' : entry.type === 'error' ? '#f56c6c' : 'var(--yh-text-color-secondary)', marginBottom:'4px' }">
        {{ entry.text }}
      </div>
    </div>
  </div>
</DemoBlock>

## cancelByKey: Auto-Cancel Duplicate Requests

Type in the search box — old requests are automatically cancelled as you type.

<DemoBlock title="cancelByKey Search Deduplication Demo">
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; align-items:center; gap:12px">
      <yh-input
        :model-value="searchKeyword"
        placeholder="Type to search (fires after 600ms delay)..."
        style="width:320px"
        @update:model-value="handleSearch"
        clearable
      />
      <yh-tag v-if="searchLoading" type="primary">Requesting...</yh-tag>
    </div>
    <div v-if="searchResult" style="padding:10px 14px; border-radius:8px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
      {{ searchResult }}
    </div>
    <div style="font-size:12px; color:var(--yh-text-color-placeholder)">
      💡 Type quickly — only the latest request completes; all previous ones are automatically cancelled.
    </div>
  </div>
</DemoBlock>

## Adding Requests

```typescript
// Add a GET request
const taskId = addRequest(() => request.get('/api/user/1'), {
  key: 'user-1', // Used for cancellation and deduplication
  priority: 10, // Higher = runs first
  delay: 1000, // Delay 1s before execution
  metadata: { type: 'fetch' }
})

// Add a POST request
addRequest(() => request.post('/api/order', { id: 123 }), { key: 'order-123' })
```

## Keyed Cancellation

```typescript
// Cancel a specific request by key
cancelByKey('user-1')

// Use case: cancel the previous user request when the user switches tabs
const loadUser = (userId: string) => {
  cancelByKey('current-user') // cancel the previous in-flight request
  addRequest(() => request.get(`/api/user/${userId}`), { key: 'current-user' })
}
```

## Concurrency Control

```typescript
const { addRequest, pause, resume } = useRequestQueue({
  concurrency: 2, // At most 2 concurrent requests
  autoStart: true
})

for (let i = 1; i <= 10; i++) {
  addRequest(() => request.get(`/api/item/${i}`))
}
```

## Error Handling & Retry

```typescript
const { failedTasks, retry, retryAll } = useRequestQueue({
  concurrency: 2,
  continueOnError: true,
  onTaskError: (task, error) => {
    console.error('Request failed:', task.key, error)
    YhMessage.error(`Failed: ${task.key}`)
  },
  onAllComplete: (tasks) => {
    console.log(`All done: ${tasks.length} requests`)
  }
})

retry(taskId) // Retry a single task
retryAll() // Retry all failed tasks
```

## Full API

### Options

| Option            | Type                    | Default | Description                                |
| ----------------- | ----------------------- | ------- | ------------------------------------------ |
| `concurrency`     | `number`                | `1`     | Max concurrent requests                    |
| `autoStart`       | `boolean`               | `true`  | Auto-start after adding a request          |
| `continueOnError` | `boolean`               | `false` | Continue queue when a single request fails |
| `onTaskComplete`  | `(task) => void`        | -       | Callback on single task completion         |
| `onTaskError`     | `(task, error) => void` | -       | Callback on single task failure            |
| `onAllComplete`   | `(tasks) => void`       | -       | Callback when all tasks in queue are done  |

### Return Values

| Property / Method                | Description                          |
| -------------------------------- | ------------------------------------ |
| `tasks`                          | All task list                        |
| `pendingTasks`                   | Tasks waiting to run                 |
| `runningTasks`                   | Currently executing tasks            |
| `completedTasks`                 | Successfully completed tasks         |
| `failedTasks`                    | Failed tasks                         |
| `isRunning`                      | Whether the queue is running         |
| `isEmpty`                        | Whether the queue is empty           |
| `isAllComplete`                  | Whether all tasks are done           |
| `completedCount`                 | Number of completed tasks            |
| `totalCount`                     | Total tasks added                    |
| `addRequest(requestFn, options)` | Add an HTTP request, returns task ID |
| `cancelByKey(key)`               | Cancel a request by key              |
| `remove(taskId)`                 | Remove a task                        |
| `clear()`                        | Clear the entire queue               |
| `start()`                        | Start processing                     |
| `pause()`                        | Pause the queue                      |
| `resume()`                       | Resume the queue                     |
| `cancel(taskId)`                 | Cancel a specific task               |
| `cancelAll()`                    | Cancel all tasks                     |
| `retry(taskId)`                  | Retry a specific failed task         |
| `retryAll()`                     | Retry all failed tasks               |
| `getTask(taskId)`                | Get task info by ID                  |

## useRequestQueue vs useQueue

| Feature      | useQueue             | useRequestQueue                  |
| ------------ | -------------------- | -------------------------------- |
| Use case     | General tasks        | HTTP requests                    |
| Add task     | `add(task, options)` | `addRequest(requestFn, options)` |
| Keyed cancel | Manual               | `cancelByKey(key)` built-in      |
| Metadata     | Manual               | Auto-tagged `type: 'request'`    |
