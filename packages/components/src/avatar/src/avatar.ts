/**
 * Avatar 组件类型定义
 */
import type { Component, CSSProperties } from 'vue'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = 'large' | 'default' | 'small' | number
export type AvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface AvatarProps {
  /**
   * @description 头像形状
   * @default 'circle'
   */
  shape?: AvatarShape

  /**
   * @description 头像大小，支持预设值或像素数值
   * @default 'default'
   */
  size?: AvatarSize

  /**
   * @description 图片地址
   */
  src?: string

  /**
   * @description 图片懒加载地址列表（srcset）
   */
  srcSet?: string

  /**
   * @description 图片 alt 文字
   */
  alt?: string

  /**
   * @description 图片适配方式
   * @default 'cover'
   */
  fit?: AvatarFit

  /**
   * @description 图标组件，当无图片时显示
   */
  icon?: string | Component

  /**
   * @description 背景色
   */
  color?: string

  /**
   * @description 背景颜色
   */
  backgroundColor?: string

  /** 自定义样式 */
  style?: CSSProperties
}

export interface AvatarEmits {
  (e: 'error', event: Event): void
}

export interface AvatarSlots {
  /** 默认插槽 - 自定义内容（文字/图标） */
  default?: () => void
}
