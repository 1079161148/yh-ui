/**
 * Button Types & Props
 * @description 按钮组件类型定义
 */

import type { Component } from 'vue'

/**
 * 按钮类型
 */
export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

/**
 * 按钮尺寸
 */
export const buttonSizes = ['large', 'default', 'small'] as const

/**
 * 原生按钮类型
 */
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

/**
 * 图标位置
 */
export const iconPositions = ['left', 'right', 'top', 'bottom'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type ButtonNativeType = (typeof buttonNativeTypes)[number]
export type IconPosition = (typeof iconPositions)[number]

/**
 * Button Props 定义
 */
export interface ButtonProps {
  /**
   * @description 按钮类型
   * @default 'default'
   */
  type?: ButtonType

  /**
   * @description 按钮尺寸
   * @default 'default'
   */
  size?: ButtonSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 是否加载中
   * @default false
   */
  loading?: boolean

  /**
   * @description 是否为朴素按钮
   * @default false
   */
  plain?: boolean

  /**
   * @description 是否为圆角按钮
   * @default false
   */
  round?: boolean

  /**
   * @description 是否为圆形按钮
   * @default false
   */
  circle?: boolean

  /**
   * @description 是否为文字按钮
   * @default false
   */
  text?: boolean

  /**
   * @description 是否为链接按钮
   * @default false
   */
  link?: boolean

  /**
   * @description 原生 type 属性
   * @default 'button'
   */
  nativeType?: ButtonNativeType

  /**
   * @description 自动聚焦
   * @default false
   */
  autofocus?: boolean

  /**
   * @description 图标组件（左侧图标）
   */
  icon?: string | Component

  /**
   * @description 右侧图标组件
   */
  suffixIcon?: string | Component

  /**
   * @description 图标位置
   * @default 'left'
   */
  iconPosition?: IconPosition

  /**
   * @description 自定义按钮颜色
   */
  color?: string

  /**
   * @description HTML tag
   * @default 'button'
   */
  tag?: string | Component

  /**
   * @description 是否为块级按钮
   * @default false
   */
  block?: boolean
}

/**
 * Button Emits 定义
 */
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

/**
 * Button Slots 定义
 */
export interface ButtonSlots {
  /**
   * 默认插槽 - 按钮内容
   */
  default?: () => void

  /**
   * 左侧图标插槽
   */
  icon?: () => void

  /**
   * 右侧图标插槽
   */
  suffixIcon?: () => void

  /**
   * 加载图标插槽
   */
  loading?: () => void
}

/**
 * Button Expose 定义
 */
export interface ButtonExpose {
  /**
   * 按钮 DOM 元素引用
   */
  ref: HTMLButtonElement | undefined

  /**
   * 按钮尺寸
   */
  size: ButtonSize

  /**
   * 按钮类型
   */
  type: ButtonType

  /**
   * 是否禁用
   */
  disabled: boolean
}
