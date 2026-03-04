import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ============================================
// 1. 快速开始示例
// ============================================
const tsQuickStart = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>查看下方代码示例了解如何使用 @yh-ui/ai-sdk</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useChat, createStreamableValue } from '@yh-ui/ai-sdk'

// 创建流式值
const { value, loading, error } = createStreamableValue('')

// 对话 hook
const { messages, input, isLoading, sendMessage } = useChat({
  api: '/api/chat',
  onChunk: (chunk) => {
    value.value += chunk
  }
})

// 发送消息
const handleSend = async () => {
  await sendMessage('你好')
}
</${_S}>`
const jsQuickStart = toJs(tsQuickStart)

// ============================================
// 2. generateText 示例
// ============================================
const tsGenerateText = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runGenerateText">运行 generateText</yh-button>
    <pre v-if="generateTextResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ generateTextResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { generateText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const generateTextResult = ref('')

const runGenerateText = async () => {
  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  })

  const result = await generateText({
    model: openai('gpt-4'),
    prompt: '用一句话介绍 Vue 3'
  })

  generateTextResult.value = result.text
}
</${_S}>`
const jsGenerateText = toJs(tsGenerateText)

// ============================================
// 3. streamText 示例
// ============================================
const tsStreamText = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runStreamText" :loading="isStreaming">运行 streamText</yh-button>
    <div style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px; min-height: 60px;">
      {{ streamTextResult }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { streamText } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

const streamTextResult = ref('')
const isStreaming = ref(false)

const runStreamText = async () => {
  if (isStreaming.value) return

  const openai = createOpenAI()
  streamTextResult.value = ''
  isStreaming.value = true

  const result = streamText({
    model: openai('gpt-4'),
    prompt: '写一首关于春天的诗'
  })

  for await (const chunk of result.textStream) {
    streamTextResult.value += chunk
  }

  isStreaming.value = false
}
</${_S}>`
const jsStreamText = toJs(tsStreamText)

// ============================================
// 4. useChat 示例（Vue Composable）
// ============================================
const tsUseChat = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-input v-model="chatInput" placeholder="输入消息..." @pressEnter="handleChatSend" style="width: 300px;" />
      <yh-button type="primary" @click="handleChatSend" :loading="chatLoading">发送</yh-button>
    </div>
    <div v-for="msg in chatMessages" :key="msg.id" style="margin-bottom: 8px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useChat } from '@yh-ui/ai-sdk'

const chatInput = ref('')

const { messages: chatMessages, input, isLoading: chatLoading, sendMessage } = useChat({
  api: '/api/chat',
  initialMessages: [
    { role: 'assistant', content: '你好！有什么可以帮助你的？' }
  ]
})

const handleChatSend = async () => {
  if (!chatInput.value.trim()) return
  await sendMessage(chatInput.value)
  chatInput.value = ''
}
</${_S}>`
const jsUseChat = toJs(tsUseChat)

// ============================================
// 5. useLangChainChat 示例
// ============================================
const tsLangChainChat = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p style="margin-bottom: 12px;">使用 LangChain 进行对话（需要配置 API Key）</p>
    <yh-input v-model="lcInput" placeholder="输入消息..." @pressEnter="handleLcSend" style="width: 300px; margin-right: 8px;" />
    <yh-button type="primary" @click="handleLcSend" :loading="lcLoading">发送</yh-button>
    <div v-for="msg in lcMessages" :key="msg.id" style="margin-top: 12px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainChat } from '@yh-ui/ai-sdk'

// 创建模型
const model = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0.7
})

// 使用对话 hook
const { messages, input, isLoading, sendMessage } = useLangChainChat({
  model,
  systemMessage: '你是一个专业的技术顾问',
  streaming: true,
  onChunk: (chunk) => {
    console.log('收到:', chunk)
  }
})

const lcInput = ref('')
const lcMessages = messages
const lcLoading = isLoading

const handleLcSend = async () => {
  if (!lcInput.value.trim()) return
  await sendMessage(lcInput.value)
  lcInput.value = ''
}
</${_S}>`
const jsLangChainChat = toJs(tsLangChainChat)

// ============================================
// 6. useLangChainStream 示例
// ============================================
const tsLangChainStream = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runLcStream" :loading="lcStreamLoading">运行流式生成</yh-button>
    <div style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px; min-height: 60px;">
      {{ lcStreamContent }}
    </div>
    <yh-button size="small" @click="stopLcStream" style="margin-top: 8px;">停止</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainStream } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({ model: 'gpt-4' })

const { content, isStreaming, start, stop } = useLangChainStream({
  model,
  systemMessage: '你是一个有帮助的助手'
})

const lcStreamContent = content
const lcStreamLoading = isStreaming

const runLcStream = async () => {
  await start('请介绍一下 Vue 3 的新特性')
}

const stopLcStream = () => {
  stop()
}
</${_S}>`
const jsLangChainStream = toJs(tsLangChainStream)

