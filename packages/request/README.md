# @yh-ui/request

YH-UI 的 Vue 3 请求管理包。它基于 Fetch 和 Composition API，把请求实例、拦截器、重试、取消、缓存、SSE、AI Stream、分页、队列、GraphQL、WebSocket 和 HTTP 缓存协议整理成可组合的 API。

[Documentation](https://1079161148.github.io/yh-ui/) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 请求实例：`Request`、`request`、`createRequest` 提供 baseURL、params、headers、timeout、retry、abort 和拦截器能力。
- Vue Hooks：`useRequest`、`useRequestSWR`、`useRequestPolling`、`usePagination`、`useLoadMore` 处理页面常见数据状态。
- 流式能力：`useSSE` 和 `useAIStream` 适合通知推送、日志输出和 AI 增量响应。
- 并发控制：`useQueue`、`useRequestQueue` 用于限制并发、排队执行和管理批量任务。
- 协议扩展：导出 adapters、cache、interceptors、graphql、websocket、http-cache，便于统一企业接口层。
- TypeScript 友好：请求参数、响应数据、错误对象和 hook 返回值都有类型声明。

## Install

```bash
pnpm add @yh-ui/request
```

## Request Instance

```ts
import { createRequest } from '@yh-ui/request'

const api = createRequest({
  baseURL: '/api',
  timeout: 10000,
  retry: 2
})

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getToken()}`
  }
  return config
})

const users = await api.get('/users')
```

## useRequest

```vue
<script setup lang="ts">
import { createRequest, useRequest } from '@yh-ui/request'

interface User {
  id: number
  name: string
}

const api = createRequest({ baseURL: '/api' })

const { data, loading, error, refresh, run } = useRequest<User[]>(() => api.get<User[]>('/users'), {
  manual: false,
  onSuccess: (users) => console.log(users.length)
})
</script>

<template>
  <button :disabled="loading" @click="refresh">Refresh</button>
  <button @click="run()">Run</button>
  <pre v-if="error">{{ error.message }}</pre>
  <ul>
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

## Streaming

```ts
import { useSSE } from '@yh-ui/request'

const { isConnected, connect, disconnect, error } = useSSE('/api/events', {
  reconnect: true,
  reconnectInterval: 3000,
  onMessage: (event) => {
    console.log(event.data)
  }
})
```

## License

MIT
