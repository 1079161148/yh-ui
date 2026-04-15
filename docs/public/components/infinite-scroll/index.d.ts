import InfiniteScroll from './src/infinite-scroll.vue'
export declare const YhInfiniteScroll: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
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
            readonly type: import('vue').PropType<import('./index.js').InfiniteScrollDirection>
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
      import('vue').PublicProps,
      {
        readonly loading: boolean
        readonly finished: boolean
        readonly error: boolean
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly direction: import('./index.js').InfiniteScrollDirection
        readonly target: string
        readonly loadingText: string
        readonly threshold: number
        readonly rootMargin: string
        readonly finishedText: string
        readonly errorText: string
        readonly immediateCheck: boolean
        readonly useObserver: boolean
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
            readonly type: import('vue').PropType<import('./index.js').InfiniteScrollDirection>
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
        check: () => void
        retry: () => void
      },
      {},
      {},
      {},
      {
        readonly loading: boolean
        readonly finished: boolean
        readonly error: boolean
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly direction: import('./index.js').InfiniteScrollDirection
        readonly target: string
        readonly loadingText: string
        readonly threshold: number
        readonly rootMargin: string
        readonly finishedText: string
        readonly errorText: string
        readonly immediateCheck: boolean
        readonly useObserver: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
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
          readonly type: import('vue').PropType<import('./index.js').InfiniteScrollDirection>
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
    {
      readonly loading: boolean
      readonly finished: boolean
      readonly error: boolean
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly direction: import('./index.js').InfiniteScrollDirection
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
      } & {
        loading?: (props: {}) => any
      } & {
        finished?: (props: {}) => any
      } & {
        error?: (props: {}) => any
      }
    })
> & {
  directive: import('vue').Directive
}
export declare const vYhInfiniteScroll: import('@yh-ui/utils').SFCWithInstall<
  import('vue').Directive
>
export default YhInfiniteScroll
export * from './src/infinite-scroll'
export * from './src/directive'
export type InfiniteScrollInstance = InstanceType<typeof InfiniteScroll>
export type YhInfiniteScrollInstance = InfiniteScrollInstance
export type YhInfiniteScrollProps = import('./src/infinite-scroll').InfiniteScrollProps
export type YhInfiniteScrollEmits = import('./src/infinite-scroll').InfiniteScrollEmits
export type YhInfiniteScrollSlots = import('./src/infinite-scroll').InfiniteScrollSlots
export type YhInfiniteScrollExpose = import('./src/infinite-scroll').InfiniteScrollExpose
