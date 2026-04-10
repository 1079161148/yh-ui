import { computed, unref, watch } from 'vue'
import { zhCn } from '../../locale/index.js'
import { useConfig } from '../use-config/index.js'
import { setDayjsLocale } from './dayjs-locale.js'
import {
  setDayjsLocale as setDayjsLocale2,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from './dayjs-locale.js'
const useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig()
  const locale = computed(() => {
    var _a, _b
    return (_b = (_a = unref(localeOverrides)) != null ? _a : unref(globalLocale)) != null
      ? _b
      : zhCn
  })
  const lang = computed(() => locale.value.name)
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang)
    },
    { immediate: true }
  )
  const t = (path, options) => {
    const keys = path.split('.')
    let result = locale.value.yh
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key]
      } else {
        result = void 0
      }
      if (result === void 0) return path
    }
    if (typeof result !== 'string') return path
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key]
        return val !== void 0 ? String(val) : `{${key}}`
      })
    }
    return result
  }
  const tRaw = (path) => {
    const keys = path.split('.')
    let result = locale.value.yh
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key]
      } else {
        result = void 0
      }
      if (result === void 0) return path
    }
    return result
  }
  return {
    locale,
    lang,
    t,
    tRaw
  }
}
export {
  getDayjsLocale,
  setDayjsLocale2 as setDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths,
  useLocale
}
