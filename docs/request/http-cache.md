# HTTP 缓存协议

`@yh-ui/request` 支持完整的 HTTP 缓存协议，包括 ETag、Last-Modified、Cache-Control 等机制。

## 基本概念

### HTTP 条件请求

HTTP 缓存协议通过条件请求减少不必要的数据传输：

1. **首次请求**：服务器返回数据和缓存头（ETag/Last-Modified）
2. **后续请求**：客户端发送条件头（If-None-Match/If-Modified-Since）
3. **服务器判断**：如未修改返回 304，如已修改返回新数据

### 优势

- **节省带宽**：304 响应只返回头部，无响应体
- **降低延迟**：缓存命中时立即返回
- **减轻服务器压力**：减少不必要的数据传输

## 快速开始

### 使用缓存拦截器

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

const request = createRequest()

// 添加 HTTP 缓存拦截器
const cacheInterceptor = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000 // 5 分钟
})

request.interceptors.request.use(cacheInterceptor.onRequest)
request.interceptors.response.use(cacheInterceptor.onResponse)
```

## 配置选项

| 选项                   | 类型      | 默认值          | 说明                            |
| ---------------------- | --------- | --------------- | ------------------------------- |
| `enabled`              | `boolean` | `true`          | 是否启用条件请求                |
| `etagHeader`           | `string`  | `ETag`          | ETag 响应头名称                 |
| `lastModifiedHeader`   | `string`  | `Last-Modified` | Last-Modified 响应头名称        |
| `maxAge`               | `number`  | `5 * 60 * 1000` | 缓存过期时间 (ms)               |
| `staleWhileRevalidate` | `boolean` | `false`         | 是否启用 stale-while-revalidate |
| `staleTime`            | `number`  | `60 * 1000`     | 备用缓存时间 (ms)               |

## 工作原理

### ETag 流程

```
客户端                              服务端
   |                                  |
   |---- GET /api/user/1 ----------> |
   |                                  |
   |<--- 200 OK + ETag: "abc123" ---|
   |                                  |
   | (缓存数据，ETag)                 |
   |                                  |
   |---- GET /api/user/1 ----------> |
   |    If-None-Match: "abc123"     |
   |                                  |
   |<--- 304 Not Modified ----------|  (未修改，使用缓存)
   |                                  |
```

### Last-Modified 流程

```
客户端                              服务器
   |                                  |
   |---- GET /api/user/1 ----------> |
   |                                  |
   |<--- 200 OK + Last-Modified: ---|
   |       Mon, 01 Jan 2024 00:00:00 GMT
   |                                  |
   | (缓存数据，时间戳)               |
   |                                  |
   |---- GET /api/user/1 ----------> |
   |    If-Modified-Since: -------- |
   |       Mon, 01 Jan 2024 00:00:00 GMT
   |                                  |
   |<--- 304 Not Modified ----------|  (未修改，使用缓存)
   |                                  |
```

## Cache-Control

### 指令说明

| 指令              | 说明            |
| ----------------- | --------------- |
| `max-age=N`       | 缓存有效期 N 秒 |
| `no-cache`        | 每次需要验证    |
| `no-store`        | 不缓存任何内容  |
| `must-revalidate` | 过期后必须验证  |
| `public`          | 可被代理缓存    |
| `private`         | 只在浏览器缓存  |

### 服务器端设置

```typescript
// Node.js Express 示例
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300')
  res.json({ data: '...' })
})

// 或使用 ETag
app.get('/api/data', (req, res) => {
  const data = { data: '...' }
  const etag = generateHash(data)

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end()
  }

  res.set('ETag', etag)
  res.set('Cache-Control', 'public, max-age=300')
  res.json(data)
})
```

## 使用示例

### 基础缓存

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

const request = createRequest()

// 创建缓存拦截器
const { onRequest, onResponse } = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 10 * 60 * 1000 // 10 分钟
})

// 添加拦截器
request.interceptors.request.use(onRequest)
request.interceptors.response.use(onResponse)

// 第一次请求 - 从服务器获取
const response1 = await request.get('/api/users/1')
// 返回: { data: {...}, response: Response }

// 第二次请求 - 如果未修改，返回 304，使用缓存
const response2 = await request.get('/api/users/1')
// 返回: { data: {...}, response: Response(304) }
```

