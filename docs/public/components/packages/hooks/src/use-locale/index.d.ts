import type { Ref } from 'vue'
import type { Language } from '@yh-ui/locale'
export type { Language }
export {
  setDayjsLocale,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from './dayjs-locale'
export declare const useLocale: (localeOverrides?: Ref<Language>) => {
  locale: import('vue').ComputedRef<Language>
  lang: import('vue').ComputedRef<string>
  t: (path: string, options?: Record<string, string | number>) => string
  tRaw: <T = unknown>(path: string) => T
}
export type UseLocaleReturn = ReturnType<typeof useLocale>
