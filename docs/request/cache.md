# 缓存策略

`@yh-ui/request` 提供了多层次的缓存解决方案，包括内存缓存、持久化缓存（localStorage/IndexedDB），以及开箱即用的 SWR 策略。

## 缓存类型

### 内存缓存

内存缓存是默认的缓存方式，速度最快，但页面关闭后数据会丢失。

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache({
  maxSize: 100, // 最大缓存条目数
  maxAge: 5 * 60 * 1000 // 缓存有效期：5分钟
})

// 设置缓存
cache.set('user_1', { id: 1, name: '张三' })

// 获取缓存
const user = cache.get('user_1')

// 删除缓存
cache.delete('user_1')

// 清空所有缓存
cache.clear()
```

### LocalStorage 缓存

适用于小量数据的持久化存储，有 5MB 左右的大小限制。

```typescript
import { LocalStorageCache } from '@yh-ui/request'

const cache = new LocalStorageCache({
  prefix: 'yh_request_', // 存储键前缀
  maxAge: 24 * 60 * 60 * 1000 // 缓存有效期：1天
})

// 使用方式与 MemoryCache 相同
cache.set('api_data', { foo: 'bar' })
const data = cache.get('api_data')
```

### IndexedDB 缓存

适用于大量数据的持久化存储，容量更大（通常几百MB）。

```typescript
import { IndexedDBCache } from '@yh-ui/request'

const cache = new IndexedDBCache({
  dbName: 'yh-request-cache', // 数据库名称
  storeName: 'api-cache', // 对象存储名称
  maxSize: 100 * 1024 * 1024, // 最大容量：100MB
  maxAge: 7 * 24 * 60 * 60 * 1000 // 缓存有效期：7天
})

// 异步操作
await cache.set('large_data', { huge: 'object' })
const data = await cache.get('large_data')
```

## 缓存工厂函数

使用 `createCache` 工厂函数根据类型创建缓存实例：

```typescript
import { createCache, type CacheType } from '@yh-ui/request'

// 创建内存缓存
const memoryCache = createCache('memory')

// 创建 localStorage 缓存
const lsCache = createCache('localStorage')

// 创建 IndexedDB 缓存
const idbCache = createCache('indexedDB')
```

## 在请求中使用缓存

### 手动缓存

通过拦截器实现请求缓存：

```typescript
import { request, MemoryCache } from '@yh-ui/request'

const apiCache = new MemoryCache()

// 请求拦截器 - 检查缓存
request.interceptors.request.use(async (config) => {
  const cacheKey = config.url + JSON.stringify(config.params)

  // 如果是 GET 请求且有缓存，直接返回缓存
  if (config.method === 'GET') {
    const cached = apiCache.get(cacheKey)
    if (cached) {
      // 可以选择直接返回或标记缓存命中
      return { ...config, cacheData: cached }
    }
  }
  return config
})

// 响应拦截器 - 存储缓存
request.interceptors.response.use((response) => {
  const cacheKey = response.config.url + JSON.stringify(response.config.params)

  if (response.config.method === 'GET') {
    apiCache.set(cacheKey, response.data)
  }
  return response
})
```

### 自动缓存配置

在请求配置中指定缓存策略：

```typescript
const response = await request.get('/api/users', {
  // 启用缓存
  cache: true,
  // 缓存有效期（毫秒）
  cacheTime: 5 * 60 * 1000,
  // 缓存 key
  cacheKey: 'users_list'
})
```

## SWR 策略

SWR（Stale-While-Revalidate）是一种强大的缓存策略：先返回缓存数据（即使已过期），同时在后台发起请求更新数据。

```typescript
import { useRequest } from '@yh-ui/request'

// 基础 SWR 用法
const { data, loading, error } = useRequest(() => fetchUsers(), {
  swr: true, // 启用 SWR 模式
  cacheKey: 'users_list', // 缓存 key
  staleTime: 5 * 60 * 1000, // 数据新鲜期：5分钟内不重新请求
  cacheTime: 30 * 60 * 1000, // 缓存保留时间：30分钟
  refreshOnWindowFocus: true, // 窗口聚焦时重新请求
  refreshDeps: [() => userId] // 依赖变化时重新请求
})
```

### SWR 配置选项

| 选项                   | 说明                            | 默认值          |
| ---------------------- | ------------------------------- | --------------- |
| `swr`                  | 启用 SWR 模式                   | `false`         |
| `cacheKey`             | 缓存唯一标识                    | 自动生成        |
| `staleTime`            | 数据新鲜期 (ms)，期内不重新请求 | `0`             |
| `cacheTime`            | 缓存保留时间 (ms)               | `5 * 60 * 1000` |
| `refreshOnWindowFocus` | 窗口聚焦时重新请求              | `false`         |
| `refreshDeps`          | 依赖数组，变化时重新请求        | `[]`            |
| `refreshDepsWait`      | 依赖变化防抖等待 (ms)           | `300`           |

### SWR 工作原理

```
1. 首次请求：
   → 无缓存 → 发起请求 → 返回数据 → 存入缓存

2. 后续请求（在 staleTime 内）：
   → 有缓存 → 直接返回缓存数据 → 不发起请求

3. 后续请求（超过 staleTime）：
   → 有缓存 → 先返回缓存数据（stale）→ 后台发起请求 → 更新缓存

4. 窗口聚焦（refreshOnWindowFocus: true）：
   → 重新发起请求 → 更新缓存和界面
```

## 缓存失效

### 按 key 失效

```typescript
// 删除指定缓存
apiCache.delete('users_list')

// 清空所有缓存
apiCache.clear()
```

### 标签失效

```typescript
// 为缓存设置标签
cache.set('user_1', userData, { tags: ['users', 'profile'] })
cache.set('user_2', userData, { tags: ['users'] })

// 按标签清除
cache.clearByTag('users') // 清除所有 users 标签的缓存
```

### ETag 支持

通过响应头实现 HTTP 层缓存协商：

```typescript
// 请求时携带 If-None-Match
request.interceptors.request.use((config) => {
  const cached = cache.get(config.url)
  if (cached?.etag) {
    config.headers['If-None-Match'] = cached.etag
  }
  return config
})

// 响应时检查 304
request.interceptors.response.use((response) => {
  const etag = response.response.headers.get('ETag')
  if (etag && response.response.status === 304) {
    const cached = cache.get(response.config.url!)
    if (cached) {
      return { ...response, data: cached.data }
    }
  }
  // 存储新数据和 ETag
  cache.set(response.config.url!, { data: response.data, etag })
  return response
})
```

## 缓存最佳实践

### 1. 合理设置缓存时间

```typescript
// 频繁变化的数据：不缓存或设置短缓存
const { data } = await request.get('/api/stock/price', {
  staleTime: 0
})

// 相对稳定的数据：长缓存
const { data } = await request.get('/api/config/app', {
  staleTime: 30 * 60 * 1000 // 30分钟
})
```

### 2. 区分缓存粒度

```typescript
// 列表页缓存 - 按分页参数区分
const cacheKey = `users_list_page_${page}_size_${pageSize}`

// 详情页缓存 - 按 ID 区分
const cacheKey = `user_detail_${userId}`
```

### 3. 登录后清除缓存

```typescript
// 登录成功后清除用户相关缓存
const handleLogin = async () => {
  await login()
  // 清除所有用户相关缓存
  apiCache.clearByTag('users')
}
```

## 下一步

- [安全特性](./security) - CSRF 防护与 Token 刷新
- [useRequest](./use-request) - Vue 请求 Hook
- [useSSE](./use-sse) - 服务端推送
