# @yh-ui/request 2026 架构设计文档

> 面向企业应用、AI 应用及通用场景的现代化 HTTP 请求库，严格类型安全，杜绝 `any`。

---

## 一、核心设计原则

1. **TypeScript 优先**：全链路类型推导，零 `any`，泛型贯穿请求/响应
2. **适配器架构**：可插拔底层实现，统一 API 跨平台
3. **组合优于继承**：插件化、中间件化，按需加载
4. **可观测性内置**：请求 ID、指标、调试模式开箱即用

---

## 二、功能矩阵与实现状态

| 功能模块        | 子功能            | 实现状态 | 说明                                |
| --------------- | ----------------- | -------- | ----------------------------------- |
| **1. 类型系统** | 自动类型推断      | ✅       | 泛型 `Request<TReq, TRes>`          |
|                 | 类型安全 URL 构建 | ✅       | `PathParams<T>` 路径参数校验        |
|                 | 泛型支持          | ✅       | 请求体/响应体全链路泛型             |
| **2. 多平台**   | 适配器架构        | ✅       | `HttpAdapter` 接口                  |
|                 | fetch 适配器      | ✅       | 浏览器/Node 18+                     |
|                 | 跨运行时          | ✅       | 检测环境自动选择                    |
| **3. 缓存**     | 内存缓存          | ✅       | `MemoryCache`                       |
|                 | 持久化缓存        | ✅       | IndexedDB/localStorage 可选         |
|                 | SWR 策略          | ✅       | `useRequestSWR`                     |
|                 | 缓存失效          | ✅       | 标签/路径/ETag                      |
| **4. 流式**     | ReadableStream    | ✅       | `useSSE`                            |
|                 | SSE               | ✅       | AI 流式输出                         |
|                 | 分块上传          | ✅       | 进度回调                            |
| **5. 拦截器**   | 请求/响应拦截器   | ✅       | 链式中间件                          |
|                 | 生命周期钩子      | ✅       | onRequest/onResponse/onError        |
|                 | 上传/下载进度     | ✅       | onUploadProgress/onDownloadProgress |
| **6. 并发**     | 请求去重          | ✅       | `requestKey`                        |
|                 | 并发限制          | ✅       | `useQueue`                          |
|                 | 优先级队列        | ✅       | `priority`                          |
| **7. 容错**     | 自动重试          | ✅       | 指数退避                            |
|                 | 超时控制          | ✅       | 连接/读取超时                       |
|                 | 回退响应          | ✅       | `fallbackData`                      |
| **8. 安全**     | CSRF 防护         | ✅       | 从 cookie 读取 token                |
|                 | Token 自动刷新    | ✅       | 401 检测 + 重试                     |
| **9. 文件**     | 多格式序列化      | ✅       | JSON/FormData/Blob                  |
|                 | 上传进度          | ✅       | ReadableStream 进度                 |
| **10. 可观测**  | 请求 ID           | ✅       | `requestId`                         |
|                 | 性能指标          | ✅       | 耗时、重试次数                      |
|                 | 调试模式          | ✅       | `debug: true`                       |
| **11. 插件**    | 插件系统          | ✅       | `use()` 注册                        |
|                 | 树摇              | ✅       | 按需导入                            |
| **12. 框架**    | Vue Composables   | ✅       | useRequest                          |
|                 | SSR 友好          | ✅       | 条件执行                            |
| **13. AI**      | 流式解析          | ✅       | useAIStream                         |

---

## 三、类型系统设计（零 any）

### 3.1 核心泛型

```typescript
// 泛型请求配置
interface RequestConfig<TRequest = unknown, TResponse = unknown> {
  url: string
  method: HttpMethod
  params?: Record<string, string | number | boolean | string[]>
  data?: TRequest
  responseType?: ResponseType
  // ...
}

// 泛型响应
interface RequestResponse<T = unknown> {
  data: T
  response: Response
  config: RequestConfig
  requestId: string
}
```

### 3.2 类型安全 URL 构建

```typescript
// 路径参数类型
type PathParams<T extends string> = T extends `${infer _}:${infer Param}/${infer Rest}`
  ? Param extends string
    ? { [K in Param]: string } & PathParams<Rest>
    : never
  : T extends `${infer _}:${infer Param}`
    ? { [K in Param]: string }
    : Record<string, never>

// 使用示例
request.get<Order>('/api/orders/:id', { params: { id: '123' } })
// params 必须包含 id: string
```

### 3.3 响应类型推断

```typescript
// 基于 API 定义自动推断
const { data } = await request.get<User>('/api/user/1')
// data: User
```

---

## 四、适配器架构

