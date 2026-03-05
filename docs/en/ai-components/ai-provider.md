<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// --- Basic Usage Demo Data ---
const messages = ref([
  { id: '1', role: 'assistant', content: 'Hello! I am the assistant configured by AiProvider.' }
])
const loading = ref(false)
const handleSend = (content: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content })
  loading.value = true
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Received! This is a response from AiChat after global configuration injection via AiProvider.'
    })
    loading.value = false
  }, 1000)
}

// --- Interceptor Demo Data (Independent Variables) ---

// Demo 1: Basic Interceptors
const providerRef1 = ref()
const messages1 = ref([{ id: '1', role: 'assistant', content: 'Interceptor Example 1: Basic Request/Response Interception' }])
const loading1 = ref(false)
const handleSend1 = (content: string) => {
  messages1.value.push({ id: Date.now().toString(), role: 'user', content })
  loading1.value = true
  console.log('[Demo 1] Triggering mock request...')
  setTimeout(() => {
    messages1.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Test request sent, please check the console log.' })
    loading1.value = false
  }, 1000)
}

// Demo 2: Request Interceptor
const providerRef2 = ref()
const messages2 = ref([{ id: '1', role: 'assistant', content: 'Interceptor Example 2: Request Interceptor - Auto Auth Token' }])
const loading2 = ref(false)
const handleSend2 = (content: string) => {
  messages2.value.push({ id: Date.now().toString(), role: 'user', content })
  loading2.value = true
  console.log('[Demo 2] Triggering mock request...')
  setTimeout(() => {
    messages2.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Token handled in interceptor, please check the console.' })
    loading2.value = false
  }, 1000)
}

// Demo 3: Response Interceptor
const providerRef3 = ref()
const messages3 = ref([{ id: '1', role: 'assistant', content: 'Interceptor Example 3: Response Interceptor - Unified Error Handling' }])
const loading3 = ref(false)
const handleSend3 = (content: string) => {
  messages3.value.push({ id: Date.now().toString(), role: 'user', content })
  loading3.value = true
  console.log('[Demo 3] Triggering mock request...')
  setTimeout(() => {
    messages3.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Response verified by interceptor.' })
    loading3.value = false
  }, 1000)
}

// Demo 4: Logging Interceptor
const providerRef4 = ref()
const messages4 = ref([{ id: '1', role: 'assistant', content: 'Interceptor Example 4: Logging Interceptor' }])
const loading4 = ref(false)
const handleSend4 = (content: string) => {
  messages4.value.push({ id: Date.now().toString(), role: 'user', content })
  loading4.value = true
  console.log('[Demo 4] Triggering mock request...')
  setTimeout(() => {
    messages4.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Logs recorded, check the console.' })
    loading4.value = false
  }, 1000)
}

const token = ref('your-token')

onMounted(() => {
  // 1. Basic Interceptor Demo
  providerRef1.value?.addRequestInterceptor({
    onRequest: (config: import('../ai-components/ai-provider').AiRequestConfig) => {
      console.log('[Demo 1] 🚀 Request Interceptor Triggered:', config)
      messages1.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: '💡 [Interceptor] Injected custom header' })
      config.headers = { ...config.headers, 'X-Custom-Header': 'demo-1' }
      return config
    }
  })
  providerRef1.value?.addResponseInterceptor({
    onResponse: (response: Response) => {
      console.log('[Demo 1] ✅ Response Interceptor Triggered:', response)
      messages1.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: '✅ [Interceptor] Received server response' })
      return response
    }
  })

  // 2. Request Interceptor - Auth Token Demo
  providerRef2.value?.addRequestInterceptor({
    onRequest: (config: import('@yh-ui/components').AiRequestConfig) => {
      const fakeToken = 'auth-token-from-storage'
      console.log('[Demo 2] 🔑 Token Injection:', fakeToken)
      messages2.value.push({ id: 'int-' + Date.now(), role: 'assistant', content: `🔑 [Interceptor] Auto injected token: Bearer ${fakeToken.slice(0, 5)}...` })
      config.headers = { ...config.headers, 'Authorization': `Bearer ${fakeToken}` }
      return config
    }
  })

  // 3. Response Interceptor - Error Handling Demo
  providerRef3.value?.addResponseInterceptor({
    onResponseError: (error: Error) => {
      console.log('[Demo 3] 🚨 Intercepted error response:', error)
      messages3.value.push({ id: 'err-' + Date.now(), role: 'assistant', content: '🚨 [Interceptor] Captured a request exception' })
    }
  })

  // 4. Logging Interceptor Demo
  providerRef4.value?.addRequestInterceptor({
    onRequest: (config: import('@yh-ui/components').AiRequestConfig) => {
      (config as Record<string, unknown>).metadata = { startTime: Date.now() }
      console.log(`[Demo 4] 📝 [Request Log] ${config.method || 'POST'} ${config.url || '/api/chat'}`)
      messages4.value.push({ id: 'log-' + Date.now(), role: 'assistant', content: `📝 [Interceptor] Recording request start` })
      return config
    }
  })
  providerRef4.value?.addResponseInterceptor({
    onResponse: (response: Response) => {
      const duration = Date.now() - (((response as unknown) as { config: { metadata: { startTime: number } } }).config?.metadata?.startTime || 0)
      console.log(`[Demo 4] ⏳ [Response Log] Duration: ${duration}ms`)
      messages4.value.push({ id: 'log-' + Date.now(), role: 'assistant', content: `⏳ [Interceptor] Request duration: ${duration}ms` })
      return response
    }
  })
})

