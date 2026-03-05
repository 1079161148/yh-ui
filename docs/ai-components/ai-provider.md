<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// --- 基础用法示例数据 ---
const messages = ref([
  { id: '1', role: 'assistant', content: '你好！我是由 AiProvider 配置的助手。' }
])
const loading = ref(false)
const handleSend = (content: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content })
  loading.value = true
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '收到！这是通过 AiProvider 全局注入配置后，AiChat 返回的响应。'
    })
    loading.value = false
  }, 1000)
}

// --- 拦截器演示数据 (独立变量) ---

// 演示 1: 基础拦截器
const providerRef1 = ref()
const messages1 = ref([{ id: '1', role: 'assistant', content: '拦截器示例 1：基础请求/响应拦截' }])
const loading1 = ref(false)
const handleSend1 = (content: string) => {
  messages1.value.push({ id: Date.now().toString(), role: 'user', content })
  loading1.value = true
  // 模拟请求，触发拦截器日志
  console.log('[Demo 1] 模拟触发请求...')
  setTimeout(() => {
    messages1.value.push({ id: Date.now().toString(), role: 'assistant', content: '测试请求已发出，请查看控制台日志。' })
    loading1.value = false
  }, 1000)
}

// 演示 2: 请求拦截器
const providerRef2 = ref()
const messages2 = ref([{ id: '1', role: 'assistant', content: '拦截器示例 2：请求拦截 - 自动添加 Token' }])
const loading2 = ref(false)
const handleSend2 = (content: string) => {
  messages2.value.push({ id: Date.now().toString(), role: 'user', content })
  loading2.value = true
  console.log('[Demo 2] 模拟触发请求...')
  setTimeout(() => {
    messages2.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Token 已在拦截器中处理，请查看控制台。' })
    loading2.value = false
  }, 1000)
}

// 演示 3: 响应拦截器
const providerRef3 = ref()
const messages3 = ref([{ id: '1', role: 'assistant', content: '拦截器示例 3：响应拦截 - 统一错误处理' }])
const loading3 = ref(false)
const handleSend3 = (content: string) => {
  messages3.value.push({ id: Date.now().toString(), role: 'user', content })
  loading3.value = true
  console.log('[Demo 3] 模拟触发请求...')
  setTimeout(() => {
    messages3.value.push({ id: Date.now().toString(), role: 'assistant', content: '响应已通过拦截器校验。' })
    loading3.value = false
  }, 1000)
}

// 演示 4: 日志拦截器
const providerRef4 = ref()
const messages4 = ref([{ id: '1', role: 'assistant', content: '拦截器示例 4：日志记录拦截' }])
const loading4 = ref(false)
const handleSend4 = (content: string) => {
  messages4.value.push({ id: Date.now().toString(), role: 'user', content })
  loading4.value = true
  console.log('[Demo 4] 模拟触发请求...')
  setTimeout(() => {
    messages4.value.push({ id: Date.now().toString(), role: 'assistant', content: '日志已记录，请查看控制台。' })
    loading4.value = false
  }, 1000)
}

const token = ref('your-token')

