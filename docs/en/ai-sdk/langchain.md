# LangChain Integration

YH-UI provides deeply customized LangChain integration, simplifying the use of LangChain models in Vue 3.

## Environment Requirements

```bash
pnpm add @langchain/core @langchain/openai
# Install other providers as needed
pnpm add @langchain/anthropic @langchain/google-genai
```

## useLangChainChat - LangChain Chat

Use LangChain's `BaseChatModel` for multi-turn conversations.

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainChat } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0.7,
  streaming: true
})

const { messages, input, isLoading, sendMessage, clearHistory } = useLangChainChat({
  model,
  systemMessage: 'You are a professional technical consultant',
  maxHistory: 20,
  streaming: true,
  onChunk: (chunk) => {
    // Streaming callback, can be used for typewriter effect
  },
  onFinish: (message) => {
    // Finish callback
  },
  onError: (error) => {
    // Error handling
  }
})
```

## useLangChainStream - Streaming Generation

Independent streaming output based on LangChain models.

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainStream } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({ model: 'gpt-4' })

const { content, isStreaming, start, stop } = useLangChainStream({
  model,
  systemMessage: 'You are a helpful assistant'
})

// Start streaming generation
await start('Please introduce the new features of Vue 3')

// Stop generation
stop()
```

### Return Values

| Property        | Type           | Description                |
| --------------- | -------------- | -------------------------- |
| `content`       | `Ref<string>`  | Currently accumulated text |
| `isStreaming`   | `Ref<boolean>` | Whether is streaming       |
| `start(prompt)` | `Function`     | Start streaming generation |
| `stop()`        | `Function`     | Stop streaming generation  |

## langChainRuntime - Runtime Tools

Synchronously invoke LangChain models and return LangChain `AIMessage`.

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { langChainRuntime } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const response = await langChainRuntime.invoke(model, 'Hello', {
  temperature: 0.7
})

console.log(response.content) // Model response
console.log(response.tool_calls) // Tool calls (if any)
```

## createLangChainChain - Conversation Chain

Create a conversation chain with system prompt and configuration.

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { createLangChainChain } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const chain = createLangChainChain(model, {
  systemMessage: 'You are a professional AI assistant',
  temperature: 0.7,
  maxTokens: 1000
})

const result = await chain.invoke('Hello')
console.log(result)
```

::: tip
`createLangChainChain` returns a LangChain `Runnable` instance, supporting `.pipe()` chaining.
:::
