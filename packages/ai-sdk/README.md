# @yh-ui/ai-sdk

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI AI SDK</h3>

<p align="center">
  官方 AI 集成方案 · Vercel AI SDK 深度集成 · LangChain 支持 · Vue 3 响应式 Hooks · 流式渲染
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/ai-sdk">
    <img src="https://img.shields.io/npm/v/@yh-ui/ai-sdk.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/ai-sdk">
    <img src="https://img.shields.io/npm/dm/@yh-ui/ai-sdk.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/ai-sdk.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🤖 **多 Provider 支持** — OpenAI、Anthropic (Claude)、Google Gemini、本地模型，统一适配器接口
- ⚡ **Vercel AI SDK 完整集成** — `generateText`、`streamText`、`useChat`、工具调用全覆盖
- 🦜 **LangChain 支持** — 原生适配 LangChain 聊天模型，支持复杂 Chain/Agent 场景
- 💬 **Vue 3 响应式 Hooks** — `useAIChat`、`useAIStream` 等，状态自动响应视图更新
- 🌊 **流式渲染深度集成** — 与 `YhAiBubble` 组件无缝配合，逐词/逐字动画效果
- 📝 **对话历史管理** — 开箱即用的会话历史、多轮对话、持久化存储
- 🔧 **工具调用（Function Calling）** — 简洁的 API 定义 AI 工具函数
- 🔒 **完整 TypeScript** — 所有 API 均有精确类型，含 Zod schema 验证

---

## 📦 安装

```bash
# 核心包
pnpm add @yh-ui/ai-sdk

# 根据使用的 AI Provider 选择安装（至少一个）
pnpm add @ai-sdk/openai      # OpenAI（GPT-4o, GPT-3.5, o1...）
pnpm add @ai-sdk/anthropic   # Anthropic（Claude 3.5 Sonnet...）
pnpm add @ai-sdk/google      # Google（Gemini Pro, Gemini Flash...）
```

**同伴依赖**：需同时安装 `@yh-ui/components`（提供 AI UI 组件）

---

## 🔨 快速开始

### 最简单的 AI 聊天

```vue
<!-- 前端组件 -->
<script setup lang="ts">
import { YhAiBubble, YhAiSender } from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage, stop } = useAIChat({
  api: '/api/chat',
  onFinish: (msg) => console.log('AI 回复完成:', msg.content),
  onError: (err) => console.error('请求失败:', err)
})
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div class="messages">
      <YhAiBubble
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        streaming
        stream-mode="word"
        :stream-interval="15"
      />
    </div>

    <!-- 输入框 -->
    <YhAiSender v-model="input" :loading="isLoading" @send="sendMessage" @cancel="stop" />
  </div>
</template>
```

```ts
// 后端 API 路由（Nuxt server/api/chat.post.ts）
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = await streamText({
    model: openai('gpt-4o'),
    messages
  })

  return result.toDataStreamResponse()
})
```

---

## 🌊 流式渲染

```vue
<script setup lang="ts">
import { YhAiBubble } from '@yh-ui/components'
import { useAIStream } from '@yh-ui/ai-sdk/vue'

const { content, isStreaming, start, stop } = useAIStream({
  api: '/api/chat/stream',
  onChunk: (chunk) => console.log('收到片段:', chunk),
  onFinish: () => console.log('流式结束')
})
</script>

<template>
  <YhAiBubble
    role="assistant"
    :content="content"
    :typing="isStreaming"
    streaming
    stream-mode="word"
    :stream-interval="20"
  />
  <button @click="start">开始生成</button>
  <button @click="stop" :disabled="!isStreaming">停止</button>
</template>
```

---

## 💬 多轮对话历史管理

```ts
import { useConversation } from '@yh-ui/ai-sdk'

const { messages, addMessage, clearHistory, exportHistory, importHistory } = useConversation({
  maxHistory: 50, // 最大保留消息数
  persist: true, // 持久化到 localStorage
  storageKey: 'my-chat' // 存储 key
})

// 手动添加消息
addMessage({ role: 'user', content: '你好' })
addMessage({ role: 'assistant', content: '你好！有什么可以帮你的？' })

// 清空历史
clearHistory()

// 导出/导入对话（用于分享或备份）
const json = exportHistory()
importHistory(json)
```

---

## 🔧 工具调用（Function Calling）

