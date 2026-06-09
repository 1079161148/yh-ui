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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // Automatic JWT token refresh flow
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { token } = await api.post('/auth/refresh')
        localStorage.setItem('token', token)
        originalRequest.headers['Authorization'] = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // Redirect to login or clear token on fail
        localStorage.removeItem('token')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
```

## useRequest

```vue
<script setup lang="ts">
import { createRequest, useRequest } from '@yh-ui/request'
import { YhButton, YhMessage } from '@yh-ui/components'

interface User {
  id: number
  name: string
}

const api = createRequest({ baseURL: '/api' })

// useRequest returns reactive state and trigger helpers
const { data, loading, error, refresh, run } = useRequest<User[]>(() => api.get<User[]>('/users'), {
  immediate: true,
  onSuccess: (data) => {
    YhMessage.success(`Loaded ${data.length} users successfully`)
  },
  onError: (err) => {
    YhMessage.error(`Failed to load users: ${err.message}`)
  }
})
</script>

<template>
  <div class="action-bar">
    <YhButton :loading="loading" type="primary" @click="refresh">Refresh</YhButton>
    <YhButton @click="run()">Force Run</YhButton>
  </div>

  <div v-if="loading" class="loading-state">Loading users...</div>
  <div v-else-if="error" class="error-state">{{ error.message }}</div>
  <ul v-else class="user-list">
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

## SSE (Server-Sent Events)

Use `useSSE` for real-time streaming notifications, logs, or updates. It handles connection lifecycles, retries, and errors automatically:

```vue
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useSSE } from '@yh-ui/request'

interface EventPayload {
  msg: string
  time: string
}

const events = ref<EventPayload[]>([])

const { isConnected, connect, disconnect, error } = useSSE('/api/events', {
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5,
  onMessage: (event) => {
    const payload = JSON.parse(event.data) as EventPayload
    events.value.push(payload)
  },
  onError: (err) => {
    console.error('SSE Error:', err)
  }
})

// Always clean up connections when component is unmounted
onUnmounted(() => {
  disconnect()
})
</script>

<template>
  <div>
    <p
      >Status:
      <span :class="{ connected: isConnected }">{{
        isConnected ? 'Connected' : 'Disconnected'
      }}</span></p
    >
    <p v-if="error">Connection error: {{ error.message }}</p>
    <ul>
      <li v-for="item in events" :key="item.time">[{{ item.time }}] {{ item.msg }}</li>
    </ul>
  </div>
</template>
```

## Agent Rules

- Use `createRequest`, not old/legacy API clients.
- Always prefer `useRequest` for fetching state in Vue components instead of manual `ref(true)` loading flags.
- Use `useSSE` for server streaming logs/updates, and make sure to clean up connection via `disconnect()` in `onUnmounted`.
- Place global request interception logic (like auth header additions) inside the central request client, not scattered around views.
