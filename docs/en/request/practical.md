# Practical Cases

This page collects typical practical scenarios of `@yh-ui/request` in **Enterprise Admin Systems**. Each case is deeply optimized and integrates best practices to help you handle complex business requirements.

---

## Table of Contents

[[toc]]

---

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { request, useRequest, usePagination } from '@yh-ui/request'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// Use JSONPlaceholder to simulate real API
const API_BASE = 'https://jsonplaceholder.typicode.com'

// ======================== Define Example Source Code ========================

// 1. Loading Strategy: Local Loading & Silent Refresh
const tsLoadingDemo = `<${_T}>
  <div class="demo-card">
    <div class="demo-actions">
      <yh-button type="primary" :loading="isNormalLoading" @click="refreshNormal">
        Normal Refresh (with Loading)
      </yh-button>
      <yh-button @click="refreshSilent">
        Silent Refresh (No Loading)
      </yh-button>
    </div>

    <yh-spin :show="isNormalLoading" tip="Fetching data...">
      <div class="user-list">
        <div v-for="user in users" :key="user.id" class="user-item">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-email">{{ user?.email }}</span>
        </div>
      </div>
    </yh-spin>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useRequest } from '@yh-ui/request'

interface User { id: number; name: string; email: string }

const isNormalLoading = ref(false)
const { data, run } = useRequest<User[]>(
  () => fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
)

const refreshNormal = async () => {
  isNormalLoading.value = true
  await run()
  isNormalLoading.value = false
}

const refreshSilent = () => run()

const users = computed(() => (data.value || []).slice(0, 5))
</${_S}>`

// 2. Interaction Optimization: Debounced Search & Request De-duplication
const tsInteractionDemo = `<${_T}>
  <div class="demo-card">
    <div class="search-box">
      <yh-input 
        v-model="searchQuery" 
        placeholder="Search username (Debounced)..." 
      />
    </div>

    <div class="tab-box" style="margin: 12px 0;">
      <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
        <yh-radio label="all">All</yh-radio>
        <yh-radio label="completed">Completed</yh-radio>
      </yh-radio-group>
    </div>

    <yh-table :data="list" :loading="loading">
      <yh-table-column prop="id" label="ID" width="80" />
      <yh-table-column prop="title" label="Task Title" />
      <yh-table-column prop="completed" label="Status" width="100">
        <template #default="{ row }">
          <yh-tag :type="row?.completed ? 'success' : 'warning'">
            {{ row?.completed ? 'Done' : 'Active' }}
          </yh-tag>
        </template>
      </yh-table-column>
    </yh-table>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed, watch } from 'vue'
import { request, useRequest } from '@yh-ui/request'

const searchQuery = ref('')
const activeTab = ref('all')

const { data, loading, run } = useRequest(
  (params) => request.get('https://jsonplaceholder.typicode.com/todos', { 
    params,
    requestKey: 'todo-list',
    abortSameKey: true 
  }),
  { debounceWait: 500 }
)

// Watcher for automatically triggering requests (with debounce)
watch(searchQuery, (q) => run({ q, _limit: 5 }).catch(() => {}))

const handleTabChange = (val: string) => {
  run({ completed: val === 'completed', _limit: 5 }).catch(() => {})
}

const list = computed(() => (data.value || []).slice(0, 5))
</${_S}>`

// 3. Complex List: Advanced Pagination & Multiple Filters
const tsPaginationDemo = `<${_T}>
  <div class="demo-card">
    <div class="filter-header">
      <yh-form inline :model="form">
        <yh-form-item label="Title">
          <yh-input v-model="form.title" placeholder="Search title" />
        </yh-form-item>
        <yh-button type="primary" @click="search">Search</yh-button>
        <yh-button @click="reset">Reset</yh-button>
      </yh-form>
    </div>

    <yh-table :data="data?.list" :loading="loading" border>
      <yh-table-column prop="id" label="ID" width="70" />
      <yh-table-column prop="title" label="Post Title" />
      <yh-table-column prop="userId" label="Author ID" width="100">
        <template #default="{ row }">User {{ row?.userId }}</template>
      </yh-table-column>
    </yh-table>

    <div v-if="total > 0" class="pagination-footer">
      <yh-pagination
        v-model:current-page="current"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next"
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'
import { usePagination } from '@yh-ui/request'

interface Post {
  id: number
  title: string
  userId: number
}

const form = reactive({ title: '' })

// NOTE: current/pageSize/total are top-level properties
const { data, loading, current, pageSize, total, pagination } = usePagination<Post>(
  async (page, size) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${size}&title_like=\${form.title}\`)
    const list = await res.json()
    // Mock logic: return 100 total if search has results, else 0
    const totalCount = list.length > 0 ? 100 : 0
    return { data: { list, total: totalCount } }
  },
  { defaultPagination: { current: 1, pageSize: 5 } }
)

const search = () => pagination.loadPage(1)
const reset = () => {
  form.title = ''
  search()
}
</${_S}>`

