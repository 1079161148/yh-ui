import type { ExtractPropTypes, PropType, CSSProperties, VNode, Component } from 'vue'

export type DrawerRenderContent = string | (() => VNode | string) | Component
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export const drawerProps = {
  /** 是否显示 */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** 标题 */
  title: {
    type: [String, Function, Object] as PropType<DrawerRenderContent>
  },
  /** 抽屉位置 */
  placement: {
    type: String as PropType<DrawerPlacement>,
    default: 'right'
  },
  /** 抽屉大小 (宽度或高度) */
  size: {
    type: [String, Number] as PropType<string | number>,
    default: '30%'
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
  /** z-index 层级 */
  zIndex: {
    type: Number
  },
  /** 挂载节点 */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  /** 是否显示 header */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 是否显示 footer */
  showFooter: {
    type: Boolean,
    default: false
  },
  /** 自定义类名 */
  customClass: String,
  /** 遮罩层自定义类名 */
  modalClass: String,
  /** 是否锁定视口滚动 */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /** 是否开启亚克力玻璃模式 */
  glass: {
    type: Boolean,
    default: false
  },
  /** 是否可调整大小 */
  resizable: {
    type: Boolean,
    default: false
  },
  /** 最小大小 (px) */
  minSize: {
    type: Number,
    default: 150
  },
  /** 最大大小 (px) */
  maxSize: {
    type: Number,
    default: 1000
  },
  /** 关闭前的钩子 */
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>
  },
  /** 标题样式 */
  titleStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 内容样式 */
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 页脚样式 */
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: true
  },
  /** 是否在指定容器内弹出 (绝对定位) */
  inner: {
    type: Boolean,
    default: false
  },
  /** 抽屉主体样式 */
  drawerStyle: [Object, String] as PropType<CSSProperties | string>,
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export const drawerEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  resize: (size: number) => typeof size === 'number'
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerEmits = typeof drawerEmits
