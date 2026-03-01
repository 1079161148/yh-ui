# useAiStream Streaming Request Engine 🌊

`useAiStream` is a low-level engine hook designed for AI streaming output, featuring:

- 🏭 **Multi-vendor Adapters** (OpenAI / DeepSeek / Wenxin / Tongyi)
- 🖋️ **Typewriter Throttling** (Based on `requestAnimationFrame`)
- 🛑 **AbortController Support**

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ─── Typewriter Demo (Local AsyncGenerator, no network) ──────────────────────
const isTyping = ref(false)
const typedContent = ref('')
let typerId: ReturnType<typeof setTimeout> | null = null
let shouldStop = false

async function* mockAIReply(question: string): AsyncGenerator<string> {
  const answers: Record<string, string[]> = {
    'What are the core advantages of Vue3 Composition API?': [
      'Vue 3\'s Composition API is a brand new way of organizing component logic.\n\n',
      'Compared to Options API, it has several key advantages:\n\n',
      '① **Natural Logic Reuse** —— Business logic can be reused across components through custom hooks (useXxx), ',
      'eliminating naming conflicts and unclear sources common with Mixins.\n\n',
      '② **Better TypeScript Support** —— All reactive APIs (ref / computed) ',
      'have precise type inference, moving away from the "this" type black box.\n\n',
      '③ **Function-based Code Organization** —— Related logic is kept together, making large components clearer to maintain, ',
      'avoiding the need to jump between data / methods / computed.'
    ],
    'Difference between requestAnimationFrame and setTimeout?': [
      'The core difference between requestAnimationFrame (rAF) and setTimeout lies in:\n\n',
      '**Execution Timing**\n',
      '- rAF is scheduled by the browser before each frame paint (typically 60fps = 16.6ms/frame), ',
      'avoiding "useless calculations" in between frames.\n',
      '- setTimeout adds a task to the macro-task queue after a specified delay, influenced by the Event Loop, ',
      'so the actual trigger time is imprecise.\n\n',
      '**Performance**\n',
      '- rAF automatically pauses when the page is hidden/minimized, saving CPU/GPU resources.\n',
      '- setTimeout continues running in the background, leading to resource waste.\n\n',
      '**Use Cases**\n',
      '- Animations, typewriter effects → use rAF\n',
      '- Polling, delayed tasks → use setTimeout'
    ],
    'What is RAG (Retrieval-Augmented Generation)?': [
      'RAG (Retrieval-Augmented Generation) is an AI technical paradigm that combines ',
      '**information retrieval** with **Large Language Model generation**.\n\n',
      '**Core Flow**\n',
      '1. User question → Vectorize the question\n',
      '2. Retrieve most relevant document snippets from a knowledge base\n',
      '3. Splice retrieval results into the Prompt, letting LLM generate answers based on this context\n\n',
      '**Pain Points Solved**\n',
      '- "Timeliness" issues caused by LLM knowledge cut-off dates\n',
      '- "Hallucination" issues where private domain knowledge is missing from training sets\n',
      '- Cost-effective updates to new knowledge without retraining'
    ],
    'Explain the reactivity principle of Vue 3': [
      'Vue 3\'s reactivity system is built on ES6 **Proxy**, a fundamental improvement over Vue 2\'s Object.defineProperty.\n\n',
      '**Core Mechanism**\n',
      '- `reactive()` uses Proxy to intercept get/set/deleteProperty operations\n',
      '- `ref()` wraps primitive types in a `{ value }` object, also tracked via Proxy\n',
      '- `track()` collects dependencies (records current effect in getter)\n',
      '- `trigger()` triggers updates (notifies all dependent effects in setter)\n\n',
      '**Advantages over Vue 2**\n',
      '- Detects **addition and deletion** of properties (no more $set)\n',
      '- Native support for Map / Set / WeakMap etc.\n',
      '- Lazy proxying (only deep proxies when accessed), superior performance'
    ]
  }

  const defaultChunks = [
    `Regarding "${question}", here is a detailed answer:\n\n`,
    'The Vue 3 ecosystem continues to evolve, providing more powerful tools and dev experience.\n',
    'The combination of Composition API, Pinia, and Vite has become the de facto standard for modern Vue development, ',
    'greatly enhancing maintainability for large-scale applications.'
  ]

  const chunks = answers[question] ?? defaultChunks
  for (const chunk of chunks) {
    for (const char of chunk) {
      if (shouldStop) return
      await new Promise<void>(r => {
        typerId = setTimeout(r, Math.random() * 35 + 10)
      })
      yield char
    }
    await new Promise<void>(r => { typerId = setTimeout(r, 60) })
  }
}

