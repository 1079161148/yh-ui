/**
 * YH-UI AI SDK - 缓存适配器
 *
 * 支持 memory / localStorage / sessionStorage，并可接入 Redis 等持久化后端。
 */

export interface CacheAdapter {
  get(key: string): Promise<unknown> | unknown
  set(key: string, value: unknown, ttlMs?: number): Promise<void> | void
  delete(key: string): Promise<void> | void
  has?(key: string): Promise<boolean> | boolean
}

interface MemoryEntry {
  data: unknown
  expiry: number
}

/**
 * 内存缓存（内置，与现有 cacheStorage 行为一致）
 */
export function createMemoryCache(): CacheAdapter {
  const store = new Map<string, MemoryEntry>()

  return {
    get(key: string): unknown | null {
      const entry = store.get(key)
      if (!entry) return null
      if (entry.expiry > 0 && entry.expiry < Date.now()) {
        store.delete(key)
        return null
      }
      return entry.data
    },
    set(key: string, value: unknown, ttlMs = 0) {
      store.set(key, {
        data: value,
        expiry: ttlMs > 0 ? Date.now() + ttlMs : 0
      })
    },
    delete(key: string) {
      store.delete(key)
    },
    has(key: string) {
      const v = this.get(key)
      return v !== null
    }
  }
}

/**
 * localStorage 适配器（TTL 需自行轮询或忽略）
 */
export function createLocalStorageCache(prefix = 'yh-ai-cache-'): CacheAdapter {
  return {
    get(key: string) {
      try {
        const raw = localStorage.getItem(prefix + key)
        if (!raw) return null
        const item = JSON.parse(raw) as { data: unknown; expiry?: number }
        if (item.expiry != null && item.expiry < Date.now()) {
          localStorage.removeItem(prefix + key)
          return null
        }
        return item.data
      } catch {
        return null
      }
    },
    set(key: string, value: unknown, ttlMs?: number) {
      try {
        const item = {
          data: value,
          expiry: ttlMs != null ? Date.now() + ttlMs : undefined
        }
        localStorage.setItem(prefix + key, JSON.stringify(item))
      } catch {
        // quota or disabled
      }
    },
    delete(key: string) {
      try {
        localStorage.removeItem(prefix + key)
      } catch {
        // ignore
      }
    }
  }
}

/**
 * sessionStorage 适配器
 */
export function createSessionStorageCache(prefix = 'yh-ai-cache-'): CacheAdapter {
  return {
    get(key: string) {
      try {
        const raw = sessionStorage.getItem(prefix + key)
        if (!raw) return null
        const item = JSON.parse(raw) as { data: unknown; expiry?: number }
        if (item.expiry != null && item.expiry < Date.now()) {
          sessionStorage.removeItem(prefix + key)
          return null
        }
        return item.data
      } catch {
        return null
      }
    },
    set(key: string, value: unknown, ttlMs?: number) {
      try {
        const item = {
          data: value,
          expiry: ttlMs != null ? Date.now() + ttlMs : undefined
        }
        sessionStorage.setItem(prefix + key, JSON.stringify(item))
      } catch {
        // ignore
      }
    },
    delete(key: string) {
      try {
        sessionStorage.removeItem(prefix + key)
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Redis 缓存适配器接口（由用户或可选包实现）
 * 安装 ioredis 后可实现：get/set(key, JSON.stringify(value), 'PX', ttlMs)/del
 */
export type RedisCacheConfig = {
  /** Redis URL 或 { host, port, password } */
  url?: string
  host?: string
  port?: number
  password?: string
  db?: number
  keyPrefix?: string
  defaultTtlMs?: number
}

/**
 * 创建 Redis 适配器的类型（实际实现需用户提供或通过可选依赖）
 * 用法：strategy: 'redis', adapter: createRedisCache({ url: 'redis://...' })
 */
export type RedisCacheAdapterFactory = (config: RedisCacheConfig) => CacheAdapter
