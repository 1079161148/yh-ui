# 实战案例

本页面汇集了 `@yh-ui/request` 在**企业后台管理系统**中的典型实战场景。每个案例都经过深度优化，集成了最佳实践，旨在帮助你应对复杂的业务需求。

---

## 目录

[[toc]]

---

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { request, useRequest, usePagination, useRequestSWR, useAIStream } from '@yh-ui/request'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// 使用 JSONPlaceholder 模拟真实接口
const API_BASE = 'https://jsonplaceholder.typicode.com'

// ======================== 定义示例源码 ========================

// 1. Loading 策略：局部 Loading 与静默刷新
const tsLoadingDemo = `<${_T}>
  <div class="demo-card">
    <div class="demo-actions">
      <yh-button type="primary" :loading="isNormalLoading" @click="refreshNormal">
        普通刷新 (带 Loading)
      </yh-button>
      <yh-button @click="refreshSilent">
        静默刷新 (不触发 Loading)
      </yh-button>
    </div>

    <yh-spin :show="isNormalLoading" tip="正在加载数据...">
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

// 2. 交互优化：防抖搜索与请求去重
const tsInteractionDemo = `<${_T}>
  <div class="demo-card">
    <div class="search-box">
      <yh-input 
        v-model="searchQuery" 
        placeholder="输入任务标题搜索 (防抖)..." 
      />
    </div>

    <div class="tab-box" style="margin: 12px 0;">
      <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
        <yh-radio value="all">全部</yh-radio>
        <yh-radio value="completed">已完成</yh-radio>
      </yh-radio-group>
    </div>

    <!-- 响应式表格容器 -->
    <div style="width: 100%; overflow-x: auto;">
      <yh-table :data="list" :loading="loading" style="min-width: 600px;">
        <yh-table-column prop="id" label="ID" width="70" />
        <yh-table-column prop="title" label="任务标题" min-width="200" show-overflow-tooltip />
        <yh-table-column prop="completed" label="状态" width="120">
          <template #default="{ row }">
            <yh-tag :type="row?.completed ? 'success' : 'warning'">
              {{ row?.completed ? '已完成' : '进行中' }}
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

// 1. 初始化 useRequest：利用 requestKey & abortSameKey 实现快速切换时的自动取消
const { data, loading, run } = useRequest<Todo[]>(
  (params) => {
    // 工业级最佳实践：清理请求参数
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
    // 最佳实践：在 Hook 全局配置中统一处理取消类错误
    onError: (err) => {
      if (err.isCanceled || err.name === 'AbortError') return
      console.error('Request Error:', err.message)
    }
  }
)

// 2. 搜索防抖逻辑
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (q) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    // 无需再手动写 .catch()
    run({ q: q || undefined, _limit: 5, completed: activeTab.value === 'completed' || undefined })
  }, 500)
})

// 3. Tab 切换：立即触发，无需等待防抖
const handleTabChange = (val: string) => {
  if (searchTimer) clearTimeout(searchTimer)
  // 保持调用链路简洁清爽
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

// 3. 复杂列表：高级分页与多重筛选
const tsPaginationDemo = `<${_T}>
  <div class="demo-card">
    <div class="filter-header">
      <yh-form inline :model="form">
        <yh-form-item label="标题">
          <yh-input v-model="form.title" placeholder="模糊搜索" />
        </yh-form-item>
        <yh-button type="primary" @click="search">搜索</yh-button>
        <yh-button @click="reset">重置</yh-button>
      </yh-form>
    </div>

    <yh-table :data="data?.list" :loading="loading" border>
      <yh-table-column prop="id" label="ID" width="70" />
      <yh-table-column prop="title" label="文章标题" />
      <yh-table-column prop="userId" label="作者 ID" width="100">
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

// 注意：current/pageSize/total 是顶层属性
const { data, loading, current, pageSize, total, pagination } = usePagination<Post>(
  async (page, size) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${size}&title_like=\${form.title}\`)
    const list = await res.json()
    // 模拟逻辑：如果有搜索结果则返回100条总数，否则返回0
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

// 4. 文件交互：模拟大文件分片上传
const tsUploadDemo = `<${_T}>
  <div class="demo-card">
    <div class="upload-area">
      <yh-button type="primary" :loading="uploading" @click="startUpload">
        模拟分片上传
      </yh-button>
    </div>
    <div v-if="uploading || uploadPercent > 0" style="margin-top: 24px;">
      <div style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">
        上传进度：{{ uploadPercent }}%
      </div>
      <yh-progress :percentage="uploadPercent" :status="uploadPercent === 100 ? 'success' : 'active'" />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest } from '@yh-ui/request'

