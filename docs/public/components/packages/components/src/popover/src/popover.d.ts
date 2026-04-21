import type { ExtractPropTypes, PropType, StyleValue, Ref } from 'vue'
import type { Placement } from '@floating-ui/dom'
export declare const popoverTriggers: readonly ['hover', 'click', 'focus', 'contextmenu']
export type PopoverTrigger = (typeof popoverTriggers)[number]
export declare const popoverProps: {
  /** 标题 */
  readonly title: StringConstructor
  /** 描述文字 (对齐 Popconfirm) */
  readonly description: StringConstructor
  /** 图标名称 (对齐 Popconfirm) */
  readonly icon: StringConstructor
  /** 图标颜色 */
  readonly iconColor: StringConstructor
  /** 内容文字 (也可通过默认插槽设置复杂内容) */
  readonly content: StringConstructor
  /** 弹出位置 */
  readonly placement: {
    readonly type: PropType<Placement>
    readonly default: 'bottom'
  }
  /** 触发方式，支持数组 */
  readonly trigger: {
    readonly type: PropType<PopoverTrigger | PopoverTrigger[]>
    readonly default: 'click'
  }
  /** 手动控制可见性 */
  readonly visible: {
    readonly type: PropType<boolean | null>
    readonly default: null
  }
  /** 提示框的主题：light / dark */
  readonly effect: {
    readonly type: PropType<'light' | 'dark' | string>
    readonly default: 'light'
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否显示小三角 */
  readonly showArrow: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 出现延迟 (ms) */
  readonly showAfter: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 隐藏延迟 (ms) */
  readonly hideAfter: {
    readonly type: NumberConstructor
    readonly default: 100
  }
  /** 偏移量 [横向, 纵向] */
  readonly offset: {
    readonly type: PropType<[number, number]>
    readonly default: () => number[]
  }
  /** 弹出层宽度 */
  readonly width: {
    readonly type: PropType<string | number>
    readonly default: 'auto'
  }
  /** 最大高度 (配合 scrollable 使用) */
  readonly maxHeight: {
    readonly type: PropType<string | number>
    readonly default: 'none'
  }
  /** 内容是否可滚动 */
  readonly scrollable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否允许鼠标进入提示框 */
  readonly interactive: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否跟随触发器宽度 */
  readonly matchTriggerWidth: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** z-index 层级 */
  readonly zIndex: {
    readonly type: NumberConstructor
    readonly default: 2003
  }
  /** 是否挂载至 body */
  readonly teleported: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 弹出层自定义类名 */
  readonly popperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 弹出层自定义样式 */
  readonly popperStyle: {
    readonly type: PropType<StyleValue>
    readonly default: () => {}
  }
  /** 动画名称 */
  readonly transition: {
    readonly type: StringConstructor
    readonly default: 'yh-popover-fade'
  }
  /** 是否持久化 DOM (隐藏时是否销毁) */
  readonly persistent: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const popoverEmits: {
  'update:visible': (visible: boolean) => boolean
  show: () => boolean
  hide: () => boolean
}
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverEmits = typeof popoverEmits
export interface PopoverSlots {
  default?: () => unknown
  header?: () => unknown
  content?: () => unknown
  icon?: () => unknown
  footer?: () => unknown
}
export interface PopoverExpose {
  toggle: (val: boolean) => boolean
  visible: Ref<boolean>
}
