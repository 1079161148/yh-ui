# useAIStream

`useAIStream` 基于 `useSSE` 封装，面向 AI 应用场景，提供了 **打字机效果、思考链、工具调用** 等一整套流式能力。

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ====== 模拟 AI 聊天演示（无需真实 AI 接口） ======
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

// 模拟 AI 回复内容库
const aiResponses: Record<string, { thinking: string; content: string }> = {
  default: {
    thinking: '正在分析用户的问题，理解其意图...\n思考如何给出最有帮助的回答...',
    content: '感谢你的提问！我是 YH-UI 的文档演示助手 🤖\n\nuseAIStream 钩子的主要特性：\n\n**打字机效果**：内容逐字流式显示\n**思考链展示**：展示 AI 推理过程\n**工具调用**：支持函数调用解析\n\n你可以继续提问！'
  }
}

const simulateThinking = async (target: ChatMessage, thinking: string) => {
  for (const char of thinking) {
    if (stopFlag) return
    await new Promise(r => setTimeout(r, 30))
    target.thinking = (target.thinking || '') + char
  }
}

const simulateContent = async (target: ChatMessage, content: string) => {
  for (const char of content) {
    if (stopFlag) return
    await new Promise(r => setTimeout(r, 40 + Math.random() * 30))
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

  const resp = aiResponses.default

  // 模拟思考阶段
  await simulateThinking(assistant, resp.thinking)
  if (stopFlag) { assistant.isStreaming = false; chatLoading.value = false; return }

  // 模拟内容流式输出
  await simulateContent(assistant, resp.content)

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
  if (!e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const tsAIStreamDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <!-- 消息列表 -->
    <div style="height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
      <div v-for="(msg, i) in messages" :key="i"
        :style="{ display:'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }">
        <!-- 思考链 -->
        <div v-if="msg.role === 'assistant' && msg.thinking" style="margin-bottom:8px">
          <yh-ai-thought-chain :thinking="true" title="AI 思考中...">
            <div style="font-size:12px; white-space:pre-wrap">{{ msg.thinking }}</div>
          </yh-ai-thought-chain>
        </div>
        <!-- 气泡 -->
        <div :style="{
          maxWidth:'80%', padding:'10px 14px', borderRadius:'12px', fontSize:'14px',
          lineHeight:'1.7', whiteSpace:'pre-wrap',
          background: msg.role === 'user' ? 'var(--yh-color-primary)' : 'var(--vp-c-bg-soft)',
          color: msg.role === 'user' ? '#fff' : 'var(--yh-text-color)'
        }">
          {{ msg.content }}
          <span v-if="msg.isStreaming" class="demo-stream-cursor"></span>
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div style="display:flex; gap:8px">
      <yh-input v-model="input" placeholder="输入消息，按 Enter 发送..." @keydown.enter.prevent="send" :disabled="loading" />
      <yh-button type="primary" :loading="loading" @click="send">发送</yh-button>
      <yh-button type="danger" :disabled="!loading" @click="stop">停止</yh-button>
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
    url: '/api/ai/chat',   // 替换为你的 AI 接口地址
    method: 'POST',
    data: { messages: [{ role: 'user', content: userInput }], stream: true }
  })
}
</${_S}>`
</script>

## AI 流式聊天演示

> 💡 **注意**：`useAIStream` 需要对接真实 AI API（如 OpenAI、Claude 等）。以下演示通过模拟流式输出展示效果，包含思考链阶段和打字机内容输出，实际使用时替换 `start()` 中的 URL 即可。

<DemoBlock title="AI 流式聊天演示（含思考链 & 打字机效果）" :ts-code="tsAIStreamDemo" :js-code="toJs(tsAIStreamDemo)">
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
      <div v-if="chatMessages.length === 0" style="flex:1; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-placeholder); font-size:13px">
        向 AI 助手发送消息...
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
            title="深度思考中..."
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
        placeholder="输入消息，按 Enter 发送..."
        @update:model-value="(v) => { chatInput = String(v) }"
        @keydown.enter="handleEnter"
        :disabled="chatLoading"
        style="flex:1"
      />
      <yh-button type="primary" :loading="chatLoading" @click="sendMessage">发送</yh-button>
      <yh-button type="danger" :disabled="!chatLoading" @click="stopChat">停止</yh-button>
      <yh-button @click="clearChat">清空</yh-button>
    </div>
  </div>
</DemoBlock>

## 基础用法

```typescript
import { useAIStream } from '@yh-ui/request'

const {
  loading,
  content, // 原始文本
  text, // 解析后的当前文本
  thinking, // 思考内容
  toolCalls, // 工具调用列表
  done,
  error,
  start,
  stop,
  reset
} = useAIStream({
  onText: (full, delta) => {
    console.log('新增内容:', delta)
  },
  onThinking: (t) => {
    console.log('思考中:', t)
  },
  onToolCall: (tools) => {
    console.log('工具调用:', tools)
  }
})

// 发起 AI 请求
start({
  url: '/api/ai/chat',
  method: 'POST',
  data: {
    model: 'gpt-4',
    messages: [{ role: 'user', content: '帮我写一段欢迎文案' }],
    stream: true
  }
})
```

## 返回值

```typescript
const result = useAIStream(options)
```

| 字段              | 类型                                | 说明                         |
| ----------------- | ----------------------------------- | ---------------------------- |
| `loading`         | `Ref<boolean>`                      | 是否正在接收                 |
| `content`         | `Ref<string>`                       | 原始流式文本                 |
| `text`            | `Ref<string>`                       | 解析后的纯文本（追加或覆盖） |
| `thinking`        | `Ref<string>`                       | 思考链内容                   |
| `toolCalls`       | `Ref<AIStreamMessage['toolCalls']>` | 工具调用列表                 |
| `done`            | `Ref<boolean>`                      | 是否完成                     |
| `messages`        | `Ref<SSEMessage[]>`                 | 底层 SSE 消息                |
| `error`           | `Ref<Error \| undefined>`           | 错误对象                     |
| `start(options?)` | —                                   | 启动 AI 流式请求             |
| `stop()`          | —                                   | 停止流式请求                 |
| `reset()`         | —                                   | 重置所有状态                 |

## 配置项

`useAIStream(options)` 的配置项继承自 `useSSE`，并增加了以下 AI 特有配置：

| 属性             | 类型                                                | 默认值 | 说明                              |
| ---------------- | --------------------------------------------------- | ------ | --------------------------------- |
| `parseAIMessage` | `boolean`                                           | `true` | 是否解析 AI 结构化消息（JSON 块） |
| `appendMode`     | `boolean`                                           | `true` | 追加模式：`true`追加，`false`覆盖 |
| `onText`         | `(text: string, delta: string) => void`             | —      | 收到新文本内容时的回调            |
| `onThinking`     | `(thinking: string) => void`                        | —      | 收到思考链内容时的回调            |
| `onToolCall`     | `(toolCalls: AIStreamMessage['toolCalls']) => void` | —      | 收到工具调用时的回调              |

## 与 useSSE 的关系

- `useSSE`：负责 **流式传输协议本身**（SSE / fetch 流）；
- `useAIStream`：在其之上解析 AI 模型返回格式，并提供更友好的状态字段。

当你只需要处理通用日志/进度流时，使用 `useSSE` 即可；当你对接 AI 模型（OpenAI、Claude 等）时，推荐使用 `useAIStream`。

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
