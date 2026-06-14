# Interceptors

`@yh-ui/request` provides a powerful interceptor system supporting hooks before/after requests and responses, along with built-in debug, progress, and security interceptors.

## Basic Interceptors

### Request Interceptors

Modify configuration or add common logic before sending a request.

```typescript
import { request } from '@yh-ui/request'

// Add request interceptor
request.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }

    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    }

    return config
  },
  (error) => {
    // Request error handling
    return Promise.reject(error)
  }
)
```

### Response Interceptors

Process response data before it reaches your code.

```typescript
// Add response interceptor
request.interceptors.response.use(
  (response) => {
    // Handle business error codes
    if (response.data.code !== 200) {
      return Promise.reject(new Error(response.data.message))
    }
    return response
  },
  (error) => {
    // Unified error handling
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Remove Interceptors

Use `eject` to remove added interceptors.

```typescript
// Adding interceptor returns an ID
const requestId = request.interceptors.request.use((config) => {
  config.headers['X-Request-Time'] = new Date().toISOString()
  return config
})

// Remove specific interceptor
request.interceptors.request.eject(requestId)

// Clear all interceptors
request.interceptors.request.clear()
```

## Built-in Interceptors

### Debug Interceptor

Monitor all requests in development.

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debugInterceptor = createDebugInterceptor({
  enabled: import.meta.env.DEV,
  level: 'log',
  logRequestBody: true,
  logResponseBody: true
})

request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
```

**Debug Output Example:**

```
[YH-Request] GET req_1234567890_1 → GET /api/users
[YH-Request] GET req_1234567890_1 [200] (145ms)
```

**Sanitization:**

```typescript
const debugInterceptor = createDebugInterceptor({
  enabled: true,
  sanitize: (info) => {
    // Remove sensitive information
    const sanitized = { ...info }
    if (sanitized.headers?.Authorization) {
      sanitized.headers.Authorization = '***'
    }
    if (sanitized.data?.password) {
      sanitized.data.password = '***'
    }
    return sanitized
  }
})
```

**Using DebugLogger Class:**

```typescript
import { DebugLogger } from '@yh-ui/request'

const logger = new DebugLogger()

// Add interceptor to collect logs
request.interceptors.response.use((response) => {
  logger.addLog({
    requestId: response.requestId,
    url: response.config.url || '',
    method: response.config.method || 'GET',
    status: response.response.status,
    duration: response.duration,
    timestamp: Date.now()
  })
  return response
})

// Get all logs
const logs = logger.getLogs()

// Clear logs
logger.clear()
```

### Progress Interceptor

Track upload/download progress.

```typescript
import { createProgressInterceptor } from '@yh-ui/request'

const progressInterceptor = createProgressInterceptor({
  onUploadProgress: (event) => {
    console.log(`Upload progress: ${event.percent.toFixed(1)}%`)
    console.log(`Uploaded: ${event.loaded}/${event.total} bytes`)
    console.log(`Rate: ${(event.rate || 0).toFixed(0)} bytes/s`)
    console.log(`ETA: ${((event.estimated || 0) / 1000).toFixed(1)}s`)
  },
  onDownloadProgress: (event) => {
    console.log(`Download progress: ${event.percent.toFixed(1)}%`)
    console.log(`Downloaded: ${event.loaded}/${event.total} bytes`)
  }
})

request.interceptors.request.use(progressInterceptor.onRequest)
```

**ProgressEvent Structure:**

```typescript
interface ProgressEvent {
  loaded: number // Bytes transferred
  total: number // Total bytes
  percent: number // Progress percentage (0-100)
  rate?: number // Transfer rate (bytes/s)
  estimated?: number // Estimated remaining time (ms)
}
```

**Upload with FormData:**

```typescript
const formData = new FormData()
formData.append('file', fileInput.files[0])

request.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### Security Interceptor

CSRF protection and token refresh.

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'

const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'
  },
  tokenRefresh: {
    statusCode: 401,
    refreshToken: async () => {
      const res = await fetch('/api/refresh-token', { credentials: 'include' })
      return res.ok
    },
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${getNewToken()}`
    }
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

