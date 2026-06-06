# useLoadMore

`useLoadMore` is used for implementing **load more / infinite scroll** scenarios: load first page of data, then continuously append subsequent data through buttons or scroll bars.

## Basic Usage

```typescript
import { useLoadMore } from '@yh-ui/request'

interface UserList {
  list: User[]
  total: number
}

const {
  data, // ShallowRef<UserList | undefined>
  loading, // First load state
  loadingMore, // Load more state
  noMore, // Whether there's no more
  loadMore, // Load more
  reload // Reload (reset pagination)
} = useLoadMore<UserList>(
  (page, pageSize) =>
    request.get('/api/users', {
      params: { page, pageSize }
    }),
  {
    initialPage: 1,
    pageSize: 10
  }
)
```

Template example:

```vue
<template>
  <yh-list :data="data?.list || []" />

  <div style="margin-top: 16px; text-align: center;">
    <yh-button type="primary" :loading="loadingMore" :disabled="noMore" @click="loadMore">
      {{ noMore ? 'No more' : 'Load more' }}
    </yh-button>
  </div>
</template>
```

## Return Values

```typescript
const result = useLoadMore<TData>(service, options)
```

| Field         | Type                             | Description                                                                     |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `current`     | `Ref<number>`                    | Current page                                                                    |
| `pageSize`    | `Ref<number>`                    | Items per page                                                                  |
| `total`       | `Ref<number>`                    | Total count                                                                     |
| `totalPages`  | `Ref<number>`                    | Total pages                                                                     |
| `data`        | `ShallowRef<TData \| undefined>` | Data (usually array or object with list)                                        |
| `loading`     | `Ref<boolean>`                   | First screen loading                                                            |
| `refreshing`  | `Ref<boolean>`                   | Refreshing                                                                      |
| `loadingMore` | `Ref<boolean>`                   | Loading more                                                                    |
| `error`       | `ShallowRef<unknown>`            | Error                                                                           |
| `params`      | `Ref<unknown[]>`                 | Extra params                                                                    |
| `noMore`      | `Ref<boolean>`                   | Whether there's no more                                                         |
| `canLoadMore` | `Ref<boolean>`                   | Whether can load more                                                           |
| `loadMore()`  | —                                | Load next page and append data                                                  |
| `reload()`    | —                                | Reset and reload                                                                |
| `refresh()`   | —                                | Refresh current data                                                            |
| `pagination`  | —                                | A set of pagination utility methods (compatible with `usePagination` interface) |

## Options

The first argument to `useLoadMore(service, options)` is the request function `service(page, pageSize, ...args)`; the second is the options object:

```typescript
interface UseLoadMoreOptions<TData, TParams extends unknown[]> {
  initialPage?: number // Initial page, default 1
  pageSize?: number // Items per page, default 10
  isLoadMore?: boolean // Whether to allow load more, default true
  threshold?: number // Infinite scroll trigger threshold (reserved)
  loadMoreService?: (page: number, pageSize: number) => Promise<RequestResponse<TData>> // Optional different request for load more
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // Whether to manually trigger first load
  defaultParams?: TParams // Extra params besides page and pageSize
}
```

### Appending List Data

When `data` is an array, `useLoadMore` will automatically **concatenate arrays** when loading more:

```typescript
// data: Ref<User[]>
const { data, loadMore } = useLoadMore<User[]>((page, pageSize) =>
  request.get('/api/users', { params: { page, pageSize } })
)

// First load: data = Page 1
// Second loadMore: data = Page 1 + Page 2
```

When return structure is `{ list, total }`, it will also append:

```typescript
interface PageResult<T> {
  list: T[]
  total: number
}

const { data, loadMore } = useLoadMore<PageResult<User>>((page, pageSize) =>
  request.get('/api/users', { params: { page, pageSize } })
)
```

## Manual Refresh and Reload

```typescript
const { reload, refresh } = useLoadMore(
  (page, size) => request.get('/api/logs', { params: { page, pageSize: size } }),
  {
    manual: true
  }
)

// First load
reload()

// Refresh based on current pagination (usually used after filter conditions change)
refresh()
```

## Combine with Scroll Events

You can listen to scroll events in scroll container and trigger `loadMore` when near bottom:

```vue
<template>
  <div ref="scrollRef" style="height: 400px; overflow: auto;" @scroll="handleScroll">
    <yh-list :data="data || []" />
  </div>
</template>
```

```typescript
const scrollRef = ref<HTMLElement>()

const handleScroll = () => {
  const el = scrollRef.value
  if (!el || !canLoadMore.value) return

  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distanceToBottom < 100) {
    loadMore()
  }
}
```

## Relationship with usePagination

- `usePagination`: Suitable for scenarios with clear pagination controls (page number switching)
- `useLoadMore`: Suitable for "waterfall / infinite scroll" scenarios (continuously append)

The `pagination` return values of both are basically compatible, you can switch implementation methods when needed.

## Summary

- `useLoadMore` = First page load + Append on load more
- Automatically handles array concatenation
- Provides both button click and scroll trigger modes
