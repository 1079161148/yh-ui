# 实战案例

本页面汇集了 `@yh-ui/request` 在**企业后台管理系统**中的典型实战场景。每个案例都经过深度优化，集成了最佳实践，旨在帮助你应对复杂的业务需求。

---

## 目录

[[toc]]

---

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { request, useRequest, usePagination } from '@yh-ui/request'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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

// 2. 交互优化：防抖搜索与请求去重
const tsInteractionDemo = `<${_T}>
  <div class="demo-card">
    <div class="search-box">
      <yh-input 
        v-model="searchQuery" 
        placeholder="输入用户名搜索 (防抖)..." 
      />
    </div>

    <div class="tab-box" style="margin: 12px 0;">
      <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
        <yh-radio label="all">全部</yh-radio>
        <yh-radio label="completed">已完成</yh-radio>
      </yh-radio-group>
    </div>

    <yh-table :data="list" :loading="loading">
      <yh-table-column prop="id" label="ID" width="80" />
      <yh-table-column prop="title" label="任务标题" />
      <yh-table-column prop="completed" label="状态" width="100">
        <template #default="{ row }">
          <yh-tag :type="row?.completed ? 'success' : 'warning'">
            {{ row?.completed ? '已完成' : '进行中' }}
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

// 监听搜索词自动触发 (带防抖)
watch(searchQuery, (q) => run({ q, _limit: 5 }).catch(() => {}))

const handleTabChange = (val: string) => {
  run({ completed: val === 'completed', _limit: 5 }).catch(() => {})
}

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



// ======================== 响应式 UI 逻辑 (供演示交互) ========================

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
    <yh-input v-model="searchQuery" placeholder="输入关键词进行防抖搜索..." />
  </div>
  <div style="margin-bottom: 16px;">
    <yh-radio-group v-model="activeTab" type="button" @change="handleTabChange">
      <yh-radio label="all">全部</yh-radio>
      <yh-radio label="completed">已完成</yh-radio>
    </yh-radio-group>
  </div>
  <yh-table :data="interactionList" :loading="isInterloading">
    <yh-table-column prop="id" label="ID" width="80" />
    <yh-table-column prop="title" label="任务标题" show-overflow-tooltip />
    <yh-table-column prop="completed" label="状态" width="100">
      <template #default="{ row }">
        <yh-tag :type="row?.completed ? 'success' : 'warning'">
          {{ row?.completed ? '已完成' : '进行中' }}
        </yh-tag>
      </template>
    </yh-table-column>
  </yh-table>
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
> 5. **性能优化**：文件 Hash 计算属于 **CPU 密集型任务**，大型文件建议在 **Web Worker** 中处理，避免阻塞主线程导致页面卡顿。

<style scoped>
.demo-card { padding: 8px; }
</style>