### stale-while-revalidate

允许在后台验证缓存的同时返回过期数据：

```typescript
const { onRequest, onResponse, getCache } = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000, // 5 分钟
  staleWhileRevalidate: true, // 启用
  staleTime: 60 * 1000 // 过期后 1 分钟内仍返回缓存
})

// 获取缓存数据（可能过期）
const cache = getCache()
if (cache) {
  const { data, isStale } = cache
  // isStale 表示数据已过期，但在后台重新验证
}
```

### 获取缓存实例

```typescript
const { onRequest, onResponse, getCache } = createHttpCacheInterceptor()

// 获取缓存实例
const cache = getCache()

// 手动操作缓存
const entry = cache.get('GET:https://api.example.com/data')
if (entry) {
  console.log('缓存数据:', entry.data)
  console.log('ETag:', entry.etag)
}

// 删除缓存
cache.delete('GET:https://api.example.com/data')

// 清空所有缓存
cache.clear()
```

## 便捷函数

### 解析 Cache-Control

```typescript
import { parseCacheControl } from '@yh-ui/request'

const result = parseCacheControl('public, max-age=3600, must-revalidate')

console.log(result)
// {
//   isPublic: true,
//   maxAge: 3600,
//   mustRevalidate: true,
//   noCache: false,
//   noStore: false,
//   isPrivate: false
// }
```

### 判断响应是否可缓存

```typescript
import { isResponseCacheable } from '@yh-ui/request'

// 假设 response 是 Fetch Response 对象
if (isResponseCacheable(response)) {
  console.log('此响应可以缓存')
} else {
  console.log('此响应不可缓存')
}
```

## 与其他特性结合

### 与 SWR 结合

```typescript
import { useRequestSWR, createHttpCacheInterceptor } from '@yh-ui/request'

// 创建缓存拦截器
const { onRequest } = createHttpCacheInterceptor()

const { data } = useRequestSWR(
  () => '/api/users',
  (url) => request.get(url),
  {
    refreshOnWindowFocus: true,
    refreshDeps: [userId]
  }
)
```

### 全局配置

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

// 创建全局请求实例
const request = createRequest()

// 全局添加缓存拦截器
const cacheInterceptor = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000
})

request.interceptors.request.use(cacheInterceptor.onRequest)
request.interceptors.response.use(cacheInterceptor.onResponse)
```

## 注意事项

### 1. 仅对 GET 请求生效

HTTP 缓存协议只对 GET 请求有效，因为只有 GET 请求可以被缓存。

### 2. 隐私数据

对于包含敏感信息的响应，应设置 `Cache-Control: private` 或 `no-store`。

### 3. 实时数据

对于需要实时更新的数据，建议设置 `Cache-Control: no-cache` 或使用较短的 `max-age`。

### 4. 与应用层缓存的区别

| 特性 | HTTP 缓存   | 应用层缓存    |
| ---- | ----------- | ------------- |
| 位置 | 浏览器/代理 | 应用内存/存储 |
| 触发 | 条件请求    | 手动调用      |
| 精度 | 整个响应    | 可部分        |
| 适用 | GET 请求    | 任意请求      |

## API 参考

### HttpCache 类

```typescript
class HttpCache {
  // 获取缓存
  get(key: string): HttpCacheEntry | undefined

  // 设置缓存
  set(key: string, data: unknown, response: Response): void

  // 删除缓存
  delete(key: string): boolean

  // 清空缓存
  clear(): void

  // 检查缓存是否存在
  has(key: string): boolean

  // 获取缓存大小
  size(): number

  // 清理过期缓存
  cleanup(): void
}
```

### HttpCacheEntry

```typescript
interface HttpCacheEntry {
  etag?: string
  lastModified?: string
  data: unknown
  expireTime: number
  createTime: number
  headers?: Record<string, string>
}
```

### createHttpCacheInterceptor

```typescript
function createHttpCacheInterceptor(options?: HttpCacheOptions): {
  onRequest: (config: InternalRequestOptions) => InternalRequestOptions
  onResponse: <T>(response: RequestResponse<T>) => RequestResponse<T>
  getCache: () => HttpCache
}
```
