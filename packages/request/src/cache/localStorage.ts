/**
 * LocalStorage 缓存实现
 * 适用于小量数据的持久化缓存
 */

import type { CacheItem } from './memory'

export interface LocalStorageCacheOptions {
  /** 缓存前缀 */
  prefix?: string
  /** 存储上限 (bytes) */
  maxSize?: number
}

/**
 * LocalStorage 缓存类
 */
export class LocalStorageCache {
  private prefix: string
  private maxSize: number

  constructor(options: LocalStorageCacheOptions = {}) {
    this.prefix = options.prefix || 'yh_request_cache_'
    this.maxSize = options.maxSize || 5 * 1024 * 1024 // 5MB
  }

  /**
   * 生成存储 key
   */
  private getStorageKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * 获取缓存
   */
  get<T>(key: string, _staleTime?: number): T | undefined {
    try {
      const storageKey = this.getStorageKey(key)
      const itemStr = localStorage.getItem(storageKey)

      if (!itemStr) return undefined

      const item: CacheItem<T> = JSON.parse(itemStr)

      // 检查是否过期
      if (item.expireTime && Date.now() > item.expireTime) {
        this.delete(key)
        return undefined
      }

      return item.data
    } catch {
      return undefined
    }
  }

  /**
   * 设置缓存
   */
  set<T>(key: string, data: T, options: { staleTime?: number; cacheTime?: number } = {}): void {
    try {
      const { staleTime = 5 * 60 * 1000 } = options
      const now = Date.now()

      const item: CacheItem<T> = {
        data,
        expireTime: now + staleTime,
        createTime: now
      }

      const storageKey = this.getStorageKey(key)
      const itemStr = JSON.stringify(item)

      // 检查存储空间
      if (this.calculateSize() + itemStr.length > this.maxSize) {
        this.cleanup()
      }

      localStorage.setItem(storageKey, itemStr)
    } catch (error) {
      console.warn('LocalStorage cache set failed:', error)
    }
  }

  /**
   * 删除缓存
   */
  delete(key: string): boolean {
    try {
      const storageKey = this.getStorageKey(key)
      localStorage.removeItem(storageKey)
      return true
    } catch {
      return false
    }
  }

  /**
   * 清空缓存
   */
  clear(): void {
    try {
      const keys = this.keys()
      keys.forEach((key) => {
        localStorage.removeItem(this.getStorageKey(key))
      })
    } catch {}
  }

  /**
   * 检查缓存是否存在
   */
  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  /**
   * 获取所有缓存 keys
   */
  keys(): string[] {
    const result: string[] = []
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(this.prefix)) {
          result.push(key.slice(this.prefix.length))
        }
      }
    } catch {}
    return result
  }

  /**
   * 计算当前存储使用量
   */
  private calculateSize(): number {
    let size = 0
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(this.prefix)) {
          const value = localStorage.getItem(key)
          if (value) {
            size += key.length + value.length
          }
        }
      }
    } catch {}
    return size
  }

  /**
   * 清理过期缓存
   */
  private cleanup(): void {
    const keys = this.keys()
    const now = Date.now()

    for (const key of keys) {
      try {
        const storageKey = this.getStorageKey(key)
        const itemStr = localStorage.getItem(storageKey)
        if (itemStr) {
          const item = JSON.parse(itemStr) as CacheItem<unknown>
          if (item.expireTime && now > item.expireTime) {
            localStorage.removeItem(storageKey)
          }
        }
      } catch {
        // 忽略错误
      }
    }

    // 如果还是超出，删除最早的
    if (this.calculateSize() > this.maxSize) {
      const sortedKeys = keys.sort((a, b) => {
        const itemA = this.get(a)
        const itemB = this.get(b)
        const timeA = itemA ? (itemA as unknown as CacheItem<unknown>).createTime || 0 : 0
        const timeB = itemB ? (itemB as unknown as CacheItem<unknown>).createTime || 0 : 0
        return timeA - timeB
      })

      const removeCount = Math.ceil(keys.length * 0.2)
      for (let i = 0; i < removeCount; i++) {
        this.delete(sortedKeys[i])
      }
    }
  }
}

// 创建全局实例
export const localStorageCache = new LocalStorageCache()
