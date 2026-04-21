import type { InjectionKey, Ref } from 'vue'
export declare const zIndexContextKey: InjectionKey<Ref<number | undefined>>
export declare const zIndexCounterKey: InjectionKey<{
  current: number
}>
export declare const getNextZIndex: () => number
/**
 * 重置 z-index 计数器
 */
export declare const resetZIndex: (value?: number) => void
/**
 * 创建 z-index 计数器（用于 provide）
 */
export declare const createZIndexCounter: (initialValue?: number) => {
  current: number
}
/**
 * useZIndex - z-index 管理
 * @param zIndexOverrides - 可选的自定义 z-index
 * @returns z-index 相关方法
 *
 * @example
 * const { currentZIndex, nextZIndex } = useZIndex()
 */
export declare const useZIndex: (zIndexOverrides?: Ref<number>) => {
  initialZIndex: import('vue').ComputedRef<number>
  currentZIndex: import('vue').ComputedRef<number>
  nextZIndex: () => number
}
export type UseZIndexReturn = ReturnType<typeof useZIndex>
