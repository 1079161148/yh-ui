import { ref, onUnmounted } from 'vue'

// ============================================
// MCP Server Types
// ============================================

export interface MCPServerTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  /** Execute function - returns content array per MCP spec */
  execute: (args: Record<string, unknown>) => Promise<MCPToolContent[]>
}

export interface MCPToolContent {
  type: 'text' | 'image' | 'resource'
  text?: string
  data?: string
  mimeType?: string
}

export interface MCPServerConfig {
  /** Server name */
  name: string
  /** Server version */
  version: string
  /** Server capabilities */
  capabilities?: {
    tools?: boolean
    resources?: boolean
    prompts?: boolean
  }
}

export interface MCPServerOptions {
  /** Server configuration */
  config: MCPServerConfig
  /** Tools to expose */
  tools?: MCPServerTool[]
  /** Callback when server starts */
  onStart?: (server: MCPServer) => void
  /** Callback when server stops */
  onStop?: () => void
  /** Callback on error */
  onError?: (error: Error) => void
}

export type MCPServerTransport = 'http' | 'stdio'

// ============================================
// HTTP Server (using standard Web APIs for client-side)
// ============================================

export interface MCPHTTPHandler {
  (request: MCPJSONRPCRequest): Promise<MCPJSONRPCResponse>
}

export interface MCPJSONRPCRequest {
  jsonrpc: '2.0'
  id: number | string
  method: string
  params?: Record<string, unknown>
}

export interface MCPJSONRPCResponse {
  jsonrpc: '2.0'
  id: number | string
  result?: unknown
  error?: {
    code: number
    message: string
    data?: unknown
  }
}

export interface MCPJSONRPCNotification {
  jsonrpc: '2.0'
  method: string
  params?: Record<string, unknown>
}

// ============================================
// MCPServer Class
// ============================================

export class MCPServer {
  readonly config: MCPServerConfig
  private tools: Map<string, MCPServerTool> = new Map()
  private requestHandlers: Map<string, (params?: unknown) => unknown> = new Map()
  private isRunning = false

  constructor(options: MCPServerOptions) {
    this.config = options.config

    // Register tools
    if (options.tools) {
      for (const tool of options.tools) {
        this.tools.set(tool.name, tool)
      }
    }

    // Register request handlers
    this.registerRequestHandler('initialize', this.handleInitialize.bind(this))
    this.registerRequestHandler('tools/list', this.handleToolsList.bind(this))
    this.registerRequestHandler('tools/call', this.handleToolsCall.bind(this))
    this.registerRequestHandler('ping', this.handlePing.bind(this))

    options.onStart?.(this)
  }

  private registerRequestHandler(method: string, handler: (params?: unknown) => unknown): void {
    this.requestHandlers.set(method, handler)
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }

  // ── Request Handlers ─────────────────────────────────────────────────────

  private handleInitialize(params?: unknown): {
    protocolVersion: string
    capabilities: { tools: {} }
    serverInfo: { name: string; version: string }
  } {
    const initParams = params as {
      protocolVersion?: string
      capabilities?: Record<string, unknown>
      clientInfo?: { name: string; version: string }
    }

    return {
      protocolVersion: initParams?.protocolVersion || '2024-11-05',
      capabilities: {
        tools: {}
      },
      serverInfo: {
        name: this.config.name,
        version: this.config.version
      }
    }
  }

  private handleToolsList(): {
    tools: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }>
  } {
    const tools = Array.from(this.tools.values()).map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
    }))

    return { tools }
  }

  private async handleToolsCall(params?: unknown): Promise<{
    content: MCPToolContent[]
    isError?: boolean
  }> {
    const callParams = params as { name: string; arguments?: Record<string, unknown> }

    if (!callParams?.name) {
      throw new Error('Missing tool name')
    }

    const tool = this.tools.get(callParams.name)

    if (!tool) {
      throw new Error(`Tool not found: ${callParams.name}`)
    }

    try {
      const result = await tool.execute(callParams.arguments || {})
      return { content: result }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true
      }
    }
  }

  private handlePing(): { pong: boolean } {
    return { pong: true }
  }

  // ── Public API ───────────────────────────────────────────────────────────

  /** Add a tool to the server */
  addTool(tool: MCPServerTool): void {
    this.tools.set(tool.name, tool)
  }

  /** Remove a tool from the server */
  removeTool(name: string): boolean {
    return this.tools.delete(name)
  }

  /** Get all tools */
  getTools(): MCPServerTool[] {
    return Array.from(this.tools.values())
  }

  /** Check if server is running */
  getRunning(): boolean {
    return this.isRunning
  }

  /** Set running state */
  setRunning(running: boolean): void {
    this.isRunning = running
  }

  /** Handle a JSON-RPC request */
  async handleRequest(request: MCPJSONRPCRequest): Promise<MCPJSONRPCResponse> {
    const { method, params, id } = request

    const handler = this.requestHandlers.get(method)

    if (!handler) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601, // Method not found
          message: `Method not found: ${method}`
        }
      }
    }

    try {
      const result = await handler(params)
      return {
        jsonrpc: '2.0',
        id,
        result
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32000,
          message: errorMessage
        }
      }
    }
  }

  /** Handle a batch of JSON-RPC requests */
  async handleBatch(requests: MCPJSONRPCRequest[]): Promise<MCPJSONRPCResponse[]> {
    return Promise.all(requests.map((req) => this.handleRequest(req)))
  }

  /** Cleanup */
  destroy(): void {
    this.tools.clear()
    this.requestHandlers.clear()
    this.isRunning = false
  }
}

