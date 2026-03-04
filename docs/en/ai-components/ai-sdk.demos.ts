import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ============================================
// 1. Quick Start Example
// ============================================
const tsQuickStart = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p>Check the code example below to learn how to use @yh-ui/ai-sdk</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useChat, createStreamableValue } from '@yh-ui/ai-sdk'

// Create a streamable value
const { value, loading, error } = createStreamableValue('')

// Chat hook
const { messages, input, isLoading, sendMessage } = useChat({
  api: '/api/chat',
  onChunk: (chunk) => {
    value.value += chunk
  }
})

// Send a message
const handleSend = async () => {
  await sendMessage('Hello')
}
</${_S}>`
const jsQuickStart = toJs(tsQuickStart)

// ============================================
// 2. generateText Example
// ============================================
const tsGenerateText = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runGenerateText">Run generateText</yh-button>
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
    prompt: 'Introduce Vue 3 in one sentence'
  })

  generateTextResult.value = result.text
}
</${_S}>`
const jsGenerateText = toJs(tsGenerateText)

// ============================================
// 3. streamText Example
// ============================================
const tsStreamText = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runStreamText" :loading="isStreaming">Run streamText</yh-button>
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
    prompt: 'Write a poem about spring'
  })

  for await (const chunk of result.textStream) {
    streamTextResult.value += chunk
  }

  isStreaming.value = false
}
</${_S}>`
const jsStreamText = toJs(tsStreamText)

// ============================================
// 4. useChat Example
// ============================================
const tsUseChat = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-input v-model="chatInput" placeholder="Type a message..." @pressEnter="handleChatSend" style="width: 300px;" />
      <yh-button type="primary" @click="handleChatSend" :loading="chatLoading">Send</yh-button>
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

const { messages: chatMessages, input, sendMessage, isLoading: chatLoading } = useChat({
  api: '/api/chat',
  initialMessages: [
    { role: 'assistant', content: 'Hello! How can I help you today?' }
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
// 5. useLangChainChat Example
// ============================================
const tsLangChainChat = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <p style="margin-bottom: 12px;">Using LangChain for chat (requires API Key configuration)</p>
    <yh-input v-model="lcInput" placeholder="Type a message..." @pressEnter="handleLcSend" style="width: 300px; margin-right: 8px;" />
    <yh-button type="primary" @click="handleLcSend" :loading="lcLoading">Send</yh-button>
    <div v-for="msg in lcMessages" :key="msg.id" style="margin-top: 12px;">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainChat } from '@yh-ui/ai-sdk'

// Create model
const model = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0.7
})

// Use chat hook
const { messages, input, isLoading, sendMessage } = useLangChainChat({
  model,
  systemMessage: 'You are a professional technical consultant',
  streaming: true,
  onChunk: (chunk) => {
    console.log('Received:', chunk)
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
// 6. useLangChainStream Example
// ============================================
const tsLangChainStream = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runLcStream" :loading="lcStreamLoading">Run Streaming</yh-button>
    <div style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px; min-height: 60px;">
      {{ lcStreamContent }}
    </div>
    <yh-button size="small" @click="stopLcStream" style="margin-top: 8px;">Stop</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { useLangChainStream } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI({ model: 'gpt-4' })

const { content, isStreaming, start, stop } = useLangChainStream({
  model,
  systemMessage: 'You are a helpful assistant'
})

const lcStreamContent = content
const lcStreamLoading = isStreaming

const runLcStream = async () => {
  await start('Tell me about Vue 3 new features')
}

const stopLcStream = () => {
  stop()
}
</${_S}>`
const jsLangChainStream = toJs(tsLangChainStream)

// ============================================
// 7. createYHFunctionTool Example
// ============================================
const tsFunctionTool = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runWithTools">Run with Tools</yh-button>
    <pre v-if="toolResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ toolResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// Define weather query tool
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: 'Get weather information for a specified city',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'City name' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    return { city, weather: 'sunny', temperature: 25 }
  }
})

const toolResult = ref('')

const runWithTools = async () => {
  const openai = createOpenAI()

  const result = await generateText({
    model: openai('gpt-4'),
    prompt: \"What's the weather in Beijing?\",
    tools: [weatherTool]
  })

  toolResult.value = JSON.stringify(result, null, 2)
}
</${_S}>`
const jsFunctionTool = toJs(tsFunctionTool)

// ============================================
// 8. createStreamableValue Example
// ============================================
const tsStreamableValue = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="updateStreamable">Update Streamable</yh-button>
    <div style="margin-top: 12px;">
      <p>Value: {{ streamableVal }}</p>
      <p>Loading: {{ streamableLoading }}</p>
      <p>Error: {{ streamableError }}</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { createStreamableValue, useStreamableValue } from '@yh-ui/ai-sdk'

// Create a streamable value
const streamable = createStreamableValue<string>('')

// Use in component
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
// 9. useConversation Example
// ============================================
const tsUseConversation = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 12px;">
      <yh-button @click="addUserMsg" style="margin-right: 8px;">Add User Msg</yh-button>
      <yh-button @click="addAssistantMsg">Add Assistant Msg</yh-button>
      <yh-button @click="clearMsgs" type="danger">Clear</yh-button>
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
  addMessage({ role: 'user', content: 'Hello' })
}

const addAssistantMsg = () => {
  addMessage({ role: 'assistant', content: 'How can I help you?' })
}

const clearMsgs = () => {
  clearHistory()
}
</${_S}>`
const jsUseConversation = toJs(tsUseConversation)