onMounted(() => {
  // 1. 基础拦截器演示
  providerRef1.value?.addRequestInterceptor({
    onRequest: (config: import('../ai-components/ai-provider').AiRequestConfig) => {
      console.log('[Demo 1] 🚀 请求拦截成功:', config)
      messages1.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: '💡 [拦截器触发] 已注入自定义 Header' })
      config.headers = { ...config.headers, 'X-Custom-Header': 'demo-1' }
      return config
    }
  })
  providerRef1.value?.addResponseInterceptor({
    onResponse: (response: Response) => {
      console.log('[Demo 1] ✅ 响应拦截成功:', response)
      messages1.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: '✅ [拦截器触发] 收到服务器响应数据' })
      return response
    }
  })

  // 2. 请求拦截器 - 自动添加 Token 演示
  providerRef2.value?.addRequestInterceptor({
    onRequest: (config: import('@yh-ui/components').AiRequestConfig) => {
      const fakeToken = 'auth-token-from-storage'
      console.log('[Demo 2] 🔑 Token 拦截注入:', fakeToken)
      messages2.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: `🔑 [拦截器触发] 自动注入令牌: Bearer ${fakeToken.slice(0, 5)}...` })
      config.headers = { ...config.headers, 'Authorization': `Bearer ${fakeToken}` }
      return config
    }
  })

  // 3. 响应拦截器 - 错误处理演示
  providerRef3.value?.addResponseInterceptor({
    onResponseError: (error: Error) => {
      console.log('[Demo 3] 🚨 拦截到错误响应:', error)
      messages3.value.push({ id: 'err-' + Date.now(), role: 'assistant', content: '🚨 [拦截器触发] 捕捉到请求异常' })
    }
  })

  // 4. 日志记录拦截器演示
  providerRef4.value?.addRequestInterceptor({
    onRequest: (config: import('@yh-ui/components').AiRequestConfig) => {
      (config as Record<string, unknown>).metadata = { startTime: Date.now() }
      console.log(`[Demo 4] 📝 日志记录 [Request] ${config.method || 'POST'} ${config.url || '/api/chat'}`)
      messages4.value.push({ id: 'log-' + Date.now(), role: 'assistant', content: `📝 [拦截器触发] 记录请求开始` })
      return config
    }
  })
  providerRef4.value?.addResponseInterceptor({
    onResponse: (response: Response) => {
      const duration = Date.now() - (((response as unknown) as { config: { metadata: { startTime: number } } }).config?.metadata?.startTime || 0)
      console.log(`[Demo 4] ⏳ 日志记录 [Response] 耗时: ${duration}ms`)
      messages4.value.push({ id: 'log-' + Date.now(), role: 'assistant', content: `⏳ [拦截器触发] 请求耗时: ${duration}ms` })
      return response
    }
  })
})

// --- 代码片段定义 (文档展示用) ---
const tsBasic = `<${_T}>
  <yh-ai-provider
    base-url="https://api.example.com/v1"
    token="your-api-token"
    user-name="User"
    assistant-name="YH AI"
    :typewriter="{ enabled: true, charsPerFrame: 2 }"
  >
    <div class="ai-demo-container">
      <yh-ai-chat 
        :messages="messages" 
        :loading="loading" 
        @send="handleSend" 
      />
    </div>
  </yh-ai-provider>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const messages = ref([
  { id: '1', role: 'assistant', content: '你好！我是由 AiProvider 配置的助手。' }
])

const handleSend = (content: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content })
  loading.value = true
  // 模拟请求
  setTimeout(() => {
    messages.value.push({ id: Date.now().toString(), role: 'assistant', content: '收到！响应已返回。' })
    loading.value = false
  }, 1000)
}
</${_S}>`

const tsIdentity = `<${_T}>
  <yh-ai-provider
    user-name="AI 助手"
    user-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    assistant-name="YH Assistant"
    assistant-avatar="/logo.svg"
  >
    <yh-ai-bubble role="user" content="谁在帮我配置？" />
    <yh-ai-bubble role="assistant" content="是我，你的全局助手。" />
  </yh-ai-provider>
</${_T}>`

const tsInterceptor = `<${_T}>
<yh-ai-provider ref="providerRef" base-url="https://api.example.com/v1">
  <yh-ai-chat />
</yh-ai-provider>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const providerRef = ref()

onMounted(() => {
  // 添加请求拦截器
  providerRef.value?.addRequestInterceptor({
    onRequest: (config) => {
      console.log('请求拦截:', config)
      config.headers['X-Custom'] = 'demo'
      return config
    }
  })

  // 添加响应拦截器
  providerRef.value?.addResponseInterceptor({
    onResponse: (response) => {
      console.log('响应拦截:', response)
      return response
    }
  })
})
</${_S}>`

const jsInterceptor = toJs(tsInterceptor)

const tsRequestInterceptor = `<${_T}>
<yh-ai-provider ref="providerRef" base-url="https://api.example.com/v1">
  <yh-ai-chat />
</yh-ai-provider>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const providerRef = ref()

onMounted(() => {
  providerRef.value?.addRequestInterceptor({
    onRequest: (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = \`Bearer \${token}\`
      }
      return config
    }
  })
})
</${_S}>`

