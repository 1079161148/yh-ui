import AiMermaid from './src/ai-mermaid.vue'
export declare const YhAiMermaid: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly code: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly header: {
            readonly type: import('vue').PropType<string | Record<string, unknown>>
            readonly default: null
          }
          readonly className: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly classNames: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly styles: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly config: {
            readonly type: import('vue').PropType<import('./index.js').MermaidConfig>
            readonly default: () => {}
          }
          readonly actions: {
            readonly type: import('vue').PropType<import('./index.js').MermaidActions>
            readonly default: () => {
              enableZoom: boolean
              enableDownload: boolean
              enableCopy: boolean
            }
          }
          readonly onRenderTypeChange: {
            readonly type: import('vue').PropType<(value: import('./index.js').RenderType) => void>
            readonly default: undefined
          }
          readonly prefixCls: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly style: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onError?: ((_error: Error) => any) | undefined
          onReady?: (() => any) | undefined
          'onRender-type-change'?: ((_value: import('./index.js').RenderType) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        error: (_error: Error) => void
        ready: () => void
        'render-type-change': (_value: import('./index.js').RenderType) => void
      },
      import('vue').PublicProps,
      {
        readonly code: string
        readonly header: string | Record<string, unknown>
        readonly style: Record<string, string>
        readonly themeOverrides: Record<string, unknown>
        readonly config: import('./index.js').MermaidConfig
        readonly actions: import('./index.js').MermaidActions
        readonly className: string
        readonly classNames: Record<string, string>
        readonly styles: Record<string, string>
        readonly onRenderTypeChange: (value: import('./index.js').RenderType) => void
        readonly prefixCls: string
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
          readonly code: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly header: {
            readonly type: import('vue').PropType<string | Record<string, unknown>>
            readonly default: null
          }
          readonly className: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly classNames: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly styles: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly config: {
            readonly type: import('vue').PropType<import('./index.js').MermaidConfig>
            readonly default: () => {}
          }
          readonly actions: {
            readonly type: import('vue').PropType<import('./index.js').MermaidActions>
            readonly default: () => {
              enableZoom: boolean
              enableDownload: boolean
              enableCopy: boolean
            }
          }
          readonly onRenderTypeChange: {
            readonly type: import('vue').PropType<(value: import('./index.js').RenderType) => void>
            readonly default: undefined
          }
          readonly prefixCls: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly style: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onError?: ((_error: Error) => any) | undefined
          onReady?: (() => any) | undefined
          'onRender-type-change'?: ((_value: import('./index.js').RenderType) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly code: string
        readonly header: string | Record<string, unknown>
        readonly style: Record<string, string>
        readonly themeOverrides: Record<string, unknown>
        readonly config: import('./index.js').MermaidConfig
        readonly actions: import('./index.js').MermaidActions
        readonly className: string
        readonly classNames: Record<string, string>
        readonly styles: Record<string, string>
        readonly onRenderTypeChange: (value: import('./index.js').RenderType) => void
        readonly prefixCls: string
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly code: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly header: {
          readonly type: import('vue').PropType<string | Record<string, unknown>>
          readonly default: null
        }
        readonly className: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly classNames: {
          readonly type: import('vue').PropType<Record<string, string>>
          readonly default: () => {}
        }
        readonly styles: {
          readonly type: import('vue').PropType<Record<string, string>>
          readonly default: () => {}
        }
        readonly config: {
          readonly type: import('vue').PropType<import('./index.js').MermaidConfig>
          readonly default: () => {}
        }
        readonly actions: {
          readonly type: import('vue').PropType<import('./index.js').MermaidActions>
          readonly default: () => {
            enableZoom: boolean
            enableDownload: boolean
            enableCopy: boolean
          }
        }
        readonly onRenderTypeChange: {
          readonly type: import('vue').PropType<(value: import('./index.js').RenderType) => void>
          readonly default: undefined
        }
        readonly prefixCls: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly style: {
          readonly type: import('vue').PropType<Record<string, string>>
          readonly default: () => {}
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<Record<string, unknown>>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onError?: ((_error: Error) => any) | undefined
        onReady?: (() => any) | undefined
        'onRender-type-change'?: ((_value: import('./index.js').RenderType) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      error: (_error: Error) => void
      ready: () => void
      'render-type-change': (_value: import('./index.js').RenderType) => void
    },
    string,
    {
      readonly code: string
      readonly header: string | Record<string, unknown>
      readonly style: Record<string, string>
      readonly themeOverrides: Record<string, unknown>
      readonly config: import('./index.js').MermaidConfig
      readonly actions: import('./index.js').MermaidActions
      readonly className: string
      readonly classNames: Record<string, string>
      readonly styles: Record<string, string>
      readonly onRenderTypeChange: (value: import('./index.js').RenderType) => void
      readonly prefixCls: string
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
        header?: (props: {}) => any
      } & {
        extra?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhAiMermaid
export * from './src/ai-mermaid'
export type AiMermaidInstance = InstanceType<typeof AiMermaid>
export type YhAiMermaidInstance = AiMermaidInstance
export type YhAiMermaidProps = import('./src/ai-mermaid').AiMermaidProps
export type YhAiMermaidEmits = import('./src/ai-mermaid').AiMermaidEmits
export type YhAiMermaidSlots = import('./src/ai-mermaid').AiMermaidSlots
export type YhMermaidConfig = import('./src/ai-mermaid').MermaidConfig
export type YhMermaidActions = import('./src/ai-mermaid').MermaidActions
export type YhRenderType = import('./src/ai-mermaid').RenderType
