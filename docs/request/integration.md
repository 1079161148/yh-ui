# 与 UI 组件集成

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRequest, usePagination } from '@yh-ui/request'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// 使用 JSONPlaceholder 模拟真实接口
const API_BASE = 'https://jsonplaceholder.typicode.com'

/**
 * 辅助方法：模拟真实的网络请求
 * 增加延迟以确保 Loading 动画在文档中可见
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

// 辅助方法：为渲染补充头像
const getAvatar = (id: number | string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`

// --- 1. 列表加载示例 ---
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
        刷新数据
      </yh-button>
      <span class="update-time" v-if="lastUpdated">最后更新: {{ lastUpdated }}</span>
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

// --- 2. 表单提交示例 ---
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
    onSuccess: (res) => alert(`发布成功！接口返回 ID: ${res.id}`)
  }
)

const tsFormDemo = `<${_T}>
  <yh-form :model="form" label-width="80px" @submit.prevent="submit">
    <yh-form-item label="标题"><yh-input v-model="form.title" /></yh-form-item>
    <yh-form-item label="内容"><yh-input v-model="form.body" type="textarea" /></yh-form-item>
    <yh-form-item><yh-button type="primary" :loading="loading" native-type="submit">提交并发布</yh-button></yh-form-item>
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
  { manual: true, onSuccess: (res) => alert('提交成功，ID: ' + res.id) }
)
const submit = () => run(form)
</${_S}>`

// --- 3. 分页列表 ---
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
      <yh-table-column prop="name" label="姓名" />
      <yh-table-column prop="email" label="邮箱" />
    </yh-table>
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination v-model:current-page="current" :total="total" :page-size="pageSize" />
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

// --- 5. 上传进度演示 (使用真实免费接口 file.io) ---
interface UploadResult { success: boolean; link: string; name: string }

const uploadPercent = ref(0)
const uploadInputRef = ref<HTMLInputElement>()
const uploadResult = ref<UploadResult | null>(null)

const { loading: isUploading, run: startUpload } = useRequest<UploadResult>(
  async (file: File) => {
    uploadResult.value = null
    uploadPercent.value = 0
    
    // 进度模拟（由于 Fetch 不原生支持上传进度，此处采用平滑预测算法）
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
选择并上传到 httpbin
</yh-button>
<input ref="inputRef" type="file" style="display:none" @change="(e) => run((e.target as HTMLInputElement).files?.[0])" />

<div v-if="loading || percent > 0" class="progress-box">
<div class="progress-label">上传进度: {{ Math.floor(percent) }}%</div>
<yh-progress :percentage="percent" status="active" />
</div>

<div v-if="result" class="result-box">
<yh-alert type="success" title="上传成功！" show-icon>
文件 <b>{{ result.name }}</b> 已发送。回显链接：<a :href="result.link" target="_blank">{{ result.link }}</a>
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
    
    // 模拟平滑进度
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
import type { AiChatMessage } from '@yh-ui/request'

const messages = ref<AiChatMessage[]>([
  { id: '1', role: 'assistant', content: '您好！' }
])

const { loading, run: sendMessage } = useRequest(
  async (text: string) => {
    // 1. 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    const replies = [
      '您好！我是 YH-UI 官方助手，现在为您演示流式输出效果。',
      '使用 \`YhAiChat\` 组件可以大幅简化 AI 会话界面的开发。',
      '您可以直接将 \`useRequest\` 得到的状态绑定到 AI 组件上。'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  },
  {
    manual: true,
    onSuccess: async (res: string) => {
      // 2. 找到由 send 函数预创建的最后一条助手消息
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
  // 插入用户消息
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  // 预插一条空的助手消息占位
  messages.value.push({ id: (Date.now() + 1).toString(), role: 'assistant', content: '' })
  sendMessage(text)
}
</${_S}>`

// --- 6. AI 会话集成 ---
const aiMessages = ref<AiChatMessage[]>([{ id: '1', role: 'assistant', content: '您好！我是集成示例 AI。' }])
const aiLoading = ref(false)

const handleAiSend = (text: string) => {
  if (aiLoading.value || !text) return
  
  aiMessages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  aiLoading.value = true
  
  // 1. 模拟服务器响应延迟
  setTimeout(async () => {
    const replies = [
      '您好！我是 YH-UI 官方助手，现在为您演示流式输出效果。',
      '使用 \`YhAiChat\` 组件可以大幅简化 AI 会话界面的开发。',
      '您可以直接将 \`useRequest\` 得到的状态绑定到 AI 组件上。'
    ]
    const fullText = replies[Math.floor(Math.random() * replies.length)]
    aiLoading.value = false

    // 2. 创建一个空的助手机制对象
    const aiId = (Date.now() + 1).toString()
    aiMessages.value.push({ id: aiId, role: 'assistant', content: '' })
    const aiMsg = aiMessages.value.find(m => m.id === aiId)
    
    // 3. 开始“打字”
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

# 与 UI 组件集成

`@yh-ui/request` 旨在无缝对接 UI 组件库。通过将 `loading`、`data`、`error` 等响应式状态直接绑定到 UI 元素，开发者可以以最小的代价实现复杂的交互。

## 基础集成示例

### 1. 数据列表 + Loading 状态

<DemoBlock title="列表加载示例" :ts-code="tsListDemo" :js-code="toJs(tsListDemo)">
  <div class="list-demo">
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
      <yh-button type="primary" :loading="listLoading" @click="() => handleRefresh()">刷新数据</yh-button>
      <span style="font-size:12px; color:var(--yh-text-color-secondary)" v-if="listLastUpdated">最后更新: {{ listLastUpdated }}</span>
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

### 2. 表单提交 + 禁用反馈

<DemoBlock title="表单提交示例" :ts-code="tsFormDemo" :js-code="toJs(tsFormDemo)">
  <div style="max-width:500px">
    <yh-form :model="loginForm" label-width="80px" @submit.prevent="() => handleLogin(loginForm)">
      <yh-form-item label="标题"><yh-input v-model="loginForm.title" /></yh-form-item>
      <yh-form-item label="内容"><yh-input v-model="loginForm.body" type="textarea" :rows="3" /></yh-form-item>
      <yh-form-item><yh-button type="primary" :loading="loginLoading" native-type="submit">提交并发布</yh-button></yh-form-item>
    </yh-form>
  </div>
</DemoBlock>

### 3. 分页列表 (集成模式)

<DemoBlock title="分页 Hooks 示例" :ts-code="tsPaginationDemo" :js-code="toJs(tsPaginationDemo)">
  <div>
    <yh-table :data="tableListData" :loading="tableLoading" row-key="id" border>
      <yh-table-column prop="id" label="ID" width="60" align="center" />
      <yh-table-column prop="name" label="姓名" />
      <yh-table-column prop="email" label="邮箱" />
    </yh-table>
    <div style="margin-top:20px; display:flex; justify-content:flex-end">
      <yh-pagination v-model:current-page="tableCurrent" :page-size="tablePageSize" :total="tableTotal" layout="prev, pager, next, total" />
    </div>
  </div>
</DemoBlock>

## 更多组件场景

### 5. 真机上传进度集成

演示如何使用 `useRequest` 对接真实的第三方文件存储服务。

<DemoBlock title="上传到 file.io" :ts-code="tsUploadDemo" :js-code="toJs(tsUploadDemo)">
<div>
<yh-button type="primary" :loading="isUploading" @click="() => uploadInputRef?.click()">选择并在线上传</yh-button>
<input ref="uploadInputRef" type="file" style="display:none" @change="handleFileSelect" />
<div v-if="isUploading || uploadPercent > 0" style="margin-top:20px">
<div style="margin-bottom:8px; font-size:14px">上传进度: {{ Math.floor(uploadPercent) }}%</div>
<yh-progress :percentage="uploadPercent" status="active" />
</div>
<div v-if="uploadResult" style="margin-top:20px">
<div style="padding:12px; background:#f6ffed; border:1px solid #b7eb8f; border-radius:8px; color:rgba(0,0,0,0.85)">
<span style="color:#52c41a; font-weight:bold; margin-right:8px">✓</span> 上传成功！
文件 <b>{{ uploadResult?.name }}</b> 已成功处理。
<br/><span style="font-size:12px; color:var(--yh-text-color-secondary)">接口回显：https://httpbin.org/post</span>
</div>
</div>
</div>
</DemoBlock>

### 6. AI 会话组件集成

<DemoBlock title="AI 会话演示" :ts-code="tsAiChatDemo" :js-code="toJs(tsAiChatDemo)">
  <yh-ai-chat 
    :messages="aiMessages" 
    :loading="aiLoading" 
    @send="handleAiSend" 
    style="height: 350px; border: 1px solid var(--yh-border-color); border-radius: 12px"
  />
</DemoBlock>
