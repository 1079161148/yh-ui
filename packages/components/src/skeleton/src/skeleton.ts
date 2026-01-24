import type { ExtractPropTypes, PropType } from 'vue'

export const skeletonItemVariants = [
  'circle',
  'rect',
  'h1',
  'h3',
  'text',
  'caption',
  'button',
  'image'
] as const

export type SkeletonItemVariant = (typeof skeletonItemVariants)[number]

export const skeletonItemProps = {
  /** 骨架屏种类 */
  variant: {
    type: String as PropType<SkeletonItemVariant>,
    default: 'text'
  },
  /** 宽度 */
  width: {
    type: [String, Number] as PropType<string | number>
  },
  /** 高度 */
  height: {
    type: [String, Number] as PropType<string | number>
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 是否为圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 为 true 时，圆角半径为 0 */
  sharp: {
    type: Boolean,
    default: false
  },
  /** 重复次数 */
  repeat: {
    type: Number,
    default: 1
  }
} as const

export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

export const skeletonProps = {
  /** 是否显示加载中渲染 */
  loading: {
    type: Boolean,
    default: true
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 渲染的行数 */
  rows: {
    type: Number,
    default: 3
  },
  /** 渲染标题 */
  title: {
    type: Boolean,
    default: false
  },
  /** 渲染头衔 */
  avatar: {
    type: Boolean,
    default: false
  },
  /** 节流延迟渲染（ms） */
  throttle: {
    type: Number,
    default: 0
  },
  /** 自创高级：视口内才开始动画 */
  lazy: {
    type: Boolean,
    default: false
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