const uploadPercent = ref(0)

// 使用 useRequest 封装复合异步逻辑
const { loading: uploading, run: startUpload } = useRequest(async () => {
  uploadPercent.value = 0
  for (let i = 1; i <= 4; i++) {
    // 1. 发送分片请求
    await request.post('https://jsonplaceholder.typicode.com/posts', { chunk: i })
    // 2. 交互延迟，增加至 800ms 以便清晰观察进度
    await new Promise(r => setTimeout(r, 800))
    uploadPercent.value = i * 25
  }
}, { manual: true })
</${_S}>`

// 5. 认证拦截与无感刷新
const tsAuthDemo = `<${_T}>
  <div class="demo-card">
    <div style="padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
      <div v-if="isAuthLoading">同步中...</div>
      <div v-else>
        <yh-tag type="success">认证状态：正常</yh-tag>
        <div style="margin-top: 12px; font-family: monospace; font-size: 13px;">
          Current Token: {{ mockToken.slice(0, 12) }}...
        </div>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <yh-button size="small" @click="runAuth">普通请求</yh-button>
        <yh-button size="small" type="warning" @click="triggerAuthRefresh">模拟 Token 失效刷新</yh-button>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest } from '@yh-ui/request'

// 1. 模拟 Token 存储
const mockToken = ref('yh-ui-init-token')

// 2. 配置拦截器逻辑
request.interceptors.request.use(config => {
  // 确保 headers 对象存在
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
      // 1. 刷新 Token
      mockToken.value = 'refreshed-' + Date.now()
      // 2. 补发请求
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
  // 1. 模拟 Token 过期：手动清空本地存储
  mockToken.value = '' 
  // 2. 发起请求：拦截器会识别并触发刷新逻辑
  runAuth().catch(() => {})
}
</${_S}>`

// 6. 请求健稳性：重试与去重
const tsResilienceDemo = `<${_T}>
  <div class="demo-card">
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <yh-button type="primary" :loading="isResiLoading" @click="runResilience">发起请求 (带去重)</yh-button>
      <yh-button @click="logs = []">清空日志</yh-button>
    </div>
    <div class="console-box">
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
    retry: true,            // 开启重试
    retryTimes: 3,          // 重试次数
    requestKey: 'res-demo',  // 唯一标识
    abortSameKey: true      // 自动打断旧请求
  }),
  { 
    manual: true,
    onSuccess: () => addLog('成功'),
    onError: (err) => {
      if (err.isCanceled) return addLog('并发拦截：旧请求取消')
      addLog(\`报错: \${err.message}\`)
    }
  }
)

const runResilience = () => {
  addLog('发起连续请求...')
  run().catch(() => {}) // 捕获打断报错
  run().catch(() => {})
}
</${_S}>`

// 7. 数据流转：缓存 (SWR) 与状态
const tsSWRDemo = `<${_T}>
  <div class="demo-card">
    <yh-alert type="success" show-icon title="SWR 已激活">
      该接口数据已进入强缓存，切换页面后可立即展示。
    </yh-alert>
    <div class="swr-data-display">
      {{ swrData ? JSON.stringify(swrData).slice(0, 60) + '...' : 'Loading...' }}
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button :loading="swrLoading" @click="swrRefresh">静默刷新</yh-button>
      <yh-button @click="swrMutate({ title: 'yh-ui 状态更新' })">立即更新 UI</yh-button>
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

// 8. AI 业务：流式输出与思考过程
const tsAIDemo = `<${_T}>
  <div class="demo-card">
    <div class="ai-box">
      <div v-if="aiThinking" class="thinking-text">AI 正在思考: {{ aiThinking }}</div>
      <div class="content">{{ aiText }}</div>
    </div>
    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <yh-button type="primary" :loading="aiLoading" @click="handleAIStart">发问</yh-button>
      <yh-button v-if="aiLoading" @click="aiStop">停止</yh-button>
      <yh-button @click="aiReset">重置</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAIStream } from '@yh-ui/request'

const { text: aiText, thinking: aiThinking, loading: aiLoading, start: aiStart, stop: aiStop, reset: aiReset } = useAIStream()

const handleAIStart = () => {
  aiStart({ url: '/api/chat', method: 'POST', data: { query: '你好' } })
}
</${_S}>
<${_St}>
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</${_St}>`


// 9. 全能最佳实践：工程化集成方案
const tsFullDemo = `<${_T}>
  <div class="demo-card">
    <div class="demo-grid">
      <div class="demo-item">
        <div class="label">RESTful & 局部 Loading</div>
        <yh-button type="primary" :loading="apiIsLoading" @click="apiFetchUser(1)">获取用户 (带 Loading)</yh-button>
        <yh-button style="margin-top: 8px" @click="apiFetchUser(2)">获取用户 (静默展示)</yh-button>
      </div>
      
      <div class="demo-item">
        <div class="label">文件处理</div>
        <div class="btn-group">
          <yh-button @click="apiUpload">分片上传</yh-button>
          <yh-button @click="apiDownload">下载导出 (Blob)</yh-button>
        </div>
      </div>

      <div class="demo-item">
          <div class="label">去重与重试</div>
          <yh-button type="warning" @click="apiResilience">并发点击 (自动去重+重试)</yh-button>
      </div>

      <div class="demo-item">
          <div class="label">WebSocket</div>
          <yh-tag :type="apiWsConnected ? 'success' : 'danger'">WS {{ apiWsConnected ? '已连接' : '已断开' }}</yh-tag>
          <div class="ws-info">最新消息：{{ apiWsMsg }}</div>
      </div>
    </div>

    <div class="ai-section">
      <div class="label">AI 助手 (流式输出)</div>
      <div class="ai-console">{{ apiAiText || '等待发问...' }}</div>
      <yh-button type="primary" size="small" :loading="apiAiLoading" @click="apiAiSubmit">智能分析</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { request, useRequest, useAIStream } from '@yh-ui/request'

// 1. 初始化工程化实例
const api = request.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  retry: true,        // 全局开启重试
  retryTimes: 2
})

