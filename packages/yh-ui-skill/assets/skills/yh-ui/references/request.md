# Request Hooks

Use `@yh-ui/request` for request clients, Vue request state, streaming events, pagination, queues, GraphQL, WebSocket, and HTTP cache helpers.

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
const { data, loading, error, refresh, run } = useRequest<User[]>(() => api.get<User[]>('/users'))
</script>

<template>
  <YhButton :loading="loading" @click="refresh">Refresh</YhButton>
  <YhButton @click="run()">Run</YhButton>
  <pre v-if="error">{{ error.message }}</pre>
  <ul>
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

## SSE

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

## Agent Rules

- Use `createRequest`, not old names.
- Prefer `useRequest` for component state instead of manually maintaining `loading`, `data`, and `error`.
- Use `useSSE` or `useAIStream` for streaming responses.
- Use pagination/load-more hooks when building list pages.
- Keep auth token handling in request interceptors or server middleware.
