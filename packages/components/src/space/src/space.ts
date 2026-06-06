/**
 * Space 组件类型定义
 * @description 间距/间隔组件，用于控制元素之间的间距
 */
import type { CSSProperties } from 'vue'

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number
export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type SpaceJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export interface SpaceProps {
  /**
   * @description 间距方向
   * @default 'horizontal'
   */
  direction?: SpaceDirection

  /**
   * @description 间距大小，支持预设值或像素数值
   * @default 'small'
   */
  size?: SpaceSize | [SpaceSize, SpaceSize]

  /**
   * @description 对齐方式
   * @default 'center'
   */
  align?: SpaceAlign

  /**
   * @description 主轴对齐方式
   * @default 'start'
   */
  justify?: SpaceJustify

  /**
   * @description 是否自动换行（仅水平方向有效）
   * @default false
   */
  wrap?: boolean

  /**
   * @description 是否填充父容器
   * @default false
   */
  fill?: boolean

  /**
   * @description 间隔符，可为字符串或组件
   */
  spacer?: string | number

  /**
   * @description 自定义样式
   */
  style?: CSSProperties | string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface SpaceSlots {
  /** 默认插槽 - 子元素 */
  default?: () => void
}
