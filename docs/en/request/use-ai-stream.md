# useAIStream

`useAIStream` is built on top of `useSSE`, designed for AI application scenarios, providing a complete set of streaming capabilities including **typewriter effect, thinking chain, tool calling**, etc.

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ====== Simulated AI chat demo (no real AI API needed) ======
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  isStreaming?: boolean
}

const chatMessages = ref<ChatMessage[]>([])
const chatInput = ref('')
const chatLoading = ref(false)
let stopFlag = false

const thinkingText = 'Analyzing the user\'s question and intent...\nThinking about how to give the most helpful answer...'
const replyContent = "Hello! I'm the YH-UI docs assistant 🤖\n\nKey features of the `useAIStream` hook:\n\n**Typewriter Effect**: Content streams character by character\n**Thinking Chain**: Shows the AI's reasoning process\n**Tool Calling**: Supports function call parsing\n\nFeel free to ask more questions!"

const simulateThinking = async (target: ChatMessage, text: string) => {
  for (const char of text) {
    if (stopFlag) return
    await new Promise(r => setTimeout(r, 25))
    target.thinking = (target.thinking || '') + char
  }
}

const simulateContent = async (target: ChatMessage, text: string) => {
  for (const char of text) {
    if (stopFlag) return
    await new Promise(r => setTimeout(r, 35 + Math.random() * 30))
    target.content += char
  }
}

const sendMessage = async () => {
  const text = chatInput.value.trim()
  if (!text || chatLoading.value) return

  chatMessages.value.push({ role: 'user', content: text })
  chatInput.value = ''

  const assistant = reactive<ChatMessage>({ role: 'assistant', content: '', thinking: '', isStreaming: true })
  chatMessages.value.push(assistant)
  chatLoading.value = true
  stopFlag = false

  await simulateThinking(assistant, thinkingText)
  if (stopFlag) { assistant.isStreaming = false; chatLoading.value = false; return }

  await simulateContent(assistant, replyContent)

  assistant.isStreaming = false
  chatLoading.value = false
}

const stopChat = () => {
  stopFlag = true
  chatLoading.value = false
  const last = chatMessages.value[chatMessages.value.length - 1]
  if (last?.role === 'assistant') last.isStreaming = false
}

const clearChat = () => {
  stopFlag = true
  chatMessages.value = []
  chatInput.value = ''
  chatLoading.value = false
}

const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) { e.preventDefault(); sendMessage() }
}

const tsAIStreamDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
      <template v-for="(msg, i) in messages" :key="i">
        <div v-if="msg.role === 'user'" style="display:flex; justify-content:flex-end">
          <div style="max-width:80%; padding:10px 14px; border-radius:12px 12px 4px 12px; font-size:14px; line-height:1.7; white-space:pre-wrap; background:var(--yh-color-primary); color:#fff">
            {{ msg.content }}
          </div>
        </div>
        <div v-else style="display:flex; flex-direction:column; gap:8px; align-items:flex-start">
          <yh-ai-thought-chain v-if="msg.thinking" :thinking="!!msg.isStreaming && !msg.content" title="Thinking deeply..." style="width:100%; max-width:85%">
            <div style="font-size:12px; white-space:pre-wrap; color:var(--yh-text-color-secondary)">{{ msg.thinking }}</div>
          </yh-ai-thought-chain>
          <div v-if="msg.content || msg.isStreaming" style="max-width:85%; padding:10px 14px; border-radius:12px 12px 12px 4px; font-size:14px; line-height:1.7; white-space:pre-wrap; background:var(--vp-c-bg-soft); border:1px solid var(--yh-border-color)">
            {{ msg.content }}<span v-if="msg.isStreaming && msg.content" class="demo-stream-cursor"></span>
          </div>
        </div>
      </template>
    </div>
    <div style="display:flex; gap:8px">
      <yh-input v-model="input" placeholder="Type a message, press Enter to send..." @keydown.enter.prevent="send" :disabled="loading" style="flex:1" />
      <yh-button type="primary" :loading="loading" @click="send">Send</yh-button>
      <yh-button type="danger" :disabled="!loading" @click="stop">Stop</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useAIStream } from '@yh-ui/request'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  isStreaming?: boolean
}

const messages = ref<ChatMessage[]>([])
const input = ref('')

