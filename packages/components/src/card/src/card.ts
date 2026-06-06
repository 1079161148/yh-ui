/**
 * Card Types & Props
 * @description 卡片组件类型定义
 */

/**
 * 卡片阴影时机
 */
export const cardShadows = ['always', 'hover', 'never'] as const

export type CardShadow = (typeof cardShadows)[number]

/**
 * Card Props 定义
 */
export interface CardProps {
  /**
   * @description 卡片标题
   */
  header?: string

  /**
   * @description 卡片内容区域的样式
   */
  bodyStyle?: Record<string, string>

  /**
   * @description 卡片头部的样式
   */
  headerStyle?: Record<string, string>

  /**
   * @description 卡片阴影显示时机
   * @default 'always'
   */
  shadow?: CardShadow

  /**
   * @description 是否显示边框
   * @default true
   */
  bordered?: boolean

  /**
   * @description 是否可悬浮（鼠标悬浮时有提升效果）
   * @default false
   */
  hoverable?: boolean

  /**
   * @description 卡片的尺寸
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large'

  /**
   * @description 是否加载中
   * @default false
   */
  loading?: boolean

  /**
   * @description 是否有内边距
   * @default true
   */
  bodyPadding?: boolean

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Card Slots 定义
 */
export interface CardSlots {
  /**
   * 卡片内容
   */
  default?: () => void

  /**
   * 卡片标题
   */
  header?: () => void

  /**
   * 卡片额外操作区域
   */
  extra?: () => void

  /**
   * 卡片底部内容
   */
  footer?: () => void
}
