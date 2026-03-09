# @yh-ui/request 请求库

> 面向企业应用、AI 应用及通用场景的现代化 HTTP 请求库

## 功能覆盖度

| 核心功能      |  状态   | 说明                                         |
| :------------ | :-----: | :------------------------------------------- |
| 基础请求      | ✅ 完善 | GET/POST/PUT/DELETE 等，支持泛型推导         |
| 拦截器        | ✅ 完善 | 请求/响应拦截器、错误处理                    |
| 缓存策略      | ✅ 完善 | 内存缓存、LocalStorage、IndexedDB、SWR       |
| HTTP 缓存协议 | ✅ 完善 | ETag、Last-Modified 条件请求                 |
| 重试机制      | ✅ 完善 | 指数退避、自定义重试条件                     |
| 并发控制      | ✅ 完善 | 请求去重、防抖、节流                         |
| 上传/下载     | ✅ 完善 | 进度监听、暂停/恢复                          |
| WebSocket     | ✅ 完善 | 连接管理                                     |
| GraphQL       | ✅ 完善 | 查询构建器                                   |
| 安全特性      | ✅ 完善 | CSRF 防护、Token 自动刷新                    |
| Vue Hooks     | ✅ 完善 | useRequest、useSSE、useAIStream、useQueue 等 |
| SSR 支持      | ✅ 完善 | 服务端渲染兼容                               |
| 适配器架构    | ✅ 完善 | 浏览器/Node.js/Deno/Bun/Edge 多平台适配      |
| 插件系统      | ✅ 完善 | 可扩展插件机制                               |

## 与主流对比

| 特性           |        @yh-ui/request         |     Axios      |  @tanstack/query  |
| :------------- | :---------------------------: | :------------: | :---------------: |
| 定位           |        请求库 + Hooks         | 纯 HTTP 客户端 |  服务端状态管理   |
| TypeScript     |            ✅ 优先            |    ✅ 支持     |      ✅ 支持      |
| SWR 缓存       |              ✅               | ❌ 需自行封装  |      ✅ 内置      |
| 流式响应 (SSE) |           ✅ useSSE           | ❌ 需自行封装  |        ❌         |
| AI 流式输出    |        ✅ useAIStream         |       ❌       |        ❌         |
| 请求队列       | ✅ useQueue / useRequestQueue |       ❌       |        ❌         |
| 插件系统       |              ✅               |       ❌       | ✅（devtools 等） |
| 多平台适配     |              ✅               |  ❌ 仅浏览器   |        ✅         |
| 企业级安全     |         ✅ CSRF/Token         | ❌ 需自行实现  |        ❌         |

## 核心优势

### 1. 严格的类型安全

全链路 TypeScript 类型推导，从请求到响应全程类型保护，零 `any`，告别类型错误。

```typescript
// 自动推断响应类型
const { data } = await request.get<User>('/api/users/1')
// data: User ✓

// 路径参数类型安全
type Params = PathParams<'/api/users/:id/:commentId'>
// => { id: string; commentId: string } ✓
```

### 2. 强大的 Vue Hooks

一行代码搞定加载状态、错误处理、缓存更新，告别手写重复代码。

```typescript
const { data, loading, error, run } = useRequest(() => fetchUser(id), {
  manual: false,
  defaultParams: [1],
  onSuccess: (data) => console.log(data)
})
```

### 3. 开箱即用的企业级特性

无需额外配置，请求重试、并发控制、进度监听、安全防护等企业级能力开箱即用。

- 请求重试与指数退避
- 请求去重与防抖
- 并发限制
- 上传/下载进度
- CSRF 防护与 Token 自动刷新

## 特性

- **TypeScript 优先**：全链路类型推导，零 `any`，泛型贯穿请求/响应
- **适配器架构**：可插拔底层实现，统一 API 跨平台
- **组合优于继承**：插件化、中间件化，按需加载
- **可观测性内置**：请求 ID、指标、调试模式开箱即用

## 安装

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

## 快速开始

```typescript
import { request } from '@yh-ui/request'

// GET 请求
const { data } = await request.get('/api/users')

// POST 请求
const { data } = await request.post('/api/users', { name: '张三' })

// 使用泛型
interface User {
  id: number
  name: string
}
const { data } = await request.get<User>('/api/users/1')
```

## 功能一览

| 功能                           | 描述                                     |
| ------------------------------ | ---------------------------------------- |
| [请求配置](./config)           | 完整的请求配置选项                       |
| [响应处理](./response)         | 响应数据解析和类型推断                   |
| [拦截器](./interceptors)       | 请求/响应拦截器                          |
| [缓存策略](./cache)            | 内存缓存、持久化缓存、SWR                |
| [HTTP 缓存协议](./http-cache)  | ETag、Last-Modified 条件请求             |
| [安全特性](./security)         | CSRF 防护、Token 自动刷新                |
| [适配器](./adapter)            | 跨平台适配器 (浏览器/Node/Deno/Bun/Edge) |
| [GraphQL](./graphql)           | GraphQL 查询构建器和客户端               |
| [WebSocket](./websocket)       | WebSocket 连接管理                       |
| [useRequest](./use-request)    | 强大的 Vue 请求 Hook                     |
| [useSSE](./use-sse)            | Server-Sent Events 流式请求              |
| [useAIStream](./use-ai-stream) | AI 流式输出支持                          |

## 下一步

- [安装指南](./install) - 详细安装配置
- [基础用法](./basic) - 快速入门示例
- [请求配置](./config) - 完整配置选项
