import type { VNode, Component, AppContext } from 'vue'

export type MessageBoxType = 'alert' | 'confirm' | 'prompt'
export type MessageBoxData = string | number | boolean
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'
export type MessageBoxState = 'info' | 'success' | 'warning' | 'error'

export interface MessageBoxInstance {
  open: (options: MessageBoxOptions) => void
  close: () => void
  setCallback: (cb: (res: { action: MessageBoxAction; value?: string }) => void) => void
  confirmLoading: boolean
  cancelLoading: boolean
}

export interface MessageBoxOptions {
  /** 标题 */
  title?: string
  /** 内容 */
  message?: string | VNode | (() => VNode)
  /** 类型 (alert, confirm, prompt) */
  type?: MessageBoxType
  /** 是否将 message 渲染为 HTML */
  dangerouslyUseHTMLString?: boolean
  /** 显示图标类型: info, success, warning, error */
  iconType?: MessageBoxState
  /** 自定义图标组件或名称 */
  icon?: string | Component | VNode
  /** 确认按钮文字 */
  confirmButtonText?: string
  /** 取消按钮文字 */
  cancelButtonText?: string
  /** 是否显示取消按钮 */
  showCancelButton?: boolean
  /** 是否显示确认按钮 */
  showConfirmButton?: boolean
  /** 是否显示右上角关闭按钮 */
  showClose?: boolean
  /** 点击遮罩层是否关闭 */
  closeOnClickModal?: boolean
  /** 按下 ESC 是否关闭 */
  closeOnPressEscape?: boolean
  /** 是否锁定滚动条 */
  lockScroll?: boolean
  /** 是否开启亚克力玻璃模式 */
  glass?: boolean
  /** 是否将内容居中排列 */
  center?: boolean
  /** 是否采用圆角按钮 */
  roundButton?: boolean
  /** 是否支持拖拽弹窗 */
  draggable?: boolean
  /** 是否防止拖拽超出可视区域 (默认: true) */
  draggableBoundary?: boolean
  /** 弹窗宽度 */
  width?: string | number
  /** 自定义类名 */
  customClass?: string
  /** 输入框占位符 (仅 prompt 模式) */
  inputPlaceholder?: string
  /** 输入框初始值 (仅 prompt 模式) */
  inputValue?: string
  /** 输入框校验正则表达式 (仅 prompt 模式) */
  inputPattern?: RegExp
  /** 输入框自定义校验函数 (仅 prompt 模式) */
  inputValidator?: (value: string) => boolean | string
  /** 校验错误提示 (仅 prompt 模式) */
  inputErrorMessage?: string
  /** 关闭前的钩子 */
  beforeClose?: (action: MessageBoxAction, instance: MessageBoxInstance, done: () => void) => void
  /** 关闭后的回调 */
  callback?: (action: MessageBoxAction, instance: MessageBoxInstance) => void
  /** 应用上下文 (用于继承全局配置/组件) */
  appContext?: AppContext | null
  /** 是否在打开时自动获取焦点 (默认: true) */
  autofocus?: boolean
  /** 设置组件的根元素 (默认: document.body) */
  appendTo?: string | HTMLElement
  /** 确认按钮是否显示加载中状态 */
  confirmButtonLoading?: boolean
  /** 取消按钮是否显示加载中状态 */
  cancelButtonLoading?: boolean
  /** 自定义加载图标 */
  loadingIcon?: string | Component | VNode
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface MessageBoxHandler {
  (
    options: MessageBoxOptions | string | VNode,
    appContext?: AppContext | null
  ): Promise<{ value?: string; action: MessageBoxAction }>
  alert: (
    message: string | VNode,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions,
    appContext?: AppContext | null
  ) => Promise<void>
  confirm: (
    message: string | VNode,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions,
    appContext?: AppContext | null
  ) => Promise<MessageBoxAction>
  prompt: (
    message: string | VNode,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions,
    appContext?: AppContext | null
  ) => Promise<{ value: string; action: 'confirm' }>
  setDefaults: (defaults: MessageBoxOptions) => void
}
