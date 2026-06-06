# Practical Cases

This page collects typical practical scenarios of `@yh-ui/request` in **Enterprise Admin Systems**. Each case is deeply optimized and integrates best practices to help you handle complex business requirements.

---

## Table of Contents

[[toc]]

---

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { request, useRequest, usePagination, useRequestSWR, useAIStream } from '@yh-ui/request'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

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
  () => request.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
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
        placeholder="Search task title (Debounced)..." 
      />
    </div>

    <div class="tab-box" style="margin: 12px 0;">
      <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
        <yh-radio value="all">All</yh-radio>
        <yh-radio value="completed">Completed</yh-radio>
      </yh-radio-group>
    </div>

    <!-- Responsive Table Container -->
    <div style="width: 100%; overflow-x: auto;">
      <yh-table :data="list" :loading="loading" style="min-width: 600px;">
        <yh-table-column prop="id" label="ID" width="70" />
        <yh-table-column prop="title" label="Task Title" min-width="200" show-overflow-tooltip />
        <yh-table-column prop="completed" label="Status" width="120">
          <template #default="{ row }">
            <yh-tag :type="row?.completed ? 'success' : 'warning'">
              {{ row?.completed ? 'Done' : 'Active' }}
            </yh-tag>
          </template>
        </yh-table-column>
      </yh-table>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { request, useRequest } from '@yh-ui/request'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const searchQuery = ref('')
const activeTab = ref('all')

// 1. Initialize useRequest: requestKey & abortSameKey for instant cancellation
const { data, loading, run } = useRequest<Todo[]>(
  (params) => {
    // Industrial best practice: clean up parameters
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(([_, v]) => v !== undefined && v !== null)
    )
    return request.get('https://jsonplaceholder.typicode.com/todos', { 
      params: cleanParams,
      requestKey: 'todo-list', 
      abortSameKey: true 
    })
  },
  { 
    manual: false, 
    defaultParams: [{ _limit: 5 }],
    // Best practice: handle cancellation errors globally in the hook
    onError: (err) => {
      if (err.isCanceled || err.name === 'AbortError') return
      console.error('Request Error:', err.message)
    }
  }
)

// 2. Search Debounce Logic
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (q) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    // No .catch() needed anymore
    run({ q: q || undefined, _limit: 5, completed: activeTab.value === 'completed' || undefined })
  }, 500)
})

// 3. Tab Change: Instant Trigger
const handleTabChange = (val: string) => {
  if (searchTimer) clearTimeout(searchTimer)
  // Clean execution
  run({ 
    completed: val === 'completed' ? true : undefined, 
    _limit: 5,
    q: searchQuery.value || undefined
  })
}

onUnmounted(() => {
  if (searchTimer) clearTimeout(searchTimer)
})

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

// 5. Auth Interceptor & Silent Refresh
const tsAuthDemo = `<${_T}>
  <div class="demo-card">
    <div style="padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
      <div v-if="isAuthLoading">Syncing...</div>
      <div v-else>
        <yh-tag type="success">Auth Status: OK</yh-tag>
        <div style="margin-top: 12px; font-family: monospace; font-size: 13px;">
          Current Token: {{ mockToken.slice(0, 12) }}...
        </div>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <yh-button size="small" @click="runAuth">Normal Request</yh-button>
        <yh-button size="small" type="warning" @click="triggerAuthRefresh">Simulate Token Expiry</yh-button>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest } from '@yh-ui/request'

// 1. Mock Token Storage
const mockToken = ref('yh-ui-init-token')

// 2. Configure Interceptor Logic
request.interceptors.request.use(config => {
  // Ensure headers object exists
  config.headers = {
    ...config.headers,
    Authorization: \`Bearer \${mockToken.value}\`
  }
  return config
})

request.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      // 1. Refresh Token
      mockToken.value = 'refreshed-' + Date.now()
      // 2. Retry Request
      return request.request(error.config)
    }
    throw error
  }
)

const { loading: isAuthLoading, run: runAuth } = useRequest(
  () => request.get(\`\${API_BASE}/posts/1\`),
  { manual: true }
)

const triggerAuthRefresh = () => {
  // 1. Clear token storage to simulate expiration
  mockToken.value = '' 
  // 2. The interceptor will detect the empty token and trigger renewal
  runAuth().catch(() => {})
}
</${_S}>`