const { loading, start, stop, reset } = useAIStream({
  appendMode: true,
  onText: (full, delta) => {
    const last = messages.value[messages.value.length - 1]
    if (last?.role === 'assistant') last.content += delta
  },
  onThinking: (t) => {
    const last = messages.value[messages.value.length - 1]
    if (last?.role === 'assistant') last.thinking = t
  },
  onDone: () => {
    const last = messages.value[messages.value.length - 1]
    if (last) last.isStreaming = false
  }
})

const send = () => {
  if (!input.value.trim() || loading.value) return
  messages.value.push({ role: 'user', content: input.value.trim() })
  messages.value.push({ role: 'assistant', content: '', thinking: '', isStreaming: true })
  const userInput = input.value.trim()
  input.value = ''
  reset()
  start({
    url: '/api/ai/chat',  // Replace with your AI endpoint
    method: 'POST',
    data: { messages: [{ role: 'user', content: userInput }], stream: true }
  })
}
</${_S}>`
</script>

## AI Streaming Chat Demo

> 💡 **Note**: `useAIStream` requires a real AI API (e.g. OpenAI, Claude). The demo below simulates streaming output including the thinking phase and typewriter content. In real usage, replace the URL in `start()` with your AI endpoint.

<DemoBlock title="AI Streaming Chat Demo (Thinking Chain + Typewriter)" :ts-code="tsAIStreamDemo" :js-code="toJs(tsAIStreamDemo)">
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
      <div v-if="chatMessages.length === 0" style="flex:1; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-placeholder); font-size:13px">
        Send a message to the AI assistant...
      </div>
      <template v-for="(msg, i) in chatMessages" :key="i">
        <div v-if="msg.role === 'user'" style="display:flex; justify-content:flex-end">
          <div style="max-width:80%; padding:10px 14px; border-radius:12px 12px 4px 12px; font-size:14px; line-height:1.7; white-space:pre-wrap; background:var(--yh-color-primary); color:#fff">
            {{ msg.content }}
          </div>
        </div>
        <div v-else style="display:flex; flex-direction:column; gap:8px; align-items:flex-start">
          <yh-ai-thought-chain
            v-if="msg.thinking"
            :thinking="!!msg.isStreaming && !!msg.thinking && !msg.content"
            title="Thinking deeply..."
            style="width:100%; max-width:85%"
          >
            <div style="font-size:12px; white-space:pre-wrap; color:var(--yh-text-color-secondary)">{{ msg.thinking }}</div>
          </yh-ai-thought-chain>
          <div v-if="msg.content || msg.isStreaming"
            style="max-width:85%; padding:10px 14px; border-radius:12px 12px 12px 4px; font-size:14px; line-height:1.7; white-space:pre-wrap; background:var(--vp-c-bg-soft); border:1px solid var(--yh-border-color)">
            <span>{{ msg.content }}</span>
            <span v-if="msg.isStreaming && msg.content" class="demo-stream-cursor"></span>
          </div>
        </div>
      </template>
    </div>
    <div style="display:flex; gap:8px">
      <yh-input
        :model-value="chatInput"
        placeholder="Type a message, press Enter to send..."
        @update:model-value="(v) => { chatInput = String(v) }"
        @keydown.enter="handleEnter"
        :disabled="chatLoading"
        style="flex:1"
      />
      <yh-button type="primary" :loading="chatLoading" @click="sendMessage">Send</yh-button>
      <yh-button type="danger" :disabled="!chatLoading" @click="stopChat">Stop</yh-button>
      <yh-button @click="clearChat">Clear</yh-button>
    </div>
  </div>
</DemoBlock>

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
    messages: [{ role: 'user', content: 'Write a welcome message' }],
    stream: true
  }
})
```

## Return Values

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

// Use with thinking chain component in template:
// <yh-ai-thought-chain v-if="showThinking" :thinking="true" title="AI is thinking...">
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
      const result = await searchApi(call.arguments)
      console.log('Search result:', result)
    }
  }
})
```

## Relationship with useSSE

- `useSSE`: Responsible for **streaming transport protocol itself** (SSE / fetch streaming);
- `useAIStream`: Parses AI model return format on top of it, providing more friendly state fields.

When you only need to handle generic log/progress streaming, use `useSSE`; when integrating AI models (OpenAI, Claude, etc.), use `useAIStream`.

<style>
@keyframes doc-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.demo-stream-cursor {
  display: inline-block;
  width: 1.5px;
  height: 1.25em;
  background: currentColor;
  margin-left: 4px;
  vertical-align: -2px;
  animation: doc-cursor-blink 1s infinite;
}
</style>
