# Vue 3 Composables

YH-UI provides multiple Vue 3 Composition API Hooks to simplify AI functionality in Vue.

## createStreamableValue - Streaming Values

Create reactive values that can be progressively updated during streaming, enabling typewriter effects in UI.

```typescript
import { createStreamableValue, useStreamableValue } from '@yh-ui/ai-sdk'

// Create streaming value
const streamable = createStreamableValue<string>('')

// Use in component
const { value, loading, error } = useStreamableValue(streamable)

// Update in streaming callback
streamable.value.value = 'Hello '
streamable.value.value += 'World'
streamable.loading.value = false
```

### API

| Property/Method                  | Type                 | Description                |
| -------------------------------- | -------------------- | -------------------------- |
| `createStreamableValue(initial)` | `Function`           | Create streaming value     |
| `value.value`                    | `Ref<string>`        | Currently accumulated text |
| `loading.value`                  | `Ref<boolean>`       | Loading state              |
| `error.value`                    | `Ref<Error \| null>` | Error information          |

## useConversation - Conversation History

Manage conversation message list with support for adding, clearing, and persistence.

```typescript
import { useConversation } from '@yh-ui/ai-sdk'

const { messages, addMessage, clearHistory, setMessages } = useConversation({
  maxHistory: 50, // Maximum history count
  persist: true, // Persist to localStorage
  storageKey: 'ai-conversation' // Storage key name
})

// Add messages
addMessage({ role: 'user', content: 'Hello' })
addMessage({ role: 'assistant', content: 'How can I help you?' })

// Clear history
clearHistory()

// Manually set messages
setMessages([{ role: 'user', content: 'Hello' }])
```

### API

| Property/Method     | Type                         | Description   |
| ------------------- | ---------------------------- | ------------- |
| `messages`          | `Ref<ConversationMessage[]>` | Message list  |
| `addMessage(msg)`   | `Function`                   | Add message   |
| `clearHistory()`    | `Function`                   | Clear history |
| `setMessages(msgs)` | `Function`                   | Set messages  |

## createAIContext - AI Context

Provide session ID, model configuration, and other context at the root of the application. Child components access via inject.

```typescript
import { createAIContext } from '@yh-ui/ai-sdk'

// Root component
const aiContext = createAIContext(
  { name: 'openai', defaultModel: 'gpt-4' },
  { sessionId: 'user-session-123' }
)

// Provide to child components
provide('ai-context', aiContext)
```

```typescript
// In child component
import { inject } from 'vue'

const context = inject('ai-context')

// Get/set model configuration
console.log(context.modelConfig.value) // { model: 'gpt-4', ... }
context.setModel({ model: 'gpt-4o', temperature: 0.8 })

// Session ID
console.log(context.sessionId) // 'user-session-123'
```

## Integration with YH-UI Components

`@yh-ui/ai-sdk` can work with YH-UI AI components (such as `yh-ai-bubble`):

```vue
<script setup lang="ts">
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat'
})
</script>

<template>
  <div class="chat-container">
    <yh-ai-bubble v-for="msg in messages" :key="msg.id" :role="msg.role" :content="msg.content" />
    <div class="input-area">
      <yh-input v-model="input" @pressEnter="sendMessage(input)" />
      <yh-button :loading="isLoading" @click="sendMessage(input)">Send</yh-button>
    </div>
  </div>
</template>
```

::: tip
`useAIChat` and `useConversation` can be used together: `useAIChat` manages streaming requests, while `useConversation` manages message persistence.
:::
