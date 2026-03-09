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
const { data, loading, error, run, refresh, cancel, mutate, params } = useRequest(
  (id: number) => request.get<User>(`/api/users/${id}`),
  {
    defaultParams: [1],
    onSuccess: (data) => console.log('Success:', data),
    onError: (err) => console.error('Error:', err)
  }
)

// 手动触发
const { run, loading } = useRequest((keyword: string) => request.get(`/api/search?q=${keyword}`), {
  manual: true
})

// 搜索时调用
const handleSearch = () => {
  run('keyword')
}

// 防抖搜索
const { run: debouncedRun, loading: debouncedLoading } = useRequest(
  (keyword: string) => request.get(`/api/search?q=${keyword}`),
  {
    manual: true,
    debounceWait: 300 // 300ms 防抖
  }
)

// 节流提交
const { run: throttledRun, loading: throttledLoading } = useRequest(
  (formData: Record<string, unknown>) => request.post('/api/submit', formData),
  {
    manual: true,
    throttleWait: 1000 // 1s 节流
  }
)
```

### 10.2 useRequestSWR - SWR 缓存模式

```typescript
import { ref } from 'vue'
import { useRequestSWR } from '@yh-ui/request'

const userId = ref(1)

const { data, loading, error, refresh, cancel } = useRequestSWR(
  () => `/api/users/${userId.value}`,
  (url: string) => request.get<User>(url),
  {
    cacheKey: 'user', // 缓存 key
    staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
    cacheTime: 10 * 60 * 1000, // 缓存保留10分钟
    refreshOnWindowFocus: true, // 窗口聚焦时刷新
    refreshDeps: [userId], // 依赖变化时刷新
    refreshDepsWait: 1000 // 依赖变化后等待时间
  }
)
```

### 10.3 useRequestPolling - 轮询

```typescript
import { useRequestPolling } from '@yh-ui/request'

const { data, loading, pause, resume, refresh, cancel } = useRequestPolling(
  () => request.get('/api/status'),
  {
    polling: true, // 开启轮询
    pollingInterval: 3000, // 轮询间隔 3s
    pollingWhenHidden: false, // 页面隐藏时暂停
    manual: false // 自动开始
  }
)
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
import { ref } from 'vue'
import { useAIStream } from '@yh-ui/request'

const content = ref('') // 累积的文本内容
const thinkingContent = ref('') // 思考内容

