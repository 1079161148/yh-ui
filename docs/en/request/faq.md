# Frequently Asked Questions (FAQ)

This document collects common questions and solutions when using `@yh-ui/request`.

## Basic Questions

### Q1: How to install and use @yh-ui/request?

```bash
npm install @yh-ui/request
```

```typescript
import { request } from '@yh-ui/request'

const { data } = await request.get('/api/users')
```

### Q2: How to create a custom request instance?

```typescript
import { createRequest } from '@yh-ui/request'

const myRequest = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Q3: How to handle CORS errors?

CORS errors are usually caused by server configuration. Here are client-side solutions:

1. **Use JSONP** (GET only):

```typescript
// Server needs to support JSONP callback
const { data } = await request.get('/api/users', {
  params: { callback: 'callback' }
})
```

2. **Configure proxy** (recommended):

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true
      }
    }
  }
})
```

3. **Server CORS configuration** (root solution):

```typescript
// Server needs to set these headers
Access-Control-Allow-Origin: * // or specific domain
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Q4: How to use in SSR environment?

```typescript
// Nuxt 3 example
export const useApi = () => {
  const config = useRuntimeConfig()

  return createRequest({
    baseURL: config.public.apiBase
  })
}
```

### Q5: How to coexist with axios?

```typescript
// Use separately
import { request as yhRequest } from '@yh-ui/request'
import axios from 'axios'

// Or rename
import { request as yhRequest } from '@yh-ui/request'
const axiosRequest = axios.create()
```

---

## Request Questions

### Q6: How to handle request timeout?

```typescript
// Method 1: Global config
const request = createRequest({
  timeout: 5000
})

// Method 2: Single request config
await request.get('/api/users', {
  timeout: 5000
})

// Method 3: Custom timeout handling
try {
  await request.get('/api/users')
} catch (error) {
  if (error.isTimeout) {
    console.log('Request timeout, please retry')
  }
}
```

### Q7: How to cancel an in-progress request?

```typescript
// Method 1: Use AbortController
const controller = new AbortController()
request.get('/api/users', { signal: controller.signal })
controller.abort()

// Method 2: Use requestKey
request.get('/api/users', { requestKey: 'users-list' })
request.cancel('users-list')

// Method 3: Cancel all requests
request.cancelAll()
```

### Q8: How to implement request retry?

```typescript
await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    // Retry only on network error or 5xx error
    return error.isNetworkError || (error.response?.status ?? 0) >= 500
  }
})
```

### Q9: How to handle FormData upload?

```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('name', 'test')

await request.post('/api/upload', formData, {
  headers: {
    // No need to manually set Content-Type, browser will set it automatically
  }
})
```

### Q10: How to download a file?

```typescript
const response = await request.get('/api/download/file', {
  responseType: 'blob'
})

// Trigger download
const blob = new Blob([response.data])
const url = window.URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = 'filename.ext'
link.click()
window.URL.revokeObjectURL(url)
```

---

## Authentication & Security

### Q11: How to add Authorization header?

```typescript
// Method 1: Global interceptor
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`
  }
  return config
})

// Method 2: Single request
await request.get('/api/users', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

### Q12: How to implement automatic token refresh?

```typescript
// See security.md for details
import { createSecurityInterceptor } from '@yh-ui/request'

