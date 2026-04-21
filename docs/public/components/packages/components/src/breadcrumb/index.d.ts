import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'
export declare const YhBreadcrumb: import('@yh-ui/utils').SFCWithInstall<
  import('vue').DefineComponent<
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
> & {
  BreadcrumbItem: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
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
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly replace: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly to: string | Record<string, unknown>
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
      {},
      {},
      {},
      {},
      {
        readonly replace: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly to: string | Record<string, unknown>
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
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
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly replace: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly to: string | Record<string, unknown>
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
}
export declare const YhBreadcrumbItem: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
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
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly replace: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly to: string | Record<string, unknown>
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
      {},
      {},
      {},
      {},
      {
        readonly replace: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly to: string | Record<string, unknown>
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
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
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly replace: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly to: string | Record<string, unknown>
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
>
export default YhBreadcrumb
export * from './src/breadcrumb'
export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>
export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
export type YhBreadcrumbInstance = BreadcrumbInstance
export type YhBreadcrumbItemInstance = BreadcrumbItemInstance
export type YhBreadcrumbProps = import('./src/breadcrumb').BreadcrumbProps
export type YhBreadcrumbSlots = import('./src/breadcrumb').BreadcrumbSlots
export type YhBreadcrumbItemProps = import('./src/breadcrumb').BreadcrumbItemProps
export type YhBreadcrumbItemSlots = import('./src/breadcrumb').BreadcrumbItemSlots
