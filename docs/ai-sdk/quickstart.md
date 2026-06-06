# 快速开始

本章节展示 `@yh-ui/ai-sdk` 的最小使用示例，帮助快速上手。

## 最小示例

### generateText - 非流式生成

一次性获取完整回复：

```typescript
import { generateText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const result = await generateText({
  model: openai('gpt-4'),
  prompt: '用一句话介绍 Vue 3'
})

console.log(result.text)
```

### streamText - 流式生成

逐块获取回复，实现打字机效果：

```typescript
import { streamText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI()

const result = streamText({
  model: openai('gpt-4'),
  prompt: '写一首关于春天的诗'
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}
```

### useAIChat - Vue 对话 Hook

在 Vue 组件中管理对话：

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat',
  initialMessages: [{ role: 'assistant', content: '你好！有什么可以帮助你的？' }]
})

// 发送消息
await sendMessage('你好')
```

## 完整示例：带工具调用

```typescript
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// 定义工具
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: '获取指定城市的天气信息',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    // 实际调用天气 API
    return { city, weather: '晴', temperature: 25 }
  }
})

// 调用
const openai = createOpenAI()
const result = await generateText({
  model: openai('gpt-4'),
  prompt: '北京天气怎么样？',
  tools: [weatherTool]
})

console.log(result.toolResults)
```

## 下一步

- 了解更多 Vercel AI SDK 功能：[Vercel AI SDK](./vercel)
- 使用 LangChain 模型：[LangChain 集成](./langchain)
- 构建复杂 AI 应用：[Agent 编排](./agent)
