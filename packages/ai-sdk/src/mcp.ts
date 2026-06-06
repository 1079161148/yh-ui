import { ref, shallowRef, onUnmounted } from 'vue'

// ============================================
// Types - MCP Protocol
// ============================================

export interface MCPTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

export interface MCPConnectionConfig {
  /** HTTP Server URL */
  serverUrl?: string
  /** Stdio Command */
  command?: string
  /** Stdio Arguments */
  args?: string[]
  /** Stdio Environment */
  env?: Record<string, string>
  /** Timeout for requests */
  timeout?: number
}

export interface MCPClientState {
  isConnected: boolean
  isConnecting: boolean
  error: Error | null
  tools: MCPTool[]
}

// ============================================
// MCP JSON-RPC Protocol Types
// ============================================

type JSONRPCVersion = '2.0'

interface JSONRPCRequest {
  jsonrpc: JSONRPCVersion
  id: number | string
  method: string
  params?: Record<string, unknown>
}

interface JSONRPCResponse {
  jsonrpc: JSONRPCVersion
  id: number | string
  result?: unknown
  error?: JSONRPCError
}

interface JSONRPCError {
  code: number
  message: string
  data?: unknown
}

interface JSONRPCNotification {
  jsonrpc: JSONRPCVersion
  method: string
  params?: Record<string, unknown>
}

// ============================================
// MCP Protocol Types
// ============================================

export interface MCPInitializeParams {
  protocolVersion: string
  capabilities: Record<string, unknown>
  clientInfo: {
    name: string
    version: string
  }
}

interface MCPInitializeResult {
  protocolVersion: string
  capabilities: Record<string, unknown>
  serverInfo: {
    name: string
    version: string
  }
}

export interface MCPToolsListParams {
  // Empty params for tools/list
}

interface MCPToolsListResult {
  tools: Array<{
    name: string
    description?: string
    inputSchema: Record<string, unknown>
  }>
}

export interface MCPToolsCallParams {
  name: string
  arguments: Record<string, unknown>
}

interface MCPToolsCallResult {
  content: Array<{
    type: 'text' | 'image' | 'resource'
    text?: string
    data?: string
    mimeType?: string
  }>
  isError?: boolean
}

// ============================================
// MCP Client Implementation
// ============================================

let requestId = 0

function createJSONRPCRequest(method: string, params?: Record<string, unknown>): JSONRPCRequest {
  return {
    jsonrpc: '2.0',
    id: ++requestId,
    method,
    params
  }
}

// HTTP Transport
class MCPHTTPTransport {
  private serverUrl: string
  private timeout: number

  constructor(serverUrl: string, timeout = 30000) {
    this.serverUrl = serverUrl
    this.timeout = timeout
  }

