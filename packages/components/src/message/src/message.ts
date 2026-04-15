/**
 * Message Types & Props
 * @description 娑堟伅鎻愮ず缁勪欢绫诲瀷瀹氫箟
 */

import type { VNode, ComponentPublicInstance, Ref } from 'vue'

/**
 * 娑堟伅绫诲瀷
 */
export const messageTypes = ['success', 'warning', 'info', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

/**
 * 娑堟伅浣嶇疆
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
 * Message Props 瀹氫箟
 */
export interface MessageProps {
  /**
   * @description 娑堟伅鍐呭
   */
  message?: string | VNode

  /**
   * @description 娑堟伅绫诲瀷
   * @default 'info'
   */
  type?: MessageType

  /**
   * @description 鑷畾涔夊浘鏍?
   */
  icon?: string | VNode

  /**
   * @description 鏄惁鏄剧ず鍏抽棴鎸夐挳
   * @default false
   */
  showClose?: boolean

  /**
   * @description 鏄剧ず鏃堕棿锛堟绉掞級銆傝涓?0 鍒欎笉浼氳嚜鍔ㄥ叧闂?
   * @default 3000
   */
  duration?: number

  /**
   * @description 璺濈椤堕儴鐨勫亸绉婚噺锛坧x锛?
   * @default 20
   */
  offset?: number

  /**
   * @description 娑堟伅鐨勫敮涓€鏍囪瘑
   */
  id?: string

  /**
   * @description 鏄惁灏?message 浣滀负 HTML 鐗囨澶勭悊
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * @description 鏄惁灞呬腑鏄剧ず
   * @default false
   */
  center?: boolean

  /**
   * @description 鍏抽棴鏃剁殑鍥炶皟鍑芥暟
   */
  onClose?: () => void

  /**
   * @description z-index 灞傜骇
   */
  zIndex?: number

  /**
   * @description 鑷畾涔夌被鍚?
   */
  customClass?: string

  /**
   * @description 鏄惁鏀寔鍒嗙粍鍚堝苟锛堢浉鍚屽唴瀹圭殑娑堟伅鍙樉绀轰竴娆★級
   * @default false
   */
  grouping?: boolean

  /**
   * @description 閲嶅娆℃暟
   */
  repeatNum?: number

  /**
   * @description 娑堟伅灞曠ず浣嶇疆
   * @default 'top'
   */
  placement?: MessagePlacement

  /**
   * @description 涓婚瑕嗙洊鍙橀噺
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Message Emits 瀹氫箟
 */
export interface MessageEmits {
  (e: 'destroy'): void
}

/**
 * Message Slots 瀹氫箟
 */
export interface MessageSlots {
  /**
   * 娑堟伅鍐呭
   */
  default?: () => void

  /**
   * 鑷畾涔夊浘鏍?
   */
  icon?: () => void
}

/**
 * Message 暴露实例
 */
export interface MessageExpose {
  visible: Ref<boolean>
  close: () => void
}

/**
 * Message 瀹炰緥绫诲瀷
 */
export type MessageInstance = ComponentPublicInstance<MessageExpose>

/**
 * Message 閰嶇疆閫夐」
 */
export type MessageOptions = Partial<MessageProps>

/**
 * Message 澶勭悊鍑芥暟
 */
export interface MessageHandler {
  close: () => void
  el?: HTMLElement
  closed?: boolean
}

/**
 * Message 涓婁笅鏂囷紙鐢ㄤ簬瀹炰緥绠＄悊锛?
 */
export interface MessageContext {
  id: string
  props: MessageOptions
  handler: MessageHandler
  vnode: import('vue').VNode
}

/**
 * Message 鏂规硶绫诲瀷
 */
export type MessageFn = {
  (options: MessageOptions | string): MessageHandler
  success: (message: string | MessageOptions) => MessageHandler
  warning: (message: string | MessageOptions) => MessageHandler
  info: (message: string | MessageOptions) => MessageHandler
  error: (message: string | MessageOptions) => MessageHandler
  closeAll: () => void
}
