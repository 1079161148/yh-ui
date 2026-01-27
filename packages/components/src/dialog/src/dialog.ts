import type { ExtractPropTypes, PropType, CSSProperties, VNode, Component } from 'vue'

export type RenderContent = string | (() => VNode | string) | Component

export const dialogProps = {
  /** 是否显示 */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** 标题 */
  title: {
    type: [String, Function, Object] as PropType<RenderContent>
  },
  /** 是否显示 icon */
  showIcon: {
    type: Boolean,
    default: true
  },
  /** 整体样式 */
  style: {
    type: [String, Object] as PropType<string | CSSProperties>
  },
  /** 标题类名 */
  titleClass: String,
  /** 标题样式 */
  titleStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 动画起源 */
  transformOrigin: {
    type: String as PropType<'mouse' | 'center'>,
    default: 'mouse'
  },
  /** 对话框类型 */
  type: {
    type: String as PropType<'error' | 'success' | 'warning' | 'info' | 'default'>,
    default: 'default'
  },
  /** 是否显示 loading 状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 对话框内容 */
  content: {
    type: [String, Function, Object] as PropType<RenderContent>
  },
  /** 内容类名 */
  contentClass: String,
  /** 内容样式 */
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 操作区域内容（渲染函数） */
  action: {
    type: [Function, Object] as PropType<() => VNode | Component>
  },
  /** 操作区域类名 */
  actionClass: String,
  /** 操作区域样式 */
  actionStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 是否自动聚焦第一个可聚焦元素 */
  autoFocus: {
    type: Boolean,
    default: true
  },
  /** 宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '50%'
  },
  /** 距离顶部距离 */
  top: {
    type: String,
    default: '15vh'
  },
  /** 是否全屏 */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /** 是否垂直居中显示 */
  alignCenter: {
    type: Boolean,
    default: false
  },
  /** 是否整体居中 (标题、内容、底部都居中) */
  center: {
    type: Boolean,
    default: false
  },
  /** 是否开启亚克力玻璃模式 */
  glass: {
    type: Boolean,
    default: false
  },
  /** 是否开启拖拽功能 */
  draggable: {
    type: Boolean,
    default: false
  },
  /** 是否锁定视口滚动 */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /** 是否显示遮罩层 */
  modal: {
    type: Boolean,
    default: true
  },
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  /** 按下 ESC 是否关闭 */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true
  },
  /** 自定义关闭图标 */
  closeIcon: {
    type: String,
    default: 'close'
  },
  /** 是否在关闭时销毁内容 */
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  /** 是否允许拖拽超出边界 */
  overflow: {
    type: Boolean,
    default: false
  },
  /** 是否显示默认页脚按钮 */
  showFooter: {
    type: Boolean,
    default: true
  },
  /** 取消按钮文案 */
  cancelText: {
    type: String,
    default: '取消'
  },
  /** 确定按钮文案 */
  confirmText: {
    type: String,
    default: '确定'
  },
  /** 遮罩层自定义类名 */
  modalClass: String,
  /** 对话框自定义类名 */
  customClass: String,
  /** z-index 层级 */
  zIndex: {
    type: Number,
    default: 2000
  },
  /** 关闭前的钩子 */
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>
  },
  /** 挂载节点 */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  /** 标题对齐方式 (开启 center 后失效) */
  headerAlignCenter: {
    type: Boolean,
    default: false
  },
  /** 标题对齐方式 */
  headerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  /** 内容对齐方式 */
  contentAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  /** 底部对齐方式 (开启 center 后失效) */
  footerAlignCenter: {
    type: Boolean,
    default: false
  },
  /** 底部按钮对齐方式 */
  footerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right'
  },
  /** 是否交换确认和取消按钮的位置 */
  swapFooterButtons: {
    type: Boolean,
    default: false
  }
} as const

export const dialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  confirm: () => true,
  cancel: () => true,
  dragStart: (evt: MouseEvent) => evt instanceof MouseEvent,
  dragMove: (evt: MouseEvent) => evt instanceof MouseEvent,
  dragEnd: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
