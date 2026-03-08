# 适配器（Adapter）

`@yh-ui/request` 采用适配器架构，将 **请求调用** 与 **底层实现** 解耦，理论上可以在浏览器、Node、Deno 等不同运行时间自由切换实现。

当前版本内置了 `FetchAdapter` 和 `XHRAdapter`，并暴露了统一的 `HttpAdapter` 接口，方便高级用户自定义扩展。

## HttpAdapter 接口

```typescript
export interface HttpAdapter {
  /** 适配器名称 */
  name: string
  /** 是否支持当前环境 */
  isSupported(): boolean
  /** 发送请求 */
  request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>>
}
```

## 内置适配器

### FetchAdapter

适用于 **现代浏览器 / Node 18+**，基于原生 `fetch` 实现。

```typescript
import { FetchAdapter } from '@yh-ui/request'

const adapter = new FetchAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: '/api/users/1',
    method: 'GET',
    responseType: 'json'
  } as any)
  console.log(res.data)
}
```

核心实现要点：

- 自动根据 `responseType` 调用 `response.text()/blob()/arrayBuffer()/formData()/json()`；
- 默认以 `application/json` 序列化对象请求体；
- 通过 `config.fullPath` 发送请求，并附带 `credentials` / `signal` 等配置。

### XHRAdapter

兼容旧版浏览器的适配器，基于 `XMLHttpRequest`。

```typescript
import { XHRAdapter } from '@yh-ui/request'

const adapter = new XHRAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: '/api/users/1',
    method: 'GET',
    responseType: 'json'
  } as any)
  console.log(res.data)
}
```

内置处理：

- 设置 `responseType`；
- 支持 `timeout` / `withCredentials`；
- 将非 2xx 状态视为错误。

### getDefaultAdapter

```typescript
import { getDefaultAdapter } from '@yh-ui/request'

const adapter = getDefaultAdapter()
// 浏览器 / Node 环境下优先返回 FetchAdapter，否则退回 XHRAdapter
```

## 自定义适配器（高级用法）

你可以实现自己的适配器来接入：

- 自定义底层 HTTP 客户端（如 axios、node-fetch、Got 等）；
- 特殊运行时（Electron、React Native 等）。

```typescript
import type { HttpAdapter, InternalRequestOptions, RequestResponse } from '@yh-ui/request'

class AxiosAdapter implements HttpAdapter {
  name = 'axios'

  isSupported() {
    return true
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const axiosConfig = {
      url: config.fullPath,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.credentials === 'include'
    }

    const res = await axios.request<T>(axiosConfig)
    return {
      data: res.data,
      // 这里可以根据需要包装为类似 Fetch Response 的结构
      response: res as any,
      config,
      requestId: config.requestId!
    }
  }
}
```

> 提示：当前版本核心 `Request` 类内部默认使用原生 `fetch`，适配器接口主要面向 **高级扩展** 和未来演进。建议在项目中通过封装层集中使用适配器，而不要在业务代码中到处直接调用。

## 跨平台适配器

`@yh-ui/request` 支持多种运行平台，自动检测当前环境并选择最佳适配器。

### 平台检测

```typescript
import { detectPlatform, platform } from '@yh-ui/request'

// 获取当前平台信息
const info = detectPlatform()
console.log(info)
// {
//   environment: 'browser' | 'node' | 'deno' | 'bun' | 'edge',
//   supportsFetch: boolean,
//   supportsFormData: boolean,
//   supportsAbortController: boolean
// }

// 或使用全局 platform 对象
console.log(platform.environment)
```

### 自动选择适配器

```typescript
import { getBestAdapter } from '@yh-ui/request'

// 自动选择最佳适配器
const adapter = getBestAdapter()
// 根据环境返回对应的适配器实例
```

### 平台专用适配器

#### NodeHttpAdapter

适用于 **Node.js** 环境，使用原生 `http` / `https` 模块，无需额外依赖。

```typescript
import { NodeHttpAdapter } from '@yh-ui/request'

const adapter = new NodeHttpAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: 'https://api.example.com/users/1',
    method: 'GET'
  })
}
```

特性：

- 支持 HTTP/HTTPS
- 支持自定义超时
- 支持代理配置
- 支持自签名证书（可选）

#### DenoAdapter

适用于 **Deno** 环境，利用 Deno 标准库 `fetch`。

```typescript
import { DenoAdapter } from '@yh-ui/request'

const adapter = new DenoAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: 'https://api.example.com/users/1',
    method: 'GET'
  })
}
```

#### BunAdapter

适用于 **Bun** 环境，利用 Bun 原生 `fetch` 和 `FormData`。

```typescript
import { BunAdapter } from '@yh-ui/request'

const adapter = new BunAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: 'https://api.example.com/users/1',
    method: 'GET'
  })
}
```

#### EdgeAdapter

适用于边缘计算环境，如 **Cloudflare Workers**、**Vercel Edge**、**Deno Deploy** 等。

```typescript
import { EdgeAdapter } from '@yh-ui/request'

const adapter = new EdgeAdapter()

if (adapter.isSupported()) {
  const res = await adapter.request<User>({
    url: 'https://api.example.com/users/1',
    method: 'GET'
  })
}
```

特性：

- 轻量级实现
- 支持流式响应
- 优化内存使用

### 手动选择适配器

```typescript
import { getAdapter, createRequest } from '@yh-ui/request'

// 手动指定适配器
const nodeAdapter = getAdapter('node')
const request = createRequest({
  adapter: nodeAdapter
})
```

### SSR 环境建议

| 环境     | 推荐适配器      |
| -------- | --------------- |
| 浏览器   | FetchAdapter    |
| Node.js  | NodeHttpAdapter |
| Deno     | DenoAdapter     |
| Bun      | BunAdapter      |
| 边缘计算 | EdgeAdapter     |

## 适配器与其他特性的关系

- **拦截器**：与适配器无关，工作在请求前后；
- **缓存 / 队列 / Hook**：都基于统一的 `RequestResponse` 结构，与具体适配器解耦；
- **调试 / 监控**：可以在适配器内埋点，也可以通过拦截器统一处理。
