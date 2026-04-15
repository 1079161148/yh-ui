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
export declare const luckyDrawProps: {
  /** 抽奖类型 */
  type: {
    type: PropType<LuckyDrawType>
    default: string
  }
  /** 奖品列表 */
  prizes: {
    type: PropType<LuckyPrize[]>
    default: () => never[]
  }
  /** 是否正在旋转 */
  loading: {
    type: BooleanConstructor
    default: boolean
  }
  /** 目标奖品 ID（由后端计算得出后传入） */
  targetId: {
    type: PropType<string | number>
    default: string
  }
  /** 转盘/九宫格内径尺寸 (px) */
  size: {
    type: (StringConstructor | NumberConstructor)[]
    default: number
  }
  /** 旋转圈数 */
  rounds: {
    type: NumberConstructor
    default: number
  }
  /** 动画时长 (ms) */
  duration: {
    type: NumberConstructor
    default: number
  }
  /** 按钮文本 */
  actionText: {
    type: StringConstructor
    default: string
  }
  /** 是否隐藏按钮 */
  hideBtn: {
    type: BooleanConstructor
    default: boolean
  }
  /** 主题覆盖 */
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
}
export type LuckyDrawProps = ExtractPropTypes<typeof luckyDrawProps>
export declare const luckyDrawEmits: {
  start: () => boolean
  finish: (prize: LuckyPrize) => boolean
  click: (e: MouseEvent) => boolean
}
export type LuckyDrawEmits = typeof luckyDrawEmits
export interface LuckyDrawSlots {
  prize?: (props: { prize: LuckyPrize }) => unknown
  action?: () => unknown
}
