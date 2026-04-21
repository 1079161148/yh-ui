declare var __VLS_9: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly command: {
      readonly type: import('vue').PropType<string | number | object>
      readonly default: ''
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly divided: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly icon: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly danger: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly checked: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
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
      readonly command: {
        readonly type: import('vue').PropType<string | number | object>
        readonly default: ''
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly divided: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly icon: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly danger: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly checked: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly disabled: boolean
    readonly danger: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string
    readonly checked: boolean
    readonly command: string | number | object
    readonly divided: boolean
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
