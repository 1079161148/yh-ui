declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}
type __VLS_Slots = {} & {
  tip?: (props: typeof __VLS_1) => any
} & {
  left?: (props: typeof __VLS_3) => any
} & {
  price?: (props: typeof __VLS_5) => any
} & {
  right?: (props: typeof __VLS_7) => any
} & {
  button?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    price: {
      type: NumberConstructor
      default: number
    }
    currency: {
      type: StringConstructor
      default: string
    }
    centUnit: {
      type: BooleanConstructor
      default: boolean
    }
    decimalLength: {
      type: NumberConstructor
      default: number
    }
    buttonText: {
      type: StringConstructor
      default: string
    }
    buttonType: {
      type: import('vue').PropType<import('./submit-bar').SubmitBarButtonType>
      default: string
    }
    disabled: {
      type: BooleanConstructor
      default: boolean
    }
    loading: {
      type: BooleanConstructor
      default: boolean
    }
    showCheckbox: {
      type: BooleanConstructor
      default: boolean
    }
    checked: {
      type: BooleanConstructor
      default: boolean
    }
    indeterminate: {
      type: BooleanConstructor
      default: boolean
    }
    label: {
      type: StringConstructor
      default: string
    }
    selectedCount: {
      type: NumberConstructor
      default: number
    }
    tip: {
      type: StringConstructor
      default: string
    }
    safeAreaInsetBottom: {
      type: BooleanConstructor
      default: boolean
    }
    themeOverrides: {
      type: import('vue').PropType<Record<string, string>>
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
    submit: (e: MouseEvent) => void
    'update:checked': (val: boolean) => void
    'check-change': (val: boolean) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      price: {
        type: NumberConstructor
        default: number
      }
      currency: {
        type: StringConstructor
        default: string
      }
      centUnit: {
        type: BooleanConstructor
        default: boolean
      }
      decimalLength: {
        type: NumberConstructor
        default: number
      }
      buttonText: {
        type: StringConstructor
        default: string
      }
      buttonType: {
        type: import('vue').PropType<import('./submit-bar').SubmitBarButtonType>
        default: string
      }
      disabled: {
        type: BooleanConstructor
        default: boolean
      }
      loading: {
        type: BooleanConstructor
        default: boolean
      }
      showCheckbox: {
        type: BooleanConstructor
        default: boolean
      }
      checked: {
        type: BooleanConstructor
        default: boolean
      }
      indeterminate: {
        type: BooleanConstructor
        default: boolean
      }
      label: {
        type: StringConstructor
        default: string
      }
      selectedCount: {
        type: NumberConstructor
        default: number
      }
      tip: {
        type: StringConstructor
        default: string
      }
      safeAreaInsetBottom: {
        type: BooleanConstructor
        default: boolean
      }
      themeOverrides: {
        type: import('vue').PropType<Record<string, string>>
        default: () => {}
      }
    }>
  > &
    Readonly<{
      onSubmit?: ((e: MouseEvent) => any) | undefined
      'onUpdate:checked'?: ((val: boolean) => any) | undefined
      'onCheck-change'?: ((val: boolean) => any) | undefined
    }>,
  {
    label: string
    price: number
    loading: boolean
    tip: string
    disabled: boolean
    themeOverrides: Record<string, string>
    indeterminate: boolean
    checked: boolean
    showCheckbox: boolean
    currency: string
    centUnit: boolean
    decimalLength: number
    buttonText: string
    buttonType: import('./submit-bar').SubmitBarButtonType
    selectedCount: number
    safeAreaInsetBottom: boolean
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
