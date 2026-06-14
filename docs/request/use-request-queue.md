# useRequestQueue

`useRequestQueue` 是一个专用于 **HTTP 请求队列管理** 的 Hook，基于 `useQueue` 封装，提供更便捷的请求级别队列控制。支持并发限制、任务取消、优先级、失败重试等企业级请求场景。

<script setup lang="ts">
import { ref } from 'vue'
import { useRequestQueue } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ====== Demo 1: 模拟批量请求队列 ======
const requestLog = ref<{ text: string; type: 'success' | 'error' | 'info' }[]>([])

const {
  tasks: rqTasks,
  pendingTasks: rqPending,
  runningTasks: rqRunning,
  completedTasks: rqCompleted,
  failedTasks: rqFailed,
  completedCount: rqCompletedCount,
  totalCount: rqTotal,
  isAllComplete: rqAllDone,
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
    requestLog.value.unshift({ text: `✓ 请求完成: ${task.metadata?.name}`, type: 'success' })
    if (requestLog.value.length > 8) requestLog.value.pop()
  },
  onTaskError: (task, err) => {
    requestLog.value.unshift({ text: `✗ 请求失败: ${task.metadata?.name} — ${err.message}`, type: 'error' })
    if (requestLog.value.length > 8) requestLog.value.pop()
  },
  onAllComplete: (tasks) => {
    requestLog.value.unshift({ text: `📋 队列完成，共 ${tasks.length} 个请求`, type: 'info' })
  }
})

const addMockRequests = () => {
  rqClear()
  requestLog.value = []
  const items = [
    { name: '用户列表', delay: 700, fail: false },
    { name: '订单导出', delay: 1200, fail: false },
    { name: '报表下载', delay: 900, fail: true },   // 模拟失败
    { name: '权限校验', delay: 500, fail: false },
    { name: '日志同步', delay: 1100, fail: false },
    { name: '数据归档', delay: 800, fail: false }
  ]
  items.forEach(({ name, delay, fail }, idx) => {
    rqAddRequest(async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
      if (fail) throw new Error('服务器错误 500')
      return { name }
    }, {
      key: `req-${idx}`,
      priority: idx === 3 ? 10 : 1,  // 权限校验优先
      metadata: { name }
    })
  })
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
    pending: '等待', running: '执行中',
    fulfilled: '完成', rejected: '失败', canceled: '已取消'
  }
  return map[status] || status
}

// ====== Demo 2: cancelByKey 取消搜索请求 ======
const searchKeyword = ref('')
const searchResult = ref('')
const searchLoading = ref(false)

const {
  addRequest: searchAddRequest,
  cancelByKey: searchCancelByKey
} = useRequestQueue({ concurrency: 1, autoStart: true })

const handleSearch = async (val: string | number) => {
  const keyword = String(val)
  searchKeyword.value = keyword
  if (!keyword.trim()) { searchResult.value = ''; return }
  searchCancelByKey('search') // 取消上一次未完成的搜索
  searchLoading.value = true
  searchAddRequest(async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    searchResult.value = keyword ? `搜索结果: "${keyword}" 共找到 ${Math.floor(Math.random() * 100)} 条记录` : ''
    searchLoading.value = false
  }, { key: 'search' })
}

const tsRequestQueueDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="addAndStart">模拟 6 个请求</yh-button>
      <yh-button @click="pause" :disabled="!isRunning">暂停</yh-button>
      <yh-button type="success" @click="resume">继续</yh-button>
      <yh-button type="warning" @click="retryAll" :disabled="!hasFailed">重试失败</yh-button>
      <yh-button type="danger" @click="clear">清空</yh-button>
    </div>
    <div v-if="totalCount > 0">
      <yh-progress :percentage="totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0" />
    </div>
    <div style="display:flex; flex-direction:column; gap:4px">
      <div v-for="task in tasks" :key="task.id"
        style="display:flex; justify-content:space-between; padding:6px 12px; border-radius:6px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
        <span>{{ task.metadata?.name }}</span>
        <span :style="{ color: statusColor(task.status) }">● {{ statusText(task.status) }}</span>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { computed } from 'vue'
import { useRequestQueue } from '@yh-ui/request'

const {
  tasks, completedCount, totalCount,
  isRunning, isAllComplete, failedTasks,
  addRequest, start, pause, resume, clear, retryAll
} = useRequestQueue({
  concurrency: 2,
  autoStart: false,
  continueOnError: true
})

