# 调试模式

`@yh-ui/request` 在设计时强调「**可观测性**」，通过 **调试拦截器 + 请求 ID + 统一日志结构**，帮助你快速定位问题。

## 调试拦截器 createDebugInterceptor

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debugInterceptor = createDebugInterceptor({
  enabled: import.meta.env.DEV, // 仅在开发环境启用
  level: 'log', // log / warn / error
  logRequestBody: true, // 是否打印请求体
  logResponseBody: true, // 是否打印响应体
  sanitize: (info) => {
    // 脱敏处理示例
    const next = { ...info }
    if (next.headers?.Authorization) {
      next.headers.Authorization = '***'
    }
    return next
  }
})

// 挂载到请求实例
request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
```

日志结构：

```typescript
interface DebugInfo {
  requestId: string
  url: string
  method: string
  headers?: Record<string, string>
  data?: unknown // 请求体
  response?: unknown // 响应数据
  status?: number
  duration?: number // 耗时 (ms)
  error?: string
  timestamp: number
}
```

示例输出（控制台）：

```json
{
  "message": "[YH-Request] GET req_1710000000000_1 [200] (145ms)",
  "url": "/api/users",
  "status": 200,
  "duration": 145,
  "requestId": "req_1710000000000_1"
}
```

## DebugLogger：收集调试日志

```typescript
import { DebugLogger } from '@yh-ui/request'

const logger = new DebugLogger()

// 在拦截器中收集
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

// 在调试页面中查看
const logs = logger.getLogs()
// 清空
logger.clear()
```

可以结合表格 / 折线图展示接口耗时、错误分布等信息。

## requestId 与追踪

每个请求都有一个全局唯一的 `requestId`：

```typescript
const { data, requestId } = await request.get('/api/users')
console.log('本次请求 ID:', requestId)
```

在后端日志中记录同样的 ID，便于前后端联合排查。

## 与浏览器 DevTools 配合

- 使用调试拦截器查看 **逻辑层面的配置 & 数据**；
- 使用浏览器 Network 面板查看 **实际请求 / 响应**；
- 使用 `requestId`、`url`、`status` 等字段对齐两边信息。

## 建议开启场景

- 开发环境：建议全局启用调试模式；
- 联调 / 压测环境：只保留关键信息（URL、耗时、状态码），避免日志过大；
- 生产环境：只在特定用户 / 调试开关下启用，并严格做脱敏处理。
