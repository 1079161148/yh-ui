# Response Handling

## Response Structure

`@yh-ui/request` returns a standardized response object containing complete information.

```typescript
interface RequestResponse<T = unknown> {
  /** Response data */
  data: T
  /** Raw response */
  response: Response
  /** Request configuration */
  config: InternalRequestOptions
  /** Request ID */
  requestId: string
  /** Request duration (ms) */
  duration?: number
}
```

## Basic Usage

```typescript
import { request } from '@yh-ui/request'

// GET request
const { data, response, requestId, duration } = await request.get('/api/users')
console.log(data)
console.log(`Duration: ${duration}ms`)

// POST request
const { data: newUser } = await request.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
```

## Type Inference

Use generics for automatic type inference with complete TypeScript support.

```typescript
interface User {
  id: number
  name: string
  email: string
}

// Auto-infer data type as User
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST request generics
interface CreateUserDTO {
  name: string
  email: string
}

const { data: createdUser } = await request.post<User, CreateUserDTO>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
// createdUser: User (contains full server response including id)
```

## Response Types

Multiple response formats are supported via `responseType`.

```typescript
// JSON (default)
const { data } = await request.get('/api/data')

// Text
const text = await request.get('/api/text', {
  responseType: 'text'
})
// text.data: string

// Blob (for file downloads)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})
// blob.data: Blob

// ArrayBuffer
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})
// buffer.data: ArrayBuffer
```

## Raw Response

If you need to access the raw Response object, you can set `rawResponse: true`.

```typescript
const { response, data } = await request.get('/api/users', {
  rawResponse: true
})

// Access raw response headers
console.log(response.headers.get('Content-Type'))

// Access raw response status
console.log(response.status)
console.log(response.ok)
```

## Error Handling

When a request fails, it throws a `RequestError` with rich error information.

```typescript
import { request } from '@yh-ui/request'

try {
  const { data } = await request.get('/api/users')
} catch (error) {
  // Determine error type
  if (error.isCanceled) {
    console.log('Request cancelled')
  } else if (error.isTimeout) {
    console.log('Request timeout')
  } else if (error.isNetworkError) {
    console.log('Network error')
  } else {
    // HTTP error
    console.log(error.message) // Error message
    console.log(error.response?.status) // HTTP status code
    console.log(error.code) // Error code
    console.log(error.requestId) // Request ID for debugging
  }
}
```

## Fallback Data

You can set `fallbackData` to provide fallback data when the request fails.

```typescript
const { data } = await request.get('/api/user', {
  fallbackData: { name: 'Default User', id: 0 } // Type must match the generic
})

// Even if the request fails, data has a value
console.log(data.name) // 'Default User'
```

## Request Duration

Each response includes request duration information, useful for performance monitoring.

```typescript
const start = Date.now()
const { duration } = await request.get('/api/users')
console.log(`Request duration: ${duration}ms`)

// Can combine with interceptor to log all request durations
request.interceptors.response.use((response) => {
  console.log(`Request ${response.requestId} duration: ${response.duration}ms`)
  return response
})
```

## Next Steps

- [Interceptors](./interceptors) - Request/Response interceptors
- [Cache Strategy](./cache) - Response caching
- [TypeScript Guide](./typescript) - Advanced type usage
