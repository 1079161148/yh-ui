/**
 * useLocale - 国际化 Hook
 * @description 提供组件国际化支持，已严格类型化
 */
import { computed, inject, ref, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface Language {
  name: string
  yh: Record<string, unknown>
}

// 默认语言
const defaultLanguage: Language = {
  name: 'zh-CN',
  yh: {
    button: {
      loading: '加载中...'
    },
    input: {
      placeholder: '请输入'
    },
    select: {
      placeholder: '请选择',
      noData: '暂无数据',
      loading: '加载中...'
    },
    pagination: {
      goto: '前往',
      page: '页',
      total: '共 {total} 条'
    },
    dialog: {
      confirm: '确定',
      cancel: '取消',
      close: '关闭'
    },
    table: {
      emptyText: '暂无数据',
      loading: '加载中...'
    },
    datepicker: {
      selectDate: '选择日期',
      selectTime: '选择时间',
      today: '今天',
      now: '此刻',
      confirm: '确定',
      clear: '清除'
    },
    upload: {
      upload: '点击上传',
      tip: '将文件拖到此处，或点击上传'
    },
    message: {
      close: '关闭'
    }
  }
}

// 语言注入 Key
export const localeContextKey: InjectionKey<Ref<Language>> = Symbol('localeContextKey')

/**
 * useLocale - 国际化
 * @param localeOverrides - 可选的自定义语言包
 * @returns 国际化相关方法
 */
export const useLocale = (localeOverrides?: Ref<Language>) => {
  const injectedLocale = inject(localeContextKey, ref(defaultLanguage))

  const locale = computed<Language>(() => {
    return unref(localeOverrides) ?? unref(injectedLocale)
  })

  const lang = computed(() => locale.value.name)

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
      return result.replace(/\{(\w+)\}/g, (_, key) => {
        const val = options[key]
        return val !== undefined ? String(val) : `{${key}}`
      })
    }

    return result
  }

  return {
    locale,
    lang,
    t
  }
}

export type UseLocaleReturn = ReturnType<typeof useLocale>
