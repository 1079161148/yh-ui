<script setup lang="ts">
import { ref } from 'vue'
import {
  tsQuickStart,
  jsQuickStart,
  tsGenerateText,
  jsGenerateText,
  tsStreamText,
  jsStreamText,
  tsUseChat,
  jsUseChat,
  tsLangChainChat,
  jsLangChainChat,
  tsLangChainStream,
  jsLangChainStream,
  tsRuntime,
  jsRuntime,
  tsChain,
  jsChain,
  tsFunctionTool,
  jsFunctionTool,
  tsStreamableValue,
  jsStreamableValue,
  tsUseConversation,
  jsUseConversation,
  tsAIContext,
  jsAIContext,
  tsWithUI,
  jsWithUI,
  tsMCPClient,
  jsMCPClient,
  tsMCPServer,
  jsMCPServer
} from './ai-sdk.demos'

// 预览区域的交互状态（不依赖真实大模型接口，只做演示）
const previewGenerateTextResult = ref('')
const previewGenerateLoading = ref(false)

const previewStreamTextResult = ref('')
const previewStreamLoading = ref(false)

type PreviewChatMessage = { id: number; role: 'user' | 'assistant'; content: string }
const previewChatInput = ref('')
const previewChatMessages = ref<PreviewChatMessage[]>([
  { id: 1, role: 'assistant', content: '你好！这是一个 useChat 的交互示例～' }
])
const previewChatLoading = ref(false)
let chatMsgId = 2

// LangChain & 工具相关的预览交互（同样为 mock）
const previewLcStreamContent = ref('')
const previewLcStreamLoading = ref(false)
let previewLcStreamCancelled = false

const previewRuntimeResult = ref('')
const previewRuntimeLoading = ref(false)

const previewChainResult = ref('')
const previewChainLoading = ref(false)

const previewToolResult = ref('')
const previewToolLoading = ref(false)

const previewStreamableValue = ref('')
const previewStreamableLoading = ref(false)

type PreviewConvMessage = { id: number; role: 'user' | 'assistant'; content: string }
const previewConvMessages = ref<PreviewConvMessage[]>([
  { id: 1, role: 'assistant', content: '这是 useConversation 的预览消息。' }
])
let previewConvId = 2

const previewContextSessionId = ref(`session_${Math.random().toString(16).slice(2, 8)}`)
const previewContextModel = ref('gpt-4')

const previewRunGenerateText = async () => {
  if (previewGenerateLoading.value) return
  previewGenerateLoading.value = true
  previewGenerateTextResult.value = ''

  const text = '（示例返回）这是 generateText 生成的一段文本内容，用于展示交互效果。'
  // 简单模拟异步调用
  await new Promise((resolve) => setTimeout(resolve, 600))
  previewGenerateTextResult.value = text
  previewGenerateLoading.value = false
}

const previewRunStreamText = async () => {
  if (previewStreamLoading.value) return
  previewStreamLoading.value = true
  previewStreamTextResult.value = ''

  const full = '（示例流式输出）这是 streamText 的流式文本演示，字符会依次出现。'
  for (let i = 0; i < full.length; i++) {
    // 轻量级“流式”效果
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 30))
    previewStreamTextResult.value += full[i]
  }

  previewStreamLoading.value = false
}

const previewHandleChatSend = async () => {
  const value = previewChatInput.value.trim()
  if (!value || previewChatLoading.value) return

  previewChatLoading.value = true
  const id = chatMsgId++
  previewChatMessages.value.push({ id, role: 'user', content: value })
  previewChatInput.value = ''

  // 模拟助手回复
  await new Promise((resolve) => setTimeout(resolve, 400))
  previewChatMessages.value.push({
    id: chatMsgId++,
    role: 'assistant',
    content: '这是一条示例回复，实际集成请参考下方 TypeScript 代码。'
  })
  previewChatLoading.value = false
}

const previewRunLcStream = async () => {
  if (previewLcStreamLoading.value) return
  previewLcStreamLoading.value = true
  previewLcStreamContent.value = ''
  previewLcStreamCancelled = false

  const full = '（示例 LangChain 流式输出）这里模拟 useLangChainStream 的字符流式返回。'
  for (let i = 0; i < full.length; i++) {
    if (previewLcStreamCancelled) break
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 30))
    previewLcStreamContent.value += full[i]
  }

  previewLcStreamLoading.value = false
}

const previewStopLcStream = () => {
  previewLcStreamCancelled = true
  previewLcStreamLoading.value = false
}

