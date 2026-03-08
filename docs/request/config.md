# 请求配置

## 配置选项

```typescript
import { RequestOptions } from '@yh-ui/request'

interface RequestOptions<TRequest = unknown> {
  /** 请求基础 URL */
  baseURL?: string
  /** 请求路径 */
  url?: string
  /** 请求方法 */
  method?: HttpMethod
  /** URL 查询参数 */
  params?: Record<string, ParamValue>
  /** 请求体数据 */
  data?: TRequest
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求超时时间 (ms) */
  timeout?: number
  /** credentials 模式 */
  credentials?: RequestCredentials
  /** 响应类型 */
  responseType?: ResponseType
  /** 是否 retry */
  retry?: boolean
  /** 重试次数 */
  retryTimes?: number
  /** 重试延迟 (ms) */
  retryDelay?: number
  /** 重试条件函数 */
  retryCondition?: (error: RequestError) => boolean
}
```

## 基础配置

```typescript
// 创建实例
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  credentials: 'same-origin',
  responseType: 'json'
})
```

## 超时配置

```typescript
// 30秒超时（默认）
const response = await request.get('/api/users', {
  timeout: 30000
})

// 5秒超时
const response = await request.get('/api/users', {
  timeout: 5000
})
```

## 重试配置

```typescript
// 启用重试
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3, // 最多重试3次
  retryDelay: 1000 // 重试间隔1秒
})

// 自定义重试条件
const response = await request.get('/api/users', {
  retry: true,
  retryCondition: (error) => {
    // 只在网络错误或500错误时重试
    return error.isNetworkError || error.response?.status === 500
  }
})
```

### 指数退避重试

`@yh-ui/request` 支持自定义重试延迟计算器，实现指数退避、线性退避等策略。

```typescript
import {
  defaultExponentialBackoff,
  linearBackoff,
  fixedBackoff,
  type RetryDelayCalculator
} from '@yh-ui/request'

// 默认指数退避（带随机抖动）
// 第 1 次: 1000-2000ms
// 第 2 次: 2000-3000ms
// 第 3 次: 4000-5000ms
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: defaultExponentialBackoff
})

// 线性退避
// 第 1 次: 1000ms
// 第 2 次: 2000ms
// 第 3 次: 3000ms
const response2 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: linearBackoff
})

// 固定延迟
// 每次: 1000ms
const response3 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: fixedBackoff
})

// 自定义延迟计算器
const customBackoff: RetryDelayCalculator = (retryCount, defaultDelay) => {
  // 指数退避，最大 30 秒
  const delay = defaultDelay * Math.pow(2, retryCount)
  return Math.min(delay, 30000)
}

const response4 = await request.get('/api/users', {
  retry: true,
  retryTimes: 5,
  retryDelayCalculator: customBackoff
})
```

#### 内置延迟计算器对比

| 函数                        | 策略            | 示例 (retryDelay=1000) |
| --------------------------- | --------------- | ---------------------- |
| `defaultExponentialBackoff` | 指数 + 随机抖动 | 1→2→4→8... 秒          |
| `linearBackoff`             | 线性增长        | 1→2→3→4... 秒          |
| `fixedBackoff`              | 固定延迟        | 始终 1 秒              |

#### 延迟计算器类型

```typescript
type RetryDelayCalculator = (retryCount: number, defaultDelay: number) => number

// retryCount: 当前重试次数（从 0 开始）
// defaultDelay: 配置的 retryDelay 值
// 返回: 实际延迟时间（毫秒）
// 返回 -1 表示不再重试
```

## 请求去重

```typescript
// 相同 key 的请求会被自动取消
const response1 = request.get('/api/users', {
  requestKey: 'users-list'
})

const response2 = request.get('/api/users', {
  requestKey: 'users-list' // 会取消 response1
})

// 也可以使用 abortSameKey 自动取消
const response = request.get('/api/users', {
  abortSameKey: true // 自动使用 url + params 作为 key
})
```

## 响应类型

```typescript
// JSON (默认)
const { data } = await request.get('/api/data')

// 文本
const text = await request.get('/api/text', {
  responseType: 'text'
})

// Blob (文件下载)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})

// ArrayBuffer
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})

// FormData
const formData = await request.get('/api/form', {
  responseType: 'formdata'
})
```

## 默认配置

```typescript
// 设置全局默认配置
request.setConfig({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 获取当前配置
const config = request.getConfig()
```
