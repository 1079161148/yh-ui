/**
 * useZIndex - Z-Index 管理 Hook
 * @description 统一管理组件的 z-index 值
 */
import { computed, inject, ref, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// 默认初始 z-index
const defaultInitialZIndex = 2000

// z-index 注入 Key
export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

// 全局 z-index 计数器
let zIndex = defaultInitialZIndex

/**
 * 获取下一个 z-index 值
 */
export const getNextZIndex = (): number => {
  return zIndex++
}

/**
 * 重置 z-index 计数器
 */
export const resetZIndex = (value = defaultInitialZIndex): void => {
  zIndex = value
}

/**
 * useZIndex - z-index 管理
 * @param zIndexOverrides - 可选的自定义 z-index
 * @returns z-index 相关方法
 *
 * @example
 * const { currentZIndex, nextZIndex } = useZIndex()
 */
export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const injectedZIndex = inject(zIndexContextKey, undefined)

  const initialZIndex = computed(() => {
    const override = unref(zIndexOverrides)
    return override ?? unref(injectedZIndex) ?? defaultInitialZIndex
  })

  const currentZIndex = computed(() => initialZIndex.value)

  const nextZIndex = () => {
    const override = unref(zIndexOverrides)
    return override ?? getNextZIndex()
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>
