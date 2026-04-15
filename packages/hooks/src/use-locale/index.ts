/**
 * useLocale - 国际化 Hook
 * @description 提供组件国际化支持，同时自动同步 dayjs locale
 */
import { computed, unref, watch } from 'vue'
import type { Ref } from 'vue'
import { en, zhCn } from '@yh-ui/locale'
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

export const useLocale = (localeOverrides?: Ref<Language>) => {
  const { globalLocale } = useConfig()

  const locale = computed<Language>(() => {
    return unref(localeOverrides) ?? unref(globalLocale) ?? zhCn
  })

  const lang = computed(() => locale.value.name)

  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang)
    },
    { immediate: true }
  )

  const resolveLocaleValue = (path: string): unknown => {
    const keys = path.split('.')
    const sources = [locale.value.yh, zhCn.yh, en.yh]

    for (const source of sources) {
      let result: unknown = source

      for (const key of keys) {
        if (result && typeof result === 'object') {
          result = (result as Record<string, unknown>)[key]
        } else {
          result = undefined
          break
        }
      }

      if (result !== undefined) return result
    }

    return undefined
  }

  const t = (path: string, options?: Record<string, string | number>): string => {
    const result = resolveLocaleValue(path)

    if (typeof result !== 'string') return path

    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key]
        return val !== undefined ? String(val) : `{${key}}`
      })
    }

    return result
  }

  const tRaw = <T = unknown>(path: string): T => {
    const result = resolveLocaleValue(path)

    if (result === undefined) return path as unknown as T

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
