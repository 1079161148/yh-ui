# useSSE

`useSSE` 是基于原生 Server-Sent Events（SSE）/ 流式响应封装的 Hook，适合用于 **实时消息推送、日志流、AI 流式输出** 等场景。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ====== 打字机效果演示（模拟 SSE 行为，无需真实服务器） ======
const streamContent = ref('')
const streamLoading = ref(false)
const streamDone = ref(false)
const messageList = ref<{ event: string; data: string }[]>([])
let stopFlag = false

const simulatedChunks = [
  '你好！',
  '我是 YH-UI 文档',
  '的助手。\n\n',
  '**useSSE** 钩子支持：\n',
  '- 实时消息推送\n',
  '- AI 流式输出\n',
  '- 日志流展示\n\n',
  '它封装了原生 fetch 的',
  ' ReadableStream',
  ' 接口，让你无需关心',
  '底层协议细节。',
  '\n\n✅ 流式传输完成！'
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
    <!-- 控制栏 -->
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" :loading="loading" :disabled="loading" @click="sendRequest">
        发起流式请求
      </yh-button>
      <yh-button type="danger" :disabled="!loading" @click="stop">停止</yh-button>
      <yh-button @click="reset">重置</yh-button>
      <yh-tag :type="loading ? 'primary' : done ? 'success' : 'info'">
        {{ loading ? '接收中...' : done ? '完成 ✓' : '就绪' }}
      </yh-tag>
    </div>

    <!-- 流式输出显示 -->
    <div style="padding:16px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page); min-height:80px; font-size:14px; white-space:pre-wrap; line-height:1.7">
      <span v-if="!content && !loading" style="color:var(--yh-text-color-placeholder)">
        点击"发起流式请求"查看打字机效果...
      </span>
      <span>{{ content }}</span>
      <span v-if="loading" style="display:inline-block; width:2px; height:1em; background:currentColor; margin-left:2px; animation:blink 1s step-end infinite" />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useSSE } from '@yh-ui/request'

const done = ref(false)

const { loading, content, messages, start, stop, reset: resetSSE } = useSSE({
  onMessage: (msg) => {
    // msg.event: 'chunk' | 'message' | 'done' | ...
    // msg.data: 本次接收到的数据
    console.log('[SSE]', msg.event, msg.data)
  },
  onDone: (full) => {
    done.value = true
    console.log('全部内容:', full)
  },
  onError: (err) => {
    console.error('SSE 错误:', err)
  }
})

const sendRequest = () => {
  done.value = false
  resetSSE()
  start({
    url: '/api/chat/stream',
    method: 'POST',
    data: { message: '你好' }
  })
}

const reset = () => {
  done.value = false
  stop()
  resetSSE()
}
</${_S}>`
</script>

## 打字机效果演示

> 💡 **注意**：`useSSE` 需要真实的服务器端流式接口。以下演示通过模拟 SSE chunk 到达的方式展示打字机效果，实际使用时替换 `start()` 中的 URL 即可。

<DemoBlock title="SSE 流式接收 & 打字机效果演示" :ts-code="tsSSEDemo" :js-code="toJs(tsSSEDemo)">
  <div style="display:flex; flex-direction:column; gap:16px">
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <yh-button type="primary" :loading="streamLoading" :disabled="streamLoading" @click="startStream">
        发起流式请求
      </yh-button>
      <yh-button type="danger" :disabled="!streamLoading" @click="stopStream">停止</yh-button>
      <yh-button @click="resetStream">重置</yh-button>
      <yh-tag :type="streamLoading ? 'primary' : streamDone ? 'success' : 'info'">
        {{ streamLoading ? '接收中...' : streamDone ? '完成 ✓' : '就绪' }}
      </yh-tag>
    </div>
    <div style="padding:16px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page); min-height:80px; font-size:14px; white-space:pre-wrap; line-height:1.7">
      <span v-if="!streamContent && !streamLoading" style="color:var(--yh-text-color-placeholder)">
        点击"发起流式请求"查看打字机效果...
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
| ----------------- | ------------------------------------ | ---------------------------- |
| `loading`         | `Ref<boolean>`                       | 是否正在连接/接收            |
| `content`         | `Ref<string>`                        | 累积的文本内容（按顺序拼接） |
| `messages`        | `Ref<SSEMessage[]>`                  | 所有已解析的消息             |
| `error`           | `ShallowRef<Error \| undefined>`     | 错误对象                     |
| `start(options?)` | `(options?: RequestOptions) => void` | 启动流式请求，见下方说明     |
| `stop()`          | `() => void`                         | 停止流式请求                 |
| `reset()`         | `() => void`                         | 重置全部状态                 |

### start(options) 参数

调用 `start(options)` 时传入的 `options` 为请求配置（`RequestOptions`），常用字段如下，用于指定本次请求的 URL 与方式：

| 字段      | 类型                     | 说明                           |
| --------- | ------------------------ | ------------------------------ |
| `url`     | `string`                 | 请求地址（必填）               |
| `method`  | `string`                 | 请求方法，如 `'GET'`、`'POST'` |
| `data`    | `object`                 | 请求体（POST 等）              |
| `params`  | `object`                 | URL 查询参数                   |
| `headers` | `Record<string, string>` | 请求头                         |
| `baseURL` | `string`                 | 基础 URL                       |
| `timeout` | `number`                 | 超时时间（毫秒）               |

若不传 `options`，则使用创建 `useSSE` 时传入的默认配置（需在 options 中提前设置 `url` 等）。

## 配置项

```typescript
interface UseSSEOptions extends RequestOptions {
  parseJSON?: boolean // 自动解析 JSON，默认 true
  decoder?: TextDecoder // 自定义解码器
  separator?: string // 消息分隔符，默认 '\n\n'
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
