# useRequest

`useRequest` is a general-purpose request Hook provided by `@yh-ui/request` for elegantly managing the entire lifecycle of async requests in Vue components: loading state, errors, retry, debounce/throttle, etc.

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRequest, useRequestPolling } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// 1. Basic Usage Demo
const { data: userData, loading: userLoading, run: fetchUsers } = useRequest(async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json())
}, { manual: true })

const userList = computed(() => userData.value || [])

onMounted(() => fetchUsers())

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
    <!-- Auto Loading -->
    <div>
      <h5 style="margin:0 0 12px 0">Auto Load User List</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-button type="primary" :loading="loading" @click="() => run()">Refresh List</yh-button>
      </div>
      <yh-spin :show="loading">
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="user in userList" :key="user.id" style="padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
            {{ user.name }} ({{ user.email }})
          </div>
        </div>
      </yh-spin>
    </div>

    <!-- Manual Trigger -->
    <div>
      <h5 style="margin:0 0 12px 0">Manual Query by ID</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-input v-model="searchId" type="number" style="width:120px" />
        <yh-button type="primary" :loading="detailLoading" @click="() => fetchDetail(Number(searchId))">Query</yh-button>
      </div>
      <yh-spin :show="detailLoading">
        <div v-if="detailUser" style="padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
          <div style="font-weight:bold; margin-bottom:4px">{{ detailUser.name }}</div>
          <div style="font-size:12px; color:var(--yh-text-color-secondary)">Email: {{ detailUser.email }} | City: {{ detailUser.address?.city }}</div>
        </div>
      </yh-spin>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useRequest } from '@yh-ui/request'

// Auto load list
const { data, loading, run } = useRequest(() => 
  fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json())
)

const userList = computed(() => data.value || [])

