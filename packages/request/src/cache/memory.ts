/**
 * 内存缓存实现
 * 默认缓存策略
 */

export interface CacheOptions {
  /** 缓存过期时间 (ms)，默认 5 分钟 */
  staleTime?: number
  /** 缓存最大存活时间 (ms)，默认 10 分钟 */
  cacheTime?: number
  /** 是否启用缓存 */
  enabled?: boolean
}

export interface CacheItem<T> {
  data: T
  expireTime: number
  createTime: number
  /** 缓存标签 */
  tags?: string[]
  /** ETag */
  etag?: string
  /** Last-Modified */
  lastModified?: string
}

/**
 * 内存缓存类
 */
export class MemoryCache {
  private cache = new Map<string, CacheItem<unknown>>()
  private cleanupTimer: ReturnType<typeof setInterval> | null = null

  /**
   * 获取缓存
   */
  get<T>(key: string, _staleTime?: number): T | undefined {
    const item = this.cache.get(key) as CacheItem<T> | undefined
    if (!item) return undefined

    // 检查是否过期
    const now = Date.now()
    if (item.expireTime && now > item.expireTime) {
      this.cache.delete(key)
      return undefined
    }

    return item.data
  }

  /**
   * 设置缓存
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const { staleTime = 5 * 60 * 1000, cacheTime = 10 * 60 * 1000 } = options
    const now = Date.now()

    this.cache.set(key, {
      data,
      expireTime: now + staleTime,
      createTime: now
    })

    // 安排过期删除
    setTimeout(() => {
      const item = this.cache.get(key)
      if (item && item.expireTime <= Date.now()) {
        this.cache.delete(key)
      }
    }, cacheTime)
  }

  /**
   * 删除缓存
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 检查缓存是否存在
   */
  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    if (item.expireTime && Date.now() > item.expireTime) {
      this.cache.delete(key)
      return false
    }
    return true
  }

  /**
   * 通过标签清除缓存
   */
  deleteByTags(_tags: string[]): void {
    // 内存缓存不存储标签，需要外部索引
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size
  }

  /**
   * 批量获取缓存 keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * 启动定时清理
   */
  startCleanup(interval: number = 60 * 1000): void {
    if (this.cleanupTimer) return

    this.cleanupTimer = setInterval(() => {
      const now = Date.now()
      for (const [key, item] of this.cache.entries()) {
        if (item.expireTime && now > item.expireTime) {
          this.cache.delete(key)
        }
      }
    }, interval)
  }

  /**
   * 停止定时清理
   */
  stopCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer)
      this.cleanupTimer = null
    }
  }
}

// 创建全局缓存实例
export const memoryCache = new MemoryCache()

// 启动默认清理
if (typeof window !== 'undefined') {
  memoryCache.startCleanup()
}
