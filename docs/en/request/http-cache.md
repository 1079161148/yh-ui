# HTTP Cache Protocol

`@yh-ui/request` supports complete HTTP cache protocol, including ETag, Last-Modified, Cache-Control and more.

## Basic Concepts

### HTTP Conditional Requests

HTTP cache protocol reduces unnecessary data transfer through conditional requests:

1. **First Request**: Server returns data with cache headers (ETag/Last-Modified)
2. **Subsequent Requests**: Client sends conditional headers (If-None-Match/If-Modified-Since)
3. **Server Decision**: Returns 304 if unchanged, new data if modified

### Benefits

- **Bandwidth Saving**: 304 response only returns headers, no response body
- **Lower Latency**: Immediate return on cache hit
- **Reduced Server Load**: Less unnecessary data transfer

## Quick Start

### Use Cache Interceptor

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

const request = createRequest()

// Add HTTP cache interceptor
const cacheInterceptor = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000 // 5 minutes
})

request.interceptors.request.use(cacheInterceptor.onRequest)
request.interceptors.response.use(cacheInterceptor.onResponse)
```

## Configuration Options

| Option                 | Type      | Default         | Description                        |
| ---------------------- | --------- | --------------- | ---------------------------------- |
| `enabled`              | `boolean` | `true`          | Enable conditional requests        |
| `etagHeader`           | `string`  | `ETag`          | ETag response header name          |
| `lastModifiedHeader`   | `string`  | `Last-Modified` | Last-Modified response header name |
| `maxAge`               | `number`  | `5 * 60 * 1000` | Cache expiration time (ms)         |
| `staleWhileRevalidate` | `boolean` | `false`         | Enable stale-while-revalidate      |
| `staleTime`            | `number`  | `60 * 1000`     | Stale cache time (ms)              |

## How It Works

### ETag Flow

```
Client                              Server
   |                                  |
   |---- GET /api/user/1 ----------> |
   |                                  |
   |<--- 200 OK + ETag: "abc123" ---|
   |                                  |
   | (cache data with ETag)          |
   |                                  |
   |---- GET /api/user/1 ----------> |
   |    If-None-Match: "abc123"     |
   |                                  |
   |<--- 304 Not Modified ------------|  (not modified, use cache)
   |                                  |
```

### Last-Modified Flow

```
Client                              Server
   |                                  |
   |---- GET /api/user/1 ----------> |
   |                                  |
   |<--- 200 OK + Last-Modified: ----|
   |       Mon, 01 Jan 2024 00:00:00 GMT
   |                                  |
   | (cache data with timestamp)      |
   |                                  |
   |---- GET /api/user/1 ----------> |
   |    If-Modified-Since: ----------|
   |       Mon, 01 Jan 2024 00:00:00 GMT
   |                                  |
   |<--- 304 Not Modified ------------|  (not modified, use cache)
   |                                  |
```

## Cache-Control

### Directive Reference

| Directive         | Description                    |
| ----------------- | ------------------------------ |
| `max-age=N`       | Cache valid for N seconds      |
| `no-cache`        | Must validate each time        |
| `no-store`        | Don't cache anything           |
| `must-revalidate` | Must validate after expiration |
| `public`          | Can be cached by proxies       |
| `private`         | Only cached in browser         |

### Server-Side Setup

```typescript
// Node.js Express example
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300')
  res.json({ data: '...' })
})

// Or use ETag
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

## Usage Examples

### Basic Caching

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

const request = createRequest()

// Create cache interceptor
const { onRequest, onResponse } = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 10 * 60 * 1000 // 10 minutes
})

// Add interceptors
request.interceptors.request.use(onRequest)
request.interceptors.response.use(onResponse)

// First request - get from server
const response1 = await request.get('/api/users/1')
// Returns: { data: {...}, response: Response }

// Second request - if not modified, returns 304, uses cache
const response2 = await request.get('/api/users/1')
// Returns: { data: {...}, response: Response(304) }
```

### stale-while-revalidate

Allows returning stale data while revalidating in background:

```typescript
const { onRequest, onResponse, getCache } = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: true, // Enable
  staleTime: 60 * 1000 // Return stale within 1 minute after expiration
})

// Get cached data (may be stale)
const cache = getCache()
if (cache) {
  const { data, isStale } = cache
  // isStale indicates data expired but revalidating in background
}
```

### Get Cache Instance

```typescript
const { onRequest, onResponse, getCache } = createHttpCacheInterceptor()

// Get cache instance
const cache = getCache()

// Manually operate cache
const entry = cache.get('GET:https://api.example.com/data')
if (entry) {
  console.log('Cached data:', entry.data)
  console.log('ETag:', entry.etag)
}

// Delete cache
cache.delete('GET:https://api.example.com/data')

// Clear all cache
cache.clear()
```

## Utility Functions

### Parse Cache-Control

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

### Check if Response is Cacheable

```typescript
import { isResponseCacheable } from '@yh-ui/request'

// Assuming response is Fetch Response object
if (isResponseCacheable(response)) {
  console.log('This response can be cached')
} else {
  console.log('This response cannot be cached')
}
```

## Combine with Other Features

### Combine with SWR

```typescript
import { useRequestSWR, createHttpCacheInterceptor } from '@yh-ui/request'

// Create cache interceptor
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

### Global Configuration

```typescript
import { createRequest, createHttpCacheInterceptor } from '@yh-ui/request'

// Create global request instance
const request = createRequest()

// Add cache interceptor globally
const cacheInterceptor = createHttpCacheInterceptor({
  enabled: true,
  maxAge: 5 * 60 * 1000
})

request.interceptors.request.use(cacheInterceptor.onRequest)
request.interceptors.response.use(cacheInterceptor.onResponse)
```

## Notes

### 1. Only Works for GET Requests

HTTP cache protocol only works for GET requests, as only GET requests can be cached.

### 2. Sensitive Data

For responses containing sensitive information, set `Cache-Control: private` or `no-store`.

### 3. Real-time Data

For data that needs real-time updates, set `Cache-Control: no-cache` or use shorter `max-age`.

### 4. Difference from Application-Level Cache

| Feature    | HTTP Cache          | Application Cache  |
| ---------- | ------------------- | ------------------ |
| Location   | Browser/Proxy       | App Memory/Storage |
| Trigger    | Conditional Request | Manual Call        |
| Precision  | Whole Response      | Partial            |
| Applicable | GET Requests        | Any Requests       |

## API Reference

### HttpCache Class

```typescript
class HttpCache {
  // Get cache
  get(key: string): HttpCacheEntry | undefined

  // Set cache
  set(key: string, data: unknown, response: Response): void

  // Delete cache
  delete(key: string): boolean

  // Clear all cache
  clear(): void

  // Check if cache exists
  has(key: string): boolean

  // Get cache size
  size(): number

  // Cleanup expired cache
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
