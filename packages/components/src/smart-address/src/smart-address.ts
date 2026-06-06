import type { ComponentThemeVars } from '@yh-ui/theme'
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
  showName: {
    type: Boolean,
    default: true
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showStreet: {
    type: Boolean,
    default: false
  },
  parsePlaceholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  parseButtonText: {
    type: String,
    default: ''
  },
  showParser: {
    type: Boolean,
    default: true
  },
  regionType: {
    type: String as PropType<'input' | 'select' | 'cascader'>,
    default: 'input'
  },
  regionOptions: {
    type: Array as PropType<RegionOption[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'left'
  },
  parser: {
    type: Function as PropType<(raw: string) => ParsedAddress>,
    default: null
  },
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: () => ({})
  }
}

export type SmartAddressProps = ExtractPropTypes<typeof smartAddressProps>

export const smartAddressEmits = {
  'update:modelValue': (val: AddressValue) => val !== undefined,
  parsed: (val: ParsedAddress) => val !== undefined,
  change: (val: AddressValue) => val !== undefined
}

export type SmartAddressEmits = typeof smartAddressEmits

export interface SmartAddressSlots {
  'parse-icon'?: () => unknown
  region?: (props: {
    value: AddressValue
    update: (field: keyof AddressValue, value: string) => void
  }) => unknown
  extra?: (props: {
    value: AddressValue
    update: (field: keyof AddressValue, value: string) => void
  }) => unknown
}
