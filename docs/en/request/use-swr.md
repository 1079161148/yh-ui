# useRequestSWR

`useRequestSWR` is a Vue Hook designed specifically to implement the **Stale-While-Revalidate** caching strategy. It prioritizes displaying cached (stale) data during the initial screen load or dependency updates, while silently executing a network request in the background (revalidate) to fetch the latest data and update, providing a latency-free user experience.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestSWR } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const mockUsers: Record<number, any> = {
  1: { name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: { city: 'Gwenborough' } },
  2: { name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: { city: 'Wisokyburgh' } },
  3: { name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: { city: 'McKenziehaven' } }
}

const activeUserId = ref(1)
const lastRequestTime = ref<Record<number, string>>({})

const { data: profile, loading: isProfileLoading } = useRequestSWR(
  () => `user_profile_${activeUserId.value}`,
  async () => {
    // Simulate network delay of 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000))
    const user = mockUsers[activeUserId.value] || { name: 'Unknown', username: '', email: '', address: { city: '' } }
    lastRequestTime.value[activeUserId.value] = new Date().toLocaleTimeString()
    return user
  },
  {
    staleTime: 5000, // Fresh data for 5 seconds
    cacheTime: 60000, // Retain cache for 60 seconds
    refreshDeps: [activeUserId]
  }
)

const profileData = computed(() => profile.value)
// When loading is true and profileData already exists, a background revalidation is in progress
const isRevalidating = computed(() => isProfileLoading.value && !!profileData.value)

const handleUserSelect = (id: number) => {
  activeUserId.value = id
}

const tsSWRDemo = `<${_T}>
  <div>
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">Select User:</span>
      <yh-button size="small" :type="activeId === 1 ? 'primary' : 'default'" @click="changeUser(1)">User 1 (Leanne)</yh-button>
      <yh-button size="small" :type="activeId === 2 ? 'primary' : 'default'" @click="changeUser(2)">User 2 (Ervin)</yh-button>
      <yh-button size="small" :type="activeId === 3 ? 'primary' : 'default'" @click="changeUser(3)">User 3 (Clementine)</yh-button>
    </div>

    <div style="border:1px solid var(--yh-border-color); border-radius:8px; padding:16px; min-height:120px; position:relative; background:var(--yh-bg-color-page)">
      <div v-if="loading && !profileData" style="text-align:center; padding-top:20px">
        Loading user for the first time...
      </div>
      <div v-else-if="profileData">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h5 style="margin:0; font-size:15px; font-weight:bold">{{ profileData.name }}</h5>
          <div style="display:flex; gap:8px">
            <yh-tag v-if="revalidating" type="warning" size="small">Revalidating in background...</yh-tag>
            <yh-tag v-else type="success" size="small">Data Cached</yh-tag>
          </div>
        </div>
        <p style="margin:4px 0; font-size:13px">Username: {{ profileData.username }}</p>
        <p style="margin:4px 0; font-size:13px">Email: {{ profileData.email }}</p>
        <p style="margin:4px 0; font-size:13px">City: {{ profileData.address?.city }}</p>
        <div style="margin-top:12px; font-size:11px; color:var(--yh-text-color-secondary)">
          Last Refreshed: {{ lastRequestTime[activeId] || 'Loading...' }}
        </div>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestSWR } from '@yh-ui/request'

const mockUsers: Record<number, any> = {
  1: { name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: { city: 'Gwenborough' } },
  2: { name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: { city: 'Wisokyburgh' } },
  3: { name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: { city: 'McKenziehaven' } }
}

const activeId = ref(1)
const lastRequestTime = ref<Record<number, string>>({})

const { data: profile, loading } = useRequestSWR(
  () => \`user_profile_\${activeId.value}\`,
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const user = mockUsers[activeId.value] || { name: 'Unknown', username: '', email: '', address: { city: '' } }
    lastRequestTime.value[activeId.value] = new Date().toLocaleTimeString()
    return user
  },
  {
    staleTime: 5000, // 5 seconds staleTime
    cacheTime: 60000,
    refreshDeps: [activeId]
  }
)

const profileData = computed(() => profile.value)
// When loading is true and profileData already exists, a background revalidation is in progress
const revalidating = computed(() => loading.value && !!profileData.value)

const changeUser = (id: number) => {
  activeId.value = id
}
</${_S}>`
</script>

