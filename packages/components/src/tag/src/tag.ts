/**
 * Tag Types & Props
 * @description 标签组件类型定义
 */

import type { Component } from 'vue'

/**
 * 标签类型
 */
export const tagTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

/**
 * 标签尺寸
 */
export const tagSizes = ['large', 'default', 'small'] as const

/**
 * 标签效果
 */
export const tagEffects = ['dark', 'light', 'plain'] as const

export type TagType = (typeof tagTypes)[number]
export type TagSize = (typeof tagSizes)[number]
export type TagEffect = (typeof tagEffects)[number]

/**
 * Tag Props 定义
 */
export interface TagProps {
  /**
   * @description 标签类型
   * @default 'primary'
   */
  type?: TagType

  /**
   * @description 标签尺寸
   * @default 'default'
   */
  size?: TagSize

  /**
   * @description 主题效果
   * @default 'light'
   */
  effect?: TagEffect

  /**
   * @description 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * @description 是否禁用关闭按钮的渐变动画
   * @default false
   */
  disableTransitions?: boolean

  /**
   * @description 是否有边框
   * @default true
   */
  hit?: boolean

  /**
   * @description 背景颜色
   */
  color?: string

  /**
   * @description 是否为圆形
   * @default false
   */
  round?: boolean

  /**
   * @description 是否可选中
   * @default false
   */
  checkable?: boolean

  /**
   * @description 是否选中（配合 checkable 使用）
   * @default false
   */
  checked?: boolean

  /**
   * @description 是否可编辑
   * @default false
   */
  editable?: boolean

  /**
   * @description 左侧图标
   */
  icon?: string | Component

  /**
   * @description 右侧图标（显示在关闭按钮之前）
   */
  suffixIcon?: string | Component

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Tag Emits 定义
 */
export interface TagEmits {
  (e: 'close', event: MouseEvent): void
  (e: 'click', event: MouseEvent): void
  (e: 'update:checked', checked: boolean): void
  (e: 'change', checked: boolean): void
  (e: 'edit', value: string): void
}

/**
 * Tag Slots 定义
 */
export interface TagSlots {
  /**
   * 默认内容
   */
  default?: () => void

  /**
   * 左侧图标
   */
  icon?: () => void

  /**
   * 右侧图标
   */
  suffixIcon?: () => void

  /**
   * 关闭图标
   */
  closeIcon?: () => void
}
