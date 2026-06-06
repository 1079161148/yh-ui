# MCP Protocol

## Overview

MCP (Model Context Protocol) is an open standard designed to enable AI models to uniformly interact with external tools and services. MCP was proposed by Anthropic and donated to the Linux Foundation, with support from OpenAI, Google, Microsoft, and other companies.

YH-UI provides complete MCP support, including MCP Client (connect to external MCP Server) and MCP Server (expose your tools as MCP Server).

## MCP Client - Connect to External MCP Server

Use `useMCPClient` to connect to an external MCP Server and call its tools.

```typescript
import { useMCPClient } from '@yh-ui/ai-sdk'

// Connect via HTTP
const { state, connect, disconnect, callTool, isCallingTool } = useMCPClient({
  config: {
    serverUrl: 'http://localhost:3000/mcp',
    timeout: 30000
  },
  autoConnect: false
})

// Connect
await connect()

// Call tool
const result = await callTool('tool_name', { arg: 'value' })
```

### Stdio Mode (Node.js)

```typescript
const { state, connect, callTool } = useMCPClient({
  config: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', './data']
  },
  autoConnect: true
})
```

### API

| Property               | Type                  | Description          |
| ---------------------- | --------------------- | -------------------- |
| `state`                | `Ref<MCPClientState>` | Connection state     |
| `connect()`            | `Function`            | Connect to Server    |
| `disconnect()`         | `Function`            | Disconnect           |
| `callTool(name, args)` | `Function`            | Call tool            |
| `isCallingTool`        | `Ref<boolean>`        | Whether calling tool |

### MCPClientState

```typescript
interface MCPClientState {
  isConnected: boolean
  isConnecting: boolean
  tools: MCPTool[]
  error: Error | null
}
```

## MCP Server - Expose Tools as MCP Server

Use `useMCPServer` to expose application tools as an MCP Server.

```typescript
import { useMCPServer } from '@yh-ui/ai-sdk'

const { tools, isRunning, start, stop, addTool } = useMCPServer({
  name: 'my-ai-server',
  version: '1.0.0'
})

// Define tools
addTool({
  name: 'get_weather',
  description: 'Get weather for a specified city',
  inputSchema: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'City name' }
    },
    required: ['city']
  },
  execute: async ({ city }) => {
    return [{ type: 'text', text: `${city} weather today: Sunny, 25°C` }]
  }
})

// Start Server
await start()
```

### Create HTTP Handler

Quick deployment in Next.js or Express:

```typescript
// Next.js App Router
import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk'

export const GET = createMCPServerHTTPHandler({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [
    {
      name: 'search',
      description: 'Search for information',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } } },
      execute: async ({ query }) => [{ type: 'text', text: `Results for: ${query}` }]
    }
  ]
})

export const POST = GET
```

```typescript
// Express
import express from 'express'
import { createMCPServerHTTPHandler } from '@yh-ui/ai-sdk'

const app = express()

app.all('/mcp', createMCPServerHTTPHandler({
  name: 'my-ai-server',
  version: '1.0.0',
  tools: [...]
}))

app.listen(3000)
```

## Multi-Server Management

Manage multiple MCP Servers simultaneously with `useMCPTools`:

```typescript
import { useMCPTools } from '@yh-ui/ai-sdk'

const { allTools, serverStates, callTool } = useMCPTools({
  servers: [{ serverUrl: 'http://localhost:3001/mcp' }, { serverUrl: 'http://localhost:3002/mcp' }],
  autoConnect: true
})

// Tool calls are automatically routed to correct Server
const result = await callTool('tool_name', { arg: 'value' })
```

::: tip
YH-UI's MCP implementation is fully compatible with Anthropic's MCP specification and can work with Claude Desktop, Cursor, and other clients.
:::

::: warning Important Notes

1. MCP Server needs to implement JSON-RPC protocol, following the MCP specification version 2024-11-05
2. Stdio mode only works in Node.js environment; browser environment can only use HTTP mode
3. HTTP mode requires CORS configuration to ensure cross-origin requests are properly handled
4. Tool calls are asynchronous; it is recommended to add loading state to inform users

:::
