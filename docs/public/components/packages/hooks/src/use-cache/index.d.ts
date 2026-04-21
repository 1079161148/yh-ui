import { type ShallowRef } from 'vue'
export interface UseCacheReturn<T> {
  data: ShallowRef<T | null>
  execute: () => Promise<void>
}
/**
 * 一个简单的 SSR 友好的缓存 Hook
 * 在服务端可以将结果存入缓存，客户端可以从缓存中恢复或重新计算
 */
export declare function useCache<T>(key: string, fetcher: () => T | Promise<T>): UseCacheReturn<T>
