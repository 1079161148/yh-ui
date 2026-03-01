/**
 * dayjs locale 同步模块
 * @description 将组件库的 locale 映射到 dayjs 的 locale，并自动同步
 */
import * as _dayjs from 'dayjs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dayjs = (_dayjs as any).default || _dayjs

// 仅静态导入默认语言包
import 'dayjs/locale/en'

// 使用 Vite 的 glob 导入所有可用语言包（按需加载）
// 显式排除已静态导入的 en.js，解决打包冲突并减轻构建压力
const dayjsLocales = import.meta.glob([
  '../../../../node_modules/dayjs/locale/*.js',
  '!../../../../node_modules/dayjs/locale/en.js'
])

// 已加载的 locale 缓存（en 已默认注入）
const loadedLocales = new Set<string>(['en'])

// 组件库 locale name 到 dayjs locale code 的映射
const localeMapping: Record<string, string> = {
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
  'zh-hk': 'zh-hk',
  'zh-mo': 'zh-tw',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  'pt-br': 'pt-br',
  ru: 'ru',
  ar: 'ar',
  'ar-eg': 'ar',
  tr: 'tr',
  it: 'it',
  nl: 'nl',
  pl: 'pl',
  th: 'th',
  vi: 'vi',
  id: 'id',
  ms: 'ms',
  da: 'da',
  sv: 'sv',
  fi: 'fi',
  no: 'nb',
  'nb-NO': 'nb',
  cs: 'cs',
  sk: 'sk',
  uk: 'uk',
  hu: 'hu',
  ro: 'ro',
  bg: 'bg',
  az: 'az',
  fa: 'fa',
  hi: 'hi',
  pa: 'pa-in',
  el: 'el',
  ca: 'ca',
  tk: 'tk',
  ta: 'ta',
  lv: 'lv',
  af: 'af',
  et: 'et',
  sl: 'sl',
  he: 'he',
  lo: 'lo',
  lt: 'lt',
  mn: 'mn',
  kk: 'kk',
  ku: 'ku',
  ckb: 'ku',
  'ug-cn': 'ug-cn',
  km: 'km',
  sr: 'sr',
  eu: 'eu',
  ky: 'ky',
  'hy-am': 'hy-am',
  hr: 'hr',
  eo: 'eo',
  bn: 'bn',
  mg: 'mg',
  sw: 'sw',
  'uz-uz': 'uz',
  my: 'my',
  te: 'te'
}

/**
 * 获取 dayjs locale code
 */
export const getDayjsLocale = (localeCode: string): string => {
  return localeMapping[localeCode] || 'en'
}

/**
 * 动态加载并设置 dayjs locale
 */
export const setDayjsLocale = async (localeCode: string): Promise<void> => {
  const dayjsLocale = getDayjsLocale(localeCode)

  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale)
    return
  }

  // 计算路径并获取 loader
  const path = `../../../../node_modules/dayjs/locale/${dayjsLocale}.js`
  const loader = dayjsLocales[path]

  if (loader) {
    try {
      await loader()
      loadedLocales.add(dayjsLocale)
      dayjs.locale(dayjsLocale)
    } catch {
      console.warn(`[yh-ui] Failed to load dayjs locale content: ${dayjsLocale}`)
      dayjs.locale('en')
    }
  } else {
    dayjs.locale('en')
  }
}

/**
 * 同步设置 dayjs locale
 */
export const setDayjsLocaleSync = (localeCode: string): void => {
  const dayjsLocale = getDayjsLocale(localeCode)

  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale)
  } else {
    dayjs.locale('en')
    setDayjsLocale(localeCode)
  }
}

/**
 * 使用自定义月份名称更新 dayjs locale
 */
export const updateDayjsMonths = (
  localeCode: string,
  months: {
    jan: string
    feb: string
    mar: string
    apr: string
    may: string
    jun: string
    jul: string
    aug: string
    sep: string
    oct: string
    nov: string
    dec: string
  }
): void => {
  const dayjsLocale = getDayjsLocale(localeCode)
  const monthsArray = [
    months.jan,
    months.feb,
    months.mar,
    months.apr,
    months.may,
    months.jun,
    months.jul,
    months.aug,
    months.sep,
    months.oct,
    months.nov,
    months.dec
  ]

  try {
    if (dayjs.updateLocale) {
      dayjs.updateLocale(dayjsLocale, {
        months: monthsArray,
        monthsShort: monthsArray
      })
    }
  } catch {
    // 忽略错误
  }
}
