# Vue 3 Composables

YH-UI 提供多个 Vue 3 Composition API Hook，简化 AI 功能在 Vue 中的使用。

## createStreamableValue - 流式值

创建可在流式过程中逐步更新的响应式值，便于在 UI 中展示打字机效果。

```typescript
import { createStreamableValue, useStreamableValue } from '@yh-ui/ai-sdk'

// 创建流式值
const streamable = createStreamableValue<string>('')

// 在组件中使用
const { value, loading, error } = useStreamableValue(streamable)

// 在流式回调中更新
streamable.value.value = 'Hello '
streamable.value.value += 'World'
streamable.loading.value = false
```

### API

| 属性/方法                        | 类型           | 说明           |
| -------------------------------- | -------------- | -------------- | -------- |
| `createStreamableValue(initial)` | `Function`     | 创建流式值     |
| `value.value`                    | `Ref<string>`  | 当前累积的文本 |
| `loading.value`                  | `Ref<boolean>` | 加载状态       |
| `error.value`                    | `Ref<Error     | null>`         | 错误信息 |

## useConversation - 对话历史

管理对话消息列表，支持添加、清空与持久化。

```typescript
import { useConversation } from '@yh-ui/ai-sdk'

const { messages, addMessage, clearHistory, setMessages } = useConversation({
  maxHistory: 50, // 最大历史记录数
  persist: true, // 是否持久化到 localStorage
  storageKey: 'ai-conversation' // 存储键名
})

// 添加消息
addMessage({ role: 'user', content: '你好' })
addMessage({ role: 'assistant', content: '有什么可以帮助你？' })

// 清空历史
clearHistory()

// 手动设置消息
setMessages([{ role: 'user', content: 'Hello' }])
```

### API

| 属性/方法           | 类型                         | 说明     |
| ------------------- | ---------------------------- | -------- |
| `messages`          | `Ref<ConversationMessage[]>` | 消息列表 |
| `addMessage(msg)`   | `Function`                   | 添加消息 |
| `clearHistory()`    | `Function`                   | 清空历史 |
| `setMessages(msgs)` | `Function`                   | 设置消息 |

## createAIContext - AI 上下文

在应用根部提供会话 ID、模型配置等上下文，子组件通过 inject 使用。

```typescript
import { createAIContext } from '@yh-ui/ai-sdk'

// 根组件
const aiContext = createAIContext(
  { name: 'openai', defaultModel: 'gpt-4' },
  { sessionId: 'user-session-123' }
)

// 提供给子组件
provide('ai-context', aiContext)
```

```typescript
// 子组件中
import { inject } from 'vue'

const context = inject('ai-context')

// 获取/设置模型配置
console.log(context.modelConfig.value) // { model: 'gpt-4', ... }
context.setModel({ model: 'gpt-4o', temperature: 0.8 })

// 会话 ID
console.log(context.sessionId) // 'user-session-123'
```

## 与 YH-UI 组件配合

`@yh-ui/ai-sdk` 可与 YH-UI 的 AI 组件（如 `yh-ai-bubble`）配合：

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
      <yh-button :loading="isLoading" @click="sendMessage(input)">发送</yh-button>
    </div>
  </div>
</template>
```

::: tip
`useAIChat` 与 `useConversation` 可配合使用：`useAIChat` 管理流式请求，`useConversation` 管理消息持久化。
:::
