# useAiConversations 会话历史管理 💾

管理侧边栏会话列表的专用 Hook，特性：

- 📁 **可插拔持久化**（localStorage / IndexedDB / 自定义适配器）
- 🗂️ **按时间自动分组**（今天 / 最近 7 天 / 最近 30 天 / 更早）
- 📌 **置顶操作**
- ♾️ **分页懒加载**
- 🌐 **SSR 友好**（`ready` Promise 等待初始化）

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ─── 演示用的内联数据与逻辑 ──────────────────────────────────────────────────

interface AiConversation {
  id: string
  title: string
  updatedAt: number
  excerpt?: string
  pinned?: boolean
}

// 初始会话数据（跨越不同时间段）
const now = Date.now()
const DAY = 86400000

const conversations = ref<AiConversation[]>([
  { id: '1', title: 'Vue 3 组件开发指南', updatedAt: now - 1000 * 60 * 5, excerpt: '如何封装高复用的组件...' },
  { id: '2', title: '如何优化 Web 性能', updatedAt: now - 1000 * 60 * 40, excerpt: 'Core Web Vitals 核心指标...' },
  { id: '3', title: 'TypeScript 高级技巧', updatedAt: now - DAY * 2, excerpt: '条件类型与映射类型...' },
  { id: '4', title: 'Pinia 最佳实践', updatedAt: now - DAY * 5, excerpt: '如何组织大型应用状态...' },
  { id: '5', title: 'Vite 插件开发入门', updatedAt: now - DAY * 15, excerpt: 'rollup 插件 API 简介...' },
  { id: '6', title: '微前端架构设计', updatedAt: now - DAY * 40, excerpt: 'qiankun vs Module Federation...' }
])

const activeId = ref('1')
let idCounter = 100

// 时间分组逻辑
function getGroupLabel(updatedAt: number): string {
  const diff = Date.now() - updatedAt
  if (diff < DAY) return '今天'
  if (diff < 7 * DAY) return '最近 7 天'
  if (diff < 30 * DAY) return '最近 30 天'
  return '更早'
}

const GROUP_ORDER = ['置顶', '今天', '最近 7 天', '最近 30 天', '更早']

const groupedConversations = computed(() => {
  const groups: Record<string, AiConversation[]> = {}
  const pinned: AiConversation[] = []

  for (const c of conversations.value) {
    if (c.pinned) { pinned.push(c); continue }
    const label = getGroupLabel(c.updatedAt)
    if (!groups[label]) groups[label] = []
    groups[label].push(c)
  }

  const result: { label: string; items: AiConversation[] }[] = []
  if (pinned.length > 0) result.push({ label: '置顶', items: pinned })
  for (const key of GROUP_ORDER.slice(1)) {
    if (groups[key]?.length) result.push({ label: key, items: groups[key] })
  }
  return result
})

function createConversation() {
  const titles = [
    'Nuxt 3 服务端渲染实践', 'CSS 动画性能优化', 'WebAssembly 入门',
    'GraphQL 最佳实践', 'Docker 容器化部署', 'AI 提示词工程技巧'
  ]
  const title = titles[idCounter % titles.length]
  conversations.value.unshift({
    id: String(++idCounter),
    title,
    updatedAt: Date.now(),
    excerpt: '点击查看详情...'
  })
  activeId.value = String(idCounter)
}

function removeConversation(id: string) {
  const idx = conversations.value.findIndex(c => c.id === id)
  if (idx !== -1) conversations.value.splice(idx, 1)
  if (activeId.value === id) activeId.value = conversations.value[0]?.id ?? ''
}

const editingId = ref('')
const editingTitle = ref('')

function startEdit(conv: AiConversation) {
  editingId.value = conv.id
  editingTitle.value = conv.title
}

function confirmEdit(id: string) {
  const conv = conversations.value.find(c => c.id === id)
  if (conv && editingTitle.value.trim()) {
    conv.title = editingTitle.value.trim()
    conv.updatedAt = Date.now()
  }
  editingId.value = ''
}

function togglePin(id: string) {
  const conv = conversations.value.find(c => c.id === id)
  if (conv) {
    conv.pinned = !conv.pinned
    // 重新排序：置顶在前
    conversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
  }
}

const activeConv = computed(() =>
  conversations.value.find(c => c.id === activeId.value)
)

// ─── IndexedDB 演示数据 ──────────────────────────────────────────────────────

const idbConversations = ref<AiConversation[]>([])
const idbPage = ref(1)
const idbIsLoading = ref(false)
const idbTotal = 50

