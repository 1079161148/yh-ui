import type { AddressValue, RegionOption } from './smart-address'
declare function updateField(field: keyof AddressValue, value: string): void
declare var __VLS_1: {},
  __VLS_3: {
    value: {
      name: string
      phone: string
      province: string
      city: string
      district: string
      street: string
      detail: string
    }
    update: typeof updateField
  },
  __VLS_45: {
    value: {
      name: string
      phone: string
      province: string
      city: string
      district: string
      street: string
      detail: string
    }
    update: typeof updateField
  }
type __VLS_Slots = {} & {
  'parse-icon'?: (props: typeof __VLS_1) => any
} & {
  region?: (props: typeof __VLS_3) => any
} & {
  extra?: (props: typeof __VLS_45) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    modelValue: {
      type: import('vue').PropType<AddressValue>
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
      type: import('vue').PropType<'input' | 'select' | 'cascader'>
      default: string
    }
    regionOptions: {
      type: import('vue').PropType<RegionOption[]>
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
      type: import('vue').PropType<'left' | 'top'>
      default: string
    }
    parser: {
      type: import('vue').PropType<(raw: string) => import('./use-address-parser').ParsedAddress>
      default: null
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      default: () => {}
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    change: (val: AddressValue) => void
    'update:modelValue': (val: AddressValue) => void
    parsed: (val: import('./use-address-parser').ParsedAddress) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<AddressValue>
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
        type: import('vue').PropType<'input' | 'select' | 'cascader'>
        default: string
      }
      regionOptions: {
        type: import('vue').PropType<RegionOption[]>
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
        type: import('vue').PropType<'left' | 'top'>
        default: string
      }
      parser: {
        type: import('vue').PropType<(raw: string) => import('./use-address-parser').ParsedAddress>
        default: null
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        default: () => {}
      }
    }>
  > &
    Readonly<{
      onChange?: ((val: AddressValue) => any) | undefined
      'onUpdate:modelValue'?: ((val: AddressValue) => any) | undefined
      onParsed?: ((val: import('./use-address-parser').ParsedAddress) => any) | undefined
    }>,
  {
    required: boolean
    parser: (raw: string) => import('./use-address-parser').ParsedAddress
    disabled: boolean
    themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    modelValue: AddressValue
    labelPlacement: 'top' | 'left'
    labelField: string
    showName: boolean
    showPhone: boolean
    showStreet: boolean
    parsePlaceholder: string
    parseButtonText: string
    showParser: boolean
    regionType: 'input' | 'select' | 'cascader'
    regionOptions: RegionOption[]
    valueField: string
    childrenField: string
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
  {},
  any
>
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
