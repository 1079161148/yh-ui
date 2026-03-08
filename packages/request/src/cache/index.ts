/**
 * 缓存系统导出
 */

export * from './memory'
export * from './localStorage'
export * from './indexedDB'

import { type CacheOptions } from './memory'

/**
 * 创建缓存实例的工厂函数
 */
export type CacheType = 'memory' | 'localStorage' | 'indexedDB'

export interface CacheFactoryOptions {
  /** 缓存类型 */
  type?: CacheType
  /** 缓存选项 */
  options?: CacheOptions
}

/**
 * 根据类型创建缓存实例
 */
export function createCache(type: CacheType = 'memory', options?: CacheOptions) {
  switch (type) {
    case 'localStorage':
      return new (require('./localStorage').LocalStorageCache)(options)
    case 'indexedDB':
      return new (require('./indexedDB').IndexedDBCache)(options)
    case 'memory':
    default:
      return new (require('./memory').MemoryCache)()
  }
}
