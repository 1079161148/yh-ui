/**
 * YH-UI AI SDK Utilities
 *
 * 提供基础的 AI 工具函数和类型定义
 * 同时完全兼容 Vercel AI SDK
 */

// ============================================
// Vercel AI SDK Re-exports
// ============================================

// Core functions
export {
  generateText,
  streamText,
  generateObject,
  streamObject,
  embed,
  embedMany,
  experimental_generateImage,
  experimental_generateSpeech,
  experimental_transcribe,
  tool,
  jsonSchema,
  zodSchema,
  customProvider,
  createProviderRegistry,
  wrapLanguageModel,
  extractReasoningMiddleware,
  simulateStreamingMiddleware,
  defaultSettingsMiddleware,
  smoothStream,
  simulateReadableStream,
  generateId,
  createIdGenerator,
  cosineSimilarity,
  // Stream helpers
  createDataStream,
  createDataStreamResponse,
  formatAssistantStreamPart,
  formatDataStreamPart,
  parseAssistantStreamPart,
  parseDataStreamPart,
  pipeDataStreamToResponse,
  processDataStream,
  processTextStream,
  // Message helpers
  convertToCoreMessages,
  appendClientMessage,
  appendResponseMessages,
  // Schema
  coreMessageSchema,
  coreSystemMessageSchema,
  coreUserMessageSchema,
  coreAssistantMessageSchema,
  coreToolMessageSchema,
  // Adapter
  LangChainAdapter,
  LlamaIndexAdapter
} from 'ai'

// Re-export errors
export {
  AISDKError,
  APICallError,
  AssistantResponse,
  DownloadError,
  EmptyResponseBodyError,
  InvalidArgumentError,
  InvalidDataContentError,
  InvalidMessageRoleError,
  InvalidPromptError,
  InvalidResponseDataError,
  InvalidStreamPartError,
  InvalidToolArgumentsError,
  JSONParseError,
  LoadAPIKeyError,
  MCPClientError,
  MessageConversionError,
  NoContentGeneratedError,
  NoImageGeneratedError,
  NoObjectGeneratedError,
  NoOutputSpecifiedError,
  NoSuchModelError,
  NoSuchProviderError,
  NoSuchToolError,
  Output,
  RetryError,
  StreamData,
  ToolCallRepairError,
  ToolExecutionError,
  TypeValidationError,
  UnsupportedFunctionalityError,
  UnsupportedModelVersionError
} from 'ai'

// ============================================
// LangChain Re-exports
// ============================================

// Re-export types from LangChain
export type {
  BaseChatModel,
  BaseChatModelCallOptions,
  BaseMessage,
  AIMessage as LCAIMessage,
  HumanMessage as LCHumanMessage,
  SystemMessage as LCSystemMessage,
  ToolMessage as LCToolMessage,
  LangChainMessage,
  LangChainConfig,
  UseLangChainChatOptions,
  UseLangChainChatReturn,
  UseLangChainStreamOptions,
  UseLangChainStreamReturn
} from './langchain'

// Re-export classes from LangChain
export { AIMessage, HumanMessage, SystemMessage, ToolMessage } from './langchain'

// Re-export functions from LangChain
export {
  useLangChainChat,
  useLangChainStream,
  createLangChainChain,
  langChainRuntime
} from './langchain'

// ============================================
// Vue Composables Re-exports
// ============================================

// Re-export types from Vue
export type {
  StreamableValue,
  ConversationMessage,
  ConversationConfig,
  ToolCallHandler,
  ProviderAdapter,
  ModelConfig,
  UseAIChatOptions,
  UseAIChatReturn,
  UseAIStreamOptions,
  UseAIStreamReturn,
  AIContextValue
} from './vue'

// Re-export functions from Vue
export {
  createStreamableValue,
  useStreamableValue,
  useConversation,
  useAIChat,
  useAIStream,
  createYHFunctionTool,
  createProviderAdapter,
  createAIContext
} from './vue'

// ============================================
// MCP Protocol Support
// ============================================

// Re-export MCP Client
export {
  useMCPClient,
  useMCPTools,
  type MCPConnectionConfig,
  type MCPClientState,
  type MCPTool,
  type UseMCPClientOptions,
  type UseMCPClientReturn,
  type UseMCPToolsOptions,
  type UseMCPToolsReturn,
  type MCPServerState
} from './mcp'

// ============================================
// MCP Server (Expose tools as MCP Server)
// ============================================

export {
  MCPServer,
  useMCPServer,
  createMCPServerHTTPHandler,
  type MCPServerTool,
  type MCPToolContent,
  type MCPServerConfig,
  type MCPServerOptions,
  type MCPServerTransport,
  type UseMCPServerOptions,
  type UseMCPServerReturn,
  type MCPJSONRPCRequest,
  type MCPJSONRPCResponse
} from './mcp-server'

// ============================================
// YH-UI Specific Helpers
// ============================================

export interface AIProvider {
  name: string
  baseUrl?: string
  apiKey?: string
  defaultModel?: string
}

export interface ChatOptions {
  model: string
  temperature?: number
  maxTokens?: number
  topP?: number
  messages: Array<{ role: string; content: string }>
}

/**
 * Create a simple AI chat completion
 */
export async function createChatCompletion(
  provider: AIProvider,
  options: ChatOptions
): Promise<string> {
  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(provider.apiKey && { Authorization: `Bearer ${provider.apiKey}` })
    },
    body: JSON.stringify(options)
  })

  if (!response.ok) {
    throw new Error(`AI API Error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

/**
 * Create a streaming AI chat completion
 */
export async function* createStreamingChatCompletion(
  provider: AIProvider,
  options: ChatOptions
): AsyncGenerator<string> {
  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(provider.apiKey && { Authorization: `Bearer ${provider.apiKey}` })
    },
    body: JSON.stringify({
      stream: true,
      ...options
    })
  })

  if (!response.ok || !response.body) {
    throw new Error(`AI API Error: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n').filter((line) => line.trim() !== '')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') return

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) yield content
        } catch {
          // Skip invalid JSON
        }
      }
    }
  }
}
