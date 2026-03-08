# usePagination

`usePagination` 是为传统分页列表场景设计的 Hook，负责处理 **页码、总数、加载状态** 等逻辑，让你专注于渲染表格或列表。

## 基础用法

```typescript
import { usePagination } from '@yh-ui/request'

interface UserListResult {
  list: User[]
  total: number
}

const {
  current, // 当前页码
  pageSize, // 每页条数
  total, // 总数
  totalPages, // 总页数
  data, // ShallowRef<UserListResult | undefined>
  loading,
  pagination // 分页方法集合
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

模板示例（以 YH-UI Pagination 为例）：

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

## 返回值

```typescript
const result = usePagination<TData, TParams>(service, options)
```

| 字段                           | 类型                             | 说明                                     |
| ------------------------------ | -------------------------------- | ---------------------------------------- |
| `current`                      | `Ref<number>`                    | 当前页码                                 |
| `pageSize`                     | `Ref<number>`                    | 每页条数                                 |
| `total`                        | `Ref<number>`                    | 总记录数                                 |
| `totalPages`                   | `Ref<number>`                    | 总页数                                   |
| `data`                         | `ShallowRef<TData \| undefined>` | 接口返回数据（通常含 `list` 和 `total`） |
| `loading`                      | `Ref<boolean>`                   | 加载中                                   |
| `refreshing`                   | `Ref<boolean>`                   | 刷新中                                   |
| `loadingMore`                  | `Ref<boolean>`                   | 加载更多中（与其他 Hook 联动时使用）     |
| `error`                        | `ShallowRef<unknown>`            | 错误                                     |
| `params`                       | `Ref<TParams>`                   | 额外参数                                 |
| `noMore`                       | `Ref<boolean>`                   | 是否没有更多数据                         |
| `pagination.loadPage(page)`    | `(page: number) => void`         | 加载指定页                               |
| `pagination.nextPage()`        | `() => void`                     | 下一页                                   |
| `pagination.prevPage()`        | `() => void`                     | 上一页                                   |
| `pagination.firstPage()`       | `() => void`                     | 首页                                     |
| `pagination.lastPage()`        | `() => void`                     | 末页                                     |
| `pagination.refresh()`         | `() => void`                     | 以当前页刷新                             |
| `pagination.setPageSize(size)` | `(size: number) => void`         | 修改每页条数并自动刷新（非 manual 模式） |
| `pagination.setTotal(total)`   | `(total: number) => void`        | 手动设置总数                             |

## 选项

```typescript
interface UsePaginationOptions<TData, TParams extends unknown[]> {
  service: (...args: TParams) => Promise<RequestResponse<TData>>
  defaultPagination?: PaginationOptions // 默认分页参数
  request?: Request // 自定义请求实例（预留）
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // 是否手动触发
  defaultParams?: TParams // 额外参数
}
```

常见用法：

```typescript
const { current, pageSize, total, data, loading, pagination } = usePagination(
  (page, size, keyword: string) =>
    request.get('/api/users', { params: { page, pageSize: size, keyword } }),
  {
    defaultPagination: { current: 1, pageSize: 20 },
    defaultParams: [''], // 第三个参数 keyword
    onSuccess: (res) => {
      console.log('列表加载成功', res)
    }
  }
)
```

> `service` 的前两个参数固定为 `(current, pageSize)`，后续参数可通过 `defaultParams` / 手动修改 `params` 传入。

## 手动模式（manual）

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

// 主动加载
const load = () => {
  params.value = [current.value, pageSize.value, state.keyword]
  pagination.refresh()
}
```

## 与 useRequest 的区别

- `useRequest`：更通用，适用于各种单次请求 / 防抖 / 节流 / SWR 等
- `usePagination`：专门处理分页逻辑，更适合「列表 + 分页」这种典型场景

## 相关 Hook

- [useLoadMore](./use-load-more) - 无限滚动 / 加载更多
- [useQueue](./use-queue) - 请求队列 / 并发控制
