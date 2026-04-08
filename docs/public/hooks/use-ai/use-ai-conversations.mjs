import { ref, computed } from "vue";
export const localStorageAdapter = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
    }
  }
};
export class AiIndexedDBAdapter {
  db = null;
  dbName;
  storeName = "ai_conversations";
  ready;
  constructor(dbName = "yh-ui-ai") {
    this.dbName = dbName;
    this.ready = this.init();
  }
  init() {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        resolve();
        return;
      }
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(this.storeName);
      };
      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }
  async getItem(key) {
    await this.ready;
    if (!this.db) return null;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, "readonly");
      const req = tx.objectStore(this.storeName).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  }
  async setItem(key, value) {
    await this.ready;
    if (!this.db) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      tx.objectStore(this.storeName).put(value, key);
      tx.oncomplete = () => resolve();
    });
  }
  async removeItem(key) {
    await this.ready;
    if (!this.db) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      tx.objectStore(this.storeName).delete(key);
      tx.oncomplete = () => resolve();
    });
  }
}
function getGroupLabel(updatedAt) {
  const now = Date.now();
  const diff = now - updatedAt;
  const oneDay = 864e5;
  if (diff < oneDay) return "today";
  if (diff < 7 * oneDay) return "last7Days";
  if (diff < 30 * oneDay) return "last30Days";
  return "earlier";
}
const GROUP_ORDER = ["today", "last7Days", "last30Days", "earlier"];
export function useAiConversations(options = {}) {
  const {
    idGenerator = () => Math.random().toString(36).substring(2, 9),
    storage = "localStorage",
    storageKey = "yh-ui-ai-conversations",
    pageSize = 20,
    remoteSync,
    autoSync = false,
    syncInterval = 3e4
  } = options;
  let adapter = null;
  if (storage === "localStorage") {
    adapter = localStorageAdapter;
  } else if (storage === "indexedDB") {
    adapter = new AiIndexedDBAdapter();
  } else if (storage && typeof storage === "object") {
    adapter = storage;
  }
  const conversations = ref([]);
  const page = ref(1);
  const isLoadingMore = ref(false);
  const initPromise = (async () => {
    let stored = [];
    if (adapter) {
      try {
        const raw = await adapter.getItem(storageKey);
        if (raw) stored = JSON.parse(raw);
      } catch {
        stored = [];
      }
    }
    const init = options.initialConversations ?? [];
    const merged = [...init];
    for (const s of stored) {
      if (!merged.find((c) => c.id === s.id)) {
        merged.push(s);
      }
    }
    conversations.value = merged.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
  })();
  const persist = async () => {
    if (!adapter) return;
    try {
      await adapter.setItem(storageKey, JSON.stringify(conversations.value));
    } catch {
    }
  };
  const groupedConversations = computed(() => {
    const groups = {
      today: [],
      last7Days: [],
      last30Days: [],
      earlier: []
    };
    for (const c of conversations.value) {
      if (c.pinned) continue;
      const key = getGroupLabel(c.updatedAt);
      groups[key].push(c);
    }
    const result = [];
    const pinned = conversations.value.filter((c) => c.pinned);
    if (pinned.length > 0) {
      result.push({ label: "pinned", items: pinned });
    }
    for (const key of GROUP_ORDER) {
      if (groups[key].length > 0) {
        result.push({ label: key, items: groups[key] });
      }
    }
    return result;
  });
  const pagedConversations = computed(() => {
    return conversations.value.slice(0, page.value * pageSize);
  });
  const hasMore = computed(() => {
    return pagedConversations.value.length < conversations.value.length;
  });
  const loadMore = async () => {
    if (!hasMore.value || isLoadingMore.value) return;
    isLoadingMore.value = true;
    await new Promise((r) => setTimeout(r, 300));
    page.value++;
    isLoadingMore.value = false;
  };
  const createConversation = async (title, meta) => {
    const newConv = {
      id: idGenerator(),
      title,
      updatedAt: Date.now(),
      meta
    };
    conversations.value.unshift(newConv);
    await persist();
    return newConv;
  };
  const removeConversation = async (id) => {
    const idx = conversations.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      conversations.value.splice(idx, 1);
      await persist();
    }
  };
  const updateConversation = async (id, updates) => {
    const idx = conversations.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      conversations.value[idx] = {
        ...conversations.value[idx],
        ...updates,
        updatedAt: Date.now()
      };
      await persist();
    }
  };
  const pinConversation = async (id, pinned = true) => {
    await updateConversation(id, { pinned });
    conversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
    await persist();
  };
  const clear = async () => {
    conversations.value = [];
    if (adapter) {
      await adapter.removeItem(storageKey);
    }
  };
  const isSyncing = ref(false);
  const lastSyncTime = ref(0);
  const syncError = ref(null);
  const syncToRemote = async () => {
    if (!remoteSync || isSyncing.value) return;
    isSyncing.value = true;
    syncError.value = null;
    try {
      await remoteSync.batchUpdate(conversations.value);
      lastSyncTime.value = Date.now();
    } catch (err) {
      syncError.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isSyncing.value = false;
    }
  };
  const fetchFromRemote = async () => {
    if (!remoteSync || isSyncing.value) return;
    isSyncing.value = true;
    syncError.value = null;
    try {
      const remoteConversations = await remoteSync.fetchConversations();
      for (const rc of remoteConversations) {
        if (!conversations.value.find((c) => c.id === rc.id)) {
          conversations.value.push(rc);
        }
      }
      conversations.value.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
      lastSyncTime.value = Date.now();
      await persist();
    } catch (err) {
      syncError.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isSyncing.value = false;
    }
  };
  let syncTimer = null;
  const startSync = () => {
    if (!remoteSync || syncTimer) return;
    if (syncInterval > 0) {
      syncTimer = setInterval(syncToRemote, syncInterval);
    }
  };
  const stopSync = () => {
    if (syncTimer) {
      clearInterval(syncTimer);
      syncTimer = null;
    }
  };
  if (remoteSync && autoSync) {
    startSync();
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
  };
}
