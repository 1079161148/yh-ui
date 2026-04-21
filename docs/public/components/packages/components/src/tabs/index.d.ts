/**
 * Tabs Component
 * @description 标签页组件导出
 */
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'
export declare const YhTabs: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly type: {
            readonly type: import('vue').PropType<import('./index.js').TabsType>
            readonly default: 'line'
          }
          readonly tabPosition: {
            readonly type: import('vue').PropType<import('./index.js').TabsPosition>
            readonly default: 'top'
          }
          readonly draggable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly addable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly editable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly beforeLeave: {
            readonly type: import('vue').PropType<
              (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
            >
          }
          readonly stretch: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly navClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly contentClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly indicatorWidth: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly indicatorHeight: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly activeColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly inactiveColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly trigger: {
            readonly type: import('vue').PropType<'click' | 'hover'>
            readonly default: 'click'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          'onUpdate:modelValue'?: ((name: string | number) => any) | undefined
          'onTab-click'?:
            | ((pane: import('./index.js').TabPaneConfig, _ev: Event) => any)
            | undefined
          'onTab-change'?: ((name: string | number) => any) | undefined
          'onTab-remove'?: ((name: string | number) => any) | undefined
          'onTab-add'?: (() => any) | undefined
          'onTab-drag-end'?: ((names: (string | number)[]) => any) | undefined
        }>,
      {
        addTab: () => void
        setActiveTab: (name: string | number) => Promise<void>
        activeTab: import('vue').Ref<string | number, string | number>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        'update:modelValue': (name: string | number) => void
        'tab-click': (pane: import('./index.js').TabPaneConfig, _ev: Event) => void
        'tab-change': (name: string | number) => void
        'tab-remove': (name: string | number) => void
        'tab-add': () => void
        'tab-drag-end': (names: (string | number)[]) => void
      },
      import('vue').PublicProps,
      {
        readonly trigger: 'hover' | 'click'
        readonly type: 'card' | 'line' | 'border-card' | 'segment'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: string | number
        readonly stretch: boolean
        readonly closable: boolean
        readonly draggable: boolean
        readonly editable: boolean
        readonly activeColor: string
        readonly contentClass: string
        readonly tabPosition: 'top' | 'left' | 'right' | 'bottom'
        readonly addable: boolean
        readonly navClass: string
        readonly indicatorWidth: string
        readonly indicatorHeight: string
        readonly inactiveColor: string
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
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly type: {
            readonly type: import('vue').PropType<import('./index.js').TabsType>
            readonly default: 'line'
          }
          readonly tabPosition: {
            readonly type: import('vue').PropType<import('./index.js').TabsPosition>
            readonly default: 'top'
          }
          readonly draggable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly addable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly editable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly beforeLeave: {
            readonly type: import('vue').PropType<
              (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
            >
          }
          readonly stretch: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly navClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly contentClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly indicatorWidth: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly indicatorHeight: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly activeColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly inactiveColor: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly trigger: {
            readonly type: import('vue').PropType<'click' | 'hover'>
            readonly default: 'click'
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          'onUpdate:modelValue'?: ((name: string | number) => any) | undefined
          'onTab-click'?:
            | ((pane: import('./index.js').TabPaneConfig, _ev: Event) => any)
            | undefined
          'onTab-change'?: ((name: string | number) => any) | undefined
          'onTab-remove'?: ((name: string | number) => any) | undefined
          'onTab-add'?: (() => any) | undefined
          'onTab-drag-end'?: ((names: (string | number)[]) => any) | undefined
        }>,
      {
        addTab: () => void
        setActiveTab: (name: string | number) => Promise<void>
        activeTab: import('vue').Ref<string | number, string | number>
      },
      {},
      {},
      {},
      {
        readonly trigger: 'hover' | 'click'
        readonly type: 'card' | 'line' | 'border-card' | 'segment'
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue: string | number
        readonly stretch: boolean
        readonly closable: boolean
        readonly draggable: boolean
        readonly editable: boolean
        readonly activeColor: string
        readonly contentClass: string
        readonly tabPosition: 'top' | 'left' | 'right' | 'bottom'
        readonly addable: boolean
        readonly navClass: string
        readonly indicatorWidth: string
        readonly indicatorHeight: string
        readonly inactiveColor: string
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly modelValue: {
          readonly type: import('vue').PropType<string | number>
          readonly default: ''
        }
        readonly type: {
          readonly type: import('vue').PropType<import('./index.js').TabsType>
          readonly default: 'line'
        }
        readonly tabPosition: {
          readonly type: import('vue').PropType<import('./index.js').TabsPosition>
          readonly default: 'top'
        }
        readonly draggable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly closable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly addable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly editable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly beforeLeave: {
          readonly type: import('vue').PropType<
            (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
          >
        }
        readonly stretch: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly navClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly contentClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly indicatorWidth: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly indicatorHeight: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly activeColor: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly inactiveColor: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly trigger: {
          readonly type: import('vue').PropType<'click' | 'hover'>
          readonly default: 'click'
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        'onUpdate:modelValue'?: ((name: string | number) => any) | undefined
        'onTab-click'?: ((pane: import('./index.js').TabPaneConfig, _ev: Event) => any) | undefined
        'onTab-change'?: ((name: string | number) => any) | undefined
        'onTab-remove'?: ((name: string | number) => any) | undefined
        'onTab-add'?: (() => any) | undefined
        'onTab-drag-end'?: ((names: (string | number)[]) => any) | undefined
      }>,
    {
      addTab: () => void
      setActiveTab: (name: string | number) => Promise<void>
      activeTab: import('vue').Ref<string | number, string | number>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      'update:modelValue': (name: string | number) => void
      'tab-click': (pane: import('./index.js').TabPaneConfig, _ev: Event) => void
      'tab-change': (name: string | number) => void
      'tab-remove': (name: string | number) => void
      'tab-add': () => void
      'tab-drag-end': (names: (string | number)[]) => void
    },
    string,
    {
      readonly trigger: 'hover' | 'click'
      readonly type: 'card' | 'line' | 'border-card' | 'segment'
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly modelValue: string | number
      readonly stretch: boolean
      readonly closable: boolean
      readonly draggable: boolean
      readonly editable: boolean
      readonly activeColor: string
      readonly contentClass: string
      readonly tabPosition: 'top' | 'left' | 'right' | 'bottom'
      readonly addable: boolean
      readonly navClass: string
      readonly indicatorWidth: string
      readonly indicatorHeight: string
      readonly inactiveColor: string
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
        label?: (props: {
          pane: {
            name: string
            label: string
            disabled?: boolean | undefined
            closable?: boolean | undefined
            lazy?: boolean | undefined
            icon?: string | undefined
          }
        }) => any
      } & {
        'add-icon'?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      }
    })
> & {
  TabPane: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly name: {
            readonly type: import('vue').PropType<string | number>
            readonly required: true
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: undefined
          }
          readonly lazy: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly closable: boolean
        readonly lazy: boolean
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
          readonly name: {
            readonly type: import('vue').PropType<string | number>
            readonly required: true
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: undefined
          }
          readonly lazy: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly closable: boolean
        readonly lazy: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly name: {
          readonly type: import('vue').PropType<string | number>
          readonly required: true
        }
        readonly label: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly closable: {
          readonly type: BooleanConstructor
          readonly default: undefined
        }
        readonly lazy: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly icon: {
          readonly type: StringConstructor
          readonly default: ''
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
      readonly label: string
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly icon: string
      readonly closable: boolean
      readonly lazy: boolean
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
}
export declare const YhTabPane: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly name: {
            readonly type: import('vue').PropType<string | number>
            readonly required: true
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: undefined
          }
          readonly lazy: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly closable: boolean
        readonly lazy: boolean
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
          readonly name: {
            readonly type: import('vue').PropType<string | number>
            readonly required: true
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly closable: {
            readonly type: BooleanConstructor
            readonly default: undefined
          }
          readonly lazy: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly icon: {
            readonly type: StringConstructor
            readonly default: ''
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
        readonly label: string
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly icon: string
        readonly closable: boolean
        readonly lazy: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly name: {
          readonly type: import('vue').PropType<string | number>
          readonly required: true
        }
        readonly label: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly closable: {
          readonly type: BooleanConstructor
          readonly default: undefined
        }
        readonly lazy: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly icon: {
          readonly type: StringConstructor
          readonly default: ''
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
      readonly label: string
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly icon: string
      readonly closable: boolean
      readonly lazy: boolean
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
>
export default YhTabs
export * from './src/tabs'
export * from './src/tab-pane'
export type TabsInstance = InstanceType<typeof Tabs>
export type TabPaneInstance = InstanceType<typeof TabPane>
export type YhTabsInstance = TabsInstance
export type YhTabPaneInstance = TabPaneInstance
export type YhTabsProps = import('./src/tabs').TabsProps
export type YhTabsEmits = import('./src/tabs').TabsEmits
export type YhTabsSlots = import('./src/tabs').TabsSlots
export type YhTabsExpose = import('./src/tabs').TabsExpose
export type YhTabsType = import('./src/tabs').TabsType
export type YhTabsPosition = import('./src/tabs').TabsPosition
export type YhTabPaneConfig = import('./src/tabs').TabPaneConfig
export type YhTabPaneProps = import('./src/tab-pane').TabPaneProps
export type YhTabPaneSlots = import('./src/tab-pane').TabPaneSlots
