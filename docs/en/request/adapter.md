# Adapters

`@yh-ui/request` uses an adapter architecture to decouple **request invocation** from **underlying implementation**, theoretically allowing free switching of implementations across different runtimes like browser, Node, Deno, etc.

Currently, it comes with built-in `FetchAdapter` and `XHRAdapter`, and exposes a unified `HttpAdapter` interface for advanced users to customize extensions.

## HttpAdapter Interface

```typescript
export interface HttpAdapter {
  /** Adapter name */
  name: string
  /** Whether the current environment supports it */
  isSupported(): boolean
  /** Send request */
  request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>>
}
```

## Built-in Adapters

### FetchAdapter

Suitable for **modern browsers / Node 18+**, based on native `fetch`.

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

Core implementation points:

- Automatically calls `response.text()/blob()/arrayBuffer()/formData()/json()` based on `responseType`;
- Serializes object request body as `application/json` by default;
- Sends request via `config.fullPath` with `credentials` / `signal` and other configurations.

### XHRAdapter

Compatible with legacy browsers, based on `XMLHttpRequest`.

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

Built-in handling:

- Sets `responseType`;
- Supports `timeout` / `withCredentials`;
- Treats non-2xx status as errors.

### getDefaultAdapter

```typescript
import { getDefaultAdapter } from '@yh-ui/request'

const adapter = getDefaultAdapter()
// Returns FetchAdapter in browser/Node environment, falls back to XHRAdapter otherwise
```

## Custom Adapter (Advanced Usage)

You can implement your own adapters to integrate:

- Custom underlying HTTP clients (like axios, node-fetch, Got, etc.);
- Special runtimes (Electron, React Native, etc.).

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
      // Can wrap as similar to Fetch Response structure as needed
      response: res as any,
      config,
      requestId: config.requestId!
    }
  }
}
```

> Tip: The core `Request` class currently uses native `fetch` by default. The adapter interface mainly faces **advanced extensions** and future evolution. It is recommended to centrally use adapters in the request encapsulation layer, not directly call them throughout business code.

## Cross-Platform Adapters

`@yh-ui/request` supports multiple runtime platforms, automatically detecting the current environment and selecting the best adapter.

### Platform Detection

```typescript
import { detectPlatform, platform } from '@yh-ui/request'

// Get current platform info
const info = detectPlatform()
console.log(info)
// {
//   environment: 'browser' | 'node' | 'deno' | 'bun' | 'edge',
//   supportsFetch: boolean,
//   supportsFormData: boolean,
//   supportsAbortController: boolean
// }

// Or use global platform object
console.log(platform.environment)
```

### Auto-Select Adapter

```typescript
import { getBestAdapter } from '@yh-ui/request'

// Auto-select best adapter
const adapter = getBestAdapter()
// Returns corresponding adapter instance based on environment
```

### Platform-Specific Adapters

#### NodeHttpAdapter

Suitable for **Node.js** environment, using native `http` / `https` modules without additional dependencies.

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

Features:

- Supports HTTP/HTTPS
- Supports custom timeout
- Supports proxy configuration
- Supports self-signed certificates (optional)

#### DenoAdapter

Suitable for **Deno** environment, using Deno standard library `fetch`.

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

Suitable for **Bun** environment, using Bun native `fetch` and `FormData`.

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

Suitable for edge computing environments like **Cloudflare Workers**, **Vercel Edge**, **Deno Deploy**, etc.

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

Features:

- Lightweight implementation
- Supports streaming responses
- Optimized memory usage

### Manual Adapter Selection

```typescript
import { getAdapter, createRequest } from '@yh-ui/request'

// Manually specify adapter
const nodeAdapter = getAdapter('node')
const request = createRequest({
  adapter: nodeAdapter
})
```

### SSR Environment Recommendations

| Environment | Recommended Adapter |
| ----------- | ------------------- |
| Browser     | FetchAdapter        |
| Node.js     | NodeHttpAdapter     |
| Deno        | DenoAdapter         |
| Bun         | BunAdapter          |
| Edge        | EdgeAdapter         |

## Relationship with Other Features

- **Interceptors**: Works independent of adapters, operates before/after requests;
- **Cache / Queue / Hooks**: All based on unified `RequestResponse` structure, decoupled from specific adapters;
- **Debug / Monitoring**: Can embed points in adapters, or handle uniformly through interceptors.
