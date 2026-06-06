# LangChain 集成

YH-UI 提供深度定制的 LangChain 集成，简化在 Vue 3 中使用 LangChain 模型。

## 环境要求

```bash
pnpm add @langchain/core @langchain/openai
# 根据需要安装其他 provider
pnpm add @langchain/anthropic @langchain/google-genai
```

## useLangChainChat - LangChain 对话

使用 LangChain 的 `BaseChatModel` 进行多轮对话。

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainChat } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0.7,
  streaming: true
})

const { messages, input, isLoading, sendMessage, clearHistory } = useLangChainChat({
  model,
  systemMessage: '你是一个专业的技术顾问',
  maxHistory: 20,
  streaming: true,
  onChunk: (chunk) => {
    // 流式回调，可用于打字机效果
  },
  onFinish: (message) => {
    // 完成回调
  },
  onError: (error) => {
    // 错误处理
  }
})
```

## useLangChainStream - 流式生成

基于 LangChain 模型的独立流式输出。

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainStream } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({ model: 'gpt-4' })

const { content, isStreaming, start, stop } = useLangChainStream({
  model,
  systemMessage: '你是一个有帮助的助手'
})

// 开始流式生成
await start('请介绍一下 Vue 3 的新特性')

// 停止生成
stop()
```

### 返回值

| 属性            | 类型           | 说明             |
| --------------- | -------------- | ---------------- |
| `content`       | `Ref<string>`  | 当前累积的文本   |
| `isStreaming`   | `Ref<boolean>` | 是否正在流式生成 |
| `start(prompt)` | `Function`     | 开始流式生成     |
| `stop()`        | `Function`     | 停止流式生成     |

## langChainRuntime - 运行时工具

同步调用 LangChain 模型，返回 LangChain `AIMessage`。

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { langChainRuntime } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const response = await langChainRuntime.invoke(model, '你好', {
  temperature: 0.7
})

console.log(response.content) // 模型回复
console.log(response.tool_calls) // 工具调用（如有）
```

## createLangChainChain - 对话链

创建带系统提示与配置的对话链。

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { createLangChainChain } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const chain = createLangChainChain(model, {
  systemMessage: '你是一个专业的 AI 助手',
  temperature: 0.7,
  maxTokens: 1000
})

const result = await chain.invoke('你好')
console.log(result)
```

::: tip
`createLangChainChain` 返回的是 LangChain `Runnable` 实例，支持 `.pipe()` 链式调用。
:::