const demoQuestions = [
  'What are the core advantages of Vue3 Composition API?',
  'Difference between requestAnimationFrame and setTimeout?',
  'What is RAG (Retrieval-Augmented Generation)?',
  'Explain the reactivity principle of Vue 3'
]
const selectedQuestion = ref(demoQuestions[0])
const tokensCount = ref(0)
const elapsedMs = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

async function startTyping() {
  if (isTyping.value) return
  isTyping.value = true
  shouldStop = false
  typedContent.value = ''
  tokensCount.value = 0
  elapsedMs.value = 0

  const startTime = Date.now()
  timerInterval = setInterval(() => {
    elapsedMs.value = Date.now() - startTime
  }, 100)

  try {
    const gen = mockAIReply(selectedQuestion.value)
    for await (const char of gen) {
      typedContent.value += char
      tokensCount.value++
    }
  } finally {
    if (timerInterval) clearInterval(timerInterval)
    elapsedMs.value = Date.now() - (Date.now() - elapsedMs.value)
    isTyping.value = false
  }
}

function stopTyping() {
  shouldStop = true
  if (typerId) clearTimeout(typerId)
  if (timerInterval) clearInterval(timerInterval)
  isTyping.value = false
}

const speed = computed(() =>
  elapsedMs.value > 100
    ? (tokensCount.value / (elapsedMs.value / 1000)).toFixed(1)
    : '—'
)

// ─── Code Strings (for DemoBlock) ───────────────────────────────────────────
const tsTypewriter = `\<${_T}>
  <div style="max-width: 640px; display: flex; flex-direction: column; gap: 12px;">
    <!-- Question Selection -->
    <yh-select v-model="selectedQuestion" placeholder="Select a question" style="width: 100%;">
      <yh-option v-for="q in demoQuestions" :key="q" :label="q" :value="q" />
    </yh-select>
    <!-- Output Area -->
    <div style="min-height: 120px; padding: 16px; background: var(--yh-fill-color-light);
                border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      <span v-if="!typedContent && !isTyping" style="color: var(--yh-text-color-secondary);">
        Select a question and click "Generate Answer" to experience typewriter effect ✨
      </span>
      <span>{{ typedContent }}</span>
      <span v-if="isTyping" class="yh-cursor-blink">|</span>
    </div>
    <!-- Controls -->
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <yh-button type="primary" :loading="isTyping" :disabled="isTyping" @click="startTyping">
        🚀 Generate Answer
      </yh-button>
      <yh-button type="danger" :disabled="!isTyping" @click="stopTyping">⏹ Stop</yh-button>
      <yh-button :disabled="isTyping" @click="typedContent = ''; tokensCount = 0; elapsedMs = 0">
        🗑 Clear
      </yh-button>
      <span v-if="tokensCount > 0" style="font-size: 12px; color: var(--yh-text-color-secondary); margin-left: auto;">
        {{ tokensCount }} chars · {{ elapsedMs }}ms · {{ speed }} chars/s
      </span>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useAiStream } from '@yh-ui/hooks'

const demoQuestions = [
  'What are the core advantages of Vue3 Composition API?',
  'Difference between requestAnimationFrame and setTimeout?',
  'What is RAG (Retrieval-Augmented Generation)?',
  'Explain the reactivity principle of Vue 3'
]
const selectedQuestion = ref(demoQuestions[0])
const tokensCount = ref(0)
const elapsedMs = ref(0)

// Simulate AI reply (AsyncGenerator with natural rhythm)
async function* mockAIReply(question: string): AsyncGenerator<string> {
  const reply = \`Response for "\${question}":\\n\\nVue 3 ecosystem continues to evolve. Composition API + Pinia + Vite has become the modern standard.\`
  for (const char of reply) {
    await new Promise<void>(r => setTimeout(r, Math.random() * 35 + 10))
    yield char
  }
}

const { isStreaming: isTyping, currentContent: typedContent, fetchStream, stop: stopTyping } = useAiStream({
  request: (q: string) => mockAIReply(q),
  charsPerFrame: 1
})

const speed = computed(() =>
  elapsedMs.value > 100
    ? (tokensCount.value / (elapsedMs.value / 1000)).toFixed(1)
    : '—'
)

async function startTyping() {
  typedContent.value = ''
  tokensCount.value = 0
  elapsedMs.value = 0
  const startTime = Date.now()
  const timer = setInterval(() => {
    elapsedMs.value = Date.now() - startTime
    tokensCount.value = typedContent.value.length
  }, 100)
  await fetchStream(selectedQuestion.value)
  clearInterval(timer)
  tokensCount.value = typedContent.value.length
  elapsedMs.value = Date.now() - startTime
}
\</${_S}>`