// --- Code Snippets ---
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
  { id: '1', role: 'assistant', content: 'Hello! I am the assistant configured by AiProvider.' }
])

const handleSend = (content: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content })
  loading.value = true
  // Mock request
  setTimeout(() => {
    messages.value.push({ id: Date.now().toString(), role: 'assistant', content: 'Received! Response returned.' })
    loading.value = false
  }, 1000)
}
</${_S}>`

const tsIdentity = `<${_T}>
  <yh-ai-provider
    user-name="Antigravity"
    user-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    assistant-name="YH Assistant"
    assistant-avatar="/logo.svg"
  >
    <yh-ai-bubble role="user" content="Who is configuring me?" />
    <yh-ai-bubble role="assistant" content="It's me, your global assistant." />
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
  // Add Request Interceptor
  providerRef.value?.addRequestInterceptor({
    onRequest: (config) => {
      console.log('Request intercept:', config)
      config.headers['X-Custom'] = 'demo'
      return config
    }
  })

  // Add Response Interceptor
  providerRef.value?.addResponseInterceptor({
    onResponse: (response) => {
      console.log('Response intercept:', response)
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
        console.log('Unauthorized, redirecting to login')
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
      console.log(\`Request duration: \${duration}ms\`)
      return response
    }
  })
})
</${_S}>`

const jsLoggingInterceptor = toJs(tsLoggingInterceptor)
</script>

# AiProvider Global Config

`AiProvider` is the core configuration component of the AI component library, used to inject global settings at the top level of the application. It uses Vue's `provide/inject` mechanism to provide essential configurations such as base API URLs, authentication info, avatars, and typewriter effects to all downstream AI components (e.g., `AiChat`, `AiBubble`).

## Basic Usage

It is recommended to wrap `AiProvider` at the root component of your application or at the outer-most level of an AI feature module.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
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

## Global Identity Configuration

You can centrally set user and assistant avatars and names using `AiProvider`.

<DemoBlock title="Global Identity Configuration" :ts-code="tsIdentity" :js-code="toJs(tsIdentity)">
  <yh-ai-provider
    user-name="Antigravity"
    user-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    assistant-name="YH Assistant"
    assistant-avatar="/logo.svg"
  >
    <yh-ai-bubble role="user" content="Who is configuring me?" />
    <yh-ai-bubble role="assistant" content="It's me, your global assistant." />
  </yh-ai-provider>
</DemoBlock>

## API

### Props

| Name               | Description                     | Type                     | Default                               |
| ------------------ | ------------------------------- | ------------------------ | ------------------------------------- |
| `base-url`         | Global AI base URL              | `string`                 | -                                     |
| `token`            | Authentication Token (Bearer)   | `string`                 | -                                     |
| `headers`          | Global request headers          | `Record<string, string>` | -                                     |
| `user-avatar`      | User avatar URL                 | `string`                 | -                                     |
| `assistant-avatar` | Assistant avatar URL            | `string`                 | -                                     |
| `user-name`        | User display name               | `string`                 | -                                     |
| `assistant-name`   | Assistant display name          | `string`                 | -                                     |
| `system-prompt`    | Global system prompt            | `string`                 | -                                     |
| `typewriter`       | Typewriter effect configuration | `object`                 | `{ enabled: true, charsPerFrame: 2 }` |

### typewriter property definition

| Name              | Description                         | Type      | Default |
| ----------------- | ----------------------------------- | --------- | ------- |
| `enabled`         | Whether to enable typewriter effect | `boolean` | `true`  |
| `chars_per_frame` | Characters per frame to render      | `number`  | `2`     |

### Request/Response Interceptor Props

| Property Name     | Description          | Type                                   | Default   |
| ----------------- | -------------------- | -------------------------------------- | --------- |
| `timeout`         | Request timeout (ms) | `number`                               | `30000`   |
| `withCredentials` | Allow credentials    | `boolean`                              | `false`   |
| `mode`            | Request mode         | `'cors' \| 'no-cors' \| 'same-origin'` | `'cors'`  |
| `cache`           | Cache mode           | `RequestCache`                         | See below |

### Methods

| Method Name                 | Description                 | Parameters                                       | Returns        |
| --------------------------- | --------------------------- | ------------------------------------------------ | -------------- |
| `addRequestInterceptor`     | Add request interceptor     | `(interceptor: AiRequestInterceptor) => number`  | Interceptor ID |
| `addResponseInterceptor`    | Add response interceptor    | `(interceptor: AiResponseInterceptor) => number` | Interceptor ID |
| `removeRequestInterceptor`  | Remove request interceptor  | `(id: number) => void`                           | —              |
| `removeResponseInterceptor` | Remove response interceptor | `(id: number) => void`                           | —              |
| `clearInterceptors`         | Clear all interceptors      | `() => void`                                     | —              |

### Interceptor Usage Examples

#### Basic Interceptor

<DemoBlock title="Add Request/Response Interceptors" :ts-code="tsInterceptor" :js-code="jsInterceptor">
  <yh-ai-provider
    ref="providerRef1"
    base-url="https://api.example.com/v1"
    :token="token"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">💡 Interceptors enhanced: Click send to see real-time interceptor feedback in the chat window and console.</p>
      <yh-ai-chat :messages="messages1" :loading="loading1" @send="handleSend1" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### Request Interceptor - Add Token

<DemoBlock title="Request Interceptor - Auto Add Token" :ts-code="tsRequestInterceptor" :js-code="jsRequestInterceptor">
  <yh-ai-provider
    ref="providerRef2"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">🔑 Interceptors will auto-inject token and show feedback (check console).</p>
      <yh-ai-chat :messages="messages2" :loading="loading2" @send="handleSend2" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### Response Interceptor - Error Handling

<DemoBlock title="Response Interceptor - Unified Error Handling" :ts-code="tsResponseInterceptor" :js-code="jsResponseInterceptor">
  <yh-ai-provider
    ref="providerRef3"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">🚨 Unified exception capture demo</p>
      <yh-ai-chat :messages="messages3" :loading="loading3" @send="handleSend3" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

#### Logging Interceptor

<DemoBlock title="Logging Interceptor" :ts-code="tsLoggingInterceptor" :js-code="jsLoggingInterceptor">
  <yh-ai-provider
    ref="providerRef4"
    base-url="https://api.example.com/v1"
  >
    <div style="padding: 16px;">
      <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">⏳ Real-time request duration logging feedback (check console)</p>
      <yh-ai-chat :messages="messages4" :loading="loading4" @send="handleSend4" style="height: 300px;" />
    </div>
  </yh-ai-provider>
</DemoBlock>

### Type Definitions

```typescript
import type { AiRequestConfig, AiResponse } from '@yh-ui/components'

// Request Interceptor
interface AiRequestInterceptor {
  onRequest?: (config: AiRequestConfig) => AiRequestConfig | void | Promise<AiRequestConfig | void>
  onRequestError?: (error: Error) => void
}

// Response Interceptor
interface AiResponseInterceptor {
  onResponse?: (response: Response) => Response | void | Promise<Response | void>
  onResponseError?: (error: Error) => void
}
```

## Recommendations

- **Vite/Nuxt Projects**: Typically used once in `App.vue` or `layouts/default.vue`.
- **Scope Isolation**: If your application has multiple distinct AI modules (e.g., a support bot and a code assistant), you can wrap them in separate `AiProvider` instances for isolation.
