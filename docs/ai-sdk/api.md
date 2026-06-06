# API 参考

## 核心类型

### ConversationMessage

```typescript
interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
  metadata?: Record<string, unknown>
}
```

### LangChainMessage

```typescript
interface LangChainMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  name?: string // 工具名称
  toolCallId?: string // 工具调用 ID
  additionalKwargs?: Record<string, unknown>
}
```

### ToolCall

```typescript
interface ToolCall {
  id: string
  name: string
  args: Record<string, unknown>
}
```

### ToolResult

```typescript
interface ToolResult {
  toolCallId: string
  toolName: string
  result: unknown
}
```

## useAIChat

```typescript
interface UseAIChatOptions {
  api: string
  initialMessages?: ConversationMessage[]
  headers?: Record<string, string>
  body?: Record<string, unknown>
  onChunk?: (chunk: string) => void
  onFinish?: (message: ConversationMessage) => void
  onError?: (error: Error) => void
}

interface UseAIChatReturn {
  messages: Ref<ConversationMessage[]>
  input: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  sendMessage: (content: string) => Promise<void>
  reload: () => void
  append: (content: string, role?: 'user' | 'assistant') => void
}
```

## useLangChainChat

```typescript
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
```

## useMCPClient

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
```

## createRateLimiter

```typescript
interface RateLimiterOptions {
  windowMs: number
  max: number
  keyBy?: 'ip' | 'apiKey' | 'userId' | ((req: Request) => string)
  algorithm?: 'token-bucket' | 'sliding-window'
  message?: string
  storage?: RateLimiterStorage
}

interface RateLimiterCheckResult {
  allowed: boolean
  remaining: number
  resetAt: Date
}
```

## createInMemoryVectorStore

```typescript
interface VectorDocument {
  id: string
  content: string
  embedding: number[]
  metadata?: Record<string, unknown>
}

interface SearchOptions {
  topK?: number
  threshold?: number
  filter?: (doc: VectorDocument) => boolean
}
```
