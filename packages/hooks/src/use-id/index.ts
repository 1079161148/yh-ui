/**
 * useId - 唯一 ID 生成 Hook
 * @description 生成组件唯一标识符
 */
import { computed, inject, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { generateId } from '@yh-ui/utils'

// ID 前缀注入 Key
export const idInjectionKey: InjectionKey<Ref<string | undefined>> = Symbol('idInjectionKey')

// 全局 ID 计数器
let idCounter = 0

/**
 * useId - 生成唯一 ID
 * @param idOverrides - 可选的自定义 ID 前缀
 * @returns 唯一 ID
 *
 * @example
 * const id = useId() // 'yh-id-1'
 * const customId = useId(ref('custom')) // 'custom'
 */
export const useId = (idOverrides?: Ref<string | undefined>): Ref<string> => {
  const injectedId = inject(idInjectionKey, undefined)

  const id = computed(() => {
    const override = unref(idOverrides)
    if (override) return override

    const injected = unref(injectedId)
    if (injected) return injected

    return `yh-id-${++idCounter}`
  })

  return id
}

/**
 * useIdInjection - ID 注入工具
 * @description 用于组件内部生成关联 ID
 */
export const useIdInjection = () => {
  return {
    prefix: computed(() => `yh-${Date.now()}`),
    current: idCounter
  }
}

export type UseIdReturn = ReturnType<typeof useId>
