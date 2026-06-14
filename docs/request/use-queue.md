# useQueue

`useQueue` 是一个通用的 **任务队列管理 Hook**，可用于控制请求并发、排队执行任务、失败重试等场景，特别适合导入导出、大批量操作等企业应用需求。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueue } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ====== Demo 1: 基础并发控制 ======
const {
  tasks: basicTasks,
  pendingTasks: basicPending,
  runningTasks: basicRunning,
  completedTasks: basicCompleted,
  completedCount: basicCompletedCount,
  totalCount: basicTotal,
  isAllComplete: basicAllDone,
  isRunning: basicRunning2,
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
      return `任务 ${i} 完成`
    }, { metadata: { name: `任务 ${i}`, duration: Math.round(delay) } })
  }
}

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: '#909399',
    running: '#409eff',
    fulfilled: '#67c23a',
    rejected: '#f56c6c',
    canceled: '#e6a23c'
  }
  return map[status] || '#909399'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '等待中',
    running: '执行中',
    fulfilled: '已完成',
    rejected: '失败',
    canceled: '已取消'
  }
  return map[status] || status
}

// ====== Demo 2: 优先级与失败重试 ======
const {
  tasks: retryTasks,
  failedTasks: retryFailed,
  completedTasks: retryCompleted,
  isAllComplete: retryAllDone,
  add: retryAdd,
  start: retryStart,
  clear: retryClear,
  retryAll: retryAllFn
} = useQueue({
  concurrency: 3,
  autoStart: false,
  continueOnError: true
})

const retryLog = ref<string[]>([])

const addRetryTasks = () => {
  retryClear()
  retryLog.value = []
  // 高优先级任务
  for (let i = 1; i <= 3; i++) {
    retryAdd(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      return `高优先级任务 ${i}`
    }, { priority: 10, metadata: { name: `⭐ 高优先 ${i}` } })
  }
  // 低优先级任务（其中一个会失败）
  for (let i = 1; i <= 3; i++) {
    retryAdd(async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      if (i === 2) throw new Error('模拟请求失败')
      return `低优先级任务 ${i}`
    }, { priority: 1, metadata: { name: `普通 ${i}` } })
  }
}

const tsQueueDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <!-- 操作栏 -->
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="addAndStart">添加 6 个任务并执行</yh-button>
      <yh-button @click="pause" :disabled="!isRunning || isPaused">暂停</yh-button>
      <yh-button type="success" @click="resume" :disabled="!isPaused">继续</yh-button>
      <yh-button type="danger" @click="clear">清空</yh-button>
      <yh-tag :type="isRunning ? 'primary' : (isAllComplete ? 'success' : 'info')">
        {{ isRunning ? '执行中' : (isAllComplete ? '全部完成' : '空闲') }}
      </yh-tag>
    </div>

    <!-- 进度 -->
    <div v-if="totalCount > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        进度: {{ completedCount }} / {{ totalCount }}
      </div>
      <yh-progress :percentage="totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0" />
    </div>

    <!-- 任务列表 -->
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
import { ref, computed } from 'vue'
import { useQueue } from '@yh-ui/request'

const {
  tasks, completedCount, totalCount,
  isRunning, isAllComplete,
  add, start, pause, resume, clear
} = useQueue({
  concurrency: 2,
  autoStart: false,
  continueOnError: true
})

const isPaused = ref(false)
const pauseQueue = () => { pause(); isPaused.value = true }
const resumeQueue = () => { resume(); isPaused.value = false }

