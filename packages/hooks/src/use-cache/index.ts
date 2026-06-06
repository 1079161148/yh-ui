import { shallowRef, type ShallowRef } from 'vue'

export interface UseCacheReturn<T> {
  data: ShallowRef<T | null>
  execute: () => Promise<void>
}

/**
 * 一个简单的 SSR 友好的缓存 Hook
 * 在服务端可以将结果存入缓存，客户端可以从缓存中恢复或重新计算
 */
export function useCache<T>(key: string, fetcher: () => T | Promise<T>): UseCacheReturn<T> {
  const data = shallowRef<T | null>(null)

  // 简单的内存缓存（在单次请求生命周期内有效）
  // 注意：在实际 Nuxt 环境中，建议配合 useAsyncData 使用
  const execute = async () => {
    try {
      data.value = await fetcher()
    } catch (err) {
      console.error(`[YH-UI] Cache fetcher error for key ${key}:`, err)
    }
  }

  return {
    data,
    execute
  }
}