// 6. Resilience: Retry & Deduplication
const tsResilienceDemo = `<${_T}>
  <div class="demo-card">
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <yh-button type="primary" :loading="isResiLoading" @click="runResilience">Send Request (Deduplicated)</yh-button>
      <yh-button @click="logs = []">Clear Logs</yh-button>
    </div>
    <div class="console-box" style="background: #000; color: #00ff00; padding: 12px; font-family: monospace; border-radius: 4px;">
      <div v-for="(log, i) in logs" :key="i">> {{ log }}</div>
      <div v-if="logs.length === 0" style="color: #666;">Waiting for logs...</div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest } from '@yh-ui/request'

const logs = ref<string[]>([])
const addLog = (msg: string) => logs.value.unshift(\`[\${new Date().toLocaleTimeString()}] \${msg}\`)

const { loading: isResiLoading, run } = useRequest(
  () => request.get('https://api.example.com/data', {
    retry: true,           // Enable retry
    retryTimes: 3,         // Max 3 times
    requestKey: 'res-demo', // Deduplication key
    abortSameKey: true     // Abort previous request
  }),
  { 
    manual: true,
    onSuccess: () => addLog('Success'),
    onError: (err) => {
      if (err.isCanceled) return addLog('Cancelled')
      addLog(\`Error: \${err.message}\`)
    }
  }
)

const runResilience = () => {
  addLog('Triggering fast requests...')
  run().catch(() => {}) // Catch abort error
  run().catch(() => {})
}
</${_S}>`

// 7. Data Flow: Cache (SWR) & State
const tsSWRDemo = `<${_T}>
  <div class="demo-card">
    <yh-alert type="success" show-icon title="SWR Active">
      Data is cached and instantly available.
    </yh-alert>
    <div class="swr-display" style="margin: 16px 0;">
      {{ swrData ? JSON.stringify(swrData).slice(0, 60) + '...' : 'Loading...' }}
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button :loading="swrLoading" @click="swrRefresh">Silent Refresh</yh-button>
      <yh-button @click="swrMutate({ title: 'yh-ui state update' })">Update UI Instantly</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useRequestSWR, request } from '@yh-ui/request'

const { data: swrData, loading: swrLoading, refresh: swrRefresh, mutate: swrMutate } = useRequestSWR(
  'demo-cache-key',
  () => request.get('https://jsonplaceholder.typicode.com/posts/1'),
  { cacheTime: 60000 }
)
</${_S}>`

// 8. AI Scenarios: Streaming & Thinking Process
const tsAIDemo = `<${_T}>
  <div class="demo-card">
    <div class="ai-box">
      <div v-if="aiThinking" class="thinking">AI Thinking: {{ aiThinking }}</div>
      <div class="content">{{ aiText }}</div>
    </div>
    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <yh-button type="primary" :loading="aiLoading" @click="handleAIStart">Ask AI</yh-button>
      <yh-button v-if="aiLoading" @click="aiStop">Stop</yh-button>
      <yh-button @click="aiReset">Reset</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAIStream } from '@yh-ui/request'

const { text: aiText, thinking: aiThinking, loading: aiLoading, start: aiStart, stop: aiStop, reset: aiReset } = useAIStream()

const handleAIStart = () => {
  aiStart({ url: '/api/chat', method: 'POST', data: { query: 'Hello' } })
}
</${_S}>
<${_St}>
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</${_St}>`