const addAndStart = () => {
  clear()
  isPaused.value = false
  for (let i = 1; i <= 6; i++) {
    add(async () => {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))
    }, { metadata: { name: \`任务 \${i}\` } })
  }
  start()
}

const statusText = (s: string) => ({ pending: '等待中', running: '执行中', fulfilled: '已完成', rejected: '失败', canceled: '已取消' }[s] || s)
const statusColor = (s: string) => ({ pending: '#909399', running: '#409eff', fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c' }[s] || '#909399')
</${_S}>`
</script>

## 基础并发控制

同时运行 6 个任务，并发数限制为 2，直观展示队列执行过程。

<DemoBlock title="任务队列并发控制演示" :ts-code="tsQueueDemo" :js-code="toJs(tsQueueDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addBasicTasks(); basicStart() }">添加 6 个任务并执行</yh-button>
      <yh-button @click="basicPause" :disabled="!basicRunning2">暂停</yh-button>
      <yh-button type="success" @click="basicResume">继续</yh-button>
      <yh-button type="danger" @click="basicClear">清空</yh-button>
      <yh-tag :type="basicRunning2 ? 'primary' : (basicAllDone ? 'success' : 'info')">
        {{ basicRunning2 ? '执行中 (并发 ≤ 2)' : (basicAllDone ? '全部完成 ✓' : '空闲') }}
      </yh-tag>
    </div>
    <div v-if="basicTotal > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        进度: {{ basicCompletedCount }} / {{ basicTotal }}
        &nbsp;·&nbsp;等待: {{ basicPending.length }}
        &nbsp;·&nbsp;执行中: {{ basicRunning.length }}
        &nbsp;·&nbsp;完成: {{ basicCompleted.length }}
      </div>
      <yh-progress :percentage="basicTotal > 0 ? Math.round(basicCompletedCount / basicTotal * 100) : 0" />
    </div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px">
      <div v-for="t in basicTasks" :key="t.id"
        style="padding:10px 12px; border-radius:8px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px; transition: all 0.3s">
        <div style="font-weight:500; margin-bottom:4px">{{ t.metadata?.name }}</div>
        <div style="font-size:11px; color:var(--yh-text-color-placeholder)">耗时 ~{{ t.metadata?.duration }}ms</div>
        <div :style="{ color: getStatusColor(t.status), fontSize: '12px', marginTop:'4px' }">
          ● {{ getStatusText(t.status) }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 配置项

| 参数              | 类型                    | 默认值  | 说明                               |
| ----------------- | ----------------------- | ------- | ---------------------------------- |
| `concurrency`     | `number`                | `1`     | 最大并发执行任务数                 |
| `autoStart`       | `boolean`               | `true`  | 添加任务后是否自动开始执行         |
| `continueOnError` | `boolean`               | `false` | 单个任务失败时是否继续执行后续任务 |
| `onTaskComplete`  | `(task) => void`        | -       | 单个任务完成回调                   |
| `onTaskError`     | `(task, error) => void` | -       | 单个任务失败回调                   |
| `onAllComplete`   | `(tasks) => void`       | -       | 全部任务完成回调                   |

## 优先级排序与失败重试

高优先级任务优先执行，失败任务可一键重试。

<DemoBlock title="优先级排序 & 失败重试演示">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addRetryTasks(); retryStart() }">添加任务（含 1 个失败）</yh-button>
      <yh-button type="warning" @click="retryAllFn" :disabled="retryFailed.length === 0">重试全部失败任务</yh-button>
      <yh-button type="danger" @click="retryClear">清空</yh-button>
    </div>
    <div v-if="retryTasks.length > 0" style="display:flex; flex-direction:column; gap:6px">
      <div v-for="t in retryTasks" :key="t.id"
        style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; background:var(--yh-bg-color-page); font-size:13px">
        <span>{{ t.metadata?.name }}</span>
        <div style="display:flex; align-items:center; gap:8px">
          <yh-tag v-if="t.priority && t.priority >= 10" type="warning" size="small">高优先级</yh-tag>
          <span :style="{ color: getStatusColor(t.status), fontSize:'12px' }">
            ● {{ getStatusText(t.status) }}
          </span>
          <span v-if="t.error" style="font-size:11px; color:var(--yh-color-danger)">{{ t.error?.message }}</span>
        </div>
      </div>
    </div>
    <div v-else style="color:var(--yh-text-color-placeholder); font-size:13px; padding:20px 0; text-align:center">
      点击按钮添加任务
    </div>
  </div>
</DemoBlock>

## 队列任务结构

```typescript
interface QueueTask<T = unknown> {
  id: string
  key?: string // 任务去重 key
  task: (options: { signal: AbortSignal }) => Promise<T>
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
  async ({ signal }) => {
    const res = await request.get('/api/report/1', { signal })
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
