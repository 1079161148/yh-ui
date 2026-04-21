import type { CheckboxProps, CheckboxValueType } from './checkbox'
declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  CheckboxProps,
  {
    ref: HTMLInputElement | undefined
    checked: boolean
    focus: () => void
    blur: () => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    change: (value: CheckboxValueType) => any
    'update:modelValue': (value: CheckboxValueType) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<CheckboxProps> &
    Readonly<{
      onChange?: ((value: CheckboxValueType) => any) | undefined
      'onUpdate:modelValue'?: ((value: CheckboxValueType) => any) | undefined
    }>,
  {
    size: import('./checkbox').CheckboxSize
    disabled: boolean
    validateEvent: boolean
    border: boolean
    trueValue: CheckboxValueType
    falseValue: CheckboxValueType
    indeterminate: boolean
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  false,
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
