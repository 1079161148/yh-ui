import type { TabPaneConfig } from './tabs'
declare var __VLS_1: {
    pane: {
      name: string
      label: string
      disabled?: boolean | undefined
      closable?: boolean | undefined
      lazy?: boolean | undefined
      icon?: string | undefined
    }
  },
  __VLS_3: {},
  __VLS_5: {}
type __VLS_Slots = {} & {
  label?: (props: typeof __VLS_1) => any
} & {
  'add-icon'?: (props: typeof __VLS_3) => any
} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly modelValue: {
      readonly type: import('vue').PropType<string | number>
      readonly default: ''
    }
    readonly type: {
      readonly type: import('vue').PropType<import('./tabs').TabsType>
      readonly default: 'line'
    }
    readonly tabPosition: {
      readonly type: import('vue').PropType<import('./tabs').TabsPosition>
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
  }>,
  {
    /** 触发添加标签页事件 */
    addTab: () => void
    /** 激活指定标签 */
    setActiveTab: (name: string | number) => Promise<void>
    /** 当前激活的标签名 */
    activeTab: import('vue').Ref<string | number, string | number>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    'update:modelValue': (name: string | number) => void
    'tab-click': (pane: TabPaneConfig, _ev: Event) => void
    'tab-change': (name: string | number) => void
    'tab-remove': (name: string | number) => void
    'tab-add': () => void
    'tab-drag-end': (names: (string | number)[]) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly modelValue: {
        readonly type: import('vue').PropType<string | number>
        readonly default: ''
      }
      readonly type: {
        readonly type: import('vue').PropType<import('./tabs').TabsType>
        readonly default: 'line'
      }
      readonly tabPosition: {
        readonly type: import('vue').PropType<import('./tabs').TabsPosition>
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
      'onTab-click'?: ((pane: TabPaneConfig, _ev: Event) => any) | undefined
      'onTab-change'?: ((name: string | number) => any) | undefined
      'onTab-remove'?: ((name: string | number) => any) | undefined
      'onTab-add'?: (() => any) | undefined
      'onTab-drag-end'?: ((names: (string | number)[]) => any) | undefined
    }>,
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