const {
  text, // 当前累积的文本
  content as fullContent, // 完整内容
  thinking, // 思考过程
  toolCalls, // 工具调用
  done, // 是否完成
  loading, // 是否在加载
  messages, // 消息列表
  error, // 错误
  start,
  stop,
  reset
} = useAIStream({
  parseAIMessage: true, // 解析 AI 消息格式
  appendMode: true, // 文本追加模式（用于打字机效果）
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

// 停止流式请求
stop()

// 重置状态
reset()
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
  isRunning, // 队列是否正在运行
  isEmpty, // 队列是否为空
  isAllComplete, // 队列是否全部完成
  completedCount, // 已完成数量
  totalCount, // 总数量
  add,
  remove,
  clear,
  start,
  pause,
  resume,
  cancel,
  cancelAll,
  retry,
  retryAll,
  getTask
} = useQueue({
  concurrency: 3, // 最多并发3个
  autoStart: false, // 手动开始
  continueOnError: false // 任务失败时是否继续
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

// 添加另一个高优先级任务
const taskId2 = add(
  async () => {
    const res = await request.get('/api/item/2')
    return res.data
  },
  { priority: 10 } // 高优先级会插队
)

// 移除待执行任务
remove(taskId)

// 清空队列
clear()

// 手动开始执行
start()

// 暂停队列
pause()

// 继续队列
resume()

// 取消单个任务
cancel(taskId)

// 取消所有任务
cancelAll()

// 重试单个失败任务
retry(taskId)

// 重试所有失败任务
retryAll()

// 获取任务详情
const task = getTask(taskId)
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
import { createDebugInterceptor, DebugLogger, debugLogger } from '@yh-ui/request'

// 创建调试拦截器
const debugInterceptor = createDebugInterceptor({
  enabled: true, // 是否启用调试
  level: 'log', // 日志级别：'log' | 'warn' | 'error'
  logRequestBody: true, // 是否打印请求体
  logResponseBody: true, // 是否打印响应体
  sanitize: (info) => {
    // 脱敏处理
    return {
      ...info,
      headers: { ...info.headers, Authorization: '***' }
    }
  },
  logger: (info) => {
    // 自定义日志输出
    console.log('[Request Debug]', info)
  }
})

// 注册拦截器
request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)

// 使用 DebugLogger 类进行日志管理
const logger = new DebugLogger()

// 添加日志
logger.addLog({
  requestId: 'req_123',
  url: '/api/user',
  method: 'GET',
  timestamp: Date.now()
})

// 获取所有日志
const logs = logger.getLogs()

// 根据请求 ID 查找日志
const logsByRequestId = logger.findByRequestId('req_123')

// 导出日志
const exportedLogs = logger.export()

// 清除日志
logger.clear()

// 使用全局 debugLogger 实例
debugLogger.addLog({
  requestId: 'req_456',
  url: '/api/list',
  method: 'POST',
  timestamp: Date.now()
})
```

### 13.3 安全拦截器

```typescript
import {
  createSecurityInterceptor,
  createCSRFInterceptor,
  createTokenRefreshInterceptor
} from '@yh-ui/request'

// 创建完整的安全拦截器
const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN', // CSRF Cookie 名称
    headerName: 'X-XSRF-TOKEN', // CSRF Header 名称
    getToken: () => customToken // 自定义获取 Token 函数
  },
  tokenRefresh: {
    statusCode: 401, // 触发刷新的状态码
    refreshToken: async () => {
      // 刷新 Token 的逻辑
      const res = await request.post('/api/refresh-token')
      return res.data.success
    },
    retryTimes: 3 // 重试次数
  }
})

// 注册请求拦截器
request.interceptors.request.use(securityInterceptor.onRequest)

// 获取 CSRF Token
const csrfToken = securityInterceptor.getCSRFToken()

// 重置 Token 刷新状态
securityInterceptor.resetTokenRefresh()

// 单独使用 CSRF 拦截器
const csrfInterceptor = createCSRFInterceptor({
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN'
})
request.interceptors.request.use(csrfInterceptor.onRequest)

// 单独使用 Token 刷新拦截器
const tokenRefreshInterceptor = createTokenRefreshInterceptor({
  statusCode: 401,
  refreshToken: async () => {
    const res = await request.post('/api/refresh-token')
    return res.data.success
  }
})
// 注意：Token 刷新拦截器需要通过响应错误拦截器处理
```

---

## 十四、缓存策略详解

### 14.1 内存缓存

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache({
  staleTime: 5 * 60 * 1000, // 数据新鲜度 5 分钟
  cacheTime: 10 * 60 * 1000, // 缓存存活时间 10 分钟
  enabled: true // 是否启用缓存
})

// 使用
cache.set('key', { data: 'value' })
const value = cache.get<{ data: string }>('key')
cache.delete('key')
cache.clear()
cache.has('key') // 检查缓存是否存在
cache.size() // 获取缓存大小
cache.keys() // 获取所有缓存 key

// 启动定时清理
cache.startCleanup(60 * 1000) // 每分钟清理过期缓存

// 停止定时清理
cache.stopCleanup()
```

### 14.2 持久化缓存

```typescript
import { LocalStorageCache, IndexedDBCache } from '@yh-ui/request'

// localStorage 缓存
const localCache = new LocalStorageCache({
  prefix: 'yh-request:', // 缓存前缀
  maxSize: 5 * 1024 * 1024 // 存储上限 5MB
})

// 使用
localCache.set('key', { data: 'value' })
const value = localCache.get<{ data: string }>('key')
localCache.delete('key')
localCache.clear()
localCache.has('key')
localCache.keys()

// IndexedDB 缓存（适合大量数据）
const idbCache = new IndexedDBCache({
  dbName: 'yh-request-cache', // 数据库名称
  storeName: 'cache', // 存储名称
  dbVersion: 1 // 数据库版本
})

// IndexedDB 是异步的
await idbCache.set('key', { data: 'value' })
const value = await idbCache.get<{ data: string }>('key')
await idbCache.delete('key')
await idbCache.clear()
await idbCache.has('key')
await idbCache.keys()
await idbCache.cleanup() // 清理过期缓存
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

## 十九、useQueue 优先级队列（完全指南）

### 19.1 功能概述

`useQueue` 是一个功能强大的优先级队列管理 Hook，支持并发控制、任务优先级、延迟执行、失败重试等功能。适用于需要批量处理请求或控制并发数的场景。

### 19.2 基本用法

```typescript
import { useQueue } from '@yh-ui/request'

