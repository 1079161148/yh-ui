const priceProps = {
  /** 价格数值 */
  value: {
    type: [Number, String],
    default: 0
  },
  /** 最大价格数值（区间模式） */
  maxValue: {
    type: [Number, String],
    default: void 0
  },
  /** 货币符号 */
  symbol: {
    type: String,
    default: '\xA5'
  },
  /** 符号位置 */
  symbolPosition: {
    type: String,
    default: 'before'
  },
  /** 小数位 */
  precision: {
    type: Number,
    default: 2
  },
  /** 是否划线（原价场景） */
  lineThrough: {
    type: Boolean,
    default: false
  },
  /** 尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 是否分拆字号（整数大、小数小） */
  split: {
    type: Boolean,
    default: true
  },
  /** 小数部分字号比例（0-1） */
  decimalScale: {
    type: Number,
    default: 0.8
  },
  /** 千分符 */
  thousandth: {
    type: Boolean,
    default: true
  },
  /** 是否加粗 */
  bold: {
    type: Boolean,
    default: false
  },
  /** 前缀文本 */
  prefix: {
    type: String,
    default: ''
  },
  /** 后缀文本 */
  suffix: {
    type: String,
    default: ''
  },
  /** 价格单位 (如 /件, /kg) */
  unit: {
    type: String,
    default: ''
  },
  /** 原价 (用于划线对比展示) */
  deleteValue: {
    type: [Number, String],
    default: void 0
  },
  /** 原价标签 (如 吊牌价) */
  deleteLabel: {
    type: String,
    default: ''
  },
  /** 价格标签 (如 会员价) */
  tag: {
    type: String,
    default: ''
  },
  /** 标签类型 */
  tagType: {
    type: String,
    default: 'danger'
  },
  /** 是否开开启约等于符号 (~) */
  approx: {
    type: Boolean,
    default: false
  },
  /** 是否开启价格动画 */
  animated: {
    type: Boolean,
    default: false
  },
  /** 渐变色配置 (如 ['#FF4D4F', '#FF7875']) */
  gradient: {
    type: [Boolean, Array],
    default: false
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
}
export { priceProps }
