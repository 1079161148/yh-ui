# SSR Usage

`@yh-ui/request` is designed for both **client-side SPA** and **Nuxt / custom SSR** scenarios, providing usage methods and precautions suitable for server-side rendering.

## Basic Principles

- **Avoid making requests directly at the module level**, always call on-demand in components / route hooks / server-side processing functions;
- In server-side environment, generally only use **one-time requests**, avoid browser-specific capabilities (like `window`, `document`, localStorage, IndexedDB, etc.);
- In SSR, it is recommended to create request instances through **factory functions** to avoid cross-request shared state.

## Use in Nuxt

Take Nuxt 3 as an example, it is recommended to encapsulate a composable:

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

Use in components / pages:

```typescript
const request = useRequestClient()

const { data } = await request.get('/api/users')
```

### Combine with useAsyncData

```typescript
const request = useRequestClient()

const { data, pending, error } = await useAsyncData('users', () =>
  request.get<User[]>('/api/users').then((res) => res.data)
)
```

## Combine with useRequest

In SSR scenarios, it is generally not recommended to use `useRequest` on the **server side** (because Hooks depend on Vue runtime). Instead:

- Server side: Use `createRequest` directly to make requests;
- After client hydration completes: Use `useRequest` to manage subsequent interactions.

Example: Use server data to avoid first-screen flicker:

```typescript
// server: Prefetch via useAsyncData
const request = useRequestClient()
const { data: initial } = await useAsyncData('users', () =>
  request.get<User[]>('/api/users').then((res) => res.data)
)

// client: Use useRequest to take over after hydrate
const { data, loading, refresh } = useRequest(() => request.get<User[]>('/api/users'), {
  manual: false,
  // Use server-returned data as initial value
  formatResult: (response) => response.data
})
```

## CSRF / Token and SSR

- CSRF Token: Recommended to pass through `cookie`, reading in interceptor only works on browser side;
- Token refresh: Server-side requests usually use **service account / internal authentication**, not suitable for browser refresh logic;
- In SSR rendering phase, try to only do **read operations**, avoid side-effect interfaces (write, delete, etc.).

## Common Pitfalls

### 1. Use useRequest directly at module level

```typescript
// ❌ Don't write like this (will error in SSR)
const { data } = useRequest(() => request.get('/api/users'))
```

Reason: Hooks can only execute in `setup` and will cause shared state issues in multi-request scenarios on server.

### 2. Access window / document

If browser APIs need to be accessed in interceptors or Hooks, add environment checks:

```typescript
if (typeof window !== 'undefined') {
  // Browser environment
}
```

### 3. Use localStorage / IndexedDB Cache

These APIs cannot be used during server-side rendering. You can:

- Enable cache in browser (like MemoryCache / localStorage / IndexedDB);
- On server, read real data once, then let browser take over and enable cache strategy.

## Summary Recommendations

- SSR phase: Recommended to use `createRequest` + `useAsyncData` to complete first-screen data fetching;
- After client hydration: Use `useRequest` / `usePagination` / `useAIStream` and other Hooks to manage subsequent interactions;
- Pay attention to distinguish server / client environments, avoid calling browser-specific APIs in SSR phase.
