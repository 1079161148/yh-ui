declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {}, __VLS_11: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  loading?: (props: typeof __VLS_3) => any
} & {
  finished?: (props: typeof __VLS_9) => any
} & {
  error?: (props: typeof __VLS_11) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly loading: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly finished: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly error: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly threshold: {
      readonly type: NumberConstructor
      readonly default: 100
    }
    readonly direction: {
      readonly type: import('vue').PropType<import('./infinite-scroll').InfiniteScrollDirection>
      readonly default: 'vertical'
    }
    readonly loadingText: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly finishedText: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly errorText: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly immediateCheck: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly target: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly useObserver: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly rootMargin: {
      readonly type: StringConstructor
      readonly default: '0px'
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    check: () => void
    retry: () => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    load: () => void
    'update:loading': (val: boolean) => void
    'update:error': (val: boolean) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly loading: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly finished: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly error: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly threshold: {
        readonly type: NumberConstructor
        readonly default: 100
      }
      readonly direction: {
        readonly type: import('vue').PropType<import('./infinite-scroll').InfiniteScrollDirection>
        readonly default: 'vertical'
      }
      readonly loadingText: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly finishedText: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly errorText: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly immediateCheck: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly target: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly useObserver: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly rootMargin: {
        readonly type: StringConstructor
        readonly default: '0px'
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onLoad?: (() => any) | undefined
      'onUpdate:loading'?: ((val: boolean) => any) | undefined
      'onUpdate:error'?: ((val: boolean) => any) | undefined
    }>,
  {
    readonly loading: boolean
    readonly finished: boolean
    readonly error: boolean
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly direction: import('./infinite-scroll').InfiniteScrollDirection
    readonly target: string
    readonly loadingText: string
    readonly threshold: number
    readonly rootMargin: string
    readonly finishedText: string
    readonly errorText: string
    readonly immediateCheck: boolean
    readonly useObserver: boolean
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
