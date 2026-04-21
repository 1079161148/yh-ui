declare var __VLS_9: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly status: {
      readonly type: import('vue').PropType<import('./ai-thinking').AiThinkingStatus>
      readonly default: 'thinking'
    }
    readonly title: StringConstructor
    readonly content: StringConstructor
    readonly modelValue: BooleanConstructor
    readonly autoCollapse: {
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
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    'update:modelValue': (value: boolean) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly status: {
        readonly type: import('vue').PropType<import('./ai-thinking').AiThinkingStatus>
        readonly default: 'thinking'
      }
      readonly title: StringConstructor
      readonly content: StringConstructor
      readonly modelValue: BooleanConstructor
      readonly autoCollapse: {
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
      'onUpdate:modelValue'?: ((value: boolean) => any) | undefined
    }>,
  {
    readonly style: Record<string, string>
    readonly status: import('./ai-thinking').AiThinkingStatus
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly modelValue: boolean
    readonly className: string
    readonly autoCollapse: boolean
    readonly classNames: Record<string, string>
    readonly styles: Record<string, string>
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
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