// 2. 统一拦截器
api.interceptors.request.use(config => {
  config.headers = { ...config.headers, Authorization: 'Bearer token_xxx' }
  return config
})

// 3. 核心业务逻辑
const apiAiText = ref('')

// A. RESTful 控制
const { loading: apiIsLoading, run: runFetch } = useRequest(
  (id: number) => api.get(\`/users/\${id}\`),
  { manual: true }
)
const apiFetchUser = async (id: number) => {
  await runFetch(id)
}

// B. 文件上传 (分片模拟)
const apiUpload = async () => {
  apiAiText.value = '开始模拟分片上传...\\n'
  for(let i = 1; i <= 3; i++) {
    await api.post('/posts', { chunk: i })
    apiAiText.value += \`> 已发送第 \${i} 个切片\\n\`
  }
  apiAiText.value += '分片上传完成'
}

// C. 文件下载 (Blob处理模拟)
const apiDownload = async () => {
  apiAiText.value = '正在请求文件流...\\n'
  const res = await api.get('/posts/1', { responseType: 'blob' })
  apiAiText.value += \`> 文件获取成功: \${res.headers['content-type']}\\n\`
  apiAiText.value += '模拟生成下载链接并触发点击...'
}

// D. AI 流式交互
const { start: aiStart, loading: apiAiLoading } = useAIStream()
const apiAiSubmit = () => {
  apiAiText.value = ''
  aiStart({ url: '/posts', method: 'POST', data: { query: '最佳实践' } })
  // 模拟流式输出展示
  let i = 0; const t = setInterval(() => {
    apiAiText.value += 'AI 正在分析架构优势... '; if(i++ > 2) clearInterval(t)
  }, 400)
}

// E. 自动去重
const apiResilience = () => {
  api.get('/posts/1', { requestKey: 'unique-task', abortSameKey: true })
}

// F. WebSocket 状态
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

// ======================== 响应式 UI 逻辑 (供演示交互) ========================
// 9. Full Practice UI Data (Aesthetics & Engineering)
const apiIsLoading = ref(false)
const apiFetchUser = async (id: number) => {
  if (id === 1) apiIsLoading.value = true
  await request.get(`${API_BASE}/users/${id}`)
  apiIsLoading.value = false
}
const apiUpload = async () => {
  apiAiText.value = '开始模拟分片上传...\n'
  for (let i = 1; i <= 3; i++) {
    await request.post(`${API_BASE}/posts`, { chunk: i })
    apiAiText.value += `> 已发送第 ${i} 个切片\n`
    await new Promise(r => setTimeout(r, 400))
  }
  apiAiText.value += '分片上传完成'
}
const apiDownload = async () => {
  apiAiText.value = '正在模拟请求文件流...\n'
  const res = await request.get(`${API_BASE}/posts/1`)
  apiAiText.value += `> 状态码: ${res.status || 200}\n`
  apiAiText.value += `> 模拟下载成功: post-1.xlsx\n`
  apiAiText.value += '已在本地生成模拟下载链接并触发'
}
const apiResilience = () => {
  apiAiText.value = '触发并发请求...\n> 检测到重复 RequestKey, 自动取消旧请求'
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] 并发去重请求已发送`)
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
        apiAiText.value += 'AI 正在分析全能架构的工程优势... '
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

// 5. Auth (演示拦截器注入)
const mockToken = ref('yh-ui-init-token')

// 【演示专用】清除旧的拦截器（防止 HMR 重复注册导致报错）
request.interceptors.request.clear()
request.interceptors.response.clear()

// 1. 请求拦截器：演示 Token 自动注入
request.interceptors.request.use(config => {
  // 确保安全性：合并现有 headers 并注入 Token
  config.headers = { 
    ...config.headers, 
    Authorization: mockToken.value ? `Bearer ${mockToken.value}` : '' 
  }
  return config
})

// 2. 响应拦截器：模拟 401 自动刷新 Token
request.interceptors.response.use(
  (res) => {
    // 【演示专用】由于测试接口 jsonplaceholder 不会返回 401，
    // 我们在此模拟：如果携带的是空 Token 且非补发请求，则触发刷新补发
    if (!mockToken.value && res.config && !(res.config as any)._isRetry) {
      console.warn('演示：检测到无 Token 请求，模拟进入“刷新拦截”流程...');
      mockToken.value = 'refreshed-' + Math.random().toString(36).slice(2, 10)
      
      const retryConfig = { ...res.config, _isRetry: true } as any
      return request.request(retryConfig)
    }
    return res
  },
  async (error) => {
    // 生产环境下通常在此处捕获 error.response.status === 401
    // 进行 Token 刷新及 promise 排队补发
    throw error
  }
)

const { loading: isAuthLoading, run: runAuth } = useRequest(
  () => request.get(`${API_BASE}/posts/1`),
  { manual: true }
)

const triggerAuthRefresh = () => {
  mockToken.value = '' // 清空以模拟失效
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
    onSuccess: () => logs.value.unshift(`[${new Date().toLocaleTimeString()}] 请求成功`),
    onError: (err) => {
      if (!err.isCanceled) logs.value.unshift(`[${new Date().toLocaleTimeString()}] 报错: ${err.message}`)
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
    aiText.value += '模拟 AI 正在生成内容... ';
    if (i++ > 3) { clearInterval(timer); aiDone.value = true; aiLoading.value = false; }
  }, 400);
}
</script>

