# useRequestSWR

`useRequestSWR` is a Vue Hook specifically designed to implement the **Stale-While-Revalidate** cache strategy (return cache first, then revalidate in the background). On first load or when parameters change, it prioritizes showing cached stale data, while quietly executing a network request in the background to fetch the latest data (revalidate) and automatically update, providing a smooth user experience.

## Basic Usage

```typescript
import { useRequestSWR } from '@yh-ui/request'

const userId = ref(1)

const { data, loading, refresh } = useRequestSWR(
  // First parameter: cacheKey (can be a string or a function returning a string)
  () => `user_${userId.value}`,
  // Second parameter: service request function, receiving current cacheKey as the first argument
  (key) => request.get<User>(`/api/users/${userId.value}`),
  // Third parameter: configuration options
  {
    // Data freshness: won't re-request if within 5 minutes
    staleTime: 5 * 60 * 1000,

    // Cache retention: can be recovered from cache within 10 minutes
    cacheTime: 10 * 60 * 1000,

    // Auto-refresh on window focus
    refreshOnWindowFocus: true,

    // Auto-refresh when dependencies change
    refreshDeps: [userId]
  }
)
```

## Options Reference

```typescript
export interface UseRequestSWROptions<TData, TParams extends unknown[]> extends UseRequestOptions<
  TData,
  TParams
> {
  swr?: boolean // Whether to enable SWR mode
  cacheKey?: string // Cache key
  staleTime?: number // Data freshness time (ms)
  cacheTime?: number // Cache retention time (ms)
  getCache?: (key: string) => TData | undefined // Custom read cache function
  setCache?: (key: string, value: TData) => void // Custom write cache function
  refreshOnWindowFocus?: boolean // Whether to re-request on window focus
  refreshDepsWait?: number // Debounce time for dependency changes
  refreshDeps?: Ref<unknown>[] // Associated dependency array
}
```

### Recommended Settings

- **List / Config APIs**: Set `staleTime` to 5~30 minutes.
- **Detail APIs**: Depending on business logic, typically 1~5 minutes.
- **Real-time data (e.g. stocks, monitoring)**: SWR is not recommended, or set `staleTime = 0`.

## List Scenario Example

```typescript
const filters = reactive({
  page: 1,
  pageSize: 20,
  status: 'active'
})

const { data, loading, refresh } = useRequestSWR(
  () => `users_${filters.page}_${filters.pageSize}_${filters.status}`,
  (key) =>
    request.get<ListResult>('/api/users', {
      params: filters
    }),
  {
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refreshDeps: [toRef(filters, 'status')]
  }
)
```

## Manual Cache Control

You can also use custom cache implementations (such as Pinia / IndexedDB, etc.) through `getCache` / `setCache`.

```typescript
import { reactive } from 'vue'

const cacheStore = reactive(new Map<string, unknown>())

const { data } = useRequestSWR('app_config', (key) => request.get('/api/config'), {
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

- **useRequestSWR** supports seamlessly fetching stale data on initial render and parameter updates, then revalidating in the background, resolving white-screen issues caused by uncached reads.
- Suitable for **read-many, write-less** scenarios, where real-time requirements are low, and hitting the backend every time is undesirable.
- Supports independent lifecycles and reactive dependency updates.
