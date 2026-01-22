import { inject, computed, unref } from 'vue'
import type { Ref } from 'vue'
import { configProviderContextKey } from '../config-provider'

/**
 * 命名空间 Hook
 */
export const useNamespace = (block: string) => {
  const namespace = 'yh'
  const b = () => `${namespace}-${block}`
  const e = (element?: string) => (element ? `${b()}__${element}` : '')
  const m = (modifier?: string) => (modifier ? `${b()}--${modifier}` : '')
  const em = (element?: string, modifier?: string) =>
    element && modifier ? `${e(element)}--${modifier}` : ''
  const is = (name: string, state: boolean | undefined = true) => (state ? `is-${name}` : '')

  return {
    namespace,
    b,
    e,
    m,
    em,
    is
  }
}

/**
 * 获取全局配置 Hook
 */
export const useConfig = () => {
  // 注入的是 ComputedRef<ConfigProviderContext>
  const configRef = inject(configProviderContextKey, null)

  // 使用 computed 解包，确保响应式
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
