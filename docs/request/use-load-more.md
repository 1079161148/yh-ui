# useLoadMore

`useLoadMore` 用于实现 **加载更多 / 无限滚动** 场景：首屏加载一页数据，随后通过按钮或滚动条持续追加后续数据。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLoadMore } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// 模拟数据
const mockPosts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `模拟文章标题 #${i + 1} - ${['Vue 3 最佳实践', 'TypeScript 进阶指南', 'Vite 构建优化', '前端性能调优', 'CSS 现代布局'][i % 5]}`
}))

// Demo 1: 点击按钮加载更多
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

// Demo 2: 滚动加载与分页跳转
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
        {{ noMore ? '没有更多数据' : '加载更多' }}
      </yh-button>
      <yh-button @click="reload">重置</yh-button>
    </div>
    <div v-if="loading && list.length === 0" style="text-align:center; padding:20px 0; color:var(--yh-text-color-secondary)">
      首次加载数据中...
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
    // 实际业务中替换为真实的 API 请求
    await new Promise(resolve => setTimeout(resolve, 800))
    const list = Array.from({ length: size }, (_, i) => {
      const id = (page - 1) * size + i + 1
      return { id, title: \`文章标题 #\${id}\` }
    })
    return { data: list, total: 9 }
  },
  { initialPage: 1, pageSize: 3 }
)

const list = computed(() => data.value || [])
</${_S}>`

const tsScrollDemo = `<${_T}>
  <div>
    <!-- 控制跳转 -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">跳转页码:</span>
      <yh-button size="small" @click="goToPage(1)">第 1 页</yh-button>
      <yh-button size="small" @click="goToPage(2)">第 2 页</yh-button>
      <yh-button size="small" @click="goToPage(3)">第 3 页</yh-button>
    </div>
    <!-- 滚动容器 -->
    <div ref="scrollRef" style="height:200px; overflow-y:auto; border:1px solid var(--yh-border-color); border-radius:8px; padding:12px; position:relative" @scroll="handleScroll">
      <div v-if="loading" style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-secondary); font-size:13px">
        加载中...
      </div>
      <template v-else>
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="post in list" :key="post.id" style="padding:8px 12px; background:var(--yh-bg-color-page); border-radius:6px; font-size:13px">
            <b>#{{ post.id }}</b> {{ post.title }}
          </div>
        </div>
        <div v-if="loadingMore" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          加载中...
        </div>
        <div v-else-if="!canLoad && list.length > 0" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          已加载完毕
        </div>
        <div v-else style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          往下滑动加载更多...
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
    // 实际业务中替换为真实的 API 请求
    await new Promise(resolve => setTimeout(resolve, 600))
    const list = Array.from({ length: size }, (_, i) => {
      const id = (page - 1) * size + i + 1
      return { id, title: \`文章标题 #\${id}\` }
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

## 基础用法

<DemoBlock title="useLoadMore 加载更多按钮" :ts-code="tsBtnDemo" :js-code="toJs(tsBtnDemo)">
  <div>
    <div style="display:flex; gap:12px; margin-bottom:12px">
      <yh-button type="primary" :loading="postsLoadingMore" :disabled="postsNoMore" @click="() => fetchMorePosts()">
        {{ postsNoMore ? '没有更多数据' : '加载更多' }}
      </yh-button>
      <yh-button @click="() => resetPosts()">重置</yh-button>
    </div>
    <div v-if="postsLoading && postsList.length === 0" style="text-align:center; padding:20px 0; color:var(--yh-text-color-secondary)">
      首次加载数据中...
    </div>
    <div v-else style="display:flex; flex-direction:column; gap:8px">
      <div v-for="post in postsList" :key="post.id" style="padding:10px 14px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
        <b>ID: {{ post.id }}</b> - {{ post.title }}
      </div>
    </div>
  </div>
</DemoBlock>

## 返回值

```typescript
const result = useLoadMore<TData>(service, options)
```

| 字段          | 类型                             | 说明                                            |
| ------------- | -------------------------------- | ----------------------------------------------- |
| `current`     | `Ref<number>`                    | 当前页码                                        |
| `pageSize`    | `Ref<number>`                    | 每页条数                                        |
| `total`       | `Ref<number>`                    | 总数                                            |
| `totalPages`  | `Ref<number>`                    | 总页数                                          |
| `data`        | `ShallowRef<TData \| undefined>` | 数据（通常为数组或带 list 的对象）              |
| `loading`     | `Ref<boolean>`                   | 首屏加载中                                      |
| `refreshing`  | `Ref<boolean>`                   | 刷新中                                          |
| `loadingMore` | `Ref<boolean>`                   | 正在加载更多                                    |
| `error`       | `ShallowRef<unknown>`            | 错误                                            |
| `params`      | `Ref<unknown[]>`                 | 额外参数                                        |
| `noMore`      | `Ref<boolean>`                   | 是否没有更多                                    |
| `canLoadMore` | `Ref<boolean>`                   | 是否可以加载更多                                |
| `loadMore()`  | —                                | 加载下一页并追加数据                            |
| `reload()`    | —                                | 重置并重新加载                                  |
| `refresh()`   | —                                | 刷新当前数据                                    |
| `pagination`  | —                                | 一组分页工具方法（与 `usePagination` 接口兼容） |

## 配置项

`useLoadMore(service, options)` 的第一个参数为请求函数 `service(page, pageSize, ...args)`，第二个参数为配置项：

```typescript
interface UseLoadMoreOptions<TData, TParams extends unknown[]> {
  initialPage?: number // 初始页码，默认 1
  pageSize?: number // 每页条数，默认 10
  isLoadMore?: boolean // 是否允许加载更多，默认 true
  threshold?: number // 无限滚动触底阈值（预留）
  loadMoreService?: (page: number, pageSize: number) => Promise<RequestResponse<TData>> // 加载更多时使用的请求（可与 service 不同）
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (error: unknown, params: TParams) => void
  onFinally?: (params: TParams) => void
  manual?: boolean // 是否手动触发首次加载
  defaultParams?: TParams // 除 page、pageSize 外的额外参数
}
```

## 结合分页方法与滚动加载（防止页码漂移）

当无限滚动容器与特定的分页或页码跳转逻辑（例如调用 `pagination.loadPage(n)`）结合使用时，列表数据替换（从长列表缩短为单页列表）可能由于 DOM 尺寸变化或滚动位置改变立即自动触发滚动容器 of 滚动事件，进而导致意外调用 `loadMore()`，引起页码漂移（如跳转到第 `n` 页后立刻漂移加载 `n + 1` 页）。

为了解决该问题：

1. **内置冷却保护**：`useLoadMore` 内部已内置了针对 `reload / refresh / loadPage` 的 100ms 冷却保护。在刷新/切换页码完成后 100ms 内，任何滚动自动触发的 `loadMore` 都将被忽略。
2. **业务端防抖/重置**：在业务逻辑中，执行 `loadPage` 等跳转操作时，推荐显式将滚动容器的滚动位置重置回顶部 `el.scrollTop = 0`，以彻底规避浏览器的布局滚动触发。

以下演示了滚动触底加载更多，并在控制面板通过 `goToPage` 安全导航。

<DemoBlock title="滚动加载与分页安全切换" :ts-code="tsScrollDemo" :js-code="toJs(tsScrollDemo)">
  <div>
    <!-- 控制跳转 -->
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">跳转页码:</span>
      <yh-button size="small" @click="() => handleGoToPage(1)">第 1 页</yh-button>
      <yh-button size="small" @click="() => handleGoToPage(2)">第 2 页</yh-button>
      <yh-button size="small" @click="() => handleGoToPage(3)">第 3 页</yh-button>
    </div>
    <!-- 滚动容器 -->
    <div ref="scrollRef" style="height:200px; overflow-y:auto; border:1px solid var(--yh-border-color); border-radius:8px; padding:12px; position:relative" @scroll="handleScrollTrigger">
      <div v-if="scrollLoading" style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--yh-text-color-secondary); font-size:13px">
        加载中...
      </div>
      <template v-else>
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="post in scrollList" :key="post.id" style="padding:8px 12px; background:var(--yh-bg-color-page); border-radius:6px; font-size:13px">
            <b>#{{ post.id }}</b> {{ post.title }}
          </div>
        </div>
        <div v-if="scrollLoadingMore" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          加载中...
        </div>
        <div v-else-if="!scrollCanLoadMore && scrollList.length > 0" style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          已加载完毕
        </div>
        <div v-else style="text-align:center; padding:12px 0; font-size:13px; color:var(--yh-text-color-secondary)">
          往下滑动加载更多...
        </div>
      </template>
    </div>
  </div>
</DemoBlock>

## 与 usePagination 的关系

- `usePagination`：适合「有明确分页控件」的场景（页码切换）
- `useLoadMore`：适合「瀑布流 / 无限滚动」场景（不断往下追加）

两者的 `pagination` 返回值基本兼容，可以在需要时互相切换实现方式。
