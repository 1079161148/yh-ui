import type { ExtractPropTypes, PropType } from 'vue'
export declare const skeletonItemVariants: readonly [
  'circle',
  'rect',
  'h1',
  'h3',
  'text',
  'caption',
  'button',
  'image'
]
export type SkeletonItemVariant = (typeof skeletonItemVariants)[number]
export declare const skeletonItemProps: {
  /** 骨架屏种类 */
  readonly variant: {
    readonly type: PropType<SkeletonItemVariant>
    readonly default: 'text'
  }
  /** 宽度 */
  readonly width: {
    readonly type: PropType<string | number>
  }
  /** 高度 */
  readonly height: {
    readonly type: PropType<string | number>
  }
  /** 是否开启闪烁动画 */
  readonly animated: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否为圆角 */
  readonly round: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 为 true 时，圆角半径为 0 */
  readonly sharp: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 重复次数 */
  readonly repeat: {
    readonly type: NumberConstructor
    readonly default: 1
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>
export declare const skeletonProps: {
  /** 是否显示加载中渲染 */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否开启闪烁动画 */
  readonly animated: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 渲染的行数 */
  readonly rows: {
    readonly type: NumberConstructor
    readonly default: 3
  }
  /** 渲染标题 */
  readonly title: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 渲染头衔 */
  readonly avatar: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 节流延迟渲染（ms） */
  readonly throttle: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 自创高级：视口内才开始动画 */
  readonly lazy: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export interface SkeletonSlots {
  template?: () => unknown
  default?: () => unknown
}