const hasFailed = computed(() => failedTasks.value.length > 0)

const addAndStart = () => {
  clear()
  const items = [
    { name: '用户列表', delay: 700, fail: false },
    { name: '订单导出', delay: 1200, fail: false },
    { name: '报表下载', delay: 900, fail: true },
    { name: '权限校验', delay: 500, fail: false },
    { name: '日志同步', delay: 1100, fail: false },
    { name: '数据归档', delay: 800, fail: false }
  ]
  items.forEach(({ name, delay, fail }, idx) => {
    addRequest(async () => {
      await new Promise(r => setTimeout(r, delay))
      if (fail) throw new Error('服务器错误 500')
    }, { key: \`req-\${idx}\`, priority: idx === 3 ? 10 : 1, metadata: { name } })
  })
  start()
}

const statusText = (s: string) =>
  ({ pending: '等待', running: '执行中', fulfilled: '完成', rejected: '失败', canceled: '已取消' }[s] || s)
const statusColor = (s: string) =>
  ({ pending: '#909399', running: '#409eff', fulfilled: '#67c23a', rejected: '#f56c6c', canceled: '#e6a23c' }[s] || '#909399')
</${_S}>`
</script>

## 基础用法

<DemoBlock title="批量请求队列演示（含并发控制 & 重试）" :ts-code="tsRequestQueueDemo" :js-code="toJs(tsRequestQueueDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" @click="() => { addMockRequests(); rqStart() }">模拟 6 个请求（含 1 失败 & 1 高优先级）</yh-button>
      <yh-button @click="rqPause" :disabled="!rqIsRunning">暂停</yh-button>
      <yh-button type="success" @click="rqResume">继续</yh-button>
      <yh-button type="warning" @click="rqRetryAll" :disabled="rqFailed.length === 0">重试失败</yh-button>
      <yh-button type="danger" @click="rqClear">清空</yh-button>
    </div>
    <div v-if="rqTotal > 0">
      <div style="margin-bottom:6px; font-size:13px; color:var(--yh-text-color-secondary)">
        进度: {{ rqCompletedCount }} / {{ rqTotal }}
        &nbsp;·&nbsp; 等待: {{ rqPending.length }} &nbsp;·&nbsp; 执行中: {{ rqRunning.length }}
        &nbsp;·&nbsp; 失败: <span :style="{ color: rqFailed.length > 0 ? '#f56c6c' : 'inherit' }">{{ rqFailed.length }}</span>
      </div>
      <yh-progress :percentage="rqTotal > 0 ? Math.round(rqCompletedCount / rqTotal * 100) : 0" />
    </div>
    <div v-if="rqTasks.length > 0" style="display:flex; flex-direction:column; gap:6px">
      <div v-for="task in rqTasks" :key="task.id"
        style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-radius:6px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
        <div style="display:flex; align-items:center; gap:8px">
          <yh-tag v-if="task.priority && task.priority >= 10" type="warning" size="small">高优先级</yh-tag>
          <span>{{ task.metadata?.name }}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px">
          <span v-if="task.error" style="font-size:11px; color:#f56c6c">{{ task.error?.message }}</span>
          <span :style="{ color: getStatusColor(task.status), fontSize:'12px' }">
            ● {{ getStatusText(task.status) }}
          </span>
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

## cancelByKey：自动取消重复请求

适合搜索框输入场景 — 用户快速输入时，自动取消上一次尚未完成的请求。

<DemoBlock title="cancelByKey 防重复搜索演示">
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; align-items:center; gap:12px">
      <yh-input
        :model-value="searchKeyword"
        placeholder="输入搜索关键词（600ms 后触发）..."
        style="width:300px"
        @update:model-value="handleSearch"
        clearable
      />
      <yh-tag v-if="searchLoading" type="primary">请求中...</yh-tag>
    </div>
    <div v-if="searchResult" style="padding:10px 14px; border-radius:8px; border:1px solid var(--yh-border-color); background:var(--yh-bg-color-page); font-size:13px">
      {{ searchResult }}
    </div>
    <div style="font-size:12px; color:var(--yh-text-color-placeholder)">
      💡 快速输入多个字符 — 只有最新一次请求会真正完成，之前的会被自动取消
    </div>
  </div>
</DemoBlock>

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
