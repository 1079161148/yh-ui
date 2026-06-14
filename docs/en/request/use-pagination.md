# usePagination

`usePagination` is a Hook designed for traditional page-by-page list scenarios, responsible for **page numbers, total counts, loading states**, and pagination methods, allowing you to focus on rendering the table or list.

<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

interface User { id: number; name: string; email: string }
interface UserList { list: User[]; total: number }

const { data: pageResult, loading: isTableLoading, current: pageCurrent, total: pageTotal, pageSize: pagePageSize, pagination: pageMethods } = usePagination<UserList>(
  async (page, size) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${size}`)
    const list = await res.json()
    const totalCount = Number(res.headers.get('x-total-count') || 10)
    return { data: { list, total: totalCount } }
  },
  {
    defaultPagination: { current: 1, pageSize: 3 }
  }
)

const tableDataList = computed(() => pageResult.value?.list || [])

const tsPaginationDemo = `<${_T}>
  <div>
    <!-- Actions Panel -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center; flex-wrap:wrap">
      <yh-button size="small" @click="methods.firstPage">First</yh-button>
      <yh-button size="small" @click="methods.prevPage">Prev</yh-button>
      <yh-button size="small" @click="methods.nextPage">Next</yh-button>
      <yh-button size="small" @click="methods.lastPage">Last</yh-button>
      <yh-button size="small" type="primary" @click="methods.refresh">Refresh Current</yh-button>
    </div>

    <!-- Data Table -->
    <yh-table :data="list" :loading="loading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="Name" />
      <yh-table-column prop="email" label="Email" />
    </yh-table>

    <!-- Pagination Control -->
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination 
        v-model:current-page="current" 
        :page-size="pageSize" 
        :total="total" 
        layout="prev, pager, next, total" 
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@yh-ui/request'

interface User { id: number; name: string; email: string }
interface UserList { list: User[]; total: number }

const { data, loading, current, total, pageSize, pagination: methods } = usePagination<UserList>(
  async (page, size) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users?_page=\${page}&_limit=\${size}\`)
    const list = await res.json()
    const totalCount = Number(res.headers.get('x-total-count') || 10)
    return { data: { list, total: totalCount } }
  },
  { defaultPagination: { current: 1, pageSize: 3 } }
)

const list = computed(() => data.value?.list || [])
</${_S}>`
</script>

## Basic Usage

<DemoBlock title="usePagination Traditional Pagination" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
  <div>
    <!-- Actions Panel -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center; flex-wrap:wrap">
      <yh-button size="small" @click="() => pageMethods.firstPage()">First</yh-button>
      <yh-button size="small" @click="() => pageMethods.prevPage()">Prev</yh-button>
      <yh-button size="small" @click="() => pageMethods.nextPage()">Next</yh-button>
      <yh-button size="small" @click="() => pageMethods.lastPage()">Last</yh-button>
      <yh-button size="small" type="primary" @click="() => pageMethods.refresh()">Refresh Current</yh-button>
    </div>
    <!-- Data Table -->
    <yh-table :data="tableDataList" :loading="isTableLoading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="Name" />
      <yh-table-column prop="email" label="Email" />
    </yh-table>
    <!-- Pagination Control -->
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination v-model:current-page="pageCurrent" :page-size="pagePageSize" :total="pageTotal" layout="prev, pager, next, total" />
    </div>
  </div>
</DemoBlock>

## Return Values

```typescript
const result = usePagination<TData, TParams>(service, options)
```

| Field                          | Type                             | Description                                                        |
| ------------------------------ | -------------------------------- | ------------------------------------------------------------------ |
| `current`                      | `Ref<number>`                    | Current page                                                       |
| `pageSize`                     | `Ref<number>`                    | Items per page                                                     |
| `total`                        | `Ref<number>`                    | Total items                                                        |
| `totalPages`                   | `Ref<number>`                    | Total pages                                                        |
| `data`                         | `ShallowRef<TData \| undefined>` | Response data (usually containing `list` and `total`)              |
| `loading`                      | `Ref<boolean>`                   | Loading state                                                      |
| `refreshing`                   | `Ref<boolean>`                   | Refreshing state                                                   |
| `loadingMore`                  | `Ref<boolean>`                   | Loading more state (used when coordinating with other hooks)       |
| `error`                        | `ShallowRef<unknown>`            | Request error                                                      |
| `params`                       | `Ref<TParams>`                   | Extra request arguments                                            |
| `noMore`                       | `Ref<boolean>`                   | Whether there is no more data to load                              |
| `pagination.loadPage(page)`    | `(page: number) => void`         | Load specified page                                                |
| `pagination.nextPage()`        | `() => void`                     | Load next page                                                     |
| `pagination.prevPage()`        | `() => void`                     | Load previous page                                                 |
| `pagination.firstPage()`       | `() => void`                     | Jump to the first page                                             |
| `pagination.lastPage()`        | `() => void`                     | Jump to the last page                                              |
| `pagination.refresh()`         | `() => void`                     | Refresh the current page                                           |
| `pagination.setPageSize(size)` | `(size: number) => void`         | Modify page size and refresh automatically (except in manual mode) |
| `pagination.setTotal(total)`   | `(total: number) => void`        | Set total items count manually                                     |

## Options

The first parameter of `usePagination(service, options)` is the request function `service(page, pageSize, ...args)`, and the second is the config:

```typescript
interface UsePaginationOptions<TData, TParams extends unknown[]> {
  defaultPagination?: PaginationOptions // Default page info { current, pageSize }
  request?: Request // Custom request client
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // Whether to manually trigger the first load
  defaultParams?: TParams // Extra request params besides page and pageSize
}
```

> The first two parameters of `service` are fixed as `(current, pageSize)`. Any subsequent params are supplied via `defaultParams` or by manually updating `params`.

## Difference from useRequest

- `useRequest`: General purpose, fits any single-request/debounce/throttle/SWR scenario.
- `usePagination`: Specialized in handling traditional page switching layouts (e.g. "List + Pagination controls").

## Related Hooks

- [useLoadMore](./use-load-more) - Infinite scroll / load more
- [useQueue](./use-queue) - Request queue / concurrency control