const {
  tasks, // 所有任务列表
  pendingTasks, // 待执行的任务
  runningTasks, // 正在执行的任务
  completedTasks, // 已完成的任务
  failedTasks, // 失败的任务
  isRunning, // 队列是否运行中
  isEmpty, // 队列是否为空
  isAllComplete, // 是否全部完成
  completedCount, // 已完成数量
  totalCount, // 总数量
  add, // 添加任务
  remove, // 移除任务
  clear, // 清空队列
  start, // 开始执行
  pause, // 暂停
  resume, // 继续
  cancel, // 取消单个任务
  cancelAll, // 取消所有任务
  retry, // 重试单个任务
  retryAll, // 重试所有失败任务
  getTask // 获取任务
} = useQueue({
  concurrency: 3, // 最大并发数
  autoStart: false, // 是否自动开始
  continueOnError: false, // 任务失败时是否继续
  onTaskComplete: (task) => console.log('完成:', task.id),
  onTaskError: (task, error) => console.error('失败:', task.id, error),
  onAllComplete: (tasks) => console.log('全部完成')
})
```

### 19.3 任务选项

```typescript
// 添加任务时的选项
const taskId = add(() => request.get('/api/item/1'), {
  key: 'item-1', // 任务唯一标识（用于去重）
  priority: 10, // 优先级（数字越大越先执行）
  delay: 1000, // 延迟执行时间（毫秒）
  metadata: {
    // 自定义元数据
    description: '获取商品详情'
  }
})
```

### 19.4 任务状态

```typescript
// 任务状态类型
type QueueTaskStatus = 'pending' | 'running' | 'fulfilled' | 'rejected' | 'canceled'

// 任务对象结构
interface QueueTask<T = unknown> {
  id: string // 任务唯一ID
  key?: string // 任务key（用于去重）
  task: () => Promise<T> // 任务函数
  priority?: number // 优先级
  status: QueueTaskStatus // 状态
  result?: T // 执行结果
  error?: Error // 错误信息
  metadata?: Record<string, unknown> // 元数据
  startTime?: number // 开始时间
  endTime?: number // 结束时间
  delay?: number // 延迟时间
  createdAt: number // 创建时间
}
```

### 19.5 优先级执行示例

```typescript
// 高优先级任务会插队先执行
add(() => request.get('/api/high-priority'), { priority: 100 })
add(() => request.get('/api/low-priority'), { priority: 1 })
// 高优先级任务会先于低优先级任务执行
```

### 19.6 错误处理与重试

```typescript
// 重试单个失败任务
retry(taskId)

// 重试所有失败任务
retryAll()

// 任务失败时继续执行（不暂停队列）
const queue = useQueue({
  continueOnError: true
})
```

---

## 二十、useRequestQueue 请求队列

### 20.1 功能概述

`useRequestQueue` 是专用于 HTTP 请求的队列管理 Hook，基于 `useQueue` 构建，提供了更便捷的请求队列功能。

### 20.2 基本用法

```typescript
import { useRequestQueue } from '@yh-ui/request'

const {
  tasks,
  pendingTasks,
  runningTasks,
  completedTasks,
  failedTasks,
  isRunning,
  isEmpty,
  isAllComplete,
  completedCount,
  totalCount,
  addRequest, // 添加请求任务
  cancelByKey, // 通过key取消请求
  remove,
  clear,
  start,
  pause,
  resume,
  cancel,
  cancelAll,
  retry,
  retryAll,
  getTask
} = useRequestQueue({
  concurrency: 2, // 最多同时2个请求
  autoStart: true
})
```

### 20.3 添加请求

```typescript
// 添加请求任务
const taskId = addRequest(() => request.get('/api/users'), {
  key: 'get-users', // 请求唯一标识
  priority: 1, // 优先级
  delay: 500, // 延迟发送
  metadata: {
    // 自定义数据
    type: 'request'
  }
})

