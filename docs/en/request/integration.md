# Integration with UI Components

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRequest, usePagination } from '@yh-ui/request'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// Use JSONPlaceholder for real API simulation
const API_BASE = 'https://jsonplaceholder.typicode.com'

/**
 * Helper method: Simulate real network request
 * Add delay to ensure Loading animation is visible in the document
 */
const mockFetch = async (url: string, options?: RequestInit) => {
  const startTime = Date.now()
  const res = await fetch(url, options)
  const json = await res.json()
  const duration = Date.now() - startTime
  if (duration < 800) {
    await new Promise(resolve => setTimeout(resolve, 800 - duration))
  }
  return json
}

// Helper: Add avatar for rendering
const getAvatar = (id: number | string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`

// --- 1. List Loading Example ---
const { 
  data: listResponse, 
  loading: listLoading, 
  run: refreshList 
} = useRequest(async () => {
  const data = await mockFetch(`${API_BASE}/users`)
  return data.map((item: { id: number }) => ({
    ...item,
    avatar: getAvatar(item.id + Math.random()),
    status: item.id % 2 === 0 ? 'active' : 'inactive'
  }))
})

const listData = computed(() => listResponse.value || [])
const listLastUpdated = ref('')

const { run: handleRefresh } = useRequest(async () => {
  await refreshList()
  listLastUpdated.value = new Date().toLocaleTimeString()
}, { manual: true })

const tsListDemo = `<${_T}>
  <div class="list-demo">
    <div class="list-header">
      <yh-button type="primary" :loading="loading" @click="run">
        Refresh Data
      </yh-button>
      <span class="update-time" v-if="lastUpdated">Last updated: {{ lastUpdated }}</span>
    </div>
    
    <yh-spin :show="loading" class="list-spin">
      <div class="user-list">
        <div v-for="user in list" :key="user.id" class="user-item">
          <yh-avatar :src="user.avatar" />
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-email">{{ user.email }}</div>
          </div>
          <yh-tag :type="user.status === 'active' ? 'success' : 'default'">
            {{ user.status }}
          </yh-tag>
        </div>
      </div>
    </yh-spin>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRequest } from '@yh-ui/request'

const lastUpdated = ref('')

