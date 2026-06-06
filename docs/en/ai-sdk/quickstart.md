# Quick Start

This section provides minimal usage examples for `@yh-ui/ai-sdk` to help you get started quickly.

## Minimal Examples

### generateText - Non-Streaming Generation

Get the complete response at once:

```typescript
import { generateText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Introduce Vue 3 in one sentence'
})

console.log(result.text)
```

### streamText - Streaming Generation

Get responses chunk by chunk for typewriter effects:

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

### useAIChat - Vue Chat Hook

Manage conversations in Vue components:

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat',
  initialMessages: [{ role: 'assistant', content: 'Hello! How can I help you?' }]
})

// Send a message
await sendMessage('Hello')
```

## Complete Example: With Tool Calling

```typescript
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// Define a tool
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: 'Get weather information for a specified city',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'City name' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    // Actually call weather API
    return { city, weather: 'Sunny', temperature: 25 }
  }
})

// Invoke
const openai = createOpenAI()
const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'How is the weather in Beijing?',
  tools: [weatherTool]
})

console.log(result.toolResults)
```

## Next Steps

- Learn more Vercel AI SDK features: [Vercel AI SDK](./vercel)
- Use LangChain models: [LangChain Integration](./langchain)
- Build complex AI applications: [Agent Orchestration](./agent)
