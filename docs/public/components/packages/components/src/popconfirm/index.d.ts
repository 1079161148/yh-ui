export declare const YhPopconfirm: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly title: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly description: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly confirmButtonText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly cancelButtonText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly confirmButtonType: {
            readonly type: import('vue').PropType<
              'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
            >
            readonly default: 'primary'
          }
          readonly cancelButtonType: {
            readonly type: import('vue').PropType<
              'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
            >
            readonly default: 'default'
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: 'warning'
          }
          readonly iconColor: {
            readonly type: StringConstructor
            readonly default: '#faad14'
          }
          readonly hideIcon: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly hideCancel: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('../index.js').TooltipPlacement>
            readonly default: 'top'
          }
          readonly visible: {
            readonly type: import('vue').PropType<boolean | null>
            readonly default: null
          }
          readonly width: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 180
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showDontAskAgain: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly dontAskAgainText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly swapButtons: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly beforeConfirm: {
            readonly type: import('vue').PropType<() => boolean | Promise<boolean>>
            readonly default: null
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onConfirm?: ((_dontAskAgain?: boolean | undefined) => any) | undefined
          onCancel?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
        }>,
      {
        visible: import('vue').WritableComputedRef<boolean, boolean>
        toggle: (val: boolean) => boolean
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        confirm: (_dontAskAgain?: boolean | undefined) => void
        cancel: () => void
        'update:visible': (visible: boolean) => void
      },
      import('vue').PublicProps,
      {
        readonly title: string
        readonly description: string
        readonly disabled: boolean
        readonly width: string | number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly iconColor: string
        readonly icon: string
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean | null
        readonly placement:
          | 'top'
          | 'left'
          | 'right'
          | 'bottom'
          | 'top-start'
          | 'top-end'
          | 'bottom-start'
          | 'bottom-end'
          | 'left-start'
          | 'left-end'
          | 'right-start'
          | 'right-end'
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly showArrow: boolean
        readonly confirmButtonText: string
        readonly cancelButtonText: string
        readonly confirmButtonType:
          | 'default'
          | 'success'
          | 'warning'
          | 'info'
          | 'primary'
          | 'danger'
        readonly cancelButtonType: 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
        readonly hideIcon: boolean
        readonly hideCancel: boolean
        readonly showDontAskAgain: boolean
        readonly dontAskAgainText: string
        readonly swapButtons: boolean
        readonly beforeConfirm: () => boolean | Promise<boolean>
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
          readonly title: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly description: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly confirmButtonText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly cancelButtonText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly confirmButtonType: {
            readonly type: import('vue').PropType<
              'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
            >
            readonly default: 'primary'
          }
          readonly cancelButtonType: {
            readonly type: import('vue').PropType<
              'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
            >
            readonly default: 'default'
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: 'warning'
          }
          readonly iconColor: {
            readonly type: StringConstructor
            readonly default: '#faad14'
          }
          readonly hideIcon: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly hideCancel: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('../index.js').TooltipPlacement>
            readonly default: 'top'
          }
          readonly visible: {
            readonly type: import('vue').PropType<boolean | null>
            readonly default: null
          }
          readonly width: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 180
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showDontAskAgain: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly dontAskAgainText: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly swapButtons: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly beforeConfirm: {
            readonly type: import('vue').PropType<() => boolean | Promise<boolean>>
            readonly default: null
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onConfirm?: ((_dontAskAgain?: boolean | undefined) => any) | undefined
          onCancel?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
        }>,
      {
        visible: import('vue').WritableComputedRef<boolean, boolean>
        toggle: (val: boolean) => boolean
      },
      {},
      {},
      {},
      {
        readonly title: string
        readonly description: string
        readonly disabled: boolean
        readonly width: string | number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly iconColor: string
        readonly icon: string
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean | null
        readonly placement:
          | 'top'
          | 'left'
          | 'right'
          | 'bottom'
          | 'top-start'
          | 'top-end'
          | 'bottom-start'
          | 'bottom-end'
          | 'left-start'
          | 'left-end'
          | 'right-start'
          | 'right-end'
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly showArrow: boolean
        readonly confirmButtonText: string
        readonly cancelButtonText: string
        readonly confirmButtonType:
          | 'default'
          | 'success'
          | 'warning'
          | 'info'
          | 'primary'
          | 'danger'
        readonly cancelButtonType: 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
        readonly hideIcon: boolean
        readonly hideCancel: boolean
        readonly showDontAskAgain: boolean
        readonly dontAskAgainText: string
        readonly swapButtons: boolean
        readonly beforeConfirm: () => boolean | Promise<boolean>
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly title: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly description: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly confirmButtonText: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly cancelButtonText: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly confirmButtonType: {
          readonly type: import('vue').PropType<
            'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
          >
          readonly default: 'primary'
        }
        readonly cancelButtonType: {
          readonly type: import('vue').PropType<
            'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
          >
          readonly default: 'default'
        }
        readonly icon: {
          readonly type: StringConstructor
          readonly default: 'warning'
        }
        readonly iconColor: {
          readonly type: StringConstructor
          readonly default: '#faad14'
        }
        readonly hideIcon: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly hideCancel: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly offset: {
          readonly type: import('vue').PropType<[number, number]>
          readonly default: () => number[]
        }
        readonly placement: {
          readonly type: import('vue').PropType<import('../index.js').TooltipPlacement>
          readonly default: 'top'
        }
        readonly visible: {
          readonly type: import('vue').PropType<boolean | null>
          readonly default: null
        }
        readonly width: {
          readonly type: import('vue').PropType<string | number>
          readonly default: 180
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly zIndex: {
          readonly type: NumberConstructor
          readonly default: 2000
        }
        readonly showArrow: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly popperStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: () => {}
        }
        readonly teleported: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly showDontAskAgain: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly dontAskAgainText: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly swapButtons: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly beforeConfirm: {
          readonly type: import('vue').PropType<() => boolean | Promise<boolean>>
          readonly default: null
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onConfirm?: ((_dontAskAgain?: boolean | undefined) => any) | undefined
        onCancel?: (() => any) | undefined
        'onUpdate:visible'?: ((visible: boolean) => any) | undefined
      }>,
    {
      visible: import('vue').WritableComputedRef<boolean, boolean>
      toggle: (val: boolean) => boolean
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      confirm: (_dontAskAgain?: boolean | undefined) => void
      cancel: () => void
      'update:visible': (visible: boolean) => void
    },
    string,
    {
      readonly title: string
      readonly description: string
      readonly disabled: boolean
      readonly width: string | number
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly iconColor: string
      readonly icon: string
      readonly zIndex: number
      readonly offset: [number, number]
      readonly visible: boolean | null
      readonly placement:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'left-start'
        | 'left-end'
        | 'right-start'
        | 'right-end'
      readonly popperClass: string
      readonly teleported: boolean
      readonly popperStyle: import('vue').StyleValue
      readonly showArrow: boolean
      readonly confirmButtonText: string
      readonly cancelButtonText: string
      readonly confirmButtonType: 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
      readonly cancelButtonType: 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
      readonly hideIcon: boolean
      readonly hideCancel: boolean
      readonly showDontAskAgain: boolean
      readonly dontAskAgainText: string
      readonly swapButtons: boolean
      readonly beforeConfirm: () => boolean | Promise<boolean>
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
        icon?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        description?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhPopconfirm
export * from './src/popconfirm'
export type { PopconfirmInstance } from './src/instance'
export type YhPopconfirmInstance = import('./src/instance').PopconfirmInstance
export type YhPopconfirmProps = import('./src/popconfirm').PopconfirmProps
export type YhPopconfirmEmits = import('./src/popconfirm').PopconfirmEmits
export type YhPopconfirmSlots = import('./src/popconfirm').PopconfirmSlots
export type YhPopconfirmExpose = import('./src/popconfirm').PopconfirmExpose
