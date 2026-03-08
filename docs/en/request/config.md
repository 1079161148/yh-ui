# Request Config

## Configuration Options

```typescript
import { RequestOptions } from '@yh-ui/request'

interface RequestOptions<TRequest = unknown> {
  /** Request base URL */
  baseURL?: string
  /** Request path */
  url?: string
  /** HTTP method */
  method?: HttpMethod
  /** URL query parameters */
  params?: Record<string, ParamValue>
  /** Request body data */
  data?: TRequest
  /** Request headers */
  headers?: Record<string, string>
  /** Request timeout (ms) */
  timeout?: number
  /** Credentials mode */
  credentials?: RequestCredentials
  /** Response type */
  responseType?: ResponseType
  /** Enable retry */
  retry?: boolean
  /** Retry times */
  retryTimes?: number
  /** Retry delay (ms) */
  retryDelay?: number
  /** Retry condition function */
  retryCondition?: (error: RequestError) => boolean
}
```

## Basic Configuration

```typescript
// Create instance
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  credentials: 'same-origin',
  responseType: 'json'
})
```

## Timeout Configuration

```typescript
// 30 second timeout (default)
const response = await request.get('/api/users', {
  timeout: 30000
})

// 5 second timeout
const response = await request.get('/api/users', {
  timeout: 5000
})
```

## Retry Configuration

```typescript
// Enable retry
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3, // Max 3 retries
  retryDelay: 1000 // 1 second interval
})

// Custom retry condition
const response = await request.get('/api/users', {
  retry: true,
  retryCondition: (error) => {
    // Retry only on network error or 500 error
    return error.isNetworkError || error.response?.status === 500
  }
})
```

### Exponential Backoff Retry

`@yh-ui/request` supports custom retry delay calculators for exponential backoff, linear backoff and other strategies.

```typescript
import {
  defaultExponentialBackoff,
  linearBackoff,
  fixedBackoff,
  type RetryDelayCalculator
} from '@yh-ui/request'

// Default exponential backoff (with random jitter)
// Attempt 1: 1000-2000ms
// Attempt 2: 2000-3000ms
// Attempt 3: 4000-5000ms
const response = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: defaultExponentialBackoff
})

// Linear backoff
// Attempt 1: 1000ms
// Attempt 2: 2000ms
// Attempt 3: 3000ms
const response2 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: linearBackoff
})

// Fixed delay
// Each attempt: 1000ms
const response3 = await request.get('/api/users', {
  retry: true,
  retryTimes: 3,
  retryDelay: 1000,
  retryDelayCalculator: fixedBackoff
})

// Custom delay calculator
const customBackoff: RetryDelayCalculator = (retryCount, defaultDelay) => {
  // Exponential backoff, max 30 seconds
  const delay = defaultDelay * Math.pow(2, retryCount)
  return Math.min(delay, 30000)
}

const response4 = await request.get('/api/users', {
  retry: true,
  retryTimes: 5,
  retryDelayCalculator: customBackoff
})
```

#### Built-in Delay Calculator Comparison

| Function                    | Strategy                    | Example (retryDelay=1000) |
| --------------------------- | --------------------------- | ------------------------- |
| `defaultExponentialBackoff` | Exponential + Random Jitter | 1→2→4→8... seconds        |
| `linearBackoff`             | Linear Growth               | 1→2→3→4... seconds        |
| `fixedBackoff`              | Fixed Delay                 | Always 1 second           |

#### Delay Calculator Type

```typescript
type RetryDelayCalculator = (retryCount: number, defaultDelay: number) => number

// retryCount: Current retry count (starts from 0)
// defaultDelay: Configured retryDelay value
// Returns: Actual delay time in milliseconds
// Returns -1 to stop retrying
```

## Request Deduplication

```typescript
// Requests with the same key will be auto-cancelled
const response1 = request.get('/api/users', {
  requestKey: 'users-list'
})

const response2 = request.get('/api/users', {
  requestKey: 'users-list' // Will cancel response1
})

// Or use abortSameKey for auto-deduplication
const response = request.get('/api/users', {
  abortSameKey: true // Auto use url + params as key
})
```

## Response Types

```typescript
// JSON (default)
const { data } = await request.get('/api/data')

// Text
const text = await request.get('/api/text', {
  responseType: 'text'
})

// Blob (file download)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})

// ArrayBuffer
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})
```

## Default Configuration

```typescript
// Set global default configuration
request.setConfig({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Get current configuration
const config = request.getConfig()
```

## Next Steps

- [Response Handling](./response) - Response data parsing
- [Interceptors](./interceptors) - Request/Response interceptors
- [Error Handling](./error) - Comprehensive error handling
