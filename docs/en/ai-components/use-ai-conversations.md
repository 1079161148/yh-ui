# useAiConversations Session History Management 💾

Dedicated Hook for managing the session list in the sidebar, featuring:

- 📁 **Pluggable Persistence** (localStorage / IndexedDB / Custom Adapter)
- 🗂️ **Automatic Time Grouping** (Today / Last 7 Days / Last 30 Days / Earlier)
- 📌 **Pinning Operations**
- ♾️ **Pagination & Lazy Loading**
- 🌐 **SSR Friendly** (`ready` Promise for initialization)

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ─── Inline Data & Logic for Demo ──────────────────────────────────────────

interface AiConversation {
  id: string
  title: string
  updatedAt: number
  excerpt?: string
  pinned?: boolean
}

// Initial session data (across different time periods)
const now = Date.now()
const DAY = 86400000

const conversations = ref<AiConversation[]>([
  { id: '1', title: 'Vue 3 Component Development Guide', updatedAt: now - 1000 * 60 * 5, excerpt: 'How to encapsulate highly reusable components...' },
  { id: '2', title: 'Optimizing Web Performance', updatedAt: now - 1000 * 60 * 40, excerpt: 'Core Web Vitals key metrics...' },
  { id: '3', title: 'Advanced TypeScript Tips', updatedAt: now - DAY * 2, excerpt: 'Conditional types and mapped types...' },
  { id: '4', title: 'Pinia Best Practices', updatedAt: now - DAY * 5, excerpt: 'Organizing large-scale application state...' },
  { id: '5', title: 'Introl to Vite Plugin Development', updatedAt: now - DAY * 15, excerpt: 'Rollup plugin API overview...' },
  { id: '6', title: 'Micro Frontends Architecture Design', updatedAt: now - DAY * 40, excerpt: 'qiankun vs Module Federation...' }
])

const activeId = ref('1')
let idCounter = 100

// Time grouping logic
function getGroupLabel(updatedAt: number): string {
  const diff = Date.now() - updatedAt
  if (diff < DAY) return 'Today'
  if (diff < 7 * DAY) return 'Last 7 Days'
  if (diff < 30 * DAY) return 'Last 30 Days'
  return 'Earlier'
}

const GROUP_ORDER = ['Pinned', 'Today', 'Last 7 Days', 'Last 30 Days', 'Earlier']

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
  if (pinned.length > 0) result.push({ label: 'Pinned', items: pinned })
  for (const key of GROUP_ORDER.slice(1)) {
    if (groups[key]?.length) result.push({ label: key, items: groups[key] })
  }
  return result
})

