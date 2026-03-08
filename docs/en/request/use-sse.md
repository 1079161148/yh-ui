# useSSE

`useSSE` is a Hook based on native Server-Sent Events (SSE) / streaming responses, suitable for **real-time message push, log streaming, AI streaming output** and other scenarios.

## Basic Usage

```typescript
import { useSSE } from '@yh-ui/request'

const {
  loading, // Whether connecting/receiving
  content, // Accumulated text content
  messages, // Parsed message array
  error, // Error
  start, // Start streaming request
  stop, // Stop
  reset // Reset state
} = useSSE({
  onMessage: (msg) => {
    console.log('Event:', msg.event, 'Data:', msg.data)
  },
  onDone: (full) => {
    console.log('Done:', full)
  },
  onError: (err) => {
    console.error('Error:', err)
  }
})

// Start streaming request
start({
  url: '/api/chat/stream',
  method: 'POST',
  data: {
    message: 'Hello'
  }
})
```

## Return Values and Message Structure

```typescript
export interface SSEMessage<T = unknown> {
  event: 'message' | 'start' | 'chunk' | 'done' | 'error' | 'tool' | 'thinking' | 'custom'
  data: T
  raw: string
  done: boolean
  error?: Error
}
```

```typescript
const result = useSSE(options)
```

| Field             | Type                                 | Description                                      |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| `loading`         | `Ref<boolean>`                       | Whether connecting/receiving                     |
| `content`         | `Ref<string>`                        | Accumulated text content (concatenated in order) |
| `messages`        | `Ref<SSEMessage[]>`                  | All parsed messages                              |
| `error`           | `ShallowRef<Error \| undefined>`     | Error object                                     |
| `start(options?)` | `(options?: RequestOptions) => void` |
| `stop()`          | Stop streaming request               |
| `reset()`         | Reset all state                      |

## Options

```typescript
interface UseSSEOptions extends RequestOptions {
  parseJSON?: boolean // Auto parse JSON, default true
  decoder?: TextDecoder // Custom decoder
  separator?: string // Message separator, default '\\n\\n'
  eventPrefix?: string // Custom event prefix, default 'event:'
  onStart?: () => void
  onMessage?: (message: SSEMessage) => void
  onDone?: (fullContent: string) => void
  onError?: (error: Error) => void
  onCustomEvent?: (event: string, data: unknown) => void
}
```

### Custom Message Format

```typescript
const { start } = useSSE({
  parseJSON: true,
  eventPrefix: 'event:',
  onMessage: (msg) => {
    switch (msg.event) {
      case 'start':
        console.log('Start')
        break
      case 'chunk':
        console.log('Incremental content:', msg.data)
        break
      case 'done':
        console.log('Done')
        break
      case 'custom':
        console.log('Custom event:', msg.raw)
        break
    }
  }
})
```

## Typewriter Effect Example

```typescript
const display = ref('')

const { loading, start, stop } = useSSE({
  onMessage: (msg) => {
    if (msg.event === 'chunk' || msg.event === 'message') {
      const text =
        typeof msg.data === 'string' ? msg.data : msg.data?.content || msg.data?.text || ''
      display.value += text
    }
  },
  onDone: () => {
    console.log('Full content:', display.value)
  }
})

const send = (message: string) => {
  display.value = ''
  start({
    url: '/api/chat/stream',
    method: 'POST',
    data: { message }
  })
}
```

## Error and Retry

```typescript
const { error, start, stop } = useSSE({
  onError: (err) => {
    YhMessage.error(`Streaming connection failed: ${err.message}`)
  }
})

const connect = () => {
  start({ url: '/api/logs/stream', method: 'GET' })
}

const reconnect = () => {
  stop()
  setTimeout(connect, 1000)
}
```

## Relationship with useAIStream

- `useSSE`: Generic streaming Hook, doesn't care about specific data structure
- `useAIStream`: Built on top of `useSSE` with **AI text parsing, thinking chain, tool calling** and other advanced capabilities, more suitable for AI applications

For more AI scenarios, see:

- [useAIStream](./use-ai-stream)