const jsRequestInterceptor = toJs(tsRequestInterceptor)

const tsResponseInterceptor = `<${_T}>
<yh-ai-provider ref="providerRef" base-url="https://api.example.com/v1">
  <yh-ai-chat />
</yh-ai-provider>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const providerRef = ref()

onMounted(() => {
  providerRef.value?.addResponseInterceptor({
    onResponseError: (error) => {
      if (error.status === 401) {
        console.log('未授权，跳转登录')
      }
    }
  })
})
</${_S}>`

const jsResponseInterceptor = toJs(tsResponseInterceptor)

const tsLoggingInterceptor = `<${_T}>
<yh-ai-provider ref="providerRef" base-url="https://api.example.com/v1">
  <yh-ai-chat />
</yh-ai-provider>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const providerRef = ref()

onMounted(() => {
  providerRef.value?.addRequestInterceptor({
    onRequest: (config) => {
      config.metadata = { startTime: Date.now() }
      return config
    }
  })

  providerRef.value?.addResponseInterceptor({
    onResponse: (response) => {
      const duration = Date.now() - (response.config.metadata.startTime)
      console.log(\`请求耗时: \${duration}ms\`)
      return response
    }
  })
})
</${_S}>`

const jsLoggingInterceptor = toJs(tsLoggingInterceptor)
</script>

# AiProvider 全局配置

`AiProvider` 是 AI 组件库的核心配置组件，用于在应用顶层注入全局配置。它通过 Vue 的 `provide/inject` 机制，为下游所有的 AI 组件（如 `AiChat`、`AiBubble` 等）提供基础的接口地址、鉴权信息、头像以及打字机特效等配置。

## 基础用法

建议将 `AiProvider` 包裹在应用的根组件或 AI 功能模块的最外层。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-ai-provider
    base-url="https://api.example.com/v1"
    token="your-api-token"
    user-name="User"
    assistant-name="YH AI"
    :typewriter="{ enabled: true, charsPerFrame: 2 }"
  >
    <div class="ai-demo-container" style="height: 400px; border: 1px solid var(--yh-border-color-light); border-radius: 8px; overflow: hidden;">
      <yh-ai-chat 
        :messages="messages" 
        :loading="loading" 
        @send="handleSend" 
      />
    </div>
  </yh-ai-provider>
</DemoBlock>

## 全局身份配置

通过 `AiProvider`，你可以统一设置用户和助手的头像及名称。

<DemoBlock title="全局身份配置" :ts-code="tsIdentity" :js-code="toJs(tsIdentity)">
  <yh-ai-provider
    user-name="Antigravity"
    user-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    assistant-name="YH Assistant"
    assistant-avatar="/logo.svg"
  >
    <yh-ai-bubble role="user" content="谁在帮我配置？" />
    <yh-ai-bubble role="assistant" content="是我，你的全局助手。" />
  </yh-ai-provider>
</DemoBlock>

## API

### Props

| 属性名             | 说明                 | 类型                     | 默认值                                |
| ------------------ | -------------------- | ------------------------ | ------------------------------------- |
| `base-url`         | 全局 AI 接口基础地址 | `string`                 | -                                     |
| `token`            | 鉴权 Token (Bearer)  | `string`                 | -                                     |
| `headers`          | 全局请求头追加       | `Record<string, string>` | -                                     |
| `user-avatar`      | 用户头像 URL         | `string`                 | -                                     |
| `assistant-avatar` | 助手头像 URL         | `string`                 | -                                     |
| `user-name`        | 用户显示名称         | `string`                 | -                                     |
| `assistant-name`   | 助手显示名称         | `string`                 | -                                     |
| `system-prompt`    | 全局系统提示词       | `string`                 | -                                     |
| `typewriter`       | 打字机特效配置       | `object`                 | `{ enabled: true, charsPerFrame: 2 }` |

### typewriter 属性定义