## UI 交互反馈

### 1. 差异化 Loading 策略

<DemoBlock title="Loading 策略演示" :ts-code="tsLoadingDemo" :js-code="toJs(tsLoadingDemo)">
<div class="demo-card">
  <div style="margin-bottom: 20px; display: flex; gap: 12px;">
    <yh-button type="primary" :loading="isNormalLoading" @click="refreshLoading">普通刷新</yh-button>
    <yh-button @click="silentRefresh">静默刷新</yh-button>
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

### 2. 防抖搜索与快速切换

<DemoBlock title="高级交互演示" :ts-code="tsInteractionDemo" :js-code="toJs(tsInteractionDemo)">
<div class="demo-card">
  <div style="margin-bottom: 20px;">
    <yh-input v-model="searchQuery" placeholder="输入任务标题进行防抖搜索..." />
  </div>
  <div style="margin-bottom: 16px;">
    <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
      <yh-radio value="all">全部</yh-radio>
      <yh-radio value="completed">已完成</yh-radio>
    </yh-radio-group>
  </div>
  <div style="width: 100%; overflow-x: auto;">
    <yh-table :data="interactionList" :loading="isInterloading" style="min-width: 600px;">
      <yh-table-column prop="id" label="ID" width="70" />
      <yh-table-column prop="title" label="任务标题" min-width="200" show-overflow-tooltip />
      <yh-table-column prop="completed" label="状态" width="120">
        <template #default="{ row }">
          <yh-tag :type="row?.completed ? 'success' : 'warning'">
            {{ row?.completed ? '已完成' : '进行中' }}
          </yh-tag>
        </template>
      </yh-table-column>
    </yh-table>
  </div>
