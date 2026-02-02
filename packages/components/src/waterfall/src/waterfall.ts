import type { ExtractPropTypes, PropType } from 'vue'

export const waterfallProps = {
  /** 数据源 */
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  /** 列数，支持响应式对象 { xs, sm, md, lg, xl } */
  cols: {
    type: [Number, Object] as PropType<
      number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
    >,
    default: 2
  },
  /** 间距 (px) */
  gap: {
    type: Number,
    default: 16
  },
  /** 是否开启入场动画 */
  animation: {
    type: Boolean,
    default: true
  },
  /** 动画延迟基数 (ms) */
  delay: {
    type: Number,
    default: 100
  },
  /** 节点的唯一标识字段 */
  rowKey: {
    type: String,
    default: 'id'
  },
  /** 是否自动监听容器宽度变化 */
  responsive: {
    type: Boolean,
    default: true
  },
  /** 是否处于加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 用于平衡布局的高度字段名 (若不提供则采用轮询算法) */
  heightProperty: {
    type: String,
    default: 'height'
  },
  /** 内部图片的选择器，用于在图片加载后自动计算布局 */
  imgSelector: {
    type: String,
    default: 'img'
  }
} as const

export type WaterfallProps = ExtractPropTypes<typeof waterfallProps>
