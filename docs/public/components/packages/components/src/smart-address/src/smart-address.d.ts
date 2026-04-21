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
export declare const smartAddressProps: {
  modelValue: {
    type: PropType<AddressValue>
    default: () => AddressValue
  }
  showName: {
    type: BooleanConstructor
    default: boolean
  }
  showPhone: {
    type: BooleanConstructor
    default: boolean
  }
  showStreet: {
    type: BooleanConstructor
    default: boolean
  }
  parsePlaceholder: {
    type: StringConstructor
    default: string
  }
  required: {
    type: BooleanConstructor
    default: boolean
  }
  disabled: {
    type: BooleanConstructor
    default: boolean
  }
  parseButtonText: {
    type: StringConstructor
    default: string
  }
  showParser: {
    type: BooleanConstructor
    default: boolean
  }
  regionType: {
    type: PropType<'input' | 'select' | 'cascader'>
    default: string
  }
  regionOptions: {
    type: PropType<RegionOption[]>
    default: () => never[]
  }
  labelField: {
    type: StringConstructor
    default: string
  }
  valueField: {
    type: StringConstructor
    default: string
  }
  childrenField: {
    type: StringConstructor
    default: string
  }
  labelPlacement: {
    type: PropType<'left' | 'top'>
    default: string
  }
  parser: {
    type: PropType<(raw: string) => ParsedAddress>
    default: null
  }
  themeOverrides: {
    type: PropType<ComponentThemeVars>
    default: () => {}
  }
}
export type SmartAddressProps = ExtractPropTypes<typeof smartAddressProps>
export declare const smartAddressEmits: {
  'update:modelValue': (val: AddressValue) => boolean
  parsed: (val: ParsedAddress) => boolean
  change: (val: AddressValue) => boolean
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
