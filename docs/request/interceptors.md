# 拦截器

`@yh-ui/request` 提供了强大的拦截器系统，支持请求前后、响应前后的钩子，以及内置的调试、进度和安全拦截器。

## 基础拦截器

### 请求拦截器

在请求发送前修改配置或添加通用逻辑。

```typescript
import { request } from '@yh-ui/request'

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加认证 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }

    // 添加时间戳防止缓存
    config.params = {
      ...config.params,
      _t: Date.now()
    }

    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)
```

### 响应拦截器

在响应数据返回前进行统一处理。

```typescript
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理业务错误码
    if (response.data.code !== 200) {
      return Promise.reject(new Error(response.data.message))
    }
    return response
  },
  (error) => {
    // 统一处理错误
    if (error.response?.status === 401) {
      // 跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### 移除拦截器

通过 `eject` 方法可以移除已添加的拦截器。

```typescript
// 添加拦截器时会返回 ID
const requestId = request.interceptors.request.use((config) => {
  config.headers['X-Request-Time'] = new Date().toISOString()
  return config
})

// 移除指定拦截器
request.interceptors.request.eject(requestId)

// 清除所有拦截器
request.interceptors.request.clear()
```

## 内置拦截器

### 调试拦截器

`debug` 拦截器可以输出详细的请求/响应日志，方便调试。

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

// 创建调试拦截器
const debugInterceptor = createDebugInterceptor({
  enabled: true, // 启用调试
  level: 'log', // 日志级别: log | warn | error
  logRequestBody: true, // 是否打印请求体
  logResponseBody: true // 是否打印响应体
})

// 添加到请求实例
request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
```

**调试输出示例：**

```
[YH-Request] GET req_1234567890_1 → GET /api/users
[YH-Request] GET req_1234567890_1 [200] (145ms)
```

**脱敏处理：**

```typescript
const debugInterceptor = createDebugInterceptor({
  enabled: true,
  sanitize: (info) => {
    // 移除敏感信息
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

**使用 DebugLogger 类：**

```typescript
import { DebugLogger } from '@yh-ui/request'

const logger = new DebugLogger()

// 添加拦截器收集日志
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

// 获取所有日志
const logs = logger.getLogs()

// 清除日志
logger.clear()
```

### 进度拦截器

监听文件上传和下载进度，适用于大文件传输场景。

```typescript
import { createProgressInterceptor } from '@yh-ui/request'

const progressInterceptor = createProgressInterceptor({
  // 上传进度
  onUploadProgress: (event) => {
    console.log(`上传进度: ${event.percent.toFixed(1)}%`)
    console.log(`已上传: ${event.loaded}/${event.total} bytes`)
    console.log(`速率: ${(event.rate || 0).toFixed(0)} bytes/s`)
    console.log(`预计剩余: ${((event.estimated || 0) / 1000).toFixed(1)}s`)
  },
  // 下载进度
  onDownloadProgress: (event) => {
    console.log(`下载进度: ${event.percent.toFixed(1)}%`)
    console.log(`已下载: ${event.loaded}/${event.total} bytes`)
  }
})

// 添加到请求实例
request.interceptors.request.use(progressInterceptor.onRequest)
request.interceptors.response.use(progressInterceptor.onResponse)
```

**进度事件结构：**

```typescript
interface ProgressEvent {
  loaded: number // 已传输字节
  total: number // 总字节
  percent: number // 进度百分比 (0-100)
  rate?: number // 传输速率 (bytes/s)
  estimated?: number // 预计剩余时间 (ms)
}
```

**结合 FormData 上传文件：**

```typescript
const formData = new FormData()
formData.append('file', fileInput.files[0])

request.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### 安全拦截器

提供 CSRF 防护和 Token 自动刷新功能。

#### CSRF 防护

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'

const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN', // Cookie 名称
    headerName: 'X-XSRF-TOKEN', // Header 名称
    // 或自定义获取函数
    getToken: () => {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1]
    }
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

默认情况下，CSRF Token 会自动添加到非安全方法（POST、PUT、PATCH、DELETE）的请求头中。

#### Token 刷新

当收到 401 错误时自动刷新 Token 并重试请求。