```
┌─────────────────────────────────────────────────────────────────┐
│                     RequestClient (统一 API)                      │
├─────────────────────────────────────────────────────────────────┤
│  Interceptors (请求/响应/错误)  │  Cache  │  Retry  │  Security  │
├─────────────────────────────────────────────────────────────────┤
│                      HttpAdapter (适配器接口)                     │
├──────────┬──────────┬──────────┬──────────┬──────────────────────┤
│  Fetch   │  XHR     │  Node    │  Deno    │  Custom (可扩展)      │
│  Adapter │  Adapter │  Adapter │  Adapter │                      │
└──────────┴──────────┴──────────┴──────────┴──────────────────────┘
```

---

## 五、缓存策略

```
┌────────────────────────────────────────────────────────────────┐
│                        Cache Layer                               │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│ MemoryCache  │ LocalStorage │ IndexedDB    │ ETag (协商缓存)     │
│ (默认)       │ (可选)       │ (可选)       │ (可选)             │
└──────────────┴──────────────┴──────────────┴────────────────────┘
```

- **staleTime**：数据新鲜度，过期前不重新请求
- **cacheTime**：缓存保留时间
- **SWR**：先返回 stale 数据，后台 revalidate

---

## 六、安全特性

1. **CSRF**：从 `document.cookie` 读取 `XSRF-TOKEN`，自动添加到 `X-XSRF-TOKEN` 头
2. **Token 刷新**：401 时调用 `onRefreshToken`，成功后重试原请求
3. **CSP**：无内联脚本，依赖外部模块

---

## 七、可观测性

- **requestId**：`req_${timestamp}_${counter}` 唯一标识
- **metrics**：`duration`、`retryCount`、`cacheHit`
- **debug**：`debug: true` 时输出请求/响应详情（可脱敏）

---

## 八、文件结构

```
packages/request/
├── src/
│   ├── types/           # 严格类型定义
│   │   ├── request.ts
│   │   ├── adapter.ts
│   │   ├── cache.ts
│   │   └── index.ts
│   ├── adapters/        # 适配器实现
│   │   ├── fetch.ts
│   │   └── index.ts
│   ├── cache/           # 缓存实现
│   ├── interceptors/    # 拦截器
│   ├── request.ts       # 核心客户端
│   ├── useRequest.ts
│   ├── useSSE.ts
│   ├── useAIStream.ts
│   ├── usePagination.ts
│   ├── useLoadMore.ts
│   ├── useQueue.ts
│   ├── useRequestQueue.ts
│   └── index.ts
├── DESIGN.md
└── package.json
```

---

## 九、与 UI 组件库的闭环

- **Message/Notification**：`onError` 统一调用 `YhMessage.error()`
- **Loading**：`loading` 状态绑定 `YhSpin` 或 `YhLoading`
- **表单**：`useRequest` 与 `YhForm` 联用，提交即请求

```typescript
// 示例：与 YH-UI 组件打通
const { data, loading, error, run } = useRequest(fetchUser, {
  onError: (err) => YhMessage?.error?.(err.message),
  onSuccess: () => YhMessage?.success?.('加载成功')
})
```

---

## 十、Vue Composables 详解

### 10.1 useRequest - 基础请求 Hook

```typescript
// 基础用法 - 自动执行
const { data, loading, error, run, refresh, cancel } = useRequest(
  (id) => request.get<User>(`/api/users/${id}`),
  {
    defaultParams: [1],
    onSuccess: (data) => console.log('Success:', data),
    onError: (err) => console.error('Error:', err)
  }
)

// 手动触发
const { run, loading } = useRequest((keyword) => request.get(`/api/search?q=${keyword}`), {
  manual: true
})

// 搜索时调用
const handleSearch = () => {
  run('keyword')
}
```

### 10.2 useRequestSWR - SWR 缓存模式

```typescript
const { data, loading, refresh } = useRequestSWR(
  () => `/api/users/${userId.value}`,
  (url) => request.get<User>(url),
  {
    staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
    cacheTime: 10 * 60 * 1000, // 缓存保留10分钟
    refreshOnWindowFocus: true, // 窗口聚焦时刷新
    refreshDeps: [userId] // 依赖变化时刷新
  }
)
```

### 10.3 useRequestPolling - 轮询

```typescript
const { data, pause, resume } = useRequestPolling(() => request.get('/api/status'), {
  polling: true,
  pollingInterval: 3000,
  pollingWhenHidden: false // 页面隐藏时暂停
})
```

### 10.4 防抖与节流

```typescript
// 防抖搜索
const { run, loading } = useRequest((keyword) => request.get(`/api/search?q=${keyword}`), {
  manual: true,
  debounceWait: 300 // 300ms 防抖
})

// 节流提交
const { run, loading } = useRequest((formData) => request.post('/api/submit', formData), {
  manual: true,
  throttleWait: 1000 // 1s 节流
})
```

