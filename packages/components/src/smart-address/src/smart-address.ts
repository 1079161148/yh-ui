import type { ExtractPropTypes, PropType } from 'vue'
import type { ParsedAddress } from './use-address-parser'

export type { ParsedAddress }

export interface AddressValue {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
}

export interface RegionOption {
  label?: string
  value?: string | number
  children?: RegionOption[]
  [key: string]: unknown
}

export const smartAddressProps = {
  /** 当前地址值（支持 v-model） */
  modelValue: {
    type: Object as PropType<AddressValue>,
    default: (): AddressValue => ({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      street: '',
      detail: ''
    })
  },
  /** 是否显示姓名字段 */
  showName: {
    type: Boolean,
    default: true
  },
  /** 是否显示电话字段 */
  showPhone: {
    type: Boolean,
    default: true
  },
  /** 是否显示街道字段 */
  showStreet: {
    type: Boolean,
    default: false
  },
  /** 智能识别输入框的 placeholder */
  parsePlaceholder: {
    type: String,
    default: ''
  },
  /** 是否必填（显示星号） */
  required: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 识别按钮文案 */
  parseButtonText: {
    type: String,
    default: ''
  },
  /** 是否显示智能识别区域 */
  showParser: {
    type: Boolean,
    default: true
  },
  /** 省市区输入模式 */
  regionType: {
    type: String as PropType<'input' | 'select' | 'cascader'>,
    default: 'input'
  },
  /** 省市区选项数据源（树形） */
  regionOptions: {
    type: Array as PropType<RegionOption[]>,
    default: () => []
  },
  /** 自定义选项的标签字段 */
  labelField: {
    type: String,
    default: 'label'
  },
  /** 自定义选项的值字段 */
  valueField: {
    type: String,
    default: 'value'
  },
  /** 自定义选项的子级字段 */
  childrenField: {
    type: String,
    default: 'children'
  },
  /** 标签位置 */
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'left'
  },
  /** 自定义解析函数 (用于替代内置解析逻辑) */
  parser: {
    type: Function as PropType<(raw: string) => ParsedAddress>,
    default: null
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type SmartAddressProps = ExtractPropTypes<typeof smartAddressProps>

export const smartAddressEmits = {
  'update:modelValue': (val: AddressValue) => val !== undefined,
  /** 智能识别完成 */
  parsed: (val: ParsedAddress) => val !== undefined,
  /** 任意字段变化 */
  change: (val: AddressValue) => val !== undefined
}

export type SmartAddressEmits = typeof smartAddressEmits
