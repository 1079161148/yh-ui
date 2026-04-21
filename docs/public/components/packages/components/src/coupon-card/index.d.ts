import CouponCard from './src/coupon-card.vue'
export declare const YhCouponCard: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
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
            type: import('vue').PropType<import('./index.js').CouponStatus>
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
      import('vue').PublicProps,
      {
        symbol: string
        title: string
        badge: string
        description: string
        selected: boolean
        validPeriod: string
        ruleTitle: string
        status: import('./index.js').CouponStatus
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
            type: import('vue').PropType<import('./index.js').CouponStatus>
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
      {},
      {},
      {},
      {},
      {
        symbol: string
        title: string
        badge: string
        description: string
        selected: boolean
        validPeriod: string
        ruleTitle: string
        status: import('./index.js').CouponStatus
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
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
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
          type: import('vue').PropType<import('./index.js').CouponStatus>
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
    {
      symbol: string
      title: string
      badge: string
      description: string
      selected: boolean
      validPeriod: string
      ruleTitle: string
      status: import('./index.js').CouponStatus
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
        description?: (props: {}) => any
      } & {
        action?: (props: {}) => any
      } & {
        badge?: (props: {}) => any
      } & {
        seal?: (props: { status: import('./index.js').CouponStatus }) => any
      } & {
        rules?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhCouponCard
export * from './src/coupon-card'
export type CouponCardInstance = InstanceType<typeof CouponCard>
export type YhCouponCardInstance = CouponCardInstance
export type YhCouponCardProps = import('./src/coupon-card').CouponCardProps
export type YhCouponCardEmits = import('./src/coupon-card').CouponCardEmits
export type YhCouponCardSlots = import('./src/coupon-card').CouponCardSlots
export type YhCouponStatus = import('./src/coupon-card').CouponStatus
