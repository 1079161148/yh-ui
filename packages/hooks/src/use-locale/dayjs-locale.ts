/**
 * dayjs locale 同步模块
 * @description 将组件库的 locale 映射到 dayjs 的 locale，并自动同步
 */
import * as _dayjs from 'dayjs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dayjs = (_dayjs as any).default || _dayjs

// 静态导入常用语言包，确保打包时包含
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'

// 已加载的 locale 缓存（静态导入的语言包已自动注册）
const loadedLocales = new Set<string>(['en', 'zh-cn', 'zh-tw', 'ja', 'ko'])

// 组件库 locale name 到 dayjs locale code 的映射
const localeMapping: Record<string, string> = {
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
  'zh-hk': 'zh-hk',
  'zh-mo': 'zh-tw', // 澳门使用繁体
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
 * 使用动态导入来按需加载，避免打包所有语言
 */
export const setDayjsLocale = async (localeCode: string): Promise<void> => {
  const dayjsLocale = getDayjsLocale(localeCode)

  // 如果已加载（静态导入的或之前动态加载过的），直接切换
  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale)
    return
  }

  // 动态导入 locale
  try {
    // 使用相对路径，确保 Vite/Rollup 能正确静态分析
    await import(`../../../../node_modules/dayjs/locale/${dayjsLocale}.js`)
    loadedLocales.add(dayjsLocale)
    dayjs.locale(dayjsLocale)
  } catch {
    // 如果加载失败，回退到英文
    console.warn(`[yh-ui] Failed to load dayjs locale: ${dayjsLocale}, falling back to 'en'`)
    dayjs.locale('en')
  }
}

/**
 * 同步设置 dayjs locale（不推荐，会阻塞）
 * 用于需要立即同步的场景
 */
export const setDayjsLocaleSync = (localeCode: string): void => {
  const dayjsLocale = getDayjsLocale(localeCode)

  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale)
  } else {
    // 如果未加载，使用英文并在后台加载
    dayjs.locale('en')
    setDayjsLocale(localeCode)
  }
}

/**
 * 使用自定义月份名称更新 dayjs locale
 * 这样可以确保 dayjs 使用我们语言包中定义的月份名称
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
    // 使用 updateLocale 插件（如果可用）
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
