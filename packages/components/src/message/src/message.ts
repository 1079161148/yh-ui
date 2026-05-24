/**
 * Message types and public contracts.
 */

import type { VNode, ComponentPublicInstance, Ref, AppContext } from 'vue'

/**
 * Supported message variants.
 */
export const messageTypes = ['success', 'warning', 'info', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

/**
 * Supported message placements.
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
 * Message component props.
 */
export interface MessageProps {
  /**
   * Message content.
   */
  message?: string | VNode

  /**
   * Message variant.
   * @default 'info'
   */
  type?: MessageType

  /**
   * Custom icon.
   */
  icon?: string | VNode

  /**
   * Whether to show the close button.
   * @default false
   */
  showClose?: boolean

  /**
   * Auto-close duration in milliseconds. Set to 0 to disable auto-close.
   * @default 3000
   */
  duration?: number

  /**
   * Offset from the viewport edge in pixels.
   * @default 20
   */
  offset?: number

  /**
   * Unique message id.
   */
  id?: string

  /**
   * Render message content as raw HTML.
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * Whether to center the content.
   * @default false
   */
  center?: boolean

  /**
   * Callback fired after the message closes.
   */
  onClose?: () => void

  /**
   * z-index value.
   */
  zIndex?: number

  /**
   * Custom CSS class.
   */
  customClass?: string

  /**
   * Whether to merge messages with identical content.
   * @default false
   */
  grouping?: boolean

  /**
   * Number of repeated grouped messages.
   */
  repeatNum?: number

  /**
   * Message placement.
   * @default 'top'
   */
  placement?: MessagePlacement

  /**
   * Component-level theme overrides.
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Message component emits.
 */
export interface MessageEmits {
  (e: 'destroy'): void
}

/**
 * Message component slots.
 */
export interface MessageSlots {
  /**
   * Message content slot.
   */
  default?: () => void

  /**
   * Icon slot.
   */
  icon?: () => void
}

/**
 * Exposed message instance methods.
 */
export interface MessageExpose {
  visible: Ref<boolean>
  close: () => void
}

/**
 * Message component instance.
 */
export type MessageInstance = ComponentPublicInstance<MessageExpose>

/**
 * Message options accepted by the service API.
 */
export interface MessageOptions extends Partial<MessageProps> {
  /**
   * 应用上下文，用于继承全局配置/组件。
   */
  appContext?: AppContext | null

  /**
   * 设置消息挂载的根元素，默认优先挂载到 .yh-config-provider，否则回退到 document.body。
   */
  appendTo?: string | HTMLElement
}

/**
 * Message service handler.
 */
export interface MessageHandler {
  close: () => void
  el?: HTMLElement
  closed?: boolean
}

/**
 * Internal message instance context.
 */
export interface MessageContext {
  id: string
  props: MessageOptions
  handler: MessageHandler
  vnode: import('vue').VNode
}

/**
 * Message service API.
 */
export type MessageFn = {
  (options: MessageOptions | string, appContext?: AppContext | null): MessageHandler
  success: (message: string | MessageOptions, appContext?: AppContext | null) => MessageHandler
  warning: (message: string | MessageOptions, appContext?: AppContext | null) => MessageHandler
  info: (message: string | MessageOptions, appContext?: AppContext | null) => MessageHandler
  error: (message: string | MessageOptions, appContext?: AppContext | null) => MessageHandler
  closeAll: () => void
}
