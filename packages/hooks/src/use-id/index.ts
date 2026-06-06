import { computed, inject, unref, useId as useVueId } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// ID 前缀注入 Key
export const idInjectionKey: InjectionKey<Ref<string | undefined>> = Symbol('idInjectionKey')

/**
 * useId - 生成唯一 ID
 * @param idOverrides - 可选的自定义 ID 前缀
 * @returns 唯一 ID
 *
 * @example
 * const id = useId() // 'yh-id-1' (or vue native id)
 * const customId = useId(ref('custom')) // 'custom'
 */
export const useId = (idOverrides?: Ref<string | undefined>): Ref<string> => {
  const injectedId = inject(idInjectionKey, undefined)
  const nativeId = useVueId()

  const id = computed(() => {
    const override = unref(idOverrides)
    if (override) return override

    const injected = unref(injectedId)
    if (injected) return injected

    return nativeId
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
    current: 0 // No longer using counter
  }
}

export type UseIdReturn = ReturnType<typeof useId>