## Interceptor Combination

Multiple interceptors can be used together and are executed in the order they are added.

```typescript
import { createDebugInterceptor } from '@yh-ui/request'
import { createProgressInterceptor } from '@yh-ui/request'
import { createSecurityInterceptor } from '@yh-ui/request'

// Create each interceptor
const debugInterceptor = createDebugInterceptor({ enabled: true })
const progressInterceptor = createProgressInterceptor({
  onDownloadProgress: (e) => updateProgress(e.percent)
})
const securityInterceptor = createSecurityInterceptor({ csrf: {} })

// Request interceptor execution order: order added
request.interceptors.request.use(securityInterceptor.onRequest)
request.interceptors.request.use(debugInterceptor.onRequest)

// Response interceptor execution order: LIFO (last in, first out)
request.interceptors.response.use(progressInterceptor.onResponse)
request.interceptors.response.use(debugInterceptor.onResponse)
```

## Interceptor Execution Order

```
Request Flow:
1. Request Interceptors (registered first → last)
   ↓
2. Adapter (fetch/XHR)
   ↓
3. Response Interceptors (registered last → first)
```

## Best Practices

- Use request interceptors for: authentication, logging, parameter normalization
- Use response interceptors for: error handling, data transformation, token refresh
- Keep interceptors focused and single-purpose
- Remove interceptors when no longer needed to prevent memory leaks

## Interactive Interceptors Demo

Using the interactive panel below, you can toggle different request and response interceptors, mock requests, and examine how request configurations (Headers, Params) and response data are modified and passed along the interceptor chain.

<DemoBlock title="Interceptor Lifecycle Visualizer" :ts-code="tsInterceptorDemo" :js-code="toJs(tsInterceptorDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>Request Interceptors:</label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="reqAuth" />
          <span>Inject Token (Authorization)</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="reqTime" />
          <span>Inject Timestamp (_t=Date.now())</span>
        </label>
      </div>
      <div class="panel-item" v-if="reqAuth">
        <label>Token Value:</label>
        <yh-input :model-value="tokenVal" @update:model-value="(v) => { tokenVal = String(v) }" size="small" />
      </div>
      <div class="panel-item">
        <label>Response Interceptors:</label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="resUnwrap" />
          <span>Unwrap Response Envelope</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="resError" />
          <span>Intercept & Prompt on 401 Error</span>
        </label>
      </div>
      <div class="panel-item">
        <label>Mock Server Response:</label>
        <div class="button-group">
          <yh-button :type="mockResponseStatus === 200 ? 'primary' : 'default'" size="small" @click="mockResponseStatus = 200">200 OK (Enveloped)</yh-button>
          <yh-button :type="mockResponseStatus === 401 ? 'danger' : 'default'" size="small" @click="mockResponseStatus = 401">401 Unauthorized</yh-button>
        </div>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="pipelineLoading" @click="runPipelineDemo">Trigger Pipeline</yh-button>
        <yh-button @click="clearPipeline" :disabled="pipelineLogs.length === 0">Reset</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">Data Pipeline</span>
      </div>
      <div class="terminal-body" style="display:flex; flex-direction:column; gap:12px">
        <div v-if="pipelineLogs.length === 0" class="empty-log">Click "Trigger Pipeline" to observe data flow...</div>
        <div v-else v-for="(log, i) in pipelineLogs" :key="i" class="pipeline-card" :class="log.type">
          <div class="card-title">{{ log.title }}</div>
          <pre class="card-content">{{ log.content }}</pre>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const reqAuth = ref(true)
const reqTime = ref(true)
const tokenVal = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
const resUnwrap = ref(true)
const resError = ref(true)
const mockResponseStatus = ref(200)

const pipelineLoading = ref(false)
const pipelineLogs = ref<Array<{ title: string; type: string; content: string }>>([])