const tsSseStream = `\<${_T}>
  <div style="max-width: 580px; display: flex; flex-direction: column; gap: 12px;">
    <div style="min-height: 100px; padding: 16px; background: var(--yh-fill-color-light);
                border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      {{ currentContent || '👈 Click "Send" to call OpenAI compatible API via useAiStream' }}
      <span v-if="isStreaming" class="yh-cursor-blink">|</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary" :loading="isStreaming" :disabled="isStreaming" @click="send">
        🚀 Send
      </yh-button>
      <yh-button type="danger" :disabled="!isStreaming" @click="stop">⏹ Stop</yh-button>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { useAiStream } from '@yh-ui/hooks'

const { isStreaming, currentContent, fetchStream, stop } = useAiStream({
  // Replace with your API Key and Endpoint
  request: async (query: string, signal: AbortSignal) =>
    fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        stream: true,
        max_tokens: 300,
        messages: [{ role: 'user', content: query }]
      })
    }),
  onFinish: (content) => console.log('Finished, total', content.length, 'chars')
})

const send = () => fetchStream('Describe core advantages of Vue 3 Composition API in one paragraph')
\</${_S}>`
</script>

## 🖊️ Typewriter Effect Demo (Local AsyncGenerator)

Simulate real AI output rhythm using `AsyncGenerator`, allowing typewriter experience without networking or API keys.

<DemoBlock :ts-code="tsTypewriter" :js-code="toJs(tsTypewriter)">
  <div style="max-width: 640px; display: flex; flex-direction: column; gap: 12px;">
    <yh-select v-model="selectedQuestion" placeholder="Select a question" style="width: 100%;">
      <yh-option v-for="q in demoQuestions" :key="q" :label="q" :value="q" />
    </yh-select>
    <div style="min-height: 120px; padding: 16px; background: var(--yh-fill-color-light); border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      <span v-if="!typedContent && !isTyping" style="color: var(--yh-text-color-secondary);">
        Select a question and click "Generate Answer" to experience typewriter effect ✨
      </span>
      <span>{{ typedContent }}</span>
      <span v-if="isTyping" style="display: inline-block; width: 2px; height: 1em; background: var(--yh-color-primary); margin-left: 1px; vertical-align: text-bottom; animation: yh-cursor-blink 0.8s step-end infinite;"></span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <yh-button type="primary" :loading="isTyping" :disabled="isTyping" @click="startTyping">
        🚀 Generate Answer
      </yh-button>
      <yh-button type="danger" :disabled="!isTyping" @click="stopTyping">⏹ Stop</yh-button>
      <yh-button :disabled="isTyping" @click="typedContent = ''; tokensCount = 0; elapsedMs = 0">🗑 Clear</yh-button>
      <span v-if="tokensCount > 0" style="font-size: 12px; color: var(--yh-text-color-secondary); margin-left: auto;">
        {{ tokensCount }} chars · {{ elapsedMs }}ms · {{ speed }} chars/s
      </span>
    </div>
  </div>
