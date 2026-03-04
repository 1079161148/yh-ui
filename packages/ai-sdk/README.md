# @yh-ui/ai-sdk

YH-UI AI SDK - 官方集成 Vercel AI SDK 和 LangChain 的最佳实践

## 安装

```bash
# 核心包
pnpm add @yh-ui/ai-sdk
# 或
npm install @yh-ui/ai-sdk

# 根据使用的模型提供商，选择性安装对应的 provider 包
pnpm add @ai-sdk/openai    # OpenAI
# 或
pnpm add @ai-sdk/anthropic  # Anthropic (Claude)
# 或
pnpm add @ai-sdk/google    # Google Gemini
```

## 功能特性

- **Vercel AI SDK 完整集成** - 支持 `generateText`、`streamText`、`useChat` 等核心功能
- **LangChain 支持** - 原生支持 LangChain 的聊天模型和工具调用
- **Vue 3 Composition API** - 提供 `useAIChat`、`useAIStream` 等响应式 Hook
- **对话管理** - 开箱即用的会话历史管理和持久化
- **流式渲染** - 与 `ai-bubble` 组件深度集成，支持流式增量渲染
- **工具调用** - 简单易用的 AI 函数工具定义

## 快速开始

### 1. 基础对话

```vue
<script setup lang="ts">
import { YhAiBubble, YhAiSender } from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat',
  onFinish: (msg) => console.log('完成:', msg.content)
})
</script>

<template>
  <div class="chat">
    <div class="messages">
      <yh-ai-bubble v-for="msg in messages" :key="msg.id" :role="msg.role" :content="msg.content" />
    </div>

    <yh-ai-sender v-model="input" :loading="isLoading" @send="sendMessage" />
  </div>
</template>
```

### 2. 流式渲染

```vue
<script setup lang="ts">
import { YhAiBubble } from '@yh-ui/components'
import { useAIStream } from '@yh-ui/ai-sdk/vue'

const { content, isStreaming, start, stop } = useAIStream({
  api: '/api/chat/stream',
  onChunk: (chunk) => console.log('收到:', chunk)
})
</script>

<template>
  <yh-ai-bubble
    role="assistant"
    :content="content"
    :typing="isStreaming"
    streaming
    stream-mode="word"
    :stream-interval="20"
  />
</template>
```

### 3. 对话历史管理

```ts
import { useConversation } from '@yh-ui/ai-sdk'

const { messages, addMessage, clearHistory } = useConversation({
  maxHistory: 50,
  persist: true,
  storageKey: 'my-chat-history'
})

// 添加消息
addMessage({ role: 'user', content: '你好' })
addMessage({ role: 'assistant', content: '你好！有什么可以帮你的？' })
```

### 4. 工具调用

```ts
import { createYHFunctionTool } from '@yh-ui/ai-sdk'

const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: '获取指定城市的天气',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    // 调用天气 API
    return `当前${city}天气晴朗，25°C`
  }
})
```

### 5. Provider 适配器

```ts
import { createProviderAdapter } from '@yh-ui/ai-sdk'

// OpenAI
const openai = createProviderAdapter({
  name: 'openai',
  baseUrl: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
  defaultModel: 'gpt-4'
})

// Anthropic (Claude)
const anthropic = createProviderAdapter({
  name: 'anthropic',
  baseUrl: 'https://api.anthropic.com/v1',
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultModel: 'claude-3-opus-20240229'
})

// Google Gemini
const google = createProviderAdapter({
  name: 'google',
  baseUrl: 'https://generativelanguage.googleapis.com/v1',
  apiKey: process.env.GOOGLE_API_KEY,
  defaultModel: 'gemini-pro'
})
```

## API 参考

### Vue Composables

| 函数                    | 说明                       |
| ----------------------- | -------------------------- |
| `useAIChat`             | AI 对话 hook，支持流式响应 |
| `useAIStream`           | 流式文本生成 hook          |
| `useConversation`       | 对话历史管理               |
| `createStreamableValue` | 创建可流式更新的值         |
| `createAIContext`       | 创建 AI 上下文             |

### 类型

| 类型                  | 说明               |
| --------------------- | ------------------ |
| `ConversationMessage` | 对话消息类型       |
| `StreamableValue`     | 流式值容器         |
| `ProviderAdapter`     | AI Provider 适配器 |
| `ModelConfig`         | 模型配置           |

## 与组件配合

### 流式 Markdown 渲染

```vue
<yh-ai-bubble
  role="assistant"
  :content="streamContent"
  :typing="isStreaming"
  streaming
  stream-mode="word"
  :stream-interval="15"
/>
```

### 代码块逐行动画

```vue
<yh-ai-bubble :content="codeWithBlocks" streaming />
```

### 思维链展示

```vue
<yh-ai-thought-chain
  :items="thoughtSteps"
  status="thinking"
  :show-progress="true"
  :line-gradient="true"
  @node-click="handleNodeClick"
/>
```

## 示例项目

请参考 [YH-UI 文档](https://yh-ui.dev) 中的 AI 组件示例。

## License

MIT
