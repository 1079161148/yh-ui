# 安全特性

`@yh-ui/request` 内置了企业级安全功能，包括 CSRF 防护和 Token 自动刷新，确保您的应用免受常见安全威胁。

## CSRF 防护

跨站请求伪造（CSRF）是一种常见的 Web 安全威胁。`@yh-ui/request` 提供自动 CSRF Token 防护机制。

### 工作原理

1. 服务器在登录成功后设置 CSRF Token 到 Cookie（如 `XSRF-TOKEN`）
2. 客户端请求时从 Cookie 读取 Token 并添加到请求头
3. 服务器验证请求头中的 Token 与 Cookie 是否匹配

### 基础配置

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'

const securityInterceptor = createSecurityInterceptor({
  csrf: {
    cookieName: 'XSRF-TOKEN', // Cookie 名称，默认值
    headerName: 'X-XSRF-TOKEN' // Header 名称，默认值
  }
})

// 添加到请求拦截器
request.interceptors.request.use(securityInterceptor.onRequest)
```

### 自定义 Token 获取

如果 Cookie 名称不标准或需要特殊处理，可以自定义获取函数：

```typescript
const securityInterceptor = createSecurityInterceptor({
  csrf: {
    // 自定义获取函数
    getToken: () => {
      // 从任意位置获取 Token
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
      return match ? decodeURIComponent(match[1]) : undefined
    }
  }
})
```

### 安全方法

默认情况下，CSRF Token 只会添加到非安全方法：

- **不需要 Token**：GET、HEAD、OPTIONS（只读操作）
- **需要 Token**：POST、PUT、PATCH、DELETE（会修改数据的操作）

```typescript
// 以下请求会自动添加 CSRF Token
await request.post('/api/users', { name: '张三' })
await request.put('/api/users/1', { name: '李四' })
await request.delete('/api/users/1')

// 以下请求不会添加 CSRF Token
await request.get('/api/users')
await request.get('/api/users/1')
```

### 禁用 CSRF

如果不需要 CSRF 防护，可以禁用：

```typescript
const securityInterceptor = createSecurityInterceptor({
  csrf: false // 禁用 CSRF
})
```

## Token 自动刷新

当访问令牌（Access Token）过期时，需要刷新 Token 并重试失败的请求。`@yh-ui/request` 提供自动刷新机制。

### 基础配置

```typescript
// 刷新状态管理
let isRefreshing = false
const pendingRequests: Array<() => void> = []

// 获取新 Token 的函数
let getNewToken: () => string

const securityInterceptor = createSecurityInterceptor({
  tokenRefresh: {
    statusCode: 401, // 触发刷新的状态码
    isRefreshing: () => isRefreshing, // 检查是否正在刷新
    pendingRequests, // 待重试请求队列

    // 刷新 Token 的函数
    refreshToken: async () => {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        credentials: 'include' // 包含 Cookie
      })

      if (response.ok) {
        const data = await response.json()
        getNewToken = () => data.accessToken
        return true
      }
      return false
    },

    // 刷新成功后更新请求头
    updateHeaders: (headers) => {
      headers['Authorization'] = `Bearer ${getNewToken()}`
    },

    retryTimes: 3 // 最大重试次数
  }
})

request.interceptors.request.use(securityInterceptor.onRequest)
```

### 工作原理

```
1. 发起请求 → 收到 401 错误
2. 检查是否正在刷新 Token
   - 如果正在刷新：将请求加入队列等待
   - 如果未刷新：开始刷新流程
3. 调用刷新 Token 接口
   - 成功：更新 Authorization header，重试队列中的请求
   - 失败：抛出错误，所有请求失败
4. 重试原始请求
```

### 完整示例

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'
import { request } from '@yh-ui/request'

// 状态管理
let isRefreshing = false
const pendingRequests: Array<() => void> = []
let accessToken = localStorage.getItem('access_token') || ''

// 创建安全拦截器
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
        // 使用 refresh_token 获取新的 access_token
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

// 添加认证拦截器
request.interceptors.request.use((config) => {
  // 添加 Authorization
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`
  }
  return config
})

// 添加安全拦截器
request.interceptors.request.use(securityInterceptor.onRequest)

