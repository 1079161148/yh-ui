import type { ExtractPropTypes, PropType, CSSProperties, VNode, Component } from 'vue'
export type DrawerRenderContent = string | (() => VNode | string) | Component
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
export declare const drawerProps: {
  /** 是否显示 */
  readonly modelValue: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 标题 */
  readonly title: {
    readonly type: PropType<DrawerRenderContent>
  }
  /** 抽屉位置 */
  readonly placement: {
    readonly type: PropType<DrawerPlacement>
    readonly default: 'right'
  }
  /** 抽屉大小 (宽度或高度) */
  readonly size: {
    readonly type: PropType<string | number>
    readonly default: '30%'
  }
  /** 是否显示遮罩层 */
  readonly modal: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 点击遮罩层是否关闭 */
  readonly closeOnClickModal: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 按下 ESC 是否关闭 */
  readonly closeOnPressEscape: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否显示关闭按钮 */
  readonly showClose: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 自定义关闭图标 */
  readonly closeIcon: {
    readonly type: StringConstructor
    readonly default: 'close'
  }
  /** 是否在关闭时销毁内容 */
  readonly destroyOnClose: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** z-index 层级 */
  readonly zIndex: {
    readonly type: NumberConstructor
  }
  /** 挂载节点 */
  readonly teleportTo: {
    readonly type: PropType<string | HTMLElement>
    readonly default: 'body'
  }
  /** 是否显示 header */
  readonly showHeader: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否显示 footer */
  readonly showFooter: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 自定义类名 */
  readonly customClass: StringConstructor
  /** 遮罩层自定义类名 */
  readonly modalClass: StringConstructor
  /** 是否锁定视口滚动 */
  readonly lockScroll: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否开启亚克力玻璃模式 */
  readonly glass: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否可调整大小 */
  readonly resizable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 最小大小 (px) */
  readonly minSize: {
    readonly type: NumberConstructor
    readonly default: 150
  }
  /** 最大大小 (px) */
  readonly maxSize: {
    readonly type: NumberConstructor
    readonly default: 1000
  }
  /** 关闭前的钩子 */
  readonly beforeClose: {
    readonly type: PropType<(done: () => void) => void>
  }
  /** 标题样式 */
  readonly titleStyle: PropType<CSSProperties | string>
  /** 内容样式 */
  readonly contentStyle: PropType<CSSProperties | string>
  /** 页脚样式 */
  readonly footerStyle: PropType<CSSProperties | string>
  /** 是否显示圆角 */
  readonly round: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否在指定容器内弹出 (绝对定位) */
  readonly inner: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 抽屉主体样式 */
  readonly drawerStyle: PropType<CSSProperties | string>
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const drawerEmits: {
  'update:modelValue': (value: boolean) => boolean
  open: () => boolean
  opened: () => boolean
  close: () => boolean
  closed: () => boolean
  resize: (size: number) => boolean
}
export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerEmits = typeof drawerEmits
export interface DrawerSlots {
  default?: () => unknown
  header?: () => unknown
  title?: () => unknown
  footer?: () => unknown
  'close-icon'?: () => unknown
}
export interface DrawerExpose {
  drawerRef: import('vue').Ref<HTMLElement | null>
  handleClose: (isClickModal?: boolean) => void
}
