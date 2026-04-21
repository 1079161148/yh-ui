declare var __VLS_17: {},
  __VLS_43: {
    data: import('./ai-agent-card').AgentData
    use: (e: MouseEvent) => void
  },
  __VLS_49: {
    data: import('./ai-agent-card').AgentData
  }
type __VLS_Slots = {} & {
  avatar?: (props: typeof __VLS_17) => any
} & {
  actions?: (props: typeof __VLS_43) => any
} & {
  default?: (props: typeof __VLS_49) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly data: {
      readonly type: import('vue').PropType<import('./ai-agent-card').AgentData>
      readonly required: true
    }
    readonly layout: {
      readonly type: import('vue').PropType<'vertical' | 'horizontal' | 'compact'>
      readonly default: 'vertical'
    }
    readonly showActions: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly showStats: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly favoritable: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly selected: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly loading: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    share: (data: import('./ai-agent-card').AgentData) => void
    use: (data: import('./ai-agent-card').AgentData) => void
    favorite: (data: import('./ai-agent-card').AgentData, favorited: boolean) => void
    click: (data: import('./ai-agent-card').AgentData) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly data: {
        readonly type: import('vue').PropType<import('./ai-agent-card').AgentData>
        readonly required: true
      }
      readonly layout: {
        readonly type: import('vue').PropType<'vertical' | 'horizontal' | 'compact'>
        readonly default: 'vertical'
      }
      readonly showActions: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly showStats: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly favoritable: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly selected: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly loading: {
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
      onShare?: ((data: import('./ai-agent-card').AgentData) => any) | undefined
      onUse?: ((data: import('./ai-agent-card').AgentData) => any) | undefined
      onFavorite?:
        | ((data: import('./ai-agent-card').AgentData, favorited: boolean) => any)
        | undefined
      onClick?: ((data: import('./ai-agent-card').AgentData) => any) | undefined
    }>,
  {
    readonly loading: boolean
    readonly selected: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly layout: 'compact' | 'vertical' | 'horizontal'
    readonly showActions: boolean
    readonly showStats: boolean
    readonly favoritable: boolean
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