## Basic Usage & SWR Cache Strategy Demo

In the interactive demo below:

- Selecting a user for the first time triggers a 1-second load request.
- Switching back to a user that has already been loaded displays their cached details **instantly** (zero delay). Simultaneously, a silent revalidation request is executed in the background.
- After 1 second, the background fetch completes and updates the view seamlessly. The tag status returns to "Data Cached" and the refreshed timestamp updates.
- This demo sets `staleTime: 5000`. If you reselect a user within 5 seconds, it is considered fresh and no revalidation is triggered.

<DemoBlock title="SWR Cache Loading Demo" :ts-code="tsSWRDemo" :js-code="toJs(tsSWRDemo)">
  <div>
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">Select User:</span>
      <yh-button size="small" :type="activeUserId === 1 ? 'primary' : 'default'" @click="() => handleUserSelect(1)">User 1 (Leanne)</yh-button>
      <yh-button size="small" :type="activeUserId === 2 ? 'primary' : 'default'" @click="() => handleUserSelect(2)">User 2 (Ervin)</yh-button>
      <yh-button size="small" :type="activeUserId === 3 ? 'primary' : 'default'" @click="() => handleUserSelect(3)">User 3 (Clementine)</yh-button>
    </div>
    <div style="border:1px solid var(--yh-border-color); border-radius:8px; padding:16px; min-height:120px; position:relative; background:var(--yh-bg-color-page)">
      <div v-if="isProfileLoading && !profileData" style="text-align:center; padding-top:20px">
        Loading user for the first time...
      </div>
      <div v-else-if="profileData">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h5 style="margin:0; font-size:15px; font-weight:bold">{{ profileData.name }}</h5>
          <div style="display:flex; gap:8px">
            <yh-tag v-if="isRevalidating" type="warning" size="small">Revalidating in background...</yh-tag>
            <yh-tag v-else type="success" size="small">Data Cached</yh-tag>
          </div>
        </div>
        <p style="margin:4px 0; font-size:13px">Username: {{ profileData.username }}</p>
        <p style="margin:4px 0; font-size:13px">Email: {{ profileData.email }}</p>
        <p style="margin:4px 0; font-size:13px">City: {{ profileData.address?.city }}</p>
        <div style="margin-top:12px; font-size:11px; color:var(--yh-text-color-secondary)">
          Last Refreshed: {{ lastRequestTime[activeUserId] || 'Loading...' }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Options

```typescript
export interface UseRequestSWROptions<TData, TParams extends unknown[]> extends UseRequestOptions<
  TData,
  TParams
> {
  swr?: boolean // Enable SWR mode
  cacheKey?: string // Cache key
  staleTime?: number // Stale threshold (ms)
  cacheTime?: number // Retention threshold (ms)
  getCache?: (key: string) => TData | undefined // Custom cache reader
  setCache?: (key: string, value: TData) => void // Custom cache writer
  refreshOnWindowFocus?: boolean // Revalidate when window focuses
  refreshDepsWait?: number // Debounce for dependency changes
  refreshDeps?: Ref<unknown>[] // Dependency array
}
```

### Recommendation

- **List / Config interfaces**: set `staleTime` to 5-30 minutes.
- **Detail interfaces**: set `staleTime` to 1-5 minutes.
- **Real-time interfaces (e.g., Stocks, Monitors)**: SWR is not recommended (or `staleTime = 0`).

## Custom Cache Management

You can supply custom `getCache` / `setCache` to integrate with external state managers (e.g., Pinia or IndexedDB).

```typescript
import { reactive } from 'vue'

const cacheStore = reactive(new Map<string, unknown>())

const { data } = useRequestSWR('app_config', (key) => request.get('/api/config'), {
  getCache: (key) => cacheStore.get(key),
  setCache: (key, value) => cacheStore.set(key, value)
})
```

## Coordination with Pagination / Load More

For typical list navigation, we recommend using dedicated hooks:

- [usePagination](./use-pagination) - Traditional tables with page numbers
- [useLoadMore](./use-load-more) - Infinite scrolling lists

SWR is most useful as a caching strategy for detail views or global configuration datasets.

## Summary

- **useRequestSWR** displays stale cached data immediately for subsequent views, revalidating against the backend silently.
- Ideal for **read-heavy, write-light** endpoints that do not require absolute real-time currency on every page load.
- Operates on reactive dependencies and independent lifecycles.