// 4. File Interaction: Simulated Chunked Upload
const tsUploadDemo = `<${_T}>
  <div class="demo-card">
    <div class="upload-area">
      <yh-button type="primary" :loading="uploading" @click="startUpload">
        Simulate Chunked Upload
      </yh-button>
    </div>
    <div v-if="uploading || uploadPercent > 0" style="margin-top: 24px;">
      <div style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">
        Upload Progress: {{ uploadPercent }}%
      </div>
      <yh-progress :percentage="uploadPercent" :status="uploadPercent === 100 ? 'success' : 'active'" />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest } from '@yh-ui/request'

const uploadPercent = ref(0)

// Use useRequest to encapsulate complex asynchronous logic
const { loading: uploading, run: startUpload } = useRequest(async () => {
  uploadPercent.value = 0
  for (let i = 1; i <= 4; i++) {
    // 1. Send chunk request
    await request.post('https://jsonplaceholder.typicode.com/posts', { chunk: i })
    // 2. Interaction delay increased to 800ms for clarity
    await new Promise(r => setTimeout(r, 800))
    uploadPercent.value = i * 25
  }
}, { manual: true })
</${_S}>`



// ======================== Reactive UI Logic (For Live Demos) ========================

// 1. Loading
const isNormalLoading = ref(false)
const { data: loadingData, run: fetchUsers } = useRequest(
  () => fetch(`${API_BASE}/users`).then(r => r.json()),
  { defaultParams: [] }
)
const refreshLoading = async () => {
  isNormalLoading.value = true
  await fetchUsers()
  isNormalLoading.value = false
}
const silentRefresh = () => fetchUsers()
const users = computed(() => (Array.isArray(loadingData.value) ? loadingData.value.slice(0, 5) : []))

// 2. Interaction
const searchQuery = ref('')
const activeTab = ref('all')
const { data: interactionData, loading: isInterloading, run: refreshInteraction } = useRequest(
  (params?: any) => fetch(`${API_BASE}/todos?${new URLSearchParams(params).toString()}`).then(r => r.json()),
  { debounceWait: 500 }
)
const handleTabChange = (val: string) => {
  activeTab.value = val; 
  refreshInteraction({ completed: val === 'completed', _limit: 5 }).catch(() => {})
}
watch(searchQuery, (q) => refreshInteraction({ q, _limit: 5 }).catch(() => {}))
const interactionList = computed(() => (Array.isArray(interactionData.value) ? interactionData.value.slice(0, 5) : []))

// 3. Pagination
interface Post { id: number; title: string; userId: number }
const pgForm = reactive({ title: '' })
const { 
  data: pgData, 
  loading: pgLoading, 
  current: pgCurrent, 
  pageSize: pgPageSize, 
  total: pgTotal, 
  pagination: pgActions 
} = usePagination<Post>(
  async (page, size) => {
    const res = await fetch(`${API_BASE}/posts?_page=${page}&_limit=${size}&title_like=${pgForm.title}`)
    const list = await res.json()
    const totalCount = list.length > 0 ? 100 : 0
    return { data: { list, total: totalCount } }
  },
  { defaultPagination: { current: 1, pageSize: 5 } }
)
const searchPg = () => pgActions.loadPage(1)
const resetPg = () => { pgForm.title = ''; searchPg() }

// 4. Upload
const uploadP = ref(0)
const { loading: isUploading, run: runUpload } = useRequest(async () => {
  uploadP.value = 0
  for (let i = 1; i <= 4; i++) {
    await request.post(`${API_BASE}/posts`, { chunk: i })
    await new Promise(r => setTimeout(r, 800))
    uploadP.value = i * 25
  }
}, { manual: true })
</script>

## UI Interaction Feedback

### 1. Differentiated Loading Strategy

