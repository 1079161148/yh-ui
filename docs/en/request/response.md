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

## Interactive Response Demo

Use the sandbox below to simulate various API responses. Select HTTP status codes, output formats, or mock timeouts/network errors, and examine the structured `RequestResponse` or thrown `RequestError`.

<DemoBlock title="API Response Test Sandbox" :ts-code="tsResponseDemo" :js-code="toJs(tsResponseDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>Response Type / Status Code:</label>
        <div class="button-group">
          <yh-button v-for="st in [200, 401, 403, 404, 500]" :key="st" :type="mockStatus === st && mockType !== 'timeout' && mockType !== 'network' ? 'primary' : 'default'" size="small" @click="mockStatus = st; if (mockType === 'timeout' || mockType === 'network') mockType = 'json'">{{ st }}</yh-button>
          <yh-button :type="mockType === 'timeout' ? 'danger' : 'default'" size="small" @click="mockType = 'timeout'">Timeout</yh-button>
          <yh-button :type="mockType === 'network' ? 'danger' : 'default'" size="small" @click="mockType = 'network'">Network Error</yh-button>
        </div>
      </div>
      <div class="panel-item" v-if="mockType !== 'timeout' && mockType !== 'network' && mockStatus === 200">
        <label>Response Type (responseType):</label>
        <div class="button-group">
          <yh-button :type="mockType === 'json' ? 'primary' : 'default'" size="small" @click="mockType = 'json'">JSON</yh-button>
          <yh-button :type="mockType === 'text' ? 'primary' : 'default'" size="small" @click="mockType = 'text'">Text</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer">
          <input type="checkbox" v-model="useFallback" />
          <span>Enable Fallback Data (fallbackData)</span>
        </label>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="requestLoading" @click="runResponseDemo">Send Request</yh-button>
        <yh-button @click="clearResult" :disabled="!resultText">Clear Result</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">Result Output (JSON / Object)</span>
      </div>
      <div class="terminal-body">
        <div v-if="!resultText" class="empty-log">Click "Send Request" to run the demo...</div>
        <pre v-else :class="{
          'log-success': resultType === 'success',
          'log-error': resultType === 'error',
        }" style="margin: 0; background: transparent; padding: 0;">{{ resultText }}</pre>
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const mockStatus = ref(200)
const mockType = ref('json')
const useFallback = ref(false)
const requestLoading = ref(false)
const resultText = ref('')
const resultType = ref<'success' | 'error' | ''>('')

const runResponseDemo = async () => {
  if (requestLoading.value) return
  requestLoading.value = true
  resultText.value = 'Sending request...'
  resultType.value = ''

  await new Promise(r => setTimeout(r, 600))

  if (mockType.value === 'timeout') {
    resultType.value = 'error'
    resultText.value = JSON.stringify({
      name: 'RequestError',
      message: 'Request Timeout (exceeded 3000ms)',
      code: 'TIMEOUT',
      isTimeout: true,
      requestId: 'req_' + Math.random().toString(36).substr(2, 9),
      fallbackData: useFallback.value ? { name: 'Default User', id: 0 } : undefined
    }, null, 2)
  } else if (mockType.value === 'network') {
    resultType.value = 'error'
    resultText.value = JSON.stringify({
      name: 'RequestError',
      message: 'Network Error',
      code: 'NETWORK_ERROR',
      isNetworkError: true,
      requestId: 'req_' + Math.random().toString(36).substr(2, 9),
      fallbackData: useFallback.value ? { name: 'Default User', id: 0 } : undefined
    }, null, 2)
  } else {
    if (mockStatus.value >= 200 && mockStatus.value < 300) {
      resultType.value = 'success'
      const responseData = mockType.value === 'json' 
        ? { id: 1, name: 'John Doe', email: 'john@example.com' }
        : 'Hello, this is a plain text response.'
        
      resultText.value = JSON.stringify({
        data: responseData,
        requestId: 'req_' + Math.random().toString(36).substr(2, 9),
        duration: 82,
        response: {
          status: mockStatus.value,
          ok: true,
          statusText: 'OK',
          headers: {
            'content-type': mockType.value === 'json' ? 'application/json' : 'text/plain'
          }
        }
      }, null, 2)
    } else {
      resultType.value = 'error'
      resultText.value = JSON.stringify({
        name: 'RequestError',
        message: `Request failed with status code ${mockStatus.value}`,
        code: `HTTP_ERROR_${mockStatus.value}`,
        requestId: 'req_' + Math.random().toString(36).substr(2, 9),
        response: {
          status: mockStatus.value,
          ok: false,
          statusText: mockStatus.value === 401 ? 'Unauthorized' : mockStatus.value === 403 ? 'Forbidden' : mockStatus.value === 404 ? 'Not Found' : 'Internal Server Error'
        },
        fallbackData: useFallback.value ? { name: 'Default User', id: 0 } : undefined
      }, null, 2)
    }
  }

  requestLoading.value = false
}

const clearResult = () => {
  resultText.value = ''
  resultType.value = ''
}

const tsResponseDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; gap:8px">
      <yh-button type="primary" @click="fetchUser(200)">200 OK</yh-button>
      <yh-button type="danger" @click="fetchUser(500)">500 Server Error</yh-button>
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

const fetchUser = async (status: number) => {
  try {
    const res = await request.get(\`/api/user/\${status}\`, {
      fallbackData: { name: 'Default User', id: 0 }
    })
    result.value = \`Success: \${JSON.stringify(res.data)}\`
  } catch (error) {
    result.value = \`Failed: \${error.message}\`
  }
}
</${_S}>`
</script>

## Next Steps

- [Interceptors](./interceptors) - Request/Response interceptors
- [Cache Strategy](./cache) - Response caching
- [TypeScript Guide](./typescript) - Advanced type usage
