<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const messages = ref([
  { id: '1', role: 'assistant', content: 'Hello! I am the assistant configured by AiProvider.' }
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
      content: 'Received! This is a response from AiChat after global configuration injection via AiProvider.'
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
  { id: '1', role: 'assistant', content: 'Hello! I am the assistant configured by AiProvider.' }
])

const handleSend = (content: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content })
  loading.value = true
  // Mock request
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Received! Response returned.'
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
    user-name="Antigravity"
    user-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    assistant-name="YH Assistant"
    assistant-avatar="/logo.svg"
  >
    <yh-ai-bubble role="user" content="Who is configuring me?" />
    <yh-ai-bubble role="assistant" content="It's me, your global assistant." />
  </yh-ai-provider>
</${_T}>`
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

### Slots

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| `default` | Downstream component content for configuration injection |

## Recommendations

- **Vite/Nuxt Projects**: Typically used once in `App.vue` or `layouts/default.vue`.
- **Scope Isolation**: If your application has multiple distinct AI modules (e.g., a support bot and a code assistant), you can wrap them in separate `AiProvider` instances for isolation.
