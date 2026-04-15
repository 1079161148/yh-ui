import type { ExtractPropTypes, PropType } from 'vue'

export interface LuckyPrize {
  id: string | number
  name: string
  image?: string
  color?: string
  textColor?: string
  [key: string]: unknown
}

export type LuckyDrawType = 'wheel' | 'grid'

export const luckyDrawProps = {
  /** 抽奖类型 */
  type: {
    type: String as PropType<LuckyDrawType>,
    default: 'wheel'
  },
  /** 奖品列表 */
  prizes: {
    type: Array as PropType<LuckyPrize[]>,
    default: () => []
  },
  /** 是否正在旋转 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 目标奖品 ID（由后端计算得出后传入） */
  targetId: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /** 转盘/九宫格内径尺寸 (px) */
  size: {
    type: [Number, String],
    default: 300
  },
  /** 旋转圈数 */
  rounds: {
    type: Number,
    default: 8
  },
  /** 动画时长 (ms) */
  duration: {
    type: Number,
    default: 4000
  },
  /** 按钮文本 */
  actionText: {
    type: String,
    default: ''
  },
  /** 是否隐藏按钮 */
  hideBtn: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type LuckyDrawProps = ExtractPropTypes<typeof luckyDrawProps>

export const luckyDrawEmits = {
  start: () => true,
  finish: (prize: LuckyPrize) => !!prize,
  click: (e: MouseEvent) => e instanceof MouseEvent
}

export type LuckyDrawEmits = typeof luckyDrawEmits

export interface LuckyDrawSlots {
  prize?: (props: { prize: LuckyPrize }) => unknown
  action?: () => unknown
}
