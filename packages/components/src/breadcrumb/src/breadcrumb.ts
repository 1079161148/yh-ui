import type { ExtractPropTypes, PropType, Component } from 'vue'

export const breadcrumbProps = {
  /** 分割符，默认为 / */
  separator: {
    type: String,
    default: '/'
  },
  /** 分割符图标，优先级高于 separator */
  separatorIcon: {
    type: [Object, String, Function] as PropType<string | Component>,
    default: ''
  },
  /** 最大展示数量，超过则折叠中间项 */
  maxItems: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export const breadcrumbItemProps = {
  /** 路由跳转目标样式 */
  to: {
    type: [String, Object] as PropType<string | any>,
    default: ''
  },
  /** 是否替换路由 */
  replace: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>
