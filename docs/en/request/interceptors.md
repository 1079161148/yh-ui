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

## Next Steps

- [Cache Strategy](./cache) - Response caching
- [Security](./security) - CSRF and token management
- [Debug Mode](./debug) - Advanced debugging tools