</div>
</DemoBlock>

---

### 3. 企业级分页列表

<DemoBlock title="标准列表页" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
<div class="demo-card">
  <div style="margin-bottom: 16px; background: var(--yh-bg-color-soft); padding: 16px; border-radius: 8px;">
    <yh-form inline :model="pgForm">
      <yh-form-item label="标题"><yh-input v-model="pgForm.title" /></yh-form-item>
      <yh-button type="primary" @click="searchPg">查询</yh-button>
      <yh-button @click="resetPg">重置</yh-button>
    </yh-form>
  </div>
  <yh-table :data="pgData?.list" :loading="pgLoading" border stripe>
    <yh-table-column prop="id" label="ID" width="70" />
    <yh-table-column prop="title" label="文章标题" />
    <yh-table-column prop="userId" label="作者" width="100">
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

### 4. 模拟大文件分片上传

<DemoBlock title="分片上传模拟" :ts-code="tsUploadDemo" :js-code="toJs(tsUploadDemo)">
<div class="demo-card">
  <yh-button type="primary" :loading="isUploading" @click="runUpload">
    开始模拟分片上传
  </yh-button>
  <div v-if="isUploading || uploadP > 0" style="margin-top: 24px;">
    <div style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">
      上传进度：{{ uploadP }}%
    </div>
    <yh-progress :percentage="uploadP" :status="uploadP === 100 ? 'success' : 'active'" />
  </div>
</div>
</DemoBlock>

> [!TIP]
> **大文件分片上传核心思路：**
>
> 1. **切片**：前端利用 `Blob.prototype.slice` 将文件切割成固定大小（如 2MB）的二进制块。
> 2. **并发控制**：控制同时发送的分片请求数量，避免阻塞浏览器其他业务请求。
> 3. **断点续传**：上传前计算文件 Hash，查询后台已收到的切片，只传缺失部分。
> 4. **合并**：所有分片上传完成后，发送合并请求通知后台拼装文件。
> 5. **性能优化**：文件 Hash 计算属于 CPU 密集型任务，大型文件建议在 Web Worker 中处理，避免阻塞主线程导致页面卡顿。

---

## 工程化核心能力

### 5. 认证拦截与无感刷新

<DemoBlock title="Token 自动注入与失效刷新" :ts-code="tsAuthDemo" :js-code="toJs(tsAuthDemo)">
<div class="demo-card">
  <div style="padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
    <div v-if="isAuthLoading">同步中...</div>
    <div v-else>
      <yh-tag type="success">认证状态：正常</yh-tag>
      <div style="margin-top: 12px; font-family: monospace; font-size: 13px;">
        Current Token: {{ mockToken.slice(0, 12) }}...
      </div>
    </div>
    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <yh-button size="small" @click="runAuth">普通请求</yh-button>
      <yh-button size="small" type="warning" @click="triggerAuthRefresh">模拟 Token 失效刷新</yh-button>
    </div>
  </div>
</div>
</DemoBlock>

### 6. 请求健稳性：重试与去重

<DemoBlock title="自动重试与并发控制" :ts-code="tsResilienceDemo" :js-code="toJs(tsResilienceDemo)">
<div class="demo-card">
  <div style="display: flex; gap: 12px; margin-bottom: 16px;">
    <yh-button type="primary" @click="runResilience">发起请求 (带去重)</yh-button>
    <yh-button @click="logs = []">清空日志</yh-button>
  </div>
  <div style="background: #000; color: #00ff00; padding: 12px; font-family: monospace; font-size: 12px; border-radius: 4px; max-height: 120px; overflow-y: auto;">
    <div v-for="(log, i) in logs" :key="i">> {{ log }}</div>
    <div v-if="logs.length === 0" style="color: #666;">Waiting for logs...</div>
  </div>
</div>
</DemoBlock>

### 7. 数据流转：缓存 (SWR) 与状态

