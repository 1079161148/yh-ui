declare var __VLS_1: {
    prize: import('./lucky-draw').LuckyPrize
  },
  __VLS_3: {},
  __VLS_5: {
    prize: import('./lucky-draw').LuckyPrize
  },
  __VLS_7: {}
type __VLS_Slots = {} & {
  prize?: (props: typeof __VLS_1) => any
} & {
  action?: (props: typeof __VLS_3) => any
} & {
  prize?: (props: typeof __VLS_5) => any
} & {
  action?: (props: typeof __VLS_7) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    type: {
      type: import('vue').PropType<import('./lucky-draw').LuckyDrawType>
      default: string
    }
    prizes: {
      type: import('vue').PropType<import('./lucky-draw').LuckyPrize[]>
      default: () => never[]
    }
    loading: {
      type: BooleanConstructor
      default: boolean
    }
    targetId: {
      type: import('vue').PropType<string | number>
      default: string
    }
    size: {
      type: (StringConstructor | NumberConstructor)[]
      default: number
    }
    rounds: {
      type: NumberConstructor
      default: number
    }
    duration: {
      type: NumberConstructor
      default: number
    }
    actionText: {
      type: StringConstructor
      default: string
    }
    hideBtn: {
      type: BooleanConstructor
      default: boolean
    }
    themeOverrides: {
      type: import('vue').PropType<Record<string, string>>
      default: () => {}
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    finish: (prize: import('./lucky-draw').LuckyPrize) => void
    start: () => void
    click: (e: MouseEvent) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      type: {
        type: import('vue').PropType<import('./lucky-draw').LuckyDrawType>
        default: string
      }
      prizes: {
        type: import('vue').PropType<import('./lucky-draw').LuckyPrize[]>
        default: () => never[]
      }
      loading: {
        type: BooleanConstructor
        default: boolean
      }
      targetId: {
        type: import('vue').PropType<string | number>
        default: string
      }
      size: {
        type: (StringConstructor | NumberConstructor)[]
        default: number
      }
      rounds: {
        type: NumberConstructor
        default: number
      }
      duration: {
        type: NumberConstructor
        default: number
      }
      actionText: {
        type: StringConstructor
        default: string
      }
      hideBtn: {
        type: BooleanConstructor
        default: boolean
      }
      themeOverrides: {
        type: import('vue').PropType<Record<string, string>>
        default: () => {}
      }
    }>
  > &
    Readonly<{
      onFinish?: ((prize: import('./lucky-draw').LuckyPrize) => any) | undefined
      onStart?: (() => any) | undefined
      onClick?: ((e: MouseEvent) => any) | undefined
    }>,
  {
    size: string | number
    loading: boolean
    type: import('./lucky-draw').LuckyDrawType
    themeOverrides: Record<string, string>
    duration: number
    actionText: string
    prizes: import('./lucky-draw').LuckyPrize[]
    targetId: string | number
    rounds: number
    hideBtn: boolean
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
