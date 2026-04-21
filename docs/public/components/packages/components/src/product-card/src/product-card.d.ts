import type { ExtractPropTypes, PropType } from 'vue'
export type ProductCardLayout = 'vertical' | 'horizontal' | 'compact' | 'grid'
export interface ProductBadge {
  text?: string
  image?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
}
export declare const productCardProps: {
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
    type: PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
    default: string
  }
  badges: {
    type: PropType<ProductBadge[]>
    default: () => never[]
  }
  layout: {
    type: PropType<ProductCardLayout>
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
    type: PropType<'top' | 'inline'>
    default: string
  }
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
}
export type ProductCardProps = ExtractPropTypes<typeof productCardProps>
export declare const productCardEmits: {
  click: (e: MouseEvent) => boolean
  action: (e: MouseEvent) => boolean
  expose: () => boolean
}
export type ProductCardEmits = typeof productCardEmits
export interface ProductCardSlots {
  title?: () => unknown
  description?: () => unknown
  footer?: () => unknown
}
