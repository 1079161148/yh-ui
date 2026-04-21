declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly to: {
      readonly type: import('vue').PropType<string | Record<string, unknown>>
      readonly default: ''
    }
    readonly replace: {
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
      readonly to: {
        readonly type: import('vue').PropType<string | Record<string, unknown>>
        readonly default: ''
      }
      readonly replace: {
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
    readonly replace: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly to: string | Record<string, unknown>
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
