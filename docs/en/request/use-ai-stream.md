# useAIStream

`useAIStream` is built on top of `useSSE`, designed for AI application scenarios, providing a complete set of streaming capabilities including **typewriter effect, thinking chain, tool calling**, etc.

## Basic Usage

```typescript
import { useAIStream } from '@yh-ui/request'

const {
  loading,
  content, // Raw text
  text, // Parsed current text
  thinking, // Thinking content
  toolCalls, // Tool call list
  done,
  error,
  start,
  stop,
  reset
} = useAIStream({
  onText: (full, delta) => {
    console.log('New content:', delta)
  },
  onThinking: (t) => {
    console.log('Thinking:', t)
  },
  onToolCall: (tools) => {
    console.log('Tool calls:', tools)
  }
})

// Start AI request
start({
  url: '/api/ai/chat',
  method: 'POST',
  data: {
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Write a welcome message for me' }],
    stream: true
  }
})
```

## Return Values

```typescript
const result = useAIStream(options)
```

| Field             | Type                                | Description                            |
| ----------------- | ----------------------------------- | -------------------------------------- |
| `loading`         | `Ref<boolean>`                      | Whether receiving                      |
| `content`         | `Ref<string>`                       | Raw streaming text                     |
| `text`            | `Ref<string>`                       | Parsed plain text (append or override) |
| `thinking`        | `Ref<string>`                       | Thinking chain content                 |
| `toolCalls`       | `Ref<AIStreamMessage['toolCalls']>` | Tool call list                         |
| `done`            | `Ref<boolean>`                      | Whether done                           |
| `messages`        | `Ref<SSEMessage[]>`                 | Underlying SSE messages                |
| `error`           | `Ref<Error \| undefined>`           | Error object                           |
| `start(options?)` | —                                   | Start AI streaming request             |
| `stop()`          | —                                   | Stop streaming request                 |
| `reset()`         | —                                   | Reset all state                        |

## Options

```typescript
interface UseAIStreamOptions extends UseSSEOptions {
  parseAIMessage?: boolean // Parse AI JSON structure, default true
  appendMode?: boolean // Text append mode, default true
  onText?: (text: string, delta: string) => void
  onToolCall?: (toolCalls?: AIStreamMessage['toolCalls']) => void
  onThinking?: (thinking: string) => void
}
```

## Typewriter Effect

```typescript
const display = ref('')

const { start, stop } = useAIStream({
  appendMode: true,
  onText: (full, delta) => {
    // Typewriter effect: only append this increment
    display.value += delta
  }
})

const ask = (message: string) => {
  display.value = ''
  start({
    url: '/api/ai/chat',
    method: 'POST',
    data: { messages: [{ role: 'user', content: message }], stream: true }
  })
}
```

## Display Thinking Chain

```typescript
const thinking = ref('')
const showThinking = ref(false)

const { start } = useAIStream({
  onThinking: (t) => {
    thinking.value = t
    showThinking.value = !!t
  }
})

// Use with thinking chain component in template
// <yh-ai-thought-chain
//   v-if="showThinking"
//   :thinking="true"
//   title="AI is thinking..."
// >
//   <div>{{ thinking }}</div>
// </yh-ai-thought-chain>
```

## Tool Calling

```typescript
const toolCalls = ref<AIStreamMessage['toolCalls']>([])

const { start } = useAIStream({
  onToolCall: (calls) => {
    toolCalls.value = calls || []
  }
})

watch(toolCalls, async (calls) => {
  for (const call of calls || []) {
    if (call.name === 'search') {
      // Execute search tool
      const result = await searchApi(call.arguments)
      console.log('Search result:', result)
    }
  }
})
```

## Complete Chat Example

```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  thinking?: string
}

const messages = ref<ChatMessage[]>([])
const input = ref('')
const isGenerating = ref(false)

const { start, stop, thinking, text } = useAIStream({
  onText: (full, delta) => {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.content += delta
    }
  },
  onThinking: (t) => {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.thinking = t
    }
  },
  onDone: () => {
    isGenerating.value = false
  }
})

const send = () => {
  if (!input.value.trim() || isGenerating.value) return

  const userContent = input.value.trim()
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: userContent
  })

  messages.value.push({
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: ''
  })

  input.value = ''
  isGenerating.value = true

  start({
    url: '/api/ai/chat',
    method: 'POST',
    data: {
      messages: messages.value.slice(0, -1), // Exclude placeholder message
      stream: true
    }
  })
}
```

## Relationship with useSSE

- `useSSE`: Responsible for **streaming transport protocol itself** (SSE / fetch streaming);
- `useAIStream`: Parses AI model return format on top of it, providing more friendly state fields.

When you only need to handle generic log/progress streaming, use `useSSE`; when you're integrating with AI models (OpenAI, Claude, etc.), use `useAIStream`.
