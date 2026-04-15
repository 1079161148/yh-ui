import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import MenuItemGroup from './src/menu-item-group.vue'
import SubMenu from './src/sub-menu.vue'
export declare const YhMenu: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly mode: {
            readonly type: import('vue').PropType<import('./index.js').MenuMode>
            readonly default: 'vertical'
          }
          readonly defaultActive: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly defaultOpeneds: {
            readonly type: import('vue').PropType<string[]>
            readonly default: () => never[]
          }
          readonly uniqueOpened: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly menuTrigger: {
            readonly type: import('vue').PropType<import('./index.js').MenuTrigger>
            readonly default: 'hover'
          }
          readonly collapse: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly collapseTransition: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly router: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly backgroundColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly textColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly activeTextColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly ellipsis: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperZIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly gap: {
            readonly type: NumberConstructor
            readonly default: 4
          }
          readonly ellipsisIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly popperOffset: {
            readonly type: NumberConstructor
            readonly default: 6
          }
          readonly popperEffect: {
            readonly type: import('vue').PropType<'dark' | 'light'>
            readonly default: 'light'
          }
          readonly closeOnClickOutside: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: ''
          }
          readonly showTimeout: {
            readonly type: NumberConstructor
            readonly default: 300
          }
          readonly hideTimeout: {
            readonly type: NumberConstructor
            readonly default: 300
          }
          readonly persistent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly iconSize: {
            readonly type: NumberConstructor
            readonly default: 20
          }
          readonly indent: {
            readonly type: NumberConstructor
            readonly default: 32
          }
          readonly rootIndent: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly expandAll: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly renderExtra: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly renderIcon: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly renderLabel: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly responsive: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly value: {
            readonly type: import('vue').PropType<string | null>
            readonly default: undefined
          }
          readonly options: {
            readonly type: import('vue').PropType<import('./index.js').MenuItemData[]>
            readonly default: () => never[]
          }
          readonly inverted: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly keyField: {
            readonly type: StringConstructor
            readonly default: 'key'
          }
          readonly labelField: {
            readonly type: StringConstructor
            readonly default: 'label'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onSelect?:
            | ((
                _index: string,
                _indexPath: string[],
                _item: import('./index.js').MenuItemData | undefined,
                _routeResult?: Promise<void> | undefined
              ) => any)
            | undefined
          onClose?: ((_index: string, _indexPath: string[]) => any) | undefined
          onOpen?: ((_index: string, _indexPath: string[]) => any) | undefined
          'onUpdate:value'?: ((_value: string) => any) | undefined
        }>,
      {
        open: (index: string) => void
        close: (index: string) => void
        activeIndex: import('vue').Ref<string, string>
        openedMenus: import('vue').Ref<string[], string[]>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        select: (
          _index: string,
          _indexPath: string[],
          _item: import('./index.js').MenuItemData | undefined,
          _routeResult?: Promise<void> | undefined
        ) => void
        close: (_index: string, _indexPath: string[]) => void
        open: (_index: string, _indexPath: string[]) => void
        'update:value': (_value: string) => void
      },
      import('vue').PublicProps,
      {
        readonly mode: import('./index.js').MenuMode
        readonly value: string | null
        readonly collapse: boolean
        readonly expandAll: boolean
        readonly responsive: boolean
        readonly textColor: string
        readonly activeTextColor: string
        readonly gap: number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly iconSize: number
        readonly backgroundColor: string
        readonly ellipsis: boolean
        readonly options: import('./index.js').MenuItemData[]
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly popperOffset: number
        readonly indent: number
        readonly persistent: boolean
        readonly defaultActive: string
        readonly defaultOpeneds: string[]
        readonly uniqueOpened: boolean
        readonly menuTrigger: import('./index.js').MenuTrigger
        readonly collapseTransition: boolean
        readonly router: boolean
        readonly popperZIndex: number
        readonly ellipsisIcon: string | import('vue').Component
        readonly popperEffect: 'dark' | 'light'
        readonly closeOnClickOutside: boolean
        readonly showTimeout: number
        readonly hideTimeout: number
        readonly rootIndent: number
        readonly renderExtra: (
          option: import('./index.js').MenuItemData
        ) => import('vue').VNodeChild
        readonly renderIcon: (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
        readonly renderLabel: (
          option: import('./index.js').MenuItemData
        ) => import('vue').VNodeChild
        readonly inverted: boolean
        readonly keyField: string
        readonly labelField: string
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
          readonly mode: {
            readonly type: import('vue').PropType<import('./index.js').MenuMode>
            readonly default: 'vertical'
          }
          readonly defaultActive: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly defaultOpeneds: {
            readonly type: import('vue').PropType<string[]>
            readonly default: () => never[]
          }
          readonly uniqueOpened: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly menuTrigger: {
            readonly type: import('vue').PropType<import('./index.js').MenuTrigger>
            readonly default: 'hover'
          }
          readonly collapse: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly collapseTransition: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly router: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly backgroundColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly textColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly activeTextColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly ellipsis: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperZIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly gap: {
            readonly type: NumberConstructor
            readonly default: 4
          }
          readonly ellipsisIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly popperOffset: {
            readonly type: NumberConstructor
            readonly default: 6
          }
          readonly popperEffect: {
            readonly type: import('vue').PropType<'dark' | 'light'>
            readonly default: 'light'
          }
          readonly closeOnClickOutside: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: ''
          }
          readonly showTimeout: {
            readonly type: NumberConstructor
            readonly default: 300
          }
          readonly hideTimeout: {
            readonly type: NumberConstructor
            readonly default: 300
          }
          readonly persistent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly iconSize: {
            readonly type: NumberConstructor
            readonly default: 20
          }
          readonly indent: {
            readonly type: NumberConstructor
            readonly default: 32
          }
          readonly rootIndent: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly expandAll: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly renderExtra: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly renderIcon: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly renderLabel: {
            readonly type: import('vue').PropType<
              (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
            >
            readonly default: undefined
          }
          readonly responsive: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly value: {
            readonly type: import('vue').PropType<string | null>
            readonly default: undefined
          }
          readonly options: {
            readonly type: import('vue').PropType<import('./index.js').MenuItemData[]>
            readonly default: () => never[]
          }
          readonly inverted: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly keyField: {
            readonly type: StringConstructor
            readonly default: 'key'
          }
          readonly labelField: {
            readonly type: StringConstructor
            readonly default: 'label'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onSelect?:
            | ((
                _index: string,
                _indexPath: string[],
                _item: import('./index.js').MenuItemData | undefined,
                _routeResult?: Promise<void> | undefined
              ) => any)
            | undefined
          onClose?: ((_index: string, _indexPath: string[]) => any) | undefined
          onOpen?: ((_index: string, _indexPath: string[]) => any) | undefined
          'onUpdate:value'?: ((_value: string) => any) | undefined
        }>,
      {
        open: (index: string) => void
        close: (index: string) => void
        activeIndex: import('vue').Ref<string, string>
        openedMenus: import('vue').Ref<string[], string[]>
      },
      {},
      {},
      {},
      {
        readonly mode: import('./index.js').MenuMode
        readonly value: string | null
        readonly collapse: boolean
        readonly expandAll: boolean
        readonly responsive: boolean
        readonly textColor: string
        readonly activeTextColor: string
        readonly gap: number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly iconSize: number
        readonly backgroundColor: string
        readonly ellipsis: boolean
        readonly options: import('./index.js').MenuItemData[]
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly popperOffset: number
        readonly indent: number
        readonly persistent: boolean
        readonly defaultActive: string
        readonly defaultOpeneds: string[]
        readonly uniqueOpened: boolean
        readonly menuTrigger: import('./index.js').MenuTrigger
        readonly collapseTransition: boolean
        readonly router: boolean
        readonly popperZIndex: number
        readonly ellipsisIcon: string | import('vue').Component
        readonly popperEffect: 'dark' | 'light'
        readonly closeOnClickOutside: boolean
        readonly showTimeout: number
        readonly hideTimeout: number
        readonly rootIndent: number
        readonly renderExtra: (
          option: import('./index.js').MenuItemData
        ) => import('vue').VNodeChild
        readonly renderIcon: (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
        readonly renderLabel: (
          option: import('./index.js').MenuItemData
        ) => import('vue').VNodeChild
        readonly inverted: boolean
        readonly keyField: string
        readonly labelField: string
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly mode: {
          readonly type: import('vue').PropType<import('./index.js').MenuMode>
          readonly default: 'vertical'
        }
        readonly defaultActive: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly defaultOpeneds: {
          readonly type: import('vue').PropType<string[]>
          readonly default: () => never[]
        }
        readonly uniqueOpened: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly menuTrigger: {
          readonly type: import('vue').PropType<import('./index.js').MenuTrigger>
          readonly default: 'hover'
        }
        readonly collapse: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly collapseTransition: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly router: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly backgroundColor: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly textColor: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly activeTextColor: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly ellipsis: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly popperZIndex: {
          readonly type: NumberConstructor
          readonly default: 2000
        }
        readonly teleported: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly gap: {
          readonly type: NumberConstructor
          readonly default: 4
        }
        readonly ellipsisIcon: {
          readonly type: import('vue').PropType<string | import('vue').Component>
          readonly default: ''
        }
        readonly popperOffset: {
          readonly type: NumberConstructor
          readonly default: 6
        }
        readonly popperEffect: {
          readonly type: import('vue').PropType<'dark' | 'light'>
          readonly default: 'light'
        }
        readonly closeOnClickOutside: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly popperStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: ''
        }
        readonly showTimeout: {
          readonly type: NumberConstructor
          readonly default: 300
        }
        readonly hideTimeout: {
          readonly type: NumberConstructor
          readonly default: 300
        }
        readonly persistent: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly iconSize: {
          readonly type: NumberConstructor
          readonly default: 20
        }
        readonly indent: {
          readonly type: NumberConstructor
          readonly default: 32
        }
        readonly rootIndent: {
          readonly type: NumberConstructor
          readonly default: undefined
        }
        readonly expandAll: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly renderExtra: {
          readonly type: import('vue').PropType<
            (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
          >
          readonly default: undefined
        }
        readonly renderIcon: {
          readonly type: import('vue').PropType<
            (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
          >
          readonly default: undefined
        }
        readonly renderLabel: {
          readonly type: import('vue').PropType<
            (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
          >
          readonly default: undefined
        }
        readonly responsive: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly value: {
          readonly type: import('vue').PropType<string | null>
          readonly default: undefined
        }
        readonly options: {
          readonly type: import('vue').PropType<import('./index.js').MenuItemData[]>
          readonly default: () => never[]
        }
        readonly inverted: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly keyField: {
          readonly type: StringConstructor
          readonly default: 'key'
        }
        readonly labelField: {
          readonly type: StringConstructor
          readonly default: 'label'
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onSelect?:
          | ((
              _index: string,
              _indexPath: string[],
              _item: import('./index.js').MenuItemData | undefined,
              _routeResult?: Promise<void> | undefined
            ) => any)
          | undefined
        onClose?: ((_index: string, _indexPath: string[]) => any) | undefined
        onOpen?: ((_index: string, _indexPath: string[]) => any) | undefined
        'onUpdate:value'?: ((_value: string) => any) | undefined
      }>,
    {
      open: (index: string) => void
      close: (index: string) => void
      activeIndex: import('vue').Ref<string, string>
      openedMenus: import('vue').Ref<string[], string[]>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      select: (
        _index: string,
        _indexPath: string[],
        _item: import('./index.js').MenuItemData | undefined,
        _routeResult?: Promise<void> | undefined
      ) => void
      close: (_index: string, _indexPath: string[]) => void
      open: (_index: string, _indexPath: string[]) => void
      'update:value': (_value: string) => void
    },
    string,
    {
      readonly mode: import('./index.js').MenuMode
      readonly value: string | null
      readonly collapse: boolean
      readonly expandAll: boolean
      readonly responsive: boolean
      readonly textColor: string
      readonly activeTextColor: string
      readonly gap: number
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly iconSize: number
      readonly backgroundColor: string
      readonly ellipsis: boolean
      readonly options: import('./index.js').MenuItemData[]
      readonly popperClass: string
      readonly teleported: boolean
      readonly popperStyle: import('vue').StyleValue
      readonly popperOffset: number
      readonly indent: number
      readonly persistent: boolean
      readonly defaultActive: string
      readonly defaultOpeneds: string[]
      readonly uniqueOpened: boolean
      readonly menuTrigger: import('./index.js').MenuTrigger
      readonly collapseTransition: boolean
      readonly router: boolean
      readonly popperZIndex: number
      readonly ellipsisIcon: string | import('vue').Component
      readonly popperEffect: 'dark' | 'light'
      readonly closeOnClickOutside: boolean
      readonly showTimeout: number
      readonly hideTimeout: number
      readonly rootIndent: number
      readonly renderExtra: (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
      readonly renderIcon: (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
      readonly renderLabel: (option: import('./index.js').MenuItemData) => import('vue').VNodeChild
      readonly inverted: boolean
      readonly keyField: string
      readonly labelField: string
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
export declare const YhMenuItem: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly index: {
            readonly type: StringConstructor
            readonly required: true
          }
          readonly route: {
            readonly type: import('vue').PropType<string | object>
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly route: string | object
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
          readonly index: {
            readonly type: StringConstructor
            readonly required: true
          }
          readonly route: {
            readonly type: import('vue').PropType<string | object>
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      {
        readonly label: string
        readonly disabled: boolean
        readonly route: string | object
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly index: {
          readonly type: StringConstructor
          readonly required: true
        }
        readonly route: {
          readonly type: import('vue').PropType<string | object>
          readonly default: ''
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly label: {
          readonly type: StringConstructor
          readonly default: ''
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
      readonly label: string
      readonly disabled: boolean
      readonly route: string | object
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
      }
    })
> &
  Record<string, unknown>
export declare const YhMenuItemGroup: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly title: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly title: string
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
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      {
        readonly title: string
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
      readonly title: string
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
        title?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export declare const YhSubMenu: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly index: {
            readonly type: StringConstructor
            readonly required: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showTimeout: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly hideTimeout: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly popperOffset: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly popperClass: string
        readonly popperOffset: number
        readonly showTimeout: number
        readonly hideTimeout: number
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
          readonly index: {
            readonly type: StringConstructor
            readonly required: true
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showTimeout: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly hideTimeout: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly popperOffset: {
            readonly type: NumberConstructor
            readonly default: undefined
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
        }>
      > &
        Readonly<{}>,
      {},
      {},
      {},
      {},
      {
        readonly label: string
        readonly disabled: boolean
        readonly popperClass: string
        readonly popperOffset: number
        readonly showTimeout: number
        readonly hideTimeout: number
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly index: {
          readonly type: StringConstructor
          readonly required: true
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly showTimeout: {
          readonly type: NumberConstructor
          readonly default: undefined
        }
        readonly hideTimeout: {
          readonly type: NumberConstructor
          readonly default: undefined
        }
        readonly popperOffset: {
          readonly type: NumberConstructor
          readonly default: undefined
        }
        readonly label: {
          readonly type: StringConstructor
          readonly default: ''
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
      readonly label: string
      readonly disabled: boolean
      readonly popperClass: string
      readonly popperOffset: number
      readonly showTimeout: number
      readonly hideTimeout: number
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
        title?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        title?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhMenu
export * from './src/menu'
export type MenuInstance = InstanceType<typeof Menu>
export type MenuItemInstance = InstanceType<typeof MenuItem>
export type MenuItemGroupInstance = InstanceType<typeof MenuItemGroup>
export type SubMenuInstance = InstanceType<typeof SubMenu>
export type YhMenuInstance = MenuInstance
export type YhMenuItemInstance = MenuItemInstance
export type YhMenuItemGroupInstance = MenuItemGroupInstance
export type YhSubMenuInstance = SubMenuInstance
export type YhMenuProps = import('./src/menu').MenuProps
export type YhMenuEmits = import('./src/menu').MenuEmits
export type YhMenuSlots = import('./src/menu').MenuSlots
export type YhMenuExpose = import('./src/menu').MenuExpose
export type YhMenuMode = import('./src/menu').MenuMode
export type YhMenuTrigger = import('./src/menu').MenuTrigger
export type YhMenuItemData = import('./src/menu').MenuItemData
export type YhMenuItemProps = import('./src/menu').MenuItemProps
export type YhMenuItemGroupProps = import('./src/menu').MenuItemGroupProps
export type YhSubMenuProps = import('./src/menu').SubMenuProps
