# @yh-ui/ai-sdk

YH-UI 的 AI 交互工具包，负责把模型请求、流式输出、会话状态、工具调用和 Provider 适配整理成 Vue 项目更容易消费的 API。它可以和 `@yh-ui/components` 的 AI 组件直接配合，也可以独立用于自研界面。

[AI Components](https://1079161148.github.io/yh-ui/ai-components/ai-chat) | [Releases](https://github.com/1079161148/yh-ui/releases)

## Highlights

- Vue 响应式会话：`useAIChat`、`useAIStream`、`useConversation`、`useConversations` 管理消息、输入、加载、停止、错误和历史。
- 流式请求：`XRequest`、`createXRequest`、`createStreamableValue` 支持增量内容消费，适合 AI 打字机、代码生成和长文本输出。
- Provider 适配：内置 OpenAI、Anthropic、Google、DeepSeek、Ollama、Azure、Moonshot、MiniMax、Zhipu、SiliconFlow、Together、Novita 等 provider preset。
- 工具调用：`createYHFunctionTool` 统一描述工具名称、参数和执行函数，方便把 Function Calling 结果映射回业务动作。
- 中间件和缓存：支持请求中间件、内存缓存、localStorage/sessionStorage 缓存，便于做审计、重试和复用。
- Agent 扩展：包含 chain、parallel chain、Reflexion、ReWOO、Plan-Execute 等实验型 agent 组织能力。

## Install

```bash
pnpm add @yh-ui/ai-sdk
```

When building a ready-made AI UI, also install the component package:

```bash
pnpm add @yh-ui/components
```

## Chat Hook

```vue
<script setup lang="ts">
import { YhAiBubble, YhAiSender } from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage, stop } = useAIChat({
  api: '/api/chat',
  onError: (error) => console.error(error)
})
</script>

<template>
  <YhAiBubble
    v-for="message in messages"
    :key="message.id"
    :role="message.role"
    :content="message.content"
    streaming
  />
  <YhAiSender v-model="input" :loading="isLoading" @send="sendMessage" @cancel="stop" />
</template>
```

## Provider Adapter

```ts
import { createProviderAdapter, getProviderPreset } from '@yh-ui/ai-sdk/vue'

const preset = getProviderPreset('deepseek')

const provider = createProviderAdapter({
  ...preset,
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultModel: 'deepseek-chat'
})
```

## Function Tool

```ts
import { createYHFunctionTool } from '@yh-ui/ai-sdk/vue'

const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: 'Get weather by city',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string' }
    },
    required: ['city']
  },
  execute: async ({ city }) => fetch(`/api/weather?city=${city}`).then((res) => res.json())
})
```

## Notes

Do not expose model API keys in browser code. Keep provider credentials in a server route and stream the result to the client.

## License

MIT
