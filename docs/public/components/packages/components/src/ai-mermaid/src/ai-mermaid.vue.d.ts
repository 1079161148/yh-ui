import { type RenderType } from './ai-mermaid'
declare var __VLS_1: {}, __VLS_3: {}
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any
} & {
  extra?: (props: typeof __VLS_3) => any
}
declare const __VLS_component: import('vue').DefineComponent<
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
      readonly type: import('vue').PropType<import('./ai-mermaid').MermaidConfig>
      readonly default: () => {}
    }
    readonly actions: {
      readonly type: import('vue').PropType<import('./ai-mermaid').MermaidActions>
      readonly default: () => {
        enableZoom: boolean
        enableDownload: boolean
        enableCopy: boolean
      }
    }
    readonly onRenderTypeChange: {
      readonly type: import('vue').PropType<(value: RenderType) => void>
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
    'render-type-change': (_value: RenderType) => void
  },
  string,
  import('vue').PublicProps,
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
        readonly type: import('vue').PropType<import('./ai-mermaid').MermaidConfig>
        readonly default: () => {}
      }
      readonly actions: {
        readonly type: import('vue').PropType<import('./ai-mermaid').MermaidActions>
        readonly default: () => {
          enableZoom: boolean
          enableDownload: boolean
          enableCopy: boolean
        }
      }
      readonly onRenderTypeChange: {
        readonly type: import('vue').PropType<(value: RenderType) => void>
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
      'onRender-type-change'?: ((_value: RenderType) => any) | undefined
    }>,
  {
    readonly code: string
    readonly header: string | Record<string, unknown>
    readonly style: Record<string, string>
    readonly themeOverrides: Record<string, unknown>
    readonly config: import('./ai-mermaid').MermaidConfig
    readonly actions: import('./ai-mermaid').MermaidActions
    readonly className: string
    readonly classNames: Record<string, string>
    readonly styles: Record<string, string>
    readonly onRenderTypeChange: (value: RenderType) => void
    readonly prefixCls: string
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
