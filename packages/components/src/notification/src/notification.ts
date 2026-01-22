/**
 * Notification Types & Props
 * @description 通知组件类型定义
 */

import type { VNode, ComponentPublicInstance } from 'vue'

/**
 * 通知类型
 */
export const notificationTypes = ['success', 'warning', 'info', 'error'] as const

export type NotificationType = (typeof notificationTypes)[number]

/**
 * 通知位置
 */
export const notificationPositions = [
  'top-right',
  'top-left',
  'top-center',
  'bottom-right',
  'bottom-left',
  'bottom-center'
] as const

export type NotificationPosition = (typeof notificationPositions)[number]

/**
 * Notification Props 定义
 */
export interface NotificationProps {
  /**
   * @description 标题
   */
  title?: string

  /**
   * @description 通知内容，可以是字符串、VNode 或返回 VNode 的函数
   */
  message?: string | VNode | (() => VNode)

  /**
   * @description 通知类型
   */
  type?: NotificationType

  /**
   * @description 自定义图标
   */
  icon?: string | VNode

  /**
   * @description 是否显示关闭按钮
   * @default true
   */
  showClose?: boolean

  /**
   * @description 显示时间（毫秒）。设为 0 则不会自动关闭
   * @default 4500
   */
  duration?: number

  /**
   * @description 距离窗口边缘的偏移量（px）
   * @default 16
   */
  offset?: number

  /**
   * @description 弹出位置
   * @default 'top-right'
   */
  position?: NotificationPosition

  /**
   * @description 通知的唯一标识
   */
  id?: string

  /**
   * @description 是否将 message 作为 HTML 片段处理
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * @description 关闭时的回调函数
   */
  onClose?: () => void

  /**
   * @description 点击通知时的回调函数
   */
  onClick?: () => void

  /**
   * @description z-index 层级
   */
  zIndex?: number

  /**
   * @description 自定义类名
   */
  customClass?: string

  /**
   * @description 同一位置最多显示的通知数量
   */
  max?: number
}

/**
 * Notification Emits 定义
 */
export interface NotificationEmits {
  (e: 'destroy'): void
  (e: 'click'): void
}

/**
 * Notification Slots 定义
 */
export interface NotificationSlots {
  /**
   * 通知内容
   */
  default?: () => void

  /**
   * 自定义图标
   */
  icon?: () => void
}

/**
 * Notification 实例类型
 */
export type NotificationInstance = ComponentPublicInstance<{
  visible: boolean
  close: () => void
}>

/**
 * Notification 配置选项
 */
export type NotificationOptions = Partial<NotificationProps>

/**
 * Notification 处理函数
 */
export interface NotificationHandler {
  close: () => void
  el?: HTMLElement
}

/**
 * Notification 上下文（用于实例管理）
 */
export interface NotificationContext {
  id: string
  props: NotificationOptions
  handler: NotificationHandler
  vnode: import('vue').VNode
}

/**
 * Notification 方法类型
 */
export type NotificationFn = {
  (options: NotificationOptions | string): NotificationHandler
  success: (title: string, message?: string | NotificationOptions) => NotificationHandler
  warning: (title: string, message?: string | NotificationOptions) => NotificationHandler
  info: (title: string, message?: string | NotificationOptions) => NotificationHandler
  error: (title: string, message?: string | NotificationOptions) => NotificationHandler
  closeAll: () => void
}
