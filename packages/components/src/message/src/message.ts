/**
 * Message Types & Props
 * @description 消息提示组件类型定义
 */

import type { VNode, ComponentPublicInstance } from 'vue'

/**
 * 消息类型
 */
export const messageTypes = ['success', 'warning', 'info', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

/**
 * 消息位置
 */
export const messagePlacements = [
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right'
] as const
export type MessagePlacement = (typeof messagePlacements)[number]

/**
 * Message Props 定义
 */
export interface MessageProps {
  /**
   * @description 消息内容
   */
  message?: string | VNode

  /**
   * @description 消息类型
   * @default 'info'
   */
  type?: MessageType

  /**
   * @description 自定义图标
   */
  icon?: string | VNode

  /**
   * @description 是否显示关闭按钮
   * @default false
   */
  showClose?: boolean

  /**
   * @description 显示时间（毫秒）。设为 0 则不会自动关闭
   * @default 3000
   */
  duration?: number

  /**
   * @description 距离顶部的偏移量（px）
   * @default 20
   */
  offset?: number

  /**
   * @description 消息的唯一标识
   */
  id?: string

  /**
   * @description 是否将 message 作为 HTML 片段处理
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * @description 是否居中显示
   * @default false
   */
  center?: boolean

  /**
   * @description 关闭时的回调函数
   */
  onClose?: () => void

  /**
   * @description z-index 层级
   */
  zIndex?: number

  /**
   * @description 自定义类名
   */
  customClass?: string

  /**
   * @description 是否支持分组合并（相同内容的消息只显示一次）
   * @default false
   */
  grouping?: boolean

  /**
   * @description 重复次数
   */
  repeatNum?: number

  /**
   * @description 消息展示位置
   * @default 'top'
   */
  placement?: MessagePlacement

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Message Emits 定义
 */
export interface MessageEmits {
  (e: 'destroy'): void
}

/**
 * Message Slots 定义
 */
export interface MessageSlots {
  /**
   * 消息内容
   */
  default?: () => void
}

/**
 * Message 实例类型
 */
export type MessageInstance = ComponentPublicInstance<{
  visible: boolean
  close: () => void
}>

/**
 * Message 配置选项
 */
export type MessageOptions = Partial<MessageProps>

/**
 * Message 处理函数
 */
export interface MessageHandler {
  close: () => void
  el?: HTMLElement
  closed?: boolean
}

/**
 * Message 上下文（用于实例管理）
 */
export interface MessageContext {
  id: string
  props: MessageOptions
  handler: MessageHandler
  vnode: import('vue').VNode
}

/**
 * Message 方法类型
 */
export type MessageFn = {
  (options: MessageOptions | string): MessageHandler
  success: (message: string | MessageOptions) => MessageHandler
  warning: (message: string | MessageOptions) => MessageHandler
  info: (message: string | MessageOptions) => MessageHandler
  error: (message: string | MessageOptions) => MessageHandler
  closeAll: () => void
}
