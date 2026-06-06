# API Reference

This page is the compact contract map for `@yh-ui/ai-sdk`. It is intended for release
review, type checking, and day-to-day integration work. The examples below focus on
public shapes that should remain stable across patch releases; experimental APIs are
documented separately so teams can decide how much risk to accept.

When building production features, prefer importing the smallest API surface you need.
Keep transport, model calls, and UI state separated: the SDK should own streaming,
message normalization, retries, and tool orchestration, while your application owns
authentication, persistence policy, and business-specific prompts.

## Core Types

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
  name?: string // Tool name
  toolCallId?: string // Tool call ID
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

Use `useAIChat` for simple chat surfaces that need streaming, reload, append, and
loading/error state. The hook is deliberately transport-light: pass headers and body
from your application layer, and keep sensitive provider keys on the server. For
auditable products, wire `onChunk`, `onFinish`, and `onError` into your telemetry so
you can reconstruct degraded sessions without logging private message content.

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

Use `useLangChainChat` when the application already depends on LangChain models or
chains. Keep `maxHistory` bounded for predictable token usage, and prefer a single
system message per conversation. For long-running assistants, persist normalized
`LangChainMessage` objects rather than provider-specific raw payloads.

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

The MCP client API is designed for tool discovery and connection lifecycle tracking.
Use `onToolsUpdate` to refresh command palettes or agent tool lists, and use
`onConnectionChange` for visible health indicators. Treat MCP server configuration as
environment-specific data; do not hard-code local command paths into shared docs or
examples.

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

Rate limiters are server-side guardrails. Choose `keyBy` according to the trust
boundary: public endpoints usually key by IP or anonymous session, authenticated
endpoints should key by user or API key, and agent systems often need an additional
tool-level budget. Always return the `remaining` and `resetAt` values to callers that
need retry UX.

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

The in-memory vector store is suitable for demos, tests, and local prototypes. For
production RAG, use it behind the same interface during development, then replace it
with a durable vector database. Keep document metadata small and serializable so
retrieval results can be safely displayed, traced, and exported.
