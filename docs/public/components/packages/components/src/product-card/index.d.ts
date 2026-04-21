import ProductCard from './src/product-card.vue'
export declare const YhProductCard: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          image: {
            type: StringConstructor
            default: string
          }
          hoverImage: {
            type: StringConstructor
            default: string
          }
          videoSrc: {
            type: StringConstructor
            default: string
          }
          title: {
            type: StringConstructor
            default: string
          }
          description: {
            type: StringConstructor
            default: string
          }
          price: {
            type: (StringConstructor | NumberConstructor)[]
            default: number
          }
          vipPrice: {
            type: (StringConstructor | NumberConstructor)[]
            default: string
          }
          vipLabel: {
            type: StringConstructor
            default: string
          }
          marketPrice: {
            type: (StringConstructor | NumberConstructor)[]
            default: string
          }
          currency: {
            type: StringConstructor
            default: string
          }
          unit: {
            type: StringConstructor
            default: string
          }
          ribbon: {
            type: StringConstructor
            default: string
          }
          ribbonColor: {
            type: StringConstructor
            default: string
          }
          tag: {
            type: StringConstructor
            default: string
          }
          tagType: {
            type: import('vue').PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
            default: string
          }
          badges: {
            type: import('vue').PropType<import('./index.js').ProductBadge[]>
            default: () => never[]
          }
          layout: {
            type: import('vue').PropType<import('./index.js').ProductCardLayout>
            default: string
          }
          lazy: {
            type: BooleanConstructor
            default: boolean
          }
          stockProgress: {
            type: NumberConstructor
            default: number
          }
          stockColor: {
            type: StringConstructor
            default: string
          }
          stockText: {
            type: StringConstructor
            default: string
          }
          border: {
            type: BooleanConstructor
            default: boolean
          }
          shadow: {
            type: BooleanConstructor
            default: boolean
          }
          readonly: {
            type: BooleanConstructor
            default: boolean
          }
          actionText: {
            type: StringConstructor
            default: string
          }
          actionLoading: {
            type: BooleanConstructor
            default: boolean
          }
          soldOut: {
            type: BooleanConstructor
            default: boolean
          }
          exposure: {
            type: BooleanConstructor
            default: boolean
          }
          exposureThreshold: {
            type: NumberConstructor
            default: number
          }
          exposureOnce: {
            type: BooleanConstructor
            default: boolean
          }
          titleLines: {
            type: NumberConstructor
            default: number
          }
          descriptionLines: {
            type: NumberConstructor
            default: number
          }
          badgePosition: {
            type: import('vue').PropType<'top' | 'inline'>
            default: string
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onExpose?: (() => any) | undefined
          onClick?: ((e: MouseEvent) => any) | undefined
          onAction?: ((e: MouseEvent) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        expose: () => void
        click: (e: MouseEvent) => void
        action: (e: MouseEvent) => void
      },
      import('vue').PublicProps,
      {
        title: string
        price: string | number
        image: string
        tag: string
        description: string
        soldOut: boolean
        readonly: boolean
        themeOverrides: Record<string, string>
        border: boolean
        layout: import('./index.js').ProductCardLayout
        tagType: 'success' | 'warning' | 'info' | 'primary' | 'danger'
        lazy: boolean
        shadow: boolean
        marketPrice: string | number
        unit: string
        hoverImage: string
        videoSrc: string
        vipPrice: string | number
        vipLabel: string
        currency: string
        ribbon: string
        ribbonColor: string
        badges: import('./index.js').ProductBadge[]
        stockProgress: number
        stockColor: string
        stockText: string
        actionText: string
        actionLoading: boolean
        exposure: boolean
        exposureThreshold: number
        exposureOnce: boolean
        titleLines: number
        descriptionLines: number
        badgePosition: 'inline' | 'top'
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
          image: {
            type: StringConstructor
            default: string
          }
          hoverImage: {
            type: StringConstructor
            default: string
          }
          videoSrc: {
            type: StringConstructor
            default: string
          }
          title: {
            type: StringConstructor
            default: string
          }
          description: {
            type: StringConstructor
            default: string
          }
          price: {
            type: (StringConstructor | NumberConstructor)[]
            default: number
          }
          vipPrice: {
            type: (StringConstructor | NumberConstructor)[]
            default: string
          }
          vipLabel: {
            type: StringConstructor
            default: string
          }
          marketPrice: {
            type: (StringConstructor | NumberConstructor)[]
            default: string
          }
          currency: {
            type: StringConstructor
            default: string
          }
          unit: {
            type: StringConstructor
            default: string
          }
          ribbon: {
            type: StringConstructor
            default: string
          }
          ribbonColor: {
            type: StringConstructor
            default: string
          }
          tag: {
            type: StringConstructor
            default: string
          }
          tagType: {
            type: import('vue').PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
            default: string
          }
          badges: {
            type: import('vue').PropType<import('./index.js').ProductBadge[]>
            default: () => never[]
          }
          layout: {
            type: import('vue').PropType<import('./index.js').ProductCardLayout>
            default: string
          }
          lazy: {
            type: BooleanConstructor
            default: boolean
          }
          stockProgress: {
            type: NumberConstructor
            default: number
          }
          stockColor: {
            type: StringConstructor
            default: string
          }
          stockText: {
            type: StringConstructor
            default: string
          }
          border: {
            type: BooleanConstructor
            default: boolean
          }
          shadow: {
            type: BooleanConstructor
            default: boolean
          }
          readonly: {
            type: BooleanConstructor
            default: boolean
          }
          actionText: {
            type: StringConstructor
            default: string
          }
          actionLoading: {
            type: BooleanConstructor
            default: boolean
          }
          soldOut: {
            type: BooleanConstructor
            default: boolean
          }
          exposure: {
            type: BooleanConstructor
            default: boolean
          }
          exposureThreshold: {
            type: NumberConstructor
            default: number
          }
          exposureOnce: {
            type: BooleanConstructor
            default: boolean
          }
          titleLines: {
            type: NumberConstructor
            default: number
          }
          descriptionLines: {
            type: NumberConstructor
            default: number
          }
          badgePosition: {
            type: import('vue').PropType<'top' | 'inline'>
            default: string
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onExpose?: (() => any) | undefined
          onClick?: ((e: MouseEvent) => any) | undefined
          onAction?: ((e: MouseEvent) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        title: string
        price: string | number
        image: string
        tag: string
        description: string
        soldOut: boolean
        readonly: boolean
        themeOverrides: Record<string, string>
        border: boolean
        layout: import('./index.js').ProductCardLayout
        tagType: 'success' | 'warning' | 'info' | 'primary' | 'danger'
        lazy: boolean
        shadow: boolean
        marketPrice: string | number
        unit: string
        hoverImage: string
        videoSrc: string
        vipPrice: string | number
        vipLabel: string
        currency: string
        ribbon: string
        ribbonColor: string
        badges: import('./index.js').ProductBadge[]
        stockProgress: number
        stockColor: string
        stockText: string
        actionText: string
        actionLoading: boolean
        exposure: boolean
        exposureThreshold: number
        exposureOnce: boolean
        titleLines: number
        descriptionLines: number
        badgePosition: 'inline' | 'top'
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        image: {
          type: StringConstructor
          default: string
        }
        hoverImage: {
          type: StringConstructor
          default: string
        }
        videoSrc: {
          type: StringConstructor
          default: string
        }
        title: {
          type: StringConstructor
          default: string
        }
        description: {
          type: StringConstructor
          default: string
        }
        price: {
          type: (StringConstructor | NumberConstructor)[]
          default: number
        }
        vipPrice: {
          type: (StringConstructor | NumberConstructor)[]
          default: string
        }
        vipLabel: {
          type: StringConstructor
          default: string
        }
        marketPrice: {
          type: (StringConstructor | NumberConstructor)[]
          default: string
        }
        currency: {
          type: StringConstructor
          default: string
        }
        unit: {
          type: StringConstructor
          default: string
        }
        ribbon: {
          type: StringConstructor
          default: string
        }
        ribbonColor: {
          type: StringConstructor
          default: string
        }
        tag: {
          type: StringConstructor
          default: string
        }
        tagType: {
          type: import('vue').PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
          default: string
        }
        badges: {
          type: import('vue').PropType<import('./index.js').ProductBadge[]>
          default: () => never[]
        }
        layout: {
          type: import('vue').PropType<import('./index.js').ProductCardLayout>
          default: string
        }
        lazy: {
          type: BooleanConstructor
          default: boolean
        }
        stockProgress: {
          type: NumberConstructor
          default: number
        }
        stockColor: {
          type: StringConstructor
          default: string
        }
        stockText: {
          type: StringConstructor
          default: string
        }
        border: {
          type: BooleanConstructor
          default: boolean
        }
        shadow: {
          type: BooleanConstructor
          default: boolean
        }
        readonly: {
          type: BooleanConstructor
          default: boolean
        }
        actionText: {
          type: StringConstructor
          default: string
        }
        actionLoading: {
          type: BooleanConstructor
          default: boolean
        }
        soldOut: {
          type: BooleanConstructor
          default: boolean
        }
        exposure: {
          type: BooleanConstructor
          default: boolean
        }
        exposureThreshold: {
          type: NumberConstructor
          default: number
        }
        exposureOnce: {
          type: BooleanConstructor
          default: boolean
        }
        titleLines: {
          type: NumberConstructor
          default: number
        }
        descriptionLines: {
          type: NumberConstructor
          default: number
        }
        badgePosition: {
          type: import('vue').PropType<'top' | 'inline'>
          default: string
        }
        themeOverrides: {
          type: import('vue').PropType<Record<string, string>>
          default: () => {}
        }
      }>
    > &
      Readonly<{
        onExpose?: (() => any) | undefined
        onClick?: ((e: MouseEvent) => any) | undefined
        onAction?: ((e: MouseEvent) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      expose: () => void
      click: (e: MouseEvent) => void
      action: (e: MouseEvent) => void
    },
    string,
    {
      title: string
      price: string | number
      image: string
      tag: string
      description: string
      soldOut: boolean
      readonly: boolean
      themeOverrides: Record<string, string>
      border: boolean
      layout: import('./index.js').ProductCardLayout
      tagType: 'success' | 'warning' | 'info' | 'primary' | 'danger'
      lazy: boolean
      shadow: boolean
      marketPrice: string | number
      unit: string
      hoverImage: string
      videoSrc: string
      vipPrice: string | number
      vipLabel: string
      currency: string
      ribbon: string
      ribbonColor: string
      badges: import('./index.js').ProductBadge[]
      stockProgress: number
      stockColor: string
      stockText: string
      actionText: string
      actionLoading: boolean
      exposure: boolean
      exposureThreshold: number
      exposureOnce: boolean
      titleLines: number
      descriptionLines: number
      badgePosition: 'inline' | 'top'
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
        footer?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhProductCard
export * from './src/product-card'
export type ProductCardInstance = InstanceType<typeof ProductCard>
export type YhProductCardInstance = ProductCardInstance
export type YhProductCardProps = import('./src/product-card').ProductCardProps
export type YhProductCardEmits = import('./src/product-card').ProductCardEmits
export type YhProductCardSlots = import('./src/product-card').ProductCardSlots
export type YhProductCardLayout = import('./src/product-card').ProductCardLayout
export type YhProductBadge = import('./src/product-card').ProductBadge
