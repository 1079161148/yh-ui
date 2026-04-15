import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'
import DropdownMenu from './src/dropdown-menu.vue'
export declare const YhDropdown: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly trigger: {
            readonly type: import('vue').PropType<import('./index.js').DropdownTrigger>
            readonly default: 'hover'
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('@floating-ui/utils').Placement>
            readonly default: 'bottom'
          }
          readonly visible: {
            readonly type: import('vue').PropType<boolean | null>
            readonly default: null
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showAfter: {
            readonly type: NumberConstructor
            readonly default: 0
          }
          readonly hideAfter: {
            readonly type: NumberConstructor
            readonly default: 150
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly hideOnClick: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').DropdownItemData[]>
            readonly default: () => never[]
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly emptyText: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly checkable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly maxHeight: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').CSSProperties>
            readonly default: () => {}
          }
          readonly splitButton: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly type: {
            readonly type: import('vue').PropType<
              'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
            >
            readonly default: ''
          }
          readonly size: {
            readonly type: import('vue').PropType<'large' | 'default' | 'small'>
            readonly default: 'default'
          }
          readonly plain: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly loop: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly tabindex: {
            readonly type: import('vue').PropType<number | string>
            readonly default: 0
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((event: MouseEvent) => any) | undefined
          onHide?: (() => any) | undefined
          onShow?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
          onCommand?: ((_command: string | number | object) => any) | undefined
        }>,
      {
        show: () => void
        hide: () => void
        visible: import('vue').WritableComputedRef<boolean, boolean>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        click: (event: MouseEvent) => void
        hide: () => void
        show: () => void
        'update:visible': (visible: boolean) => void
        command: (_command: string | number | object) => void
      },
      import('vue').PublicProps,
      {
        readonly size: 'large' | 'default' | 'small'
        readonly loading: boolean
        readonly emptyText: string
        readonly trigger: import('./index.js').DropdownTrigger
        readonly type: '' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly plain: boolean
        readonly tabindex: string | number
        readonly maxHeight: string | number
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean | null
        readonly checkable: boolean
        readonly items: import('./index.js').DropdownItemData[]
        readonly placement: import('@floating-ui/utils').Placement
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').CSSProperties
        readonly showAfter: number
        readonly hideAfter: number
        readonly showArrow: boolean
        readonly loop: boolean
        readonly hideOnClick: boolean
        readonly splitButton: boolean
        readonly popperArrow: boolean
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
          readonly trigger: {
            readonly type: import('vue').PropType<import('./index.js').DropdownTrigger>
            readonly default: 'hover'
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('@floating-ui/utils').Placement>
            readonly default: 'bottom'
          }
          readonly visible: {
            readonly type: import('vue').PropType<boolean | null>
            readonly default: null
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showAfter: {
            readonly type: NumberConstructor
            readonly default: 0
          }
          readonly hideAfter: {
            readonly type: NumberConstructor
            readonly default: 150
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly hideOnClick: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').DropdownItemData[]>
            readonly default: () => never[]
          }
          readonly loading: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly emptyText: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly checkable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly maxHeight: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').CSSProperties>
            readonly default: () => {}
          }
          readonly splitButton: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly type: {
            readonly type: import('vue').PropType<
              'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
            >
            readonly default: ''
          }
          readonly size: {
            readonly type: import('vue').PropType<'large' | 'default' | 'small'>
            readonly default: 'default'
          }
          readonly plain: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly loop: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly tabindex: {
            readonly type: import('vue').PropType<number | string>
            readonly default: 0
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClick?: ((event: MouseEvent) => any) | undefined
          onHide?: (() => any) | undefined
          onShow?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
          onCommand?: ((_command: string | number | object) => any) | undefined
        }>,
      {
        show: () => void
        hide: () => void
        visible: import('vue').WritableComputedRef<boolean, boolean>
      },
      {},
      {},
      {},
      {
        readonly size: 'large' | 'default' | 'small'
        readonly loading: boolean
        readonly emptyText: string
        readonly trigger: import('./index.js').DropdownTrigger
        readonly type: '' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly plain: boolean
        readonly tabindex: string | number
        readonly maxHeight: string | number
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean | null
        readonly checkable: boolean
        readonly items: import('./index.js').DropdownItemData[]
        readonly placement: import('@floating-ui/utils').Placement
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').CSSProperties
        readonly showAfter: number
        readonly hideAfter: number
        readonly showArrow: boolean
        readonly loop: boolean
        readonly hideOnClick: boolean
        readonly splitButton: boolean
        readonly popperArrow: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly trigger: {
          readonly type: import('vue').PropType<import('./index.js').DropdownTrigger>
          readonly default: 'hover'
        }
        readonly placement: {
          readonly type: import('vue').PropType<import('@floating-ui/utils').Placement>
          readonly default: 'bottom'
        }
        readonly visible: {
          readonly type: import('vue').PropType<boolean | null>
          readonly default: null
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly showAfter: {
          readonly type: NumberConstructor
          readonly default: 0
        }
        readonly hideAfter: {
          readonly type: NumberConstructor
          readonly default: 150
        }
        readonly zIndex: {
          readonly type: NumberConstructor
          readonly default: 2000
        }
        readonly hideOnClick: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly items: {
          readonly type: import('vue').PropType<import('./index.js').DropdownItemData[]>
          readonly default: () => never[]
        }
        readonly loading: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly emptyText: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly checkable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly maxHeight: {
          readonly type: import('vue').PropType<string | number>
          readonly default: ''
        }
        readonly teleported: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly popperStyle: {
          readonly type: import('vue').PropType<import('vue').CSSProperties>
          readonly default: () => {}
        }
        readonly splitButton: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly type: {
          readonly type: import('vue').PropType<
            'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
          >
          readonly default: ''
        }
        readonly size: {
          readonly type: import('vue').PropType<'large' | 'default' | 'small'>
          readonly default: 'default'
        }
        readonly plain: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly showArrow: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly popperArrow: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly offset: {
          readonly type: import('vue').PropType<[number, number]>
          readonly default: () => number[]
        }
        readonly loop: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly tabindex: {
          readonly type: import('vue').PropType<number | string>
          readonly default: 0
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined
        onHide?: (() => any) | undefined
        onShow?: (() => any) | undefined
        'onUpdate:visible'?: ((visible: boolean) => any) | undefined
        onCommand?: ((_command: string | number | object) => any) | undefined
      }>,
    {
      show: () => void
      hide: () => void
      visible: import('vue').WritableComputedRef<boolean, boolean>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      click: (event: MouseEvent) => void
      hide: () => void
      show: () => void
      'update:visible': (visible: boolean) => void
      command: (_command: string | number | object) => void
    },
    string,
    {
      readonly size: 'large' | 'default' | 'small'
      readonly loading: boolean
      readonly emptyText: string
      readonly trigger: import('./index.js').DropdownTrigger
      readonly type: '' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly plain: boolean
      readonly tabindex: string | number
      readonly maxHeight: string | number
      readonly zIndex: number
      readonly offset: [number, number]
      readonly visible: boolean | null
      readonly checkable: boolean
      readonly items: import('./index.js').DropdownItemData[]
      readonly placement: import('@floating-ui/utils').Placement
      readonly popperClass: string
      readonly teleported: boolean
      readonly popperStyle: import('vue').CSSProperties
      readonly showAfter: number
      readonly hideAfter: number
      readonly showArrow: boolean
      readonly loop: boolean
      readonly hideOnClick: boolean
      readonly splitButton: boolean
      readonly popperArrow: boolean
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
        default?: (props: {}) => any
      } & {
        dropdown?: (props: {}) => any
      } & {
        empty?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export declare const YhDropdownItem: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly command: {
            readonly type: import('vue').PropType<string | number | object>
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly divided: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly danger: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly checked: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly disabled: boolean
        readonly danger: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly checked: boolean
        readonly command: string | number | object
        readonly divided: boolean
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
          readonly command: {
            readonly type: import('vue').PropType<string | number | object>
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly divided: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly danger: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly checked: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      {
        readonly disabled: boolean
        readonly danger: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly checked: boolean
        readonly command: string | number | object
        readonly divided: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly command: {
          readonly type: import('vue').PropType<string | number | object>
          readonly default: ''
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly divided: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly icon: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly danger: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly checked: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{}>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly disabled: boolean
      readonly danger: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly icon: string
      readonly checked: boolean
      readonly command: string | number | object
      readonly divided: boolean
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
      }
    })
> &
  Record<string, unknown>
export declare const YhDropdownMenu: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
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
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      {
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{}>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
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
      }
    })
> &
  Record<string, unknown>
export default YhDropdown
export * from './src/dropdown'
export type DropdownInstance = InstanceType<typeof Dropdown>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
export type DropdownMenuInstance = InstanceType<typeof DropdownMenu>
export type YhDropdownInstance = DropdownInstance
export type YhDropdownItemInstance = DropdownItemInstance
export type YhDropdownMenuInstance = DropdownMenuInstance
export type YhDropdownProps = import('./src/dropdown').DropdownProps
export type YhDropdownEmits = import('./src/dropdown').DropdownEmits
export type YhDropdownSlots = import('./src/dropdown').DropdownSlots
export type YhDropdownExpose = import('./src/dropdown').DropdownExpose
export type YhDropdownTrigger = import('./src/dropdown').DropdownTrigger
export type YhDropdownItemData = import('./src/dropdown').DropdownItemData
export type YhDropdownItemProps = import('./src/dropdown').DropdownItemProps
export type YhDropdownMenuProps = import('./src/dropdown').DropdownMenuProps
