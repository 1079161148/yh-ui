# Basic Usage

`@yh-ui/request` is a typed request layer for Vue and plain TypeScript projects. It is
small enough for ordinary applications, but still covers cancellation, retries,
timeouts, URL building, interceptors, cache integration, and stream-oriented scenarios.
Use it as the shared HTTP boundary for product code rather than scattering raw `fetch`
calls across components.

The examples below use REST endpoints, but the same request instance can be configured
for GraphQL, internal gateways, or BFF routes. Keep authentication and tenant headers in
request interceptors, keep endpoint-specific validation near the feature, and keep UI
components unaware of transport details.

## Quick Start

```typescript
import { request } from '@yh-ui/request'

// GET request
const response = await request.get('/api/users')
console.log(response.data)

// POST request
const response = await request.post('/api/users', { name: 'John' })
console.log(response.data)
```

## RESTful Methods

All method helpers return the normalized response object from the configured adapter.
Use method helpers for common CRUD paths and reserve the lower-level request function
for uncommon methods or dynamic runtime configuration.

```typescript
// GET - Retrieve data
const users = await request.get('/api/users')

// POST - Create data
const newUser = await request.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})

// PUT - Full update
const updatedUser = await request.put('/api/users/1', {
  name: 'John (updated)'
})

// PATCH - Partial update
const patchedUser = await request.patch('/api/users/1', {
  name: 'John'
})

// DELETE - Delete data
await request.delete('/api/users/1')

// HEAD - Get header information
await request.head('/api/users')

// OPTIONS - Get supported request methods
await request.options('/api/users')
```

## Generic Support

Generics make response contracts explicit at the call site. They do not replace runtime
validation, so pair them with schema validation for untrusted external APIs or
mission-critical workflows. In internal services, they provide a lightweight way to keep
feature code readable and refactorable.

```typescript
interface User {
  id: number
  name: string
  email: string
}

// Auto-infer response type
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST request generics
const { data: newUser } = await request.post<User, CreateUserDTO>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
// newUser: User
```

## Request Configuration

Configuration can be applied globally on an instance or locally per call. Prefer global
defaults for base URL, credentials, timeout, and standard headers. Prefer per-call
configuration for pagination parameters, feature-specific retry behavior, cache keys,
and cancellation signals.

```typescript
// Full configuration
const response = await request.get('/api/users', {
  // Base URL
  baseURL: 'https://api.example.com',

  // URL parameters
  params: {
    page: 1,
    pageSize: 10,
    status: 'active'
  },

  // Request headers
  headers: {
    Authorization: 'Bearer token'
  },

  // Timeout (ms)
  timeout: 30000,

  // Response type
  responseType: 'json',

  // Request credentials
  credentials: 'same-origin',

  // Enable retry
  retry: true,
  retryTimes: 3,
  retryDelay: 1000
})
```

## Path Parameters

`buildPath` keeps dynamic route construction type-safe and avoids fragile string
concatenation. It is especially useful when endpoint paths are shared between request
functions, mock handlers, and integration tests.

```typescript
import { buildPath, type PathParams } from '@yh-ui/request'

// Path parameter types
type UserParams = PathParams<'/api/users/:id'>
// => { id: string }

// Build URL
const url = buildPath('/api/users/:id', { id: '123' })
// => '/api/users/123'
```

## Error Handling

Handle expected network states explicitly in product UI. Cancellation should usually be
silent, timeouts should provide retry affordances, and server validation errors should
be mapped to field-level messages where possible. Unexpected errors should still flow
to logging so teams can identify broken endpoints quickly.

```typescript
try {
  const { data } = await request.get('/api/users')
} catch (error) {
  if (error.isCanceled) {
    console.log('Request cancelled')
  } else if (error.isTimeout) {
    console.log('Request timeout')
  } else if (error.isNetworkError) {
    console.log('Network error')
  } else {
    console.log(error.message)
  }
}
```

## Cancel Requests

Cancellation is important for search boxes, route changes, modal teardown, and
background refresh. Use `AbortController` for local lifecycle ownership and
`requestKey` when multiple parts of a feature need to cancel the same logical request.

```typescript
// Create AbortController
const controller = new AbortController()

// Send cancellable request
request.get('/api/users', {
  signal: controller.signal
})

// Cancel request
controller.abort()

// Auto-cancel with requestKey
request.get('/api/users', {
  requestKey: 'users-list'
})

// Cancel specific key
request.cancel('users-list')

// Cancel all requests
request.cancelAll()
```

## Next Steps

- [Request Config](./config) - Complete configuration options
- [Interceptors](./interceptors) - Request/Response interceptors
- [Cache Strategy](./cache) - Data caching
