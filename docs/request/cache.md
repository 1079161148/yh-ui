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

## 交互式缓存演示

通过下方示例，测试内存缓存策略对请求速度的提升。您可以设置缓存有效期 (TTL)，多次发送请求，观察缓存命中 (Cache Hit) 与未命中 (Cache Miss) 时的耗时差异与缓存有效期倒计时。

<DemoBlock title="API 请求缓存模拟器" :ts-code="tsCacheDemo" :js-code="toJs(tsCacheDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>缓存有效期 (TTL):</label>
        <div class="button-group">
          <yh-button v-for="t in [5, 10, 20]" :key="t" :type="cacheTTL === t ? 'primary' : 'default'" size="small" @click="changeTTL(t)">{{ t }} 秒</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label>缓存状态 (Key: <code style="color:var(--yh-color-primary)">users-data</code>):</label>
        <div class="cache-status-box" :class="cacheState">
          <span v-if="cacheState === 'empty'">⚠️ 暂无缓存 (Empty)</span>
          <span v-else-if="cacheState === 'fresh'">
            🟢 缓存有效 (Fresh) - 剩余时间: <span class="highlight-val">{{ timeLeft }}</span> 秒
          </span>
          <span v-else-if="cacheState === 'stale'">
            🔴 缓存已失效 (Expired)
          </span>
        </div>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="cacheLoading" @click="runCacheDemo">发起 API 请求</yh-button>
        <yh-button @click="clearDemoCache" :disabled="cacheState === 'empty'">清除缓存</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">网络请求监视器 (Network Monitor)</span>
      </div>
      <div class="terminal-body">
        <div v-if="cacheLogs.length === 0" class="empty-log">点击“发起 API 请求”开始测试...</div>
        <div v-for="(log, i) in cacheLogs" :key="i" class="log-line" :class="{
          'log-success': log.includes('缓存命中') || log.includes('✅'),
          'log-error': log.includes('清除') || log.includes('🚨'),
          'log-info': log.includes('📡') || log.includes('⏳') || log.includes('📥')
        }">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const cacheTTL = ref(10) // seconds
const cacheState = ref<'empty' | 'fresh' | 'stale'>('empty')
const timeLeft = ref(0)
const cacheLoading = ref(false)
const cacheLogs = ref<string[]>([])

let cacheData: any = null
let cacheExpiresAt = 0
let timerId: any = null

const addCacheLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  cacheLogs.value.push(`[${time}] ${msg}`)
}

const changeTTL = (sec: number) => {
  cacheTTL.value = sec
  addCacheLog(`⚙️ 将缓存有效时间 (TTL) 修改为 ${sec} 秒`)
}

const updateTimer = () => {
  if (cacheExpiresAt > 0) {
    const diff = Math.ceil((cacheExpiresAt - Date.now()) / 1000)
    if (diff > 0) {
      timeLeft.value = diff
      cacheState.value = 'fresh'
    } else {
      timeLeft.value = 0
      cacheState.value = 'stale'
      cacheData = null
      cacheExpiresAt = 0
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
      addCacheLog(`🚨 缓存到期已自动失效!`)
    }
  }
}

const runCacheDemo = async () => {
  if (cacheLoading.value) return
  cacheLoading.value = true

  addCacheLog(`📡 准备请求数据...`)

  // Check cache
  if (cacheData && cacheExpiresAt > Date.now()) {
    // Cache HIT
    addCacheLog(`✅ 缓存命中 (Cache HIT)! 从内存缓存中读取数据成功 (耗时: 0ms)`)
    addCacheLog(`📥 数据内容: ${JSON.stringify(cacheData)}`)
    cacheLoading.value = false
    return
  }

  // Cache MISS
  addCacheLog(`⏳ 缓存未命中 (Cache MISS)! 正在发起真实网络请求 (模拟延迟 1.5 秒)...`)
  await new Promise(r => setTimeout(r, 1500))

  cacheData = { id: 123, list: ['用户 A', '用户 B', '用户 C'] }
  cacheExpiresAt = Date.now() + cacheTTL.value * 1000
  cacheState.value = 'fresh'
  timeLeft.value = cacheTTL.value

  addCacheLog(`✅ 请求成功! 已将数据存入缓存，过期时间为 ${cacheTTL.value} 秒后`)
  addCacheLog(`📥 数据内容: ${JSON.stringify(cacheData)}`)

  if (timerId) clearInterval(timerId)
  timerId = setInterval(updateTimer, 1000)

  cacheLoading.value = false
}

const clearDemoCache = () => {
  cacheData = null
  cacheExpiresAt = 0
  cacheState.value = 'empty'
  timeLeft.value = 0
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  addCacheLog(`🚨 缓存已手动清除!`)
}

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId)
})

const tsCacheDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; gap:8px">
      <yh-button type="primary" @click="fetchData">获取用户列表</yh-button>
      <yh-button @click="clearCache">清除缓存</yh-button>
    </div>
    <div v-if="result" style="padding:12px; border-radius:6px; background:var(--vp-c-bg-soft)">
      {{ result }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request } from '@yh-ui/request'

const result = ref('')

const fetchData = async () => {
  const start = Date.now()
  const res = await request.get('/api/users', {
    cache: true,
    cacheTime: 10 * 1000, // 缓存10秒
    cacheKey: 'users-data'
  })
  const duration = Date.now() - start
  result.value = \`加载成功 (耗时 \${duration}ms): \${JSON.stringify(res.data)}\`
}

const clearCache = () => {
  // 可以引入 createCache 实例并清除
}
</${_S}>`
</script>

<style>
.cache-status-box {
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}
.cache-status-box.empty {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
  border: 1px solid rgba(230, 162, 60, 0.2);
}
.cache-status-box.fresh {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
  border: 1px solid rgba(103, 194, 58, 0.2);
}
.cache-status-box.stale {
  background: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
  border: 1px solid rgba(245, 108, 108, 0.2);
}
</style>

## 下一步

- [安全特性](./security) - CSRF 防护与 Token 刷新
- [useRequest](./use-request) - Vue 请求 Hook
- [useSSE](./use-sse) - 服务端推送
