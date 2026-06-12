# useRequestSWR

`useRequestSWR` 是一个专门用于实现 **先返回缓存，再后台刷新** 的 Stale-While-Revalidate 缓存策略的 Vue Hook。它在首屏加载或参数变更时优先展现已缓存的陈旧（stale）数据，同时在后台静默发起网络请求拉取最新数据（revalidate）并自动更新，从而闭环 SWR 语义，提供流畅的用户体验。

## 基础用法

```typescript
import { useRequestSWR } from '@yh-ui/request'

const userId = ref(1)

const { data, loading, refresh } = useRequestSWR(
  // 第一个参数：cacheKey (可为字符串或返回字符串的函数)
  () => `user_${userId.value}`,
  // 第二个参数：service 请求函数，接收当前 cacheKey 作为第一个参数
  (key) => request.get<User>(`/api/users/${userId.value}`),
  // 第三个参数：配置项 options
  {
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

## 配置项说明

```typescript
export interface UseRequestSWROptions<TData, TParams extends unknown[]> extends UseRequestOptions<
  TData,
  TParams
> {
  swr?: boolean // 是否开启 SWR 模式
  cacheKey?: string // 缓存 key
  staleTime?: number // 数据新鲜期（毫秒）
  cacheTime?: number // 缓存保留时间（毫秒）
  getCache?: (key: string) => TData | undefined // 自定义读取缓存
  setCache?: (key: string, value: TData) => void // 自定义写入缓存
  refreshOnWindowFocus?: boolean // 窗口聚焦时是否重新请求
  refreshDepsWait?: number // 依赖变化重新请求防抖时间
  refreshDeps?: Ref<unknown>[] // 关联依赖数组
}
```

### 建议配置

- **列表 / 配置类接口**：`staleTime` 设为 5~30 分钟。
- **详情接口**：`staleTime` 视业务情况，通常 1~5 分钟。
- **强实时数据（如股票、监控）**：不建议开启 SWR，或 `staleTime = 0`。

## 列表场景示例

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

## 手动控制缓存

你也可以通过 `getCache` / `setCache` 接入自定义缓存实现（如 Pinia / IndexedDB 等）。

```typescript
import { reactive } from 'vue'

const cacheStore = reactive(new Map<string, unknown>())

const { data } = useRequestSWR('app_config', (key) => request.get('/api/config'), {
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

- **useRequestSWR** 支持首屏与二次渲染时无缝拉取陈旧数据，在后台 revalidate，解决消费端无缓存读取导致白屏的痛点。
- 适合 **读多写少**、对实时性要求不高、但又不希望每次都打后端的接口。
- 支持独立生命周期和依赖响应式更新。
