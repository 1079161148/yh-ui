import type { AiConversation } from '@yh-ui/hooks'
type GroupKey = 'pinned' | 'today' | 'last7Days' | 'last30Days' | 'earlier'
declare var __VLS_1: {},
  __VLS_3: {},
  __VLS_5: {
    label: GroupKey
  },
  __VLS_11: {},
  __VLS_13: {},
  __VLS_15: {}
type __VLS_Slots = {} & {
  'add-icon'?: (props: typeof __VLS_1) => any
} & {
  'add-text'?: (props: typeof __VLS_3) => any
} & {
  'group-label'?: (props: typeof __VLS_5) => any
} & {
  'edit-icon'?: (props: typeof __VLS_11) => any
} & {
  'delete-icon'?: (props: typeof __VLS_13) => any
} & {
  empty?: (props: typeof __VLS_15) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    data: {
      type: import('vue').PropType<AiConversation[]>
      default: () => never[]
    }
    activeId: {
      type: StringConstructor
      default: string
    }
    loading: {
      type: BooleanConstructor
      default: boolean
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').AiConversationsThemeVars>
      default: undefined
    }
    grouped: {
      type: BooleanConstructor
      default: boolean
    }
    virtualScroll: {
      type: BooleanConstructor
      default: boolean
    }
    virtualScrollHeight: {
      type: NumberConstructor
      default: number
    }
    virtualScrollItemHeight: {
      type: NumberConstructor
      default: number
    }
    virtualScrollOverscan: {
      type: NumberConstructor
      default: number
    }
  }>,
  {
    scrollToItem: (id: string) => void
    scrollToIndex: (index: number) => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    delete: (conversation: AiConversation) => void
    edit: (conversation: AiConversation, newTitle: string) => void
    pin: (conversation: AiConversation, pinned: boolean) => void
    click: (conversation: AiConversation) => void
    'update:activeId': (id: string) => void
    create: () => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      data: {
        type: import('vue').PropType<AiConversation[]>
        default: () => never[]
      }
      activeId: {
        type: StringConstructor
        default: string
      }
      loading: {
        type: BooleanConstructor
        default: boolean
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').AiConversationsThemeVars>
        default: undefined
      }
      grouped: {
        type: BooleanConstructor
        default: boolean
      }
      virtualScroll: {
        type: BooleanConstructor
        default: boolean
      }
      virtualScrollHeight: {
        type: NumberConstructor
        default: number
      }
      virtualScrollItemHeight: {
        type: NumberConstructor
        default: number
      }
      virtualScrollOverscan: {
        type: NumberConstructor
        default: number
      }
    }>
  > &
    Readonly<{
      onDelete?: ((conversation: AiConversation) => any) | undefined
      onEdit?: ((conversation: AiConversation, newTitle: string) => any) | undefined
      onPin?: ((conversation: AiConversation, pinned: boolean) => any) | undefined
      onClick?: ((conversation: AiConversation) => any) | undefined
      'onUpdate:activeId'?: ((id: string) => any) | undefined
      onCreate?: (() => any) | undefined
    }>,
  {
    data: AiConversation[]
    loading: boolean
    themeOverrides: import('@yh-ui/theme').AiConversationsThemeVars
    virtualScroll: boolean
    activeId: string
    grouped: boolean
    virtualScrollHeight: number
    virtualScrollItemHeight: number
    virtualScrollOverscan: number
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
