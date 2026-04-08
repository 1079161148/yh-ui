export const couponCardProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 副标题/描述 */
  description: {
    type: String,
    default: ""
  },
  /** 优惠金额/文本 */
  amount: {
    type: [String, Number],
    default: ""
  },
  /** 货币符号 */
  symbol: {
    type: String,
    default: "\xA5"
  },
  /** 门槛描述/金额 */
  threshold: {
    type: [String, Number],
    default: ""
  },
  /** 有效期描述 */
  validPeriod: {
    type: String,
    default: ""
  },
  /** 状态 */
  status: {
    type: String,
    default: "available"
  },
  /** 按钮文本 */
  actionText: {
    type: String,
    default: ""
  },
  /** 角标文本（如：即将过期、神券） */
  badge: {
    type: String,
    default: ""
  },
  /** 角标类型（danger/warning/primary/success） */
  badgeType: {
    type: String,
    default: "danger"
  },
  /** 疯抢进度百分比 (0-100) */
  percent: {
    type: Number,
    default: void 0
  },
  /** 进度提示文案（如：已抢 80%） */
  percentText: {
    type: String,
    default: ""
  },
  /** 底部使用规则说明（支持折叠面板展开） */
  rules: {
    type: String,
    default: ""
  },
  /** 底部使用规则展示的标题 */
  ruleTitle: {
    type: String,
    default: ""
  },
  /** 是否显示选择框（多选场景） */
  selectable: {
    type: Boolean,
    default: false
  },
  /** 是否选中 */
  selected: {
    type: Boolean,
    default: false
  },
  /** 背景镂空样式：circle (半圆), indent (下凹), scallop (扇形) */
  variant: {
    type: String,
    default: "circle"
  },
  /** 是否禁用过期的显示效果 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
export const couponCardEmits = {
  click: (e) => e instanceof MouseEvent,
  action: (e) => e instanceof MouseEvent,
  "update:selected": (val) => typeof val === "boolean"
};
