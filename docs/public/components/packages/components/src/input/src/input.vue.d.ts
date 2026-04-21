import type { InputProps } from './input'
declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {}, __VLS_11: {}, __VLS_13: {}, __VLS_19: {}
type __VLS_Slots = {} & {
  prepend?: (props: typeof __VLS_1) => any
} & {
  prefix?: (props: typeof __VLS_3) => any
} & {
  loadingIcon?: (props: typeof __VLS_9) => any
} & {
  clearIcon?: (props: typeof __VLS_11) => any
} & {
  suffix?: (props: typeof __VLS_13) => any
} & {
  append?: (props: typeof __VLS_19) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  InputProps,
  {
    ref: HTMLInputElement | HTMLTextAreaElement | undefined
    wrapperRef: HTMLElement | undefined
    focus: () => void
    blur: () => void
    select: () => void
    clear: () => void
    textLength: number
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    input: (value: string | number) => any
    clear: () => any
    focus: (event: FocusEvent) => any
    change: (value: string | number) => any
    blur: (event: FocusEvent) => any
    compositionend: (event: CompositionEvent) => any
    compositionstart: (event: CompositionEvent) => any
    compositionupdate: (event: CompositionEvent) => any
    keydown: (event: KeyboardEvent) => any
    keyup: (event: KeyboardEvent) => any
    'update:modelValue': (value: string | number) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<InputProps> &
    Readonly<{
      onInput?: ((value: string | number) => any) | undefined
      onClear?: (() => any) | undefined
      onFocus?: ((event: FocusEvent) => any) | undefined
      onChange?: ((value: string | number) => any) | undefined
      onBlur?: ((event: FocusEvent) => any) | undefined
      onCompositionend?: ((event: CompositionEvent) => any) | undefined
      onCompositionstart?: ((event: CompositionEvent) => any) | undefined
      onCompositionupdate?: ((event: CompositionEvent) => any) | undefined
      onKeydown?: ((event: KeyboardEvent) => any) | undefined
      onKeyup?: ((event: KeyboardEvent) => any) | undefined
      'onUpdate:modelValue'?: ((value: string | number) => any) | undefined
    }>,
  {
    label: string
    size: import('./input').InputSize
    autocomplete: string
    loading: boolean
    showPassword: boolean
    status: import('./input').InputStatus
    readonly: boolean
    type: import('./input').InputType
    disabled: boolean
    autofocus: boolean
    variant: import('./input').InputVariant
    clearable: boolean
    clearOnEscape: boolean
    selectOnFocus: boolean
    showWordLimit: boolean
    ariaLabel: string
    inputmode: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    modelModifiers: Record<string, boolean>
    validateEvent: boolean
    rows: number
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
