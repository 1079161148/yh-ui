# useRequestSWR

`useRequestSWR` 不是一个单独的 Hook，而是一种基于 `useRequest` 的使用模式：通过开启 `swr`、配置 `cacheKey` / `staleTime` 等参数，实现 **先返回缓存，再后台刷新** 的 Stale-While-Revalidate 策略。

## 基础模式：useRequest + SWR

```typescript
import { useRequest } from '@yh-ui/request'

const userId = ref(1)

const { data, loading, refresh } = useRequest(
  () => request.get<User>(`/api/users/${userId.value}`),
  {
    // 开启 SWR 模式
    swr: true,

    // 缓存 key（建议与业务含义相关）
    cacheKey: `user_${userId.value}`,

    // 数据新鲜期：5 分钟内不会重新请求
    staleTime: 5 * 60 * 1000,

    // 缓存保留时间：10 分钟内可从缓存恢复
    cacheTime: 10 * 60 * 1000,

    // 窗口聚焦时自动刷新
    refreshOnWindowFocus: true,

    // 依赖变化时自动刷新
    refreshDeps: [userId]
  }
)
```

> 可以把 “useRequest + `swr: true`” 理解为文档中的 **useRequestSWR** 模式。

## 配置项说明

```typescript
interface UseRequestSWROptions<TData, TParams extends any[]> extends UseRequestOptions<
  TData,
  TParams
> {
  swr?: boolean // 是否开启 SWR 模式
  cacheKey?: string // 缓存 key
  staleTime?: number // 数据新鲜期（毫秒）
  cacheTime?: number // 缓存保留时间（毫秒）
  getCache?: (key: string) => TData | undefined
  setCache?: (key: string, value: TData) => void
  refreshOnWindowFocus?: boolean
  refreshDepsWait?: number // 依赖变化防抖时间
  refreshDeps?: Ref<any>[]
}
```

### 建议配置

- **列表 / 配置类接口**：`staleTime` 设为 5~30 分钟
- **详情接口**：`staleTime` 视业务情况，通常 1~5 分钟
- **强实时数据（如股票、监控）**：不建议开启 SWR，或 `staleTime = 0`

## 列表场景示例

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

## 手动控制缓存

你也可以通过 `getCache` / `setCache` 接入自定义缓存实现（如 Pinia / IndexedDB 等）。

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

## 与分页 / 加载更多联动

在分页或加载更多场景中，通常推荐使用专门的 Hook：

- [usePagination](./use-pagination) - 传统分页列表
- [useLoadMore](./use-load-more) - 无限滚动 / 加载更多

在这些场景下，SWR 更适合作为「详情页」或「配置数据」的缓存策略。

## 小结

- **useRequestSWR** = `useRequest` + `swr: true` + 合理的缓存配置
- 适合 **读多写少**、对实时性要求不高、但又不希望每次都打后端的接口
- 与普通 `useRequest` 完全兼容，只是多了一层缓存与刷新策略
