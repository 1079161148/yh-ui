/**
 * Notification types and public contracts.
 */

import type { VNode, ComponentPublicInstance, Ref } from 'vue'

/**
 * Supported notification variants.
 */
export const notificationTypes = ['success', 'warning', 'info', 'error'] as const

export type NotificationType = (typeof notificationTypes)[number]

/**
 * Supported notification positions.
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
 * Notification component props.
 */
export interface NotificationProps {
  /**
   * Notification title.
   */
  title?: string

  /**
   * Notification content.
   */
  message?: string | VNode | (() => VNode)

  /**
   * Notification variant.
   */
  type?: NotificationType

  /**
   * Custom icon.
   */
  icon?: string | VNode

  /**
   * Whether to show the close button.
   * @default true
   */
  showClose?: boolean

  /**
   * Auto-close duration in milliseconds. Set to 0 to disable auto-close.
   * @default 4500
   */
  duration?: number

  /**
   * Offset from the viewport edge in pixels.
   * @default 16
   */
  offset?: number

  /**
   * Notification position.
   * @default 'top-right'
   */
  position?: NotificationPosition

  /**
   * Unique notification id.
   */
  id?: string

  /**
   * Render message content as raw HTML.
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * Callback fired after the notification closes.
   */
  onClose?: () => void

  /**
   * Callback fired when the notification is clicked.
   */
  onClick?: () => void

  /**
   * z-index value.
   */
  zIndex?: number

  /**
   * Custom CSS class.
   */
  customClass?: string

  /**
   * Maximum visible notifications per position.
   */
  max?: number

  /**
   * Component-level theme overrides.
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Notification component emits.
 */
export interface NotificationEmits {
  (e: 'destroy'): void
  (e: 'click'): void
}

/**
 * Notification component slots.
 */
export interface NotificationSlots {
  /**
   * Notification content slot.
   */
  default?: () => void

  /**
   * Icon slot.
   */
  icon?: () => void
}

/**
 * Exposed notification instance methods.
 */
export interface NotificationExpose {
  visible: Ref<boolean>
  close: () => void
}

/**
 * Notification component instance.
 */
export type NotificationInstance = ComponentPublicInstance<NotificationExpose>

/**
 * Notification options accepted by the service API.
 */
export type NotificationOptions = Partial<NotificationProps>

/**
 * Notification service handler.
 */
export interface NotificationHandler {
  close: () => void
  el?: HTMLElement
}

/**
 * Internal notification instance context.
 */
export interface NotificationContext {
  id: string
  props: NotificationOptions
  handler: NotificationHandler
  vnode: import('vue').VNode
}

/**
 * Notification service API.
 */
export type NotificationFn = {
  (options: NotificationOptions | string): NotificationHandler
  success: (title: string, message?: string | NotificationOptions) => NotificationHandler
  warning: (title: string, message?: string | NotificationOptions) => NotificationHandler
  info: (title: string, message?: string | NotificationOptions) => NotificationHandler
  error: (title: string, message?: string | NotificationOptions) => NotificationHandler
  closeAll: () => void
}
