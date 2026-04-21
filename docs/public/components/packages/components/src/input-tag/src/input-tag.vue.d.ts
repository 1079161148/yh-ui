import type { InputTagProps } from './input-tag'
declare var __VLS_1: {},
  __VLS_7: {
    tag: string
    index: number
    close: () => void
  },
  __VLS_9: {
    count: number
    tags: string[]
  },
  __VLS_15: {},
  __VLS_17: {}
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_1) => any
} & {
  tag?: (props: typeof __VLS_7) => any
} & {
  collapseTag?: (props: typeof __VLS_9) => any
} & {
  clearIcon?: (props: typeof __VLS_15) => any
} & {
  suffix?: (props: typeof __VLS_17) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  InputTagProps,
  {
    focus: () => void
    blur: () => void
    clear: () => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    input: (value: string) => any
    clear: () => any
    add: (tag: string) => any
    remove: (tag: string, index: number) => any
    focus: (event: FocusEvent) => any
    change: (value: string[]) => any
    blur: (event: FocusEvent) => any
    'update:modelValue': (value: string[]) => any
    'drag-end': (tags: string[]) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<InputTagProps> &
    Readonly<{
      onInput?: ((value: string) => any) | undefined
      onClear?: (() => any) | undefined
      onAdd?: ((tag: string) => any) | undefined
      onRemove?: ((tag: string, index: number) => any) | undefined
      onFocus?: ((event: FocusEvent) => any) | undefined
      onChange?: ((value: string[]) => any) | undefined
      onBlur?: ((event: FocusEvent) => any) | undefined
      'onUpdate:modelValue'?: ((value: string[]) => any) | undefined
      'onDrag-end'?: ((tags: string[]) => any) | undefined
    }>,
  {
    size: import('./input-tag').InputTagSize
    trim: boolean
    placeholder: string
    readonly: boolean
    type: import('./input-tag').InputTagType
    disabled: boolean
    modelValue: string[]
    clearable: boolean
    validateEvent: boolean
    separator: string | string[]
    addOnBlur: boolean
    closable: boolean
    allowDuplicate: boolean
    collapseTags: boolean
    collapseTagsTooltip: boolean
    maxCollapseTags: number
    draggable: boolean
    tagEffect: 'dark' | 'light' | 'plain'
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
