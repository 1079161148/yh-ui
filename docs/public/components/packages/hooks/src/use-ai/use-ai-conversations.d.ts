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
export interface AiStorageAdapter {
  getItem(key: string): string | null | Promise<string | null>
  setItem(key: string, value: string): void | Promise<void>
  removeItem(key: string): void | Promise<void>
}
/**
 * localStorage 适配器（默认）
 */
export declare const localStorageAdapter: AiStorageAdapter
/**
 * IndexedDB 适配器（适合大量数据持久化）
 */
export declare class AiIndexedDBAdapter implements AiStorageAdapter {
  private db
  private dbName
  private storeName
  private ready
  constructor(dbName?: string)
  private init
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}
export type ConversationGroup = {
  label: string
  items: AiConversation[]
}
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
/**
 * useAiConversations - 会话历史管理 Hook
 *
 * 特性：
 * - 完整的 CRUD + 置顶操作
 * - 可插拔持久化（localStorage / IndexedDB / 自定义）
 * - 按时间自动分组（今天 / 最近 7 天 / 最近 30 天 / 更早）
 * - 分页懒加载
 */
export declare function useAiConversations(options?: UseAiConversationsOptions): {
  /** 完整会话列表 */
  conversations: import('vue').Ref<
    {
      id: string
      title: string
      updatedAt: number
      excerpt?:
        | string
        /**
         * 是否置顶
         */
        | undefined
      pinned?:
        | boolean
        /**
         * 自定义数据（例如知识库 ID 等业务数据）
         */
        | undefined
      meta?: Record<string, unknown> | undefined
    }[],
    | AiConversation[]
    | {
        id: string
        title: string
        updatedAt: number
        excerpt?:
          | string
          /**
           * 是否置顶
           */
          | undefined
        pinned?:
          | boolean
          /**
           * 自定义数据（例如知识库 ID 等业务数据）
           */
          | undefined
        meta?: Record<string, unknown> | undefined
      }[]
  >
  /** 按时间分组后的列表（置顶 / 今天 / 最近 7 天 / 更早） */
  groupedConversations: import('vue').ComputedRef<ConversationGroup[]>
  /** 分页后的列表 */
  pagedConversations: import('vue').ComputedRef<
    {
      id: string
      title: string
      updatedAt: number
      excerpt?:
        | string
        /**
         * 是否置顶
         */
        | undefined
      pinned?:
        | boolean
        /**
         * 自定义数据（例如知识库 ID 等业务数据）
         */
        | undefined
      meta?: Record<string, unknown> | undefined
    }[]
  >
  /** 是否还有更多数据 */
  hasMore: import('vue').ComputedRef<boolean>
  /** 加载更多 */
  loadMore: () => Promise<void>
  /** 加载更多状态 */
  isLoadingMore: import('vue').Ref<boolean, boolean>
  /** 等待初始化完成（SSR 场景使用） */
  ready: Promise<void>
  /** 新建会话 */
  createConversation: (title: string, meta?: Record<string, unknown>) => Promise<AiConversation>
  /** 删除会话 */
  removeConversation: (id: string) => Promise<void>
  /** 更新会话属性 */
  updateConversation: (id: string, updates: Partial<Omit<AiConversation, 'id'>>) => Promise<void>
  /** 置顶/取消置顶 */
  pinConversation: (id: string, pinned?: boolean) => Promise<void>
  /** 清空全部 */
  clear: () => Promise<void>
  /** 远程同步状态 */
  isSyncing: import('vue').Ref<boolean, boolean>
  lastSyncTime: import('vue').Ref<number, number>
  syncError: import('vue').Ref<Error | null, Error | null>
  /** 远程同步方法 */
  syncToRemote: () => Promise<void>
  fetchFromRemote: () => Promise<void>
  startSync: () => void
  stopSync: () => void
}
