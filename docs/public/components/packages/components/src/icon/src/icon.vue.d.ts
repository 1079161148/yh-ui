declare var __VLS_5: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly name: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly svg: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly icon: {
      readonly type: import('vue').PropType<import('vue').Component>
      readonly default: undefined
    }
    readonly size: {
      readonly type: import('vue').PropType<number | string>
      readonly default: undefined
    }
    readonly color: {
      readonly type: StringConstructor
      readonly default: undefined
    }
    readonly spin: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly rotate: {
      readonly type: NumberConstructor
      readonly default: 0
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
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly svg: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly icon: {
        readonly type: import('vue').PropType<import('vue').Component>
        readonly default: undefined
      }
      readonly size: {
        readonly type: import('vue').PropType<number | string>
        readonly default: undefined
      }
      readonly color: {
        readonly type: StringConstructor
        readonly default: undefined
      }
      readonly spin: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly rotate: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly size: string | number
    readonly name: string
    readonly spin: boolean
    readonly svg: string
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: import('vue').Component
    readonly color: string
    readonly rotate: number
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