const previewRunRuntime = async () => {
  if (previewRuntimeLoading.value) return
  previewRuntimeLoading.value = true
  previewRuntimeResult.value = ''

  await new Promise((resolve) => setTimeout(resolve, 500))
  previewRuntimeResult.value = '（示例返回）Runtime 已执行：invoke(model, "你好") → "你好！很高兴见到你。"'
  previewRuntimeLoading.value = false
}

const previewRunChain = async () => {
  if (previewChainLoading.value) return
  previewChainLoading.value = true
  previewChainResult.value = ''

  await new Promise((resolve) => setTimeout(resolve, 500))
  previewChainResult.value = '（示例返回）Chain 已执行：chain.invoke("你好") → "你好！我可以帮你做些什么？"'
  previewChainLoading.value = false
}

const previewRunToolConversation = async () => {
  if (previewToolLoading.value) return
  previewToolLoading.value = true
  previewToolResult.value = ''

  await new Promise((resolve) => setTimeout(resolve, 450))
  previewToolResult.value = JSON.stringify(
    {
      text: '（示例返回）模型触发了工具调用 get_weather({ city: "北京" })',
      toolResult: { city: '北京', weather: '晴', temperature: 25 }
    },
    null,
    2
  )
  previewToolLoading.value = false
}

const previewUpdateStreamable = async () => {
  if (previewStreamableLoading.value) return
  previewStreamableLoading.value = true
  previewStreamableValue.value = 'Hello '
  await new Promise((resolve) => setTimeout(resolve, 500))
  previewStreamableValue.value += 'World'
  previewStreamableLoading.value = false
}

const previewAddConvMessage = () => {
  const nextRole: PreviewConvMessage['role'] =
    previewConvMessages.value[previewConvMessages.value.length - 1]?.role === 'user' ? 'assistant' : 'user'
  previewConvMessages.value.push({
    id: previewConvId++,
    role: nextRole,
    content: nextRole === 'user' ? '你好' : '有什么可以帮助你？'
  })
}

const previewClearConv = () => {
  previewConvMessages.value = []
}

const previewUpdateModelConfig = () => {
  previewContextModel.value = previewContextModel.value === 'gpt-4' ? 'gpt-4o' : 'gpt-4'
}
</script>

# AI SDK 官方集成

`@yh-ui/ai-sdk` 是 YH-UI 官方提供的 AI 能力集成包，无缝对接 **Vercel AI SDK** 和 **LangChain**，开箱即用。

## 特性

- 🌐 **多厂商支持** - OpenAI / Anthropic / Google / DeepSeek / 通义 / 文心一言等
- 🔄 **流式输出** - 完整的流式文本/对象生成支持
- 🛠️ **函数调用** - 轻松定义和执行工具函数
- 🔗 **LangChain 集成** - 深度整合 LangChain.js 生态
- 🖥️ **Vue 3 原生** - 完整的 Composition API 支持
- 💾 **对话管理** - 内置历史记录持久化

## 安装

```bash
# 核心包
pnpm add @yh-ui/ai-sdk ai @langchain/core

# 根据使用的模型提供商，选择性安装对应的 provider 包
pnpm add @ai-sdk/openai    # OpenAI (GPT-4o, GPT-4, etc.)
# 或
pnpm add @ai-sdk/anthropic  # Anthropic (Claude)
# 或
pnpm add @ai-sdk/google    # Google Gemini
# 或
pnpm add @ai-sdk/deepseek  # DeepSeek
# 或
pnpm add @ai-sdk/ollama    # Ollama (本地模型)
```

::: tip
`ai` 包本身不包含模型提供商，你需要安装对应的 `@ai-sdk/*` 包来使用不同的模型。
:::

::: warning 代码示例说明
本文档中的代码示例（特别是涉及 `createOpenAI` 等 provider 的代码）是**完整可运行的示例**，你需要：

1. 安装对应的 `@ai-sdk/*` provider 包
2. 配置有效的 API Key（通过环境变量或直接传入）

**预览区域的交互按钮**是 mock 数据，仅做 UI 交互演示，不调用真实 API。
:::

---

## 快速开始

<DemoBlock title="快速开始" :ts-code="tsQuickStart" :js-code="jsQuickStart">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>查看下方代码示例了解如何使用 @yh-ui/ai-sdk（本页预览区域的按钮仅做交互演示，真实接入请以示例代码为准并正确配置 API Key / 后端接口）。</p>
  </div>
