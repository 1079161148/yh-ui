import AiSender from './src/ai-sender.vue'
export declare const YhAiSender: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly placeholder: {
            readonly type: StringConstructor
            readonly default: 'Send a message...'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly clearable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly maxLength: NumberConstructor
          readonly showWordLimit: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly commands: {
            readonly type: import('vue').PropType<import('./index.js').AiCommand[]>
            readonly default: () => never[]
          }
          readonly mentionOptions: {
            readonly type: import('vue').PropType<import('../index.js').AiMentionOption[]>
            readonly default: () => never[]
          }
          readonly attachments: {
            readonly type: import('vue').PropType<import('./index.js').AiAttachment[]>
            readonly default: () => never[]
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClear?: (() => any) | undefined
          onUpload?: ((_files: File[]) => any) | undefined
          onFocus?: ((_e: FocusEvent) => any) | undefined
          onChange?: ((_val: string) => any) | undefined
          onBlur?: ((_e: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?: ((_val: string) => any) | undefined
          onSend?: ((_val: string) => any) | undefined
          onCommand?: ((_command: import('./index.js').AiCommand) => any) | undefined
          'onRemove-attachment'?:
            | ((_attachment: import('./index.js').AiAttachment) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        clear: () => void
        upload: (_files: File[]) => void
        focus: (_e: FocusEvent) => void
        change: (_val: string) => void
        blur: (_e: FocusEvent) => void
        'update:modelValue': (_val: string) => void
        send: (_val: string) => void
        command: (_command: import('./index.js').AiCommand) => void
        'remove-attachment': (_attachment: import('./index.js').AiAttachment) => void
      },
      import('vue').PublicProps,
      {
        readonly loading: boolean
        readonly placeholder: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: string
        readonly clearable: boolean
        readonly showWordLimit: boolean
        readonly commands: import('./index.js').AiCommand[]
        readonly mentionOptions: import('../index.js').AiMentionOption[]
        readonly attachments: import('./index.js').AiAttachment[]
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
          readonly modelValue: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly placeholder: {
            readonly type: StringConstructor
            readonly default: 'Send a message...'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly clearable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly maxLength: NumberConstructor
          readonly showWordLimit: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly commands: {
            readonly type: import('vue').PropType<import('./index.js').AiCommand[]>
            readonly default: () => never[]
          }
          readonly mentionOptions: {
            readonly type: import('vue').PropType<import('../index.js').AiMentionOption[]>
            readonly default: () => never[]
          }
          readonly attachments: {
            readonly type: import('vue').PropType<import('./index.js').AiAttachment[]>
            readonly default: () => never[]
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClear?: (() => any) | undefined
          onUpload?: ((_files: File[]) => any) | undefined
          onFocus?: ((_e: FocusEvent) => any) | undefined
          onChange?: ((_val: string) => any) | undefined
          onBlur?: ((_e: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?: ((_val: string) => any) | undefined
          onSend?: ((_val: string) => any) | undefined
          onCommand?: ((_command: import('./index.js').AiCommand) => any) | undefined
          'onRemove-attachment'?:
            | ((_attachment: import('./index.js').AiAttachment) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly loading: boolean
        readonly placeholder: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: string
        readonly clearable: boolean
        readonly showWordLimit: boolean
        readonly commands: import('./index.js').AiCommand[]
        readonly mentionOptions: import('../index.js').AiMentionOption[]
        readonly attachments: import('./index.js').AiAttachment[]
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly modelValue: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly placeholder: {
          readonly type: StringConstructor
          readonly default: 'Send a message...'
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly loading: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly clearable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly maxLength: NumberConstructor
        readonly showWordLimit: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly commands: {
          readonly type: import('vue').PropType<import('./index.js').AiCommand[]>
          readonly default: () => never[]
        }
        readonly mentionOptions: {
          readonly type: import('vue').PropType<import('../index.js').AiMentionOption[]>
          readonly default: () => never[]
        }
        readonly attachments: {
          readonly type: import('vue').PropType<import('./index.js').AiAttachment[]>
          readonly default: () => never[]
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClear?: (() => any) | undefined
        onUpload?: ((_files: File[]) => any) | undefined
        onFocus?: ((_e: FocusEvent) => any) | undefined
        onChange?: ((_val: string) => any) | undefined
        onBlur?: ((_e: FocusEvent) => any) | undefined
        'onUpdate:modelValue'?: ((_val: string) => any) | undefined
        onSend?: ((_val: string) => any) | undefined
        onCommand?: ((_command: import('./index.js').AiCommand) => any) | undefined
        'onRemove-attachment'?:
          | ((_attachment: import('./index.js').AiAttachment) => any)
          | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      clear: () => void
      upload: (_files: File[]) => void
      focus: (_e: FocusEvent) => void
      change: (_val: string) => void
      blur: (_e: FocusEvent) => void
      'update:modelValue': (_val: string) => void
      send: (_val: string) => void
      command: (_command: import('./index.js').AiCommand) => void
      'remove-attachment': (_attachment: import('./index.js').AiAttachment) => void
    },
    string,
    {
      readonly loading: boolean
      readonly placeholder: string
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly modelValue: string
      readonly clearable: boolean
      readonly showWordLimit: boolean
      readonly commands: import('./index.js').AiCommand[]
      readonly mentionOptions: import('../index.js').AiMentionOption[]
      readonly attachments: import('./index.js').AiAttachment[]
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
        prefix?: (props: {}) => any
      } & {
        actions?: (props: {}) => any
      } & {
        submit?: (props: { disabled: boolean; loading: boolean; submit: () => void }) => any
      }
    })
> &
  Record<string, unknown>
export default YhAiSender
export * from './src/ai-sender'
export type AiSenderInstance = InstanceType<typeof AiSender>
export type YhAiSenderInstance = AiSenderInstance
export type YhAiSenderProps = import('./src/ai-sender').AiSenderProps
export type YhAiSenderEmits = import('./src/ai-sender').AiSenderEmits
export type YhAiSenderSlots = import('./src/ai-sender').AiSenderSlots
export type YhAiCommand = import('./src/ai-sender').AiCommand
export type YhAiAttachment = import('./src/ai-sender').AiAttachment