<DemoBlock title="Loading Strategy Demo" :ts-code="tsLoadingDemo" :js-code="toJs(tsLoadingDemo)">
<div class="demo-card">
  <div style="margin-bottom: 20px; display: flex; gap: 12px;">
    <yh-button type="primary" :loading="isNormalLoading" @click="refreshLoading">Normal Refresh</yh-button>
    <yh-button @click="silentRefresh">Silent Refresh</yh-button>
  </div>
  <yh-spin :show="isNormalLoading">
    <div style="background: var(--yh-bg-color-soft); padding: 16px; border-radius: 8px;">
      <div v-for="user in users" :key="user.id" style="padding: 8px 0; border-bottom: 1px solid var(--yh-border-color); display: flex; justify-content: space-between;">
        <span>{{ user?.name }}</span>
        <span style="color: var(--yh-text-color-secondary);">{{ user?.email }}</span>
      </div>
    </div>
  </yh-spin>
</div>
</DemoBlock>

---

### 2. Debounced Search & Rapid Switching

<DemoBlock title="Advanced Interaction Demo" :ts-code="tsInteractionDemo" :js-code="toJs(tsInteractionDemo)">
<div class="demo-card">
  <div style="margin-bottom: 20px;">
    <yh-input v-model="searchQuery" placeholder="Search keywords..." />
  </div>
  <div style="margin-bottom: 16px;">
    <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
      <yh-radio label="all">All</yh-radio>
      <yh-radio label="completed">Completed</yh-radio>
    </yh-radio-group>
  </div>
  <yh-table :data="interactionList" :loading="isInterloading">
    <yh-table-column prop="id" label="ID" width="80" />
    <yh-table-column prop="title" label="Task Title" show-overflow-tooltip />
    <yh-table-column prop="completed" label="Status" width="100">
      <template #default="{ row }">
        <yh-tag :type="row?.completed ? 'success' : 'warning'">
          {{ row?.completed ? 'Done' : 'Active' }}
        </yh-tag>
      </template>
    </yh-table-column>
  </yh-table>
</div>
</DemoBlock>

---

### 3. Enterprise-grade Pagination List

<DemoBlock title="Standard List Page" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
<div class="demo-card">
  <div style="margin-bottom: 16px; background: var(--yh-bg-color-soft); padding: 16px; border-radius: 8px;">
    <yh-form inline :model="pgForm">
      <yh-form-item label="Title"><yh-input v-model="pgForm.title" /></yh-form-item>
      <yh-button type="primary" @click="searchPg">Search</yh-button>
      <yh-button @click="resetPg">Reset</yh-button>
    </yh-form>
  </div>
  <yh-table :data="pgData?.list" :loading="pgLoading" border stripe>
    <yh-table-column prop="id" label="ID" width="70" />
    <yh-table-column prop="title" label="Post Title" />
    <yh-table-column prop="userId" label="Author" width="100">
      <template #default="{ row }">User {{ row?.userId }}</template>
    </yh-table-column>
  </yh-table>
  <div v-if="pgTotal > 0" style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      v-model:current-page="pgCurrent"
      v-model:page-size="pgPageSize"
      :total="pgTotal"
      layout="total, sizes, prev, pager, next"
    />
  </div>
</div>
</DemoBlock>

---

### 4. Simulated Chunked Upload

<DemoBlock title="Chunked Upload Simulation" :ts-code="tsUploadDemo" :js-code="toJs(tsUploadDemo)">
<div class="demo-card">
  <yh-button type="primary" :loading="isUploading" @click="runUpload">
    Start Simulated Upload
  </yh-button>
  <div v-if="isUploading || uploadP > 0" style="margin-top: 24px;">
    <div style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">
      Upload Progress: {{ uploadP }}%
    </div>
    <yh-progress :percentage="uploadP" :status="uploadP === 100 ? 'success' : 'active'" />
  </div>
</div>
</DemoBlock>

> [!TIP]
> **Core Concepts of Chunked Upload:**
>
> 1. **Slicing**: Use `Blob.prototype.slice` to cut files into fixed-size (e.g., 2MB) binary chunks.
> 2. **Concurrency Control**: Limit the number of simultaneous chunk requests to avoid blocking other business requests.
> 3. **Resume from Break**: Calculate file Hash before uploading and query the server for existing chunks.
> 4. **Merge**: Notify the backend to reassemble the file after all chunks are uploaded successfully.
> 5. **Performance**: File hashing is a **CPU-intensive task**. For large files, it is recommended to process this in a **Web Worker** to avoid blocking the main thread and causing UI lag.

<style scoped>
.demo-card { padding: 8px; }
</style>