</DemoBlock>

---

## Vercel AI SDK

YH-UI 完全兼容 Vercel AI SDK，可直接使用其所有功能。

### generateText - 非流式文本生成

<DemoBlock title="generateText" :ts-code="tsGenerateText" :js-code="jsGenerateText">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunGenerateText" :loading="previewGenerateLoading">
      运行 generateText
    </yh-button>
    <pre
      v-if="previewGenerateTextResult"
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;"
    >
{{ previewGenerateTextResult }}
    </pre>
  </div>
</DemoBlock>

### streamText - 流式文本生成

<DemoBlock title="streamText" :ts-code="tsStreamText" :js-code="jsStreamText">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunStreamText" :loading="previewStreamLoading">
      运行 streamText
    </yh-button>
    <div
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px; min-height: 60px;"
    >
      {{ previewStreamTextResult }}
    </div>
  </div>
</DemoBlock>

### useChat - 对话组件 Hook

<DemoBlock title="useChat" :ts-code="tsUseChat" :js-code="jsUseChat">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-input
        v-model="previewChatInput"
        placeholder="输入消息..."
        @pressEnter="previewHandleChatSend"
        style="width: 300px; margin-right: 8px;"
      />
      <yh-button type="primary" @click="previewHandleChatSend" :loading="previewChatLoading">
        发送
      </yh-button>
    </div>
    <div v-for="msg in previewChatMessages" :key="msg.id" style="margin-bottom: 8px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</DemoBlock>

### 支持的模型提供商

| 提供商    | 创建函数                   | 支持流式 |
| --------- | -------------------------- | -------- |
| OpenAI    | `createOpenAI`             | ✅       |
| Anthropic | `createAnthropic`          | ✅       |
| Google    | `createGoogleGenerativeAI` | ✅       |
| DeepSeek  | `createDeepSeek`           | ✅       |
| 通义千问  | `createQwen`               | ✅       |
| 文心一言  | `createBaidu`              | ✅       |
| Ollama    | `createOllama`             | ✅       |
| LM Studio | `createLMStudio`           | ✅       |

---

## LangChain 集成

YH-UI 提供深度定制的 LangChain 集成，简化在 Vue 3 中的使用。

### useLangChainChat - LangChain 对话

<DemoBlock title="useLangChainChat" :ts-code="tsLangChainChat" :js-code="jsLangChainChat">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>使用 LangChain 进行对话（需要配置 API Key）</p>
  </div>
</DemoBlock>

### useLangChainStream - 流式生成

<DemoBlock title="useLangChainStream" :ts-code="tsLangChainStream" :js-code="jsLangChainStream">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunLcStream" :loading="previewLcStreamLoading">
      运行流式生成
    </yh-button>
    <div
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px; min-height: 60px;"
    >
      {{ previewLcStreamContent }}
    </div>
    <yh-button size="small" @click="previewStopLcStream" style="margin-top: 8px;">停止</yh-button>
  </div>
</DemoBlock>

### langChainRuntime - 运行时工具

<DemoBlock title="langChainRuntime" :ts-code="tsRuntime" :js-code="jsRuntime">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunRuntime" :loading="previewRuntimeLoading">运行 Runtime</yh-button>
    <pre
      v-if="previewRuntimeResult"
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;"
    >
{{ previewRuntimeResult }}
    </pre>
  </div>
</DemoBlock>

### createLangChainChain - 对话链

<DemoBlock title="createLangChainChain" :ts-code="tsChain" :js-code="jsChain">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunChain" :loading="previewChainLoading">运行 Chain</yh-button>
    <pre
      v-if="previewChainResult"
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;"
    >
{{ previewChainResult }}
    </pre>
  </div>
</DemoBlock>

---

## 工具函数调用

### createYHFunctionTool - 创建工具

<DemoBlock title="createYHFunctionTool" :ts-code="tsFunctionTool" :js-code="jsFunctionTool">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewRunToolConversation" :loading="previewToolLoading">
      运行带工具的对话
    </yh-button>
    <pre
      v-if="previewToolResult"
      style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;"
    ><code>{{ previewToolResult }}</code></pre>
  </div>
</DemoBlock>

在实际接入中，模型返回的工具调用结果通常是 JSON 对象，可以像下面这样进行展示和处理：

```json
{
  "text": "（示例返回）模型触发了工具调用 get_weather({ \"city\": \"北京\" })",
  "toolResult": {
    "city": "北京",
    "weather": "晴",
    "temperature": 25
  }
}
```