// ============================================
// 10. langChainRuntime Example
// ============================================
const tsRuntime = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runRuntime">Run Runtime</yh-button>
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
  // Synchronous call
  const response = await langChainRuntime.invoke(model, 'Hello', {
    temperature: 0.7
  })
  runtimeResult.value = response.content
}
</${_S}>`
const jsRuntime = toJs(tsRuntime)

// ============================================
// 11. createLangChainChain Example
// ============================================
const tsChain = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button type="primary" @click="runChain">Run Chain</yh-button>
    <pre v-if="chainResult" style="margin-top: 12px; padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">{{ chainResult }}</pre>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { ChatOpenAI } from '@langchain/openai'
import { createLangChainChain } from '@yh-ui/ai-sdk'

const model = new ChatOpenAI()

const chain = createLangChainChain(model, {
  systemMessage: 'You are a professional AI assistant',
  temperature: 0.7
})

const chainResult = ref('')

const runChain = async () => {
  const result = await chain.invoke('Hello')
  chainResult.value = result
}
</${_S}>`
const jsChain = toJs(tsChain)

// ============================================
// 12. createAIContext Example
// ============================================
const tsAIContext = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <yh-button @click="updateModel">Update Model Config</yh-button>
    <div style="margin-top: 12px;">
      <p>Session ID: {{ contextSession }}</p>
      <p>Current Model: {{ contextModel }}</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, inject } from 'vue'
import { createAIContext } from '@yh-ui/ai-sdk'

// Create global AI context (in root component)
const aiContext = createAIContext(
  { name: 'openai', defaultModel: 'gpt-4' }
)

// Use in child component
const context = aiContext

const contextSession = context.sessionId
const contextModel = context.modelConfig

const updateModel = () => {
  context.setModel({ model: 'gpt-4o', temperature: 0.8 })
}
</${_S}>`
const jsAIContext = toJs(tsAIContext)

// ============================================
// 13. Usage with YH-UI Components
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
// MCP Client Demo
// ============================================
const tsMCPClient = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 16px;">
      <yh-button type="primary" @click="handleConnect" :loading="isConnecting">
        {{ isConnected ? 'Connected' : 'Connect MCP Server' }}
      </yh-button>
      <yh-button v-if="isConnected" @click="handleDisconnect">Disconnect</yh-button>
    </div>
    <div v-if="tools.length > 0" style="margin-bottom: 16px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Available Tools ({{ tools.length }})</div>
      <yh-tag v-for="tool in tools" :key="tool.name" style="margin-right: 8px; margin-bottom: 8px;">
        {{ tool.name }}
      </yh-tag>
    </div>
    <div v-if="error" style="color: var(--yh-color-danger); margin-bottom: 16px;">
      Error: {{ error.message }}
    </div>
    <div v-if="callResult" style="padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Result</div>
      <pre style="font-size: 12px; white-space: pre-wrap; word-break: break-all;">{{ callResult }}</pre>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useMCPClient } from '@yh-ui/ai-sdk'

const { state, connect, disconnect, callTool, isCallingTool } = useMCPClient({
  config: {
    // Replace with your actual MCP Server URL
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
    console.error('Connection failed:', e)
  }
}

const handleDisconnect = async () => {
  await disconnect()
}

const handleCallTool = async () => {
  // Example: call tool (need to connect first)
  // const result = await callTool('tool_name', { arg: 'value' })
  // callResult.value = JSON.stringify(result, null, 2)
  callResult.value = '(Please connect to MCP Server first)'
}
</${_S}>`
const jsMCPClient = toJs(tsMCPClient)

// ============================================
// MCP Server Demo
// ============================================
const tsMCPServer = `<${_T}>
  <div style="padding: 16px; background: var(--yh-bg-color-page);">
    <div style="margin-bottom: 16px;">
      <yh-button type="primary" @click="handleStart" :disabled="isRunning">
        Start MCP Server
      </yh-button>
      <yh-button v-if="isRunning" type="danger" @click="handleStop">Stop</yh-button>
      <yh-tag :type="isRunning ? 'success' : 'default'" style="margin-left: 8px;">
        {{ isRunning ? 'Running' : 'Stopped' }}
      </yh-tag>
    </div>
    <div style="margin-bottom: 16px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Registered Tools ({{ tools.length }})</div>
      <div v-for="tool in tools" :key="tool.name" style="padding: 8px; background: var(--yh-bg-color-container); border-radius: 4px; margin-bottom: 8px;">
        <div style="font-weight: 600;">{{ tool.name }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary);">{{ tool.description }}</div>
      </div>
    </div>
    <div style="padding: 12px; background: var(--yh-bg-color-container); border-radius: 8px;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Usage</div>
      <pre style="font-size: 12px; color: var(--yh-text-color-secondary);">
// In Next.js API Route
import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk'

export const GET = createMCPServerHTTPHandler({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [
    {
      name: 'get_weather',
      description: 'Get weather for a city',
      inputSchema: { type: 'object', properties: { city: { type: 'string' } } },
      execute: async ({ city }) => [{ type: 'text', text: city + ' is sunny' }]
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

const handleAddTool = () => {
  addTool({
    name: 'hello',
    description: 'Returns a greeting',
    inputSchema: { type: 'object', properties: { name: { type: 'string' } } },
    execute: async ({ name }) => [{ type: 'text', text: 'Hello, ' + (name || 'World') + '!' }]
  })
}

const handleStart = () => {
  start()
}

const handleStop = () => {
  stop()
}

onMounted(() => {
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
