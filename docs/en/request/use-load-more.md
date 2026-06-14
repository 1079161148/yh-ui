# useLoadMore

`useLoadMore` is used for implementing **load more / infinite scroll** scenarios: load the first page of data, then continuously append subsequent data through buttons or scroll bars.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLoadMore } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// Mock Database
const mockPosts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Mock Post Title #${i + 1} - ${['Vue 3 Best Practices', 'TypeScript Advanced Guide', 'Vite Bundle Optimization', 'Frontend Performance Tuning', 'CSS Modern Layouts'][i % 5]}`
}))

// Demo 1: Click button to load more
interface Post { id: number; title: string }
const { data: postsData, loading: postsLoading, loadingMore: postsLoadingMore, noMore: postsNoMore, loadMore: fetchMorePosts, reload: resetPosts } = useLoadMore<Post[]>(
  async (page, size) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const start = (page - 1) * size
    const list = mockPosts.slice(0, 9).slice(start, start + size)
    return { data: list, total: 9 }
  },
  {
    initialPage: 1,
    pageSize: 3
  }
)

const postsList = computed(() => postsData.value || [])

// Demo 2: Scroll load and page navigation
const scrollRef = ref<HTMLElement>()

const { data: scrollData, loading: scrollLoading, loadingMore: scrollLoadingMore, loadMore: fetchScrollMore, canLoadMore: scrollCanLoadMore, pagination: scrollPagination } = useLoadMore<Post[]>(
  async (page, size) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const start = (page - 1) * size
    const list = mockPosts.slice(start, start + size)
    return { data: list, total: 15 }
  },
  {
    initialPage: 1,
    pageSize: 4
  }
)

const scrollList = computed(() => scrollData.value || [])

const handleScrollTrigger = () => {
  const el = scrollRef.value
  if (!el || !scrollCanLoadMore.value) return
  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distanceToBottom < 30) {
    fetchScrollMore()
  }
}

const handleGoToPage = async (page: number) => {
  if (scrollRef.value) {
    scrollRef.value.scrollTop = 0
  }
  await scrollPagination.loadPage(page)
}

const tsBtnDemo = `<${_T}>
  <div>
    <div style="display:flex; gap:12px; margin-bottom:12px">
      <yh-button type="primary" :loading="loadingMore" :disabled="noMore" @click="loadMore">
        {{ noMore ? 'No more data' : 'Load more' }}
      </yh-button>
      <yh-button @click="reload">Reset</yh-button>
    </div>

    <div v-if="loading && list.length === 0" style="text-align:center; padding:20px 0; color:var(--yh-text-color-secondary)">
      Loading initial data...
    </div>
    <div v-else style="display:flex; flex-direction:column; gap:8px">
      <div v-for="post in list" :key="post.id" style="padding:10px 14px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
        <b>ID: {{ post.id }}</b> - {{ post.title }}
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { computed } from 'vue'
import { useLoadMore } from '@yh-ui/request'

const { data, loading, loadingMore, noMore, loadMore, reload } = useLoadMore(
  async (page, size) => {
    // Replace with real API request in production
    await new Promise(resolve => setTimeout(resolve, 800))
    const list = Array.from({ length: size }, (_, i) => {
      const id = (page - 1) * size + i + 1
      return { id, title: \`Mock Post Title #\${id}\` }
    })
    return { data: list, total: 9 }
  },
  { initialPage: 1, pageSize: 3 }
)

const list = computed(() => data.value || [])
</${_S}>`

const tsScrollDemo = `<${_T}>
  <div>
    <!-- Navigation jump -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">Jump to:</span>
      <yh-button size="small" @click="goToPage(1)">Page 1</yh-button>
      <yh-button size="small" @click="goToPage(2)">Page 2</yh-button>
      <yh-button size="small" @click="goToPage(3)">Page 3</yh-button>
    </div>

    <!-- Scroll Container -->
    <div ref="scrollRef" style="height:200px; overflow-y:auto; border:1px solid var(--yh-border-color); border-radius:8px; padding:12px; position:relative" @scroll="handleScroll">
      <div v-if="loading" style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-secondary); font-size:13px">
        Loading...
      </div>
      <template v-else>
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="post in list" :key="post.id" style="padding:8px 12px; background:var(--yh-bg-color-page); border-radius:6px; font-size:13px">
            <b>#{{ post.id }}</b> {{ post.title }}
          </div>
        </div>
        <div v-if="loadingMore" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          Loading...
        </div>
        <div v-else-if="!canLoad && list.length > 0" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          No more items to load
        </div>
        <div v-else style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          Scroll down to load more...
        </div>
      </template>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useLoadMore } from '@yh-ui/request'

const scrollRef = ref<HTMLElement>()

const { data, loading, loadingMore, loadMore, canLoadMore, pagination } = useLoadMore(
  async (page, size) => {
    // Replace with real API request in production
    await new Promise(resolve => setTimeout(resolve, 600))
    const list = Array.from({ length: size }, (_, i) => {
      const id = (page - 1) * size + i + 1
      return { id, title: \`Mock Post Title #\${id}\` }
    })
    return { data: list, total: 15 }
  },
  { initialPage: 1, pageSize: 4 }
)

const list = computed(() => data.value || [])
const canLoad = computed(() => canLoadMore.value)

const handleScroll = () => {
  const el = scrollRef.value
  if (!el || !canLoadMore.value) return
  const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  if (distanceToBottom < 30) {
    loadMore()
  }
}

const goToPage = async (page: number) => {
  if (scrollRef.value) {
    scrollRef.value.scrollTop = 0
  }
  await pagination.loadPage(page)
}
</${_S}>`
</script>

## Basic Usage