  async sendRequest<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createJSONRPCRequest(method, params)),
      signal: AbortSignal.timeout(this.timeout)
    })

    if (!response.ok) {
      throw new Error(`MCP HTTP Error: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as JSONRPCResponse

    if (data.error) {
      throw new Error(`MCP Error: ${data.error.message}`)
    }

    return data.result as T
  }
}

// Stdio Transport (for local MCP servers)
class MCPStdioTransport {
  private command: string
  private args: string[]
  private env: Record<string, string>
  private process: ReturnType<(typeof import('child_process'))['spawn']> | null = null
  private requestMap = new Map<
    number,
    { resolve: (v: unknown) => void; reject: (e: Error) => void }
  >()
  private notificationHandlers = new Map<string, (params: unknown) => void>()
  private messageBuffer: string = ''
  private initialized: Promise<void>

  constructor(command: string, args: string[] = [], env: Record<string, string> = {}) {
    this.command = command
    this.args = args
    this.env = env
    this.initialized = this.init()
  }

  private init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Dynamic import for Node.js only
        const { spawn } = require('child_process') as typeof import('child_process')
        this.process = spawn(this.command, this.args, {
          env: { ...process.env, ...this.env },
          stdio: ['pipe', 'pipe', 'pipe']
        })

        this.process.on('error', (err) => {
          reject(err)
        })

        this.process.on('close', () => {
          this.process = null
        })

        // Handle stdout messages
        this.process.stdout?.on('data', (data: Buffer) => {
          this.handleData(data.toString())
        })

        // Handle stderr (for logging)
        this.process.stderr?.on('data', (data: Buffer) => {
          console.error('[MCP Stdio]', data.toString())
        })

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  private handleData(data: string): void {
    this.messageBuffer += data

    // Try to parse complete JSON-RPC messages
    let newlineIndex: number
    while ((newlineIndex = this.messageBuffer.indexOf('\n')) !== -1) {
      const line = this.messageBuffer.slice(0, newlineIndex)
      this.messageBuffer = this.messageBuffer.slice(newlineIndex + 1)

      if (!line.trim()) continue

      try {
        const message = JSON.parse(line) as JSONRPCResponse | JSONRPCNotification
        this.handleMessage(message)
      } catch {
        // Ignore parse errors for incomplete messages
      }
    }
  }

  private handleMessage(message: JSONRPCResponse | JSONRPCNotification): void {
    if ('id' in message && message.id !== undefined) {
      // Response to a request
      const pending = this.requestMap.get(message.id as number)
      if (pending) {
        this.requestMap.delete(message.id as number)
        if ('error' in message && message.error) {
          pending.reject(new Error(message.error.message))
        } else {
          pending.resolve(message.result)
        }
      }
    } else if ('method' in message) {
      // Notification
      const handler = this.notificationHandlers.get(message.method)
      if (handler) {
        handler(message.params)
      }
    }
  }

  async sendRequest<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    await this.initialized

    if (!this.process) {
      throw new Error('MCP process not running')
    }

    const request = createJSONRPCRequest(method, params)
    const requestId = request.id as number

    return new Promise((resolve, reject) => {
      this.requestMap.set(requestId, {
        resolve: resolve as (v: unknown) => void,
        reject
      })

      this.process!.stdin?.write(JSON.stringify(request) + '\n')

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.requestMap.has(requestId)) {
          this.requestMap.delete(requestId)
          reject(new Error(`MCP request timeout: ${method}`))
        }
      }, 30000)
    })
  }

  onNotification(method: string, handler: (params: unknown) => void): void {
    this.notificationHandlers.set(method, handler)
  }

  async close(): Promise<void> {
    if (this.process) {
      this.process.kill()
      this.process = null
    }
  }
}

// ============================================
// useMCPClient Hook
// ============================================

export interface UseMCPClientOptions {
  /** MCP Server configuration */
  config: MCPConnectionConfig
  /** Auto-connect on mount */
  autoConnect?: boolean
  /** Client name for initialization */
  clientName?: string
  /** Client version for initialization */
  clientVersion?: string
  /** Callback when tools are updated */
  onToolsUpdate?: (tools: MCPTool[]) => void
  /** Callback when connection state changes */
  onConnectionChange?: (isConnected: boolean) => void
}

export interface UseMCPClientReturn {
  /** Connection state */
  state: MCPClientState
  /** Connect to MCP server */
  connect: () => Promise<void>
  /** Disconnect from MCP server */
  disconnect: () => Promise<void>
  /** Call a tool */
  callTool: <T = unknown>(name: string, args?: Record<string, unknown>) => Promise<T>
  /** Tool call loading state */
  isCallingTool: { value: boolean }
}

/**
 * useMCPClient - MCP Client Hook
 *
 * 连接外部 MCP Server 并调用其工具
 *
 * @example
 * ```ts
 * const { state, connect, disconnect, callTool } = useMCPClient({
 *   config: {
 *     serverUrl: 'http://localhost:3000/mcp'
 *   }
 * })
 * ```
 *
 * @example
 * ```ts
 * // Using stdio transport
 * const { state, connect, callTool } = useMCPClient({
 *   config: {
 *     command: 'npx',
 *     args: ['-y', '@modelcontextprotocol/server-filesystem', './data']
 *   }
 * })
 * ```
 */
export function useMCPClient(options: UseMCPClientOptions) {
  const {
    config,
    autoConnect = true,
    clientName = '@yh-ui/ai-sdk',
    clientVersion = '1.0.0',
    onToolsUpdate,
    onConnectionChange
  } = options

  const state = shallowRef<MCPClientState>({
    isConnected: false,
    isConnecting: false,
    error: null,
    tools: []
  })

  const isCallingTool = ref(false)

  const transport = shallowRef<MCPHTTPTransport | MCPStdioTransport | null>(null)

  const connect = async (): Promise<void> => {
    if (state.value.isConnected || state.value.isConnecting) {
      return
    }

    state.value = {
      ...state.value,
      isConnecting: true,
      error: null
    }

    try {
      let t: MCPHTTPTransport | MCPStdioTransport

      if (config.serverUrl) {
        t = new MCPHTTPTransport(config.serverUrl, config.timeout)
      } else if (config.command) {
        t = new MCPStdioTransport(config.command, config.args, config.env)
      } else {
        throw new Error('Invalid MCP config: must provide either serverUrl or command')
      }

      transport.value = t

      // Initialize MCP connection
      const _initResult = await t.sendRequest<MCPInitializeResult>('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: clientName,
          version: clientVersion
        }
      })

      // Send initialized notification
      await t.sendRequest('initialized', {})

      // Get tools list
      const toolsResult = await t.sendRequest<MCPToolsListResult>('tools/list', {})

      const tools: MCPTool[] = toolsResult.tools.map((tool) => ({
        name: tool.name,
        description: tool.description || '',
        inputSchema: tool.inputSchema
      }))

      state.value = {
        isConnected: true,
        isConnecting: false,
        error: null,
        tools
      }

      onToolsUpdate?.(tools)
      onConnectionChange?.(true)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))

      state.value = {
        isConnected: false,
        isConnecting: false,
        error,
        tools: []
      }

      onConnectionChange?.(false)
      throw error
    }
  }

  const disconnect = async (): Promise<void> => {
    const t = transport.value
    if (t) {
      if ('close' in t) {
        await t.close()
      }
      transport.value = null
    }

    state.value = {
      isConnected: false,
      isConnecting: false,
      error: null,
      tools: []
    }

    onConnectionChange?.(false)
  }

  const callTool = async <T = unknown>(
    name: string,
    args: Record<string, unknown> = {}
  ): Promise<T> => {
    if (!state.value.isConnected) {
      throw new Error('MCP client not connected')
    }

    const t = transport.value
    if (!t) {
      throw new Error('MCP transport not initialized')
    }

    isCallingTool.value = true

    try {
      const result = await t.sendRequest<MCPToolsCallResult>('tools/call', {
        name,
        arguments: args
      })

      // Extract text content from result
      const textContent = result.content.find((c) => c.type === 'text')

      if (result.isError) {
        throw new Error(textContent?.text || 'Tool execution failed')
      }

      // Try to parse JSON response, otherwise return as string
      if (textContent?.text) {
        try {
          return JSON.parse(textContent.text) as T
        } catch {
          return textContent.text as T
        }
      }

      return result as T
    } finally {
      isCallingTool.value = false
    }
  }

  // Auto connect
  if (autoConnect) {
    connect()
  }

  // Cleanup on unmount
  onUnmounted(() => {
    disconnect()
  })

  return {
    state,
    connect,
    disconnect,
    callTool,
    isCallingTool
  }
}

// ============================================
// useMCPTools Hook - 集成到 AI SDK
// ============================================

export interface UseMCPToolsOptions {
  /** MCP Server configurations (支持多个 server) */
  servers: MCPConnectionConfig[]
  /** Auto-connect on mount */
  autoConnect?: boolean
  /** Convert MCP tools to AI SDK format */
  convertToAITools?: boolean
  /** Callback when any server connects */
  onServerConnect?: (serverIndex: number, tools: MCPTool[]) => void
}

export interface MCPServerState {
  index: number
  config: MCPConnectionConfig
  isConnected: boolean
  tools: MCPTool[]
  error: Error | null
}

export interface UseMCPToolsReturn {
  /** All available tools from all servers */
  allTools: { value: MCPTool[] }
  /** Individual server states */
  serverStates: { value: MCPServerState[] }
  /** Connect to all servers */
  connectAll: () => Promise<void>
  /** Disconnect from all servers */
  disconnectAll: () => Promise<void>
  /** Call tool by name (resolves to correct server) */
  callTool: <T = unknown>(name: string, args?: Record<string, unknown>) => Promise<T>
}

/**
 * useMCPTools - 管理多个 MCP Server 的工具
 *
 * @example
 * ```ts
 * const { allTools, serverStates, callTool } = useMCPTools({
 *   servers: [
 *     { serverUrl: 'http://localhost:3001/mcp' },
 *     { command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem', './data'] }
 *   ]
 * })
 * ```
 */
export function useMCPTools(options: UseMCPToolsOptions) {
  const { servers, autoConnect = true, onServerConnect } = options

  const allTools = ref<MCPTool[]>([])
  const serverStates = ref<MCPServerState[]>(
    servers.map((config, index) => ({
      index,
      config,
      isConnected: false,
      tools: [],
      error: null
    }))
  )

  const clients: Array<{
    state: MCPClientState
    connect: () => Promise<void>
    disconnect: () => Promise<void>
  }> = []

  // Initialize clients for each server
  for (let i = 0; i < servers.length; i++) {
    const serverState = serverStates.value[i]

    const client = useMCPClient({
      config: servers[i],
      autoConnect: false,
      onToolsUpdate: (tools) => {
        serverState.tools = tools
        updateAllTools()
      },
      onConnectionChange: (isConnected) => {
        serverState.isConnected = isConnected
      }
    })

    clients.push({
      get state() {
        return client.state.value
      },
      connect: client.connect,
      disconnect: client.disconnect
    })
  }

  function updateAllTools(): void {
    const tools: MCPTool[] = []
    for (const server of serverStates.value) {
      if (server.isConnected) {
        tools.push(...server.tools)
      }
    }
    allTools.value = tools
  }

  const connectAll = async (): Promise<void> => {
    for (let i = 0; i < clients.length; i++) {
      const client = clients[i]
      try {
        await client.connect()
        const tools = serverStates.value[i].tools
        onServerConnect?.(i, tools)
      } catch (err) {
        serverStates.value[i].error = err instanceof Error ? err : new Error(String(err))
      }
    }
  }

  const disconnectAll = async (): Promise<void> => {
    for (const client of clients) {
      await client.disconnect()
    }
  }

  const callTool = async <T = unknown>(
    name: string,
    args: Record<string, unknown> = {}
  ): Promise<T> => {
    // Find which server has this tool
    for (const server of serverStates.value) {
      const tool = server.tools.find((t) => t.name === name)
      if (tool) {
        // Find the client for this server
        const clientIndex = serverStates.value.indexOf(server)
        const _client = clients[clientIndex]
        // Use the client's callTool through the hook
        const mcpClient = useMCPClient({ config: server.config, autoConnect: false })
        return mcpClient.callTool<T>(name, args)
      }
    }

    throw new Error(`Tool not found: ${name}`)
  }

  // Auto connect
  if (autoConnect) {
    connectAll()
  }

  return {
    allTools,
    serverStates,
    connectAll,
    disconnectAll,
    callTool
  }
}