| 属性名            | 说明               | 类型      | 默认值 |
| ----------------- | ------------------ | --------- | ------ |
| `enabled`         | 是否开启打字机效果 | `boolean` | `true` |
| `chars_per_frame` | 每帧渲染字符数     | `number`  | `2`    |

### 请求/响应拦截器 Props

| 属性名            | 说明             | 类型                                   | 默认值   |
| ----------------- | ---------------- | -------------------------------------- | -------- |
| `timeout`         | 请求超时时间(ms) | `number`                               | `30000`  |
| `withCredentials` | 是否允许携带凭证 | `boolean`                              | `false`  |
| `mode`            | 请求模式         | `'cors' \| 'no-cors' \| 'same-origin'` | `'cors'` |
| `cache`           | 缓存模式         | `RequestCache`                         | 见下方   |

### Methods

| 方法名                      | 说明           | 参数                                             | 返回值    |
| --------------------------- | -------------- | ------------------------------------------------ | --------- |
| `addRequestInterceptor`     | 添加请求拦截器 | `(interceptor: AiRequestInterceptor) => number`  | 拦截器 ID |
| `addResponseInterceptor`    | 添加响应拦截器 | `(interceptor: AiResponseInterceptor) => number` | 拦截器 ID |
| `removeRequestInterceptor`  | 移除请求拦截器 | `(id: number) => void`                           | —         |
| `removeResponseInterceptor` | 移除响应拦截器 | `(id: number) => void`                           | —         |
| `clearInterceptors`         | 清空所有拦截器 | `() => void`                                     | —         |

### 拦截器使用示例

#### 基础拦截器

<DemoBlock title="添加请求/响应拦截器" :ts-code="tsInterceptor" :js-code="jsInterceptor">
  <yh-ai-provider
    ref="providerRef1"
    base-url="https://api.example.com/v1"
    :token="token"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">💡 拦截器已增强：点击发送消息，即可在页面内和控制台看到拦截点反馈。</p>
      <yh-ai-chat :messages="messages1" :loading="loading1" @send="handleSend1" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### 请求拦截器 - 添加 Token

<DemoBlock title="请求拦截器 - 自动添加 Token" :ts-code="tsRequestInterceptor" :js-code="jsRequestInterceptor">
  <yh-ai-provider
    ref="providerRef2"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">🔑 发送消息时拦截器会自动注入 Mock Token (查看控制台)</p>
      <yh-ai-chat :messages="messages2" :loading="loading2" @send="handleSend2" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### 响应拦截器 - 统一错误处理

<DemoBlock title="响应拦截器 - 统一错误处理" :ts-code="tsResponseInterceptor" :js-code="jsResponseInterceptor">
  <yh-ai-provider
    ref="providerRef3"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">🚨 统一异常捕获演示</p>
      <yh-ai-chat :messages="messages3" :loading="loading3" @send="handleSend3" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### 日志记录拦截器

<DemoBlock title="日志记录拦截器" :ts-code="tsLoggingInterceptor" :js-code="jsLoggingInterceptor">
  <yh-ai-provider
    ref="providerRef4"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">⏳ 实时记录请求耗时 (查看控制台)</p>
      <yh-ai-chat :messages="messages4" :loading="loading4" @send="handleSend4" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

### 类型定义

```typescript
import type { AiRequestConfig, AiResponse } from '@yh-ui/components'

// 请求拦截器
interface AiRequestInterceptor {
  onRequest?: (config: AiRequestConfig) => AiRequestConfig | void | Promise<AiRequestConfig | void>
  onRequestError?: (error: Error) => void
}

// 响应拦截器
interface AiResponseInterceptor {
  onResponse?: (response: Response) => Response | void | Promise<Response | void>
  onResponseError?: (error: Error) => void
}
```

## 使用建议

- **Vite/Nuxt 项目**：通常在 `App.vue` 或 `layouts/default.vue` 中使用一次即可。
- **作用域隔离**：如果应用中有多个不同的 AI 模块（例如一个客服机器人，一个代码助手），可以分别包裹不同的 `AiProvider` 来实现隔离。