// 通过key取消请求
cancelByKey('get-users')
```

---

## 二十一、usePagination 分页请求

### 21.1 功能概述

`usePagination` 是专门用于分页请求的 Hook，支持页码跳转、每页条数设置、自动计算总页数等功能。

### 21.2 基本用法

```typescript
import { usePagination } from '@yh-ui/request'

const {
  current, // 当前页码
  pageSize, // 每页条数
  total, // 总数
  totalPages, // 总页数
  data, // 请求数据
  loading, // 加载状态
  refreshing, // 刷新状态
  params, // 请求参数
  error, // 错误信息
  noMore, // 是否没有更多
  loadingMore, // 加载更多状态
  pagination // 分页方法
} = usePagination(
  (page, pageSize) =>
    request.get('/api/list', {
      params: { page, pageSize }
    }),
  {
    defaultPagination: {
      current: 1,
      pageSize: 10
    },
    onSuccess: (data) => console.log('成功', data),
    onError: (error) => console.error('失败', error),
    manual: false // 是否手动触发
  }
)
```

### 21.3 分页方法

```typescript
// 加载指定页
await pagination.loadPage(3)

// 下一页
await pagination.nextPage()

// 上一页
await pagination.prevPage()

// 首页
await pagination.firstPage()

// 末页
await pagination.lastPage()

// 刷新（回到第一页）
await pagination.refresh()

// 设置每页条数
pagination.setPageSize(20)

// 设置总数
pagination.setTotal(100)
```

### 21.4 自动提取总数

自动从响应数据中提取总数（支持多种字段名）：

```typescript
// 响应数据结构可以是以下任一种：
{
  total: 100
}
{
  totalCount: 100
}
{
  totalElements: 100
}
// usePagination 会自动识别并计算分页
```

---

## 二十二、useLoadMore 无限滚动加载

### 22.1 功能概述

`useLoadMore` 是用于无限滚动/加载更多场景的 Hook，支持数据追加、滚动到底部自动加载等功能。

### 22.2 基本用法

```typescript
import { useLoadMore } from '@yh-ui/request'

const {
  current, // 当前页码
  pageSize, // 每页条数
  total, // 总数
  totalPages, // 总页数
  data, // 累积的数据
  loading, // 首次加载状态
  refreshing, // 刷新状态
  loadingMore, // 加载更多状态
  error, // 错误信息
  params, // 请求参数
  noMore, // 是否没有更多
  canLoadMore, // 是否可以加载更多
  loadMore, // 加载更多
  reload, // 重新加载（重置分页）
  refresh, // 刷新
  pagination // 分页方法
} = useLoadMore(
  (page, pageSize) =>
    request.get('/api/list', {
      params: { page, pageSize }
    }),
  {
    initialPage: 1, // 初始页码
    pageSize: 10, // 每页条数
    isLoadMore: true, // 是否启用加载更多
    threshold: 100, // 距底部多少像素触发加载
    manual: false // 是否手动触发
  }
)
```

### 22.3 数据追加逻辑

```typescript
// 刷新时：替换数据
// 加载更多时：追加数据
// 支持数组自动合并
if (Array.isArray(oldData) && Array.isArray(newData)) {
  data.value = [...oldData, ...newData]
}
```

### 22.4 自定义加载更多请求

```typescript
// 可以使用不同的service处理加载更多
const { loadMore } = useLoadMore(
  (page, pageSize) => request.get('/api/list', { params: { page, pageSize } }),
  {
    loadMoreService: (page, pageSize) =>
      request.get('/api/list/loadmore', { params: { page, pageSize } })
  }
)
```

---

## 二十三、WebSocket 支持

### 23.1 功能概述

提供完整的 WebSocket 支持，包括连接管理、自动重连、心跳检测、消息队列等功能。

### 23.2 基本用法

```typescript
import { useWebSocket, createWebSocket } from '@yh-ui/request'

