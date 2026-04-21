import Divider from './src/divider.vue'
export declare const YhDivider: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly direction: {
            readonly type: import('vue').PropType<'horizontal' | 'vertical'>
            readonly default: 'horizontal'
          }
          readonly contentPosition: {
            readonly type: import('vue').PropType<'left' | 'center' | 'right'>
            readonly default: 'center'
          }
          readonly borderStyle: {
            readonly type: import('vue').PropType<'solid' | 'dashed' | 'dotted' | 'double'>
            readonly default: 'solid'
          }
          readonly borderWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly color: {
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
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly borderWidth: string | number
        readonly color: string
        readonly direction: 'vertical' | 'horizontal'
        readonly borderStyle: 'dashed' | 'dotted' | 'double' | 'solid'
        readonly contentPosition: 'center' | 'left' | 'right'
      },
      true,
      {},
      {},
      import('vue').GlobalComponents,
      import('vue').GlobalDirectives,
      string,
      {},
      any,
      import('vue').ComponentProvideOptions,
      {
        P: {}
        B: {}
        D: {}
        C: {}
        M: {}
        Defaults: {}
      },
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly direction: {
            readonly type: import('vue').PropType<'horizontal' | 'vertical'>
            readonly default: 'horizontal'
          }
          readonly contentPosition: {
            readonly type: import('vue').PropType<'left' | 'center' | 'right'>
            readonly default: 'center'
          }
          readonly borderStyle: {
            readonly type: import('vue').PropType<'solid' | 'dashed' | 'dotted' | 'double'>
            readonly default: 'solid'
          }
          readonly borderWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly color: {
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
      {},
      {},
      {},
      {},
      {
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly borderWidth: string | number
        readonly color: string
        readonly direction: 'vertical' | 'horizontal'
        readonly borderStyle: 'dashed' | 'dotted' | 'double' | 'solid'
        readonly contentPosition: 'center' | 'left' | 'right'
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly direction: {
          readonly type: import('vue').PropType<'horizontal' | 'vertical'>
          readonly default: 'horizontal'
        }
        readonly contentPosition: {
          readonly type: import('vue').PropType<'left' | 'center' | 'right'>
          readonly default: 'center'
        }
        readonly borderStyle: {
          readonly type: import('vue').PropType<'solid' | 'dashed' | 'dotted' | 'double'>
          readonly default: 'solid'
        }
        readonly borderWidth: {
          readonly type: import('vue').PropType<string | number>
          readonly default: ''
        }
        readonly color: {
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
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly borderWidth: string | number
      readonly color: string
      readonly direction: 'vertical' | 'horizontal'
      readonly borderStyle: 'dashed' | 'dotted' | 'double' | 'solid'
      readonly contentPosition: 'center' | 'left' | 'right'
    },
    {},
    string,
    {},
    import('vue').GlobalComponents,
    import('vue').GlobalDirectives,
    string,
    import('vue').ComponentProvideOptions
  > &
    import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps &
    (new () => {
      $slots: {
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhDivider
export * from './src/divider'
export type DividerInstance = InstanceType<typeof Divider>
export type YhDividerInstance = DividerInstance
export type YhDividerProps = import('./src/divider').DividerProps
