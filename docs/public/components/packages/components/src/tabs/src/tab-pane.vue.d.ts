declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly name: {
      readonly type: import('vue').PropType<string | number>
      readonly required: true
    }
    readonly label: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly closable: {
      readonly type: BooleanConstructor
      readonly default: undefined
    }
    readonly lazy: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly icon: {
      readonly type: StringConstructor
      readonly default: ''
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
      readonly name: {
        readonly type: import('vue').PropType<string | number>
        readonly required: true
      }
      readonly label: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly closable: {
        readonly type: BooleanConstructor
        readonly default: undefined
      }
      readonly lazy: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly icon: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly label: string
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string
    readonly closable: boolean
    readonly lazy: boolean
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