// ============================================
// useMCPServer Hook (Vue Composition API)
// ============================================

export interface UseMCPServerOptions {
  /** Server name */
  name: string
  /** Server version */
  version: string
  /** Initial tools */
  tools?: MCPServerTool[]
  /** Callback when tools change */
  onToolsChange?: (tools: MCPServerTool[]) => void
}

export interface UseMCPServerReturn {
  /** Server instance */
  server: MCPServer
  /** Server config */
  config: MCPServerConfig
  /** Tools list (reactive) */
  tools: { value: MCPServerTool[] }
  /** Running state */
  isRunning: { value: boolean }
  /** Add a tool */
  addTool: (tool: MCPServerTool) => void
  /** Remove a tool */
  removeTool: (name: string) => boolean
  /** Handle HTTP request */
  handleRequest: (request: MCPJSONRPCRequest) => Promise<MCPJSONRPCResponse>
  /** Start server */
  start: () => void
  /** Stop server */
  stop: () => void
}

/**
 * useMCPServer - MCP Server Hook
 *
 * 将 AI 应用作为 MCP Server 暴露工具
 *
 * @example
 * ```ts
 * const { server, addTool, tools } = useMCPServer({
 *   name: 'my-ai-server',
 *   version: '1.0.0',
 *   tools: [
 *     {
 *       name: 'get_weather',
 *       description: 'Get weather for a city',
 *       inputSchema: {
 *         type: 'object',
 *         properties: {
 *           city: { type: 'string', description: 'City name' }
 *         },
 *         required: ['city']
 *       },
 *       execute: async ({ city }) => {
 *         return [{ type: 'text', text: `Weather in ${city}: Sunny, 25°C` }]
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export function useMCPServer(options: UseMCPServerOptions): UseMCPServerReturn {
  const config: MCPServerConfig = {
    name: options.name,
    version: options.version,
    capabilities: {
      tools: true
    }
  }

  const tools = ref<MCPServerTool[]>(options.tools || [])
  const isRunning = ref(false)

  const server = new MCPServer({
    config,
    tools: options.tools,
    onStart: () => {
      isRunning.value = true
    },
    onStop: () => {
      isRunning.value = false
    }
  })

  const addTool = (tool: MCPServerTool): void => {
    server.addTool(tool)
    tools.value = server.getTools()
    options.onToolsChange?.(tools.value)
  }

  const removeTool = (name: string): boolean => {
    const result = server.removeTool(name)
    tools.value = server.getTools()
    options.onToolsChange?.(tools.value)
    return result
  }

  const handleRequest = async (request: MCPJSONRPCRequest): Promise<MCPJSONRPCResponse> => {
    return server.handleRequest(request)
  }

  const start = (): void => {
    server.setRunning(true)
    isRunning.value = true
  }

  const stop = (): void => {
    server.setRunning(false)
    isRunning.value = false
    server.destroy()
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stop()
  })

  return {
    server,
    config,
    tools,
    isRunning,
    addTool,
    removeTool,
    handleRequest,
    start,
    stop
  }
}

// ============================================
// MCP Server with Express/Node.js (for backend)
// ============================================

/**
 * createMCPServerHTTPHandler - 创建 HTTP 处理函数
 *
 * 用于在 Express/Next.js API Route 中暴露 MCP Server
 *
 * @example
 * ```ts
 * // Next.js API Route (app/api/mcp/route.ts)
 * import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk/mcp'
 *
 * const handler = createMCPServerHTTPHandler({
 *   name: 'my-ai-server',
 *   version: '1.0.0',
 *   tools: [
 *     {
 *       name: 'search',
 *       description: 'Search for information',
 *       inputSchema: { type: 'object', properties: { query: { type: 'string' } } },
 *       execute: async ({ query }) => {
 *         // Search logic here
 *         return [{ type: 'text', text: `Results for: ${query}` }]
 *       }
 *     }
 *   ]
 * })
 *
 * export const GET = handler
 * export const POST = handler
 * ```
 */
export function createMCPServerHTTPHandler(options: UseMCPServerOptions) {
  const { server, handleRequest } = useMCPServer(options)

  return async function (request: Request): Promise<Response> {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    }

    try {
      const body = await request.json()

      // Handle batch requests
      if (Array.isArray(body)) {
        const responses = await server.handleBatch(body)
        return new Response(JSON.stringify(responses), {
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Handle single request
      const response = await handleRequest(body as MCPJSONRPCRequest)
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      return new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32603,
            message: errorMessage
          }
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }
}
