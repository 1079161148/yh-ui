import type { ExtractPropTypes, PropType } from 'vue'

/** 提交结算栏按钮类型 */
export type SubmitBarButtonType = 'primary' | 'danger' | 'warning' | 'success' | 'default'

export const submitBarProps = {
  /** 金额（分或元，由 centUnit 决定） */
  price: {
    type: Number,
    default: 0
  },
  /** 货币单位符号 */
  currency: {
    type: String,
    default: '¥'
  },
  /** price 是否以分为单位（true 时自动 ÷100 显示） */
  centUnit: {
    type: Boolean,
    default: false
  },
  /** 小数位数 */
  decimalLength: {
    type: Number,
    default: 2
  },
  /** 按钮文字 */
  buttonText: {
    type: String,
    default: ''
  },
  /** 按钮类型 */
  buttonType: {
    type: String as PropType<SubmitBarButtonType>,
    default: 'primary'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 按钮加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否显示全选复选框 */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /** 全选状态（支持 v-model:checked） */
  checked: {
    type: Boolean,
    default: false
  },
  /** 部分选中（半选态） */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /** 金额标签前缀文本，如 "合计：" */
  label: {
    type: String,
    default: ''
  },
  /** 已选件数，为 0 时不显示 */
  selectedCount: {
    type: Number,
    default: 0
  },
  /** 金额上方的提示文字，如 "含运费" */
  tip: {
    type: String,
    default: ''
  },
  /** 是否安全区域适配（iPhoneX 等） */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type SubmitBarProps = ExtractPropTypes<typeof submitBarProps>

export const submitBarEmits = {
  submit: (e: MouseEvent) => e instanceof MouseEvent,
  'update:checked': (val: boolean) => typeof val === 'boolean',
  /** 全选复选框切换 */
  'check-change': (val: boolean) => typeof val === 'boolean'
}

export type SubmitBarEmits = typeof submitBarEmits
