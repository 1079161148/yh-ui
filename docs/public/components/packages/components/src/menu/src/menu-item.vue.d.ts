declare var __VLS_9: {}, __VLS_15: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any
} & {
  default?: (props: typeof __VLS_15) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly index: {
      readonly type: StringConstructor
      readonly required: true
    }
    readonly route: {
      readonly type: import('vue').PropType<string | object>
      readonly default: ''
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
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
      readonly route: {
        readonly type: import('vue').PropType<string | object>
        readonly default: ''
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
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
    readonly route: string | object
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
