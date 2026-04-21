import type { ExtractPropTypes, PropType, CSSProperties, VNode, Component } from 'vue'
export type RenderContent = string | (() => VNode | string) | Component
export declare const dialogProps: {
  /** 是否显示 */
  readonly modelValue: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 标题 */
  readonly title: {
    readonly type: PropType<RenderContent>
  }
  /** 是否显示 icon */
  readonly showIcon: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 整体样式 */
  readonly style: {
    readonly type: PropType<string | CSSProperties>
  }
  /** 标题类名 */
  readonly titleClass: StringConstructor
  /** 标题样式 */
  readonly titleStyle: PropType<CSSProperties | string>
  /** 动画起源 */
  readonly transformOrigin: {
    readonly type: PropType<'mouse' | 'center'>
    readonly default: 'mouse'
  }
  /** 对话框类型 */
  readonly type: {
    readonly type: PropType<'error' | 'success' | 'warning' | 'info' | 'default'>
    readonly default: 'default'
  }
  /** 是否显示 loading 状态 */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 对话框内容 */
  readonly content: {
    readonly type: PropType<RenderContent>
  }
  /** 内容类名 */
  readonly contentClass: StringConstructor
  /** 内容样式 */
  readonly contentStyle: PropType<CSSProperties | string>
  /** 操作区域内容（渲染函数） */
  readonly action: {
    readonly type: PropType<() => VNode | Component>
  }
  /** 操作区域类名 */
  readonly actionClass: StringConstructor
  /** 操作区域样式 */
  readonly actionStyle: PropType<CSSProperties | string>
  /** 是否自动聚焦第一个可聚焦元素 */
  readonly autoFocus: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 宽度 */
  readonly width: {
    readonly type: PropType<string | number>
    readonly default: '50%'
  }
  /** 距离顶部距离 */
  readonly top: {
    readonly type: StringConstructor
    readonly default: '15vh'
  }
  /** 是否全屏 */
  readonly fullscreen: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否垂直居中显示 */
  readonly alignCenter: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否整体居中 (标题、内容、底部都居中) */
  readonly center: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否开启亚克力玻璃模式 */
  readonly glass: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否开启拖拽功能 */
  readonly draggable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否锁定视口滚动 */
  readonly lockScroll: {
    readonly type: BooleanConstructor
    readonly default: true
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
  /** 是否允许拖拽超出边界 */
  readonly overflow: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否显示默认页脚按钮 */
  readonly showFooter: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  readonly cancelText: {
    readonly type: StringConstructor
    readonly default: ''
  }
  readonly confirmText: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 遮罩层自定义类名 */
  readonly modalClass: StringConstructor
  /** 对话框自定义类名 */
  readonly customClass: StringConstructor
  /** z-index 层级 */
  readonly zIndex: {
    readonly type: NumberConstructor
    readonly default: 2000
  }
  /** 关闭前的钩子 */
  readonly beforeClose: {
    readonly type: PropType<(done: () => void) => void>
  }
  /** 挂载节点 */
  readonly teleportTo: {
    readonly type: PropType<string | HTMLElement>
    readonly default: 'body'
  }
  /** 标题对齐方式 (开启 center 后失效) */
  readonly headerAlignCenter: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 标题对齐方式 */
  readonly headerAlign: {
    readonly type: PropType<'left' | 'center' | 'right'>
    readonly default: 'left'
  }
  /** 内容对齐方式 */
  readonly contentAlign: {
    readonly type: PropType<'left' | 'center' | 'right'>
    readonly default: 'left'
  }
  /** 底部对齐方式 (开启 center 后失效) */
  readonly footerAlignCenter: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 底部按钮对齐方式 */
  readonly footerAlign: {
    readonly type: PropType<'left' | 'center' | 'right'>
    readonly default: 'right'
  }
  /** 是否交换确认和取消按钮的位置 */
  readonly swapFooterButtons: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const dialogEmits: {
  'update:modelValue': (value: boolean) => boolean
  open: () => boolean
  opened: () => boolean
  close: () => boolean
  closed: () => boolean
  confirm: () => boolean
  cancel: () => boolean
  dragStart: (evt: MouseEvent) => boolean
  dragMove: (evt: MouseEvent) => boolean
  dragEnd: (evt: MouseEvent) => boolean
}
export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
export interface DialogSlots {
  default?: () => unknown
  header?: () => unknown
  title?: () => unknown
  footer?: () => unknown
}
export interface DialogExpose {
  visible: import('vue').Ref<boolean>
  dialogRef: import('vue').Ref<HTMLElement | null>
  handleClose: () => void
  handleCancel: () => void
  handleConfirm: () => void
}
