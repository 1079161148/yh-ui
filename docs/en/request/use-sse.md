# useSSE

`useSSE` is a Hook based on native Server-Sent Events (SSE) / streaming responses, suitable for **real-time message push, log streaming, AI streaming output** and other scenarios.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ====== Typewriter simulation demo (no real server needed) ======
const streamContent = ref('')
const streamLoading = ref(false)
const streamDone = ref(false)
const messageList = ref<{ event: string; data: string }[]>([])
let stopFlag = false

const simulatedChunks = [
  'Hello! ',
  "I'm the YH-UI docs ",
  'assistant.\n\n',
  '**useSSE** supports:\n',
  '- Real-time message push\n',
  '- AI streaming output\n',
  '- Log stream display\n\n',
  'It wraps the native fetch ',
  'ReadableStream API ',
  'so you never have to deal ',
  'with low-level protocol details.',
  '\n\n✅ Stream complete!'
]

const startStream = async () => {
  if (streamLoading.value) return
  streamContent.value = ''
  messageList.value = []
  streamDone.value = false
  streamLoading.value = true
  stopFlag = false

  for (let i = 0; i < simulatedChunks.length; i++) {
    if (stopFlag) break
    await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 120))
    streamContent.value += simulatedChunks[i]
    messageList.value.push({ event: 'chunk', data: simulatedChunks[i] })
  }

  if (!stopFlag) {
    messageList.value.push({ event: 'done', data: '[DONE]' })
    streamDone.value = true
  }
  streamLoading.value = false
}

const stopStream = () => {
  stopFlag = true
  streamLoading.value = false
}

const resetStream = () => {
  stopFlag = true
  streamContent.value = ''
  messageList.value = []
  streamLoading.value = false
  streamDone.value = false
}

const tsSSEDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" :loading="loading" :disabled="loading" @click="sendRequest">
        Start Stream
      </yh-button>
      <yh-button type="danger" :disabled="!loading" @click="stop">Stop</yh-button>
      <yh-button @click="reset">Reset</yh-button>
      <yh-tag :type="loading ? 'primary' : done ? 'success' : 'info'">
        {{ loading ? 'Receiving...' : done ? 'Done ✓' : 'Ready' }}
      </yh-tag>
    </div>

    <div style="padding:16px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page); min-height:80px; font-size:14px; white-space:pre-wrap; line-height:1.7">
      <span v-if="!content && !loading" style="color:var(--yh-text-color-placeholder)">
        Click "Start Stream" to see the typewriter effect...
      </span>
      <span>{{ content }}</span>
      <span v-if="loading" style="display:inline-block; width:2px; height:1em; background:currentColor; margin-left:2px" />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useSSE } from '@yh-ui/request'

const done = ref(false)

const { loading, content, start, stop, reset: resetSSE } = useSSE({
  onMessage: (msg) => {
    // msg.event: 'chunk' | 'message' | 'done' | ...
    // msg.data: data received this time
    console.log('[SSE]', msg.event, msg.data)
  },
  onDone: (full) => {
    done.value = true
    console.log('Full content:', full)
  },
  onError: (err) => {
    console.error('SSE error:', err)
  }
})

const sendRequest = () => {
  done.value = false
  resetSSE()
  start({
    url: '/api/chat/stream',  // Replace with your streaming endpoint
    method: 'POST',
    data: { message: 'Hello' }
  })
}

const reset = () => {
  done.value = false
  stop()
  resetSSE()
}
</${_S}>`
</script>

## Typewriter Effect Demo

> 💡 **Note**: `useSSE` requires a real server-side streaming endpoint. The demo below simulates SSE chunk delivery to visualize the typewriter effect. In real usage, replace the URL in `start()` with your API endpoint.

<DemoBlock title="SSE Streaming & Typewriter Effect Demo" :ts-code="tsSSEDemo" :js-code="toJs(tsSSEDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" :loading="streamLoading" :disabled="streamLoading" @click="startStream">
        Start Stream
      </yh-button>
      <yh-button type="danger" :disabled="!streamLoading" @click="stopStream">Stop</yh-button>
      <yh-button @click="resetStream">Reset</yh-button>
      <yh-tag :type="streamLoading ? 'primary' : streamDone ? 'success' : 'info'">
        {{ streamLoading ? 'Receiving...' : streamDone ? 'Done ✓' : 'Ready' }}
      </yh-tag>
    </div>
    <div style="padding:16px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page); min-height:80px; font-size:14px; white-space:pre-wrap; line-height:1.7">
      <span v-if="!streamContent && !streamLoading" style="color:var(--yh-text-color-placeholder)">
        Click "Start Stream" to see the typewriter effect...
      </span>
      <span>{{ streamContent }}</span>
      <span v-if="streamLoading" style="display:inline-block; width:2px; height:14px; background:var(--yh-text-color); margin-left:2px; opacity:0.8" />
    </div>
    <div v-if="messageList.length > 0" style="background:var(--vp-c-bg-soft); border-radius:8px; padding:10px 12px; font-family:monospace; font-size:11px; max-height:120px; overflow-y:auto; color:var(--yh-text-color-secondary)">
      <div v-for="(msg, i) in messageList.slice(-6)" :key="i" style="margin-bottom:3px">
        <span :style="{ color: msg?.event === 'done' ? '#67c23a' : '#409eff' }">[{{ msg?.event }}]</span>
        <span style="margin-left:6px">{{ String(msg?.data ?? '').slice(0, 60) }}</span>
      </div>
    </div>
  </div>
</DemoBlock>

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
  data: { message: 'Hello' }
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
| `start(options?)` | `(options?: RequestOptions) => void` | Start streaming request; see below               |
| `stop()`          | `() => void`                         | Stop streaming request                           |
| `reset()`         | `() => void`                         | Reset all state                                  |

### start(options) Parameters

The `options` passed to `start(options)` are request config (`RequestOptions`). Common fields:

| Field     | Type                     | Description                         |
| --------- | ------------------------ | ----------------------------------- |
| `url`     | `string`                 | Request URL (required)              |
| `method`  | `string`                 | HTTP method, e.g. `'GET'`, `'POST'` |
| `data`    | `object`                 | Request body (POST, etc.)           |
| `params`  | `object`                 | URL query params                    |
| `headers` | `Record<string, string>` | Request headers                     |
| `baseURL` | `string`                 | Base URL                            |
| `timeout` | `number`                 | Timeout (ms)                        |

If `options` is omitted, defaults from the `useSSE` options are used (e.g. set `url` there).

## Options

```typescript
interface UseSSEOptions extends RequestOptions {
  parseJSON?: boolean // Auto parse JSON, default true
  decoder?: TextDecoder // Custom decoder
  separator?: string // Message separator, default '\n\n'
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
  start({ url: '/api/chat/stream', method: 'POST', data: { message } })
}
```

## Error & Retry

```typescript
const { error, start, stop } = useSSE({
  onError: (err) => {
    YhMessage.error(`Streaming connection failed: ${err.message}`)
  }
})

const connect = () => start({ url: '/api/logs/stream', method: 'GET' })
const reconnect = () => {
  stop()
  setTimeout(connect, 1000)
}
```

## Relationship with useAIStream

- `useSSE`: Generic streaming Hook, doesn't care about specific data structure
- `useAIStream`: Built on top of `useSSE` with **AI text parsing, thinking chain, tool calling** and other advanced capabilities, more suitable for AI applications

For more AI scenarios, see: [useAIStream](./use-ai-stream)
