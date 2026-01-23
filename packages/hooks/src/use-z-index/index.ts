/**
 * useZIndex - Z-Index 管理 Hook
 * @description 统一管理组件的 z-index 值，SSR 安全
 * @reference 参考 Element Plus 的最佳实践实现
 */
import { computed, inject, ref, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// 默认初始 z-index
const defaultInitialZIndex = 2000

// z-index 注入 Key
export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

// z-index 计数器注入 Key（用于应用级状态管理）
export const zIndexCounterKey: InjectionKey<{ current: number }> = Symbol('zIndexCounterKey')

// 全局计数器（仅在客户端使用）
let globalZIndexCounter: number | undefined

export const getNextZIndex = (): number => {
  // 在客户端环境使用全局计数器，支持 window 存储以跨组件共享
  if (typeof window !== 'undefined') {
    const windowContext = window as any
    if (windowContext.__YH_Z_INDEX__ === undefined) {
      windowContext.__YH_Z_INDEX__ = defaultInitialZIndex
    }
    return ++windowContext.__YH_Z_INDEX__
  }

  // SSR 环境下的兜底方案
  return defaultInitialZIndex
}

/**
 * 重置 z-index 计数器
 */
export const resetZIndex = (value = defaultInitialZIndex): void => {
  globalZIndexCounter = value
  if (typeof window !== 'undefined') {
    ;(window as any).__YH_Z_INDEX__ = value
  }
}

/**
 * 创建 z-index 计数器（用于 provide）
 */
export const createZIndexCounter = (initialValue = defaultInitialZIndex) => {
  return { current: initialValue }
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
  const appCounter = inject(zIndexCounterKey, null)

  const initialZIndex = computed(() => {
    const override = unref(zIndexOverrides)
    return override ?? unref(injectedZIndex) ?? defaultInitialZIndex
  })

  const currentZIndex = computed(() => initialZIndex.value)

  const nextZIndex = () => {
    const override = unref(zIndexOverrides)
    if (override !== undefined) return override

    if (appCounter) {
      return ++appCounter.current
    }

    return getNextZIndex()
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>