// ============================================
// 7. createYHFunctionTool 示例
// ============================================
const tsFunctionTool = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runWithTools">运行带工具的对话</yh-button>
    <pre v-if="toolResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ toolResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// 定义天气查询工具
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: '获取指定城市的天气信息',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    return { city, weather: '晴', temperature: 25 }
  }
})

const toolResult = ref('')

const runWithTools = async () => {
  const openai = createOpenAI()

  const result = await generateText({
    model: openai('gpt-4'),
    prompt: '北京天气怎么样？',
    tools: [weatherTool]
  })

  toolResult.value = JSON.stringify(result, null, 2)
}
</${_S}>`
const jsFunctionTool = toJs(tsFunctionTool)

// ============================================
// 8. createStreamableValue 示例
// ============================================
const tsStreamableValue = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="updateStreamable">更新流式值</yh-button>
    <div style="margin-top: 12px;">
      <p>值: {{ streamableVal }}</p>
      <p>加载中: {{ streamableLoading }}</p>
      <p>错误: {{ streamableError }}</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { createStreamableValue, useStreamableValue } from '@yh-ui/ai-sdk'

// 创建可流式更新的值
const streamable = createStreamableValue<string>('')

// 在组件中使用
const { value, loading, error } = useStreamableValue(streamable)

const streamableVal = value
const streamableLoading = loading
const streamableError = error

const updateStreamable = () => {
  streamable.value.value = 'Hello '
  setTimeout(() => {
    streamable.value.value += 'World'
    streamable.loading.value = false
  }, 500)
}
</${_S}>`
const jsStreamableValue = toJs(tsStreamableValue)

// ============================================
// 9. useConversation 示例
// ============================================
const tsUseConversation = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-button @click="addUserMsg" style="margin-right: 8px;">添加用户消息</yh-button>
      <yh-button @click="addAssistantMsg">添加助手消息</yh-button>
      <yh-button @click="clearMsgs" type="danger">清空</yh-button>
    </div>
    <div v-for="msg in convMessages" :key="msg.id" style="margin-bottom: 4px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useConversation } from '@yh-ui/ai-sdk'

const { messages, addMessage, clearHistory } = useConversation({
  maxHistory: 50,
  persist: false
})

const convMessages = messages

const addUserMsg = () => {
  addMessage({ role: 'user', content: '你好' })
}

const addAssistantMsg = () => {
  addMessage({ role: 'assistant', content: '有什么可以帮助你？' })
}

const clearMsgs = () => {
  clearHistory()
}
</${_S}>`
const jsUseConversation = toJs(tsUseConversation)

// ============================================
// 10. langChainRuntime 示例
// ============================================
const tsRuntime = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runRuntime">运行 Runtime</yh-button>
    <pre v-if="runtimeResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ runtimeResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { langChainRuntime } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()
const runtimeResult = ref('')

const runRuntime = async () => {
  // 同步调用
  const response = await langChainRuntime.invoke(model, '你好', {
    temperature: 0.7
  })
  runtimeResult.value = response.content
}
</${_S}>`
const jsRuntime = toJs(tsRuntime)

// ============================================
// 11. createLangChainChain 示例
// ============================================
const tsChain = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runChain">运行 Chain</yh-button>
    <pre v-if="chainResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ chainResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { createLangChainChain } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const chain = createLangChainChain(model, {
  systemMessage: '你是一个专业的 AI 助手',
  temperature: 0.7
})

const chainResult = ref('')

const runChain = async () => {
  const result = await chain.invoke('你好')
  chainResult.value = result
}
</${_S}>`
const jsChain = toJs(tsChain)

// ============================================
// 12. createAIContext 示例
// ============================================
const tsAIContext = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button @click="updateModel">更新模型配置</yh-button>
    <div style="margin-top: 12px;">
      <p>会话ID: {{ contextSession }}</p>
      <p>当前模型: {{ contextModel }}</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, inject } from 'vue'
import { createAIContext } from '@yh-ui/ai-sdk'

// 创建全局 AI 上下文（在根组件）
const aiContext = createAIContext(
  { name: 'openai', defaultModel: 'gpt-4' }
)

// 在子组件中使用
const context = aiContext

const contextSession = context.sessionId
const contextModel = context.modelConfig

const updateModel = () => {
  context.setModel({ model: 'gpt-4o', temperature: 0.8 })
}
</${_S}>`
const jsAIContext = toJs(tsAIContext)

