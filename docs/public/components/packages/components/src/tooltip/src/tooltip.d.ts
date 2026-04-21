import type { ExtractPropTypes, PropType, StyleValue, Ref } from 'vue'
export declare const tooltipPlacements: readonly [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
]
export type TooltipPlacement = (typeof tooltipPlacements)[number]
export declare const tooltipTriggers: readonly ['hover', 'click', 'focus', 'contextmenu', 'manual']
export type TooltipTrigger = (typeof tooltipTriggers)[number]
export declare const tooltipProps: {
  /** 显示内容 */
  readonly content: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 出现位置 */
  readonly placement: {
    readonly type: PropType<TooltipPlacement>
    readonly default: 'top'
  }
  /** 触发方式 */
  readonly trigger: {
    readonly type: PropType<TooltipTrigger | TooltipTrigger[]>
    readonly default: 'hover'
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 出现延迟 (ms) */
  readonly showAfter: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 消失延迟 (ms) */
  readonly hideAfter: {
    readonly type: NumberConstructor
    readonly default: 200
  }
  /** 偏移量 [skidding, distance] */
  readonly offset: {
    readonly type: PropType<[number, number]>
    readonly default: () => number[]
  }
  /** 是否显示小三角 */
  readonly showArrow: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否允许鼠标进入提示框 */
  readonly interactive: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 手动控制显示隐藏 */
  readonly visible: {
    readonly type: BooleanConstructor
    readonly default: null
  }
  /** 提示框的主题：dark / light 或自定义名称 */
  readonly effect: {
    readonly type: StringConstructor
    readonly default: 'dark'
  }
  /** 是否跟随鼠标移动 (高级功能) */
  readonly followCursor: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 弹出层的自定义类名 */
  readonly popperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 挂载节点 */
  readonly teleported: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** z-index */
  readonly zIndex: {
    readonly type: NumberConstructor
    readonly default: 2000
  }
  /** 手动控制动画名称 */
  readonly transition: {
    readonly type: StringConstructor
    readonly default: 'yh-tooltip-fade'
  }
  /** 是否在隐藏时销毁 DOM 节点 */
  readonly persistent: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否作为 HTML 字符串渲染 content 属性 */
  readonly rawContent: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 弹出层宽度 */
  readonly width: {
    readonly type: PropType<string | number>
    readonly default: 'auto'
  }
  /** 弹出层最大高度 */
  readonly maxHeight: {
    readonly type: PropType<string | number>
    readonly default: 'none'
  }
  /** 内容是否可滚动 */
  readonly scrollable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 弹出内容自定义类名 */
  readonly contentClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 弹出内容自定义样式 */
  readonly contentStyle: {
    readonly type: PropType<StyleValue>
    readonly default: () => {}
  }
  /** 箭头自定义类名 */
  readonly arrowClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 箭头自定义样式 */
  readonly arrowStyle: {
    readonly type: PropType<StyleValue>
    readonly default: () => {}
  }
  /** 弹出层自定义样式 */
  readonly popperStyle: {
    readonly type: PropType<StyleValue>
    readonly default: () => {}
  }
  /** 箭头容器自定义类名 */
  readonly arrowWrapperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 箭头容器自定义样式 */
  readonly arrowWrapperStyle: {
    readonly type: PropType<StyleValue>
    readonly default: () => {}
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const tooltipEmits: {
  'update:visible': (visible: boolean) => boolean
  show: () => boolean
  hide: () => boolean
}
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipEmits = typeof tooltipEmits
export interface TooltipSlots {
  default?: () => unknown
  content?: () => unknown
}
export interface TooltipExpose {
  updatePosition: () => Promise<void> | void
  visible: Ref<boolean>
  triggerRef: Ref<HTMLElement | undefined>
  popperRef: Ref<HTMLElement | undefined>
}