function idbInit() {
  // 模拟生成 50 条历史数据
  idbConversations.value = Array.from({ length: idbPage.value * 10 }, (_, i) => ({
    id: `idb-${i + 1}`,
    title: `历史对话 #${String(i + 1).padStart(3, '0')}`,
    updatedAt: Date.now() - DAY * (i * 0.7),
    excerpt: '点击查看详情...'
  }))
}

onMounted(() => idbInit())

const idbHasMore = computed(() => idbConversations.value.length < idbTotal)

async function idbLoadMore() {
  if (idbIsLoading.value || !idbHasMore.value) return
  idbIsLoading.value = true
  await new Promise(r => setTimeout(r, 600))
  idbPage.value++
  idbInit()
  idbIsLoading.value = false
}

// ─── 代码字符串（DemoBlock 展示用）───────────────────────────────────────────

const tsBasic = `\<${_T}>
  <div style="display: flex; gap: 0; max-width: 700px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden; min-height: 320px;">
    <!-- 左侧：会话列表 -->
    <div style="width: 220px; border-right: 1px solid var(--yh-border-color); background: var(--yh-bg-color);">
      <!-- 工具栏 -->
      <div style="padding: 10px 12px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; font-weight: 600;">会话历史</span>
        <yh-button type="primary" size="small" @click="createConversation">+ 新建</yh-button>
      </div>
      <!-- 分组列表 -->
      <div style="overflow-y: auto; max-height: 280px;">
        <template v-for="group in groupedConversations" :key="group.label">
          <div style="padding: 4px 12px 2px; font-size: 11px; color: var(--yh-text-color-secondary); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
            {{ group.label }}
          </div>
          <div
            v-for="conv in group.items" :key="conv.id"
            @click="activeId = conv.id"
            style="padding: 8px 12px; cursor: pointer; border-radius: 0; transition: background 0.15s; position: relative;"
            :style="{ background: activeId === conv.id ? 'var(--yh-color-primary-light-9)' : 'transparent' }"
          >
            <div style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 40px;">
              <span v-if="conv.pinned" style="color: var(--yh-color-warning); margin-right: 4px;">📌</span>
              {{ conv.title }}
            </div>
            <!-- 操作按钮（悬停显示） -->
            <div style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: flex; gap: 2px;">
              <yh-button size="small" text @click.stop="togglePin(conv.id)" :title="conv.pinned ? '取消置顶' : '置顶'">
                {{ conv.pinned ? '☆' : '📌' }}
              </yh-button>
              <yh-button size="small" text type="danger" @click.stop="removeConversation(conv.id)" title="删除">🗑</yh-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 右侧：当前会话信息 -->
    <div style="flex: 1; padding: 20px; background: var(--yh-fill-color-blank);">
      <div v-if="activeConv">
        <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">{{ activeConv.title }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary); margin-bottom: 12px;">
          更新于：{{ new Date(activeConv.updatedAt).toLocaleString() }}
        </div>
        <div style="font-size: 13px; color: var(--yh-text-color-regular); line-height: 1.7;">
          {{ activeConv.excerpt || '暂无内容预览' }}
        </div>
        <div style="margin-top: 16px; font-size: 12px; color: var(--yh-text-color-disabled);">
          分组：{{ groupedConversations.map(g => g.label + '(' + g.items.length + ')').join(' · ') }}
        </div>
      </div>
      <div v-else style="color: var(--yh-text-color-secondary); font-size: 13px;">请选择一个会话</div>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useAiConversations } from '@yh-ui/hooks'

const activeId = ref('')
const DAY = 86400000
const now = Date.now()

const {
  conversations,
  groupedConversations,
  createConversation: _create,
  removeConversation,
  pinConversation: togglePin
} = useAiConversations({
  storage: 'localStorage',
  storageKey: 'demo-basic-convs',
  initialConversations: [
    { id: '1', title: 'Vue 3 组件开发指南', updatedAt: now - 1000 * 60 * 5, excerpt: '如何封装高复用的组件...' },
    { id: '2', title: '如何优化 Web 性能', updatedAt: now - 1000 * 60 * 40 },
    { id: '3', title: 'TypeScript 高级技巧', updatedAt: now - DAY * 2 },
    { id: '4', title: 'Pinia 最佳实践', updatedAt: now - DAY * 5 },
    { id: '5', title: '微前端架构设计', updatedAt: now - DAY * 40 }
  ]
})

let counter = 10
const titles = ['Nuxt 3 实践', 'CSS 动画优化', 'WebAssembly 入门', 'GraphQL 最佳实践']

function createConversation() {
  _create(titles[counter % titles.length]).then(c => { activeId.value = c.id })
  counter++
}

const activeConv = computed(() =>
  conversations.value.find(c => c.id === activeId.value)
)
\</${_S}>`

