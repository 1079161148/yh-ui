# usePagination

`usePagination` 是为传统分页列表场景设计的 Hook，负责处理 **页码、总数、加载状态** 等逻辑，让你专注于渲染表格或列表。

<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
    <!-- 操作区 -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center; flex-wrap:wrap">
      <yh-button size="small" @click="methods.firstPage">首页</yh-button>
      <yh-button size="small" @click="methods.prevPage">上一页</yh-button>
      <yh-button size="small" @click="methods.nextPage">下一页</yh-button>
      <yh-button size="small" @click="methods.lastPage">末页</yh-button>
      <yh-button size="small" type="primary" @click="methods.refresh">刷新当前页</yh-button>
    </div>

    <!-- 数据表格 -->
    <yh-table :data="list" :loading="loading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="姓名" />
      <yh-table-column prop="email" label="邮箱" />
    </yh-table>

    <!-- 分页控件 -->
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

## 基础用法

<DemoBlock title="usePagination 传统列表分页" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
  <div>
    <!-- 操作区 -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center; flex-wrap:wrap">
      <yh-button size="small" @click="() => pageMethods.firstPage()">首页</yh-button>
      <yh-button size="small" @click="() => pageMethods.prevPage()">上一页</yh-button>
      <yh-button size="small" @click="() => pageMethods.nextPage()">下一页</yh-button>
      <yh-button size="small" @click="() => pageMethods.lastPage()">末页</yh-button>
      <yh-button size="small" type="primary" @click="() => pageMethods.refresh()">刷新当前页</yh-button>
    </div>
    <!-- 数据表格 -->
    <yh-table :data="tableDataList" :loading="isTableLoading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="姓名" />
      <yh-table-column prop="email" label="邮箱" />
    </yh-table>
    <!-- 分页控件 -->
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination v-model:current-page="pageCurrent" :page-size="pagePageSize" :total="pageTotal" layout="prev, pager, next, total" />
    </div>
  </div>
</DemoBlock>

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

`usePagination(service, options)` 的第一个参数为请求函数 `service(page, pageSize, ...args)`，第二个参数为配置项：

```typescript
interface UsePaginationOptions<TData, TParams extends unknown[]> {
  defaultPagination?: PaginationOptions // 默认分页参数 { current, pageSize }
  request?: Request // 自定义请求实例（预留）
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // 是否手动触发首次加载
  defaultParams?: TParams // 除 page、pageSize 外的额外参数，如 keyword
}
```

> `service` 的前两个参数固定为 `(current, pageSize)`，后续参数可通过 `defaultParams` / 手动修改 `params` 传入。

## 与 useRequest 的区别

- `useRequest`：更通用，适用于各种单次请求 / 防抖 / 节流 / SWR 等
- `usePagination`：专门处理分页逻辑，更适合「列表 + 分页」这种典型场景

## 相关 Hook

- [useLoadMore](./use-load-more) - 无限滚动 / 加载更多
- [useQueue](./use-queue) - 请求队列 / 并发控制
