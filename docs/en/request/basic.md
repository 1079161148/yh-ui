# Basic Usage

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