const tsIndexedDB = `\<${_T}>
  <div style="max-width: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px 16px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 14px; font-weight: 600;">📦 IndexedDB 会话列表</span>
      <span style="font-size: 12px; color: var(--yh-text-color-secondary);">已加载 {{ conversations.length }} / {{ total }} 条</span>
    </div>
    <div style="max-height: 300px; overflow-y: auto;">
      <div
        v-for="conv in conversations" :key="conv.id"
        style="padding: 10px 16px; border-bottom: 1px solid var(--yh-border-color-lighter); font-size: 13px;"
      >
        <div style="font-weight: 500;">{{ conv.title }}</div>
        <div style="font-size: 11px; color: var(--yh-text-color-secondary); margin-top: 2px;">
          {{ new Date(conv.updatedAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
    <div style="padding: 12px 16px; text-align: center;">
      <yh-button v-if="hasMore" @click="loadMore" :loading="isLoadingMore" type="primary" plain>
        加载更多（剩余 {{ total - conversations.length }} 条）
      </yh-button>
      <span v-else style="font-size: 12px; color: var(--yh-text-color-secondary);">✅ 已全部加载</span>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { useAiConversations, IndexedDBAdapter } from '@yh-ui/hooks'

const total = 50
const { conversations, hasMore, loadMore, isLoadingMore } = useAiConversations({
  storage: new IndexedDBAdapter('demo-idb-app'),
  pageSize: 10,
  initialConversations: Array.from({ length: total }, (_, i) => ({
    id: \`idb-\${i + 1}\`,
    title: \`历史对话 #\${String(i + 1).padStart(3, '0')}\`,
    updatedAt: Date.now() - 86400000 * (i * 0.7)
  }))
})
\</${_S}>`
</script>

## 基础用法（带分组 + 置顶 + CRUD）

实时演示会话列表的完整交互：按时间分组、新建、删除、置顶。

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="display: flex; gap: 0; max-width: 700px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden; min-height: 320px;">
    <!-- 左侧：会话列表 -->
    <div style="width: 220px; border-right: 1px solid var(--yh-border-color); background: var(--yh-bg-color);">
      <div style="padding: 10px 12px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; font-weight: 600;">会话历史</span>
        <yh-button type="primary" size="small" @click="createConversation">+ 新建</yh-button>
      </div>
      <div style="overflow-y: auto; max-height: 280px;">
        <template v-for="group in groupedConversations" :key="group.label">
          <div style="padding: 4px 12px 2px; font-size: 11px; color: var(--yh-text-color-secondary); font-weight: 600; letter-spacing: 0.5px;">
            {{ group.label }}
          </div>
          <div
            v-for="conv in group.items" :key="conv.id"
            @click="activeId = conv.id"
            style="padding: 8px 12px; cursor: pointer; transition: background 0.15s; position: relative;"
            :style="{ background: activeId === conv.id ? 'var(--yh-color-primary-light-9)' : 'transparent' }"
          >
            <div style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 44px;">
              <span v-if="conv.pinned" style="color: var(--yh-color-warning); margin-right: 3px; font-size: 11px;">📌</span>
              {{ conv.title }}
            </div>
            <div style="position: absolute; right: 4px; top: 50%; transform: translateY(-50%); display: flex; gap: 2px;">
              <yh-button size="small" text @click.stop="togglePin(conv.id)" :title="conv.pinned ? '取消置顶' : '置顶'">
                <span style="font-size: 12px;">{{ conv.pinned ? '☆' : '📌' }}</span>
              </yh-button>
              <yh-button size="small" text type="danger" @click.stop="removeConversation(conv.id)">
                <span style="font-size: 12px;">🗑</span>
              </yh-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 右侧：会话详情 -->
    <div style="flex: 1; padding: 20px; background: var(--yh-fill-color-blank);">
      <div v-if="activeConv">
        <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">{{ activeConv.title }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary); margin-bottom: 12px;">
          更新于：{{ new Date(activeConv.updatedAt).toLocaleString() }}
        </div>
        <div style="font-size: 13px; color: var(--yh-text-color-regular); line-height: 1.7;">
          {{ activeConv.excerpt || '暂无内容预览' }}
        </div>
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--yh-border-color-lighter); font-size: 12px; color: var(--yh-text-color-disabled);">
          分组情况：{{ groupedConversations.map(g => g.label + '(' + g.items.length + ')').join(' · ') }}
        </div>
      </div>
      <div v-else style="color: var(--yh-text-color-secondary); font-size: 13px; padding-top: 40px; text-align: center;">
        👈 选择左侧会话查看详情
      </div>
    </div>
  </div>
</DemoBlock>

## IndexedDB 模式（大量数据 + 分页懒加载）

