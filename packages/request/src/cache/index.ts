/**
 * 缓存系统导出
 */

export * from './memory'
export * from './localStorage'
export * from './indexedDB'

import { MemoryCache, type CacheOptions } from './memory'
import { LocalStorageCache, type LocalStorageCacheOptions } from './localStorage'
import { IndexedDBCache, type IndexedDBCacheOptions } from './indexedDB'

/**
 * 创建缓存实例的工厂函数
 */
export type CacheType = 'memory' | 'localStorage' | 'indexedDB'
export type CacheInstanceOptions = CacheOptions | LocalStorageCacheOptions | IndexedDBCacheOptions

export interface CacheFactoryOptions {
  /** 缓存类型 */
  type?: CacheType
  /** 缓存选项 */
  options?: CacheInstanceOptions
}

/**
 * 根据类型创建缓存实例
 */
export function createCache(type: CacheType = 'memory', options?: CacheInstanceOptions) {
  switch (type) {
    case 'localStorage':
      return new LocalStorageCache(options as LocalStorageCacheOptions)
    case 'indexedDB':
      return new IndexedDBCache(options as IndexedDBCacheOptions)
    case 'memory':
    default:
      return new MemoryCache()
  }
}
