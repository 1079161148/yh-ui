# @yh-ui/request

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI Request — 企业级请求管理 Hooks</h3>

<p align="center">
  响应式请求状态 · SSE 流式支持 · 自动取消 · 重试机制 · 缓存管理 · 完整 TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/request">
    <img src="https://img.shields.io/npm/v/@yh-ui/request.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/request">
    <img src="https://img.shields.io/npm/dm/@yh-ui/request.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/request.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- ⚡ **响应式状态** — `data`、`loading`、`error` 全部是 Vue 响应式引用，无需手动管理
- 🌊 **SSE 流式支持** — 原生支持 Server-Sent Events，完美配合 AI 流式输出
- 🔄 **自动重试** — 可配置指数退避重试策略
- 🚫 **自动取消** — 组件卸载时自动中止 fetch，防止内存泄漏
- 🗄 **请求缓存** — 内置 LRU 缓存，支持 TTL 过期策略
- 🔌 **拦截器** — 支持请求/响应拦截器，方便处理鉴权、日志等
- 🌐 **SSR 安全** — 服务端环境无副作用

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/request

# npm
npm install @yh-ui/request
```

---

## 🔨 快速开始

### `useRequest` — 基础请求

```vue
<script setup lang="ts">
import { useRequest } from '@yh-ui/request'

interface User {
  id: number
  name: string
  email: string
}

const { data, loading, error, execute, refresh } = useRequest<User[]>(
  () => fetch('/api/users').then((r) => r.json()),
  {
    immediate: true, // 立即执行
    initialData: [], // 初始值
    onSuccess: (data) => console.log('成功:', data),
    onError: (err) => console.error('失败:', err)
  }
)
</script>

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-if="error">错误: {{ error.message }}</div>
    <ul v-if="data">
      <li v-for="user in data" :key="user.id">{{ user.name }}</li>
    </ul>
    <button @click="refresh">刷新</button>
  </div>
</template>
```

### `useRequest` — 高级配置

```ts
import { useRequest } from '@yh-ui/request'

const { data, loading, execute } = useRequest(fetchUserData, {
  immediate: false, // 手动触发
  retry: 3, // 失败重试 3 次
  retryDelay: 1000, // 重试间隔（支持指数退避）
  cache: true, // 开启缓存
  cacheTTL: 60000, // 缓存 60 秒
  debounce: 300, // 防抖 300ms
  throttle: 0, // 节流（ms），0 为关闭
  timeout: 10000 // 请求超时 10s
})

// 手动触发
await execute()
```

### `useSSE` — Server-Sent Events 流式

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useSSE } from '@yh-ui/request'

const messages = ref<string[]>([])

const { isConnected, connect, disconnect, error } = useSSE('/api/chat/stream', {
  onMessage: (event) => {
    const data = JSON.parse(event.data)
    if (data.done) {
      disconnect()
      return
    }
    messages.value.push(data.content)
  },
  onOpen: () => console.log('连接建立'),
  onError: (err) => console.error('SSE 错误:', err),
  // 自动重连
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5
})
</script>

<template>
  <div>
    <div class="status">{{ isConnected ? '🟢 已连接' : '🔴 未连接' }}</div>
    <button @click="connect">开始</button>
    <button @click="disconnect">停止</button>
    <div v-for="(msg, i) in messages" :key="i">{{ msg }}</div>
  </div>
</template>
```

### `usePagination` — 分页请求

```vue
<script setup lang="ts">
import { usePagination } from '@yh-ui/request'

const { data, loading, page, pageSize, total, prev, next, goTo, refresh } = usePagination(
  ({ page, pageSize }) => fetch(`/api/list?page=${page}&size=${pageSize}`).then((r) => r.json()),
  {
    initialPage: 1,
    initialPageSize: 20,
    immediate: true
  }
)
</script>

<template>
  <div>
    <table>
      <tr v-for="item in data?.list" :key="item.id">
        <td>{{ item.name }}</td>
      </tr>
    </table>
    <div class="pagination">
      <button @click="prev" :disabled="page === 1">上一页</button>
      <span>{{ page }} / {{ Math.ceil(total / pageSize) }}</span>
      <button @click="next">下一页</button>
    </div>
  </div>
</template>
```

### `useInfiniteScroll` — 无限滚动

```ts
import { ref } from 'vue'
import { useInfiniteScroll } from '@yh-ui/request'

const containerRef = ref<HTMLElement>()

const { data, loading, hasMore, loadMore } = useInfiniteScroll(
  (cursor) => fetch(`/api/feed?cursor=${cursor}`).then((r) => r.json()),
  {
    target: containerRef, // 自动监听此元素的滚动触底
    threshold: 200, // 距离底部 200px 时触发
    getCursor: (lastPage) => lastPage.nextCursor
  }
)
```

---

## ⚙️ 拦截器配置

```ts
import { createRequestInstance } from '@yh-ui/request'

const request = createRequestInstance({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  // 请求拦截器
  onRequest: (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  // 响应拦截器
  onResponse: (response) => {
    if (response.code !== 0) throw new Error(response.message)
    return response.data
  },
  // 错误拦截器
  onError: (error) => {
    if (error.status === 401) router.push('/login')
  }
})

// 在组件中使用
const { data } = useRequest(() => request.get('/users'))
```

---

## 📚 API 参考

### `useRequest(fetcher, options?)`

| 参数          | 类型                   | 默认值  | 说明                       |
| ------------- | ---------------------- | ------- | -------------------------- |
| `immediate`   | `boolean`              | `true`  | 是否立即执行               |
| `initialData` | `T \| null`            | `null`  | 初始数据值                 |
| `retry`       | `number`               | `0`     | 失败重试次数               |
| `retryDelay`  | `number`               | `1000`  | 重试延迟（ms）             |
| `cache`       | `boolean`              | `false` | 是否开启缓存               |
| `cacheTTL`    | `number`               | `0`     | 缓存有效期（ms），0 为永久 |
| `debounce`    | `number`               | `0`     | 防抖延迟（ms）             |
| `timeout`     | `number`               | `0`     | 超时时间（ms），0 为不限制 |
| `onSuccess`   | `(data: T) => void`    | —       | 成功回调                   |
| `onError`     | `(err: Error) => void` | —       | 失败回调                   |
| `onFinally`   | `() => void`           | —       | 完成回调                   |

### 返回值

| 属性/方法          | 类型                 | 说明                 |
| ------------------ | -------------------- | -------------------- |
| `data`             | `Ref<T \| null>`     | 响应数据             |
| `loading`          | `Ref<boolean>`       | 加载状态             |
| `error`            | `Ref<Error \| null>` | 错误信息             |
| `execute(...args)` | `Promise<T>`         | 手动执行             |
| `refresh()`        | `Promise<T>`         | 使用上次参数重新执行 |
| `abort()`          | `void`               | 中止当前请求         |
| `reset()`          | `void`               | 重置状态到初始值     |

---

## ⚠️ 注意事项

- **自动中止**：组件卸载时会自动调用 `abort()`，无需手动清理
- **SSR**：`useSSE`、`useInfiniteScroll` 在服务端不会自动连接，仅在 `onMounted` 后激活
- **并发请求**：默认取消上一次未完成的请求（竞态条件保护），可通过 `cancelPrevious: false` 关闭

---

## 🔗 相关资源

- [📖 官方文档](https://1079161148.github.io/yh-ui/)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
