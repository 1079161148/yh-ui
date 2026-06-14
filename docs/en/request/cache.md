# Cache Strategy

`@yh-ui/request` provides multi-layered cache solutions including in-memory caching, persistent caching (localStorage/IndexedDB), and out-of-the-box SWR strategy.

## Cache Types

### Memory Cache

Memory cache is the default caching method with the fastest speed, but data is lost after the page closes.

```typescript
import { MemoryCache } from '@yh-ui/request'

const cache = new MemoryCache({
  maxSize: 100, // Max cache entries
  maxAge: 5 * 60 * 1000 // Cache validity: 5 minutes
})

// Set cache
cache.set('user_1', { id: 1, name: 'John' })

// Get cache
const user = cache.get('user_1')

// Delete cache
cache.delete('user_1')

// Clear all cache
cache.clear()
```

### LocalStorage Cache

Suitable for small amounts of persistent storage, with a limit of about 5MB.

```typescript
import { LocalStorageCache } from '@yh-ui/request'

const cache = new LocalStorageCache({
  prefix: 'yh_request_', // Storage key prefix
  maxAge: 24 * 60 * 60 * 1000 // Cache validity: 1 day
})

// Same usage as MemoryCache
cache.set('api_data', { foo: 'bar' })
const data = cache.get('api_data')
```

### IndexedDB Cache

Suitable for large amounts of persistent storage with larger capacity (typically hundreds of MB).

```typescript
import { IndexedDBCache } from '@yh-ui/request'

const cache = new IndexedDBCache({
  dbName: 'yh-request-cache', // Database name
  storeName: 'api-cache', // Object store name
  maxSize: 100 * 1024 * 1024, // Max capacity: 100MB
  maxAge: 7 * 24 * 60 * 60 * 1000 // Cache validity: 7 days
})

// Async operations
await cache.set('large_data', { huge: 'object' })
const data = await cache.get('large_data')
```

## Cache Factory

Use `createCache` factory function to create cache instances by type:

```typescript
import { createCache, type CacheType } from '@yh-ui/request'

// Create memory cache
const memoryCache = createCache('memory')

// Create localStorage cache
const lsCache = createCache('localStorage')

// Create IndexedDB cache
const idbCache = createCache('indexedDB')
```

## Using Cache in Requests

### Manual Caching

Implement request caching through interceptors:

```typescript
import { request, MemoryCache } from '@yh-ui/request'

const apiCache = new MemoryCache()

// Request interceptor - check cache
request.interceptors.request.use(async (config) => {
  const cacheKey = config.url + JSON.stringify(config.params)

  // If GET request and has cache, return cached data
  if (config.method === 'GET') {
    const cached = apiCache.get(cacheKey)
    if (cached) {
      return { ...config, cacheData: cached }
    }
  }
  return config
})

// Response interceptor - store cache
request.interceptors.response.use((response) => {
  const cacheKey = response.config.url + JSON.stringify(response.config.params)

  if (response.config.method === 'GET') {
    apiCache.set(cacheKey, response.data)
  }
  return response
})
```

### Auto-Cache Configuration

Specify cache strategy in request configuration:

```typescript
const response = await request.get('/api/users', {
  // Enable cache
  cache: true,
  // Cache validity (ms)
  cacheTime: 5 * 60 * 1000,
  // Cache key
  cacheKey: 'users_list'
})
```

## SWR Strategy

SWR (Stale-While-Revalidate) is a powerful caching strategy: return cached data first (even if stale), then revalidate in the background.

```typescript
import { useRequest } from '@yh-ui/request'

// Basic SWR usage
const { data, loading, error } = useRequest(() => fetchUsers(), {
  swr: true, // Enable SWR mode
  cacheKey: 'users_list', // Cache key
  staleTime: 5 * 60 * 1000, // Fresh time: no re-request within 5 minutes
  cacheTime: 30 * 60 * 1000, // Cache retention: 30 minutes
  refreshOnWindowFocus: true, // Re-request on window focus
  refreshDeps: [() => userId] // Re-request when dependencies change
})
```

### SWR Configuration Options

| Option                 | Description                             | Default         |
| ---------------------- | --------------------------------------- | --------------- |
| `swr`                  | Enable SWR mode                         | `false`         |
| `cacheKey`             | Unique cache identifier                 | Auto-generated  |
| `staleTime`            | Data freshness time (ms)                | `0`             |
| `cacheTime`            | Cache retention time (ms)               | `5 * 60 * 1000` |
| `refreshOnWindowFocus` | Re-request on window focus              | `false`         |
| `refreshDeps`          | Dependency array, re-request on change  | `[]`            |
| `refreshDepsWait`      | Debounce wait on dependency change (ms) | `300`           |

### SWR How It Works

```
1. First request:
   → No cache → Make request → Return data → Store in cache

2. Subsequent requests (within staleTime):
   → Has cache → Return cached data directly → No request made

3. Subsequent requests (after staleTime):
   → Has cache → Return cached data (stale) → Background request → Update cache

4. Window focus (refreshOnWindowFocus: true):
   → Re-request → Update cache and UI
```

## Cache Invalidation

### Invalidate by Key

```typescript
// Delete specific cache
apiCache.delete('users_list')

// Clear all cache
apiCache.clear()
```

### Tag-based Invalidation

```typescript
// Set tags for cache
cache.set('user_1', userData, { tags: ['users', 'profile'] })
cache.set('user_2', userData, { tags: ['users'] })

// Clear by tag
cache.clearByTag('users') // Clear all caches with 'users' tag
```