function createConversation() {
  const titles = [
    'Nuxt 3 SSR Practice', 'CSS Animation Performance', 'WebAssembly Intro',
    'GraphQL Best Practices', 'Docker Container Deployment', 'AI Prompt Engineering Tips'
  ]
  const title = titles[idCounter % titles.length]
  conversations.value.unshift({
    id: String(++idCounter),
    title,
    updatedAt: Date.now(),
    excerpt: 'Click to view details...'
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
    // Reorder: Pinned on top
    conversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
  }
}

const activeConv = computed(() =>
  conversations.value.find(c => c.id === activeId.value)
)

// ─── IndexedDB Demo Data ───────────────────────────────────────────────────

const idbConversations = ref<AiConversation[]>([])
const idbPage = ref(1)
const idbIsLoading = ref(false)
const idbTotal = 50

function idbInit() {
  // Simulate 50 history records
  idbConversations.value = Array.from({ length: idbPage.value * 10 }, (_, i) => ({
    id: `idb-${i + 1}`,
    title: `History Chat #${String(i + 1).padStart(3, '0')}`,
    updatedAt: Date.now() - DAY * (i * 0.7),
    excerpt: 'Click to view details...'
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

// ─── Code Strings (for DemoBlock) ──────────────────────────────────────────

const tsBasic = `\<${_T}>
  <div style="display: flex; gap: 0; max-width: 700px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden; min-height: 320px;">
    <!-- Left: History List -->
    <div style="width: 220px; border-right: 1px solid var(--yh-border-color); background: var(--yh-bg-color);">
      <!-- Toolbar -->
      <div style="padding: 10px 12px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; font-weight: 600;">History</span>
        <yh-button type="primary" size="small" @click="createConversation">+ New</yh-button>
      </div>
      <!-- Grouped List -->
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
            <!-- Actions (hover show) -->
            <div style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: flex; gap: 2px;">
              <yh-button size="small" text @click.stop="togglePin(conv.id)" :title="conv.pinned ? 'Unpin' : 'Pin'">
                {{ conv.pinned ? '☆' : '📌' }}
              </yh-button>
              <yh-button size="small" text type="danger" @click.stop="removeConversation(conv.id)" title="Delete">🗑</yh-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- Right: Current Chat Info -->
    <div style="flex: 1; padding: 20px; background: var(--yh-fill-color-blank);">
      <div v-if="activeConv">
        <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">{{ activeConv.title }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary); margin-bottom: 12px;">
          Updated: {{ new Date(activeConv.updatedAt).toLocaleString() }}
        </div>
        <div style="font-size: 13px; color: var(--yh-text-color-regular); line-height: 1.7;">
          {{ activeConv.excerpt || 'No content preview' }}
        </div>
        <div style="margin-top: 16px; font-size: 12px; color: var(--yh-text-color-disabled);">
          Groups: {{ groupedConversations.map(g => g.label + '(' + g.items.length + ')').join(' · ') }}
        </div>
      </div>
      <div v-else style="color: var(--yh-text-color-secondary); font-size: 13px;">Please select a conversation</div>
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
  storageKey: 'demo-basic-convs-en',
  initialConversations: [
    { id: '1', title: 'Vue 3 Component Development Guide', updatedAt: now - 1000 * 60 * 5, excerpt: 'How to encapsulate highly reusable components...' },
    { id: '2', title: 'Optimizing Web Performance', updatedAt: now - 1000 * 60 * 40 },
    { id: '3', title: 'Advanced TypeScript Tips', updatedAt: now - DAY * 2 },
    { id: '4', title: 'Pinia Best Practices', updatedAt: now - DAY * 5 },
    { id: '5', title: 'Micro Frontends Architecture Design', updatedAt: now - DAY * 40 }
  ]
})

let counter = 10
const titles = ['Nuxt 3 Practice', 'CSS Animation Optimization', 'WebAssembly Intro', 'GraphQL Best Practices']

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
      <span style="font-size: 14px; font-weight: 600;">📦 IndexedDB History</span>
      <span style="font-size: 12px; color: var(--yh-text-color-secondary);">Loaded {{ conversations.length }} / {{ total }}</span>
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
        Load More ({{ total - conversations.length }} remaining)
      </yh-button>
      <span v-else style="font-size: 12px; color: var(--yh-text-color-secondary);">✅ All loaded</span>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { useAiConversations, IndexedDBAdapter } from '@yh-ui/hooks'

const total = 50
const { conversations, hasMore, loadMore, isLoadingMore } = useAiConversations({
  storage: new IndexedDBAdapter('demo-idb-app-en'),
  pageSize: 10,
  initialConversations: Array.from({ length: total }, (_, i) => ({
    id: \`idb-\${i + 1}\`,
    title: \`History Chat #\${String(i + 1).padStart(3, '0')}\`,
    updatedAt: Date.now() - 86400000 * (i * 0.7)
  }))
})
\</${_S}>`
</script>

## Basic Usage (Grouping + Pinning + CRUD)

Live demo of complete history interaction: time grouping, creating, deleting, pinning.

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="display: flex; gap: 0; max-width: 700px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden; min-height: 320px;">
    <!-- Left: History List -->
    <div style="width: 220px; border-right: 1px solid var(--yh-border-color); background: var(--yh-bg-color);">
      <div style="padding: 10px 12px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; font-weight: 600;">History</span>
        <yh-button type="primary" size="small" @click="createConversation">+ New</yh-button>
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
              <yh-button size="small" text @click.stop="togglePin(conv.id)" :title="conv.pinned ? 'Unpin' : 'Pin'">
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
    <!-- Right: Chat Details -->
    <div style="flex: 1; padding: 20px; background: var(--yh-fill-color-blank);">
      <div v-if="activeConv">
        <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">{{ activeConv.title }}</div>
        <div style="font-size: 12px; color: var(--yh-text-color-secondary); margin-bottom: 12px;">
          Updated: {{ new Date(activeConv.updatedAt).toLocaleString() }}
        </div>
        <div style="font-size: 13px; color: var(--yh-text-color-regular); line-height: 1.7;">
          {{ activeConv.excerpt || 'No content preview' }}
        </div>
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--yh-border-color-lighter); font-size: 12px; color: var(--yh-text-color-disabled);">
          Grouping: {{ groupedConversations.map(g => g.label + '(' + g.items.length + ')').join(' · ') }}
        </div>
      </div>
      <div v-else style="color: var(--yh-text-color-secondary); font-size: 13px; padding-top: 40px; text-align: center;">
        👈 Select a conversation on the left to view details
      </div>
    </div>
  </div>
</DemoBlock>

## IndexedDB Mode (High Volume + Pagination)

Uses `IndexedDBAdapter` to handle extremely large records with on-demand lazy loading.

<DemoBlock :ts-code="tsIndexedDB" :js-code="toJs(tsIndexedDB)">
  <div style="max-width: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px 16px; border-bottom: 1px solid var(--yh-border-color-light); display: flex; justify-content: space-between; align-items: center; background: var(--yh-bg-color);">
      <span style="font-size: 14px; font-weight: 600;">📦 IndexedDB History</span>
      <span style="font-size: 12px; color: var(--yh-text-color-secondary);">Loaded {{ idbConversations.length }} / {{ idbTotal }}</span>
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
        Load More ({{ idbTotal - idbConversations.length }} remaining)
      </yh-button>
      <span v-else style="font-size: 12px; color: var(--yh-color-success);">✅ All loaded ({{ idbTotal }} records)</span>
    </div>
  </div>
</DemoBlock>

## Adapter Comparison

| Mode                                | Use Case                  | Capacity  | SSR Compat      |
| ----------------------------------- | ------------------------- | --------- | --------------- |
| `storage: false`                    | In-memory, no persistence | Unlimited | ✅              |
| `storage: 'localStorage'` (default) | Small history             | ~5MB      | ✅ (Auto skip)  |
| `storage: 'indexedDB'`              | High volume + rich data   | No limit  | ✅ (Async init) |
| `storage: CustomAdapter`            | Backend API               | —         | ✅              |

## Custom Adapter (Backend API)

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

| Param                  | Type                                                       | Default                    | Description                |
| ---------------------- | ---------------------------------------------------------- | -------------------------- | -------------------------- |
| `initialConversations` | `AiConversation[]`                                         | `[]`                       | Initial data (for SSR)     |
| `idGenerator`          | `() => string`                                             | Random string              | Custom ID generation       |
| `storage`              | `false \| 'localStorage' \| 'indexedDB' \| StorageAdapter` | `'localStorage'`           | Persistence adapter        |
| `storageKey`           | `string`                                                   | `'yh-ui-ai-conversations'` | Storage key                |
| `pageSize`             | `number`                                                   | `20`                       | Page size for lazy loading |

### Returns

| Field                  | Type                                        | Description                         |
| ---------------------- | ------------------------------------------- | ----------------------------------- |
| `conversations`        | `Ref<AiConversation[]>`                     | Full history list                   |
| `groupedConversations` | `Computed<ConversationGroup[]>`             | Grouped list by time                |
| `pagedConversations`   | `Computed<AiConversation[]>`                | Current page data                   |
| `hasMore`              | `Computed<boolean>`                         | If more data exists                 |
| `loadMore`             | `() => Promise<void>`                       | Load next page                      |
| `isLoadingMore`        | `Ref<boolean>`                              | Loading state                       |
| `ready`                | `Promise<void>`                             | Initialization finished (SSR await) |
| `createConversation`   | `(title, meta?) => Promise<AiConversation>` | Create history                      |
| `removeConversation`   | `(id) => Promise<void>`                     | Delete history                      |
| `updateConversation`   | `(id, updates) => Promise<void>`            | Update history                      |
| `pinConversation`      | `(id, pinned?) => Promise<void>`            | Toggle pinning                      |
| `clear`                | `() => Promise<void>`                       | Clear all                           |
