# useRequest

`useRequest` 是 `@yh-ui/request` 提供的通用请求 Hook，用于在 Vue 组件中优雅地管理异步请求的整个生命周期：加载状态、错误、重试、防抖/节流等。

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRequest, useRequestPolling } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// 1. 基础用法 Demo
const { data: userData, loading: userLoading, run: fetchUsers } = useRequest(async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json())
}, { manual: true })

const userList = computed(() => userData.value || [])

onMounted(() => fetchUsers())

// 手动执行的数据获取
const searchId = ref(1)
const { data: detailData, loading: detailLoading, run: fetchDetail } = useRequest(async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 600))
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json())
}, {
  manual: true,
  defaultParams: [1]
})

const detailUser = computed(() => detailData.value)

const tsBasicDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- 自动加载 -->
    <div>
      <h5 style="margin:0 0 12px 0">自动加载用户列表</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-button type="primary" :loading="loading" @click="() => run()">刷新列表</yh-button>
      </div>
      <yh-spin :show="loading">
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="user in userList" :key="user.id" style="padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
            {{ user.name }} ({{ user.email }})
          </div>
        </div>
      </yh-spin>
    </div>

    <!-- 手动触发 -->
    <div>
      <h5 style="margin:0 0 12px 0">按 ID 手动查询</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-input v-model="searchId" type="number" style="width:120px" />
        <yh-button type="primary" :loading="detailLoading" @click="() => fetchDetail(Number(searchId))">查询</yh-button>
      </div>
      <yh-spin :show="detailLoading">
        <div v-if="detailUser" style="padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
          <div style="font-weight:bold; margin-bottom:4px">{{ detailUser.name }}</div>
          <div style="font-size:12px; color:var(--yh-text-color-secondary)">邮箱: {{ detailUser.email }} | 城市: {{ detailUser.address?.city }}</div>
        </div>
      </yh-spin>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useRequest } from '@yh-ui/request'

// 自动加载列表
const { data, loading, run } = useRequest(() => 
  fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json())
)

const userList = computed(() => data.value || [])

