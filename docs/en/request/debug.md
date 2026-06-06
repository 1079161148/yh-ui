# Debug Mode

`@yh-ui/request` emphasizes **observability** in its design. Through **debug interceptor + request ID + unified log structure**, it helps you quickly locate issues.

## Debug Interceptor createDebugInterceptor

```typescript
import { createDebugInterceptor } from '@yh-ui/request'

const debugInterceptor = createDebugInterceptor({
  enabled: import.meta.env.DEV, // Only enable in development
  level: 'log', // log / warn / error
  logRequestBody: true, // Whether to log request body
  logResponseBody: true, // Whether to log response body
  sanitize: (info) => {
    // Sanitization example
    const next = { ...info }
    if (next.headers?.Authorization) {
      next.headers.Authorization = '***'
    }
    return next
  }
})

// Mount to request instance
request.interceptors.request.use(debugInterceptor.onRequest)
request.interceptors.response.use(debugInterceptor.onResponse)
```

Log structure:

```typescript
interface DebugInfo {
  requestId: string
  url: string
  method: string
  headers?: Record<string, string>
  data?: unknown // Request body
  response?: unknown // Response data
  status?: number
  duration?: number // Duration (ms)
  error?: string
  timestamp: number
}
```

Example output (console):

```json
{
  "message": "[YH-Request] GET req_1710000000000_1 [200] (145ms)",
  "url": "/api/users",
  "status": 200,
  "duration": 145,
  "requestId": "req_1710000000000_1"
}
```

## DebugLogger: Collect Debug Logs

```typescript
import { DebugLogger } from '@yh-ui/request'

const logger = new DebugLogger()

// Collect in interceptor
request.interceptors.response.use((response) => {
  logger.addLog({
    requestId: response.requestId,
    url: response.config.url || '',
    method: response.config.method || 'GET',
    status: response.response.status,
    duration: response.duration,
    timestamp: Date.now()
  })
  return response
})

// View in debug page
const logs = logger.getLogs()
// Clear
logger.clear()
```

Can combine with tables / line charts to display API duration, error distribution and other information.

## requestId and Tracing

Every request has a globally unique `requestId`:

```typescript
const { data, requestId } = await request.get('/api/users')
console.log('This request ID:', requestId)
```

Record the same ID in backend logs for front-end and back-end joint troubleshooting.

## Combine with Browser DevTools

- Use debug interceptor to view **logical layer configuration & data**;
- Use browser Network panel to view **actual request / response**;
- Use `requestId`, `url`, `status` and other fields to align information between both sides.

## Recommended Enabling Scenarios

- Development environment: Recommend enabling debug mode globally;
- Integration / Load testing: Only keep key information (URL, duration, status code), avoid too large logs;
- Production: Only enable for specific users / debug switches, and strictly do sanitization.