---

## Vue 3 Composables

### createStreamableValue - 流式值

<DemoBlock title="createStreamableValue" :ts-code="tsStreamableValue" :js-code="jsStreamableValue">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="previewUpdateStreamable" :loading="previewStreamableLoading">
      更新流式值
    </yh-button>
    <div style="margin-top: 12px;">
      <div><strong>值:</strong> {{ previewStreamableValue }}</div>
      <div><strong>加载中:</strong> {{ previewStreamableLoading }}</div>
    </div>
  </div>
</DemoBlock>

### useConversation - 对话历史

<DemoBlock title="useConversation" :ts-code="tsUseConversation" :js-code="jsUseConversation">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-button @click="previewAddConvMessage" style="margin-right: 8px;">添加消息</yh-button>
      <yh-button type="danger" @click="previewClearConv">清空</yh-button>
    </div>
    <div v-for="msg in previewConvMessages" :key="msg.id" style="margin-bottom: 4px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</DemoBlock>

### createAIContext - AI 上下文

<DemoBlock title="createAIContext" :ts-code="tsAIContext" :js-code="jsAIContext">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button @click="previewUpdateModelConfig">更新模型配置</yh-button>
    <div style="margin-top: 12px;">
      <div><strong>会话ID:</strong> {{ previewContextSessionId }}</div>
      <div><strong>当前模型:</strong> {{ previewContextModel }}</div>
    </div>
  </div>
</DemoBlock>

---

## 与 YH-UI 组件配合

`@yh-ui/ai-sdk` 可与 YH-UI 的 AI 组件完美配合。

<DemoBlock title="与 AiBubble 配合" :ts-code="tsWithUI" :js-code="jsWithUI">
  <div style="padding: 16px; background: var(--yh-bg-color-page); max-width: 600px;">
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px;">
      <yh-ai-bubble
        v-for="msg in previewChatMessages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
      />
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-input
        v-model="previewChatInput"
        placeholder="输入消息..."
        @pressEnter="previewHandleChatSend"
      />
      <yh-button type="primary" @click="previewHandleChatSend" :loading="previewChatLoading">
        发送
      </yh-button>
    </div>
  </div>
</DemoBlock>

---

## API 参考

### useAIChat

```ts
interface UseAIChatOptions {
  api: string
  initialMessages?: ConversationMessage[]
  headers?: Record<string, string>
  body?: Record<string, unknown>
  onRequest?: (message: string) => void
  onResponse?: (response: Response) => void
  onFinish?: (message: ConversationMessage) => void
  onError?: (error: Error) => void
}

interface UseAIChatReturn {
  messages: Ref<ConversationMessage[]>
  input: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  sendMessage: (content: string) => Promise<void>
  append: (content: string, role?: 'user' | 'assistant') => void
  reload: () => void
}
```

### useLangChainChat

```ts
interface UseLangChainChatOptions {
  model: BaseChatModel
  initialMessages?: LangChainMessage[]
  systemMessage?: string
  maxHistory?: number
  temperature?: number
  streaming?: boolean
  onChunk?: (chunk: string) => void
  onFinish?: (message: LangChainMessage) => void
  onError?: (error: Error) => void
}

interface UseLangChainChatReturn {
  messages: Ref<LangChainMessage[]>
  input: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  sendMessage: (content: string) => Promise<void>
  clearHistory: () => void
  reload: () => void
}
```

---

## 类型定义

### ConversationMessage

| 属性      | 类型                                | 说明     |
| --------- | ----------------------------------- | -------- |
| id        | `string`                            | 消息 ID  |
| role      | `'user' \| 'assistant' \| 'system'` | 角色     |
| content   | `string`                            | 内容     |
| createdAt | `Date`                              | 创建时间 |
| metadata  | `Record<string, unknown>`           | 额外数据 |

### LangChainMessage

| 属性             | 类型                                          | 说明        |
| ---------------- | --------------------------------------------- | ----------- |
| id               | `string`                                      | 消息 ID     |
| role             | `'user' \| 'assistant' \| 'system' \| 'tool'` | 角色        |
| content          | `string`                                      | 内容        |
| name             | `string`                                      | 工具名称    |
| toolCallId       | `string`                                      | 工具调用 ID |
| createdAt        | `Date`                                        | 创建时间    |
| additionalKwargs | `Record<string, unknown>`                     | 额外参数    |

---

