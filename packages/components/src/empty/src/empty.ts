/**
 * Empty 组件类型定义
 * @description 空状态组件
 */
import type { Component } from 'vue'

export interface EmptyProps {
  /**
   * @description 自定义图片地址
   */
  image?: string

  /**
   * @description 图片尺寸（px）
   * @default 100
   */
  imageSize?: number

  /**
   * @description 描述文字
   * @default '暂无数据'
   */
  description?: string

  /**
   * @description 自定义图像组件
   */
  icon?: string | Component

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface EmptySlots {
  /** 图像插槽 */
  image?: () => void
  /** 描述插槽 */
  description?: () => void
  /** 底部额外内容插槽（如操作按钮） */
  default?: () => void
}
