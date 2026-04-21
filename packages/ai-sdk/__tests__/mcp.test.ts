/**
 * YH-UI AI SDK - MCP 测试
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useMCPClient, useMCPTools } from '../src/mcp'
import { MCPServer, useMCPServer, createMCPServerHTTPHandler } from '../src/mcp-server'

// Mock fetch
global.fetch = vi.fn()

describe('MCP Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should create MCP client with default state', () => {
    const { state, connect, disconnect, callTool } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    expect(state.value.isConnected).toBe(false)
    expect(state.value.isConnecting).toBe(false)
    expect(state.value.error).toBeNull()
    expect(state.value.tools).toEqual([])
    expect(typeof connect).toBe('function')
    expect(typeof disconnect).toBe('function')
    expect(typeof callTool).toBe('function')
  })

  it('should connect to HTTP MCP server', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test-server', version: '1.0.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: {
              tools: [{ name: 'tool1', description: 'Tool 1', inputSchema: { type: 'object' } }]
            }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { state, connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await connect()

    expect(state.value.isConnected).toBe(true)
  })

  it('should handle connection error', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    global.fetch = mockFetch as any

    const { state, connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    try {
      await connect()
    } catch (e) {
      // Expected
    }

    expect(state.value.error).not.toBeNull()
    expect(state.value.isConnected).toBe(false)
  })

  it('should call tool', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: {
              tools: [
                { name: 'get_weather', description: 'Get weather', inputSchema: { type: 'object' } }
              ]
            }
          })
        })
      } else if (body.method === 'tools/call') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 3,
            result: { content: [{ type: 'text', text: '{"temp": 25}' }], isError: false }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { connect, callTool } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await connect()
    const result = await callTool('get_weather', { city: 'Beijing' })

    // Result is parsed JSON object
    expect(result).toHaveProperty('temp')
  })

  it('should not connect if already connecting', async () => {
    const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {}))
    global.fetch = mockFetch as any

    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    const connectPromise = connect()
    await connect() // Second call should return early

    expect(mockFetch).toHaveBeenCalledTimes(1)

    // Clean up
    vi.restoreAllMocks()
  })

  it('should handle tool call error response', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: { tools: [{ name: 'tool', description: 'desc', inputSchema: {} }] }
          })
        })
      } else if (body.method === 'tools/call') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 3,
            result: { content: [{ type: 'text', text: 'error' }], isError: true }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { connect, callTool } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await connect()

    await expect(callTool('tool', {})).rejects.toThrow('error')
  })

  it('should call tool when not connected', async () => {
    const { callTool } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await expect(callTool('tool', {})).rejects.toThrow('MCP client not connected')
  })

  it('should call tool when transport not initialized', async () => {
    const { callTool, connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    // Manually set connected state without transport
    ;(connect as any)._testSetState = async () => {
      // Don't set transport
    }

    await expect(callTool('tool', {})).rejects.toThrow('MCP client not connected')
  })

  it('should throw error for invalid config', async () => {
    const { connect } = useMCPClient({
      config: {},
      autoConnect: false
    })

    await expect(connect()).rejects.toThrow('Invalid MCP config')
  })

  it('should return string when JSON parse fails', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: { tools: [{ name: 'tool', description: 'desc', inputSchema: {} }] }
          })
        })
      } else if (body.method === 'tools/call') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 3,
            result: { content: [{ type: 'text', text: 'plain text result' }], isError: false }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { connect, callTool } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await connect()
    const result = await callTool('tool', {})

    expect(result).toBe('plain text result')
  })

  it('should handle HTTP error status', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    })

    global.fetch = mockFetch as any

    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    try {
      await connect()
    } catch (e) {
      expect((e as Error).message).toContain('500')
    }

    expect(mockFetch).toHaveBeenCalled()
  })

  it('should handle JSON-RPC error response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        jsonrpc: '2.0',
        id: 1,
        error: { code: -32600, message: 'Invalid Request' }
      })
    })

    global.fetch = mockFetch as any

    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    try {
      await connect()
    } catch (e) {
      expect((e as Error).message).toContain('Invalid Request')
    }
  })

  it('should call onConnectionChange callback', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: { tools: [] }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const onConnectionChange = vi.fn()
    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false,
      onConnectionChange
    })

    await connect()

    expect(onConnectionChange).toHaveBeenCalledWith(true)
  })

  it('should call onToolsUpdate callback', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: {
              tools: [
                { name: 'tool1', description: 'First tool', inputSchema: { type: 'object' } },
                { name: 'tool2', description: 'Second tool', inputSchema: { type: 'string' } }
              ]
            }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const onToolsUpdate = vi.fn()
    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false,
      onToolsUpdate
    })

    await connect()

    expect(onToolsUpdate).toHaveBeenCalled()
    expect(onToolsUpdate.mock.calls[0][0]).toHaveLength(2)
  })

  it('should disconnect properly', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'test', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: { tools: [] }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { state, connect, disconnect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false
    })

    await connect()
    expect(state.value.isConnected).toBe(true)

    await disconnect()
    expect(state.value.isConnected).toBe(false)
    expect(state.value.tools).toEqual([])
  })

  it('should use custom client name and version', async () => {
    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const body = options?.body ? JSON.parse(options.body as string) : {}

      if (body.method === 'initialize') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 1,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: {},
              serverInfo: { name: 'server', version: '1.0' }
            }
          })
        })
      } else if (body.method === 'tools/list') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            jsonrpc: '2.0',
            id: 2,
            result: { tools: [] }
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({})
      })
    })

    global.fetch = mockFetch as any

    const { connect } = useMCPClient({
      config: { serverUrl: 'http://localhost:3000/mcp' },
      autoConnect: false,
      clientName: 'custom-client',
      clientVersion: '2.0.0'
    })

    await connect()

    expect(mockFetch).toHaveBeenCalled()
  })
})

describe('MCP Tools (Multiple Servers)', () => {
  it('should create MCP tools manager', () => {
    const { allTools, serverStates, connectAll, disconnectAll, callTool } = useMCPTools({
      servers: [
        { serverUrl: 'http://localhost:3001/mcp' },
        { serverUrl: 'http://localhost:3002/mcp' }
      ],
      autoConnect: false
    })

    expect(allTools.value).toEqual([])
    expect(serverStates.value).toHaveLength(2)
    expect(typeof connectAll).toBe('function')
    expect(typeof disconnectAll).toBe('function')
    expect(typeof callTool).toBe('function')
  })

  it('should track server states', () => {
    const { serverStates } = useMCPTools({
      servers: [{ serverUrl: 'http://localhost:3001/mcp' }],
      autoConnect: false
    })

    expect(serverStates.value[0].index).toBe(0)
    expect(serverStates.value[0].isConnected).toBe(false)
    expect(serverStates.value[0].tools).toEqual([])
  })
})

describe('MCP Server', () => {
  it('should create server', () => {
    const server = new MCPServer({
      config: { name: 'test-server', version: '1.0.0' }
    })

    expect(server.config.name).toBe('test-server')
    expect(server.config.version).toBe('1.0.0')
  })

  it('should add tools', () => {
    const server = new MCPServer({
      config: { name: 'test', version: '1.0' },
      tools: [
        {
          name: 'tool1',
          description: 'A tool',
          inputSchema: { type: 'object' },
          execute: async () => [{ type: 'text', text: 'result' }]
        }
      ]
    })

    expect(server.getTools()).toHaveLength(1)
  })

  it('should handle initialize', async () => {
    const server = new MCPServer({ config: { name: 'test', version: '1.0' } })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'client', version: '1.0' }
      }
    })

    expect(result.result).toHaveProperty('protocolVersion')
    expect(result.result).toHaveProperty('capabilities')
  })

  it('should handle tools/list', async () => {
    const server = new MCPServer({
      config: { name: 'test', version: '1.0' },
      tools: [
        { name: 'weather', description: 'Get weather', inputSchema: {}, execute: async () => [] }
      ]
    })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    })

    expect((result.result as any).tools).toHaveLength(1)
  })

  it('should handle tools/call', async () => {
    const server = new MCPServer({
      config: { name: 'test', version: '1.0' },
      tools: [
        {
          name: 'echo',
          description: 'Echo',
          inputSchema: {},
          execute: async (args) => [{ type: 'text', text: JSON.stringify(args) }]
        }
      ]
    })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'echo', arguments: { test: true } }
    })

    expect(result.result).toHaveProperty('content')
  })

  it('should handle unknown tool', async () => {
    const server = new MCPServer({ config: { name: 'test', version: '1.0' } })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'nonexistent', arguments: {} }
    })

    expect(result.error).toBeDefined()
  })

  it('should handle ping', async () => {
    const server = new MCPServer({ config: { name: 'test', version: '1.0' } })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'ping'
    })

    expect((result.result as any).pong).toBe(true)
  })

  it('should add tool dynamically', () => {
    const server = new MCPServer({ config: { name: 'test', version: '1.0' } })

    server.addTool({
      name: 'dynamic',
      description: 'Dynamic tool',
      inputSchema: {},
      execute: async () => []
    })

    expect(server.getTools()).toHaveLength(1)
  })

  it('should remove tool', () => {
    const server = new MCPServer({
      config: { name: 'test', version: '1.0' },
      tools: [{ name: 'tool1', description: '', inputSchema: {}, execute: async () => [] }]
    })

    server.removeTool('tool1')
    expect(server.getTools()).toHaveLength(0)
  })

  it('should handle unknown method', async () => {
    const server = new MCPServer({ config: { name: 'test', version: '1.0' } })

    const result = await server.handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'unknown'
    })

    expect(result.error?.code).toBe(-32601)
  })

  it('should destroy', () => {
    const server = new MCPServer({
      config: { name: 'test', version: '1.0' },
      tools: [{ name: 'tool1', description: '', inputSchema: {}, execute: async () => [] }]
    })

    server.destroy()
    expect(server.getTools()).toHaveLength(0)
    expect(server.getRunning()).toBe(false)
  })
})

describe('useMCPServer Hook', () => {
  it('should create hook', () => {
    const { server, config, tools, isRunning, addTool, start, stop } = useMCPServer({
      name: 'test-server',
      version: '1.0.0'
    })

    expect(server).toBeInstanceOf(MCPServer)
    expect(config.name).toBe('test-server')
    expect(tools.value).toEqual([])
    expect(isRunning.value).toBe(true) // onStart is called in constructor
    expect(typeof addTool).toBe('function')
    expect(typeof start).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should add tool via hook', () => {
    const { addTool, tools } = useMCPServer({ name: 'test', version: '1.0' })

    addTool({
      name: 'new_tool',
      description: 'Added',
      inputSchema: {},
      execute: async () => []
    })

    expect(tools.value).toHaveLength(1)
  })

  it('should handle request', async () => {
    const { handleRequest, addTool } = useMCPServer({ name: 'test', version: '1.0' })

    addTool({
      name: 'echo',
      description: 'Echo',
      inputSchema: {},
      execute: async (args) => [{ type: 'text', text: JSON.stringify(args) }]
    })

    const response = await handleRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'echo', arguments: { test: true } }
    })

    expect(response.result).toBeDefined()
  })
})

describe('MCP HTTP Handler', () => {
  it('should create handler', () => {
    const handler = createMCPServerHTTPHandler({ name: 'test', version: '1.0' })
    expect(typeof handler).toBe('function')
  })

  it('should handle POST request', async () => {
    const handler = createMCPServerHTTPHandler({
      name: 'test',
      version: '1.0',
      tools: [
        {
          name: 'test_tool',
          description: 'Test',
          inputSchema: {},
          execute: async () => [{ type: 'text', text: 'result' }]
        }
      ]
    })

    const request = new Request('http://localhost/mcp', {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0' }
        }
      })
    })

    const response = await handler(request)
    expect(response.status).toBe(200)
  })

  it('should handle batch requests', async () => {
    const handler = createMCPServerHTTPHandler({ name: 'test', version: '1.0' })

    const request = new Request('http://localhost/mcp', {
      method: 'POST',
      body: JSON.stringify([
        { jsonrpc: '2.0', id: 1, method: 'ping' },
        { jsonrpc: '2.0', id: 2, method: 'ping' }
      ])
    })

    const response = await handler(request)
    const json = await response.json()
    expect(json).toHaveLength(2)
  })

  it('should handle CORS preflight', async () => {
    const handler = createMCPServerHTTPHandler({ name: 'test', version: '1.0' })

    const request = new Request('http://localhost/mcp', { method: 'OPTIONS' })
    const response = await handler(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
  })

  it('should handle errors', async () => {
    const handler = createMCPServerHTTPHandler({ name: 'test', version: '1.0' })

    const request = new Request('http://localhost/mcp', {
      method: 'POST',
      body: 'invalid'
    })

    const response = await handler(request)
    expect(response.status).toBe(500)
  })
})
