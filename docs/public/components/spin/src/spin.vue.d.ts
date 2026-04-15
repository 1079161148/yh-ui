declare var __VLS_1: {}, __VLS_7: {}, __VLS_13: {}, __VLS_15: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  tip?: (props: typeof __VLS_7) => any
} & {
  tip?: (props: typeof __VLS_13) => any
} & {
  default?: (props: typeof __VLS_15) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly show: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly tip: StringConstructor
    readonly size: {
      readonly type: import('vue').PropType<'small' | 'default' | 'large' | number>
      readonly default: 'default'
    }
    readonly vertical: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly delay: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly glass: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly dot: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly type: {
      readonly type: import('vue').PropType<import('./spin').LoadingSpinnerType>
      readonly default: 'circle'
    }
    readonly color: {
      readonly type: import('vue').PropType<string | string[] | Record<string, string>>
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    visible: import('vue').ComputedRef<boolean>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    hide: () => void
    show: () => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly show: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly tip: StringConstructor
      readonly size: {
        readonly type: import('vue').PropType<'small' | 'default' | 'large' | number>
        readonly default: 'default'
      }
      readonly vertical: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly delay: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly glass: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly dot: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly type: {
        readonly type: import('vue').PropType<import('./spin').LoadingSpinnerType>
        readonly default: 'circle'
      }
      readonly color: {
        readonly type: import('vue').PropType<string | string[] | Record<string, string>>
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onHide?: (() => any) | undefined
      onShow?: (() => any) | undefined
    }>,
  {
    readonly size: number | 'large' | 'default' | 'small'
    readonly type: import('./spin').LoadingSpinnerType
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly vertical: boolean
    readonly show: boolean
    readonly dot: boolean
    readonly delay: number
    readonly glass: boolean
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