// 处理刷新失败
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 如果刷新 Token 失败，跳转到登录页
    if (error.response?.status === 401 && !isRefreshing) {
      // 清除本地存储的 Token
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      // 跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## 安全最佳实践

### 1. 使用 HTTPS

始终使用 HTTPS 加密传输，防止中间人攻击。

```typescript
// 确保 baseURL 使用 HTTPS
const request = createRequest({
  baseURL: 'https://api.example.com' // 不要使用 http://
})
```

### 2. 敏感数据处理

```typescript
// 请求拦截器中移除敏感数据
request.interceptors.request.use((config) => {
  // 脱敏处理
  if (config.data?.password) {
    config.data = { ...config.data, password: '***' }
  }
  return config
})

// 响应拦截器中脱敏
request.interceptors.response.use((response) => {
  // 移除敏感信息
  if (response.data?.password) {
    delete response.data.password
  }
  if (response.data?.token) {
    delete response.data.token
  }
  return response
})
```

### 3. 请求来源验证

```typescript
request.interceptors.request.use((config) => {
  // 添加请求来源
  config.headers['X-Request-Origin'] = window.location.origin

  // 添加防重放攻击的时间戳
  config.headers['X-Timestamp'] = String(Date.now())

  return config
})
```

### 4. 防止 XSS

```typescript
// 响应拦截器中转义 HTML
import { escapeHtml } from '@yh-ui/utils'

request.interceptors.response.use((response) => {
  // 如果响应中包含用户输入的内容，进行转义
  if (response.data?.content) {
    response.data.content = escapeHtml(response.data.content)
  }
  return response
})
```

## 安全配置汇总

```typescript
import { createSecurityInterceptor } from '@yh-ui/request'
import { request } from '@yh-ui/request'

// 一站式安全配置
const securityInterceptor = createSecurityInterceptor({
  // CSRF 防护
  csrf: {
    cookieName: process.env.CSRF_COOKIE || 'XSRF-TOKEN',
    headerName: process.env.CSRF_HEADER || 'X-XSRF-TOKEN'
  },

  // Token 刷新
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

// 添加拦截器
request.interceptors.request.use(securityInterceptor.onRequest)
```

## 交互式安全特性演示

在下方的测试沙盒中，您可以模拟发送接口请求，并配置开启 **CSRF 防御** 和 **请求签名（HMAC-SHA256）** 安全防护。控制台将自动展示请求发出时实际包装过的安全 HTTP 头部信息。

<DemoBlock title="API 请求安全沙盒（CSRF 与请求签名）" :ts-code="tsSecurityDemo" :js-code="toJs(tsSecurityDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <div class="panel-item">
        <label>安全策略配置 (Security Policies):</label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="enableCSRF" />
          <span>启用 CSRF 防护 (注入 X-XSRF-TOKEN)</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:normal">
          <input type="checkbox" v-model="enableSign" />
          <span>启用请求签名防护 (HMAC-SHA256)</span>
        </label>
      </div>
      <div class="panel-item" v-if="enableSign">
        <label>签名密钥 (Secret Key):</label>
        <yh-input :model-value="secretKey" @update:model-value="(v) => { secretKey = String(v) }" size="small" />
      </div>
      <div class="panel-item">
        <label>请求 Payload 数据 (JSON):</label>
        <yh-input :model-value="payloadJson" @update:model-value="(v) => { payloadJson = String(v) }" size="small" />
      </div>
      <div class="action-buttons">
        <yh-button type="primary" :loading="securityLoading" @click="runSecurityDemo">发送安全请求</yh-button>
        <yh-button @click="clearSecurityLogs" :disabled="secLogs.length === 0">清空</yh-button>
      </div>
    </div>
    <div class="terminal-panel">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">网络报文监视 (HTTP Request Headers)</span>
      </div>
      <div class="terminal-body">
        <div v-if="secLogs.length === 0" class="empty-log">点击“发送安全请求”进行测试...</div>
        <div v-for="(log, i) in secLogs" :key="i" class="log-line" :class="{ 'log-success': log.includes('校验成功') || log.includes('✅') || log.includes('Header'), 'log-error': log.includes('清空') || log.includes('🚨'), 'log-info': log.includes('-->') || log.includes('⚙️') || log.includes('<--') }">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const enableCSRF = ref(true)
const enableSign = ref(true)
const secretKey = ref('yh-security-secret-key-999')
const payloadJson = ref('{"amount": 100, "to": "user_id_456"}')

const securityLoading = ref(false)
const secLogs = ref<string[]>([])

const addSecLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  secLogs.value.push(`[${time}] ${msg}`)
}

const computeSimpleHash = (payload: string, key: string, timestamp: string) => {
  const message = `${payload}:${key}:${timestamp}`
  let hash = 0
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return 'sha256_' + Math.abs(hash).toString(16).padStart(8, '0') + Math.random().toString(36).substring(2, 6)
}

const runSecurityDemo = async () => {
  if (securityLoading.value) return
  securityLoading.value = true

  addSecLog('--> 发送安全请求: POST /api/transaction/transfer')
  addSecLog(`📦 Payload: ${payloadJson.value}`)

  await new Promise(r => setTimeout(r, 600))

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (enableCSRF.value) {
    // 模拟自动注入 CSRF token
    headers['X-XSRF-TOKEN'] = 'csrf_token_hash_8f9c0e2b'
    addSecLog(`🛡️ [CSRF 拦截器] 从 Cookie 提取 XSRF-TOKEN 并自动注入 Header`)
  }

  if (enableSign.value) {
    const timestamp = String(Date.now())
    const signature = computeSimpleHash(payloadJson.value, secretKey.value, timestamp)
    
    headers['X-Timestamp'] = timestamp
    headers['X-Signature'] = signature
    addSecLog(`🔒 [签名拦截器] 已生成请求签名和时间戳 Header`)
  }

  addSecLog('📡 实际发送的 HTTP 请求头 (Request Headers):')
  Object.entries(headers).forEach(([k, v]) => {
    addSecLog(`    ${k}: ${v}`)
  })

  addSecLog('<-- 响应结果: HTTP/1.1 200 OK')
  addSecLog('✅ 安全校验通过! 请求已被服务端安全接收。')

  securityLoading.value = false
}

const clearSecurityLogs = () => {
  secLogs.value = []
}

const tsSecurityDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:8px">
    <yh-button type="primary" @click="sendTransaction">发送安全交易</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { createRequest, createSecurityInterceptor } from '@yh-ui/request'

const request = createRequest()
const securityInterceptor = createSecurityInterceptor({
  csrf: { cookieName: 'XSRF-TOKEN' }
})

request.interceptors.request.use(securityInterceptor.onRequest)

// 模拟请求签名拦截器
request.interceptors.request.use((config) => {
  config.headers['X-Signature'] = 'hmac-sha-256-signature'
  config.headers['X-Timestamp'] = String(Date.now())
  return config
})

const sendTransaction = async () => {
  const res = await request.post('/api/transaction', { amount: 100 })
  console.log('交易发送成功:', res)
}
</${_S}>`
</script>

## 下一步

- [useRequest](./use-request) - Vue 请求 Hook
- [useSSE](./use-sse) - 服务端推送
- [useAIStream](./use-ai-stream) - AI 流式响应
