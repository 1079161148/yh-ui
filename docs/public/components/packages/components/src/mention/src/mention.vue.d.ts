import type { MentionProps, MentionOption } from './mention'
declare var __VLS_1: {},
  __VLS_7: {},
  __VLS_21: {},
  __VLS_23: {},
  __VLS_25: {
    option: MentionOption
    keyword: string
  }
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_1) => any
} & {
  suffix?: (props: typeof __VLS_7) => any
} & {
  loading?: (props: typeof __VLS_21) => any
} & {
  empty?: (props: typeof __VLS_23) => any
} & {
  option?: (props: typeof __VLS_25) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  MentionProps,
  {
    ref: HTMLInputElement | HTMLTextAreaElement | undefined
    wrapperRef: HTMLElement | undefined
    focus: () => void
    blur: () => void
    clear: () => void
    insertMention: (
      option: MentionOption,
      trigger? /**
       * YhMention - 提及组件
       * @description 在输入中通过触发符号（@、#等）选择提及对象，支持 input/textarea 双模式
       */
      : string
    ) => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    input: (value: string) => any
    search: (keyword: string, trigger: string) => any
    select: (option: MentionOption, trigger: string) => any
    clear: () => any
    close: () => any
    focus: (event: FocusEvent) => any
    change: (value: string) => any
    blur: (event: FocusEvent) => any
    keydown: (event: KeyboardEvent) => any
    'update:modelValue': (value: string) => any
    open: () => any
  },
  string,
  import('vue').PublicProps,
  Readonly<MentionProps> &
    Readonly<{
      onInput?: ((value: string) => any) | undefined
      onSearch?: ((keyword: string, trigger: string) => any) | undefined
      onSelect?: ((option: MentionOption, trigger: string) => any) | undefined
      onClear?: (() => any) | undefined
      onClose?: (() => any) | undefined
      onFocus?: ((event: FocusEvent) => any) | undefined
      onChange?: ((value: string) => any) | undefined
      onBlur?: ((event: FocusEvent) => any) | undefined
      onKeydown?: ((event: KeyboardEvent) => any) | undefined
      'onUpdate:modelValue'?: ((value: string) => any) | undefined
      onOpen?: (() => any) | undefined
    }>,
  {
    size: import('./mention').MentionSize
    split: string
    loading: boolean
    readonly: boolean
    type: 'input' | 'textarea'
    disabled: boolean
    autofocus: boolean
    modelValue: string
    clearable: boolean
    showWordLimit: boolean
    validateEvent: boolean
    rows: number
    options: MentionOption[]
    debounce: number
    placement: import('./mention').MentionPlacement
    popperClass: string
    teleported: boolean
    loadingText: string
    noDataText: string
    triggers: string[]
    maxCount: number
    filterOption: ((keyword: string, option: MentionOption) => boolean) | false
    wholeWord: boolean
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
