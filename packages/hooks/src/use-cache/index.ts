import { shallowRef, type ShallowRef } from 'vue'

const cacheMap = new Map<string, unknown>()

export interface UseCacheReturn<T> {
  data: ShallowRef<T | null>
  execute: () => Promise<void>
}

/**
 * 一个简单的 SSR 友好的缓存 Hook
 * 在服务端可以将结果存入缓存，客户端可以从缓存中恢复或重新计算
 */
export function useCache<T>(key: string, fetcher: () => T | Promise<T>): UseCacheReturn<T> {
  const cachedValue = cacheMap.has(key) ? (cacheMap.get(key) as T) : null
  const data = shallowRef<T | null>(cachedValue)

  const execute = async () => {
    try {
      const result = await fetcher()
      cacheMap.set(key, result)
      data.value = result
    } catch (err) {
      console.error(`[YH-UI] Cache fetcher error for key ${key}:`, err)
    }
  }

  return {
    data,
    execute
  }
}

/**
 * 清除所有缓存 (用于测试或手动重置)
 */
export function clearCache(): void {
  cacheMap.clear()
}
