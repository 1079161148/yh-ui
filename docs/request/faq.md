# 常见问题 (FAQ)

本文档收集了使用 `@yh-ui/request` 过程中的常见问题及解决方案。

## 基础问题

### Q1: 如何安装和使用 @yh-ui/request？

```bash
npm install @yh-ui/request
```

```typescript
import { request } from '@yh-ui/request'

const { data } = await request.get('/api/users')
```

### Q2: 如何创建自定义请求实例？

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

### Q3: 如何处理 CORS 错误？

CORS 错误通常由服务器配置引起，客户端可以尝试以下方案：

1. **使用 JSONP**（仅 GET）：

```typescript
// 服务器需要支持 JSONP 回调
const { data } = await request.get('/api/users', {
  params: { callback: 'callback' }
})
```

2. **配置代理**（推荐）：

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

3. **服务器配置 CORS**（根本解决方案）：

```typescript
// 服务器需要设置以下响应头
Access-Control-Allow-Origin: * // 或具体域名
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Q4: 如何在 SSR 环境中使用？

```typescript
// Nuxt 3 示例
export const useApi = () => {
  const config = useRuntimeConfig()

  return createRequest({
    baseURL: config.public.apiBase
  })
}
```

### Q5: 如何与 axios 共存？

```typescript
// 分别导入使用
import { request as yhRequest } from '@yh-ui/request'
import axios from 'axios'

// 或者重命名
import { request as yhRequest } from '@yh-ui/request'
const axiosRequest = axios.create()
```

---

## 请求问题

### Q6: 请求超时后如何处理？

```typescript
// 方式1: 全局配置
const request = createRequest({
  timeout: 5000
})

// 方式2: 单次请求配置
await request.get('/api/users', {
  timeout: 5000
})

// 方式3: 自定义超时处理
try {
  await request.get('/api/users')
} catch (error) {
  if (error.isTimeout) {
    console.log('请求超时，请重试')
  }
}
```

### Q7: 如何取消正在进行的请求？

```typescript
// 方式1: 使用 AbortController
const controller = new AbortController()
request.get('/api/users', { signal: controller.signal })
controller.abort()

// 方式2: 使用 requestKey
request.get('/api/users', { requestKey: 'users-list' })
request.cancel('users-list')

// 方式3: 取消所有请求
request.cancelAll()
```

### Q8: 如何实现请求重试？

```typescript
await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    // 只在网络错误或 5xx 错误时重试
    return error.isNetworkError || (error.response?.status ?? 0) >= 500
  }
})
```

### Q9: 如何处理 FormData 上传？

```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('name', 'test')

await request.post('/api/upload', formData, {
  headers: {
    // 不需要手动设置 Content-Type，浏览器会自动设置
  }
})
```

### Q10: 如何下载文件？

```typescript
const response = await request.get('/api/download/file', {
  responseType: 'blob'
})

// 触发下载
const blob = new Blob([response.data])
const url = window.URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = 'filename.ext'
link.click()
window.URL.revokeObjectURL(url)
```

---

## 认证与安全

### Q11: 如何添加 Authorization 头？

```typescript
// 方式1: 全局拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`
  }
  return config
})

// 方式2: 单次请求
await request.get('/api/users', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

### Q12: 如何实现 Token 自动刷新？

```typescript
// 详见 security.md 文档
import { createSecurityInterceptor } from '@yh-ui/request'

const interceptor = createSecurityInterceptor({
  tokenRefresh: {
    statusCode: 401,
    refreshToken: async () => {
      // 调用刷新接口
      const res = await fetch('/api/refresh', { credentials: 'include' })
      return res.ok
    },
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${newToken}`
    }
  }
})
```

### Q13: 如何处理 CSRF 防护？

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

## 缓存问题

### Q14: 如何启用缓存？

```typescript
// 方式1: 请求级缓存
await request.get('/api/users', {
  cache: true,
  cacheTime: 5 * 60 * 1000 // 5分钟
})

// 方式2: SWR 模式
const { data } = useRequestSWR(() => request.get('/api/users'), { swr: true, staleTime: 60000 })
```

### Q15: 如何清除缓存？

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache()

// 清除指定缓存
cache.delete('cache-key')

// 清除所有缓存
cache.clear()

// 按标签清除
cache.set('key', data, { tags: ['users'] })
cache.clearByTag('users')
```

---

## 错误处理

### Q16: 如何统一处理错误？

```typescript
// 响应拦截器
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isNetworkError) {
      YhMessage.error('网络连接失败')
    } else if (error.response?.status === 401) {
      router.push('/login')
    } else if (error.response?.status === 403) {
      YhMessage.error('没有权限')
    } else {
      YhMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)
```