---

## 十一、SSE 流式请求

### 11.1 useSSE - 通用 SSE

```typescript
const { content, loading, messages, start, stop } = useSSE({
  onStart: () => console.log('Connection started'),
  onMessage: (msg) => console.log('Received:', msg.data),
  onDone: (fullContent) => console.log('Complete:', fullContent),
  onError: (err) => console.error('Error:', err)
})

// 发起请求
start({
  url: '/api/chat',
  method: 'POST',
  data: { messages: [{ role: 'user', content: 'Hello' }] }
})
```

### 11.2 useAIStream - AI 专用流式

```typescript
const {
  text, // 当前累积的文本
  thinking, // 思考过程
  toolCalls, // 工具调用
  done, // 是否完成
  loading, // 是否在加载
  start,
  stop
} = useAIStream({
  onText: (text, delta) => {
    // 打字机效果：text 是累积文本，delta 是新增内容
    content.value += delta
  },
  onThinking: (thinking) => {
    // 更新思考内容（适用于 o1 类模型）
    thinkingContent.value = thinking
  },
  onToolCall: (tools) => {
    // 处理工具调用
    executeTools(tools)
  }
})

// 发起 AI 请求
start({
  url: '/api/ai/chat',
  method: 'POST',
  data: {
    model: 'gpt-4',
    messages: [{ role: 'user', content: '你好' }],
    stream: true
  }
})
```

---

## 十二、请求队列与并发控制

### 12.1 useQueue - 优先级队列

```typescript
const {
  tasks, // 所有任务
  pendingTasks, // 待执行
  runningTasks, // 执行中
  completedTasks, // 已完成
  failedTasks, // 失败
  isRunning,
  add,
  remove,
  clear,
  start,
  pause,
  resume,
  cancel,
  retry
} = useQueue({
  concurrency: 3, // 最多并发3个
  autoStart: false, // 手动开始
  continueOnError: false
})

// 添加任务（支持优先级）
const taskId = add(
  async () => {
    const res = await request.get('/api/item/1')
    return res.data
  },
  {
    key: 'item-1', // 用于去重
    priority: 1, // 优先级（数字越大越先执行）
    delay: 1000 // 延迟执行
  }
)

// 优先级执行：高优先级任务会插队
add(task2, { priority: 10 }) // 优先执行

// 任务失败重试
retry(taskId)

// 全部重试
retryAll()
```

### 12.2 请求去重

```typescript
// 相同 key 的请求会自动取消上一个
request.get('/api/user/1', {
  requestKey: 'get-user-1',
  abortSameKey: true
})
```

---

## 十三、拦截器详解

### 13.1 请求/响应拦截器

```typescript
const request = createRequest()

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加认证头
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理业务错误
    if (response.data.code !== 0) {
      return Promise.reject(new Error(response.data.message))
    }
    return response
  },
  (error) => {
    // 统一处理错误
    return Promise.reject(error)
  }
)
```

### 13.2 调试拦截器

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debugInterceptor = createDebugInterceptor({
  enabled: true,
  level: 'log',
  logRequestBody: true,
  logResponseBody: false, // 生产环境关闭
  sanitize: (info) => {
    // 脱敏处理
    return {
      ...info,
      headers: { ...info.headers, Authorization: '***' }
    }
  }
})

request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
```

### 13.3 安全拦截器

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
      const res = await request.post('/api/refresh-token')
      return res.data.success
    }
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

---

## 十四、缓存策略详解

### 14.1 内存缓存

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache({
  maxSize: 100, // 最大缓存数
  maxAge: 5 * 60 * 1000 // 5分钟过期
})

// 使用
cache.set('key', { data: 'value' })
const value = cache.get('key')
cache.delete('key')
```

### 14.2 持久化缓存

```typescript
import { LocalStorageCache, IndexedDBCache } from '@yh-ui/request'

// localStorage 缓存
const localCache = new LocalStorageCache({
  prefix: 'yh-request:',
  maxAge: 24 * 60 * 60 * 1000 // 24小时
})

// IndexedDB 缓存（适合大量数据）
const idbCache = new IndexedDBCache({
  dbName: 'yh-request-cache',
  storeName: 'cache',
  maxSize: 50 * 1024 * 1024 // 50MB
})
```

### 14.3 ETag 协商缓存

```typescript
// 响应拦截器中处理 ETag
request.interceptors.response.use(async (response) => {
  const etag = response.response.headers.get('ETag')
  if (etag) {
    localStorage.setItem(`etag:${response.config.url}`, etag)
  }
  return response
})

// 请求拦截器中携带 If-None-Match
request.interceptors.request.use((config) => {
  const etag = localStorage.getItem(`etag:${config.url}`)
  if (etag) {
    config.headers['If-None-Match'] = etag
  }
  return config
})
```

