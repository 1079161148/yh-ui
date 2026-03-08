# useRequestSWR

`useRequestSWR` is not a separate Hook, but a usage pattern based on `useRequest`: by enabling `swr`, configuring `cacheKey` / `staleTime` and other parameters, it implements the **Stale-While-Revalidate** strategy - return cached data first, then revalidate in the background.

## Basic Pattern: useRequest + SWR

```typescript
import { useRequest } from '@yh-ui/request'

const userId = ref(1)

const { data, loading, refresh } = useRequest(
  () => request.get<User>(`/api/users/${userId.value}`),
  {
    // Enable SWR mode
    swr: true,

    // Cache key (should be related to business meaning)
    cacheKey: `user_${userId.value}`,

    // Data fresh time: won't re-request within 5 minutes
    staleTime: 5 * 60 * 1000,

    // Cache retention: can be recovered from cache within 10 minutes
    cacheTime: 10 * 60 * 1000,

    // Auto refresh on window focus
    refreshOnWindowFocus: true,

    // Auto refresh when dependencies change
    refreshDeps: [userId]
  }
)
```

> You can understand "useRequest + `swr: true`" as the **useRequestSWR** mode in the documentation.

## Options Reference

```typescript
interface UseRequestSWROptions<TData, TParams extends any[]> extends UseRequestOptions<
  TData,
  TParams
> {
  swr?: boolean // Enable SWR mode
  cacheKey?: string // Cache key
  staleTime?: number // Data freshness time (ms)
  cacheTime?: number // Cache retention time (ms)
  getCache?: (key: string) => TData | undefined
  setCache?: (key: string, value: TData) => void
  refreshOnWindowFocus?: boolean
  refreshDepsWait?: number // Debounce time for dependency changes
  refreshDeps?: Ref<any>[]
}
```

### Recommended Settings

- **List / Config APIs**: Set `staleTime` to 5~30 minutes
- **Detail APIs**: `staleTime` depends on business, typically 1~5 minutes
- **Real-time data (stocks, monitoring)**: Not recommended to enable SWR, or `staleTime = 0`

## List Scenario Example

```typescript
const filters = reactive({
  page: 1,
  pageSize: 20,
  status: 'active'
})

const { data, loading, refresh } = useRequest(
  () =>
    request.get<ListResult>('/api/users', {
      params: filters
    }),
  {
    swr: true,
    cacheKey: () => `users_${filters.page}_${filters.pageSize}_${filters.status}`,
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refreshDeps: [toRef(filters, 'status')]
  }
)
```

## Manual Cache Control

You can also use custom cache implementations (like Pinia / IndexedDB) through `getCache` / `setCache`.

```typescript
import { reactive } from 'vue'

const cacheStore = reactive(new Map<string, unknown>())

const { data } = useRequest(() => request.get('/api/config'), {
  swr: true,
  cacheKey: 'app_config',
  getCache: (key) => cacheStore.get(key),
  setCache: (key, value) => cacheStore.set(key, value)
})
```

## Combine with Pagination / Load More

In pagination or load more scenarios, specialized Hooks are usually recommended:

- [usePagination](./use-pagination) - Traditional paginated list
- [useLoadMore](./use-load-more) - Infinite scroll / load more

In these scenarios, SWR is more suitable as a caching strategy for "detail pages" or "config data".

## Summary

- **useRequestSWR** = `useRequest` + `swr: true` + appropriate cache configuration
- Suitable for **read-many, write-less** APIs with moderate real-time requirements but not needing to hit the backend every time
- Fully compatible with regular `useRequest`, just adds a layer of caching and refresh strategy
