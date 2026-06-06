# Security

`@yh-ui/request` provides enterprise-grade security features including CSRF protection and automatic token refresh to protect your application from common security threats.

## CSRF Protection

Cross-Site Request Forgery (CSRF) is a common web security threat. `@yh-ui/request` provides automatic CSRF Token protection mechanism.

### How It Works

1. Server sets CSRF Token to Cookie after successful login (e.g., `XSRF-TOKEN`)
2. Client reads Token from Cookie and adds to request header
3. Server verifies if the Token in header matches the Cookie

### Basic Configuration

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'

const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN', // Cookie name, default
    headerName: 'X-XSRF-TOKEN' // Header name, default
  }
})

// Add to request interceptor
request.interceptors.request.use(securityInterceptor.onRequest)
```

### Custom Token Retrieval

If Cookie name is non-standard or needs special handling, you can customize the retrieval function:

```typescript
const securityInterceptor = createSecurityInterceptor({
  csrf: {
    // Custom getter function
    getToken: () => {
      // Get Token from anywhere
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
      return match ? decodeURIComponent(match[1]) : undefined
    }
  }
})
```

### Safe Methods

By default, CSRF Token is only added to non-safe methods:

- **No Token needed**: GET, HEAD, OPTIONS (read-only operations)
- **Token needed**: POST, PUT, PATCH, DELETE (operations that modify data)

```typescript
// The following requests will automatically add CSRF Token
await request.post('/api/users', { name: 'John' })
await request.put('/api/users/1', { name: 'Jane' })
await request.delete('/api/users/1')

// The following requests will NOT add CSRF Token
await request.get('/api/users')
await request.get('/api/users/1')
```

### Disable CSRF

If CSRF protection is not needed, you can disable it:

```typescript
const securityInterceptor = createSecurityInterceptor({
  csrf: false // Disable CSRF
})
```

## Token Auto Refresh

When the Access Token expires, it needs to be refreshed and failed requests need to be retried. `@yh-ui/request` provides automatic refresh mechanism.

### Basic Configuration

```typescript
// Refresh state management
let isRefreshing = false
const pendingRequests: Array<() => void> = []

// Function to get new Token
let getNewToken: () => string

const securityInterceptor = createSecurityInterceptor({
  tokenRefresh: {
    statusCode: 401, // Status code to trigger refresh
    isRefreshing: () => isRefreshing, // Check if refreshing
    pendingRequests, // Queue of requests to retry

    // Function to refresh Token
    refreshToken: async () => {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        credentials: 'include' // Include Cookie
      })

      if (response.ok) {
        const data = await response.json()
        getNewToken = () => data.accessToken
        return true
      }
      return false
    },

    // Update request header after successful refresh
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${getNewToken()}`
    },

    retryTimes: 3 // Max retry times
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

### How It Works

```
1. Send request → Receive 401 error
2. Check if refreshing Token
   - If refreshing: Add request to queue to wait
   - If not refreshing: Start refresh flow
3. Call refresh Token API
   - Success: Update Authorization header, retry queued requests
   - Failure: Throw error, all requests fail
4. Retry original request
```

### Complete Example

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'
import { request } from '@yh-ui/request'

// State management
let isRefreshing = false
const pendingRequests: Array<() => void> = []
let accessToken = localStorage.getItem('access_token') || ''

// Create security interceptor
const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN'
  },
  tokenRefresh: {
    statusCode: 401,
    isRefreshing: () => isRefreshing,
    pendingRequests,

    refreshToken: async () => {
      try {
        // Use refresh_token to get new access_token
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh_token: localStorage.getItem('refresh_token')
          }),
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          accessToken = data.access_token
          localStorage.setItem('access_token', access_token)
          return true
        }
        return false
      } catch {
        return false
      }
    },

    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${accessToken}`
    }
  }
})

// Add auth interceptor
request.interceptors.request.use((config) => {
  // Add Authorization
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`
  }
  return config
})

// Add security interceptor
request.interceptors.request.use(securityInterceptor.onRequest)

// Handle refresh failure
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If refresh Token fails, redirect to login
    if (error.response?.status === 401 && !isRefreshing) {
      // Clear locally stored Token
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## Security Best Practices

### 1. Use HTTPS

Always use HTTPS for encrypted transmission to prevent man-in-the-middle attacks.

```typescript
// Ensure baseURL uses HTTPS
const request = createRequest({
  baseURL: 'https://api.example.com' // Don't use http://
})
```

### 2. Sensitive Data Handling

```typescript
// Remove sensitive data in request interceptor
request.interceptors.request.use((config) => {
  // Sanitize
  if (config.data?.password) {
    config.data = { ...config.data, password: '***' }
  }
  return config
})

// Sanitize in response interceptor
request.interceptors.response.use((response) => {
  // Remove sensitive information
  if (response.data?.password) {
    delete response.data.password
  }
  if (response.data?.token) {
    delete response.data.token
  }
  return response
})
```

### 3. Request Origin Verification

```typescript
request.interceptors.request.use((config) => {
  // Add request origin
  config.headers['X-Request-Origin'] = window.location.origin

  // Add timestamp to prevent replay attacks
  config.headers['X-Timestamp'] = String(Date.now())

  return config
})
```

### 4. Prevent XSS

```typescript
// Escape HTML in response interceptor
import { escapeHtml } from '@yh-ui/utils'

request.interceptors.response.use((response) => {
  // If response contains user input, escape it
  if (response.data?.content) {
    response.data.content = escapeHtml(response.data.content)
  }
  return response
})
```

## Security Configuration Summary

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'
import { request } from '@yh-ui/request'

// One-stop security configuration
const securityInterceptor = createSecurityInterceptor({
  // CSRF protection
  csrf: {
    cookieName: process.env.CSRF_COOKIE || 'XSRF-TOKEN',
    headerName: process.env.CSRF_HEADER || 'X-XSRF-TOKEN'
  },

  // Token refresh
  tokenRefresh: {
    statusCode: 401,
    isRefreshing: () => isRefreshing,
    pendingRequests,
    refreshToken: handleRefreshToken,
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${accessToken}`
    }
  }
})

// Add interceptor
request.interceptors.request.use(securityInterceptor.onRequest)
```

## Next Steps

- [useRequest](./use-request) - Vue request Hook
- [useSSE](./use-sse) - Server-Sent Events
- [useAIStream](./use-ai-stream) - AI streaming responses