const runPipelineDemo = async () => {
  if (pipelineLoading.value) return
  pipelineLoading.value = true
  pipelineLogs.value = []

  // Step 1: Initial config
  const initialConfig = {
    url: '/api/user/profile',
    method: 'GET',
    headers: {},
    params: {}
  }
  pipelineLogs.value.push({
    title: '1. Raw Request Config',
    type: 'log-info',
    content: JSON.stringify(initialConfig, null, 2)
  })

  await new Promise(r => setTimeout(r, 400))

  // Step 2: Request Interceptors
  const modifiedConfig = JSON.parse(JSON.stringify(initialConfig))
  if (reqAuth.value) {
    modifiedConfig.headers['Authorization'] = `Bearer ${tokenVal.value}`
  }
  if (reqTime.value) {
    modifiedConfig.params['_t'] = Date.now()
  }
  pipelineLogs.value.push({
    title: '2. After Request Interceptors',
    type: 'log-info',
    content: JSON.stringify(modifiedConfig, null, 2)
  })

  await new Promise(r => setTimeout(r, 400))

  // Step 3: Raw server response
  let rawServerResponse = {}
  if (mockResponseStatus.value === 200) {
    rawServerResponse = {
      status: 200,
      data: {
        code: 200,
        message: 'success',
        result: { id: 99, username: 'Antigravity', role: 'admin' }
      }
    }
  } else {
    rawServerResponse = {
      status: 401,
      data: {
        code: 401,
        message: 'Unauthorized token or token expired'
      }
    }
  }
  pipelineLogs.value.push({
    title: '3. Raw Server Response',
    type: 'log-warning',
    content: JSON.stringify(rawServerResponse, null, 2)
  })

  await new Promise(r => setTimeout(r, 400))

  // Step 4: Response interceptors and output
  let finalResult = {}
  let isError = false
  
  if (mockResponseStatus.value === 200) {
    if (resUnwrap.value) {
      finalResult = (rawServerResponse as any).data.result
    } else {
      finalResult = (rawServerResponse as any).data
    }
  } else {
    isError = true
    if (resError.value) {
      finalResult = {
        error: 'RequestError [Unauthorized]',
        message: 'Token expired. Intercepted and redirected to login page (/login)',
        status: 401
      }
    } else {
      finalResult = {
        error: 'RequestError [Unauthorized]',
        message: 'Unauthorized token or token expired',
        status: 401
      }
    }
  }

  pipelineLogs.value.push({
    title: isError ? '4. UI Error Caught' : '4. Final UI Result',
    type: isError ? 'log-error' : 'log-success',
    content: JSON.stringify(finalResult, null, 2)
  })

  pipelineLoading.value = false
}

const clearPipeline = () => {
  pipelineLogs.value = []
}

const tsInterceptorDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:8px">
    <yh-button type="primary" @click="send">Send Intercepted Request</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { request } from '@yh-ui/request'

// 1. Request interceptor
request.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer TOKEN'
  return config
})

// 2. Response interceptor
request.interceptors.response.use((response) => {
  // Unwrap data
  return response.data
})

const send = async () => {
  const data = await request.get('/api/profile')
  console.log('Unwrapped data:', data)
}
</${_S}>`
</script>

<style>
.pipeline-card {
  border-radius: 6px;
  border-left: 4px solid;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
}
.pipeline-card.log-info {
  border-left-color: #61afef;
}
.pipeline-card.log-warning {
  border-left-color: #e5c07b;
}
.pipeline-card.log-success {
  border-left-color: #98c379;
}
.pipeline-card.log-error {
  border-left-color: #e06c75;
}
.pipeline-card .card-title {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #abb2bf;
}
.pipeline-card .card-content {
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: 11px;
  line-height: 1.4;
  color: #abb2bf;
}
</style>

## Next Steps

- [Cache Strategy](./cache) - Response caching
- [Security](./security) - CSRF and token management
- [Debug Mode](./debug) - Advanced debugging tools
