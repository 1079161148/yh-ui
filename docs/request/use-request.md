# useRequest

`useRequest` 是 `@yh-ui/request` 提供的通用请求 Hook，用于在 Vue 组件中优雅地管理异步请求的整个生命周期：加载状态、错误、重试、防抖/节流等。

## 基础用法

```typescript
import { useRequest } from '@yh-ui/request'

// 基础用法 - 自动执行
const { data, loading, error } = useRequest(() => request.get('/api/users'))
```

```typescript
// 手动触发
const { data, loading, error, run } = useRequest((id: number) => request.get(`/api/users/${id}`), {
  manual: true, // 手动模式
  defaultParams: [1] // 默认参数
})

// 在需要时调用
run(2)
```

## 返回值

```typescript
const {
  data, // ShallowRef<TData | undefined>
  loading, // Ref<boolean>
  error, // ShallowRef<RequestError | undefined>
  params, // Ref<TParams>
  loadingMore, // Ref<boolean>（与分页/加载更多配合）
  noMore, // Ref<boolean>
  run, // (...params: TParams) => Promise<RequestResponse<TData>>
  mutate, // (updater?: TData | ((old?: TData) => TData)) => void
  cancel, // () => void
  refresh, // () => Promise<void>
  loadMore, // () => Promise<void>
  disabled // ComputedRef<boolean>
} = useRequest(service, options)
```

## 完整配置项

`useRequest(service, options)` 的 `options` 继承自请求库的 `RequestOptions`（如 `baseURL`、`timeout`、`headers` 等），并包含以下 Hook 专用配置：

| 参数            | 类型                      | 默认值  | 说明                                              |
| --------------- | ------------------------- | ------- | ------------------------------------------------- |
| `manual`        | `boolean`                 | `false` | 是否手动触发，为 `true` 时需调用 `run()` 才发请求 |
| `defaultParams` | `TParams`                 | `[]`    | 默认请求参数，非 manual 时首次会用该参数请求      |
| `debounceWait`  | `number`                  | -       | 防抖时间（毫秒），多次调用 `run` 时防抖           |
| `throttleWait`  | `number`                  | -       | 节流时间（毫秒），多次调用 `run` 时节流           |
| `request`       | `Request`                 | -       | 自定义请求实例                                    |
| `formatResult`  | `(response) => TData`     | -       | 格式化响应，从 `RequestResponse` 中提取业务数据   |
| `onSuccess`     | `(data, params) => void`  | -       | 请求成功回调                                      |
| `onError`       | `(error, params) => void` | -       | 请求失败回调                                      |
| `onFinally`     | `(params) => void`        | -       | 请求完成回调（成功或失败都会执行）                |

## 常用配置

```typescript
const { data, loading, error, run } = useRequest(
  (keyword: string) =>
    request.get('/api/search', {
      params: { q: keyword }
    }),
  {
    manual: true, // 手动触发
    defaultParams: ['yh-ui'], // 首次参数
    debounceWait: 300, // 防抖（输入搜索场景）
    // throttleWait: 1000, // 或者使用节流

    // 成功回调
    onSuccess: (data, params) => {
      console.log('成功:', data, params)
    },

    // 错误回调
    onError: (error, params) => {
      console.error('失败:', error, params)
    },

    // 完成回调（无论成功或失败）
    onFinally: (params) => {
      console.log('完成:', params)
    }
  }
)
```

### 防抖 & 节流

```typescript
// 防抖搜索
const { run: search } = useRequest(
  (keyword: string) => request.get('/api/search', { params: { q: keyword } }),
  {
    manual: true,
    debounceWait: 300
  }
)

// 节流提交
const { run: submit } = useRequest((form: FormData) => request.post('/api/form', form), {
  manual: true,
  throttleWait: 1000
})
```

## mutate：本地数据更新

在不重新发请求的情况下直接修改本地数据，适合乐观更新场景。

```typescript
const { data, mutate } = useRequest(() => request.get<User[]>('/api/users'))

// 添加一条记录
const addUser = (user: User) => {
  mutate((old) => {
    return old ? [...old, user] : [user]
  })
}
```

## cancel：取消请求

```typescript
const { run, cancel, loading } = useRequest(() => request.get('/api/long-task'), { manual: true })

const start = () => run()
const stop = () => cancel()
```

## 与表单搭配使用

```typescript
const form = reactive({
  username: '',
  password: ''
})

const { run, loading } = useRequest((payload: typeof form) => request.post('/api/login', payload), {
  manual: true,
  onSuccess: () => {
    YhMessage.success('登录成功')
  },
  onError: (error) => {
    YhMessage.error(error.message)
  }
})

const handleSubmit = () => {
  run({ ...form })
}
```

## 轮询（useRequestPolling）

`useRequestPolling` 基于 `useRequest` 封装，用于**按间隔轮询**同一接口（如订单状态、任务进度）。

```typescript
import { useRequestPolling } from '@yh-ui/request'

const { data, loading, pause, resume } = useRequestPolling(() => request.get('/api/task/status'), {
  polling: true, // 是否开启轮询，默认 false
  pollingInterval: 3000, // 轮询间隔（毫秒），默认 3000
  pollingWhenHidden: false, // 页面隐藏时是否暂停轮询，默认 false
  defaultParams: [] // 请求参数（与 useRequest 一致）
})

// 暂停轮询
pause()

// 恢复轮询
resume()
```

### 轮询配置项

| 参数                | 类型      | 默认值  | 说明                     |
| ------------------- | --------- | ------- | ------------------------ |
| `polling`           | `boolean` | `false` | 是否开启轮询             |
| `pollingInterval`   | `number`  | `3000`  | 轮询间隔（毫秒）         |
| `pollingWhenHidden` | `boolean` | `false` | 页面不可见时是否暂停轮询 |

其余配置与 `useRequest` 相同（如 `onSuccess`、`onError`、`manual`、`defaultParams` 等）。返回值为 `useRequest` 的返回值外加 `pause`、`resume`。

## 与 SWR / 分页等组合

更多高级用法请参考：

- [useRequestSWR](./use-swr) - 基于 `useRequest` 的 SWR 缓存模式
- [usePagination](./use-pagination) - 分页请求管理
- [useLoadMore](./use-load-more) - 无限滚动 / 加载更多
- [useQueue](./use-queue) - 请求队列与并发控制
