import AiVoiceTrigger from './src/ai-voice-trigger.vue'
export declare const YhAiVoiceTrigger: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly recording: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly amplitudes: {
            readonly type: import('vue').PropType<number[]>
            readonly default: () => any[]
          }
          readonly variant: {
            readonly type: import('vue').PropType<'inline' | 'floating' | 'sphere'>
            readonly default: 'inline'
          }
          readonly position: {
            readonly type: import('vue').PropType<
              'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
            >
            readonly default: 'bottom-right'
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly teleport: {
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
          onCancel?: (() => any) | undefined
          onStart?: (() => any) | undefined
          onStop?: (() => any) | undefined
          'onUpdate:recording'?: ((value: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        cancel: () => void
        start: () => void
        stop: () => void
        'update:recording': (value: boolean) => void
      },
      import('vue').PublicProps,
      {
        readonly recording: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly variant: 'inline' | 'floating' | 'sphere'
        readonly position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        readonly offset: [number, number]
        readonly teleport: boolean
        readonly amplitudes: number[]
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
          readonly recording: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly amplitudes: {
            readonly type: import('vue').PropType<number[]>
            readonly default: () => any[]
          }
          readonly variant: {
            readonly type: import('vue').PropType<'inline' | 'floating' | 'sphere'>
            readonly default: 'inline'
          }
          readonly position: {
            readonly type: import('vue').PropType<
              'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
            >
            readonly default: 'bottom-right'
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly teleport: {
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
          onCancel?: (() => any) | undefined
          onStart?: (() => any) | undefined
          onStop?: (() => any) | undefined
          'onUpdate:recording'?: ((value: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly recording: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly variant: 'inline' | 'floating' | 'sphere'
        readonly position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        readonly offset: [number, number]
        readonly teleport: boolean
        readonly amplitudes: number[]
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly recording: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly amplitudes: {
          readonly type: import('vue').PropType<number[]>
          readonly default: () => any[]
        }
        readonly variant: {
          readonly type: import('vue').PropType<'inline' | 'floating' | 'sphere'>
          readonly default: 'inline'
        }
        readonly position: {
          readonly type: import('vue').PropType<
            'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
          >
          readonly default: 'bottom-right'
        }
        readonly offset: {
          readonly type: import('vue').PropType<[number, number]>
          readonly default: () => number[]
        }
        readonly teleport: {
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
        onCancel?: (() => any) | undefined
        onStart?: (() => any) | undefined
        onStop?: (() => any) | undefined
        'onUpdate:recording'?: ((value: boolean) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      cancel: () => void
      start: () => void
      stop: () => void
      'update:recording': (value: boolean) => void
    },
    string,
    {
      readonly recording: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly variant: 'inline' | 'floating' | 'sphere'
      readonly position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      readonly offset: [number, number]
      readonly teleport: boolean
      readonly amplitudes: number[]
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
export default YhAiVoiceTrigger
export * from './src/ai-voice-trigger'
export type AiVoiceTriggerInstance = InstanceType<typeof AiVoiceTrigger>
export type YhAiVoiceTriggerInstance = AiVoiceTriggerInstance
export type YhAiVoiceTriggerProps = import('./src/ai-voice-trigger').AiVoiceTriggerProps
export type YhAiVoiceTriggerEmits = import('./src/ai-voice-trigger').AiVoiceTriggerEmits
export type YhAiVoiceTriggerEmitMap = import('./src/ai-voice-trigger').AiVoiceTriggerEmitMap
export type YhAiVoiceTriggerSlots = import('./src/ai-voice-trigger').AiVoiceTriggerSlots