### ETag Support

Implement HTTP-level cache negotiation through response headers:

```typescript
// Request with If-None-Match
request.interceptors.request.use((config) => {
  const cached = cache.get(config.url)
  if (cached?.etag) {
    config.headers['If-None-Match'] = cached.etag
  }
  return config
})

// Check 304 in response
request.interceptors.response.use((response) => {
  const etag = response.response.headers.get('ETag')
  if (etag && response.response.status === 304) {
    const cached = cache.get(response.config.url!)
    if (cached) {
      return { ...response, data: cached.data }
    }
  }
  // Store new data and ETag
  cache.set(response.config.url!, { data: response.data, etag })
  return response
})
```

## Best Practices

### 1. Set Cache Time Appropriately

```typescript
// Frequently changing data: no cache or short cache
const { data } = await request.get('/api/stock/price', {
  staleTime: 0
})

// Relatively stable data: longer cache
const { data } = await request.get('/api/config/app', {
  staleTime: 30 * 60 * 1000 // 30 minutes
})
```

### 2. Differentiate Cache Granularity

```typescript
// List page cache - differentiate by pagination params
const cacheKey = `users_list_page_${page}_size_${pageSize}`

// Detail page cache - differentiate by ID
const cacheKey = `user_detail_${userId}`
```

### 3. Clear Cache After Login

```typescript
// Clear user-related cache after successful login
const handleLogin = async () => {
  await login()
  // Clear all user-related cache
  apiCache.clearByTag('users')
}
```

## Interactive Cache Demo

Test the performance improvement of in-memory caching in the example below. You can adjust the Cache TTL, send requests multiple times, and observe the duration difference between cache hit (instant) vs cache miss (network delay), as well as the active cache TTL countdown.

<DemoBlock title="API Request Cache Simulator" :ts-code="tsCacheDemo" :js-code="toJs(tsCacheDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>Cache TTL (Time-To-Live):</label>
        <div class="button-group">
          <yh-button v-for="t in [5, 10, 20]" :key="t" :type="cacheTTL === t ? 'primary' : 'default'" size="small" @click="changeTTL(t)">{{ t }} seconds</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label>Cache Status (Key: <code style="color:var(--yh-color-primary)">users-data</code>):</label>
        <div class="cache-status-box" :class="cacheState">
          <span v-if="cacheState === 'empty'">⚠️ No Cache (Empty)</span>
          <span v-else-if="cacheState === 'fresh'">
            🟢 Cache Valid (Fresh) - Remaining: <span class="highlight-val">{{ timeLeft }}</span>s
          </span>
          <span v-else-if="cacheState === 'stale'">
            🔴 Cache Expired
          </span>
        </div>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="cacheLoading" @click="runCacheDemo">Trigger API Request</yh-button>
        <yh-button @click="clearDemoCache" :disabled="cacheState === 'empty'">Clear Cache</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">Network Monitor</span>
      </div>
      <div class="terminal-body">
        <div v-if="cacheLogs.length === 0" class="empty-log">Click "Trigger API Request" to start testing...</div>
        <div v-for="(log, i) in cacheLogs" :key="i" class="log-line" :class="{
          'log-success': log.includes('HIT') || log.includes('✅'),
          'log-error': log.includes('Clear') || log.includes('Expired') || log.includes('🚨'),
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
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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
  addCacheLog(`⚙️ Changed cache TTL to ${sec} seconds`)
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
      addCacheLog(`🚨 Cache expired automatically!`)
    }
  }
}

const runCacheDemo = async () => {
  if (cacheLoading.value) return
  cacheLoading.value = true

  addCacheLog(`📡 Preparing to request data...`)

  // Check cache
  if (cacheData && cacheExpiresAt > Date.now()) {
    // Cache HIT
    addCacheLog(`✅ Cache HIT! Read data successfully from memory (Duration: 0ms)`)
    addCacheLog(`📥 Data payload: ${JSON.stringify(cacheData)}`)
    cacheLoading.value = false
    return
  }

  // Cache MISS
  addCacheLog(`⏳ Cache MISS! Initiating actual network request (simulating delay of 1.5 seconds)...`)
  await new Promise(r => setTimeout(r, 1500))

  cacheData = { id: 123, list: ['User A', 'User B', 'User C'] }
  cacheExpiresAt = Date.now() + cacheTTL.value * 1000
  cacheState.value = 'fresh'
  timeLeft.value = cacheTTL.value

  addCacheLog(`✅ Request Succeeded! Cached data, expires in ${cacheTTL.value} seconds`)
  addCacheLog(`📥 Data payload: ${JSON.stringify(cacheData)}`)

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
  addCacheLog(`🚨 Cache cleared manually!`)
}

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId)
})

const tsCacheDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; gap:8px">
      <yh-button type="primary" @click="fetchData">Get User List</yh-button>
      <yh-button @click="clearCache">Clear Cache</yh-button>
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
    cacheTime: 10 * 1000, // cache 10s
    cacheKey: 'users-data'
  })
  const duration = Date.now() - start
  result.value = \`Loaded successfully (took \${duration}ms): \${JSON.stringify(res.data)}\`
}

const clearCache = () => {
  // Clear cache instance
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

## Next Steps

- [Security](./security) - CSRF protection and Token refresh
- [useRequest](./use-request) - Vue request Hook
- [useSSE](./use-sse) - Server-Sent Events