// 作为 Vue Hook 使用
const {
  state, // 连接状态
  isConnected, // 是否已连接
  lastMessage, // 最后收到的消息
  connect, // 连接
  disconnect, // 断开连接
  send, // 发送消息
  sendAndWait, // 发送并等待响应
  onOpen, // 连接成功回调
  onClose, // 关闭回调
  onError, // 错误回调
  onMessage, // 消息回调
  onStateChange, // 状态变化回调
  getClient // 获取原始客户端
} = useWebSocket({
  url: 'wss://example.com/ws',
  reconnect: true, // 自动重连
  reconnectMaxAttempts: 10, // 最大重连次数
  reconnectInterval: 1000, // 初始重连间隔
  reconnectMaxDelay: 30000, // 最大重连延迟
  heartbeat: true, // 启用心跳
  heartbeatInterval: 30000, // 心跳间隔
  heartbeatTimeout: 10000, // 心跳超时
  headers: {
    // 自定义请求头
    Authorization: 'Bearer token'
  },
  binaryType: 'blob', // 二进制数据类型
  encode: (data) => JSON.stringify(data), // 消息编码
  decode: (data) => JSON.parse(data) // 消息解码
})
```

### 23.3 连接状态

```typescript
type WebSocketState =
  | 'connecting' // 连接中
  | 'connected' // 已连接
  | 'disconnecting' // 断开中
  | 'disconnected' // 已断开
  | 'reconnecting' // 重连中
  | 'error' // 错误
```

### 23.4 消息类型

```typescript
interface WebSocketMessage<T = unknown> {
  type: 'text' | 'binary' | 'ping' | 'pong' | 'error' // 消息类型
  data: T // 解析后的数据
  raw: string | ArrayBuffer | Blob // 原始数据
  timestamp: number // 时间戳
}
```

### 23.5 原始客户端用法

```typescript
import { WebSocketClient, createWebSocket } from '@yh-ui/request'

// 创建客户端
const ws = createWebSocket({
  url: 'wss://example.com/ws',
  reconnect: true
})

// 使用链式 API
ws.onOpen(() => console.log('Connected'))
  .onClose((code, reason) => console.log('Closed', code, reason))
  .onError((error) => console.error('Error', error))
  .onMessage((message) => console.log('Message', message.data))
  .connect()

// 发送消息
ws.send({ type: 'hello' })

// 发送并等待响应
const response = await ws.sendAndWait({ type: 'ping' }, 5000)

// 断开连接
ws.disconnect(1000, 'Normal close')
```

### 23.6 环境检测

```typescript
import { isWebSocketSupported } from '@yh-ui/request'

if (isWebSocketSupported()) {
  // 当前环境支持 WebSocket
}
```

---

## 二十四、GraphQL 支持

### 24.1 功能概述

提供完整的 GraphQL 支持，包括查询构建器、客户端、模板标签函数等功能。

### 24.2 gql 模板标签

```typescript
import { gql, createGraphQLClient, createPaginatedQuery } from '@yh-ui/request'

// 使用模板标签编写 GraphQL 查询
const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

// 带变量的查询
const queryWithVars = gql`
  query GetUsers($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
    }
  }
`
```

### 24.3 GraphQL 构建器

```typescript
import { GraphQLBuilder } from '@yh-ui/request'

// 创建查询
const query = new GraphQLBuilder()
  .operation('query')
  .name('GetUser')
  .variable('id', 'ID!')
  .field('user')
  .field('id')
  .field('name')
  .field('email')
  .build()

// 或者链式调用
const mutation = new GraphQLBuilder()
  .operation('mutation')
  .name('CreateUser')
  .variable('input', 'CreateUserInput!')
  .field('createUser')
  .field('id')
  .field('name')
  .variables_({ id: '1' })
  .build()
```

### 24.4 GraphQL 客户端

```typescript
import { createGraphQLClient } from '@yh-ui/request'

// 创建客户端
const client = createGraphQLClient('https://api.example.com/graphql', {
  headers: {
    Authorization: 'Bearer token'
  },
  credentials: 'same-origin'
})

