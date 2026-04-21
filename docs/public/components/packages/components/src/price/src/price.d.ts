import type { ExtractPropTypes, PropType } from 'vue'
export declare const priceProps: {
  /** 价格数值 */
  value: {
    type: (StringConstructor | NumberConstructor)[]
    default: number
  }
  /** 最大价格数值（区间模式） */
  maxValue: {
    type: (StringConstructor | NumberConstructor)[]
    default: undefined
  }
  /** 货币符号 */
  symbol: {
    type: StringConstructor
    default: string
  }
  /** 符号位置 */
  symbolPosition: {
    type: PropType<'before' | 'after'>
    default: string
  }
  /** 小数位 */
  precision: {
    type: NumberConstructor
    default: number
  }
  /** 是否划线（原价场景） */
  lineThrough: {
    type: BooleanConstructor
    default: boolean
  }
  /** 尺寸 */
  size: {
    type: PropType<'small' | 'default' | 'large' | string>
    default: string
  }
  /** 是否分拆字号（整数大、小数小） */
  split: {
    type: BooleanConstructor
    default: boolean
  }
  /** 小数部分字号比例（0-1） */
  decimalScale: {
    type: NumberConstructor
    default: number
  }
  /** 千分符 */
  thousandth: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否加粗 */
  bold: {
    type: BooleanConstructor
    default: boolean
  }
  /** 前缀文本 */
  prefix: {
    type: StringConstructor
    default: string
  }
  /** 后缀文本 */
  suffix: {
    type: StringConstructor
    default: string
  }
  /** 价格单位 (如 /件, /kg) */
  unit: {
    type: StringConstructor
    default: string
  }
  /** 原价 (用于划线对比展示) */
  deleteValue: {
    type: (StringConstructor | NumberConstructor)[]
    default: undefined
  }
  /** 原价标签 (如 吊牌价) */
  deleteLabel: {
    type: StringConstructor
    default: string
  }
  /** 价格标签 (如 会员价) */
  tag: {
    type: StringConstructor
    default: string
  }
  /** 标签类型 */
  tagType: {
    type: PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
    default: string
  }
  /** 是否开开启约等于符号 (~) */
  approx: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否开启价格动画 */
  animated: {
    type: BooleanConstructor
    default: boolean
  }
  /** 渐变色配置 (如 ['#FF4D4F', '#FF7875']) */
  gradient: {
    type: PropType<boolean | string[]>
    default: boolean
  }
  /** 主题覆盖 */
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
}
export type PriceProps = ExtractPropTypes<typeof priceProps>
export interface PriceSlots {
  tag?: () => unknown
  prefix?: () => unknown
  symbol?: () => unknown
  unit?: () => unknown
  suffix?: () => unknown
}
