import AiAgentCard from './src/ai-agent-card.vue'
export declare const YhAiAgentCard: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly data: {
            readonly type: import('vue').PropType<import('./index.js').AgentData>
            readonly required: true
          }
          readonly layout: {
            readonly type: import('vue').PropType<'vertical' | 'horizontal' | 'compact'>
            readonly default: 'vertical'
          }
          readonly showActions: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showStats: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly favoritable: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly selected: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onShare?: ((data: import('./index.js').AgentData) => any) | undefined
          onUse?: ((data: import('./index.js').AgentData) => any) | undefined
          onFavorite?:
            | ((data: import('./index.js').AgentData, favorited: boolean) => any)
            | undefined
          onClick?: ((data: import('./index.js').AgentData) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        share: (data: import('./index.js').AgentData) => void
        use: (data: import('./index.js').AgentData) => void
        favorite: (data: import('./index.js').AgentData, favorited: boolean) => void
        click: (data: import('./index.js').AgentData) => void
      },
      import('vue').PublicProps,
      {
        readonly loading: boolean
        readonly selected: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly layout: 'compact' | 'vertical' | 'horizontal'
        readonly showActions: boolean
        readonly showStats: boolean
        readonly favoritable: boolean
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
          readonly data: {
            readonly type: import('vue').PropType<import('./index.js').AgentData>
            readonly required: true
          }
          readonly layout: {
            readonly type: import('vue').PropType<'vertical' | 'horizontal' | 'compact'>
            readonly default: 'vertical'
          }
          readonly showActions: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showStats: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly favoritable: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly selected: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onShare?: ((data: import('./index.js').AgentData) => any) | undefined
          onUse?: ((data: import('./index.js').AgentData) => any) | undefined
          onFavorite?:
            | ((data: import('./index.js').AgentData, favorited: boolean) => any)
            | undefined
          onClick?: ((data: import('./index.js').AgentData) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly loading: boolean
        readonly selected: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly layout: 'compact' | 'vertical' | 'horizontal'
        readonly showActions: boolean
        readonly showStats: boolean
        readonly favoritable: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly data: {
          readonly type: import('vue').PropType<import('./index.js').AgentData>
          readonly required: true
        }
        readonly layout: {
          readonly type: import('vue').PropType<'vertical' | 'horizontal' | 'compact'>
          readonly default: 'vertical'
        }
        readonly showActions: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly showStats: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly favoritable: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly selected: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly loading: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onShare?: ((data: import('./index.js').AgentData) => any) | undefined
        onUse?: ((data: import('./index.js').AgentData) => any) | undefined
        onFavorite?: ((data: import('./index.js').AgentData, favorited: boolean) => any) | undefined
        onClick?: ((data: import('./index.js').AgentData) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      share: (data: import('./index.js').AgentData) => void
      use: (data: import('./index.js').AgentData) => void
      favorite: (data: import('./index.js').AgentData, favorited: boolean) => void
      click: (data: import('./index.js').AgentData) => void
    },
    string,
    {
      readonly loading: boolean
      readonly selected: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly layout: 'compact' | 'vertical' | 'horizontal'
      readonly showActions: boolean
      readonly showStats: boolean
      readonly favoritable: boolean
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
        avatar?: (props: {}) => any
      } & {
        actions?: (props: {
          data: import('./index.js').AgentData
          use: (e: MouseEvent) => void
        }) => any
      } & {
        default?: (props: { data: import('./index.js').AgentData }) => any
      }
    })
> &
  Record<string, unknown>
export default YhAiAgentCard
export * from './src/ai-agent-card'
export type AiAgentCardInstance = InstanceType<typeof AiAgentCard>
export type YhAiAgentCardInstance = AiAgentCardInstance
export type YhAiAgentCardProps = import('./src/ai-agent-card').AiAgentCardProps
export type YhAiAgentCardEmits = import('./src/ai-agent-card').AiAgentCardEmits
export type YhAiAgentCardSlots = import('./src/ai-agent-card').AiAgentCardSlots
export type YhAgentCapability = import('./src/ai-agent-card').AgentCapability
export type YhAgentStats = import('./src/ai-agent-card').AgentStats
export type YhAgentData = import('./src/ai-agent-card').AgentData
