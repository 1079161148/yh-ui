# useAIStream

`useAIStream` 基于 `useSSE` 封装，面向 AI 应用场景，提供了 **打字机效果、思考链、工具调用** 等一整套流式能力。

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

## 选项

```typescript
interface UseAIStreamOptions extends UseSSEOptions {
  parseAIMessage?: boolean // 是否解析 AI JSON 结构，默认 true
  appendMode?: boolean // 文本是否采用追加模式，默认 true
  onText?: (text: string, delta: string) => void
  onToolCall?: (toolCalls?: AIStreamMessage['toolCalls']) => void
  onThinking?: (thinking: string) => void
}
```

## 打字机效果

```typescript
const display = ref('')

const { start, stop } = useAIStream({
  appendMode: true,
  onText: (full, delta) => {
    // 打字机效果：只追加本次增量
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

## 展示思考链（Thinking）

```typescript
const thinking = ref('')
const showThinking = ref(false)

const { start } = useAIStream({
  onThinking: (t) => {
    thinking.value = t
    showThinking.value = !!t
  }
})

// 模板中搭配思维链组件使用
// <yh-ai-thought-chain
//   v-if="showThinking"
//   :thinking="true"
//   title="AI 深度思考中..."
// >
//   <div>{{ thinking }}</div>
// </yh-ai-thought-chain>
```

## 工具调用（Tool Calling）

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
      // 执行搜索工具
      const result = await searchApi(call.arguments)
      console.log('搜索结果:', result)
    }
  }
})
```

## 完整聊天示例

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
      messages: messages.value.slice(0, -1), // 不包含占位消息
      stream: true
    }
  })
}
```

## 与 useSSE 的关系

- `useSSE`：负责 **流式传输协议本身**（SSE / fetch 流）；
- `useAIStream`：在其之上解析 AI 模型返回格式，并提供更友好的状态字段。

当你只需要处理通用日志/进度流时，使用 `useSSE` 即可；当你对接 AI 模型（OpenAI、Claude 等）时，推荐使用 `useAIStream`。
