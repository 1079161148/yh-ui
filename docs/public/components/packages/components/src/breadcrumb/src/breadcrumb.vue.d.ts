declare const _default: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly separator: {
      readonly type: StringConstructor
      readonly default: '/'
    }
    readonly separatorIcon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly maxItems: {
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
      readonly separator: {
        readonly type: StringConstructor
        readonly default: '/'
      }
      readonly separatorIcon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly maxItems: {
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
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly separator: string
    readonly separatorIcon: string | import('vue').Component
    readonly maxItems: number
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
export default _default