```typescript
let isRefreshing = false
const pendingRequests: Array<() => void> = []

const securityInterceptor = createSecurityInterceptor({
  tokenRefresh: {
    statusCode: 401,
    isRefreshing: () => isRefreshing,
    pendingRequests,
    refreshToken: async () => {
      // 调用刷新 Token 接口
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        credentials: 'include'
      })
      return response.ok
    },
    updateHeaders: (headers) => {
      // 更新请求头中的新 Token
      headers['Authorization'] = `Bearer ${getNewToken()}`
    }
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

## 拦截器组合

可以同时使用多个拦截器，执行顺序为添加顺序。

```typescript
import { createDebugInterceptor } from '@yh-ui/request'
import { createProgressInterceptor } from '@yh-ui/request'
import { createSecurityInterceptor } from '@yh-ui/request'

// 创建各个拦截器
const debugInterceptor = createDebugInterceptor({ enabled: true })
const progressInterceptor = createProgressInterceptor({
  onDownloadProgress: (e) => updateProgress(e.percent)
})
const securityInterceptor = createSecurityInterceptor({ csrf: {} })

// 请求拦截器执行顺序：添加顺序
request.interceptors.request.use(securityInterceptor.onRequest)
request.interceptors.request.use(debugInterceptor.onRequest)

// 响应拦截器执行顺序：添加顺序（后进先出）
request.interceptors.response.use(progressInterceptor.onResponse)
request.interceptors.response.use(debugInterceptor.onResponse)
```

## 交互式拦截器演示

通过下方的交互面板，您可以启用或禁用不同的请求/响应拦截器，模拟发送请求，并实时查看请求配置（Headers、Params）与响应数据在拦截器链条中传递和转换的过程。

<DemoBlock title="拦截器生命周期可视化" :ts-code="tsInterceptorDemo" :js-code="toJs(tsInterceptorDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>请求拦截器 (Request Interceptors):</label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="reqAuth" />
          <span>注入 Token (Authorization)</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="reqTime" />
          <span>注入时间戳参数 (_t=Date.now())</span>
        </label>
      </div>
      <div class="panel-item" v-if="reqAuth">
        <label>Token 值:</label>
        <yh-input :model-value="tokenVal" @update:model-value="(v) => { tokenVal = String(v) }" size="small" />
      </div>
      <div class="panel-item">
        <label>响应拦截器 (Response Interceptors):</label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="resUnwrap" />
          <span>返回数据拆包 (Unwrap Envelope)</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="resError" />
          <span>统一拦截并弹出 401 报错</span>
        </label>
      </div>
      <div class="panel-item">
        <label>模拟服务端响应:</label>
        <div class="button-group">
          <yh-button :type="mockResponseStatus === 200 ? 'primary' : 'default'" size="small" @click="mockResponseStatus = 200">200 OK (外层嵌套)</yh-button>
          <yh-button :type="mockResponseStatus === 401 ? 'danger' : 'default'" size="small" @click="mockResponseStatus = 401">401 Unauthorized</yh-button>
        </div>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="pipelineLoading" @click="runPipelineDemo">触发请求流程</yh-button>
        <yh-button @click="clearPipeline" :disabled="pipelineLogs.length === 0">复位</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">数据流动管道 (Data Pipeline)</span>
      </div>
      <div class="terminal-body" style="display:flex; flex-direction:column; gap:12px">
        <div v-if="pipelineLogs.length === 0" class="empty-log">点击“触发请求流程”观察数据流向...</div>
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
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
    title: '1. 初始请求配置 (Raw Request Config)',
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
    title: '2. 请求拦截器处理后 (After Request Interceptors)',
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
    title: '3. 服务端返回原始响应 (Raw Server Response)',
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
        message: 'Token 失效，系统已自动拦截并跳转至登录页 /login',
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
    title: isError ? '4. UI 捕获到错误 (UI Error Caught)' : '4. UI 接收到最终数据 (Final UI Result)',
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
    <yh-button type="primary" @click="send">发送拦截器请求</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { request } from '@yh-ui/request'

// 1. 请求拦截器
request.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer TOKEN'
  return config
})

// 2. 响应拦截器
request.interceptors.response.use((response) => {
  // 数据解包
  return response.data
})

const send = async () => {
  const data = await request.get('/api/profile')
  console.log('解包数据:', data)
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

## 下一步

- [缓存策略](./cache) - 数据缓存
- [安全特性](./security) - 详细安全配置
- [useRequest](./use-request) - Vue 请求 Hook
