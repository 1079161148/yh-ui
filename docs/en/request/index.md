# @yh-ui/request

> A modern HTTP request library for enterprise applications, AI applications, and general-purpose scenarios

## Features

- **TypeScript First**: Full type inference throughout the chain, zero `any`, generics throughout request/response
- **Adapter Architecture**: Pluggable underlying implementation, unified API across platforms
- **Composition over Inheritance**: Plugin-based, middleware-based, load on demand
- **Built-in Observability**: Request ID, metrics, debug mode out of the box

## Installation

::: code-group

```bash [npm]
npm install @yh-ui/request
```

```bash [yarn]
yarn add @yh-ui/request
```

```bash [pnpm]
pnpm add @yh-ui/request
```

```bash [bun]
bun add @yh-ui/request
```

:::

## Quick Start

```typescript
import { request } from '@yh-ui/request'

// GET request
const { data } = await request.get('/api/users')

// POST request
const { data } = await request.post('/api/users', { name: 'John' })

// With generics
interface User {
  id: number
  name: string
}
const { data } = await request.get<User>('/api/users/1')
```

## Feature Overview

| Feature                             | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| [Request Config](./config)          | Complete request configuration options               |
| [Response Handling](./response)     | Response data parsing and type inference             |
| [Interceptors](./interceptors)      | Request/Response interceptors                        |
| [Cache Strategy](./cache)           | In-memory, persistent, and SWR caching               |
| [HTTP Cache Protocol](./http-cache) | ETag, Last-Modified conditional requests             |
| [Security](./security)              | CSRF protection, token auto-refresh                  |
| [Adapter](./adapter)                | Cross-platform adapters (Browser/Node/Deno/Bun/Edge) |
| [GraphQL](./graphql)                | GraphQL query builder and client                     |
| [WebSocket](./websocket)            | WebSocket connection management                      |
| [useRequest](./use-request)         | Powerful Vue request Hook                            |
| [useSSE](./use-sse)                 | Server-Sent Events streaming                         |
| [useAIStream](./use-ai-stream)      | AI streaming output support                          |

## Why @yh-ui/request?

### 1. Strict Type Safety

```typescript
// Auto-infer response type
const { data } = await request.get<User>('/api/users/1')
// data: User

// Path parameter type safety
type Params = PathParams<'/api/users/:id/:commentId'>
// => { id: string; commentId: string }
```

### 2. Powerful Hooks

```typescript
const { data, loading, error, run } = useRequest(() => fetchUser(id), {
  manual: false,
  defaultParams: [1],
  onSuccess: (data) => console.log(data)
})
```

### 3. Enterprise-Grade Features Out of the Box

- Request retry with exponential backoff
- Request deduplication and debouncing
- Concurrency control
- Upload/Download progress
- Debug mode

## Next Steps

- [Installation Guide](./install) - Detailed installation configuration
- [Basic Usage](./basic) - Quick start examples
- [Request Config](./config) - Complete configuration options
