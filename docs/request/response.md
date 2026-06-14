# 响应处理

## 响应结构

`@yh-ui/request` 会返回标准化的响应对象，包含完整的信息。

```typescript
interface RequestResponse<T = unknown> {
  /** 响应数据 */
  data: T
  /** 原始响应 */
  response: Response
  /** 请求配置 */
  config: InternalRequestOptions
  /** 请求 ID */
  requestId: string
  /** 请求耗时 (ms) */
  duration?: number
}
```

## 基础用法

```typescript
import { request } from '@yh-ui/request'

// GET 请求
const { data, response, requestId, duration } = await request.get('/api/users')
console.log(data)
console.log(`请求耗时: ${duration}ms`)

// POST 请求
const { data: newUser } = await request.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
```

## 类型推断

利用泛型自动推断响应类型，获得完整的 TypeScript 类型支持。

```typescript
interface User {
  id: number
  name: string
  email: string
}

// 自动推断 data 类型为 User
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST 请求泛型
interface CreateUserDTO {
  name: string
  email: string
}

const { data: createdUser } = await request.post<User, CreateUserDTO>('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
// createdUser: User (包含服务器返回的完整数据，包括 id)
```

## 响应类型

支持多种响应格式，通过 `responseType` 指定。

```typescript
// JSON (默认)
const { data } = await request.get('/api/data')

// 文本
const text = await request.get('/api/text', {
  responseType: 'text'
})
// text.data: string

// Blob (文件下载)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})
// blob.data: Blob

// ArrayBuffer (二进制数据)
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})
// buffer.data: ArrayBuffer

// FormData
const formData = await request.get('/api/form', {
  responseType: 'formdata'
})
// formData.data: FormData
```

## 原始响应

如果需要访问原始 Response 对象，可以设置 `rawResponse: true`。

```typescript
const { response, data } = await request.get('/api/users', {
  rawResponse: true
})

// 访问原始响应头
console.log(response.headers.get('Content-Type'))

// 访问原始响应状态
console.log(response.status)
console.log(response.ok)
```

## 错误处理

请求失败时会抛出 `RequestError`，包含丰富的错误信息。

```typescript
import { request } from '@yh-ui/request'

try {
  const { data } = await request.get('/api/users')
} catch (error) {
  // 判断错误类型
  if (error.isCanceled) {
    console.log('请求已取消')
  } else if (error.isTimeout) {
    console.log('请求超时')
  } else if (error.isNetworkError) {
    console.log('网络错误')
  } else {
    // HTTP 错误
    console.log(error.message) // 错误消息
    console.log(error.response?.status) // HTTP 状态码
    console.log(error.code) // 错误代码
    console.log(error.requestId) // 请求 ID，便于排查
  }
}
```

## 回退数据

可以通过 `fallbackData` 设置请求失败时的回退数据。

```typescript
const { data } = await request.get('/api/user', {
  fallbackData: { name: '默认用户', id: 0 } // 类型须与泛型一致
})

// 即使请求失败，data 也有值
console.log(data.name) // '默认用户'
```

## 请求耗时

每个响应都包含请求耗时信息，可用于性能监控。

```typescript
const start = Date.now()
const { duration } = await request.get('/api/users')
console.log(`本次请求耗时: ${duration}ms`)

// 可以结合拦截器记录所有请求耗时
request.interceptors.response.use((response) => {
  console.log(`请求 ${response.requestId} 耗时: ${response.duration}ms`)
  return response
})
```

## 交互式响应处理演示

使用以下沙盒模拟不同的接口响应结果。您可以选择期望返回的 HTTP 状态码、响应内容格式，或测试超时与网络异常，观察 `RequestResponse` 或是被抛出的 `RequestError`。

<DemoBlock title="API 响应测试沙盒" :ts-code="tsResponseDemo" :js-code="toJs(tsResponseDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>响应类别 / 状态码:</label>
        <div class="button-group">
          <yh-button v-for="st in [200, 401, 403, 404, 500]" :key="st" :type="mockStatus === st && mockType !== 'timeout' && mockType !== 'network' ? 'primary' : 'default'" size="small" @click="mockStatus = st; if (mockType === 'timeout' || mockType === 'network') mockType = 'json'">{{ st }}</yh-button>
          <yh-button :type="mockType === 'timeout' ? 'danger' : 'default'" size="small" @click="mockType = 'timeout'">模拟超时</yh-button>
          <yh-button :type="mockType === 'network' ? 'danger' : 'default'" size="small" @click="mockType = 'network'">模拟断网</yh-button>
        </div>
      </div>
      <div class="panel-item" v-if="mockType !== 'timeout' && mockType !== 'network' && mockStatus === 200">
        <label>响应数据类型 (responseType):</label>
        <div class="button-group">
          <yh-button :type="mockType === 'json' ? 'primary' : 'default'" size="small" @click="mockType = 'json'">JSON</yh-button>
          <yh-button :type="mockType === 'text' ? 'primary' : 'default'" size="small" @click="mockType = 'text'">Text</yh-button>
        </div>
      </div>
      <div class="panel-item">
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer">
          <input type="checkbox" v-model="useFallback" />
          <span>启用回退数据 (fallbackData)</span>
        </label>
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="requestLoading" @click="runResponseDemo">发起请求</yh-button>
        <yh-button @click="clearResult" :disabled="!resultText">清空结果</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">输出结果 (JSON / Object)</span>
      </div>
      <div class="terminal-body">
        <div v-if="!resultText" class="empty-log">点击“发起请求”运行演示...</div>
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
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const mockStatus = ref(200)
const mockType = ref('json')
const useFallback = ref(false)
const requestLoading = ref(false)
const resultText = ref('')
const resultType = ref<'success' | 'error' | ''>('')

const runResponseDemo = async () => {
  if (requestLoading.value) return
  requestLoading.value = true
  resultText.value = '请求发送中...'
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
      fallbackData: useFallback.value ? { name: '默认用户', id: 0 } : undefined
    }, null, 2)
  } else if (mockType.value === 'network') {
    resultType.value = 'error'
    resultText.value = JSON.stringify({
      name: 'RequestError',
      message: 'Network Error',
      code: 'NETWORK_ERROR',
      isNetworkError: true,
      requestId: 'req_' + Math.random().toString(36).substr(2, 9),
      fallbackData: useFallback.value ? { name: '默认用户', id: 0 } : undefined
    }, null, 2)
  } else {
    if (mockStatus.value >= 200 && mockStatus.value < 300) {
      resultType.value = 'success'
      const responseData = mockType.value === 'json' 
        ? { id: 1, name: '张三', email: 'zhangsan@example.com' }
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
        fallbackData: useFallback.value ? { name: '默认用户', id: 0 } : undefined
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
      fallbackData: { name: '默认用户', id: 0 }
    })
    result.value = \`获取成功: \${JSON.stringify(res.data)}\`
  } catch (error) {
    result.value = \`获取失败: \${error.message}\`
  }
}
</${_S}>`
</script>

## 下一步

- [请求配置](./config) - 完整配置选项
- [拦截器](./interceptors) - 请求/响应拦截
- [缓存策略](./cache) - 数据缓存