const { data, loading, run } = useRequest(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
  const list = res.map(item => ({
    ...item,
    avatar: \`https://api.dicebear.com/7.x/avataaars/svg?seed=\${item.id}\`,
    status: item.id % 2 === 0 ? 'active' : 'inactive'
  }))
  lastUpdated.value = new Date().toLocaleTimeString()
  return list
})

const list = computed(() => data.value || [])

onMounted(() => {
  run()
})
</${_S}>`

// --- 2. Form Submission ---
const loginForm = reactive({ title: '', body: '', userId: 1 })
const { loading: loginLoading, run: handleLogin } = useRequest(
  async (formData: Record<string, unknown>) => {
    return await mockFetch(`${API_BASE}/posts`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
  },
  {
    manual: true,
    onSuccess: (res) => alert(`Post successful! Returned ID: ${res.id}`)
  }
)

const tsFormDemo = `<${_T}>
  <yh-form :model="form" label-width="80px" @submit.prevent="submit">
    <yh-form-item label="Title"><yh-input v-model="form.title" /></yh-form-item>
    <yh-form-item label="Content"><yh-input v-model="form.body" type="textarea" /></yh-form-item>
    <yh-form-item><yh-button type="primary" :loading="loading" native-type="submit">Submit</yh-button></yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'
import { useRequest } from '@yh-ui/request'
const form = reactive({ title: '', body: '', userId: 1 })
const { loading, run } = useRequest(
  (data) => fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(r => r.json()),
  { manual: true, onSuccess: (res) => alert('Submit successful, ID: ' + res.id) }
)
const submit = () => run(form)
</${_S}>`

// --- 3. Pagination List ---
interface User { id: number; name: string; email: string }
interface UserListResult { list: User[]; total: number }

const {
  data: paginationData,
  loading: tableLoading,
  current: tableCurrent,
  total: tableTotal,
  pageSize: tablePageSize
} = usePagination<UserListResult>(
  async (page, size) => {
    const res = await fetch(`${API_BASE}/users?_page=${page}&_limit=${size}`)
    const list = await res.json()
    const total = Number(res.headers.get('x-total-count')) || 10
    return { data: { list, total } }
  },
  { defaultPagination: { current: 1, pageSize: 5 } }
)
const tableListData = computed(() => paginationData.value?.list || [])

const tsPaginationDemo = `<${_T}>
  <div>
    <yh-table :data="list" :loading="loading" border>
      <yh-table-column prop="name" label="Name" />
      <yh-table-column prop="email" label="Email" />
    </yh-table>
    <div class="pagination-wrapper">
      <yh-pagination 
        v-model:current-page="current" 
        :total="total" 
        :page-size="pageSize" 
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@yh-ui/request'

interface User { id: number; name: string; email: string }
interface UserList { list: User[]; total: number }

const { data, loading, current, total, pageSize } = usePagination<UserList>(
  async (page, size) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users?_page=\${page}&_limit=\${size}\`)
    const list = await res.json()
    const totalCount = Number(res.headers.get('x-total-count') || 10)
    return { data: { list, total: totalCount } }
  },
  { defaultPagination: { current: 1, pageSize: 5 } }
)

const list = computed(() => data.value?.list || [])
</${_S}>`

// --- 5. Real Upload Progress (Using file.io) ---
interface UploadResult { success: boolean; link: string; name: string }

const uploadPercent = ref(0)
const uploadInputRef = ref<HTMLInputElement>()
const uploadResult = ref<UploadResult | null>(null)

const { loading: isUploading, run: startUpload } = useRequest<UploadResult>(
  async (file: File) => {
    uploadResult.value = null
    uploadPercent.value = 0
    
    // Progress simulation with predictive smoothing
    const timer = setInterval(() => {
      if (uploadPercent.value < 90) {
        uploadPercent.value += Math.floor(Math.random() * 5) + 1
      }
    }, 100)

    const formData = new FormData()
    formData.append('file', file)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      clearInterval(timer)
      uploadPercent.value = 100
      
      return { 
        success: true, 
        link: 'https://httpbin.org/post', 
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB'
      }
    } catch (err) {
      clearInterval(timer)
      throw err
    }
  },
  {
    manual: true,
    onSuccess: (res) => {
      uploadResult.value = res
    }
  }
)

const handleFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) startUpload(file)
}

const tsUploadDemo = `<${_T}>
<div class="upload-demo">
<yh-button type="primary" :loading="loading" @click="() => inputRef?.click()">
Select and Upload to httpbin
</yh-button>
<input ref="inputRef" type="file" style="display:none" @change="(e) => run((e.target as HTMLInputElement).files?.[0])" />

<div v-if="loading || percent > 0" class="progress-box">
<div class="progress-label">Upload Progress: {{ Math.floor(percent) }}%</div>
<yh-progress :percentage="percent" status="active" />
</div>

<div v-if="result" class="result-box">
<yh-alert type="success" title="Upload Successful!" show-icon>
File <b>{{ result.name }}</b> has been sent. Echo Link: <a :href="result.link" target="_blank">{{ result.link }}</a>
</yh-alert>
</div>
</div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'

const inputRef = ref<HTMLInputElement>()
const percent = ref(0)
const result = ref(null)

const { loading, run } = useRequest(
  async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    // Simulate smooth progress
    const timer = setInterval(() => {
      if (percent.value < 95) percent.value += 5
    }, 100)

    await new Promise(resolve => setTimeout(resolve, 1500))
    const res = await fetch('https://httpbin.org/post', { method: 'POST', body: formData }).then(r => r.json())
    
    clearInterval(timer)
    percent.value = 100
    return { name: file.name, size: (file.size / 1024).toFixed(2) + ' KB' }
  },
  {
    manual: true,
    onSuccess: (res) => { result.value = res }
  }
)

const trigger = () => run(inputRef.value?.files?.[0])
</${_S}>`

const tsAiChatDemo = `<${_T}>
  <yh-ai-chat 
    :messages="messages" 
    :loading="loading" 
    @send="send" 
    style="height: 400px; border: 1px solid var(--yh-border-color); border-radius: 12px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@yh-ui/request'
import type { AiChatMessage } from '@yh-ui/components'

const messages = ref<AiChatMessage[]>([{ id: '1', role: 'assistant', content: 'Hello!' }])

const { loading, run: sendMessage } = useRequest(
  async (text: string) => {
    // 1. Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const replies = [
      'Hello! I am the YH-UI official assistant, demonstrating the streaming effect.',
      'Using the \`YhAiChat\` component significantly simplifies the development of AI chat interfaces.',
      'You can directly bind the states obtained from \`useRequest\` to the AI components.'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  },
  {
    manual: true,
    onSuccess: async (res: string) => {
      // 2. Find the last assistant message (pre-created by the send function) and simulate streaming
      const aiMsg = messages.value[messages.value.length - 1]
      if (aiMsg && aiMsg.role === 'assistant') {
        for (const char of res) {
          aiMsg.content += char
          await new Promise(resolve => setTimeout(resolve, 30))
        }
      }
    }
  }
)

const send = (text: string) => {
  if (!text || loading.value) return
  // Insert user message
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  // Insert an empty assistant message as a placeholder
  messages.value.push({ id: (Date.now() + 1).toString(), role: 'assistant', content: '' })
  sendMessage(text)
}
</${_S}>`

// --- 6. AI Conversation Integration ---
const aiMessages = ref<AiChatMessage[]>([{ id: '1', role: 'assistant', content: 'Hello! I am the integration example AI.' }])
const aiLoading = ref(false)
const handleAiSend = (text: string) => {
  if (aiLoading.value || !text) return
  
  aiMessages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  aiLoading.value = true
  
  // 1. Simulate server response delay
  setTimeout(async () => {
    const replies = [
      'Hello! I am the YH-UI official assistant, demonstrating the streaming effect.',
      'Using the \`YhAiChat\` component significantly simplifies the development of AI chat interfaces.',
      'You can directly bind the states obtained from \`useRequest\` to the AI components.'
    ]
    const fullText = replies[Math.floor(Math.random() * replies.length)]
    aiLoading.value = false

    // 2. Create an empty assistant message object
    const aiId = (Date.now() + 1).toString()
    aiMessages.value.push({ id: aiId, role: 'assistant', content: '' })
    const aiMsg = aiMessages.value.find(m => m.id === aiId)
    
    // 3. Start "typing"
    if (aiMsg) {
      for (const char of fullText) {
        aiMsg.content += char
        await new Promise(r => setTimeout(r, 30))
      }
    }
  }, 1000)
}

onMounted(() => {
  handleRefresh()
})
</script>

# Integration with UI Components

`@yh-ui/request` is designed to seamlessly interface with UI component libraries. By directly binding reactive states like `loading`, `data`, and `error` to UI elements, developers can implement complex interactions with minimal effort.

## Basic Integration Examples

### 1. Data List + Loading State

<DemoBlock title="List Loading Example" :ts-code="tsListDemo" :js-code="toJs(tsListDemo)">
  <div class="list-demo">
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
      <yh-button type="primary" :loading="listLoading" @click="() => handleRefresh()">Refresh Data</yh-button>
      <span style="font-size:12px; color:var(--yh-text-color-secondary)" v-if="listLastUpdated">Last updated: {{ listLastUpdated }}</span>
    </div>
    <yh-spin :show="listLoading" style="min-height:150px">
      <div style="display:flex; flex-direction:column; gap:12px">
        <div v-for="user in listData" :key="user.id" style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid var(--yh-border-color); border-radius:8px">
          <yh-avatar :src="user ? user.avatar : ''" />
          <div style="flex:1">
            <div style="font-weight:600">{{ user ? user.name : 'Loading...' }}</div>
          </div>
          <yh-tag :type="user && user.status === 'active' ? 'success' : 'info'">{{ user ? user.status : '' }}</yh-tag>
        </div>
      </div>
    </yh-spin>
  </div>
</DemoBlock>

### 2. Form Submission + Feedback

<DemoBlock title="Form Submission Example" :ts-code="tsFormDemo" :js-code="toJs(tsFormDemo)">
  <div style="max-width:500px">
    <yh-form :model="loginForm" label-width="80px" @submit.prevent="() => handleLogin(loginForm)">
      <yh-form-item label="Title"><yh-input v-model="loginForm.title" /></yh-form-item>
      <yh-form-item label="Content"><yh-input v-model="loginForm.body" type="textarea" :rows="3" /></yh-form-item>
      <yh-form-item><yh-button type="primary" :loading="loginLoading" native-type="submit">Submit</yh-button></yh-form-item>
    </yh-form>
  </div>
</DemoBlock>

### 3. Pagination List (Integration Mode)

<DemoBlock title="Pagination Hooks Example" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
  <div>
    <yh-table :data="tableListData" :loading="tableLoading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="Name" />
      <yh-table-column prop="email" label="Email" />
    </yh-table>
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination v-model:current-page="tableCurrent" :page-size="tablePageSize" :total="tableTotal" layout="prev, pager, next, total" />
    </div>
  </div>
</DemoBlock>

## Advanced Scenarios

### 5. Real Upload Progress Integration

Demonstrates how to use `useRequest` with a real 3rd party file storage service.

<DemoBlock title="Upload to file.io" :ts-code="tsUploadDemo" :js-code="toJs(tsUploadDemo)">
<div>
<yh-button type="primary" :loading="isUploading" @click="() => uploadInputRef?.click()">Select and Upload Online</yh-button>
<input ref="uploadInputRef" type="file" style="display:none" @change="handleFileSelect" />
<div v-if="isUploading || uploadPercent > 0" style="margin-top:20px">
<div style="margin-bottom:8px; font-size:14px">Upload Progress: {{ Math.floor(uploadPercent) }}%</div>
<yh-progress :percentage="uploadPercent" status="active" />
</div>
<div v-if="uploadResult" style="margin-top:20px">
<div style="padding:12px; background:#f6ffed; border:1px solid #b7eb8f; border-radius:8px; color:rgba(0,0,0,0.85)">
<span style="color:#52c41a; font-weight:bold; margin-right:8px">✓</span> Upload Successful!
File <b>{{ uploadResult?.name }}</b> has been processed.
<br/><span style="font-size:12px; color:var(--yh-text-color-secondary)">API Echo: https://httpbin.org/post</span>
</div>
</div>
</div>
</DemoBlock>

### 6. AI Conversation Component Integration

<DemoBlock title="AI Conversation Demo" :ts-code="tsAiChatDemo" :js-code="toJs(tsAiChatDemo)">
  <yh-ai-chat 
    :messages="aiMessages" 
    :loading="aiLoading" 
    @send="handleAiSend" 
    style="height: 350px; border: 1px solid var(--yh-border-color); border-radius: 12px"
  />
</DemoBlock>
