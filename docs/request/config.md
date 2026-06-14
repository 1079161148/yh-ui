# 请求配置

## 配置选项

```typescript
import { RequestOptions } from '@yh-ui/request'

interface RequestOptions<TRequest = unknown> {
  /** 请求基础 URL */
  baseURL?: string
  /** 请求路径 */
  url?: string
  /** 请求方法 */
  method?: HttpMethod
  /** URL 查询参数 */
  params?: Record<string, ParamValue>
  /** 请求体数据 */
  data?: TRequest
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求超时时间 (ms) */
  timeout?: number
  /** credentials 模式 */
  credentials?: RequestCredentials
  /** 响应类型 */
  responseType?: ResponseType
  /** 是否 retry */
  retry?: boolean
  /** 重试次数 */
  retryTimes?: number
  /** 重试延迟 (ms) */
  retryDelay?: number
  /** 重试条件函数 */
  retryCondition?: (error: RequestError) => boolean
}
```

## 基础配置

```typescript
// 创建实例
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  credentials: 'same-origin',
  responseType: 'json'
})
```

## 超时配置

```typescript
// 30秒超时（默认）
const response = await request.get('/api/users', {
  timeout: 30000
})

// 5秒超时
const response = await request.get('/api/users', {
  timeout: 5000
})
```

## 重试配置

```typescript
// 启用重试
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3, // 最多重试3次
  retryDelay: 1000 // 重试间隔1秒
})

// 自定义重试条件
const response = await request.get('/api/users', {
  retry: true,
  retryCondition: (error) => {
    // 只在网络错误或500错误时重试
    return error.isNetworkError || error.response?.status === 500
  }
})
```

### 指数退避重试

`@yh-ui/request` 支持自定义重试延迟计算器，实现指数退避、线性退避等策略。

```typescript
import {
  defaultExponentialBackoff,
  linearBackoff,
  fixedBackoff,
  type RetryDelayCalculator
} from '@yh-ui/request'

// 默认指数退避（带随机抖动）
// 第 1 次: 1000-2000ms
// 第 2 次: 2000-3000ms
// 第 3 次: 4000-5000ms
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: defaultExponentialBackoff
})

// 线性退避
// 第 1 次: 1000ms
// 第 2 次: 2000ms
// 第 3 次: 3000ms
const response2 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: linearBackoff
})

// 固定延迟
// 每次: 1000ms
const response3 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: fixedBackoff
})

// 自定义延迟计算器
const customBackoff: RetryDelayCalculator = (retryCount, defaultDelay) => {
  // 指数退避，最大 30 秒
  const delay = defaultDelay * Math.pow(2, retryCount)
  return Math.min(delay, 30000)
}

const response4 = await request.get('/api/users', {
  retry: true,
  retryTimes: 5,
  retryDelayCalculator: customBackoff
})
```

#### 内置延迟计算器对比

| 函数                        | 策略            | 示例 (retryDelay=1000) |
| --------------------------- | --------------- | ---------------------- |
| `defaultExponentialBackoff` | 指数 + 随机抖动 | 1→2→4→8... 秒          |
| `linearBackoff`             | 线性增长        | 1→2→3→4... 秒          |
| `fixedBackoff`              | 固定延迟        | 始终 1 秒              |

#### 延迟计算器类型

```typescript
type RetryDelayCalculator = (retryCount: number, defaultDelay: number) => number

// retryCount: 当前重试次数（从 0 开始）
// defaultDelay: 配置的 retryDelay 值
// 返回: 实际延迟时间（毫秒）
// 返回 -1 表示不再重试
```

## 请求去重

```typescript
// 相同 key 的请求会被自动取消
const response1 = request.get('/api/users', {
  requestKey: 'users-list'
})

const response2 = request.get('/api/users', {
  requestKey: 'users-list' // 会取消 response1
})

// 也可以使用 abortSameKey 自动取消
const response = request.get('/api/users', {
  abortSameKey: true // 自动使用 url + params 作为 key
})
```

## 响应类型

```typescript
// JSON (默认)
const { data } = await request.get('/api/data')

// 文本
const text = await request.get('/api/text', {
  responseType: 'text'
})

// Blob (文件下载)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})

// ArrayBuffer
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})

// FormData
const formData = await request.get('/api/form', {
  responseType: 'formdata'
})
```

## 默认配置

```typescript
// 设置全局默认配置
request.setConfig({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 获取当前配置
const config = request.getConfig()
```

## 交互式配置演示

以下演示展示了如何配置 `timeout`、`retryTimes` 和 `retryDelay`。由于请求实际需要耗时 **3秒**，当您设置超时时间小于 3秒 时，请求将超时并触发重试机制。