### Q17: 如何获取详细的错误信息？

```typescript
try {
  await request.get('/api/users')
} catch (error) {
  console.log('错误类型:', error.name)
  console.log('错误消息:', error.message)
  console.log('请求ID:', error.requestId)
  console.log('HTTP状态码:', error.response?.status)
  console.log('是否为网络错误:', error.isNetworkError)
  console.log('是否超时:', error.isTimeout)
  console.log('是否取消:', error.isCanceled)
}
```

---

## Vue 集成

### Q18: 如何在 Vue 组件中使用 useRequest？

```vue
<script setup>
import { useRequest } from '@yh-ui/request'

const { data, loading, error, run } = useRequest(() => request.get('/api/users'))
</script>

<template>
  <div v-if="loading">加载中...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
```

### Q19: 如何实现手动触发请求？

```typescript
const { loading, run } = useRequest((id) => request.get(`/api/users/${id}`), {
  manual: true // 手动触发
})

// 调用
await run(1)
```

### Q20: 如何监听请求进度？

```typescript
await request.post('/api/upload', formData, {
  onUploadProgress: (event) => {
    const percent = Math.round((event.loaded / event.total) * 100)
    console.log(`上传进度: ${percent}%`)
  },
  onDownloadProgress: (event) => {
    const percent = Math.round((event.loaded / event.total) * 100)
    console.log(`下载进度: ${percent}%`)
  }
})
```

---

## 性能优化

### Q21: 如何防止重复请求？

```typescript
// 使用 requestKey 自动去重
request.get('/api/users', { requestKey: 'users-list' })

// 使用 abortSameKey 自动去重
request.get('/api/users', { abortSameKey: true })
```

### Q22: 如何限制并发请求数？

```typescript
import { useQueue } from '@yh-ui/request'

const { addTask } = useQueue({
  limit: 3 // 最多3个并发
})

// 添加任务
addTask(() => request.get('/api/users/1'))
addTask(() => request.get('/api/users/2'))
addTask(() => request.get('/api/users/3'))
addTask(() => request.get('/api/users/4')) // 等待前3个完成
```

### Q23: 如何优化大数据量请求？

1. **使用分页**：

```typescript
const { data, pagination } = usePagination((page, size) =>
  request.get('/api/users', { params: { page, size } })
)
```

2. **使用虚拟滚动**：结合 Table 组件的虚拟滚动功能

3. **启用 SWR 缓存**：

```typescript
const { data } = useRequestSWR(() => request.get('/api/users'), { swr: true, staleTime: 60000 })
```

---

## 调试问题

### Q24: 如何开启调试模式？

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debug = createDebugInterceptor({
  enabled: import.meta.env.DEV,
  level: 'log',
  sanitize: (info) => {
    // 脱敏处理
    if (info.headers?.Authorization) {
      info.headers.Authorization = '***'
    }
    return info
  }
})

request.interceptors.request.use(debug.onRequest)
request.interceptors.response.use(debug.onResponse)
```

### Q25: 如何追踪请求？

```typescript
// 每个请求都有唯一的 requestId
const { data, requestId } = await request.get('/api/users')
console
  .log('Request ID:', requestId)

  // 在错误中也能获取
  .catch((error) => {
    console.log('Error Request ID:', error.requestId)
  })
```

---

## TypeScript

### Q26: 如何定义请求/响应类型？

```typescript
interface User {
  id: number
  name: string
}

interface CreateUserDTO {
  name: string
  email: string
}

// GET 请求
const { data } = await request.get<User>('/api/users/1')

// POST 请求
const { data } = await request.post<User, CreateUserDTO>('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
```

### Q27: 如何扩展请求配置类型？

```typescript
import type { RequestOptions } from '@yh-ui/request'

declare module '@yh-ui/request' {
  interface RequestOptions {
    // 添加自定义选项
    skipErrorHandler?: boolean
    skipAuth?: boolean
  }
}
```

---

## 迁移指南

### Q28: 如何从 axios 迁移？

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

主要差异：

- `response.data` → 直接返回 `data`
- `config` → 拆分为基础配置和请求配置
- 拦截器使用 `use` 方法

### Q29: 如何从 fetch 迁移？

```typescript
// fetch
fetch('/api/users').then((res) => res.json())

// @yh-ui/request
request.get('/api/users') // 自动解析 JSON
```

---

## 更多帮助

- 📖 [官方文档](./index)
- 💬 [问题反馈](https://github.com/1079161148/yh-ui/issues)
- 📁 [完整示例](./integration)
