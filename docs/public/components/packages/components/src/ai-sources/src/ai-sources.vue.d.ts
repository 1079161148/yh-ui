import { type AiSourceItem } from './ai-sources'
declare var __VLS_77: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_77) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly sources: {
      readonly type: import('vue').PropType<AiSourceItem[]>
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
    click: (source: AiSourceItem) => void
    open: (source: AiSourceItem) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly sources: {
        readonly type: import('vue').PropType<AiSourceItem[]>
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
      onClick?: ((source: AiSourceItem) => any) | undefined
      onOpen?: ((source: AiSourceItem) => any) | undefined
    }>,
  {
    readonly mode: 'card' | 'badge' | 'inline'
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly showScore: boolean
    readonly sources: AiSourceItem[]
    readonly maxVisible: number
    readonly showFileType: boolean
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
