import { ref, computed } from 'vue'

// ─── 基础类型 ─────────────────────────────────────────────────────────────────

export interface AiConversation {
  id: string
  title: string
  /**
   * 最近更新时间（时间戳 ms）
   */
  updatedAt: number
  /**
   * 对话预览/最后一条消息内容
   */
  excerpt?: string
  /**
   * 是否置顶
   */
  pinned?: boolean
  /**
   * 自定义数据（例如知识库 ID 等业务数据）
   */
  meta?: Record<string, unknown>
}

// ─── 持久化适配器（可插拔）────────────────────────────────────────────────────

export interface AiStorageAdapter {
  getItem(key: string): string | null | Promise<string | null>
  setItem(key: string, value: string): void | Promise<void>
  removeItem(key: string): void | Promise<void>
}

/**
 * localStorage 适配器（默认）
 */
export const localStorageAdapter: AiStorageAdapter = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // ignore quota exceeded etc.
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}

/**
 * IndexedDB 适配器（适合大量数据持久化）
 */
export class AiIndexedDBAdapter implements AiStorageAdapter {
  private db: IDBDatabase | null = null
  private dbName: string
  private storeName = 'ai_conversations'
  private ready: Promise<void>

  constructor(dbName = 'yh-ui-ai') {
    this.dbName = dbName
    this.ready = this.init()
  }

  private init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        resolve()
        return
      }
      const req = indexedDB.open(this.dbName, 1)
      req.onupgradeneeded = () => {
        req.result.createObjectStore(this.storeName)
      }
      req.onsuccess = () => {
        this.db = req.result
        resolve()
      }
      req.onerror = () => reject(req.error)
    })
  }

  async getItem(key: string): Promise<string | null> {
    await this.ready
    if (!this.db) return null
    return new Promise((resolve) => {
      const tx = this.db!.transaction(this.storeName, 'readonly')
      const req = tx.objectStore(this.storeName).get(key)
      req.onsuccess = () => resolve(req.result ?? null)
      req.onerror = () => resolve(null)
    })
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.ready
    if (!this.db) return
    return new Promise((resolve) => {
      const tx = this.db!.transaction(this.storeName, 'readwrite')
      tx.objectStore(this.storeName).put(value, key)
      tx.oncomplete = () => resolve()
    })
  }

  async removeItem(key: string): Promise<void> {
    await this.ready
    if (!this.db) return
    return new Promise((resolve) => {
      const tx = this.db!.transaction(this.storeName, 'readwrite')
      tx.objectStore(this.storeName).delete(key)
      tx.oncomplete = () => resolve()
    })
  }
}

// ─── 时间分组 ─────────────────────────────────────────────────────────────────

export type ConversationGroup = {
  label: string
  items: AiConversation[]
}

function getGroupLabel(updatedAt: number): string {
  const now = Date.now()
  const diff = now - updatedAt
  const oneDay = 86400000

  if (diff < oneDay) return 'today'
  if (diff < 7 * oneDay) return 'last7Days'
  if (diff < 30 * oneDay) return 'last30Days'
  return 'earlier'
}

const GROUP_ORDER = ['today', 'last7Days', 'last30Days', 'earlier'] as const
type GroupKey = (typeof GROUP_ORDER)[number]

// ─── 远程同步适配器 ─────────────────────────────────────────────────────────

export interface RemoteSyncAdapter {
  /** 获取所有会话 */
  fetchConversations(): Promise<AiConversation[]>
  /** 创建会话 */
  createConversation(conversation: AiConversation): Promise<AiConversation>
  /** 更新会话 */
  updateConversation(id: string, updates: Partial<AiConversation>): Promise<AiConversation>
  /** 删除会话 */
  deleteConversation(id: string): Promise<void>
  /** 批量更新（用于同步） */
  batchUpdate(conversations: AiConversation[]): Promise<AiConversation[]>
}

// ─── Hook Options ─────────────────────────────────────────────────────────────

