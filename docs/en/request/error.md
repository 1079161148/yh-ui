# Error Handling

`@yh-ui/request` emphasizes **observability and recoverability** in its design, providing unified type definitions, error classification markers, and multi-layered error handling approaches.

## RequestError Structure

All request failures throw `RequestError` type:

```typescript
interface RequestError extends Error {
  message: string
  name: string
  code?: string // Error code, e.g. NETWORK_ERROR / HTTP_500 / CANCELED
  originalError?: Error
  config?: InternalRequestOptions // Original request config
  response?: Response // Original response
  isTimeout?: boolean
  isNetworkError?: boolean
  isCanceled?: boolean
  requestId?: string // Unique request ID
}
```

## Basic Error Handling

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
    console.log('Business error:', error.message)
  }
}
```

## Error Handler in Config

Handle errors in individual requests through `errorHandler`:

```typescript
await request.get('/api/users', {
  errorHandler: (error) => {
    // Unified toast notification
    YhMessage.error(error.message)
  }
})
```

## Interceptor Layer

Handle errors uniformly through response interceptor:

```typescript
request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data && typeof data === 'object' && data.code !== 0) {
      // Business error
      return Promise.reject(
        Object.assign(new Error(data.message || 'Business error'), {
          code: `BIZ_${data.code}`,
          response: response.response,
          config: response.config
        })
      )
    }
    return response
  },
  (error: RequestError) => {
    // HTTP / Network and other errors unified handling here
    if (error.isNetworkError) {
      YhMessage.error('Network exception, please check your connection')
    } else if (error.response?.status === 401) {
      YhMessage.error('Login expired, please login again')
    } else {
      YhMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)
```

## useRequest Callbacks

Handle errors at the Hook layer:

```typescript
const { data, error } = useRequest(() => request.get('/api/users'), {
  onError: (error) => {
    YhMessage.error(error.message)
  }
})
```

Display error in template:

```vue
<template>
  <div v-if="error">
    <yh-alert type="error" :title="error.message" />
  </div>
  <yh-table v-else :data="data || []" />
</template>
```

## Error Classification

### Network Error

```typescript
if (error.isNetworkError || error.code === 'NETWORK_ERROR') {
  // Cannot connect to server / DNS failure, etc.
}
```

### Timeout Error

```typescript
if (error.isTimeout) {
  // Connection or response exceeded timeout limit
}
```

### Cancel Error

```typescript
if (error.isCanceled || error.code === 'CANCELED') {
  // User actively cancelled
}
```

### HTTP Status Error

```typescript
if (error.response) {
  const status = error.response.status
  switch (status) {
    case 400:
      // Parameter error
      break
    case 401:
      // Not logged in / Login expired
      break
    case 403:
      // No permission
      break
    case 500:
      // Server internal error
      break
  }
}
```

## Combine with Debug and Monitoring

You can combine debug interceptor or plugins to print richer information when errors occur (request ID / fullPath / headers, etc.) for easier troubleshooting:

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debug = createDebugInterceptor({
  enabled: import.meta.env.DEV,
  level: 'error'
})

request.interceptors.request.use(debug.onRequest)
request.interceptors.response.use(debug.onResponse)
```

## Best Practice Suggestions

- **Layered handling**: Request config layer for bottom, interceptor layer for unified strategy, Hook layer for local UI feedback;
- **Error observability**: Print `requestId` / `fullPath` / `status` for log troubleshooting;
- **Separate business codes from HTTP codes**: Try to make APIs use unified structure `{ code, data, message }`, convert to `Error` in response interceptor once.
