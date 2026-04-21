declare var __VLS_1: {},
  __VLS_11: {},
  __VLS_13: {},
  __VLS_23: {},
  __VLS_25: {
    status: import('./coupon-card').CouponStatus
  },
  __VLS_27: {}
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any
} & {
  description?: (props: typeof __VLS_11) => any
} & {
  action?: (props: typeof __VLS_13) => any
} & {
  badge?: (props: typeof __VLS_23) => any
} & {
  seal?: (props: typeof __VLS_25) => any
} & {
  rules?: (props: typeof __VLS_27) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    title: {
      type: StringConstructor
      default: string
    }
    description: {
      type: StringConstructor
      default: string
    }
    amount: {
      type: (StringConstructor | NumberConstructor)[]
      default: string
    }
    symbol: {
      type: StringConstructor
      default: string
    }
    threshold: {
      type: (StringConstructor | NumberConstructor)[]
      default: string
    }
    validPeriod: {
      type: StringConstructor
      default: string
    }
    status: {
      type: import('vue').PropType<import('./coupon-card').CouponStatus>
      default: string
    }
    actionText: {
      type: StringConstructor
      default: string
    }
    badge: {
      type: StringConstructor
      default: string
    }
    badgeType: {
      type: import('vue').PropType<'danger' | 'warning' | 'primary' | 'success'>
      default: string
    }
    percent: {
      type: NumberConstructor
      default: undefined
    }
    percentText: {
      type: StringConstructor
      default: string
    }
    rules: {
      type: StringConstructor
      default: string
    }
    ruleTitle: {
      type: StringConstructor
      default: string
    }
    selectable: {
      type: BooleanConstructor
      default: boolean
    }
    selected: {
      type: BooleanConstructor
      default: boolean
    }
    variant: {
      type: import('vue').PropType<'circle' | 'indent' | 'scallop'>
      default: string
    }
    disabled: {
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
    click: (e: MouseEvent) => void
    action: (e: MouseEvent) => void
    'update:selected': (val: boolean) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      title: {
        type: StringConstructor
        default: string
      }
      description: {
        type: StringConstructor
        default: string
      }
      amount: {
        type: (StringConstructor | NumberConstructor)[]
        default: string
      }
      symbol: {
        type: StringConstructor
        default: string
      }
      threshold: {
        type: (StringConstructor | NumberConstructor)[]
        default: string
      }
      validPeriod: {
        type: StringConstructor
        default: string
      }
      status: {
        type: import('vue').PropType<import('./coupon-card').CouponStatus>
        default: string
      }
      actionText: {
        type: StringConstructor
        default: string
      }
      badge: {
        type: StringConstructor
        default: string
      }
      badgeType: {
        type: import('vue').PropType<'danger' | 'warning' | 'primary' | 'success'>
        default: string
      }
      percent: {
        type: NumberConstructor
        default: undefined
      }
      percentText: {
        type: StringConstructor
        default: string
      }
      rules: {
        type: StringConstructor
        default: string
      }
      ruleTitle: {
        type: StringConstructor
        default: string
      }
      selectable: {
        type: BooleanConstructor
        default: boolean
      }
      selected: {
        type: BooleanConstructor
        default: boolean
      }
      variant: {
        type: import('vue').PropType<'circle' | 'indent' | 'scallop'>
        default: string
      }
      disabled: {
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
      onClick?: ((e: MouseEvent) => any) | undefined
      onAction?: ((e: MouseEvent) => any) | undefined
      'onUpdate:selected'?: ((val: boolean) => any) | undefined
    }>,
  {
    symbol: string
    title: string
    badge: string
    description: string
    selected: boolean
    validPeriod: string
    ruleTitle: string
    status: import('./coupon-card').CouponStatus
    disabled: boolean
    themeOverrides: Record<string, string>
    variant: 'circle' | 'indent' | 'scallop'
    rules: string
    selectable: boolean
    threshold: string | number
    percent: number
    actionText: string
    amount: string | number
    badgeType: 'success' | 'warning' | 'primary' | 'danger'
    percentText: string
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
