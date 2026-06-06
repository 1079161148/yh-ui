# MCP 协议

## 概述

MCP（Model Context Protocol，模型上下文协议）是一个开放标准，旨在让 AI 模型能够统一地与外部工具和服务进行交互。MCP 由 Anthropic 提出并捐赠给 Linux 基金会，获得了 OpenAI、Google、Microsoft 等多家公司的支持。

YH-UI 提供完整的 MCP 支持，包括 MCP Client（连接外部 MCP Server）和 MCP Server（将你的工具暴露为 MCP Server）。

## MCP Client - 连接外部 MCP Server

使用 `useMCPClient` 连接外部 MCP Server 并调用其工具。

```typescript
import { useMCPClient } from '@yh-ui/ai-sdk'

// HTTP 方式连接
const { state, connect, disconnect, callTool, isCallingTool } = useMCPClient({
  config: {
    serverUrl: 'http://localhost:3000/mcp',
    timeout: 30000
  },
  autoConnect: false
})

// 连接
await connect()

// 调用工具
const result = await callTool('tool_name', { arg: 'value' })
```

### Stdio 方式（Node.js）

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

| 属性                   | 类型                  | 说明          |
| ---------------------- | --------------------- | ------------- |
| `state`                | `Ref<MCPClientState>` | 连接状态      |
| `connect()`            | `Function`            | 连接到 Server |
| `disconnect()`         | `Function`            | 断开连接      |
| `callTool(name, args)` | `Function`            | 调用工具      |
| `isCallingTool`        | `Ref<boolean>`        | 是否正在调用  |

### MCPClientState

```typescript
interface MCPClientState {
  isConnected: boolean
  isConnecting: boolean
  tools: MCPTool[]
  error: Error | null
}
```

## MCP Server - 暴露工具为 MCP Server

通过 `useMCPServer` 将应用中的工具作为 MCP Server 暴露出来。

```typescript
import { useMCPServer } from '@yh-ui/ai-sdk'

const { tools, isRunning, start, stop, addTool } = useMCPServer({
  name: 'my-ai-server',
  version: '1.0.0'
})

// 定义工具
addTool({
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
    return [{ type: 'text', text: `${city} 今日天气：晴，25°C` }]
  }
})

// 启动 Server
await start()
```

### 创建 HTTP Handler

支持在 Next.js 或 Express 中快速部署：

```typescript
// Next.js App Router
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

## 多 Server 管理

通过 `useMCPTools` 同时管理多个 MCP Server：

```typescript
import { useMCPTools } from '@yh-ui/ai-sdk'

const { allTools, serverStates, callTool } = useMCPTools({
  servers: [{ serverUrl: 'http://localhost:3001/mcp' }, { serverUrl: 'http://localhost:3002/mcp' }],
  autoConnect: true
})

// 工具调用会自动路由到正确的 Server
const result = await callTool('tool_name', { arg: 'value' })
```

::: tip
YH-UI 的 MCP 实现完全兼容 Anthropic 的 MCP 规范，可与 Claude Desktop、Cursor 等客户端配合使用。
:::

::: warning 注意事项

1. MCP Server 需要实现 JSON-RPC 协议，遵循 2024-11-05 版本的 MCP 规范
2. Stdio 模式仅适用于 Node.js 环境，浏览器环境只能使用 HTTP 模式
3. HTTP 模式下需要配置 CORS，确保跨域请求被正确处理
4. 工具调用是异步的，建议添加加载状态提示用户

:::