## MCP 协议支持

`@yh-ui/ai-sdk` 提供完整的 MCP (Model Context Protocol) 支持，包括 MCP Client 和 MCP Server 两部分。

### MCP Client - 连接外部 MCP Server

使用 `useMCPClient` 连接外部 MCP Server 并调用其工具。

<DemoBlock title="MCP Client 示例" :ts-code="tsMCPClient" :js-code="jsMCPClient">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>点击上方代码示例查看如何使用 useMCPClient 连接 MCP Server。</p>
    <p style="font-size: 12px; color: var(--yh-text-color-secondary); margin-top: 12px;">
      注意：此示例需要配置有效的 MCP Server URL 才能正常演示连接功能。
    </p>
  </div>
</DemoBlock>

```typescript
import { useMCPClient } from '@yh-ui/ai-sdk'

// HTTP 方式连接
const { state, connect, callTool } = useMCPClient({
  config: {
    serverUrl: 'http://localhost:3000/mcp',
    timeout: 30000
  },
  autoConnect: true
})

// Stdio 方式连接（本地 MCP Server）
const { state, connect, callTool } = useMCPClient({
  config: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', './data']
  },
  autoConnect: true
})

// 调用工具
const result = await callTool('read_file', { path: '/example.txt' })
```

#### useMCPClient API

```typescript
interface UseMCPClientOptions {
  config: MCPConnectionConfig
  autoConnect?: boolean
  clientName?: string
  clientVersion?: string
  onToolsUpdate?: (tools: MCPTool[]) => void
  onConnectionChange?: (isConnected: boolean) => void
}

interface MCPConnectionConfig {
  serverUrl?: string
  command?: string
  args?: string[]
  env?: Record<string, string>
  timeout?: number
}

interface UseMCPClientReturn {
  state: MCPClientState
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  callTool: <T = unknown>(name: string, args?: Record<string, unknown>) => Promise<T>
  isCallingTool: Ref<boolean>
}
```

### MCP Server - 暴露工具为 MCP Server

使用 `useMCPServer` 将你的 AI 应用作为 MCP Server 暴露工具。

<DemoBlock title="MCP Server 示例" :ts-code="tsMCPServer" :js-code="jsMCPServer">
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>点击上方代码示例查看如何使用 useMCPServer 创建 MCP Server。</p>
    <p style="font-size: 12px; color: var(--yh-text-color-secondary); margin-top: 12px;">
      提示：在实际项目中，可以配合 createMCPServerHTTPHandler 快速创建 HTTP 端点。
    </p>
  </div>
</DemoBlock>

```typescript
import { useMCPServer } from '@yh-ui/ai-sdk'

const { server, addTool, tools, start, stop } = useMCPServer({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [
    {
      name: 'get_weather',
      description: '获取指定城市的天气',
      inputSchema: {
        type: 'object',
        properties: {
          city: { type: 'string', description: '城市名称' }
        },
        required: ['city']
      },
      execute: async ({ city }) => {
        // 实际调用天气 API
        return [{ type: 'text', text: `${city} 今日天气：晴，25°C` }]
      }
    }
  ]
})
```

#### 创建 HTTP Handler

在 Next.js 或 Express 中快速创建 MCP HTTP 端点：

```typescript
// app/api/mcp/route.ts (Next.js App Router)
import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk'

export const GET = createMCPServerHTTPHandler({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [
    {
      name: 'search',
      description: '搜索信息',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } } },
      execute: async ({ query }) => [{ type: 'text', text: `Results for: ${query}` }]
    }
  ]
})

export const POST = GET
```

### 多 Server 管理

使用 `useMCPTools` 管理多个 MCP Server：

```typescript
import { useMCPTools } from '@yh-ui/ai-sdk'

const { allTools, serverStates, callTool } = useMCPTools({
  servers: [
    { serverUrl: 'http://localhost:3001/mcp' },
    { command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem', './data'] }
  ],
  autoConnect: true
})

// 调用工具，会自动路由到正确的 server
const result = await callTool('tool_name', { arg: 'value' })
```

::: warning 注意事项

1. **MCP Server 需要实现 JSON-RPC 协议**，遵循 2024-11-05 版本的 MCP 规范
2. **Stdio 模式仅适用于 Node.js 环境**，浏览器环境只能使用 HTTP 模式
3. **HTTP 模式下需要配置 CORS**，确保跨域请求被正确处理
4. **工具调用是异步的**，建议添加加载状态提示用户
   :::