<DemoBlock title="useLoadMore Click Button Mode" :ts-code="tsBtnDemo" :js-code="toJs(tsBtnDemo)">
  <div>
    <div style="display:flex; gap:12px; margin-bottom:12px">
      <yh-button type="primary" :loading="postsLoadingMore" :disabled="postsNoMore" @click="() => fetchMorePosts()">
        {{ postsNoMore ? 'No more data' : 'Load more' }}
      </yh-button>
      <yh-button @click="() => resetPosts()">Reset</yh-button>
    </div>
    <div v-if="postsLoading && postsList.length === 0" style="text-align:center; padding:20px 0; color:var(--yh-text-color-secondary)">
      Loading initial data...
    </div>
    <div v-else style="display:flex; flex-direction:column; gap:8px">
      <div v-for="post in postsList" :key="post.id" style="padding:10px 14px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
        <b>ID: {{ post.id }}</b> - {{ post.title }}
      </div>
    </div>
  </div>
</DemoBlock>

## Return Values

```typescript
const result = useLoadMore<TData>(service, options)
```

| Field         | Type                             | Description                                                 |
| ------------- | -------------------------------- | ----------------------------------------------------------- |
| `current`     | `Ref<number>`                    | Current page                                                |
| `pageSize`    | `Ref<number>`                    | Items per page                                              |
| `total`       | `Ref<number>`                    | Total items count                                           |
| `totalPages`  | `Ref<number>`                    | Total pages                                                 |
| `data`        | `ShallowRef<TData \| undefined>` | Concatenated array or raw page payload                      |
| `loading`     | `Ref<boolean>`                   | Loading first page                                          |
| `refreshing`  | `Ref<boolean>`                   | Refreshing list                                             |
| `loadingMore` | `Ref<boolean>`                   | Appending page items                                        |
| `error`       | `ShallowRef<unknown>`            | Request error                                               |
| `params`      | `Ref<unknown[]>`                 | Additional request arguments                                |
| `noMore`      | `Ref<boolean>`                   | Whether all pages have been fetched                         |
| `canLoadMore` | `Ref<boolean>`                   | True if load more is ready                                  |
| `loadMore()`  | —                                | Load next page and append items                             |
| `reload()`    | —                                | Reset list and start from initial page                      |
| `refresh()`   | —                                | Refresh list based on current page                          |
| `pagination`  | —                                | Utility helpers (compatible with `usePagination` interface) |

## Options

The first argument to `useLoadMore(service, options)` is the request function `service(page, pageSize, ...args)`, and the second is the options object:

```typescript
interface UseLoadMoreOptions<TData, TParams extends unknown[]> {
  initialPage?: number // Initial page, default 1
  pageSize?: number // Items per page, default 10
  isLoadMore?: boolean // Whether to allow load more, default true
  threshold?: number // Infinite scroll trigger threshold (reserved)
  loadMoreService?: (page: number, pageSize: number) => Promise<RequestResponse<TData>> // Optional custom loading endpoint
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // Whether to manually trigger the first load
  defaultParams?: TParams // Extra request parameters besides page and pageSize
}
```

## Combine with Pagination Methods (Prevent Page Drift)

When combining an infinite scroll container with specific pagination or page jump logic (e.g. calling `pagination.loadPage(n)`), replacing the list data (shrinking the long list to a single page list) might immediately trigger the container's scroll event due to changes in DOM dimensions or scroll position. This can lead to an unexpected `loadMore()` call and cause page drift (e.g., drifting to load page `n + 1` right after jumping to page `n`).

To address this issue:

1. **Built-in Cooldown Guard**: `useLoadMore` has a built-in 100ms cooldown guard for `reload / refresh / loadPage`. Within 100ms after a refresh/page switch finishes, any `loadMore` triggered automatically by scroll events will be ignored.
2. **Component-level Reset**: When executing jump operations like `loadPage`, it is recommended to explicitly reset the scroll position of the scroll container to the top (`el.scrollTop = 0`) to completely avoid browser layout-triggered scrolling.

The following example demonstrates infinite scroll load-more along with safe programmatic pagination via `goToPage`.

<DemoBlock title="Infinite Scroll & Safe Page Jumps" :ts-code="tsScrollDemo" :js-code="toJs(tsScrollDemo)">
  <div>
    <!-- Control jump -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">Jump to:</span>
      <yh-button size="small" @click="() => handleGoToPage(1)">Page 1</yh-button>
      <yh-button size="small" @click="() => handleGoToPage(2)">Page 2</yh-button>
      <yh-button size="small" @click="() => handleGoToPage(3)">Page 3</yh-button>
    </div>
    <!-- Scroll container -->
    <div ref="scrollRef" style="height:200px; overflow-y:auto; border:1px solid var(--yh-border-color); border-radius:8px; padding:12px; position:relative" @scroll="handleScrollTrigger">
      <div v-if="scrollLoading" style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-secondary); font-size:13px">
        Loading...
      </div>
      <template v-else>
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="post in scrollList" :key="post.id" style="padding:8px 12px; background:var(--yh-bg-color-page); border-radius:6px; font-size:13px">
            <b>#{{ post.id }}</b> {{ post.title }}
          </div>
        </div>
        <div v-if="scrollLoadingMore" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          Loading...
        </div>
        <div v-else-if="!scrollCanLoadMore && scrollList.length > 0" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          No more items to load
        </div>
        <div v-else style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          Scroll down to load more...
        </div>
      </template>
    </div>
  </div>
</DemoBlock>

## Relationship with usePagination

- `usePagination`: Suitable for scenarios with clear pagination controls (page number switching)
- `useLoadMore`: Suitable for "waterfall / infinite scroll" scenarios (continuously append)

The `pagination` return values of both are basically compatible, you can switch implementation methods when needed.