// 手动查询
const searchId = ref(1)
const { data: detailData, loading: detailLoading, run: fetchDetail } = useRequest(
  (id: number) => fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`).then(r => r.json()),
  { manual: true, defaultParams: [1] }
)

const detailUser = computed(() => detailData.value)
</${_S}>`

// 2. 防抖与节流 Demo
const clickCount = ref(0)
const submitTriggered = ref(0)
const searchTerm = ref('')
const searchResult = ref('请输入搜索词')

const { run: runSearch } = useRequest(async (val: string) => {
  searchResult.value = val ? `正在搜索: "${val}"` : '请输入搜索词'
}, {
  manual: true,
  debounceWait: 400
})

const handleSearchInput = (val: string | number) => {
  const strVal = String(val)
  searchTerm.value = strVal
  runSearch(strVal)
}

const { run: runSubmit } = useRequest(async () => {
  submitTriggered.value++
}, {
  manual: true,
  throttleWait: 1000
})

const handleSubmitClick = () => {
  clickCount.value++
  runSubmit()
}

const tsDebounceThrottleDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- 防抖搜索 -->
    <div>
      <h5 style="margin:0 0 12px 0">输入框搜索（防抖 400ms）</h5>
      <yh-input :model-value="searchTerm" placeholder="快速输入试试..." @update:model-value="handleSearch" style="width:240px; margin-bottom:12px" />
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">{{ searchResult }}</div>
    </div>

    <!-- 节流提交 -->
    <div>
      <h5 style="margin:0 0 12px 0">快速点击按钮（节流 1000ms）</h5>
      <yh-button type="primary" @click="submit">频繁点击我</yh-button>
      <div style="margin-top:12px; font-size:14px; display:flex; gap:24px">
        <span>按钮被点击次数: <b>{{ clicks }}</b></span>
        <span>实际发送请求次数: <b style="color:var(--yh-color-success)">{{ triggers }}</b></span>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'

const searchTerm = ref('')
const searchResult = ref('请输入搜索词')
const { run: runSearch } = useRequest(
  async (val: string) => { searchResult.value = val ? \`正在搜索: "\${val}"\` : '请输入搜索词' },
  { manual: true, debounceWait: 400 }
)
const handleSearch = (val: string) => {
  searchTerm.value = val
  runSearch(val)
}

const clicks = ref(0)
const triggers = ref(0)
const { run: runSubmit } = useRequest(async () => { triggers.value++ }, {
  manual: true,
  throttleWait: 1000
})
const submit = () => {
  clicks.value++
  runSubmit()
}
</${_S}>`

// 3. mutate & cancel Demo
const localUsers = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
])
const { run: runSlowRequest, cancel: cancelSlowRequest, loading: slowLoading } = useRequest(async () => {
  await new Promise(resolve => setTimeout(resolve, 5000))
}, { manual: true })

const addLocalUser = () => {
  const newId = localUsers.value.length + 1
  localUsers.value = [...localUsers.value, { id: newId, name: `New User ${newId}` }]
}

const tsMutateCancelDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- mutate -->
    <div>
      <h5 style="margin:0 0 12px 0">本地乐观修改 (mutate)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" @click="addUser">添加新用户</yh-button>
        <yh-button @click="resetUsers">重置列表</yh-button>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <yh-tag v-for="user in users" :key="user.id" type="success">{{ user.name }}</yh-tag>
      </div>
    </div>

    <!-- cancel -->
    <div>
      <h5 style="margin:0 0 12px 0">取消延时请求 (cancel)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" :loading="loading" @click="start">开始超慢请求 (5s)</yh-button>
        <yh-button type="danger" :disabled="!loading" @click="stop">取消请求</yh-button>
      </div>
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">
        当前状态: <b :style="{ color: loading ? 'var(--yh-color-primary)' : 'var(--yh-text-color-secondary)' }">{{ loading ? '正在请求中 (可取消)...' : '空闲 / 已取消' }}</b>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'

// mutate 演示
const users = ref([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
const addUser = () => {
  const nextId = users.value.length + 1
  users.value = [...users.value, { id: nextId, name: 'New User ' + nextId }]
}
const resetUsers = () => {
  users.value = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
}

// cancel 演示
const { run, cancel, loading } = useRequest(
  () => new Promise(resolve => setTimeout(resolve, 5000)),
  { manual: true }
)
const start = () => run()
const stop = () => cancel()
</${_S}>`

// 4. Polling Demo
const pollingProgress = ref(0)
const isPollingActive = ref(true)

const { pause: stopPolling, resume: startPolling } = useRequestPolling(async () => {
  if (pollingProgress.value >= 100) {
    pollingProgress.value = 0
  }
  pollingProgress.value = Math.min(100, pollingProgress.value + 15)
}, {
  polling: true,
  pollingInterval: 2000,
  manual: false
})

const handleTogglePolling = () => {
  if (isPollingActive.value) {
    stopPolling()
    isPollingActive.value = false
  } else {
    startPolling()
    isPollingActive.value = true
  }
}

const tsPollingDemo = `<${_T}>
  <div>
    <h5 style="margin:0 0 12px 0">数据轮询状态展示 (每 2 秒进度增加)</h5>
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px">
      <yh-button :type="active ? 'danger' : 'primary'" @click="toggle">
        {{ active ? '暂停轮询' : '恢复轮询' }}
      </yh-button>
      <yh-tag :type="active ? 'success' : 'info'">{{ active ? '轮询进行中' : '已暂停' }}</yh-tag>
    </div>
    
    <div style="max-width:400px">
      <div style="margin-bottom:8px; font-size:14px">模拟进度: {{ progress }}%</div>
      <yh-progress :percentage="progress" />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequestPolling } from '@yh-ui/request'

const progress = ref(0)
const active = ref(true)

const { pause, resume } = useRequestPolling(
  async () => {
    if (progress.value >= 100) progress.value = 0
    progress.value = Math.min(100, progress.value + 15)
  },
  { polling: true, pollingInterval: 2000 }
)

const toggle = () => {
  if (active.value) {
    pause()
    active.value = false
  } else {
    resume()
    active.value = true
  }
}
</${_S}>`
</script>

## 基础用法

<DemoBlock title="useRequest 基础用法" :ts-code="tsBasicDemo" :js-code="toJs(tsBasicDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- 自动加载 -->
    <div>
      <h5 style="margin:0 0 12px 0">自动加载用户列表</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-button type="primary" :loading="userLoading" @click="() => fetchUsers()">刷新列表</yh-button>
      </div>
      <yh-spin :show="userLoading">
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="user in userList" :key="user.id" style="padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
            {{ user.name }} ({{ user.email }})
          </div>
        </div>
      </yh-spin>
    </div>
    <!-- 手动触发 -->
    <div>
      <h5 style="margin:0 0 12px 0">按 ID 手动查询</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-input v-model="searchId" type="number" style="width:120px" />
        <yh-button type="primary" :loading="detailLoading" @click="() => fetchDetail(Number(searchId))">查询</yh-button>
      </div>
      <yh-spin :show="detailLoading">
        <div v-if="detailUser" style="padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
          <div style="font-weight:bold; margin-bottom:4px">{{ detailUser.name }}</div>
          <div style="font-size:12px; color:var(--yh-text-color-secondary)">邮箱: {{ detailUser.email }} | 城市: {{ detailUser.address?.city }}</div>
        </div>
      </yh-spin>
    </div>
  </div>
</DemoBlock>

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

`useRequest(service, options)` 的 `options` 继承自请求库的 `RequestOptions`（如 `baseURL`、`timeout`..），并包含以下 Hook 专用配置：

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

## 防抖与节流

<DemoBlock title="防抖与节流示例" :ts-code="tsDebounceThrottleDemo" :js-code="toJs(tsDebounceThrottleDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- 防抖搜索 -->
    <div>
      <h5 style="margin:0 0 12px 0">输入框搜索（防抖 400ms）</h5>
      <yh-input :model-value="searchTerm" placeholder="快速输入试试..." @update:model-value="handleSearchInput" style="width:240px; margin-bottom:12px" />
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">{{ searchResult }}</div>
    </div>
    <!-- 节流提交 -->
    <div>
      <h5 style="margin:0 0 12px 0">快速点击按钮（节流 1000ms）</h5>
      <yh-button type="primary" @click="handleSubmitClick">频繁点击我</yh-button>
      <div style="margin-top:12px; font-size:14px; display:flex; gap:24px">
        <span>按钮被点击次数: <b>{{ clickCount }}</b></span>
        <span>实际发送请求次数: <b style="color:var(--yh-color-success)">{{ submitTriggered }}</b></span>
      </div>
    </div>
  </div>
</DemoBlock>

## mutate：本地数据更新 & cancel：取消请求

<DemoBlock title="乐观更新 & 请求取消" :ts-code="tsMutateCancelDemo" :js-code="toJs(tsMutateCancelDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- mutate -->
    <div>
      <h5 style="margin:0 0 12px 0">本地乐观修改 (mutate)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" @click="addLocalUser">添加新用户</yh-button>
        <yh-button @click="() => { localUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }">重置列表</yh-button>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <yh-tag v-for="user in localUsers" :key="user.id" type="success">{{ user.name }}</yh-tag>
      </div>
    </div>
    <!-- cancel -->
    <div>
      <h5 style="margin:0 0 12px 0">取消延时请求 (cancel)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" :loading="slowLoading" @click="() => runSlowRequest()">开始超慢请求 (5s)</yh-button>
        <yh-button type="danger" :disabled="!slowLoading" @click="() => cancelSlowRequest()">取消请求</yh-button>
      </div>
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">
        当前状态: <b :style="{ color: slowLoading ? 'var(--yh-color-primary)' : 'var(--yh-text-color-secondary)' }">{{ slowLoading ? '正在请求中 (可取消)...' : '空闲 / 已取消' }}</b>
      </div>
    </div>
  </div>
</DemoBlock>

## 轮询（useRequestPolling）

<DemoBlock title="轮询示例" :ts-code="tsPollingDemo" :js-code="toJs(tsPollingDemo)">
  <div>
    <h5 style="margin:0 0 12px 0">数据轮询状态展示 (每 2 秒进度增加)</h5>
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px">
      <yh-button :type="isPollingActive ? 'danger' : 'primary'" @click="handleTogglePolling">
        {{ isPollingActive ? '暂停轮询' : '恢复轮询' }}
      </yh-button>
      <yh-tag :type="isPollingActive ? 'success' : 'info'">{{ isPollingActive ? '轮询进行中' : '已暂停' }}</yh-tag>
    </div>
    <div style="max-width:400px">
      <div style="margin-bottom:8px; font-size:14px">模拟进度: {{ pollingProgress }}%</div>
      <yh-progress :percentage="pollingProgress" />
    </div>
  </div>
</DemoBlock>

### 轮询配置项

| 参数                | 类型      | 默认值  | 说明                     |
| ------------------- | --------- | ------- | ------------------------ |
| `polling`           | `boolean` | `false` | 是否开启轮询             |
| `pollingInterval`   | `number`  | `3000`  | 轮询间隔（毫秒）         |
| `pollingWhenHidden` | `boolean` | `false` | 页面不可见时是否暂停轮询 |

其余配置与 `useRequest` 相同。返回值为 `useRequest` 的返回值外加 `pause`、`resume`。

## 与 SWR / 分页等组合

更多高级用法请参考：

- [useRequestSWR](./use-swr) - 基于 `useRequest` 的 SWR 缓存模式
- [usePagination](./use-pagination) - 分页请求管理
- [useLoadMore](./use-load-more) - 无限滚动 / 加载更多
- [useQueue](./use-queue) - 请求队列与并发控制
