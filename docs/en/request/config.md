# Request Config

## Configuration Options

```typescript
import { RequestOptions } from '@yh-ui/request'

interface RequestOptions<TRequest = unknown> {
  /** Request base URL */
  baseURL?: string
  /** Request path */
  url?: string
  /** HTTP method */
  method?: HttpMethod
  /** URL query parameters */
  params?: Record<string, ParamValue>
  /** Request body data */
  data?: TRequest
  /** Request headers */
  headers?: Record<string, string>
  /** Request timeout (ms) */
  timeout?: number
  /** Credentials mode */
  credentials?: RequestCredentials
  /** Response type */
  responseType?: ResponseType
  /** Enable retry */
  retry?: boolean
  /** Retry times */
  retryTimes?: number
  /** Retry delay (ms) */
  retryDelay?: number
  /** Retry condition function */
  retryCondition?: (error: RequestError) => boolean
}
```

## Basic Configuration

```typescript
// Create instance
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  credentials: 'same-origin',
  responseType: 'json'
})
```

## Timeout Configuration

```typescript
// 30 second timeout (default)
const response = await request.get('/api/users', {
  timeout: 30000
})

// 5 second timeout
const response = await request.get('/api/users', {
  timeout: 5000
})
```

## Retry Configuration

```typescript
// Enable retry
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3, // Max 3 retries
  retryDelay: 1000 // 1 second interval
})

// Custom retry condition
const response = await request.get('/api/users', {
  retry: true,
  retryCondition: (error) => {
    // Retry only on network error or 500 error
    return error.isNetworkError || error.response?.status === 500
  }
})
```

### Exponential Backoff Retry

`@yh-ui/request` supports custom retry delay calculators for exponential backoff, linear backoff and other strategies.

```typescript
import {
  defaultExponentialBackoff,
  linearBackoff,
  fixedBackoff,
  type RetryDelayCalculator
} from '@yh-ui/request'

// Default exponential backoff (with random jitter)
// Attempt 1: 1000-2000ms
// Attempt 2: 2000-3000ms
// Attempt 3: 4000-5000ms
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: defaultExponentialBackoff
})

// Linear backoff
// Attempt 1: 1000ms
// Attempt 2: 2000ms
// Attempt 3: 3000ms
const response2 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: linearBackoff
})

// Fixed delay
// Each attempt: 1000ms
const response3 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: fixedBackoff
})

// Custom delay calculator
const customBackoff: RetryDelayCalculator = (retryCount, defaultDelay) => {
  // Exponential backoff, max 30 seconds
  const delay = defaultDelay * Math.pow(2, retryCount)
  return Math.min(delay, 30000)
}

const response4 = await request.get('/api/users', {
  retry: true,
  retryTimes: 5,
  retryDelayCalculator: customBackoff
})
```

#### Built-in Delay Calculator Comparison

| Function                    | Strategy                    | Example (retryDelay=1000) |
| --------------------------- | --------------------------- | ------------------------- |
| `defaultExponentialBackoff` | Exponential + Random Jitter | 1→2→4→8... seconds        |
| `linearBackoff`             | Linear Growth               | 1→2→3→4... seconds        |
| `fixedBackoff`              | Fixed Delay                 | Always 1 second           |

#### Delay Calculator Type

```typescript
type RetryDelayCalculator = (retryCount: number, defaultDelay: number) => number

// retryCount: Current retry count (starts from 0)
// defaultDelay: Configured retryDelay value
// Returns: Actual delay time in milliseconds
// Returns -1 to stop retrying
```

## Request Deduplication

```typescript
// Requests with the same key will be auto-cancelled
const response1 = request.get('/api/users', {
  requestKey: 'users-list'
})

const response2 = request.get('/api/users', {
  requestKey: 'users-list' // Will cancel response1
})

// Or use abortSameKey for auto-deduplication
const response = request.get('/api/users', {
  abortSameKey: true // Auto use url + params as key
})
```

## Response Types

```typescript
// JSON (default)
const { data } = await request.get('/api/data')

// Text
const text = await request.get('/api/text', {
  responseType: 'text'
})

// Blob (file download)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})

// ArrayBuffer
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})
```

## Default Configuration

```typescript
// Set global default configuration
request.setConfig({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Get current configuration
const config = request.getConfig()
```

## Interactive Config Demo

The following demo showcases how `timeout`, `retryTimes`, and `retryDelay` operate. Since the mock request takes **3 seconds** to resolve, setting the timeout value to less than 3 seconds will trigger the request timeout and retry mechanisms.

