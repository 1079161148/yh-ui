# SSR 使用

`@yh-ui/request` 在设计上兼顾 **客户端 SPA** 与 **Nuxt / 自建 SSR** 场景，提供了适合服务端渲染的使用方式与注意事项。

## 基础原则

- **避免在模块顶层直接发请求**，始终在组件 / 路由钩子 / 服务端处理函数中按需调用；
- 服务端环境下一般只使用 **一次性请求**，不使用浏览器特有能力（如 `window`、`document`、localStorage、IndexedDB 等）；
- 在 SSR 中推荐通过 **工厂函数创建 request 实例**，避免跨请求共享状态。

## 在 Nuxt 中使用

以 Nuxt 3 为例，推荐封装一个 composable：

```typescript
// composables/useRequestClient.ts
import { createRequest } from '@yh-ui/request'

export function useRequestClient() {
  const config = useRuntimeConfig()

  const request = createRequest({
    baseURL: config.public.apiBase,
    defaultOptions: {
      credentials: 'include',
      timeout: 30000
    }
  })

  return request
}
```

在组件 / 页面中使用：

```typescript
const request = useRequestClient()

const { data } = await request.get('/api/users')
```

### 结合 `useAsyncData`

```typescript
const request = useRequestClient()

const { data, pending, error } = await useAsyncData('users', () =>
  request.get<User[]>('/api/users').then((res) => res.data)
)
```

## 与 useRequest 组合

在 SSR 场景中，一般不建议在 **服务端** 使用 `useRequest`（因为 Hook 依赖 Vue 运行时），而是在：

- 服务端：使用 `createRequest` 直接发请求；
- 客户端 hydration 完成后：再使用 `useRequest` 管理后续交互。

示例：通过初始化数据避免首屏闪烁：

```typescript
// server: 通过 useAsyncData 预取
const request = useRequestClient()
const { data: initial } = await useAsyncData('users', () =>
  request.get<User[]>('/api/users').then((res) => res.data)
)

// client: hydrate 后用 useRequest 承接
const { data, loading, refresh } = useRequest(() => request.get<User[]>('/api/users'), {
  manual: false,
  // 使用服务器返回的数据作为初始值
  formatResult: (response) => response.data
})
```

## CSRF / Token 与 SSR

- CSRF Token：建议通过 `cookie` 传递，拦截器中通过 `document.cookie` 读取仅在浏览器端生效；
- Token 刷新：服务端请求通常使用 **服务账号 / 内部鉴权**，不适合走浏览器的刷新逻辑；
- SSR 渲染阶段，尽量只做 **读操作**，避免副作用接口（写入、删除等）。

## 常见陷阱

### 1. 在模块顶层直接使用 useRequest

```typescript
// ❌ 不要这样写（在 SSR 中会报错）
const { data } = useRequest(() => request.get('/api/users'))
```

原因：Hook 只能在 `setup` 中执行，并且在服务端多请求场景下会产生共享状态问题。

### 2. 访问 window / document

在拦截器或 Hook 内部如果需要访问浏览器 API，应增加环境判断：

```typescript
if (typeof window !== 'undefined') {
  // 浏览器环境
}
```

### 3. 使用 localStorage / IndexedDB 缓存

服务端渲染阶段无法使用这些 API，可以：

- 在浏览器端启用缓存（如 MemoryCache / localStorage / IndexedDB）；
- 在服务端只读一次真实数据，交给浏览器接管后再启用缓存策略。

## 总结建议

- SSR 阶段：推荐直接使用 `createRequest` + `useAsyncData` 完成首屏数据获取；
- 客户端激活后：使用 `useRequest` / `usePagination` / `useAIStream` 等 Hook 管理后续交互；
- 注意区分服务端 / 客户端环境，避免在 SSR 阶段调用浏览器特有 API。