export interface UseAiConversationsOptions {
  /** 初始化数据（或从后端的直出） */
  initialConversations?: AiConversation[]
  /** 自定义生成 ID 的函数 */
  idGenerator?: () => string
  /**
   * 持久化存储适配器
   * - false: 不持久化（仅内存）
   * - 'localStorage': 使用 localStorage（默认）
   * - 'indexedDB': 使用 IndexedDB
   * - StorageAdapter: 自定义适配器
   */
  storage?: false | 'localStorage' | 'indexedDB' | AiStorageAdapter
  /** 持久化 key 前缀 */
  storageKey?: string
  /**
   * 每次加载的数量（用于分页 / 懒加载）
   * @default 20
   */
  pageSize?: number
  /**
   * 远程同步适配器（用于与后端同步）
   * 设置后会自动进行本地与远程的数据同步
   */
  remoteSync?: RemoteSyncAdapter
  /** 是否自动同步（仅在设置了 remoteSync 时有效） */
  autoSync?: boolean
  /** 同步间隔（毫秒），0 表示实时同步 */
  syncInterval?: number
}

// ─── Hook 主体 ────────────────────────────────────────────────────────────────

/**
 * useAiConversations - 会话历史管理 Hook
 *
 * 特性：
 * - 完整的 CRUD + 置顶操作
 * - 可插拔持久化（localStorage / IndexedDB / 自定义）
 * - 按时间自动分组（今天 / 最近 7 天 / 最近 30 天 / 更早）
 * - 分页懒加载
 */