使用 `IndexedDBAdapter` 适配器，支持超大量历史记录，分页懒加载按需获取。

<DemoBlock :ts-code="tsIndexedDB" :js-code="toJs(tsIndexedDB)">
  <div style="max-width: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px 16px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center; background: var(--yh-bg-color);">
      <span style="font-size: 14px; font-weight: 600;">📦 IndexedDB 会话列表</span>
      <span style="font-size: 12px; color: var(--yh-text-color-secondary);">已加载 {{ idbConversations.length }} / {{ idbTotal }} 条</span>
    </div>
    <div style="max-height: 280px; overflow-y: auto;">
      <div
        v-for="conv in idbConversations" :key="conv.id"
        style="padding: 10px 16px; border-bottom: 1px solid var(--yh-border-color-lighter); font-size: 13px;"
      >
        <div style="font-weight: 500; margin-bottom: 2px;">{{ conv.title }}</div>
        <div style="font-size: 11px; color: var(--yh-text-color-secondary);">
          {{ getGroupLabel(conv.updatedAt) }} · {{ new Date(conv.updatedAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
    <div style="padding: 12px 16px; text-align: center; background: var(--yh-fill-color-blank);">
      <yh-button v-if="idbHasMore" @click="idbLoadMore" :loading="idbIsLoading" type="primary" plain size="small">
        加载更多（剩余 {{ idbTotal - idbConversations.length }} 条）
      </yh-button>
      <span v-else style="font-size: 12px; color: var(--yh-color-success);">✅ 已全部加载（{{ idbTotal }} 条）</span>
    </div>
  </div>
</DemoBlock>

## 持久化适配器对比

| 模式                              | 场景              | 容量   | SSR 兼容         |
| --------------------------------- | ----------------- | ------ | ---------------- |
| `storage: false`                  | 纯内存，不持久化  | 无限制 | ✅               |
| `storage: 'localStorage'`（默认） | 少量历史          | ~5MB   | ✅（自动跳过）   |
| `storage: 'indexedDB'`            | 大量历史 + 富数据 | 无上限 | ✅（async init） |
| `storage: CustomAdapter`          | 自定义后端接口    | —      | ✅               |

## 自定义适配器（对接后端 API）

```ts
import { useAiConversations, type StorageAdapter } from '@yh-ui/hooks'

const apiAdapter: StorageAdapter = {
  getItem: async (key) => {
    const res = await fetch(`/api/user/conversations?key=${key}`)
    return res.ok ? res.text() : null
  },
  setItem: async (key, value) => {
    await fetch('/api/user/conversations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    })
  },
  removeItem: async (key) => {
    await fetch(`/api/user/conversations?key=${key}`, { method: 'DELETE' })
  }
}

const { conversations } = useAiConversations({ storage: apiAdapter })
```

## API

### Options

| 参数                   | 类型                                                       | 默认值                     | 说明                 |
| ---------------------- | ---------------------------------------------------------- | -------------------------- | -------------------- |
| `initialConversations` | `AiConversation[]`                                         | `[]`                       | 初始数据（SSR 直出） |
| `idGenerator`          | `() => string`                                             | 随机字符串                 | 自定义 ID 生成       |
| `storage`              | `false \| 'localStorage' \| 'indexedDB' \| StorageAdapter` | `'localStorage'`           | 持久化适配器         |
| `storageKey`           | `string`                                                   | `'yh-ui-ai-conversations'` | 存储 key             |
| `pageSize`             | `number`                                                   | `20`                       | 每页加载数           |

### 返回值

| 字段                   | 类型                                        | 说明                    |
| ---------------------- | ------------------------------------------- | ----------------------- |
| `conversations`        | `Ref<AiConversation[]>`                     | 完整会话列表            |
| `groupedConversations` | `Computed<ConversationGroup[]>`             | 按时间分组后的列表      |
| `pagedConversations`   | `Computed<AiConversation[]>`                | 当前分页数据            |
| `hasMore`              | `Computed<boolean>`                         | 是否还有更多            |
| `loadMore`             | `() => Promise<void>`                       | 加载下一页              |
| `isLoadingMore`        | `Ref<boolean>`                              | 加载中状态              |
| `ready`                | `Promise<void>`                             | 初始化完成（SSR await） |
| `createConversation`   | `(title, meta?) => Promise<AiConversation>` | 新建会话                |
| `removeConversation`   | `(id) => Promise<void>`                     | 删除会话                |
| `updateConversation`   | `(id, updates) => Promise<void>`            | 更新会话                |
| `pinConversation`      | `(id, pinned?) => Promise<void>`            | 置顶/取消               |
| `clear`                | `() => Promise<void>`                       | 清空所有                |