<DemoBlock title="Request Config Test Sandbox (Timeout & Retry)" :ts-code="tsConfigDemo" :js-code="toJs(tsConfigDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>Timeout (timeout): <span class="highlight-val">{{ timeoutVal }}ms</span></label>
        <div class="slider-wrapper">
          <yh-slider :model-value="timeoutVal" :min="500" :max="5000" :step="500" @update:model-value="(v) => { timeoutVal = Number(v) }" />
        </div>
      </div>
      <div class="panel-item">
        <label>Retry Times (retryTimes): <span class="highlight-val">{{ retryTimesVal }} times</span></label>
        <div class="button-group">
          <yh-button v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :type="retryTimesVal === n ? 'primary' : 'default'" size="small" @click="retryTimesVal = n">{{ n }}</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label>Retry Delay (retryDelay): <span class="highlight-val">{{ retryDelayVal }}ms</span></label>
        <div class="slider-wrapper">
          <yh-slider :model-value="retryDelayVal" :min="500" :max="3000" :step="500" @update:model-value="(v) => { retryDelayVal = Number(v) }" />
        </div>
      </div>
      <div class="panel-item">
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer">
          <input type="checkbox" v-model="useExponential" />
          <span>Exponential Backoff</span>
        </label>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="requestLoading" @click="runConfigDemo">Send Request</yh-button>
        <yh-button @click="clearLogs" :disabled="logs.length === 0">Clear Logs</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">Console Output</span>
      </div>
      <div class="terminal-body">
        <div v-if="logs.length === 0" class="empty-log">Click "Send Request" to run the demo...</div>
        <div v-for="(log, i) in logs" :key="i" class="log-line" :class="{
          'log-success': log.includes('Success') || log.includes('✅'),
          'log-error': log.includes('Failed') || log.includes('❌') || log.includes('🚨'),
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
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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
  
  addLog('🚀 Initiating HTTP Request: GET /api/data_stream')
  addLog(`⚙️ Config: timeout = ${timeoutVal.value}ms, retryTimes = ${retryTimesVal.value}, retryDelay = ${retryDelayVal.value}ms`)

  let success = false
  for (let attempt = 0; attempt <= retryTimesVal.value; attempt++) {
    const isFirst = attempt === 0
    if (!isFirst) {
      const currentDelay = useExponential.value 
        ? retryDelayVal.value * Math.pow(2, attempt - 1)
        : retryDelayVal.value
      addLog(`⏳ Waiting for retry delay of ${currentDelay}ms...`)
      await new Promise(r => setTimeout(r, currentDelay))
      addLog(`🔄 Initiating retry #${attempt}...`)
    } else {
      addLog('📡 Conducting attempt #1...')
    }

    // Simulate request taking 3 seconds
    const requestPromise = new Promise<{ status: number; data?: any }>((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: { status: 'success', message: 'Data fetched successfully' } })
      }, 3000)
    })

    const timeoutPromise = new Promise<{ timeout: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ timeout: true })
      }, timeoutVal.value)
    })

    const result = await Promise.race([requestPromise, timeoutPromise])

    if ('timeout' in result) {
      addLog(`❌ Attempt Failed: Request Timeout (exceeded ${timeoutVal.value}ms)`)
    } else {
      addLog(`✅ Success! Status Code: ${result.status}, Data: ${JSON.stringify(result.data)}`)
      success = true
      break
    }
  }

  if (!success) {
    addLog(`🚨 All attempts failed! Request ultimately failed.`)
  }
  requestLoading.value = false
}

const clearLogs = () => {
  logs.value = []
}

const tsConfigDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div>
      <label>Timeout (timeout): {{ timeoutVal }}ms</label>
      <yh-slider v-model="timeoutVal" :min="500" :max="5000" :step="500" />
    </div>
    <div>
      <label>Retry Times (retryTimes): {{ retryTimesVal }}</label>
      <div style="display:flex; gap:6px">
        <yh-button v-for="n in 6" :key="n-1" :type="retryTimesVal === n-1 ? 'primary' : 'default'" @click="retryTimesVal = n-1">{{ n-1 }}</yh-button>
      </div>
    </div>
    <yh-button type="primary" :loading="loading" @click="send">Send Request</yh-button>
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
    console.log('Success:', res)
  } catch (err) {
    console.error('Failed:', err)
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

## Next Steps

- [Response Handling](./response) - Response data parsing
- [Interceptors](./interceptors) - Request/Response interceptors
- [Error Handling](./error) - Comprehensive error handling
