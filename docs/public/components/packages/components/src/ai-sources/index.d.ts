import AiSources from './src/ai-sources.vue'
export declare const YhAiSources: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly sources: {
            readonly type: import('vue').PropType<import('./index.js').AiSourceItem[]>
            readonly default: () => never[]
          }
          readonly mode: {
            readonly type: import('vue').PropType<'inline' | 'card' | 'badge'>
            readonly default: 'inline'
          }
          readonly maxVisible: {
            readonly type: NumberConstructor
            readonly default: 5
          }
          readonly showScore: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showFileType: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((source: import('./index.js').AiSourceItem) => any) | undefined
          onOpen?: ((source: import('./index.js').AiSourceItem) => any) | undefined
        }>,
      {
        scrollToSource: (id: string | number) => void
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        click: (source: import('./index.js').AiSourceItem) => void
        open: (source: import('./index.js').AiSourceItem) => void
      },
      import('vue').PublicProps,
      {
        readonly mode: 'card' | 'badge' | 'inline'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly showScore: boolean
        readonly sources: import('./index.js').AiSourceItem[]
        readonly maxVisible: number
        readonly showFileType: boolean
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
          readonly sources: {
            readonly type: import('vue').PropType<import('./index.js').AiSourceItem[]>
            readonly default: () => never[]
          }
          readonly mode: {
            readonly type: import('vue').PropType<'inline' | 'card' | 'badge'>
            readonly default: 'inline'
          }
          readonly maxVisible: {
            readonly type: NumberConstructor
            readonly default: 5
          }
          readonly showScore: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showFileType: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((source: import('./index.js').AiSourceItem) => any) | undefined
          onOpen?: ((source: import('./index.js').AiSourceItem) => any) | undefined
        }>,
      {
        scrollToSource: (id: string | number) => void
      },
      {},
      {},
      {},
      {
        readonly mode: 'card' | 'badge' | 'inline'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly showScore: boolean
        readonly sources: import('./index.js').AiSourceItem[]
        readonly maxVisible: number
        readonly showFileType: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly sources: {
          readonly type: import('vue').PropType<import('./index.js').AiSourceItem[]>
          readonly default: () => never[]
        }
        readonly mode: {
          readonly type: import('vue').PropType<'inline' | 'card' | 'badge'>
          readonly default: 'inline'
        }
        readonly maxVisible: {
          readonly type: NumberConstructor
          readonly default: 5
        }
        readonly showScore: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly showFileType: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClick?: ((source: import('./index.js').AiSourceItem) => any) | undefined
        onOpen?: ((source: import('./index.js').AiSourceItem) => any) | undefined
      }>,
    {
      scrollToSource: (id: string | number) => void
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      click: (source: import('./index.js').AiSourceItem) => void
      open: (source: import('./index.js').AiSourceItem) => void
    },
    string,
    {
      readonly mode: 'card' | 'badge' | 'inline'
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly showScore: boolean
      readonly sources: import('./index.js').AiSourceItem[]
      readonly maxVisible: number
      readonly showFileType: boolean
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
export default YhAiSources
export * from './src/ai-sources'
export type AiSourcesInstance = InstanceType<typeof AiSources>
export type YhAiSourcesInstance = AiSourcesInstance
export type YhAiSourcesProps = import('./src/ai-sources').AiSourcesProps
export type YhAiSourcesEmits = import('./src/ai-sources').AiSourcesEmits
export type YhAiSourcesSlots = import('./src/ai-sources').AiSourcesSlots
export type YhAiSourcesExpose = import('./src/ai-sources').AiSourcesExpose
export type YhAiSourceItem = import('./src/ai-sources').AiSourceItem
