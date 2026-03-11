# Vercel AI SDK

YH-UI 完全兼容 Vercel AI SDK，可直接使用其所有功能。

## generateText - 非流式文本生成

适用于一次性获取完整回复的场景。

```typescript
import { generateText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({ apiKey: 'your-api-key' })

const result = await generateText({
  model: openai('gpt-4'),
  prompt: '用一句话介绍 Vue 3'
})

console.log(result.text)
console.log(result.finishReason) // 'stop' | 'length' | 'content-filter' | 'tool-calls'
```

### 返回值说明

| 属性           | 类型           | 说明           |
| -------------- | -------------- | -------------- |
| `text`         | `string`       | 生成的文本内容 |
| `finishReason` | `string`       | 结束原因       |
| `usage`        | `Usage`        | token 使用量   |
| `toolCalls`    | `ToolCall[]`   | 工具调用列表   |
| `toolResults`  | `ToolResult[]` | 工具执行结果   |

## streamText - 流式文本生成

适用于需要逐字/逐段展示回复的场景。

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

### 使用 StreamData 传递额外数据

```typescript
import { streamText, StreamData } from '@yh-ui/ai-sdk'

const data = new StreamData()

const result = streamText({
  model: openai('gpt-4'),
  prompt: '介绍 Vue 3',
  experimental_streamData: true
})

for await (const chunk of result.textStream) {
  data.append({ text: chunk })
}

await data.close()
```

## generateObject / streamObject - 结构化输出

强制模型输出指定格式（如 JSON）。

```typescript
import { generateObject } from '@yh-ui/ai-sdk'
import { z } from 'zod'

const result = await generateObject({
  model: openai('gpt-4'),
  schema: z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email()
  }),
  prompt: '生成一个用户信息'
})

console.log(result.object) // { name: '...', age: ..., email: '...' }
```

## useAIChat - 对话组件 Hook

在 Vue 中管理多轮对话与流式回复。

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage, reload, append } = useAIChat({
  api: '/api/chat',
  initialMessages: [{ role: 'assistant', content: '你好！有什么可以帮助你的？' }],
  // 可选配置
  headers: { Authorization: 'Bearer xxx' },
  body: { model: 'gpt-4' },
  onChunk: (chunk) => {
    /* 流式回调 */
  },
  onFinish: (message) => {
    /* 完成回调 */
  },
  onError: (error) => {
    /* 错误回调 */
  }
})
```

### API 说明

| 属性                    | 类型                         | 说明             |
| ----------------------- | ---------------------------- | ---------------- | -------- |
| `messages`              | `Ref<ConversationMessage[]>` | 消息列表         |
| `input`                 | `Ref<string>`                | 输入框绑定值     |
| `isLoading`             | `Ref<boolean>`               | 是否正在生成     |
| `error`                 | `Ref<Error                   | null>`           | 错误信息 |
| `sendMessage(content)`  | `Function`                   | 发送消息         |
| `reload()`              | `Function`                   | 重新生成最后一条 |
| `append(content, role)` | `Function`                   | 手动追加消息     |

## 支持的模型提供商

| 提供商    | 创建函数                   | 支持流式 | 说明                   |
| --------- | -------------------------- | -------- | ---------------------- |
| OpenAI    | `createOpenAI`             | ✅       | GPT-4o, GPT-4, GPT-3.5 |
| Anthropic | `createAnthropic`          | ✅       | Claude 3.5, Claude 3   |
| Google    | `createGoogleGenerativeAI` | ✅       | Gemini 1.5 Pro/Flash   |
| DeepSeek  | `createDeepSeek`           | ✅       | DeepSeek Chat          |
| 通义千问  | `createQwen`               | ✅       | Qwen 2.5               |
| 文心一言  | `createBaidu`              | ✅       | ERNIE 4.0              |
| Ollama    | `createOllama`             | ✅       | 本地模型               |
| LM Studio | `createLMStudio`           | ✅       | 本地模型               |

::: tip
使用本地模型（如 Ollama、LM Studio）时，无需 API Key，但需要确保本地服务已启动。
:::