const interceptor = createSecurityInterceptor({
  tokenRefresh: {
    statusCode: 401,
    refreshToken: async () => {
      // Call refresh API
      const res = await fetch('/api/refresh', { credentials: 'include' })
      return res.ok
    },
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${newToken}`
    }
  }
})
```

### Q13: How to handle CSRF protection?

```typescript
const interceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'
  }
})

request.interceptors.request.use(interceptor.onRequest)
```

---

## Cache Questions

### Q14: How to enable caching?

```typescript
// Method 1: Request-level cache
await request.get('/api/users', {
  cache: true,
  cacheTime: 5 * 60 * 1000 // 5 minutes
})

// Method 2: SWR mode
const { data } = useRequestSWR(() => request.get('/api/users'), { swr: true, staleTime: 60000 })
```

### Q15: How to clear cache?

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache()

// Clear specific cache
cache.delete('cache-key')

// Clear all cache
cache.clear()

// Clear by tag
cache.set('key', data, { tags: ['users'] })
cache.clearByTag('users')
```

---

## Error Handling

### Q16: How to handle errors globally?

```typescript
// Response interceptor
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isNetworkError) {
      YhMessage.error('Network connection failed')
    } else if (error.response?.status === 401) {
      router.push('/login')
    } else if (error.response?.status === 403) {
      YhMessage.error('No permission')
    } else {
      YhMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)
```

### Q17: How to get detailed error information?

```typescript
try {
  await request.get('/api/users')
} catch (error) {
  console.log('Error type:', error.name)
  console.log('Error message:', error.message)
  console.log('Request ID:', error.requestId)
  console.log('HTTP status:', error.response?.status)
  console.log('Is network error:', error.isNetworkError)
  console.log('Is timeout:', error.isTimeout)
  console.log('Is canceled:', error.isCanceled)
}
```

---

## Vue Integration

### Q18: How to use useRequest in Vue components?

```vue
<script setup>
import { useRequest } from '@yh-ui/request'

const { data, loading, error, run } = useRequest(() => request.get('/api/users'))
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
```

### Q19: How to implement manual trigger?

```typescript
const { loading, run } = useRequest((id) => request.get(`/api/users/${id}`), {
  manual: true // Manual trigger
})

// Call
await run(1)
```

### Q20: How to monitor request progress?

```typescript
await request.post('/api/upload', formData, {
  onUploadProgress: (event) => {
    const percent = Math.round((event.loaded / event.total) * 100)
    console.log(`Upload progress: ${percent}%`)
  },
  onDownloadProgress: (event) => {
    const percent = Math.round((event.loaded / event.total) * 100)
    console.log(`Download progress: ${percent}%`)
  }
})
```

---

## Performance Optimization

### Q21: How to prevent duplicate requests?

```typescript
// Use requestKey for auto-deduplication
request.get('/api/users', { requestKey: 'users-list' })

// Use abortSameKey for auto-deduplication
request.get('/api/users', { abortSameKey: true })
```

### Q22: How to limit concurrent requests?

```typescript
import { useQueue } from '@yh-ui/request'

const { addTask } = useQueue({
  limit: 3 // Max 3 concurrent
})

// Add tasks
addTask(() => request.get('/api/users/1'))
addTask(() => request.get('/api/users/2'))
addTask(() => request.get('/api/users/3'))
addTask(() => request.get('/api/users/4')) // Waits for first 3 to complete
```

### Q23: How to optimize large data requests?

1. **Use pagination**:

```typescript
const { data, pagination } = usePagination((page, size) =>
  request.get('/api/users', { params: { page, size } })
)
```

2. **Use virtual scrolling**: Combine with Table component's virtual scrolling

3. **Enable SWR caching**:

```typescript
const { data } = useRequestSWR(() => request.get('/api/users'), { swr: true, staleTime: 60000 })
```

---

## Debugging Questions

### Q24: How to enable debug mode?

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debug = createDebugInterceptor({
  enabled: import.meta.env.DEV,
  level: 'log',
  sanitize: (info) => {
    // Sanitize sensitive data
    if (info.headers?.Authorization) {
      info.headers.Authorization = '***'
    }
    return info
  }
})

request.interceptors.request.use(debug.onRequest)
request.interceptors.response.use(debug.onResponse)
```

### Q25: How to trace requests?

```typescript
// Each request has a unique requestId
const { data, requestId } = await request.get('/api/users')
console
  .log('Request ID:', requestId)

  // Also available in errors
  .catch((error) => {
    console.log('Error Request ID:', error.requestId)
  })
```

---

## TypeScript

### Q26: How to define request/response types?

```typescript
interface User {
  id: number
  name: string
}

interface CreateUserDTO {
  name: string
  email: string
}

// GET request
const { data } = await request.get<User>('/api/users/1')

// POST request
const { data } = await request.post<User, CreateUserDTO>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
```

### Q27: How to extend request config types?

```typescript
import type { RequestOptions } from '@yh-ui/request'

declare module '@yh-ui/request' {
  interface RequestOptions {
    // Add custom options
    skipErrorHandler?: boolean
    skipAuth?: boolean
  }
}
```

---

## Migration Guide

### Q28: How to migrate from axios?

```typescript
// axios
import axios from 'axios'
axios.get('/api/users')
axios.post('/api/users', data)

// @yh-ui/request
import { request } from '@yh-ui/request'
request.get('/api/users')
request.post('/api/users', data)
```

Main differences:

- `response.data` → returns `data` directly
- `config` → split into base config and request config
- Interceptors use `use` method

### Q29: How to migrate from fetch?

```typescript
// fetch
fetch('/api/users').then((res) => res.json())

// @yh-ui/request
request.get('/api/users') // Auto parse JSON
```

---

## More Help

- 📖 [Documentation](./index)
- 💬 [Issue Report](https://github.com/1079161148/yh-ui/issues)
- 📁 [Complete Examples](./integration)
