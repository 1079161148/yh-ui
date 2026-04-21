import AiThoughtChain from './src/ai-thought-chain.vue'
export declare const YhAiThoughtChain: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly title: StringConstructor
          readonly thinking: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly content: StringConstructor
          readonly status: {
            readonly type: import('vue').PropType<import('./index.js').AiThoughtStatus>
            readonly default: 'none'
          }
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').AiThoughtItem[]>
            readonly default: () => never[]
          }
          readonly autoCollapse: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly dotSize: {
            readonly type: import('vue').PropType<'small' | 'default' | 'large'>
            readonly default: 'default'
          }
          readonly lineGradient: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showProgress: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly draggable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly editable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly markdown: {
            readonly type: BooleanConstructor
            readonly default: true
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
          readonly style: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          'onNode-click'?:
            | ((item: import('./index.js').AiThoughtItem, index: number) => any)
            | undefined
          'onUpdate:items'?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
          'onNode-delete'?:
            | ((item: import('./index.js').AiThoughtItem, index: number) => any)
            | undefined
          'onNode-add'?: ((index: number) => any) | undefined
          onReorder?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        'node-click': (item: import('./index.js').AiThoughtItem, index: number) => void
        'update:items': (items: import('./index.js').AiThoughtItem[]) => void
        'node-delete': (item: import('./index.js').AiThoughtItem, index: number) => void
        'node-add': (index: number) => void
        reorder: (items: import('./index.js').AiThoughtItem[]) => void
      },
      import('vue').PublicProps,
      {
        readonly style: Record<string, string>
        readonly thinking: boolean
        readonly status: import('./index.js').AiThoughtStatus
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly dotSize: 'large' | 'default' | 'small'
        readonly draggable: boolean
        readonly editable: boolean
        readonly items: import('./index.js').AiThoughtItem[]
        readonly showProgress: boolean
        readonly className: string
        readonly markdown: boolean
        readonly autoCollapse: boolean
        readonly lineGradient: boolean
        readonly classNames: Record<string, string>
        readonly styles: Record<string, string>
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
          readonly title: StringConstructor
          readonly thinking: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly content: StringConstructor
          readonly status: {
            readonly type: import('vue').PropType<import('./index.js').AiThoughtStatus>
            readonly default: 'none'
          }
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').AiThoughtItem[]>
            readonly default: () => never[]
          }
          readonly autoCollapse: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly dotSize: {
            readonly type: import('vue').PropType<'small' | 'default' | 'large'>
            readonly default: 'default'
          }
          readonly lineGradient: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showProgress: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly draggable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly editable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly markdown: {
            readonly type: BooleanConstructor
            readonly default: true
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
          readonly style: {
            readonly type: import('vue').PropType<Record<string, string>>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          'onNode-click'?:
            | ((item: import('./index.js').AiThoughtItem, index: number) => any)
            | undefined
          'onUpdate:items'?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
          'onNode-delete'?:
            | ((item: import('./index.js').AiThoughtItem, index: number) => any)
            | undefined
          'onNode-add'?: ((index: number) => any) | undefined
          onReorder?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly style: Record<string, string>
        readonly thinking: boolean
        readonly status: import('./index.js').AiThoughtStatus
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly dotSize: 'large' | 'default' | 'small'
        readonly draggable: boolean
        readonly editable: boolean
        readonly items: import('./index.js').AiThoughtItem[]
        readonly showProgress: boolean
        readonly className: string
        readonly markdown: boolean
        readonly autoCollapse: boolean
        readonly lineGradient: boolean
        readonly classNames: Record<string, string>
        readonly styles: Record<string, string>
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly title: StringConstructor
        readonly thinking: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly content: StringConstructor
        readonly status: {
          readonly type: import('vue').PropType<import('./index.js').AiThoughtStatus>
          readonly default: 'none'
        }
        readonly items: {
          readonly type: import('vue').PropType<import('./index.js').AiThoughtItem[]>
          readonly default: () => never[]
        }
        readonly autoCollapse: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly dotSize: {
          readonly type: import('vue').PropType<'small' | 'default' | 'large'>
          readonly default: 'default'
        }
        readonly lineGradient: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly showProgress: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly draggable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly editable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly markdown: {
          readonly type: BooleanConstructor
          readonly default: true
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
        readonly style: {
          readonly type: import('vue').PropType<Record<string, string>>
          readonly default: () => {}
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        'onNode-click'?:
          | ((item: import('./index.js').AiThoughtItem, index: number) => any)
          | undefined
        'onUpdate:items'?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
        'onNode-delete'?:
          | ((item: import('./index.js').AiThoughtItem, index: number) => any)
          | undefined
        'onNode-add'?: ((index: number) => any) | undefined
        onReorder?: ((items: import('./index.js').AiThoughtItem[]) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      'node-click': (item: import('./index.js').AiThoughtItem, index: number) => void
      'update:items': (items: import('./index.js').AiThoughtItem[]) => void
      'node-delete': (item: import('./index.js').AiThoughtItem, index: number) => void
      'node-add': (index: number) => void
      reorder: (items: import('./index.js').AiThoughtItem[]) => void
    },
    string,
    {
      readonly style: Record<string, string>
      readonly thinking: boolean
      readonly status: import('./index.js').AiThoughtStatus
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly dotSize: 'large' | 'default' | 'small'
      readonly draggable: boolean
      readonly editable: boolean
      readonly items: import('./index.js').AiThoughtItem[]
      readonly showProgress: boolean
      readonly className: string
      readonly markdown: boolean
      readonly autoCollapse: boolean
      readonly lineGradient: boolean
      readonly classNames: Record<string, string>
      readonly styles: Record<string, string>
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
export default YhAiThoughtChain
export * from './src/ai-thought-chain'
export type AiThoughtChainInstance = InstanceType<typeof AiThoughtChain>
export type YhAiThoughtChainInstance = AiThoughtChainInstance
export type YhAiThoughtChainProps = import('./src/ai-thought-chain').AiThoughtChainProps
export type YhAiThoughtChainEmits = import('./src/ai-thought-chain').AiThoughtChainEmits
export type YhAiThoughtChainSlots = import('./src/ai-thought-chain').AiThoughtChainSlots
export type YhAiThoughtStatus = import('./src/ai-thought-chain').AiThoughtStatus
export type YhAiThoughtItem = import('./src/ai-thought-chain').AiThoughtItem