```ts
import { createYHFunctionTool } from '@yh-ui/ai-sdk'
import { z } from 'zod'

// 定义 AI 工具
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: '获取指定城市的实时天气',
  // 使用 Zod schema 定义参数（自动生成 JSON Schema）
  schema: z.object({
    city: z.string().describe('城市名称，如：北京、上海'),
    unit: z.enum(['celsius', 'fahrenheit']).default('celsius').describe('温度单位')
  }),
  execute: async ({ city, unit }) => {
    // 调用真实天气 API
    const res = await fetch(`https://api.weather.com?city=${city}`)
    return await res.json()
  }
})

// 在流式对话中使用工具
const result = await streamText({
  model: openai('gpt-4o'),
  tools: { weatherTool },
  messages: [{ role: 'user', content: '北京今天天气怎么样？' }]
})
```

---

## 🔌 多 Provider 适配器

```ts
import { createProviderAdapter } from '@yh-ui/ai-sdk'

// 统一适配器，方便切换 Provider
const openai = createProviderAdapter({
  name: 'openai',
  baseUrl: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
  defaultModel: 'gpt-4o'
})

const anthropic = createProviderAdapter({
  name: 'anthropic',
  baseUrl: 'https://api.anthropic.com/v1',
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultModel: 'claude-3-5-sonnet-20241022'
})

const gemini = createProviderAdapter({
  name: 'google',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  apiKey: process.env.GOOGLE_API_KEY,
  defaultModel: 'gemini-1.5-flash'
})
```

---

## 📚 API 参考

### Vue Composables（从 `@yh-ui/ai-sdk/vue` 导入）

| 函数                   | 说明                                       |
| ---------------------- | ------------------------------------------ |
| `useAIChat(options)`   | AI 对话 Hook，管理消息列表、发送、流式接收 |
| `useAIStream(options)` | 流式文本生成 Hook                          |

### 核心工具（从 `@yh-ui/ai-sdk` 导入）

| 函数                             | 说明                                |
| -------------------------------- | ----------------------------------- |
| `useConversation(options)`       | 对话历史管理（持久化、导入导出）    |
| `createYHFunctionTool(options)`  | 创建 AI 工具函数（集成 Zod 验证）   |
| `createProviderAdapter(options)` | 创建统一 AI Provider 适配器         |
| `createStreamableValue()`        | 创建可流式更新的响应式值            |
| `createAIContext()`              | 创建全局 AI 上下文（Provider 模式） |

### LangChain 集成（从 `@yh-ui/ai-sdk/langchain` 导入）

```ts
import { YHLangChainChatModel } from '@yh-ui/ai-sdk/langchain'

const model = new YHLangChainChatModel({
  provider: 'openai',
  model: 'gpt-4o',
  streaming: true
})
```

---

## 🔗 与 AI 组件配合

### `YhAiBubble` — 流式 Markdown 渲染

```vue
<YhAiBubble
  role="assistant"            <!-- 'user' | 'assistant' | 'system' -->
  :content="streamContent"   <!-- 支持 Markdown、代码块、表格 -->
  :typing="isStreaming"       <!-- 显示光标动效 -->
  streaming                   <!-- 启用流式模式 -->
  stream-mode="word"          <!-- 'char'（逐字）| 'word'（逐词） -->
  :stream-interval="15"       <!-- 渲染间隔（ms） -->
/>
```

### `YhAiThoughtChain` — 思维链展示

```vue
<YhAiThoughtChain
  :items="thoughtSteps"
  status="thinking"           <!-- 'thinking' | 'success' | 'error' -->
  :show-progress="true"
  :line-gradient="true"
  @node-click="handleNodeClick"
/>
```

---

## ⚠️ 安全注意事项

1. **API Key 不要暴露到前端** — 所有 AI 调用应通过后端 API 路由进行，不要在 `.env.VITE_` 等前端可见的环境变量中存放密钥
2. **内容过滤** — 建议在后端对用户输入和 AI 输出做内容安全过滤
3. **速率限制** — 生产环境建议在 API 路由层添加用户级别的请求限流

---

## 🔗 相关资源

- [📖 AI 组件文档](https://1079161148.github.io/yh-ui/components/ai-bubble)
- [📦 Vercel AI SDK](https://sdk.vercel.ai/docs)
- [🦜 LangChain.js](https://js.langchain.com/docs)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