---

## 十五、错误处理

### 15.1 错误类型

```typescript
interface RequestError extends Error {
  code?: string // 错误码：HTTP_404, NETWORK_ERROR, CANCELED
  config?: RequestOptions // 请求配置
  response?: Response // 原始响应
  isTimeout?: boolean // 是否超时
  isNetworkError?: boolean // 是否网络错误
  isCanceled?: boolean // 是否取消
  requestId?: string // 请求 ID
}
```

### 15.2 全局错误处理

```typescript
// 创建实例时配置
const request = createRequest({
  defaultOptions: {
    errorHandler: (error) => {
      // 统一错误提示
      switch (error.code) {
        case 'NETWORK_ERROR':
          YhMessage.error('网络连接失败')
          break
        case 'HTTP_401':
          router.push('/login')
          break
        case 'HTTP_500':
          YhMessage.error('服务器错误')
          break
        default:
          YhMessage.error(error.message)
      }
    }
  }
})
```

---

## 十六、与 UI 组件深度集成

### 16.1 自动 Loading 状态

```typescript
// 配合 YH-Spin 组件
const { loading, run } = useRequest(fetchData, {
  manual: true,
})

// 模板中使用
<template>
  <YhSpin :spinning="loading">
    <div>{{ data }}</div>
  </YhSpin>
  <button @click="run">刷新</button>
</template>
```

### 16.2 表单提交

```typescript
// 配合 YH-Form 组件
const formRef = ref()

const { loading, run } = useRequest((values) => request.post('/api/submit', values), {
  manual: true,
  onSuccess: () => {
    YhMessage.success('提交成功')
    formRef.value.resetFields()
  },
  onError: (err) => {
    YhMessage.error(err.message)
  }
})

const handleSubmit = (values) => {
  run(values)
}
```

### 16.3 列表查询

```typescript
// 配合 YH-Table 组件
const {
  data: tableData,
  loading,
  pagination,
  reload
} = useRequest(
  (page, pageSize) =>
    request.get('/api/list', {
      params: { page, pageSize }
    }),
  {
    defaultParams: [1, 10],
    formatResult: (res) => ({
      data: res.data.list,
      total: res.data.total
    })
  }
)
```

---

## 十七、最佳实践

### 17.1 统一请求实例

```typescript
// api/request.ts
import { createRequest } from '@yh-ui/request'

export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  defaultOptions: {
    retry: true,
    retryTimes: 3,
    errorHandler: handleError
  }
})

// 添加全局拦截器
request.interceptors.request.use(addAuthHeader)
request.interceptors.response.use(handleResponse, handleError)
```

### 17.2 API 模块化

```typescript
// api/user.ts
import { request } from './request'

export const userApi = {
  getUser: (id: string) => request.get<User>(`/api/users/${id}`),

  updateUser: (id: string, data: Partial<User>) => request.put<User>(`/api/users/${id}`, data),

  deleteUser: (id: string) => request.delete(`/api/users/${id}`)
}

// api/order.ts
export const orderApi = {
  getOrders: (params: OrderQuery) => request.get<OrderList>('/api/orders', { params }),

  createOrder: (data: CreateOrderInput) => request.post<Order>('/api/orders', data)
}
```

### 17.3 类型安全实践

```typescript
// 类型定义
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

// 泛型请求
const { data } = await request.get<ApiResponse<User>>('/api/user/1')
// data: ApiResponse<User>

// 类型守卫
function isRequestError(error: unknown): error is RequestError {
  return (error as RequestError)?.requestId !== undefined
}
```

---

## 十八、配置参考

### 18.1 RequestOptions 完整配置

```typescript
interface RequestOptions<TRequest = unknown> {
  // 基础配置
  baseURL?: string
  url?: string
  method?: HttpMethod
  params?: Record<string, ParamValue>
  data?: TRequest
  headers?: Record<string, string>

  // 超时与凭证
  timeout?: number
  credentials?: RequestCredentials

  // 响应处理
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | 'formdata'
  rawResponse?: boolean

  // 重试配置
  retry?: boolean
  retryTimes?: number
  retryDelay?: number
  retryCondition?: (error: RequestError) => boolean

  // 请求控制
  requestKey?: string
  abortSameKey?: boolean

  // 调试
  debug?: boolean

  // 降级
  fallbackData?: unknown
}
```

### 18.2 环境配置

```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_API_PREFIX=/api

// .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_API_PREFIX=/api
```

---

_文档版本：1.1 | 更新日期：2026_
