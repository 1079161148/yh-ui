import type { TimeSelectProps, TimeOption } from './time-select'
declare var __VLS_1: {},
  __VLS_11: {},
  __VLS_13: {
    option: TimeOption
  }
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_1) => any
} & {
  empty?: (props: typeof __VLS_11) => any
} & {
  option?: (props: typeof __VLS_13) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  TimeSelectProps,
  {
    focus: () => void
    blur: () => void
    inputRef: import('vue').Ref<HTMLInputElement | undefined>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    clear: () => any
    focus: (event: FocusEvent) => any
    change: (value: string | undefined) => any
    blur: (event: FocusEvent) => any
    'update:modelValue': (value: string | undefined) => any
    'visible-change': (visible: boolean) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<TimeSelectProps> &
    Readonly<{
      onClear?: (() => any) | undefined
      onFocus?: ((event: FocusEvent) => any) | undefined
      onChange?: ((value: string | undefined) => any) | undefined
      onBlur?: ((event: FocusEvent) => any) | undefined
      'onUpdate:modelValue'?: ((value: string | undefined) => any) | undefined
      'onVisible-change'?: ((visible: boolean) => any) | undefined
    }>,
  {
    size: import('./time-select').TimeSelectSize
    placeholder: string
    start: string
    end: string
    effect: 'dark' | 'light'
    disabled: boolean
    clearable: boolean
    validateEvent: boolean
    step: string
    editable: boolean
    format: string
    teleported: boolean
    includeEndTime: boolean
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
