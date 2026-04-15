import AiWelcome from './src/ai-welcome.vue'
export declare const YhAiWelcome: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly title: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly description: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly suggestions: {
            readonly type: import('vue').PropType<import('./index.js').AiSuggestion[]>
            readonly default: () => never[]
          }
          readonly showIcon: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: 'sparkles'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onSelect?: ((suggestion: import('./index.js').AiSuggestion) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        select: (suggestion: import('./index.js').AiSuggestion) => void
      },
      import('vue').PublicProps,
      {
        readonly title: string
        readonly description: string
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly suggestions: import('./index.js').AiSuggestion[]
        readonly showIcon: boolean
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
          readonly title: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly description: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly suggestions: {
            readonly type: import('vue').PropType<import('./index.js').AiSuggestion[]>
            readonly default: () => never[]
          }
          readonly showIcon: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: 'sparkles'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onSelect?: ((suggestion: import('./index.js').AiSuggestion) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly title: string
        readonly description: string
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly suggestions: import('./index.js').AiSuggestion[]
        readonly showIcon: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly title: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly description: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly suggestions: {
          readonly type: import('vue').PropType<import('./index.js').AiSuggestion[]>
          readonly default: () => never[]
        }
        readonly showIcon: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly icon: {
          readonly type: StringConstructor
          readonly default: 'sparkles'
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onSelect?: ((suggestion: import('./index.js').AiSuggestion) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      select: (suggestion: import('./index.js').AiSuggestion) => void
    },
    string,
    {
      readonly title: string
      readonly description: string
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly icon: string
      readonly suggestions: import('./index.js').AiSuggestion[]
      readonly showIcon: boolean
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
        icon?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        description?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhAiWelcome
export * from './src/ai-welcome'
export type AiWelcomeInstance = InstanceType<typeof AiWelcome>
export type YhAiWelcomeInstance = AiWelcomeInstance
export type YhAiWelcomeProps = import('./src/ai-welcome').AiWelcomeProps
export type YhAiWelcomeEmits = import('./src/ai-welcome').AiWelcomeEmits
export type YhAiWelcomeSlots = import('./src/ai-welcome').AiWelcomeSlots
export type YhAiSuggestion = import('./src/ai-welcome').AiSuggestion
