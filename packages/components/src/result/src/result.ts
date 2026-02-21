/**
 * Result 结果组件类型定义
 * @description 操作结果反馈
 */

/** 图标类型 */
export type ResultIconType = 'success' | 'warning' | 'error' | 'info'

export interface ResultProps {
  /**
   * @description 结果标题
   */
  title?: string

  /**
   * @description 结果副标题
   */
  subTitle?: string

  /**
   * @description 图标类型
   * @default 'info'
   */
  icon?: ResultIconType

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface ResultSlots {
  /** 默认插槽 - 操作区 */
  default?: () => void
  /** 自定义图标 */
  icon?: () => void
  /** 自定义标题 */
  title?: () => void
  /** 自定义副标题 */
  'sub-title'?: () => void
  /** 额外内容区 */
  extra?: () => void
}
