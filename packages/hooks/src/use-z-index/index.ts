/**
 * useZIndex - Z-Index 管理 Hook
 * @description 统一管理组件的 z-index 值，SSR 安全
 */
import { computed, inject, ref, unref, getCurrentInstance } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// 默认初始 z-index
const defaultInitialZIndex = 2000

// z-index 注入 Key
export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

// z-index 计数器注入 Key（用于应用级状态管理）
export const zIndexCounterKey: InjectionKey<{ current: number }> = Symbol('zIndexCounterKey')

/**
 * 获取下一个 z-index 值 (SSR 安全版本)
 */
export const getNextZIndex = (): number => {
  // 尝试从当前实例获取注入的计数器
  const instance = getCurrentInstance()
  if (instance) {
    const counter = inject(zIndexCounterKey, null)
    if (counter) {
      return ++counter.current
    }
  }

  // 降级方案：使用局部计数器（仅在客户端或无注入时使用）
  if (typeof window !== 'undefined') {
    if (!(window as any).__YH_Z_INDEX__) {
      ;(window as any).__YH_Z_INDEX__ = defaultInitialZIndex
    }
    return ++(window as any).__YH_Z_INDEX__
  }

  // SSR 环境下的兜底方案
  return defaultInitialZIndex
}

/**
 * 重置 z-index 计数器
 */
export const resetZIndex = (value = defaultInitialZIndex): void => {
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
