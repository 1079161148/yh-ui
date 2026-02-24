import type { ExtractPropTypes, PropType } from 'vue'

export const tooltipPlacements = [
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
] as const

export type TooltipPlacement = (typeof tooltipPlacements)[number]

export const tooltipTriggers = ['hover', 'click', 'focus', 'contextmenu', 'manual'] as const
export type TooltipTrigger = (typeof tooltipTriggers)[number]

export const tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ''
  },
  /** 出现位置 */
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'top'
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array] as PropType<TooltipTrigger | TooltipTrigger[]>,
    default: 'hover'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 消失延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 200
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8]
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 手动控制显示隐藏 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：dark / light 或自定义名称 */
  effect: {
    type: String,
    default: 'dark'
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2000
  },
  /** 手动控制动画名称 */
  transition: {
    type: String,
    default: 'yh-tooltip-fade'
  },
  /** 是否在隐藏时销毁 DOM 节点 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 是否作为 HTML 字符串渲染 content 属性 */
  rawContent: {
    type: Boolean,
    default: false
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto'
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 'none'
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ''
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String] as PropType<string | Record<string, unknown>>,
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ''
  },
  /** 箭头自定义样式 */
  arrowStyle: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 箭头容器自定义类名 */
  arrowWrapperClass: {
    type: String,
    default: ''
  },
  /** 箭头容器自定义样式 */
  arrowWrapperStyle: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export const tooltipEmits = {
  'update:visible': (visible: boolean) => typeof visible === 'boolean',
  show: () => true,
  hide: () => true
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipEmits = typeof tooltipEmits
