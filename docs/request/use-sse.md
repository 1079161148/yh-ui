# useSSE

`useSSE` 是基于原生 Server-Sent Events（SSE）/ 流式响应封装的 Hook，适合用于 **实时消息推送、日志流、AI 流式输出** 等场景。

## 基础用法

```typescript
import { useSSE } from '@yh-ui/request'

const {
  loading, // 是否正在连接/接收
  content, // 累积的文本内容
  messages, // 已解析的消息数组
  error, // 错误
  start, // 启动流式请求
  stop, // 停止
  reset // 重置状态
} = useSSE({
  onMessage: (msg) => {
    console.log('事件:', msg.event, '数据:', msg.data)
  },
  onDone: (full) => {
    console.log('完成:', full)
  },
  onError: (err) => {
    console.error('出错:', err)
  }
})

// 发起流式请求
start({
  url: '/api/chat/stream',
  method: 'POST',
  data: {
    message: '你好呀'
  }
})
```

## 返回值与消息结构

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

| 字段              | 类型                                 | 说明                         |
| ----------------- | ------------------------------------ | ---------------------------- | -------- |
| `loading`         | `Ref<boolean>`                       | 是否正在连接/接收            |
| `content`         | `Ref<string>`                        | 累积的文本内容（按顺序拼接） |
| `messages`        | `Ref<SSEMessage[]>`                  | 所有已解析的消息             |
| `error`           | `ShallowRef<Error \\                 | undefined>`                  | 错误对象 |
| `start(options?)` | `(options?: RequestOptions) => void` |
| `stop()`          | 停止流式请求                         |
| `reset()`         | 重置全部状态                         |

## 配置项

```typescript
interface UseSSEOptions extends RequestOptions {
  parseJSON?: boolean // 自动解析 JSON，默认 true
  decoder?: TextDecoder // 自定义解码器
  separator?: string // 消息分隔符，默认 '\\n\\n'
  eventPrefix?: string // 事件前缀，默认 'event:'
  onStart?: () => void
  onMessage?: (message: SSEMessage) => void
  onDone?: (fullContent: string) => void
  onError?: (error: Error) => void
  onCustomEvent?: (event: string, data: unknown) => void
}
```

### 自定义消息格式

```typescript
const { start } = useSSE({
  parseJSON: true,
  eventPrefix: 'event:',
  onMessage: (msg) => {
    switch (msg.event) {
      case 'start':
        console.log('开始')
        break
      case 'chunk':
        console.log('增量内容:', msg.data)
        break
      case 'done':
        console.log('完成')
        break
      case 'custom':
        console.log('自定义事件:', msg.raw)
        break
    }
  }
})
```

## 打字机效果示例

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
    console.log('完整内容:', display.value)
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

## 错误与重试

```typescript
const { error, start, stop } = useSSE({
  onError: (err) => {
    YhMessage.error(`流式连接失败：${err.message}`)
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

## 与 useAIStream 的关系

- `useSSE`：通用流式 Hook，不关心具体数据结构
- `useAIStream`：在 `useSSE` 之上增加了 **AI 文本解析、思考链、工具调用** 等高级能力，更适合 AI 应用

更多 AI 场景请参考：

- [useAIStream](./use-ai-stream)
