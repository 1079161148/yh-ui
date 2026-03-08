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

## 下一步

- [缓存策略](./cache) - 数据缓存
- [安全特性](./security) - 详细安全配置
- [useRequest](./use-request) - Vue 请求 Hook
