/**
 * IndexedDB 缓存实现
 * 适用于大量数据的持久化缓存
 */

import type { CacheItem } from './memory'

export interface IndexedDBCacheOptions {
  /** 数据库名称 */
  dbName?: string
  /** 存储名称 */
  storeName?: string
  /** 数据库版本 */
  dbVersion?: number
}

/**
 * IndexedDB 缓存类
 */
export class IndexedDBCache {
  private dbName: string
  private storeName: string
  private dbVersion: number
  private db: IDBDatabase | null = null

  constructor(options: IndexedDBCacheOptions = {}) {
    this.dbName = options.dbName || 'yh_request_cache'
    this.storeName = options.storeName || 'cache'
    this.dbVersion = options.dbVersion || 1
  }

  /**
   * 打开数据库
   */
  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => {
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' })
        }
      }
    })
  }

  /**
   * 获取缓存
   */
  async get<T>(key: string, _staleTime?: number): Promise<T | undefined> {
    try {
      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          if (!request.result) {
            resolve(undefined)
            return
          }

          const item = request.result as CacheItem<T>

          // 检查是否过期
          if (item.expireTime && Date.now() > item.expireTime) {
            this.delete(key)
            resolve(undefined)
            return
          }

          resolve(item.data)
        }

        request.onerror = () => {
          reject(request.error)
        }
      })
    } catch {
      return undefined
    }
  }

  /**
   * 设置缓存
   */
  async set<T>(
    key: string,
    data: T,
    options: { staleTime?: number; cacheTime?: number } = {}
  ): Promise<void> {
    try {
      const { staleTime = 5 * 60 * 1000 } = options
      const now = Date.now()

      const item: CacheItem<T> = {
        data,
        expireTime: now + staleTime,
        createTime: now
      }

      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.put({ key, ...item })

      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })
    } catch (error) {
      console.warn('IndexedDB cache set failed:', error)
    }
  }

  /**
   * 删除缓存
   */
  async delete(key: string): Promise<boolean> {
    try {
      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.delete(key)

      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })

      return true
    } catch {
      return false
    }
  }

  /**
   * 清空缓存
   */
  async clear(): Promise<void> {
    try {
      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.clear()

      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })
    } catch {}
  }

  /**
   * 检查缓存是否存在
   */
  async has(key: string): Promise<boolean> {
    const data = await this.get(key)
    return data !== undefined
  }

  /**
   * 获取所有缓存 keys
   */
  async keys(): Promise<string[]> {
    try {
      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result as string[])
        }

        request.onerror = () => {
          reject(request.error)
        }
      })
    } catch {
      return []
    }
  }

  /**
   * 清理过期缓存
   */
  async cleanup(): Promise<void> {
    try {
      const db = await this.openDB()
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAll()

      await new Promise<void>((resolve, reject) => {
        request.onsuccess = async () => {
          const now = Date.now()
          const items = request.result as Array<{ key: string } & CacheItem<unknown>>

          for (const item of items) {
            if (item.expireTime && now > item.expireTime) {
              store.delete(item.key)
            }
          }

          resolve()
        }

        request.onerror = () => reject(request.error)
      })
    } catch {
      // 忽略错误
    }
  }
}

// 创建全局实例
export const indexedDBCache = new IndexedDBCache()
