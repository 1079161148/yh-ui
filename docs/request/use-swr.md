# useRequestSWR

`useRequestSWR` 是一个专门用于实现 **先返回缓存，再后台刷新** 的 Stale-While-Revalidate 缓存策略 of Vue Hook。它在首屏加载或参数变更时优先展现已缓存的陈旧（stale）数据，同时在后台静默发起网络请求拉取最新数据（revalidate）并自动更新，从而闭环 SWR 语义，提供流畅的用户体验。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestSWR } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
    // 模拟网络延迟 1000ms
    await new Promise(resolve => setTimeout(resolve, 1000))
    const user = mockUsers[activeUserId.value] || { name: 'Unknown', username: '', email: '', address: { city: '' } }
    lastRequestTime.value[activeUserId.value] = new Date().toLocaleTimeString()
    return user
  },
  {
    staleTime: 5000, // 5秒内数据算新鲜，不发后台请求
    cacheTime: 60000, // 缓存保留60秒
    refreshDeps: [activeUserId]
  }
)

const profileData = computed(() => profile.value)
// 当 loading 为 true 且 profileData 已有数据时，表示后台正在 revalidate
const isRevalidating = computed(() => isProfileLoading.value && !!profileData.value)

const handleUserSelect = (id: number) => {
  activeUserId.value = id
}

const tsSWRDemo = `<${_T}>
  <div>
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">选择用户:</span>
      <yh-button size="small" :type="activeId === 1 ? 'primary' : 'default'" @click="changeUser(1)">用户 1 (Leanne)</yh-button>
      <yh-button size="small" :type="activeId === 2 ? 'primary' : 'default'" @click="changeUser(2)">用户 2 (Ervin)</yh-button>
      <yh-button size="small" :type="activeId === 3 ? 'primary' : 'default'" @click="changeUser(3)">用户 3 (Clementine)</yh-button>
    </div>

    <div style="border:1px solid var(--yh-border-color); border-radius:8px; padding:16px; min-height:120px; position:relative; background:var(--yh-bg-color-page)">
      <div v-if="loading && !profileData" style="text-align:center; padding-top:20px">
        正在首次加载用户...
      </div>
      <div v-else-if="profileData">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h5 style="margin:0; font-size:15px; font-weight:bold">{{ profileData.name }}</h5>
          <div style="display:flex; gap:8px">
            <yh-tag v-if="revalidating" type="warning" size="small">后台校验刷新中 (Revalidating)...</yh-tag>
            <yh-tag v-else type="success" size="small">数据已缓存</yh-tag>
          </div>
        </div>
        <p style="margin:4px 0; font-size:13px">用户名: {{ profileData.username }}</p>
        <p style="margin:4px 0; font-size:13px">邮箱: {{ profileData.email }}</p>
        <p style="margin:4px 0; font-size:13px">城市: {{ profileData.address?.city }}</p>
        <div style="margin-top:12px; font-size:11px; color:var(--yh-text-color-secondary)">
          最后刷新时间: {{ lastRequestTime[activeId] || '加载中...' }}
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

## 基础用法与 SWR 缓存机制演示

在以下演示中：

- 首次点击特定用户，将执行 1 秒 of 首次载入请求。
- 二次切换到已加载过的用户时，SWR 策略将**瞬间展示已缓存的旧数据**（体验完全零延迟），同时在后台静默发起 revalidate 请求。
- 1 秒后，后台请求更新成功，静默更新数据并将状态恢复为“已缓存”，同时更新最后刷新时间。
- 本演示设置了 `staleTime: 5000`。若用户数据在 5 秒内被二次请求，则被判定为绝对新鲜，不会再发起静默后台刷新。

<DemoBlock title="SWR 缓存加载演示" :ts-code="tsSWRDemo" :js-code="toJs(tsSWRDemo)">
  <div>
    <div style="display:flex; gap:12px; margin-bottom:16px; align-items:center">
      <span style="font-size:14px">选择用户:</span>
      <yh-button size="small" :type="activeUserId === 1 ? 'primary' : 'default'" @click="() => handleUserSelect(1)">用户 1 (Leanne)</yh-button>
      <yh-button size="small" :type="activeUserId === 2 ? 'primary' : 'default'" @click="() => handleUserSelect(2)">用户 2 (Ervin)</yh-button>
      <yh-button size="small" :type="activeUserId === 3 ? 'primary' : 'default'" @click="() => handleUserSelect(3)">用户 3 (Clementine)</yh-button>
    </div>
    <div style="border:1px solid var(--yh-border-color); border-radius:8px; padding:16px; min-height:120px; position:relative; background:var(--yh-bg-color-page)">
      <div v-if="isProfileLoading && !profileData" style="text-align:center; padding-top:20px">
        正在首次加载用户...
      </div>
      <div v-else-if="profileData">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h5 style="margin:0; font-size:15px; font-weight:bold">{{ profileData.name }}</h5>
          <div style="display:flex; gap:8px">
            <yh-tag v-if="isRevalidating" type="warning" size="small">后台校验刷新中 (Revalidating)...</yh-tag>
            <yh-tag v-else type="success" size="small">数据已缓存</yh-tag>
          </div>
        </div>
        <p style="margin:4px 0; font-size:13px">用户名: {{ profileData.username }}</p>
        <p style="margin:4px 0; font-size:13px">邮箱: {{ profileData.email }}</p>
        <p style="margin:4px 0; font-size:13px">城市: {{ profileData.address?.city }}</p>
        <div style="margin-top:12px; font-size:11px; color:var(--yh-text-color-secondary)">
          最后刷新时间: {{ lastRequestTime[activeUserId] || '加载中...' }}
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

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
