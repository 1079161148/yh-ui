/**
 * Badge Types & Props
 * @description 徽标组件类型定义
 */

/**
 * 徽标类型
 */
export const badgeTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

export type BadgeType = (typeof badgeTypes)[number]

/**
 * Badge Props 定义
 */
export interface BadgeProps {
  /**
   * @description 显示值
   */
  value?: string | number

  /**
   * @description 最大值，超过最大值会显示 '{max}+'，仅当 value 为 number 时有效
   * @default 99
   */
  max?: number

  /**
   * @description 是否显示小红点
   * @default false
   */
  isDot?: boolean

  /**
   * @description 是否隐藏徽标
   * @default false
   */
  hidden?: boolean

  /**
   * @description 徽标类型
   * @default 'danger'
   */
  type?: BadgeType

  /**
   * @description 是否显示边框
   * @default true
   */
  showBorder?: boolean

  /**
   * @description 自定义徽标颜色，会覆盖 type
   */
  color?: string

  /**
   * @description 徽标偏移，格式为 [水平偏移, 垂直偏移]，单位为 px
   */
  offset?: [number, number]

  /**
   * @description 当数值为 0 时，是否展示 Badge
   * @default false
   */
  showZero?: boolean
}

/**
 * Badge Slots 定义
 */
export interface BadgeSlots {
  /**
   * 被徽标包裹的元素
   */
  default?: () => void

  /**
   * 自定义徽标内容
   */
  content?: () => void
}
