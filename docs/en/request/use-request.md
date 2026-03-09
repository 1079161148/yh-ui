# useRequest

`useRequest` is a general-purpose request Hook provided by `@yh-ui/request` for elegantly managing the entire lifecycle of async requests in Vue components: loading state, errors, retry, debounce/throttle, etc.

## Basic Usage

```typescript
import { useRequest } from '@yh-ui/request'

// Basic usage - auto execute
const { data, loading, error } = useRequest(() => request.get('/api/users'))
```

```typescript
// Manual trigger
const { data, loading, error, run } = useRequest((id: number) => request.get(`/api/users/${id}`), {
  manual: true, // Manual mode
  defaultParams: [1] // Default params
})

// Call when needed
run(2)
```

## Return Values

```typescript
const {
  data, // ShallowRef<TData | undefined>
  loading, // Ref<boolean>
  error, // ShallowRef<RequestError | undefined>
  params, // Ref<TParams>
  loadingMore, // Ref<boolean> (works with pagination/load more)
  noMore, // Ref<boolean>
  run, // (...params: TParams) => Promise<RequestResponse<TData>>
  mutate, // (updater?: TData | ((old?: TData) => TData)) => void
  cancel, // () => void
  refresh, // () => Promise<void>
  loadMore, // () => Promise<void>
  disabled // ComputedRef<boolean>
} = useRequest(service, options)
```

## Full Options

The `options` of `useRequest(service, options)` extend the request library's `RequestOptions` (e.g. `baseURL`, `timeout`, `headers`) and include these Hook-specific options:

| Option          | Type                      | Default | Description                                                        |
| --------------- | ------------------------- | ------- | ------------------------------------------------------------------ |
| `manual`        | `boolean`                 | `false` | When true, request runs only after calling `run()`                 |
| `defaultParams` | `TParams`                 | `[]`    | Default request params; used for the first request when not manual |
| `debounceWait`  | `number`                  | -       | Debounce time (ms) for multiple `run` calls                        |
| `throttleWait`  | `number`                  | -       | Throttle time (ms) for multiple `run` calls                        |
| `request`       | `Request`                 | -       | Custom request instance                                            |
| `formatResult`  | `(response) => TData`     | -       | Format response and extract business data from `RequestResponse`   |
| `onSuccess`     | `(data, params) => void`  | -       | Success callback                                                   |
| `onError`       | `(error, params) => void` | -       | Error callback                                                     |
| `onFinally`     | `(params) => void`        | -       | Finally callback (runs on success or failure)                      |

## Common Options

```typescript
const { data, loading, error, run } = useRequest(
  (keyword: string) =>
    request.get('/api/search', {
      params: { q: keyword }
    }),
  {
    manual: true, // Manual trigger
    defaultParams: ['yh-ui'], // First params
    debounceWait: 300, // Debounce (search input scenario)
    // throttleWait: 1000, // Or use throttle

    // Success callback
    onSuccess: (data, params) => {
      console.log('Success:', data, params)
    },

    // Error callback
    onError: (error, params) => {
      console.error('Error:', error, params)
    },

    // Finally callback (always called regardless of success/failure)
    onFinally: (params) => {
      console.log('Done:', params)
    }
  }
)
```

### Debounce & Throttle

```typescript
// Debounced search
const { run: search } = useRequest(
  (keyword: string) => request.get('/api/search', { params: { q: keyword } }),
  {
    manual: true,
    debounceWait: 300
  }
)

// Throttled submit
const { run: submit } = useRequest((form: FormData) => request.post('/api/form', form), {
  manual: true,
  throttleWait: 1000
})
```

## mutate: Local Data Update

Update local data without making a new request, suitable for optimistic updates.

```typescript
const { data, mutate } = useRequest(() => request.get<User[]>('/api/users'))

// Add a record
const addUser = (user: User) => {
  mutate((old) => {
    return old ? [...old, user] : [user]
  })
}
```

## cancel: Cancel Request

```typescript
const { run, cancel, loading } = useRequest(() => request.get('/api/long-task'), { manual: true })

const start = () => run()
const stop = () => cancel()
```

## Use with Forms

```typescript
const form = reactive({
  username: '',
  password: ''
})

const { run, loading } = useRequest((payload: typeof form) => request.post('/api/login', payload), {
  manual: true,
  onSuccess: () => {
    YhMessage.success('Login successful')
  },
  onError: (error) => {
    YhMessage.error(error.message)
  }
})

const handleSubmit = () => {
  run({ ...form })
}
```

## Polling (useRequestPolling)

`useRequestPolling` wraps `useRequest` to **poll** the same endpoint at an interval (e.g. order status, task progress).

```typescript
import { useRequestPolling } from '@yh-ui/request'

const { data, loading, pause, resume } = useRequestPolling(() => request.get('/api/task/status'), {
  polling: true, // Enable polling (default false)
  pollingInterval: 3000, // Interval in ms (default 3000)
  pollingWhenHidden: false, // Pause when page is hidden (default false)
  defaultParams: [] // Request params (same as useRequest)
})

// Pause polling
pause()

// Resume polling
resume()
```

### Polling options

| Option              | Type      | Default | Description                            |
| ------------------- | --------- | ------- | -------------------------------------- |
| `polling`           | `boolean` | `false` | Enable polling                         |
| `pollingInterval`   | `number`  | `3000`  | Polling interval (ms)                  |
| `pollingWhenHidden` | `boolean` | `false` | Pause polling when page is not visible |

Other options are the same as `useRequest` (e.g. `onSuccess`, `onError`, `manual`, `defaultParams`). Return value is the same as `useRequest` plus `pause` and `resume`.

## Combine with SWR / Pagination

For more advanced usage, see:

- [useRequestSWR](./use-swr) - SWR caching mode based on `useRequest`
- [usePagination](./use-pagination) - Pagination request management
- [useLoadMore](./use-load-more) - Infinite scroll / load more
- [useQueue](./use-queue) - Request queue and concurrency control
