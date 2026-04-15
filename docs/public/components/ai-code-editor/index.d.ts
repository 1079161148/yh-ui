import AiCodeEditor from './src/ai-code-editor.vue'
export declare const YhAiCodeEditor: import('@yh-ui/utils').SFCWithInstall<
  import('vue').DefineComponent<
    import('vue').ExtractPropTypes<{
      readonly language: {
        readonly type: StringConstructor
        readonly default: 'javascript'
      }
      readonly modelValue: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly initialValue: {
        readonly type: StringConstructor
        readonly default: undefined
      }
      readonly readonly: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly theme: {
        readonly type: StringConstructor
        readonly default: 'vs-dark'
        readonly validator: (value: string) => boolean
      }
      readonly height: {
        readonly type: import('vue').PropType<string | number>
        readonly default: 300
      }
      readonly minimap: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly wordWrap: {
        readonly type: StringConstructor
        readonly default: 'on'
        readonly validator: (value: string) => boolean
      }
      readonly fontSize: {
        readonly type: NumberConstructor
        readonly default: 14
      }
      readonly tabSize: {
        readonly type: NumberConstructor
        readonly default: 2
      }
      readonly autofocus: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>,
    {
      getEditor: () => import('monaco-editor').editor.IStandaloneCodeEditor | null
      focus: () => void
      setValue: (value: string) => void
      getValue: () => string
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      change: (value: string) => void
      'update:modelValue': (value: string) => void
      mount: () => void
      dispose: () => void
    },
    string,
    import('vue').PublicProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly language: {
          readonly type: StringConstructor
          readonly default: 'javascript'
        }
        readonly modelValue: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly initialValue: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly readonly: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly theme: {
          readonly type: StringConstructor
          readonly default: 'vs-dark'
          readonly validator: (value: string) => boolean
        }
        readonly height: {
          readonly type: import('vue').PropType<string | number>
          readonly default: 300
        }
        readonly minimap: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly wordWrap: {
          readonly type: StringConstructor
          readonly default: 'on'
          readonly validator: (value: string) => boolean
        }
        readonly fontSize: {
          readonly type: NumberConstructor
          readonly default: 14
        }
        readonly tabSize: {
          readonly type: NumberConstructor
          readonly default: 2
        }
        readonly autofocus: {
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
        onChange?: ((value: string) => any) | undefined
        'onUpdate:modelValue'?: ((value: string) => any) | undefined
        onMount?: (() => any) | undefined
        onDispose?: (() => any) | undefined
      }>,
    {
      readonly readonly: boolean
      readonly language: string
      readonly theme: string
      readonly fontSize: number
      readonly height: string | number
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly autofocus: boolean
      readonly modelValue: string
      readonly tabSize: number
      readonly wordWrap: string
      readonly initialValue: string
      readonly minimap: boolean
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
> &
  Record<string, unknown>
export default YhAiCodeEditor
export * from './src/ai-code-editor'
export type AiCodeEditorInstance = InstanceType<typeof AiCodeEditor>
export type YhAiCodeEditorInstance = AiCodeEditorInstance
export type YhAiCodeEditorProps = import('./src/ai-code-editor').AiCodeEditorProps
export type YhAiCodeEditorEmits = import('./src/ai-code-editor').AiCodeEditorEmits
export type YhAiCodeEditorSlots = import('./src/ai-code-editor').AiCodeEditorSlots
export type YhAiCodeEditorExpose = import('./src/ai-code-editor').AiCodeEditorExpose
