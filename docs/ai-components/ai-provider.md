<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const messages = ref([
  { id: '1', role: 'assistant', content: '你好！我是由 AiProvider 配置的助手。' }
])
const loading = ref(false)

const handleSend = (content: string) => {
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content
  })
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
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '收到！响应已返回。'
    })
    loading.value = false
  }, 1000)
}
</${_S}>

<${_St} scoped>
.ai-demo-container {
  height: 400px;
  border: 1px solid var(--yh-border-color-light);
  border-radius: 8px;
  overflow: hidden;
}
</${_St}>`

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
    user-name="AI 助手"
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

### Slots

| 插槽名    | 说明                     |
| --------- | ------------------------ |
| `default` | 供配置注入的下游组件内容 |

## 使用建议

- **Vite/Nuxt 项目**：通常在 `App.vue` 或 `layouts/default.vue` 中使用一次即可。
- **作用域隔离**：如果应用中有多个不同的 AI 模块（例如一个客服机器人，一个代码助手），可以分别包裹不同的 `AiProvider` 来实现隔离。
