/**
 * useLocale - 国际化 Hook
 * @description 提供组件国际化支持，已严格类型化，同时同步 dayjs locale
 */
import { computed, unref, watch } from 'vue'
import type { Ref } from 'vue'
import { zhCn } from '@yh-ui/locale'
import type { Language } from '@yh-ui/locale'
import { useConfig } from '../use-config'
import { setDayjsLocale } from './dayjs-locale'

export type { Language }
export {
  setDayjsLocale,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from './dayjs-locale'

/**
 * useLocale - 国际化
 * @param localeOverrides - 可选的自定义语言包
 * @returns 国际化相关方法
 */
export const useLocale = (localeOverrides?: Ref<Language>) => {
  const { globalLocale } = useConfig()

  const locale = computed<Language>(() => {
    return unref(localeOverrides) ?? unref(globalLocale) ?? zhCn
  })

  const lang = computed(() => locale.value.name)

  // 自动同步 dayjs locale
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang)
    },
    { immediate: true }
  )

  /**
   * 翻译函数
   * @param path - 翻译键路径，如 'button.loading'
   * @param options - 插值参数
   */
  const t = (path: string, options?: Record<string, string | number>): string => {
    const keys = path.split('.')
    let result: unknown = locale.value.yh

    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = (result as Record<string, unknown>)[key]
      } else {
        result = undefined
      }

      if (result === undefined) return path
    }

    if (typeof result !== 'string') return path

    // 处理插值 {xxx}
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key]
        return val !== undefined ? String(val) : `{${key}}`
      })
    }

    return result
  }

  /**
   * 获取原始翻译值（支持数组等非字符串类型）
   * @param path - 翻译键路径，如 'rate.texts'
   */
  const tRaw = <T = unknown>(path: string): T => {
    const keys = path.split('.')
    let result: unknown = locale.value.yh

    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = (result as Record<string, unknown>)[key]
      } else {
        result = undefined
      }

      if (result === undefined) return path as unknown as T
    }

    return result as T
  }

  return {
    locale,
    lang,
    t,
    tRaw
  }
}

export type UseLocaleReturn = ReturnType<typeof useLocale>
