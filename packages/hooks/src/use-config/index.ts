import { inject, computed, unref } from 'vue'
import type { InjectionKey, ComputedRef, Ref } from 'vue'
import type { Language } from '@yh-ui/locale'

export interface ConfigProviderContext {
  size?: 'small' | 'default' | 'large'
  zIndex?: number
  locale?: Language
  message?: {
    max?: number
    duration?: number
    offset?: number
  }
}

export const configProviderContextKey: InjectionKey<ComputedRef<ConfigProviderContext>> = Symbol(
  'configProviderContextKey'
)

/**
 * 获取全局配置 Hook
 */
export const useConfig = () => {
  const configRef = inject(configProviderContextKey, null)

  const globalSize = computed(() => {
    const config = unref(configRef)
    return config?.size || 'default'
  })

  const globalZIndex = computed(() => {
    const config = unref(configRef)
    return config?.zIndex || 2000
  })

  const globalLocale = computed(() => {
    const config = unref(configRef)
    return config?.locale
  })

  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}
