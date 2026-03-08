# useLoadMore

`useLoadMore` 用于实现 **加载更多 / 无限滚动** 场景：首屏加载一页数据，随后通过按钮或滚动条持续追加后续数据。

## 基础用法

```typescript
import { useLoadMore } from '@yh-ui/request'

interface UserList {
  list: User[]
  total: number
}

const {
  data, // ShallowRef<UserList | undefined>
  loading, // 首次加载状态
  loadingMore, // 加载更多状态
  noMore, // 是否没有更多
  loadMore, // 加载更多
  reload // 重新加载（重置分页）
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

模板示例：

```vue
<template>
  <yh-list :data="data?.list || []" />

  <div style="margin-top: 16px; text-align: center;">
    <yh-button type="primary" :loading="loadingMore" :disabled="noMore" @click="loadMore">
      {{ noMore ? '没有更多了' : '加载更多' }}
    </yh-button>
  </div>
</template>
```

## 返回值

```typescript
const result = useLoadMore<TData>(service, options)
```

| 字段          | 类型                                            | 说明             |
| ------------- | ----------------------------------------------- | ---------------- | ---------------------------------- |
| `current`     | `Ref<number>`                                   | 当前页码         |
| `pageSize`    | `Ref<number>`                                   | 每页条数         |
| `total`       | `Ref<number>`                                   | 总数             |
| `totalPages`  | `Ref<number>`                                   | 总页数           |
| `data`        | `ShallowRef<TData                               | undefined>`      | 数据（通常为数组或带 list 的对象） |
| `loading`     | `Ref<boolean>`                                  | 首屏加载中       |
| `refreshing`  | `Ref<boolean>`                                  | 刷新中           |
| `loadingMore` | `Ref<boolean>`                                  | 正在加载更多     |
| `error`       | `ShallowRef<unknown>`                           | 错误             |
| `params`      | `Ref<unknown[]>`                                | 额外参数         |
| `noMore`      | `Ref<boolean>`                                  | 是否没有更多     |
| `canLoadMore` | `Ref<boolean>`                                  | 是否可以加载更多 |
| `loadMore()`  | 加载下一页并追加数据                            |
| `reload()`    | 重置并重新加载                                  |
| `refresh()`   | 刷新当前数据                                    |
| `pagination`  | 一组分页工具方法（与 `usePagination` 接口兼容） |

## 选项

```typescript
interface UseLoadMoreOptions<TData, TParams extends unknown[]> {
  service: (page: number, pageSize: number, ...args: TParams) => Promise<RequestResponse<TData>>
  initialPage?: number // 初始页码，默认 1
  pageSize?: number // 每页条数，默认 10
  isLoadMore?: boolean // 是否允许加载更多，默认 true
  threshold?: number // 无限滚动触底阈值（预留）
  loadMoreService?: (page: number, pageSize: number) => Promise<RequestResponse<TData>>
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // 是否手动触发首次加载
  defaultParams?: TParams // 额外参数
}
```

### 追加列表数据

当 `data` 为数组时，`useLoadMore` 会自动在加载更多时做 **数组拼接**：

```typescript
// data: Ref<User[]>
const { data, loadMore } = useLoadMore<User[]>((page, pageSize) =>
  request.get('/api/users', { params: { page, pageSize } })
)

// 第一次加载：data = 第 1 页
// 第二次 loadMore：data = 第 1 页 + 第 2 页
```

当返回结构为 `{ list, total }` 时，同样会执行追加：

```typescript
interface PageResult<T> {
  list: T[]
  total: number
}

const { data, loadMore } = useLoadMore<PageResult<User>>((page, pageSize) =>
  request.get('/api/users', { params: { page, pageSize } })
)
```

## 手动刷新与重新加载

```typescript
const { reload, refresh } = useLoadMore(
  (page, size) => request.get('/api/logs', { params: { page, pageSize: size } }),
  {
    manual: true
  }
)

// 首次加载
reload()

// 基于当前分页刷新（通常用于筛选条件变化后）
refresh()
```

## 与滚动事件结合

你可以在滚动容器中监听滚动事件，在接近底部时触发 `loadMore`：

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

## 与 usePagination 的关系

- `usePagination`：适合「有明确分页控件」的场景（页码切换）
- `useLoadMore`：适合「瀑布流 / 无限滚动」场景（不断往下追加）

两者的 `pagination` 返回值基本兼容，可以在需要时互相切换实现方式。
