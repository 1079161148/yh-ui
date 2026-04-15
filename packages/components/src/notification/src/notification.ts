/**
 * Notification Types & Props
 * @description 閫氱煡缁勪欢绫诲瀷瀹氫箟
 */

import type { VNode, ComponentPublicInstance, Ref } from 'vue'

/**
 * 閫氱煡绫诲瀷
 */
export const notificationTypes = ['success', 'warning', 'info', 'error'] as const

export type NotificationType = (typeof notificationTypes)[number]

/**
 * 閫氱煡浣嶇疆
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
 * Notification Props 瀹氫箟
 */
export interface NotificationProps {
  /**
   * @description 鏍囬
   */
  title?: string

  /**
   * @description 閫氱煡鍐呭锛屽彲浠ユ槸瀛楃涓层€乂Node 鎴栬繑鍥?VNode 鐨勫嚱鏁?
   */
  message?: string | VNode | (() => VNode)

  /**
   * @description 閫氱煡绫诲瀷
   */
  type?: NotificationType

  /**
   * @description 鑷畾涔夊浘鏍?
   */
  icon?: string | VNode

  /**
   * @description 鏄惁鏄剧ず鍏抽棴鎸夐挳
   * @default true
   */
  showClose?: boolean

  /**
   * @description 鏄剧ず鏃堕棿锛堟绉掞級銆傝涓?0 鍒欎笉浼氳嚜鍔ㄥ叧闂?
   * @default 4500
   */
  duration?: number

  /**
   * @description 璺濈绐楀彛杈圭紭鐨勫亸绉婚噺锛坧x锛?
   * @default 16
   */
  offset?: number

  /**
   * @description 寮瑰嚭浣嶇疆
   * @default 'top-right'
   */
  position?: NotificationPosition

  /**
   * @description 閫氱煡鐨勫敮涓€鏍囪瘑
   */
  id?: string

  /**
   * @description 鏄惁灏?message 浣滀负 HTML 鐗囨澶勭悊
   * @default false
   */
  dangerouslyUseHTMLString?: boolean

  /**
   * @description 鍏抽棴鏃剁殑鍥炶皟鍑芥暟
   */
  onClose?: () => void

  /**
   * @description 鐐瑰嚮閫氱煡鏃剁殑鍥炶皟鍑芥暟
   */
  onClick?: () => void

  /**
   * @description z-index 灞傜骇
   */
  zIndex?: number

  /**
   * @description 鑷畾涔夌被鍚?
   */
  customClass?: string

  /**
   * @description 鍚屼竴浣嶇疆鏈€澶氭樉绀虹殑閫氱煡鏁伴噺
   */
  max?: number

  /**
   * @description 涓婚瑕嗙洊鍙橀噺
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Notification Emits 瀹氫箟
 */
export interface NotificationEmits {
  (e: 'destroy'): void
  (e: 'click'): void
}

/**
 * Notification Slots 瀹氫箟
 */
export interface NotificationSlots {
  /**
   * 閫氱煡鍐呭
   */
  default?: () => void

  /**
   * 鑷畾涔夊浘鏍?
   */
  icon?: () => void
}

/**
 * Notification 暴露实例
 */
export interface NotificationExpose {
  visible: Ref<boolean>
  close: () => void
}

/**
 * Notification 瀹炰緥绫诲瀷
 */
export type NotificationInstance = ComponentPublicInstance<NotificationExpose>

/**
 * Notification 閰嶇疆閫夐」
 */
export type NotificationOptions = Partial<NotificationProps>

/**
 * Notification 澶勭悊鍑芥暟
 */
export interface NotificationHandler {
  close: () => void
  el?: HTMLElement
}

/**
 * Notification 涓婁笅鏂囷紙鐢ㄤ簬瀹炰緥绠＄悊锛?
 */
export interface NotificationContext {
  id: string
  props: NotificationOptions
  handler: NotificationHandler
  vnode: import('vue').VNode
}

/**
 * Notification 鏂规硶绫诲瀷
 */
export type NotificationFn = {
  (options: NotificationOptions | string): NotificationHandler
  success: (title: string, message?: string | NotificationOptions) => NotificationHandler
  warning: (title: string, message?: string | NotificationOptions) => NotificationHandler
  info: (title: string, message?: string | NotificationOptions) => NotificationHandler
  error: (title: string, message?: string | NotificationOptions) => NotificationHandler
  closeAll: () => void
}