// 发送查询
const { data } = await client.query(
  `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`,
  { id: '1' }
)

// 发送 Mutation
const { data } = await client.mutate(
  `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`,
  { input: { name: 'John' } }
)

// 设置认证
client.setAuthToken('new-token')

// 设置请求头
client.setHeader('X-Custom-Header', 'value')
```

### 24.5 分页查询

```typescript
import { createPaginatedQuery } from '@yh-ui/request'

// 创建分页查询
const { query, getVariables } = createPaginatedQuery(
  'GetUsers', // 查询名称
  'id name email', // 字段
  10 // 默认页面大小
)

// 使用
const variables = getVariables('cursor123')
// => { first: 10, after: 'cursor123' }
```

### 24.6 响应解析

```typescript
import { parseGraphQLResponse } from '@yh-ui/request'

// 解析响应，自动处理错误
try {
  const data = parseGraphQLResponse(response)
  // 如果有 GraphQL 错误会抛出异常
} catch (error) {
  console.error('GraphQL Error:', error.message)
}
```

---

## 二十五、重试延迟计算器

### 25.1 功能概述

提供多种重试延迟策略，支持指数退避、线性退避、固定延迟等。

### 25.2 默认指数退避

```typescript
import { defaultExponentialBackoff } from '@yh-ui/request'

// 默认实现：每次重试延迟翻倍 + 随机抖动
// retryCount: 当前重试次数（从0开始）
// defaultDelay: 基础延迟（毫秒）

// 第1次重试: 1000 * 2^0 + random(0-1000) = 1000-2000ms
// 第2次重试: 1000 * 2^1 + random(0-1000) = 2000-3000ms
// 第3次重试: 1000 * 2^2 + random(0-1000) = 4000-5000ms
// 最大延迟: 30000ms

const delay = defaultExponentialBackoff(retryCount, 1000)
```

### 25.3 线性退避

```typescript
import { linearBackoff } from '@yh-ui/request'

// 每次重试延迟线性增长
// 第1次重试: 1000ms
// 第2次重试: 2000ms
// 第3次重试: 3000ms

const delay = linearBackoff(retryCount, 1000)
```

### 25.4 固定延迟

```typescript
import { fixedBackoff } from '@yh-ui/request'

// 每次重试使用相同延迟
const delay = fixedBackoff(retryCount, 1000) // 始终返回 1000ms
```

### 25.5 指数退避（带最大重试限制）

```typescript
import { exponentialBackoffWithMaxRetries } from '@yh-ui/request'

// 超过最大重试次数返回 -1，表示不再重试
const delay = exponentialBackoffWithMaxRetries(retryCount, 1000, 5)
// retryCount >= 5 时返回 -1
```

### 25.6 在请求中使用

```typescript
import { createRequest, defaultExponentialBackoff, linearBackoff } from '@yh-ui/request'

const request = createRequest({
  defaultOptions: {
    retry: true,
    retryTimes: 3,
    retryDelay: 1000,
    retryDelayCalculator: defaultExponentialBackoff // 使用指数退避
  }
})

// 或单独设置
await request.get('/api/data', {
  retryDelayCalculator: linearBackoff // 本次请求使用线性退避
})
```

---

## 二十六、缓存系统详解

### 26.1 内存缓存 MemoryCache

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache({
  staleTime: 5 * 60 * 1000, // 数据新鲜时间（5分钟）
  cacheTime: 10 * 60 * 1000, // 缓存保留时间（10分钟）
  enabled: true
})

// 设置缓存
cache.set('user:1', { name: 'John' })

// 获取缓存
const user = cache.get('user:1')

// 检查缓存是否存在
const exists = cache.has('user:1')

// 删除缓存
cache.delete('user:1')

// 清空所有缓存
cache.clear()

// 获取缓存大小
const size = cache.size()

// 获取所有 keys
const keys = cache.keys()

// 启动定时清理
cache.startCleanup(60 * 1000) // 每60秒清理一次

// 停止定时清理
cache.stopCleanup()
```

### 26.2 LocalStorage 缓存

