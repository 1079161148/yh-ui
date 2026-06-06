import type { ExtractPropTypes, PropType } from 'vue'

export type ProductCardLayout = 'vertical' | 'horizontal' | 'compact' | 'grid'

export interface ProductBadge {
  text?: string
  image?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
}

export const productCardProps = {
  image: {
    type: String,
    default: ''
  },
  hoverImage: {
    type: String,
    default: ''
  },
  videoSrc: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: [Number, String],
    default: 0
  },
  vipPrice: {
    type: [Number, String],
    default: ''
  },
  vipLabel: {
    type: String,
    default: ''
  },
  marketPrice: {
    type: [Number, String],
    default: ''
  },
  currency: {
    type: String,
    default: '¥'
  },
  unit: {
    type: String,
    default: ''
  },
  ribbon: {
    type: String,
    default: ''
  },
  ribbonColor: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  tagType: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'danger'
  },
  badges: {
    type: Array as PropType<ProductBadge[]>,
    default: () => []
  },
  layout: {
    type: String as PropType<ProductCardLayout>,
    default: 'vertical'
  },
  lazy: {
    type: Boolean,
    default: true
  },
  stockProgress: {
    type: Number,
    default: 0
  },
  stockColor: {
    type: String,
    default: ''
  },
  stockText: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: ''
  },
  actionLoading: {
    type: Boolean,
    default: false
  },
  soldOut: {
    type: Boolean,
    default: false
  },
  exposure: {
    type: Boolean,
    default: false
  },
  exposureThreshold: {
    type: Number,
    default: 0.5
  },
  exposureOnce: {
    type: Boolean,
    default: true
  },
  titleLines: {
    type: Number,
    default: 2
  },
  descriptionLines: {
    type: Number,
    default: 1
  },
  badgePosition: {
    type: String as PropType<'top' | 'inline'>,
    default: 'top'
  },
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type ProductCardProps = ExtractPropTypes<typeof productCardProps>

export const productCardEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  action: (e: MouseEvent) => e instanceof MouseEvent,
  expose: () => true
}

export type ProductCardEmits = typeof productCardEmits

export interface ProductCardSlots {
  title?: () => unknown
  description?: () => unknown
  footer?: () => unknown
}
