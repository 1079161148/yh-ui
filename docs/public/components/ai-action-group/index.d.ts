import AiActionGroup from './src/ai-action-group.vue'
export declare const YhAiActionGroup: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').ActionItem[]>
            readonly default: () => never[]
          }
          readonly size: {
            readonly type: import('vue').PropType<'small' | 'default' | 'large'>
            readonly default: 'small'
          }
          readonly variant: {
            readonly type: import('vue').PropType<'text' | 'ghost' | 'outlined'>
            readonly default: 'text'
          }
          readonly direction: {
            readonly type: import('vue').PropType<'horizontal' | 'vertical'>
            readonly default: 'horizontal'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((key: string, _item: import('./index.js').ActionItem) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        click: (key: string, _item: import('./index.js').ActionItem) => void
      },
      import('vue').PublicProps,
      {
        readonly size: 'large' | 'default' | 'small'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly variant: 'text' | 'outlined' | 'ghost'
        readonly direction: 'vertical' | 'horizontal'
        readonly items: import('./index.js').ActionItem[]
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
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').ActionItem[]>
            readonly default: () => never[]
          }
          readonly size: {
            readonly type: import('vue').PropType<'small' | 'default' | 'large'>
            readonly default: 'small'
          }
          readonly variant: {
            readonly type: import('vue').PropType<'text' | 'ghost' | 'outlined'>
            readonly default: 'text'
          }
          readonly direction: {
            readonly type: import('vue').PropType<'horizontal' | 'vertical'>
            readonly default: 'horizontal'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((key: string, _item: import('./index.js').ActionItem) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly size: 'large' | 'default' | 'small'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly variant: 'text' | 'outlined' | 'ghost'
        readonly direction: 'vertical' | 'horizontal'
        readonly items: import('./index.js').ActionItem[]
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly items: {
          readonly type: import('vue').PropType<import('./index.js').ActionItem[]>
          readonly default: () => never[]
        }
        readonly size: {
          readonly type: import('vue').PropType<'small' | 'default' | 'large'>
          readonly default: 'small'
        }
        readonly variant: {
          readonly type: import('vue').PropType<'text' | 'ghost' | 'outlined'>
          readonly default: 'text'
        }
        readonly direction: {
          readonly type: import('vue').PropType<'horizontal' | 'vertical'>
          readonly default: 'horizontal'
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClick?: ((key: string, _item: import('./index.js').ActionItem) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      click: (key: string, _item: import('./index.js').ActionItem) => void
    },
    string,
    {
      readonly size: 'large' | 'default' | 'small'
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly variant: 'text' | 'outlined' | 'ghost'
      readonly direction: 'vertical' | 'horizontal'
      readonly items: import('./index.js').ActionItem[]
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
export default YhAiActionGroup
export * from './src/ai-action-group'
export type AiActionGroupInstance = InstanceType<typeof AiActionGroup>
export type YhAiActionGroupInstance = AiActionGroupInstance
export type YhAiActionGroupProps = import('./src/ai-action-group').AiActionGroupProps
export type YhAiActionGroupEmits = import('./src/ai-action-group').AiActionGroupEmits
export type YhAiActionGroupSlots = import('./src/ai-action-group').AiActionGroupSlots
export type YhAiActionItem = import('./src/ai-action-group').ActionItem