```typescript
import { LocalStorageCache } from '@yh-ui/request'

const cache = new LocalStorageCache({
  prefix: 'yh_request_', // 存储前缀
  maxSize: 5 * 1024 * 1024 // 最大5MB
})

// 使用方式与 MemoryCache 相同
cache.set('key', data)
const value = cache.get('key')
const exists = cache.has('key')
const keys = cache.keys()
cache.delete('key')
cache.clear()
```

### 26.3 IndexedDB 缓存

```typescript
import { IndexedDBCache } from '@yh-ui/request'

const cache = new IndexedDBCache({
  dbName: 'yh_request_cache',
  storeName: 'cache',
  dbVersion: 1
})

// IndexedDB 是异步的
await cache.set('key', data)
const value = await cache.get('key')
const exists = await cache.has('key')
const keys = await cache.keys()
await cache.clear()
await cache.delete('key')
await cache.cleanup() // 清理过期数据
```

### 26.4 缓存工厂

```typescript
import { createCache, CacheType } from '@yh-ui/request'

// 创建缓存实例
const memoryCache = createCache('memory')
const localCache = createCache('localStorage')
const idbCache = createCache('indexedDB')
```

---

## 二十七、拦截器详解

### 27.1 进度监听拦截器

```typescript
import { createProgressInterceptor, XHRProgressHandler, FetchProgressHandler } from '@yh-ui/request'

const progressInterceptor = createProgressInterceptor({
  onUploadProgress: (event) => {
    console.log('上传进度:', event.percent, '%')
    console.log('已上传:', event.loaded, '字节')
    console.log('总大小:', event.total, '字节')
    console.log('传输速率:', event.rate, 'bytes/s')
    console.log('预计剩余时间:', event.estimated, 'ms')
  },
  onDownloadProgress: (event) => {
    console.log('下载进度:', event.percent, '%')
  }
})

request.interceptors.request.use(progressInterceptor.onRequest)
request.interceptors.response.use(progressInterceptor.onResponse)
```

### 27.2 调试拦截器详解

```typescript
import { createDebugInterceptor, DebugLogger, debugLogger } from '@yh-ui/request'

// 创建调试拦截器
const debugInterceptor = createDebugInterceptor({
  enabled: true,
  level: 'log', // log | warn | error
  logRequestBody: true,
  logResponseBody: true,
  sanitize: (info) => {
    // 脱敏处理
    return {
      ...info,
      headers: {
        ...info.headers,
        Authorization: '***'
      }
    }
  },
  logger: (info) => {
    // 自定义日志输出
    console.log('[Custom]', info.message, info)
  }
})

request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
request.interceptors.response.use(undefined, debugInterceptor.onError)

// 使用调试日志类
const logger = new DebugLogger()
logger.addLog({ requestId: 'xxx', url: '/api', method: 'GET', timestamp: Date.now() })
const logs = logger.getLogs()
const requestLogs = logger.findByRequestId('req_123')
logger.clear()
const exported = logger.export() // JSON 导出
```

### 27.3 安全拦截器详解

```typescript
import {
  createSecurityInterceptor,
  createCSRFInterceptor,
  createTokenRefreshInterceptor
} from '@yh-ui/request'

// CSRF 拦截器
const csrfInterceptor = createCSRFInterceptor({
  cookieName: 'XSRF-TOKEN', // Cookie 名称
  headerName: 'X-XSRF-TOKEN', // Header 名称
  getToken: () => customGetToken() // 自定义获取函数
})

// Token 刷新拦截器
const tokenRefreshInterceptor = createTokenRefreshInterceptor({
  statusCode: 401,
  refreshToken: async () => {
    const res = await request.post('/api/refresh-token')
    return res.data.success
  },
  isRefreshing: () => isRefreshing,
  pendingRequests: [],
  updateHeaders: (headers) => {
    headers['Authorization'] = `Bearer ${newToken}`
  },
  retryTimes: 3
})

// 组合安全拦截器
const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'
  },
  tokenRefresh: {
    statusCode: 401,
    refreshToken: async () => {
      /* ... */
    }
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

---

## 二十八、适配器详解

### 28.1 Fetch 适配器

```typescript
import { FetchAdapter } from '@yh-ui/request'