// 9. Ultimate Best Practice: Engineering Integration
const tsFullDemo = `<${_T}>
  <div class="demo-card">
    <div class="demo-grid">
      <div class="demo-item">
        <div class="label">RESTful & Local Loading</div>
        <yh-button type="primary" :loading="apiIsLoading" @click="apiFetchUser(1)">Get User (with Loading)</yh-button>
        <yh-button style="margin-top: 8px" @click="apiFetchUser(2)">Get User (Silent View)</yh-button>
      </div>
      
      <div class="demo-item">
        <div class="label">File Operations</div>
        <div class="btn-group">
          <yh-button @click="apiUpload">Chunked Upload</yh-button>
          <yh-button @click="apiDownload">Export (Blob)</yh-button>
        </div>
      </div>

      <div class="demo-item">
          <div class="label">Deduplication & Retry</div>
          <yh-button type="warning" @click="apiResilience">Concurrent Clicks (Auto De-dup)</yh-button>
      </div>

      <div class="demo-item">
          <div class="label">WebSocket</div>
          <yh-tag :type="apiWsConnected ? 'success' : 'danger'">WS {{ apiWsConnected ? 'Connected' : 'Disconnected' }}</yh-tag>
          <div class="ws-info">Latest Msg: {{ apiWsMsg }}</div>
      </div>
    </div>

    <div class="ai-section">
      <div class="label">AI Assistant (Streaming Output)</div>
      <div class="ai-console">{{ apiAiText || 'Waiting for query...' }}</div>
      <yh-button type="primary" size="small" :loading="apiAiLoading" @click="apiAiSubmit">Smart Analysis</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest, useAIStream } from '@yh-ui/request'

// 1. Initialize Engineering Instance
const api = request.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  retry: true,        // Enable global retry
  retryTimes: 2
})

// 2. Multi-tier Interceptors
api.interceptors.request.use(config => {
  config.headers = { ...config.headers, Authorization: 'Bearer token_xxx' }
  return config
})

// 3. Core Business Logic
const apiAiText = ref('')

// A. RESTful Control
const { loading: apiIsLoading, run: runFetch } = useRequest(
  (id: number) => api.get(\`/users/\${id}\`),
  { manual: true }
)
const apiFetchUser = async (id: number) => {
  await runFetch(id)
}

// B. File Upload (Chunked Simulation)
const apiUpload = async () => {
  apiAiText.value = 'Starting chunked upload simulation...\\n'
  for(let i = 1; i <= 3; i++) {
    await api.post('/posts', { chunk: i })
    apiAiText.value += \`> Chunk \${i} sent successfully\\n\`
  }
  apiAiText.value += 'Upload process completed.'
}

// C. File Download (Blob Handling Simulation)
const apiDownload = async () => {
  apiAiText.value = 'Requesting file stream...\\n'
  const res = await api.get('/posts/1', { responseType: 'blob' })
  apiAiText.value += \`> Data received: \${res.headers['content-type']}\\n\`
  apiAiText.value += 'ObjectURL generated & download triggered.'
}

// D. AI Streaming
const { start: aiStart, loading: apiAiLoading } = useAIStream()
const apiAiSubmit = () => {
  apiAiText.value = ''
  aiStart({ url: '/posts', method: 'POST', data: { query: 'Best Practice' } })
  // Simulate stream in demo
  let i = 0; const t = setInterval(() => {
    apiAiText.value += 'AI analyzing engineering advantages... '; if(i++ > 2) clearInterval(t)
  }, 400)
}

// E. Deduplication
const apiResilience = () => {
  api.get('/posts/1', { requestKey: 'unique-task', abortSameKey: true })
}

// F. WebSocket Status
const apiWsConnected = ref(true)
const apiWsMsg = ref('Temperature: 24°C')
</${_S}>

<${_St}>
.demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.demo-item { display: flex; flex-direction: column; align-items: flex-start; }
.label { font-weight: bold; font-size: 13px; margin-bottom: 8px; color: var(--yh-text-primary); }
.btn-group { display: flex; gap: 8px; }
.ws-info { font-size: 12px; margin-top: 4px; color: var(--yh-text-secondary); }
.ai-section { border-top: 1px dashed var(--yh-border-color); padding-top: 12px; }
.ai-console { background: #1a1a1a; color: #00ff00; padding: 12px; font-family: monospace; font-size: 12px; border-radius: 4px; min-height: 80px; margin-bottom: 8px; white-space: pre-wrap; }
</${_St}>`

