import type { InjectionKey, ComputedRef } from 'vue'
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
export declare const configProviderContextKey: InjectionKey<ComputedRef<ConfigProviderContext>>
/**
 * 获取全局配置 Hook
 */
export declare const useConfig: () => {
  config: ComputedRef<ConfigProviderContext> | null
  globalSize: ComputedRef<'large' | 'default' | 'small'>
  globalZIndex: ComputedRef<number>
  globalLocale: ComputedRef<Language | undefined>
}