<DemoBlock title="请求配置测试沙盒（超时与重试）" :ts-code="tsConfigDemo" :js-code="toJs(tsConfigDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>超时时间 (timeout): <span class="highlight-val">{{ timeoutVal }}ms</span></label>
        <div class="slider-wrapper">
          <yh-slider :model-value="timeoutVal" :min="500" :max="5000" :step="500" @update:model-value="(v) => { timeoutVal = Number(v) }" />
        </div>
      </div>
      <div class="panel-item">
        <label>重试次数 (retryTimes): <span class="highlight-val">{{ retryTimesVal }} 次</span></label>
        <div class="button-group">
          <yh-button v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :type="retryTimesVal === n ? 'primary' : 'default'" size="small" @click="retryTimesVal = n">{{ n }}</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label>重试延迟 (retryDelay): <span class="highlight-val">{{ retryDelayVal }}ms</span></label>
        <div class="slider-wrapper">
          <yh-slider :model-value="retryDelayVal" :min="500" :max="3000" :step="500" @update:model-value="(v) => { retryDelayVal = Number(v) }" />
        </div>
      </div>
      <div class="panel-item">
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer">
          <input type="checkbox" v-model="useExponential" />
          <span>指数退避重试 (Exponential Backoff)</span>
        </label>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="requestLoading" @click="runConfigDemo">发送请求</yh-button>
        <yh-button @click="clearLogs" :disabled="logs.length === 0">清空日志</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">控制台输出 (Console)</span>
      </div>
      <div class="terminal-body">
        <div v-if="logs.length === 0" class="empty-log">点击“发送请求”运行演示...</div>
        <div v-for="(log, i) in logs" :key="i" class="log-line" :class="{
          'log-success': log.includes('成功') || log.includes('✅'),
          'log-error': log.includes('失败') || log.includes('❌') || log.includes('🚨'),
          'log-info': log.includes('🔄') || log.includes('⏳') || log.includes('⚙️')
        }">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const timeoutVal = ref(2000)
const retryTimesVal = ref(2)
const retryDelayVal = ref(1000)
const useExponential = ref(false)

const logs = ref<string[]>([])
const requestLoading = ref(false)

const addLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.push(`[${time}] ${msg}`)
}

const runConfigDemo = async () => {
  if (requestLoading.value) return
  requestLoading.value = true
  logs.value = []
  
  addLog('🚀 发起 HTTP 请求: GET /api/data_stream')
  addLog(`⚙️ 配置: timeout = ${timeoutVal.value}ms, retryTimes = ${retryTimesVal.value}, retryDelay = ${retryDelayVal.value}ms`)

  let success = false
  for (let attempt = 0; attempt <= retryTimesVal.value; attempt++) {
    const isFirst = attempt === 0
    if (!isFirst) {
      const currentDelay = useExponential.value 
        ? retryDelayVal.value * Math.pow(2, attempt - 1)
        : retryDelayVal.value
      addLog(`⏳ 等待重试延迟 ${currentDelay}ms...`)
      await new Promise(r => setTimeout(r, currentDelay))
      addLog(`🔄 正在发起第 ${attempt} 次重试...`)
    } else {
      addLog('📡 正在进行第 1 次尝试...')
    }

    // 模拟请求：需要耗时3秒
    const requestPromise = new Promise<{ status: number; data?: any }>((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: { status: 'success', message: '数据获取成功' } })
      }, 3000)
    })

    const timeoutPromise = new Promise<{ timeout: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ timeout: true })
      }, timeoutVal.value)
    })

    const result = await Promise.race([requestPromise, timeoutPromise])

    if ('timeout' in result) {
      addLog(`❌ 尝试失败: 请求超时 (超过 ${timeoutVal.value}ms)`)
    } else {
      addLog(`✅ 请求成功! 状态码: ${result.status}, 返回数据: ${JSON.stringify(result.data)}`)
      success = true
      break
    }
  }

  if (!success) {
    addLog(`🚨 所有尝试均已失败! 请求最终失败。`)
  }
  requestLoading.value = false
}

const clearLogs = () => {
  logs.value = []
}

const tsConfigDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div>
      <label>超时时间 (timeout): {{ timeoutVal }}ms</label>
      <yh-slider v-model="timeoutVal" :min="500" :max="5000" :step="500" />
    </div>
    <div>
      <label>重试次数 (retryTimes): {{ retryTimesVal }}</label>
      <div style="display:flex; gap:6px">
        <yh-button v-for="n in 6" :key="n-1" :type="retryTimesVal === n-1 ? 'primary' : 'default'" @click="retryTimesVal = n-1">{{ n-1 }}</yh-button>
      </div>
    </div>
    <yh-button type="primary" :loading="loading" @click="send">发送请求</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { createRequest } from '@yh-ui/request'

const timeoutVal = ref(2000)
const retryTimesVal = ref(2)
const loading = ref(false)

const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: timeoutVal.value,
  retry: true,
  retryTimes: retryTimesVal.value
})

const send = async () => {
  loading.value = true
  try {
    const res = await request.get('/api/data')
    console.log('成功:', res)
  } catch (err) {
    console.error('失败:', err)
  } finally {
    loading.value = false
  }
}
</${_S}>`
</script>

<style>
.interactive-demo-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 16px 0;
}
@media (min-width: 768px) {
  .interactive-demo-container {
    flex-direction: row;
  }
}
.control-panel {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--yh-border-color-light, #ebeef5);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.panel-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.panel-item label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.highlight-val {
  color: var(--yh-color-primary, #409eff);
  font-weight: 600;
}
.slider-wrapper {
  padding: 0 8px;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.terminal-panel {
  flex: 1;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  min-height: 250px;
}
.terminal-header {
  background: #2d2d2d;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #3d3d3d;
}
.terminal-header .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.terminal-header .dot.red { background: #ff5f56; }
.terminal-header .dot.yellow { background: #ffbd2e; }
.terminal-header .dot.green { background: #27c93f; }
.terminal-header .title {
  margin-left: 8px;
  color: #abb2bf;
  font-size: 11px;
  font-family: monospace;
}
.terminal-body {
  padding: 16px;
  color: #abb2bf;
  font-family: 'Fira Code', Consolas, Monaco, monospace;
  font-size: 12px;
  line-height: 1.6;
  overflow-y: auto;
  flex: 1;
}
.empty-log {
  color: #5c6370;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.log-line {
  margin-bottom: 6px;
  word-break: break-all;
}
.log-success {
  color: #98c379;
}
.log-error {
  color: #e06c75;
}
.log-info {
  color: #61afef;
}
</style>