const adapter = new FetchAdapter()

// 检查是否支持
if (adapter.isSupported()) {
  // 使用适配器发送请求
  const response = await adapter.request({
    fullPath: 'https://api.example.com/data',
    method: 'GET',
    headers: {},
    responseType: 'json'
  })
}
```

### 28.2 XHR 适配器

```typescript
import { XHRAdapter } from '@yh-ui/request'

const adapter = new XHRAdapter()

if (adapter.isSupported()) {
  const response = await adapter.request({
    fullPath: 'https://api.example.com/data',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { name: 'John' },
    timeout: 30000,
    credentials: 'same-origin',
    responseType: 'json'
  })
}
```

### 28.3 获取默认适配器

```typescript
import { getDefaultAdapter } from '@yh-ui/request'

const adapter = getDefaultAdapter()
// 自动选择：Fetch > XHR
```

---

## 二十九、工具函数

### 29.1 请求 ID 生成

```typescript
import { generateRequestId } from '@yh-ui/request'

const requestId = generateRequestId()
// 格式: req_timestamp_counter
// 例如: req_1704067200000_1
```

### 29.2 URL 参数序列化

```typescript
import { serializeParams } from '@yh-ui/request'

const query = serializeParams({
  name: 'John',
  age: 30,
  tags: ['a', 'b']
})
// 结果: name=John&age=30&tags=a&tags=b
```

### 29.3 URL 构建

```typescript
import { buildURL } from '@yh-ui/request'

const url = buildURL({
  baseURL: 'https://api.example.com',
  url: '/users',
  params: { page: 1, size: 10 }
})
// 结果: https://api.example.com/users?page=1&size=10
```

### 29.4 路径参数构建

```typescript
import { buildPath, PathParams } from '@yh-ui/request'

// 类型安全
type Params = PathParams<'/api/users/:id'>
// => { id: string }

const url = buildPath('/api/users/:id', { id: '123' })
// 结果: /api/users/123

// 多个参数
const url2 = buildPath('/api/users/:userId/posts/:postId', { userId: '1', postId: '2' })
// 结果: /api/users/1/posts/2
```

### 29.5 HTTP 缓存工具

```typescript
import {
  HttpCache,
  createHttpCacheInterceptor,
  httpCache,
  parseCacheControl,
  isResponseCacheable
} from '@yh-ui/request'

// 创建 HTTP 缓存实例
const cache = new HttpCache({
  enabled: true,
  etagHeader: 'ETag',
  lastModifiedHeader: 'Last-Modified',
  maxAge: 5 * 60 * 1000,
  staleWhileRevalidate: false,
  staleTime: 60 * 1000
})

// 使用缓存拦截器
const interceptor = createHttpCacheInterceptor({ enabled: true })
request.interceptors.request.use(interceptor.onRequest)
request.interceptors.response.use(interceptor.onResponse)

// 解析 Cache-Control 头
const cacheControl = parseCacheControl(response.headers.get('Cache-Control'))
// 结果: { maxAge: 300, noCache: false, noStore: false, ... }

// 判断响应是否可缓存
const canCache = isResponseCacheable(response)
```

---

## 三十、请求控制

### 30.1 取消请求

```typescript
import { createRequest } from '@yh-ui/request'

const request = createRequest()

// 取消指定 key 的请求
request.cancel('user-fetch')

// 取消所有请求
request.cancelAll()

// 或在请求级别取消
const controller = new AbortController()
await request.get('/api/data', { signal: controller.signal })
controller.abort()
```

### 30.2 配置管理

```typescript
// 设置默认配置
request.setConfig({
  timeout: 30000,
  retry: true
})

// 获取当前配置
const config = request.getConfig()
```

### 30.3 便捷 HTTP 方法

```typescript
// 支持的所有 HTTP 方法
request.get(url, options)
request.post(url, data, options)
request.put(url, data, options)
request.delete(url, options)
request.patch(url, data, options)
request.head(url, options) // HEAD 请求
request.options(url, options) // OPTIONS 请求
```

---

_文档版本：1.2 | 更新日期：2026_
