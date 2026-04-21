import type { CSSProperties } from 'vue'
declare var __VLS_5: {
  fixed: boolean
}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly offset: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly position: {
      readonly type: import('vue').PropType<import('./affix').AffixPosition>
      readonly default: 'top'
    }
    readonly target: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly zIndex: {
      readonly type: NumberConstructor
      readonly default: 100
    }
    readonly teleported: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly appendTo: {
      readonly type: import('vue').PropType<string | HTMLElement>
      readonly default: 'body'
    }
    readonly affixStyle: {
      readonly type: import('vue').PropType<CSSProperties>
      readonly default: () => {}
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    update: () => void
    fixed: import('vue').Ref<boolean>
    scrollTop: import('vue').Ref<number>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    scroll: (payload: { scrollTop: number; fixed: boolean }) => void
    change: (fixed: boolean) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly offset: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly position: {
        readonly type: import('vue').PropType<import('./affix').AffixPosition>
        readonly default: 'top'
      }
      readonly target: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly zIndex: {
        readonly type: NumberConstructor
        readonly default: 100
      }
      readonly teleported: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly appendTo: {
        readonly type: import('vue').PropType<string | HTMLElement>
        readonly default: 'body'
      }
      readonly affixStyle: {
        readonly type: import('vue').PropType<CSSProperties>
        readonly default: () => {}
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onScroll?: ((payload: { scrollTop: number; fixed: boolean }) => any) | undefined
      onChange?: ((fixed: boolean) => any) | undefined
    }>,
  {
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly position: import('./affix').AffixPosition
    readonly zIndex: number
    readonly offset: number
    readonly target: string
    readonly teleported: boolean
    readonly appendTo: string | HTMLElement
    readonly affixStyle: CSSProperties
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
