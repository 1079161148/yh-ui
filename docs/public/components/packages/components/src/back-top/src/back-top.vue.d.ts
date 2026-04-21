declare var __VLS_5: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly visibilityHeight: {
      readonly type: NumberConstructor
      readonly default: 200
    }
    readonly target: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly right: {
      readonly type: NumberConstructor
      readonly default: 40
    }
    readonly bottom: {
      readonly type: NumberConstructor
      readonly default: 40
    }
    readonly showProgress: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly progressColor: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly duration: {
      readonly type: NumberConstructor
      readonly default: 400
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
  {
    click: (evt: MouseEvent) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly visibilityHeight: {
        readonly type: NumberConstructor
        readonly default: 200
      }
      readonly target: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly right: {
        readonly type: NumberConstructor
        readonly default: 40
      }
      readonly bottom: {
        readonly type: NumberConstructor
        readonly default: 40
      }
      readonly showProgress: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly progressColor: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly duration: {
        readonly type: NumberConstructor
        readonly default: 400
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined
    }>,
  {
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly progressColor: string
    readonly right: number
    readonly bottom: number
    readonly duration: number
    readonly target: string
    readonly visibilityHeight: number
    readonly showProgress: boolean
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
