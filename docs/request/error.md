# 错误处理

`@yh-ui/request` 在设计上强调 **可观测性与可恢复性**，为错误处理提供了统一的类型定义、错误分类标识以及多层次的处理方式。

## RequestError 结构

所有请求失败都会抛出 `RequestError` 类型：

```typescript
interface RequestError extends Error {
  message: string
  name: string
  code?: string // 错误代码，如 NETWORK_ERROR / HTTP_500 / CANCELED
  originalError?: Error
  config?: InternalRequestOptions // 原始请求配置
  response?: Response // 原始响应
  isTimeout?: boolean
  isNetworkError?: boolean
  isCanceled?: boolean
  requestId?: string // 唯一请求 ID
}
```

## 基础错误处理

```typescript
try {
  const { data } = await request.get('/api/users')
} catch (error) {
  if (error.isCanceled) {
    console.log('请求被取消')
  } else if (error.isTimeout) {
    console.log('请求超时')
  } else if (error.isNetworkError) {
    console.log('网络错误')
  } else {
    console.log('业务错误:', error.message)
  }
}
```

## 配置层 errorHandler

在单次请求中通过 `errorHandler` 处理错误：

```typescript
await request.get('/api/users', {
  errorHandler: (error) => {
    // 统一 toast 提示
    YhMessage.error(error.message)
  }
})
```

## 拦截器层

通过响应拦截器统一处理：

```typescript
request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data && typeof data === 'object' && data.code !== 0) {
      // 业务错误
      return Promise.reject(
        Object.assign(new Error(data.message || '业务错误'), {
          code: `BIZ_${data.code}`,
          response: response.response,
          config: response.config
        })
      )
    }
    return response
  },
  (error: RequestError) => {
    // HTTP / 网络 等错误在这里统一兜底
    if (error.isNetworkError) {
      YhMessage.error('网络异常，请检查网络连接')
    } else if (error.response?.status === 401) {
      YhMessage.error('登录已过期，请重新登录')
    } else {
      YhMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)
```

## useRequest 回调

在 Hook 层做错误处理：

```typescript
const { data, error } = useRequest(() => request.get('/api/users'), {
  onError: (error) => {
    YhMessage.error(error.message)
  }
})
```

模板中展示错误：

```vue
<template>
  <div v-if="error">
    <yh-alert type="error" :title="error.message" />
  </div>
  <yh-table v-else :data="data || []" />
</template>
```

## 错误分类

### 网络错误

```typescript
if (error.isNetworkError || error.code === 'NETWORK_ERROR') {
  // 无法连接服务器 / DNS 失败等
}
```

### 超时错误

```typescript
if (error.isTimeout) {
  // 连接或响应超过 timeout 限制
}
```

### 取消错误

```typescript
if (error.isCanceled || error.code === 'CANCELED') {
  // 用户主动取消
}
```

### HTTP 状态错误

```typescript
if (error.response) {
  const status = error.response.status
  switch (status) {
    case 400:
      // 参数错误
      break
    case 401:
      // 未登录/登录失效
      break
    case 403:
      // 无权限
      break
    case 500:
      // 服务器内部错误
      break
  }
}
```

## 结合调试与监控

你可以结合调试拦截器或插件，在错误发生时打印更丰富的信息（请求 ID / fullPath / headers 等），便于排查：

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debug = createDebugInterceptor({
  enabled: import.meta.env.DEV,
  level: 'error'
})

request.interceptors.request.use(debug.onRequest)
request.interceptors.response.use(debug.onResponse)
```

## 最佳实践建议

- **分层处理**：请求配置层兜底、拦截器层做统一策略、Hook 层做局部 UI 反馈；
- **错误可观测**：打印 `requestId` / `fullPath` / `status`，便于日志排查；
- **业务码与 HTTP 码分离**：尽量让接口使用统一结构 `{ code, data, message }`，在响应拦截器中一次性转换为 `Error`。
