import type { ExtractPropTypes, PropType } from 'vue'
/** 提交结算栏按钮类型 */
export type SubmitBarButtonType = 'primary' | 'danger' | 'warning' | 'success' | 'default'
export declare const submitBarProps: {
  /** 金额（分或元，由 centUnit 决定） */
  price: {
    type: NumberConstructor
    default: number
  }
  /** 货币单位符号 */
  currency: {
    type: StringConstructor
    default: string
  }
  /** price 是否以分为单位（true 时自动 ÷100 显示） */
  centUnit: {
    type: BooleanConstructor
    default: boolean
  }
  /** 小数位数 */
  decimalLength: {
    type: NumberConstructor
    default: number
  }
  /** 按钮文字 */
  buttonText: {
    type: StringConstructor
    default: string
  }
  /** 按钮类型 */
  buttonType: {
    type: PropType<SubmitBarButtonType>
    default: string
  }
  /** 是否禁用 */
  disabled: {
    type: BooleanConstructor
    default: boolean
  }
  /** 按钮加载中 */
  loading: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否显示全选复选框 */
  showCheckbox: {
    type: BooleanConstructor
    default: boolean
  }
  /** 全选状态（支持 v-model:checked） */
  checked: {
    type: BooleanConstructor
    default: boolean
  }
  /** 部分选中（半选态） */
  indeterminate: {
    type: BooleanConstructor
    default: boolean
  }
  /** 金额标签前缀文本，如 "合计：" */
  label: {
    type: StringConstructor
    default: string
  }
  /** 已选件数，为 0 时不显示 */
  selectedCount: {
    type: NumberConstructor
    default: number
  }
  /** 金额上方的提示文字，如 "含运费" */
  tip: {
    type: StringConstructor
    default: string
  }
  /** 是否安全区域适配（iPhoneX 等） */
  safeAreaInsetBottom: {
    type: BooleanConstructor
    default: boolean
  }
  /** 主题变量覆盖 */
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
}
export type SubmitBarProps = ExtractPropTypes<typeof submitBarProps>
export declare const submitBarEmits: {
  submit: (e: MouseEvent) => boolean
  'update:checked': (val: boolean) => boolean
  /** 全选复选框切换 */
  'check-change': (val: boolean) => boolean
}
export type SubmitBarEmits = typeof submitBarEmits
export interface SubmitBarSlots {
  tip?: () => unknown
  left?: () => unknown
  price?: () => unknown
  right?: () => unknown
  button?: () => unknown
}
