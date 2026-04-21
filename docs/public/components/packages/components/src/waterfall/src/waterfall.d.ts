import type { ExtractPropTypes, PropType } from 'vue'
export interface WaterfallCols {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
export interface WaterfallItemBase {
  id?: string | number
  [key: string]: unknown
}
export declare const waterfallProps: {
  /** 数据源 */
  readonly items: {
    readonly type: PropType<unknown[]>
    readonly default: () => never[]
  }
  /** 列数，支持响应式对象 { xs, sm, md, lg, xl } */
  readonly cols: {
    readonly type: PropType<number | WaterfallCols>
    readonly default: 2
  }
  /** 间距 (px) */
  readonly gap: {
    readonly type: NumberConstructor
    readonly default: 16
  }
  /** 是否开启入场动画 */
  readonly animation: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 动画延迟基数 (ms) */
  readonly delay: {
    readonly type: NumberConstructor
    readonly default: 100
  }
  /** 节点的唯一标识字段 */
  readonly rowKey: {
    readonly type: StringConstructor
    readonly default: 'id'
  }
  /** 是否自动监听容器宽度变化 */
  readonly responsive: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否处于加载状态 */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 用于平衡布局的高度字段名 (若不提供则采用轮询算法) */
  readonly heightProperty: {
    readonly type: StringConstructor
    readonly default: 'height'
  }
  /** 内部图片的选择器，用于在图片加载后自动计算布局 */
  readonly imgSelector: {
    readonly type: StringConstructor
    readonly default: 'img'
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type WaterfallProps = ExtractPropTypes<typeof waterfallProps>
export interface WaterfallSlots<T = Record<string, unknown>> {
  default?: (props: { item: T; index: number; column: number }) => unknown
  loading?: () => unknown
  empty?: () => unknown
  'loading-overlay'?: () => unknown
}
export interface WaterfallExpose {
  layout: () => void
}