<DemoBlock title="SWR 数据缓存与同步" :ts-code="tsSWRDemo" :js-code="toJs(tsSWRDemo)">
<div class="demo-card">
  <yh-alert type="success" show-icon title="SWR 已激活">
    该接口数据已进入强缓存，切换页面后可立即展示。
  </yh-alert>
  <div style="margin: 16px 0; padding: 12px; border: 1px solid var(--yh-border-color); border-radius: 4px;">
    {{ swrData ? JSON.stringify(swrData).slice(0, 60) + '...' : 'Loading...' }}
  </div>
  <div style="display: flex; gap: 8px;">
    <yh-button :loading="swrLoading" @click="swrRefresh">静默刷新</yh-button>
    <yh-button @click="swrMutate({ title: 'yh-ui 状态更新' })">立即更新 UI</yh-button>
  </div>
</div>
</DemoBlock>

---

## AI 业务场景

### 8. 流式输出与思考过程

<DemoBlock title="AI 对话流式交互" :ts-code="tsAIDemo" :js-code="toJs(tsAIDemo)">
<div class="demo-card">
  <div style="background: var(--yh-bg-color-soft); padding: 16px; border-radius: 8px; min-height: 80px; margin-bottom: 16px;">
    <div v-if="aiThinking" style="color: var(--yh-text-color-secondary); margin-bottom: 8px;">
       Thinking...
    </div>
    <div style="white-space: pre-wrap;">{{ aiText }}</div>
  </div>
  <div style="display: flex; gap: 8px;">
    <yh-button type="primary" :loading="aiLoading" @click="handleAIStart">发问</yh-button>
    <yh-button v-if="aiLoading" @click="aiStop">停止</yh-button>
    <yh-button @click="aiReset">重置</yh-button>
  </div>
</div>
</DemoBlock>

> [!TIP]
> **AI 场景下的请求优化：**
>
> 1. **流式传输**：使用 `useAIStream` 处理分块数据，避免长时间等待。
> 2. **打字机效果**：通过 `onText` 回调实时追加入 UI，通过 CSS 动画模拟光标。
> 3. **状态拆分**：将 “思考中 (thinking)” 和 “回答中 (text)” 状态解耦，提供更好的心理预期。

### 9. 全能工程化最佳实践

在大型企业级项目中，通常需要对请求库进行二次封装以统一处理 **Token 注入、响应格式化、错误全局拦截、断网重连**等。以下是基于 `@yh-ui/request` 的全能配置方案：

<DemoBlock title="全能实战配置与交互" :ts-code="tsFullDemo" :js-code="toJs(tsFullDemo)">
<div class="demo-card">
  <div class="demo-grid">
    <div class="demo-item">
      <div class="label">RESTful & 局部 Loading</div>
      <yh-button type="primary" :loading="apiIsLoading" @click="apiFetchUser(1)">获取用户 (带 Loading)</yh-button>
      <yh-button style="margin-top: 8px" @click="apiFetchUser(2)">获取用户 (静默展示)</yh-button>
    </div>
    <div class="demo-item">
      <div class="label">文件处理</div>
      <div class="btn-group">
        <yh-button @click="apiUpload">分片上传</yh-button>
        <yh-button @click="apiDownload">下载导出 (Blob)</yh-button>
      </div>
    </div>
    <div class="demo-item">
        <div class="label">去重与重试</div>
        <yh-button type="warning" @click="apiResilience">并发点击 (自动去重+重试)</yh-button>
    </div>
    <div class="demo-item">
        <div class="label">WebSocket</div>
        <yh-tag :type="apiWsConnected ? 'success' : 'danger'">WS {{ apiWsConnected ? '已连接' : '已断开' }}</yh-tag>
        <div class="ws-info">最新消息：{{ apiWsMsg }}</div>
    </div>
  </div>
  <div class="ai-section">
    <div class="label">AI 助手 (流式输出)</div>
    <div class="ai-console">{{ apiAiText || '等待发问...' }}</div>
    <yh-button type="primary" size="small" :loading="apiAiLoading" @click="apiAiSubmit">智能分析</yh-button>
  </div>
</div>
</DemoBlock>

> [!TIP]
> **工程化架构建议：**
>
> 1. **实例隔离**：为不同类型的业务（如：主系统、地图引擎、AI 网关）创建不同的 `request` 实例，配置独立的拦截器。
> 2. **防御性编程**：在拦截器中始终检查 `config.headers`，使用解构赋值而非直接操作，避免 HMR 或特殊请求下的 `undefined` 报错。
> 3. **统一类型约束**：利用 TypeScript 的泛型能力定义全局 `ResponseStructure`，确保前端开发体验。
> 4. **资源清理**：在组件卸载（`onUnmounted`）时，务必调用 `cancel()` 或关闭 WebSocket，防止内存泄漏。

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
