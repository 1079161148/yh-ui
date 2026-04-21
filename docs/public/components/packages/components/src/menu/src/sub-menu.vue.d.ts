declare var __VLS_13: {}, __VLS_19: {}, __VLS_25: {}, __VLS_35: {}, __VLS_41: {}, __VLS_51: {}
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_13) => any
} & {
  title?: (props: typeof __VLS_19) => any
} & {
  default?: (props: typeof __VLS_25) => any
} & {
  title?: (props: typeof __VLS_35) => any
} & {
  title?: (props: typeof __VLS_41) => any
} & {
  default?: (props: typeof __VLS_51) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly index: {
      readonly type: StringConstructor
      readonly required: true
    }
    readonly popperClass: {
      readonly type: StringConstructor
      readonly default: undefined
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly showTimeout: {
      readonly type: NumberConstructor
      readonly default: undefined
    }
    readonly hideTimeout: {
      readonly type: NumberConstructor
      readonly default: undefined
    }
    readonly popperOffset: {
      readonly type: NumberConstructor
      readonly default: undefined
    }
    readonly label: {
      readonly type: StringConstructor
      readonly default: ''
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly index: {
        readonly type: StringConstructor
        readonly required: true
      }
      readonly popperClass: {
        readonly type: StringConstructor
        readonly default: undefined
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly showTimeout: {
        readonly type: NumberConstructor
        readonly default: undefined
      }
      readonly hideTimeout: {
        readonly type: NumberConstructor
        readonly default: undefined
      }
      readonly popperOffset: {
        readonly type: NumberConstructor
        readonly default: undefined
      }
      readonly label: {
        readonly type: StringConstructor
        readonly default: ''
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly label: string
    readonly disabled: boolean
    readonly popperClass: string
    readonly popperOffset: number
    readonly showTimeout: number
    readonly hideTimeout: number
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