</DemoBlock>

<style>
@keyframes yh-cursor-blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
}
</style>

## 🌐 Connecting Real SSE APIs

Replace the `request` adapter with a real API call. Pass your key to enable production-grade streaming conversation.

<DemoBlock :ts-code="tsSseStream" :js-code="toJs(tsSseStream)">
  <div style="max-width: 580px; background: var(--yh-fill-color-light); border-radius: 8px; padding: 20px;">
    <p style="margin: 0 0 12px; font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.7;">
      📋 Replace <code style="background: var(--yh-fill-color); padding: 2px 6px; border-radius: 4px;">YOUR_API_KEY</code> with your SiliconFlow / OpenAI / DeepSeek compatible key to achieve real streaming output.
    </p>
    <p style="margin: 0; font-size: 13px; color: var(--yh-text-color-placeholder);">
      👉 Supports: OpenAI · DeepSeek · SiliconFlow · iFlytek · Moonshot · MiniMax and all OpenAI SSE formats.
    </p>
  </div>
</DemoBlock>

## API

### Options

| Param           | Type                                                              | Default           | Description                            |
| --------------- | ----------------------------------------------------------------- | ----------------- | -------------------------------------- |
| `request`       | `(query, signal, ...args) => AsyncGenerator \| Promise<Response>` | Required          | Request adapter, supports AbortSignal  |
| `parser`        | `StreamChunkParser`                                               | `plainTextParser` | Stream chunk parser (multi-vendor)     |
| `typewriter`    | `boolean`                                                         | `true`            | Enable typewriter effect               |
| `charsPerFrame` | `number`                                                          | `3`               | Chars output per frame (speed control) |
| `onUpdate`      | `(chunk, fullContent) => void`                                    | -                 | Incremental update callback            |
| `onFinish`      | `(content) => void`                                               | -                 | Final completion callback              |
| `onError`       | `(err) => void`                                                   | -                 | Error callback                         |

### Returns

| Field            | Type                                | Description                  |
| ---------------- | ----------------------------------- | ---------------------------- |
| `isStreaming`    | `Ref<boolean>`                      | If streaming is in progress  |
| `currentContent` | `Ref<string>`                       | Full content received so far |
| `fetchStream`    | `(query, ...args) => Promise<void>` | Trigger request              |
| `stop`           | `() => void`                        | Abort request                |

### Built-in Parsers

| Parser            | Vendor                                 | Description                       |
| ----------------- | -------------------------------------- | --------------------------------- |
| `openaiParser`    | OpenAI, DeepSeek, SiliconFlow, iFlytek | Compatible with OpenAI SSE format |
| `ernieParser`     | Baidu Wenxin                           | Compatible with Wenxin SSE format |
| `qwenParser`      | Alibaba Tongyi (Direct)                | Compatible with Tongyi SSE format |
| `plainTextParser` | Raw AsyncGenerator                     | Yield strings appended directly   |

## Connecting Other AI Platforms

```ts
import { useAiStream, openaiParser } from '@yh-ui/hooks'

// ── SiliconFlow ──
const { fetchStream } = useAiStream({
  parser: openaiParser,
  request: async (query, signal) =>
    fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        Authorization: 'Bearer YOUR_SF_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        stream: true,
        messages: [{ role: 'user', content: query }]
      })
    })
})

// ── DeepSeek ──
const { fetchStream: deepseekStream } = useAiStream({
  parser: openaiParser,
  request: async (query, signal) =>
    fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        Authorization: 'Bearer YOUR_DEEPSEEK_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        stream: true,
        messages: [{ role: 'user', content: query }]
      })
    })
})
```
