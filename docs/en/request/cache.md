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

## Next Steps

- [Security](./security) - CSRF protection and Token refresh
- [useRequest](./use-request) - Vue request Hook
- [useSSE](./use-sse) - Server-Sent Events