// ======================== Reactive UI Logic (For Live Demos) ========================
// 9. Full Practice UI Data (Aesthetics & Engineering)
const apiIsLoading = ref(false)
const apiFetchUser = async (id: number) => {
  if (id === 1) apiIsLoading.value = true
  await request.get(`${API_BASE}/users/${id}`)
  apiIsLoading.value = false
}
const apiUpload = async () => {
  apiAiText.value = 'Starting chunked upload simulation...\n'
  for (let i = 1; i <= 3; i++) {
    await request.post(`${API_BASE}/posts`, { chunk: i })
    apiAiText.value += `> Chunk ${i} sent successfully\n`
    await new Promise(r => setTimeout(r, 400))
  }
  apiAiText.value += 'Upload process completed.'
}
const apiDownload = async () => {
  apiAiText.value = 'Requesting file stream simulation...\n'
  const res = await request.get(`${API_BASE}/posts/1`)
  apiAiText.value += `> Status: ${res.status || 200}\n`
  apiAiText.value += `> Success: user-data-export.xlsx\n`
  apiAiText.value += 'ObjectURL generated & download triggered (simulated)'
}
const apiResilience = () => {
  apiAiText.value = 'Triggering concurrent requests...\n> Duplicate RequestKey detected, auto-abort previous flow'
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] Concurrent de-dup request sent (Intercepted)`)
  runResilience()
}
const apiWsConnected = ref(true)
const apiWsMsg = ref('Temperature: 24°C')
const { text: apiAiText, loading: apiAiLoading, start: runAiStart } = useAIStream()
const apiAiSubmit = () => {
    apiAiText.value = ''
    runAiStart({ url: `${API_BASE}/posts` })
    let i = 0;
    const t = setInterval(() => {
        apiAiText.value += 'AI analyzing engineering advantages... '
        if(i++ > 2) { clearInterval(t); apiAiLoading.value = false }
    }, 400)
}

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
interface Todo { id: number; title: string; completed: boolean }
const searchQuery = ref('')
const activeTab = ref('all')

const { data: interactionData, loading: isInterloading, run: refreshInteraction } = useRequest<Todo[]>(
  (params) => request.get(`${API_BASE}/todos`, { params }).then(res => res.data as Todo[]),
  { 
    manual: false, 
    defaultParams: [{ _limit: 5 }],
    onError: (err) => {
      if (err.isCanceled || err.name === 'AbortError') return
    }
  }
)

let interactionTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (q) => {
  if (interactionTimer) clearTimeout(interactionTimer)
  interactionTimer = setTimeout(() => {
    refreshInteraction({ q: q || undefined, _limit: 5, completed: activeTab.value === 'completed' ? true : undefined })
  }, 500)
})

const handleTabChange = (val: string) => {
  activeTab.value = val;
  if (interactionTimer) clearTimeout(interactionTimer)
  refreshInteraction({ 
    completed: val === 'completed' ? true : undefined, 
    _limit: 5,
    q: searchQuery.value || undefined 
  })
}
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
    const res = await request.get(`${API_BASE}/posts`, {
      params: { _page: page, _limit: size, title_like: pgForm.title }
    })
    return { data: { list: res.data, total: 100 } }
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

// 5. Auth (Interceptor Injection)
const mockToken = ref('yh-ui-init-token')

// [For Demo] Clear old interceptors to prevent issues during HMR
request.interceptors.request.clear()
request.interceptors.response.clear()

// 1. Request Interceptor: Demonstrate Auto-Injection
request.interceptors.request.use(config => {
  config.headers = { 
    ...config.headers, 
    Authorization: mockToken.value ? `Bearer ${mockToken.value}` : '' 
  }
  return config
})

// 2. Response Interceptor: Demonstrate Silent Refresh (Simulated)
request.interceptors.response.use(
  (res) => {
    // [Demo Only] JSONPlaceholder won't return 401, so we simulate it here:
    // If request has no token and is NOT a retry, trigger the refresh logic
    if (!mockToken.value && res.config && !(res.config as any)._isRetry) {
      console.warn('Demo: Empty token detected, simulating refresh flow...');
      mockToken.value = 'refreshed-' + Math.random().toString(36).slice(2, 6)
      
      const retryConfig = { ...res.config, _isRetry: true } as any
      return request.request(retryConfig)
    }
    return res
  },
  async (error) => {
    // In production, catch 401 here to refresh token and retry
    throw error
  }
)

const { loading: isAuthLoading, run: runAuth } = useRequest(
  () => request.get(`${API_BASE}/posts/1`),
  { manual: true }
)

const triggerAuthRefresh = () => {
  mockToken.value = '' // Clear token to trigger simulated refresh
  runAuth().catch(() => {}) 
}

// 6. Resilience
const logs = ref<string[]>([])
const { loading: isResiLoading, run } = useRequest(
  () => request.get(`${API_BASE}/posts/1`, { 
    retry: true, 
    requestKey: 'res-demo',
    abortSameKey: true 
  }),
  { 
    manual: true,
    onSuccess: () => logs.value.unshift(`[${new Date().toLocaleTimeString()}] Request Successful`),
    onError: (err) => {
      if (!err.isCanceled) logs.value.unshift(`[${new Date().toLocaleTimeString()}] Error: ${err.message}`)
    }
  }
)
const runResilience = () => {
  run().catch(() => {})
  run().catch(() => {})
}

// 7. SWR
const { data: swrData, loading: swrLoading, refresh: swrRefresh, mutate: swrMutate } = useRequestSWR(
  'demo-cache-key',
  () => request.get(`${API_BASE}/posts/1`)
)

// 8. AI
const { text: aiText, thinking: aiThinking, done: aiDone, loading: aiLoading, start: aiStart, reset: aiReset, stop: aiStop } = useAIStream()
const handleAIStart = () => {
  aiStart({ url: `${API_BASE}/posts` })
  let i = 0;
  const timer = setInterval(() => {
    aiText.value += 'Simulated AI content generation... ';
    if (i++ > 3) { clearInterval(timer); aiDone.value = true; aiLoading.value = false; }
  }, 400);
}
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
    <yh-input v-model="searchQuery" placeholder="Search task title (Debounced)..." />
  </div>
  <div style="margin-bottom: 16px;">
    <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
      <yh-radio value="all">All</yh-radio>
      <yh-radio value="completed">Completed</yh-radio>
    </yh-radio-group>
  </div>
  <div style="width: 100%; overflow-x: auto;">
    <yh-table :data="interactionList" :loading="isInterloading" style="min-width: 600px;">
      <yh-table-column prop="id" label="ID" width="70" />
      <yh-table-column prop="title" label="Task Title" min-width="200" show-overflow-tooltip />
      <yh-table-column prop="completed" label="Status" width="120">
        <template #default="{ row }">
          <yh-tag :type="row?.completed ? 'success' : 'warning'">
            {{ row?.completed ? 'Done' : 'Active' }}
          </yh-tag>
        </template>
      </yh-table-column>
    </yh-table>
  </div>
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
> **Large File Chunked Upload Strategy:**
>
> 1. **Slicing**: Use `Blob.prototype.slice` on the frontend to partition files into fixed-size (e.g., 2MB) binary chunks.
> 2. **Concurrency Control**: Limit concurrent chunk upload requests to avoid blocking other business traffic in the browser.
> 3. **Resume Support**: Calculate the file Hash before uploading to identify chunks already received by the backend, uploading only the missing parts.
> 4. **Merging**: After all chunks are successfully uploaded, send a merge request to notify the backend to assemble the file.
> 5. **Performance**: As file hashing is CPU-intensive, it is best to perform it in a Web Worker for large files to prevent main thread blocking and UI stuttering.

---

## Engineering Core Capabilities

### 5. Auth Interceptor & Silent Refresh

<DemoBlock title="Auth Token Injection & Refresh" :ts-code="tsAuthDemo" :js-code="toJs(tsAuthDemo)">
<div class="demo-card">
  <div style="padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
    <div v-if="isAuthLoading">Syncing...</div>
    <div v-else>
      <yh-tag type="success">Auth Status: OK</yh-tag>
      <div style="margin-top: 12px; font-family: monospace; font-size: 13px;">
        Current Token: {{ mockToken.slice(0, 12) }}...
      </div>
    </div>
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <yh-button size="small" @click="runAuth">Normal Request</yh-button>
      <yh-button size="small" type="warning" @click="triggerAuthRefresh">Simulate Token Expiry</yh-button>
    </div>
  </div>
</div>
</DemoBlock>

### 6. Resilience: Retry & Deduplication

<DemoBlock title="Auto Retry & Concurrency Control" :ts-code="tsResilienceDemo" :js-code="toJs(tsResilienceDemo)">
<div class="demo-card">
  <div style="display: flex; gap: 12px; margin-bottom: 16px;">
    <yh-button type="primary" @click="runResilience">Send Request (Deduplicated)</yh-button>
    <yh-button @click="logs = []">Clear Logs</yh-button>
  </div>
  <div style="background: #000; color: #00ff00; padding: 12px; font-family: monospace; font-size: 12px; border-radius: 4px; max-height: 120px; overflow-y: auto;">
    <div v-for="(log, i) in logs" :key="i">> {{ log }}</div>
    <div v-if="logs.length === 0" style="color: #666;">Waiting for logs...</div>
  </div>
</div>
</DemoBlock>

### 7. Data Flow: Cache (SWR) & State

<DemoBlock title="SWR Data Cache & Sync" :ts-code="tsSWRDemo" :js-code="toJs(tsSWRDemo)">
<div class="demo-card">
  <yh-alert type="success" show-icon title="SWR Active">
    Data entered cache, instantly available on return.
  </yh-alert>
  <div style="margin: 16px 0; padding: 12px; border: 1px solid var(--yh-border-color); border-radius: 4px;">
    {{ swrData ? JSON.stringify(swrData).slice(0, 60) + '...' : 'Loading...' }}
  </div>
  <div style="display: flex; gap: 8px;">
    <yh-button :loading="swrLoading" @click="swrRefresh">Silent Refresh</yh-button>
    <yh-button @click="swrMutate({ title: 'yh-ui state update' })">Update UI Instantly</yh-button>
  </div>
</div>
</DemoBlock>

---

## AI Practical Scenarios

### 8. Streaming & Thinking Process

<DemoBlock title="AI Chat Streaming Interaction" :ts-code="tsAIDemo" :js-code="toJs(tsAIDemo)">
<div class="demo-card">
  <div style="background: var(--yh-bg-color-soft); padding: 16px; border-radius: 8px; min-height: 80px; margin-bottom: 16px;">
    <div v-if="aiThinking" style="color: var(--yh-text-color-secondary); margin-bottom: 8px;">
       Thinking...
    </div>
    <div style="white-space: pre-wrap;">{{ aiText }}</div>
  </div>
  <div style="display: flex; gap: 8px;">
    <yh-button type="primary" :loading="aiLoading" @click="handleAIStart">Ask AI</yh-button>
    <yh-button v-if="aiLoading" @click="aiStop">Stop</yh-button>
    <yh-button @click="aiReset">Reset</yh-button>
  </div>
</div>
</DemoBlock>

> [!TIP]
> **Optimizing Requests for AI:**
>
> 1. **Streaming**: Use `useAIStream` to handle chunked data and avoid long waits.
> 2. **Typewriter Effect**: Append data to UI in real-time via `onText` callback.
> 3. **State Separation**: Decouple "thinking" and "text" states to manage user expectations.

### 9. Ultimate Engineering Best Practice

In large-scale enterprise projects, it's common practice to wrap the request library to handle **token injection, response formatting, global error handling, and reconnection**. Here is a full-featured configuration based on `@yh-ui/request`:

<DemoBlock title="Full-Featured Config & Interaction" :ts-code="tsFullDemo" :js-code="toJs(tsFullDemo)">
<div class="demo-card">
  <div class="demo-grid">
    <div class="demo-item">
      <div class="label">RESTful & Local Loading</div>
      <yh-button type="primary" :loading="apiIsLoading" @click="apiFetchUser(1)">Get User (with Loading)</yh-button>
      <yh-button style="margin-top: 8px" @click="apiFetchUser(2)">Get User (Silent View)</yh-button>
    </div>
    <div class="demo-item">
      <div class="label">File Operations</div>
      <div class="btn-group">
        <yh-button @click="apiUpload">Chunked Upload</yh-button>
        <yh-button @click="apiDownload">Export (Blob)</yh-button>
      </div>
    </div>
    <div class="demo-item">
        <div class="label">Deduplication & Retry</div>
        <yh-button type="warning" @click="apiResilience">Concurrent Clicks (Auto De-dup)</yh-button>
    </div>
    <div class="demo-item">
        <div class="label">WebSocket</div>
        <yh-tag :type="apiWsConnected ? 'success' : 'danger'">WS {{ apiWsConnected ? 'Connected' : 'Disconnected' }}</yh-tag>
        <div class="ws-info">Latest Msg: {{ apiWsMsg }}</div>
    </div>
  </div>
  <div class="ai-section">
    <div class="label">AI Assistant (Streaming Output)</div>
    <div class="ai-console">{{ apiAiText || 'Waiting for query...' }}</div>
    <yh-button type="primary" size="small" :loading="apiAiLoading" @click="apiAiSubmit">Smart Analysis</yh-button>
  </div>
</div>
</DemoBlock>

> [!TIP]
> **Architectural Recommendations:**
>
> 1. **Instance Isolation**: Create separate `request` instances for different business domains (e.g., Main App, Map Engine, AI Gateway) with independent interceptors.
> 2. **Defensive Coding**: Always check `config.headers` in interceptors. Use spread/destructuring instead of direct assignment to avoid `undefined` errors during HMR.
> 3. **Unified Type Constraints**: Use TypeScript generics to define a global `ResponseStructure`, ensuring a consistent development experience.
> 4. **Resource Cleanup**: Always call `cancel()` or close WebSockets in `onUnmounted` to prevent memory leaks.

<style scoped>
.demo-card { padding: 12px; }
.demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.demo-item { display: flex; flex-direction: column; align-items: flex-start; }
.label { font-weight: bold; font-size: 13px; margin-bottom: 8px; color: var(--yh-text-primary); }
.btn-group { display: flex; gap: 8px; }
.ws-info { font-size: 12px; margin-top: 4px; color: var(--yh-text-secondary); }
.ai-section { border-top: 1px dashed var(--yh-border-color); padding-top: 12px; margin-top: 12px; }
.ai-console { background: #1a1a1a; color: #00ff00; padding: 12px; font-family: monospace; font-size: 12px; border-radius: 4px; min-height: 60px; margin-bottom: 8px; }
</style>