// ============================================
// 13. 与 YH-UI 组件配合示例
// ============================================
const tsWithUI = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page); max-width: 600px;">
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <yh-ai-bubble
        v-for="msg in uiMessages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
      />
      <yh-ai-bubble
        v-if="uiLoading || uiContent"
        role="assistant"
        :content="uiContent"
        :loading="!uiContent"
        typing
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useChat({
  api: '/api/chat',
  onChunk: (chunk) => {
    currentContent.value += chunk
  }
})

const currentContent = ref('')
const uiMessages = messages
const uiLoading = isLoading
const uiContent = currentContent

const handleSend = async () => {
  currentContent.value = ''
  await sendMessage(input.value)
  input.value = ''
}
</${_S}>`
const jsWithUI = toJs(tsWithUI)

// ============================================
// MCP Client 示例
// ============================================
const tsMCPClient = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 16px;">
      <yh-button type="primary" @click="handleConnect" :loading="isConnecting">
        {{ isConnected ? '已连接' : '连接 MCP Server' }}
      </yh-button>
      <yh-button v-if="isConnected" @click="handleDisconnect">断开</yh-button>
    </div>
    <div v-if="tools.length > 0" style="margin-bottom: 16px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">可用工具 ({{ tools.length }})</div>
      <yh-tag v-for="tool in tools" :key="tool.name" style="margin-right: 8px; margin-bottom: 8px;">
        {{ tool.name }}
      </yh-tag>
    </div>
    <div v-if="error" style="color: var(--yh-color-danger); margin-bottom: 16px;">
      错误: {{ error.message }}
    </div>
    <div v-if="callResult" style="padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">调用结果</div>
      <pre style="font-size: 12px; white-space: pre-wrap; word-break: break-all;">{{ callResult }}</pre>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useMCPClient } from '@yh-ui/ai-sdk'

const { state, connect, disconnect, callTool, isCallingTool } = useMCPClient({
  config: {
    // 替换为实际的 MCP Server URL
    serverUrl: 'http://localhost:3000/mcp'
  },
  autoConnect: false
})

const isConnected = computed(() => state.value.isConnected)
const isConnecting = computed(() => state.value.isConnecting)
const tools = computed(() => state.value.tools)
const error = computed(() => state.value.error)
const callResult = ref('')

const handleConnect = async () => {
  try {
    await connect()
  } catch (e) {
    console.error('连接失败:', e)
  }
}

const handleDisconnect = async () => {
  await disconnect()
}

const handleCallTool = async () => {
  // 示例：调用工具（需要先连接并确保工具有效）
  // const result = await callTool('tool_name', { arg: 'value' })
  // callResult.value = JSON.stringify(result, null, 2)
  callResult.value = '(请先连接 MCP Server 并调用实际工具)'
}
</${_S}>`
const jsMCPClient = toJs(tsMCPClient)

// ============================================
// MCP Server 示例
// ============================================
const tsMCPServer = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 16px;">
      <yh-button type="primary" @click="handleStart" :disabled="isRunning">
        启动 MCP Server
      </yh-button>
      <yh-button v-if="isRunning" type="danger" @click="handleStop">停止</yh-button>
      <yh-tag :type="isRunning ? 'success' : 'default'" style="margin-left: 8px;">
        {{ isRunning ? '运行中' : '已停止' }}
      </yh-tag>
    </div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">已注册工具 ({{ tools.length }})</div>
      <div v-for="tool in tools" :key="tool.name" style="padding: 8px; background: var(--yh-bg-color-container); border-radius: 4px; margin-bottom: 8px;">
        <div style="font-weight: 600;">{{ tool.name }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary);">{{ tool.description }}</div>
      </div>
    </div>
    <div style="padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">使用说明</div>
      <pre style="font-size: 12px; color: var(--yh-text-color-secondary);">
// 在 Next.js API Route 中使用
import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk'

export const GET = createMCPServerHTTPHandler({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [
    {
      name: 'get_weather',
      description: '获取城市天气',
      inputSchema: { type: 'object', properties: { city: { type: 'string' } } },
      execute: async ({ city }) => [{ type: 'text', text: city + '晴天' }]
    }
  ]
})
      </pre>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMCPServer } from '@yh-ui/ai-sdk'

const { tools, isRunning, start, stop, addTool } = useMCPServer({
  name: 'demo-mcp-server',
  version: '1.0.0'
})

// 动态添加工具示例
const handleAddTool = () => {
  addTool({
    name: 'hello',
    description: '返回问候语',
    inputSchema: { type: 'object', properties: { name: { type: 'string' } } },
    execute: async ({ name }) => [{ type: 'text', text: '你好, ' + (name || 'World') + '!' }]
  })
}

const handleStart = () => {
  start()
}

const handleStop = () => {
  stop()
}

onMounted(() => {
  // 初始添加工具
  handleAddTool()
})
</${_S}>`
const jsMCPServer = toJs(tsMCPServer)

export {
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
}