export function useAiConversations(options: UseAiConversationsOptions = {}) {
  const {
    idGenerator = () => Math.random().toString(36).substring(2, 9),
    storage = 'localStorage',
    storageKey = 'yh-ui-ai-conversations',
    pageSize = 20,
    remoteSync,
    autoSync = false,
    syncInterval = 30000
  } = options

  // 确定持久化适配器
  let adapter: AiStorageAdapter | null = null
  if (storage === 'localStorage') {
    adapter = localStorageAdapter
  } else if (storage === 'indexedDB') {
    adapter = new AiIndexedDBAdapter()
  } else if (storage && typeof storage === 'object') {
    adapter = storage
  }

  const conversations = ref<AiConversation[]>([])
  const page = ref(1)
  const isLoadingMore = ref(false)

  // 初始化：从持久化加载 + 合并 initialConversations
  const initPromise = (async () => {
    let stored: AiConversation[] = []
    if (adapter) {
      try {
        const raw = await adapter.getItem(storageKey)
        if (raw) stored = JSON.parse(raw)
      } catch {
        stored = []
      }
    }
    // 合并：以 props.initialConversations 为优先（适合 SSR 直出）
    const init = options.initialConversations ?? []
    const merged = [...init]
    for (const s of stored) {
      if (!merged.find((c) => c.id === s.id)) {
        merged.push(s)
      }
    }
    conversations.value = merged.sort((a, b) => {
      // 置顶在前，然后按时间倒序
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
  })()

  // 持久化存储
  const persist = async () => {
    if (!adapter) return
    try {
      await adapter.setItem(storageKey, JSON.stringify(conversations.value))
    } catch {
      // ignore
    }
  }

  // ── 按时间分组（计算属性）──────────────────────────────────────────────────
  const groupedConversations = computed<ConversationGroup[]>(() => {
    const groups: Record<GroupKey, AiConversation[]> = {
      today: [],
      last7Days: [],
      last30Days: [],
      earlier: []
    }

    for (const c of conversations.value) {
      if (c.pinned) continue // 置顶不参与分组
      const key = getGroupLabel(c.updatedAt) as GroupKey
      groups[key].push(c)
    }

    const result: ConversationGroup[] = []

    // 置顶区
    const pinned = conversations.value.filter((c) => c.pinned)
    if (pinned.length > 0) {
      result.push({ label: 'pinned', items: pinned })
    }

    for (const key of GROUP_ORDER) {
      if (groups[key].length > 0) {
        result.push({ label: key, items: groups[key] })
      }
    }

    return result
  })

  // ── 分页数据 ───────────────────────────────────────────────────────────────
  const pagedConversations = computed(() => {
    return conversations.value.slice(0, page.value * pageSize)
  })

  const hasMore = computed(() => {
    return pagedConversations.value.length < conversations.value.length
  })

  const loadMore = async () => {
    if (!hasMore.value || isLoadingMore.value) return
    isLoadingMore.value = true
    // 模拟异步；实际项目可在此 fetch 远程下一页
    await new Promise((r) => setTimeout(r, 300))
    page.value++
    isLoadingMore.value = false
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const createConversation = async (
    title: string,
    meta?: Record<string, unknown>
  ): Promise<AiConversation> => {
    const newConv: AiConversation = {
      id: idGenerator(),
      title,
      updatedAt: Date.now(),
      meta
    }
    conversations.value.unshift(newConv)
    await persist()
    return newConv
  }

  const removeConversation = async (id: string): Promise<void> => {
    const idx = conversations.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      conversations.value.splice(idx, 1)
      await persist()
    }
  }

  const updateConversation = async (
    id: string,
    updates: Partial<Omit<AiConversation, 'id'>>
  ): Promise<void> => {
    const idx = conversations.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      conversations.value[idx] = {
        ...conversations.value[idx],
        ...updates,
        updatedAt: Date.now()
      }
      await persist()
    }
  }

  const pinConversation = async (id: string, pinned = true): Promise<void> => {
    await updateConversation(id, { pinned })
    // 重新排序（置顶在前）
    conversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
    await persist()
  }

  const clear = async (): Promise<void> => {
    conversations.value = []
    if (adapter) {
      await adapter.removeItem(storageKey)
    }
  }

  // ── 远程同步 ─────────────────────────────────────────────────────────────
  const isSyncing = ref(false)
  const lastSyncTime = ref<number>(0)
  const syncError = ref<Error | null>(null)

  // 同步到远程
  const syncToRemote = async (): Promise<void> => {
    if (!remoteSync || isSyncing.value) return

    isSyncing.value = true
    syncError.value = null

    try {
      await remoteSync.batchUpdate(conversations.value)
      lastSyncTime.value = Date.now()
    } catch (err) {
      syncError.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      isSyncing.value = false
    }
  }

  // 从远程拉取
  const fetchFromRemote = async (): Promise<void> => {
    if (!remoteSync || isSyncing.value) return

    isSyncing.value = true
    syncError.value = null

    try {
      const remoteConversations = await remoteSync.fetchConversations()
      // 合并：以本地数据为准，但添加远程新增的
      for (const rc of remoteConversations) {
        if (!conversations.value.find((c) => c.id === rc.id)) {
          conversations.value.push(rc)
        }
      }
      // 排序
      conversations.value.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return b.updatedAt - a.updatedAt
      })
      lastSyncTime.value = Date.now()
      await persist()
    } catch (err) {
      syncError.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      isSyncing.value = false
    }
  }

  // 定时同步
  let syncTimer: ReturnType<typeof setInterval> | null = null

  const startSync = (): void => {
    if (!remoteSync || syncTimer) return
    if (syncInterval > 0) {
      syncTimer = setInterval(syncToRemote, syncInterval)
    }
  }

  const stopSync = (): void => {
    if (syncTimer) {
      clearInterval(syncTimer)
      syncTimer = null
    }
  }

  // 自动同步
  if (remoteSync && autoSync) {
    startSync()
  }

  return {
    /** 完整会话列表 */
    conversations,
    /** 按时间分组后的列表（置顶 / 今天 / 最近 7 天 / 更早） */
    groupedConversations,
    /** 分页后的列表 */
    pagedConversations,
    /** 是否还有更多数据 */
    hasMore,
    /** 加载更多 */
    loadMore,
    /** 加载更多状态 */
    isLoadingMore,
    /** 等待初始化完成（SSR 场景使用） */
    ready: initPromise,
    /** 新建会话 */
    createConversation,
    /** 删除会话 */
    removeConversation,
    /** 更新会话属性 */
    updateConversation,
    /** 置顶/取消置顶 */
    pinConversation,
    /** 清空全部 */
    clear,
    /** 远程同步状态 */
    isSyncing,
    lastSyncTime,
    syncError,
    /** 远程同步方法 */
    syncToRemote,
    fetchFromRemote,
    startSync,
    stopSync
  }
}
