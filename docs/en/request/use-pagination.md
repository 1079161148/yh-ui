# usePagination

`usePagination` is a Hook designed for traditional paginated list scenarios, handling **page number, total count, loading state** and other logic, allowing you to focus on rendering tables or lists.

## Basic Usage

```typescript
import { usePagination } from '@yh-ui/request'

interface UserListResult {
  list: User[]
  total: number
}

const {
  current, // Current page number
  pageSize, // Items per page
  total, // Total count
  totalPages, // Total pages
  data, // ShallowRef<UserListResult | undefined>
  loading,
  pagination // Pagination method collection
} = usePagination<UserListResult>(
  // service: (page, pageSize) => Promise<RequestResponse<T>>
  (page, size) =>
    request.get('/api/users', {
      params: { page, pageSize: size }
    }),
  {
    defaultPagination: {
      current: 1,
      pageSize: 10
    }
  }
)
```

Template example (with YH-UI Pagination):

```vue
<template>
  <yh-table :data="data?.list || []" />

  <yh-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="total"
    @change="pagination.loadPage"
  />
</template>
```

## Return Values

```typescript
const result = usePagination<TData, TParams>(service, options)
```

| Field                          | Type                             | Description                                              |
| ------------------------------ | -------------------------------- | -------------------------------------------------------- |
| `current`                      | `Ref<number>`                    | Current page                                             |
| `pageSize`                     | `Ref<number>`                    | Items per page                                           |
| `total`                        | `Ref<number>`                    | Total records                                            |
| `totalPages`                   | `Ref<number>`                    | Total pages                                              |
| `data`                         | `ShallowRef<TData \| undefined>` | Response data (usually contains `list` and `total`)      |
| `loading`                      | `Ref<boolean>`                   | Loading                                                  |
| `refreshing`                   | `Ref<boolean>`                   | Refreshing                                               |
| `loadingMore`                  | `Ref<boolean>`                   | Loading more (used with other Hooks)                     |
| `error`                        | `ShallowRef<unknown>`            | Error                                                    |
| `params`                       | `Ref<TParams>`                   | Extra params                                             |
| `noMore`                       | `Ref<boolean>`                   | Whether there's no more data                             |
| `pagination.loadPage(page)`    | `(page: number) => void`         | Load specified page                                      |
| `pagination.nextPage()`        | `() => void`                     | Next page                                                |
| `pagination.prevPage()`        | `() => void`                     | Previous page                                            |
| `pagination.firstPage()`       | `() => void`                     | First page                                               |
| `pagination.lastPage()`        | `() => void`                     | Last page                                                |
| `pagination.refresh()`         | `() => void`                     | Refresh current page                                     |
| `pagination.setPageSize(size)` | `(size: number) => void`         | Change items per page and auto refresh (non-manual mode) |
| `pagination.setTotal(total)`   | `(total: number) => void`        | Manually set total count                                 |

## Options

```typescript
interface UsePaginationOptions<TData, TParams extends unknown[]> {
  service: (...args: TParams) => Promise<RequestResponse<TData>>
  defaultPagination?: PaginationOptions // Default pagination params
  request?: Request // Custom request instance (reserved)
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // Manual trigger
  defaultParams?: TParams // Extra params
}
```

Common usage:

```typescript
const { current, pageSize, total, data, loading, pagination } = usePagination(
  (page, size, keyword: string) =>
    request.get('/api/users', { params: { page, pageSize: size, keyword } }),
  {
    defaultPagination: { current: 1, pageSize: 20 },
    defaultParams: [''], // Third param keyword
    onSuccess: (res) => {
      console.log('List loaded successfully', res)
    }
  }
)
```

> The first two parameters of `service` are fixed as `(current, pageSize)`, additional params can be passed through `defaultParams` / manually modifying `params`.

## Manual Mode

```typescript
const state = reactive({
  keyword: ''
})

const { current, pageSize, total, data, loading, pagination, params } = usePagination<
  UserListResult,
  [number, number, string]
>(
  (page, size, keyword) => request.get('/api/users', { params: { page, pageSize: size, keyword } }),
  {
    manual: true,
    defaultPagination: { current: 1, pageSize: 10 },
    defaultParams: [1, 10, ''] // [page, size, keyword]
  }
)

// Manually load
const load = () => {
  params.value = [current.value, pageSize.value, state.keyword]
  pagination.refresh()
}
```

## Difference from useRequest

- `useRequest`: More generic, suitable for various single requests / debounce / throttle / SWR, etc.
- `usePagination`: Specifically handles pagination logic, more suitable for typical "list + pagination" scenarios

## Related Hooks

- [useLoadMore](./use-load-more) - Infinite scroll / load more
- [useQueue](./use-queue) - Request queue / concurrency control
