import Drawer from './src/drawer.vue'
export declare const YhDrawer: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly title: {
            readonly type: import('vue').PropType<import('./index.js').DrawerRenderContent>
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('./index.js').DrawerPlacement>
            readonly default: 'right'
          }
          readonly size: {
            readonly type: import('vue').PropType<string | number>
            readonly default: '30%'
          }
          readonly modal: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeOnClickModal: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeOnPressEscape: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showClose: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeIcon: {
            readonly type: StringConstructor
            readonly default: 'close'
          }
          readonly destroyOnClose: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly zIndex: {
            readonly type: NumberConstructor
          }
          readonly teleportTo: {
            readonly type: import('vue').PropType<string | HTMLElement>
            readonly default: 'body'
          }
          readonly showHeader: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showFooter: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly customClass: StringConstructor
          readonly modalClass: StringConstructor
          readonly lockScroll: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly glass: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly resizable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly minSize: {
            readonly type: NumberConstructor
            readonly default: 150
          }
          readonly maxSize: {
            readonly type: NumberConstructor
            readonly default: 1000
          }
          readonly beforeClose: {
            readonly type: import('vue').PropType<(done: () => void) => void>
          }
          readonly titleStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly contentStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly footerStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly round: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly inner: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly drawerStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClose?: (() => any) | undefined
          onClosed?: (() => any) | undefined
          onResize?: ((size: number) => any) | undefined
          'onUpdate:modelValue'?: ((value: boolean) => any) | undefined
          onOpen?: (() => any) | undefined
          onOpened?: (() => any) | undefined
        }>,
      {
        drawerRef: import('vue').Ref<HTMLElement | null>
        handleClose: (isClickModal?: boolean) => void
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        close: () => void
        closed: () => void
        resize: (size: number) => void
        'update:modelValue': (value: boolean) => void
        open: () => void
        opened: () => void
      },
      import('vue').PublicProps,
      {
        readonly size: string | number
        readonly round: boolean
        readonly modal: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: boolean
        readonly inner: boolean
        readonly placement: import('./index.js').DrawerPlacement
        readonly showFooter: boolean
        readonly glass: boolean
        readonly closeIcon: string
        readonly lockScroll: boolean
        readonly closeOnClickModal: boolean
        readonly closeOnPressEscape: boolean
        readonly showClose: boolean
        readonly destroyOnClose: boolean
        readonly teleportTo: string | HTMLElement
        readonly showHeader: boolean
        readonly resizable: boolean
        readonly minSize: number
        readonly maxSize: number
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
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly title: {
            readonly type: import('vue').PropType<import('./index.js').DrawerRenderContent>
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('./index.js').DrawerPlacement>
            readonly default: 'right'
          }
          readonly size: {
            readonly type: import('vue').PropType<string | number>
            readonly default: '30%'
          }
          readonly modal: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeOnClickModal: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeOnPressEscape: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showClose: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly closeIcon: {
            readonly type: StringConstructor
            readonly default: 'close'
          }
          readonly destroyOnClose: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly zIndex: {
            readonly type: NumberConstructor
          }
          readonly teleportTo: {
            readonly type: import('vue').PropType<string | HTMLElement>
            readonly default: 'body'
          }
          readonly showHeader: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly showFooter: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly customClass: StringConstructor
          readonly modalClass: StringConstructor
          readonly lockScroll: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly glass: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly resizable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly minSize: {
            readonly type: NumberConstructor
            readonly default: 150
          }
          readonly maxSize: {
            readonly type: NumberConstructor
            readonly default: 1000
          }
          readonly beforeClose: {
            readonly type: import('vue').PropType<(done: () => void) => void>
          }
          readonly titleStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly contentStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly footerStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly round: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly inner: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly drawerStyle: import('vue').PropType<import('vue').CSSProperties | string>
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClose?: (() => any) | undefined
          onClosed?: (() => any) | undefined
          onResize?: ((size: number) => any) | undefined
          'onUpdate:modelValue'?: ((value: boolean) => any) | undefined
          onOpen?: (() => any) | undefined
          onOpened?: (() => any) | undefined
        }>,
      {
        drawerRef: import('vue').Ref<HTMLElement | null>
        handleClose: (isClickModal?: boolean) => void
      },
      {},
      {},
      {},
      {
        readonly size: string | number
        readonly round: boolean
        readonly modal: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: boolean
        readonly inner: boolean
        readonly placement: import('./index.js').DrawerPlacement
        readonly showFooter: boolean
        readonly glass: boolean
        readonly closeIcon: string
        readonly lockScroll: boolean
        readonly closeOnClickModal: boolean
        readonly closeOnPressEscape: boolean
        readonly showClose: boolean
        readonly destroyOnClose: boolean
        readonly teleportTo: string | HTMLElement
        readonly showHeader: boolean
        readonly resizable: boolean
        readonly minSize: number
        readonly maxSize: number
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly modelValue: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly title: {
          readonly type: import('vue').PropType<import('./index.js').DrawerRenderContent>
        }
        readonly placement: {
          readonly type: import('vue').PropType<import('./index.js').DrawerPlacement>
          readonly default: 'right'
        }
        readonly size: {
          readonly type: import('vue').PropType<string | number>
          readonly default: '30%'
        }
        readonly modal: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly closeOnClickModal: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly closeOnPressEscape: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly showClose: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly closeIcon: {
          readonly type: StringConstructor
          readonly default: 'close'
        }
        readonly destroyOnClose: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly zIndex: {
          readonly type: NumberConstructor
        }
        readonly teleportTo: {
          readonly type: import('vue').PropType<string | HTMLElement>
          readonly default: 'body'
        }
        readonly showHeader: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly showFooter: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly customClass: StringConstructor
        readonly modalClass: StringConstructor
        readonly lockScroll: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly glass: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly resizable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly minSize: {
          readonly type: NumberConstructor
          readonly default: 150
        }
        readonly maxSize: {
          readonly type: NumberConstructor
          readonly default: 1000
        }
        readonly beforeClose: {
          readonly type: import('vue').PropType<(done: () => void) => void>
        }
        readonly titleStyle: import('vue').PropType<import('vue').CSSProperties | string>
        readonly contentStyle: import('vue').PropType<import('vue').CSSProperties | string>
        readonly footerStyle: import('vue').PropType<import('vue').CSSProperties | string>
        readonly round: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly inner: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly drawerStyle: import('vue').PropType<import('vue').CSSProperties | string>
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClose?: (() => any) | undefined
        onClosed?: (() => any) | undefined
        onResize?: ((size: number) => any) | undefined
        'onUpdate:modelValue'?: ((value: boolean) => any) | undefined
        onOpen?: (() => any) | undefined
        onOpened?: (() => any) | undefined
      }>,
    {
      drawerRef: import('vue').Ref<HTMLElement | null>
      handleClose: (isClickModal?: boolean) => void
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      close: () => void
      closed: () => void
      resize: (size: number) => void
      'update:modelValue': (value: boolean) => void
      open: () => void
      opened: () => void
    },
    string,
    {
      readonly size: string | number
      readonly round: boolean
      readonly modal: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly modelValue: boolean
      readonly inner: boolean
      readonly placement: import('./index.js').DrawerPlacement
      readonly showFooter: boolean
      readonly glass: boolean
      readonly closeIcon: string
      readonly lockScroll: boolean
      readonly closeOnClickModal: boolean
      readonly closeOnPressEscape: boolean
      readonly showClose: boolean
      readonly destroyOnClose: boolean
      readonly teleportTo: string | HTMLElement
      readonly showHeader: boolean
      readonly resizable: boolean
      readonly minSize: number
      readonly maxSize: number
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
        header?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        'close-icon'?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      } & {
        footer?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhDrawer
export * from './src/drawer'
export type DrawerInstance = InstanceType<typeof Drawer>
export type YhDrawerInstance = DrawerInstance
export type YhDrawerProps = import('./src/drawer').DrawerProps
export type YhDrawerEmits = import('./src/drawer').DrawerEmits
export type YhDrawerSlots = import('./src/drawer').DrawerSlots
export type YhDrawerExpose = import('./src/drawer').DrawerExpose