// Manual query
const searchId = ref(1)
const { data: detailData, loading: detailLoading, run: fetchDetail } = useRequest(
  (id: number) => fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`).then(r => r.json()),
  { manual: true, defaultParams: [1] }
)

const detailUser = computed(() => detailData.value)
</${_S}>`

// 2. Debounce & Throttle Demo
const clickCount = ref(0)
const submitTriggered = ref(0)
const searchTerm = ref('')
const searchResult = ref('Please enter a search term')

const { run: runSearch } = useRequest(async (val: string) => {
  searchResult.value = val ? `Searching: "${val}"` : 'Please enter a search term'
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
    <!-- Debounce Search -->
    <div>
      <h5 style="margin:0 0 12px 0">Search Input (Debounce 400ms)</h5>
      <yh-input :model-value="searchTerm" placeholder="Try typing fast..." @update:model-value="handleSearch" style="width:240px; margin-bottom:12px" />
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">{{ searchResult }}</div>
    </div>

    <!-- Throttle Submit -->
    <div>
      <h5 style="margin:0 0 12px 0">Quick Click Button (Throttle 1000ms)</h5>
      <yh-button type="primary" @click="submit">Click Me Repeatedly</yh-button>
      <div style="margin-top:12px; font-size:14px; display:flex; gap:24px">
        <span>Button clicked: <b>{{ clicks }}</b></span>
        <span>Actual requests sent: <b style="color:var(--yh-color-success)">{{ triggers }}</b></span>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'

const searchTerm = ref('')
const searchResult = ref('Please enter a search term')
const { run: runSearch } = useRequest(
  async (val: string) => { searchResult.value = val ? \`Searching: "\${val}"\` : 'Please enter a search term' },
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
      <h5 style="margin:0 0 12px 0">Local Optimistic Update (mutate)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" @click="addUser">Add New User</yh-button>
        <yh-button @click="resetUsers">Reset List</yh-button>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <yh-tag v-for="user in users" :key="user.id" type="success">{{ user.name }}</yh-tag>
      </div>
    </div>

    <!-- cancel -->
    <div>
      <h5 style="margin:0 0 12px 0">Cancel Delayed Request (cancel)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" :loading="loading" @click="start">Start Slow Request (5s)</yh-button>
        <yh-button type="danger" :disabled="!loading" @click="stop">Cancel Request</yh-button>
      </div>
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">
        Current State: <b :style="{ color: loading ? 'var(--yh-color-primary)' : 'var(--yh-text-color-secondary)' }">{{ loading ? 'Requesting (can cancel)...' : 'Idle / Cancelled' }}</b>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'

// mutate demo
const users = ref([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
const addUser = () => {
  const nextId = users.value.length + 1
  users.value = [...users.value, { id: nextId, name: 'New User ' + nextId }]
}
const resetUsers = () => {
  users.value = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
}

// cancel demo
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
    <h5 style="margin:0 0 12px 0">Data Polling Progress (Increments every 2s)</h5>
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px">
      <yh-button :type="active ? 'danger' : 'primary'" @click="toggle">
        {{ active ? 'Pause Polling' : 'Resume Polling' }}
      </yh-button>
      <yh-tag :type="active ? 'success' : 'info'">{{ active ? 'Polling Active' : 'Paused' }}</yh-tag>
    </div>
    
    <div style="max-width:400px">
      <div style="margin-bottom:8px; font-size:14px">Simulated Progress: {{ progress }}%</div>
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

## Basic Usage

<DemoBlock title="useRequest Basic Usage" :ts-code="tsBasicDemo" :js-code="toJs(tsBasicDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- Auto Loading -->
    <div>
      <h5 style="margin:0 0 12px 0">Auto Load User List</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-button type="primary" :loading="userLoading" @click="() => fetchUsers()">Refresh List</yh-button>
      </div>
      <yh-spin :show="userLoading">
        <div style="display:flex; flex-direction:column; gap:8px">
          <div v-for="user in userList" :key="user.id" style="padding:8px 12px; border:1px solid var(--yh-border-color); border-radius:6px; font-size:14px">
            {{ user.name }} ({{ user.email }})
          </div>
        </div>
      </yh-spin>
    </div>
    <!-- Manual Trigger -->
    <div>
      <h5 style="margin:0 0 12px 0">Manual Query by ID</h5>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <yh-input v-model="searchId" type="number" style="width:120px" />
        <yh-button type="primary" :loading="detailLoading" @click="() => fetchDetail(Number(searchId))">Query</yh-button>
      </div>
      <yh-spin :show="detailLoading">
        <div v-if="detailUser" style="padding:12px; border:1px solid var(--yh-border-color); border-radius:8px; background:var(--yh-bg-color-page)">
          <div style="font-weight:bold; margin-bottom:4px">{{ detailUser.name }}</div>
          <div style="font-size:12px; color:var(--yh-text-color-secondary)">Email: {{ detailUser.email }} | City: {{ detailUser.address?.city }}</div>
        </div>
      </yh-spin>
    </div>
  </div>
</DemoBlock>

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

The `options` of `useRequest(service, options)` extend the request library's `RequestOptions` (e.g. `baseURL`, `timeout`..) and include these Hook-specific options:

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

## Debounce & Throttle

<DemoBlock title="Debounce & Throttle Demo" :ts-code="tsDebounceThrottleDemo" :js-code="toJs(tsDebounceThrottleDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- Debounce Search -->
    <div>
      <h5 style="margin:0 0 12px 0">Search Input (Debounce 400ms)</h5>
      <yh-input :model-value="searchTerm" placeholder="Try typing fast..." @update:model-value="handleSearchInput" style="width:240px; margin-bottom:12px" />
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">{{ searchResult }}</div>
    </div>
    <!-- Throttle Submit -->
    <div>
      <h5 style="margin:0 0 12px 0">Quick Click Button (Throttle 1000ms)</h5>
      <yh-button type="primary" @click="handleSubmitClick">Click Me Repeatedly</yh-button>
      <div style="margin-top:12px; font-size:14px; display:flex; gap:24px">
        <span>Button clicked: <b>{{ clickCount }}</b></span>
        <span>Actual requests sent: <b style="color:var(--yh-color-success)">{{ submitTriggered }}</b></span>
      </div>
    </div>
  </div>
</DemoBlock>

## mutate: Local Data Update & cancel: Cancel Request

<DemoBlock title="Optimistic Update & Request Cancellation" :ts-code="tsMutateCancelDemo" :js-code="toJs(tsMutateCancelDemo)">
  <div style="display:flex; flex-direction:column; gap:24px">
    <!-- mutate -->
    <div>
      <h5 style="margin:0 0 12px 0">Local Optimistic Update (mutate)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" @click="addLocalUser">Add New User</yh-button>
        <yh-button @click="() => { localUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }">Reset List</yh-button>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <yh-tag v-for="user in localUsers" :key="user.id" type="success">{{ user.name }}</yh-tag>
      </div>
    </div>
    <!-- cancel -->
    <div>
      <h5 style="margin:0 0 12px 0">Cancel Delayed Request (cancel)</h5>
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
        <yh-button type="primary" :loading="slowLoading" @click="() => runSlowRequest()">Start Slow Request (5s)</yh-button>
        <yh-button type="danger" :disabled="!slowLoading" @click="() => cancelSlowRequest()">Cancel Request</yh-button>
      </div>
      <div style="font-size:14px; color:var(--yh-text-color-secondary)">
        Current State: <b :style="{ color: loading ? 'var(--yh-color-primary)' : 'var(--yh-text-color-secondary)' }">{{ loading ? 'Requesting (can cancel)...' : 'Idle / Cancelled' }}</b>
      </div>
    </div>
  </div>
</DemoBlock>

## Polling (useRequestPolling)

<DemoBlock title="Polling Demo" :ts-code="tsPollingDemo" :js-code="toJs(tsPollingDemo)">
  <div>
    <h5 style="margin:0 0 12px 0">Data Polling Progress (Increments every 2s)</h5>
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px">
      <yh-button :type="isPollingActive ? 'danger' : 'primary'" @click="handleTogglePolling">
        {{ isPollingActive ? 'Pause Polling' : 'Resume Polling' }}
      </yh-button>
      <yh-tag :type="isPollingActive ? 'success' : 'info'">{{ isPollingActive ? 'Polling Active' : 'Paused' }}</yh-tag>
    </div>
    <div style="max-width:400px">
      <div style="margin-bottom:8px; font-size:14px">Simulated Progress: {{ pollingProgress }}%</div>
      <yh-progress :percentage="pollingProgress" />
    </div>
  </div>
</DemoBlock>

### Polling options

| Option              | Type      | Default | Description                            |
| ------------------- | --------- | ------- | -------------------------------------- |
| `polling`           | `boolean` | `false` | Enable polling                         |
| `pollingInterval`   | `number`  | `3000`  | Polling interval (ms)                  |
| `pollingWhenHidden` | `boolean` | `false` | Pause polling when page is not visible |

Other options are the same as `useRequest`. Return value is the same as `useRequest` plus `pause` and `resume`.

## Combine with SWR / Pagination

For more advanced usage, see:

- [useRequestSWR](./use-swr) - SWR caching mode based on `useRequest`
- [usePagination](./use-pagination) - Pagination request management
- [useLoadMore](./use-load-more) - Infinite scroll / load more
- [useQueue](./use-queue) - Request queue and concurrency control
