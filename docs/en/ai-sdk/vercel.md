# Vercel AI SDK

YH-UI is fully compatible with Vercel AI SDK and supports all its features directly.

## generateText - Non-Streaming Text Generation

Suitable for scenarios where you need the complete response at once.

```typescript
import { generateText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({ apiKey: 'your-api-key' })

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Introduce Vue 3 in one sentence'
})

console.log(result.text)
console.log(result.finishReason) // 'stop' | 'length' | 'content-filter' | 'tool-calls'
```

### Return Value Reference

| Property       | Type           | Description            |
| -------------- | -------------- | ---------------------- |
| `text`         | `string`       | Generated text content |
| `finishReason` | `string`       | Reason for completion  |
| `usage`        | `Usage`        | Token usage            |
| `toolCalls`    | `ToolCall[]`   | List of tool calls     |
| `toolResults`  | `ToolResult[]` | Tool execution results |

## streamText - Streaming Text Generation

Suitable for scenarios where you need to display responses word by word or chunk by chunk.

```typescript
import { streamText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI()

const result = streamText({
  model: openai('gpt-4'),
  prompt: 'Write a poem about spring'
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}
```

### Using StreamData for Extra Data

```typescript
import { streamText, StreamData } from '@yh-ui/ai-sdk'

const data = new StreamData()

const result = streamText({
  model: openai('gpt-4'),
  prompt: 'Introduce Vue 3',
  experimental_streamData: true
})

for await (const chunk of result.textStream) {
  data.append({ text: chunk })
}

await data.close()
```

## generateObject / streamObject - Structured Output

Force the model to output a specified format (e.g., JSON).

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
  prompt: 'Generate a user information'
})

console.log(result.object) // { name: '...', age: ..., email: '...' }
```

## useAIChat - Chat Component Hook

Manage multi-turn conversations with streaming responses in Vue.

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage, reload, append } = useAIChat({
  api: '/api/chat',
  initialMessages: [{ role: 'assistant', content: 'Hello! How can I help you?' }],
  // Optional configuration
  headers: { Authorization: 'Bearer xxx' },
  body: { model: 'gpt-4' },
  onChunk: (chunk) => {
    /* Streaming callback */
  },
  onFinish: (message) => {
    /* Finish callback */
  },
  onError: (error) => {
    /* Error callback */
  }
})
```

### API Reference

| Property                | Type                         | Description             |
| ----------------------- | ---------------------------- | ----------------------- | ----------------- |
| `messages`              | `Ref<ConversationMessage[]>` | Message list            |
| `input`                 | `Ref<string>`                | Input binding value     |
| `isLoading`             | `Ref<boolean>`               | Whether is generating   |
| `error`                 | `Ref<Error                   | null>`                  | Error information |
| `sendMessage(content)`  | `Function`                   | Send message            |
| `reload()`              | `Function`                   | Regenerate last message |
| `append(content, role)` | `Function`                   | Manually append message |

## Supported Model Providers

| Provider     | Creation Function          | Streaming | Description            |
| ------------ | -------------------------- | --------- | ---------------------- |
| OpenAI       | `createOpenAI`             | ✅        | GPT-4o, GPT-4, GPT-3.5 |
| Anthropic    | `createAnthropic`          | ✅        | Claude 3.5, Claude 3   |
| Google       | `createGoogleGenerativeAI` | ✅        | Gemini 1.5 Pro/Flash   |
| DeepSeek     | `createDeepSeek`           | ✅        | DeepSeek Chat          |
| Qwen         | `createQwen`               | ✅        | Qwen 2.5               |
| Wenxin Yiyan | `createBaidu`              | ✅        | ERNIE 4.0              |
| Ollama       | `createOllama`             | ✅        | Local models           |
| LM Studio    | `createLMStudio`           | ✅        | Local models           |

::: tip
When using local models (like Ollama, LM Studio), no API Key is required, but make sure the local service is running.
:::
