import { withInstall } from '@yh-ui/utils'
import ProductCard from './src/product-card.vue'

export const YhProductCard = withInstall(ProductCard)
export default YhProductCard

export * from './src/product-card'

export type ProductCardInstance = InstanceType<typeof ProductCard>
export type YhProductCardInstance = ProductCardInstance

export type YhProductCardProps = import('./src/product-card').ProductCardProps
export type YhProductCardEmits = import('./src/product-card').ProductCardEmits
export type YhProductCardSlots = import('./src/product-card').ProductCardSlots
export type YhProductCardLayout = import('./src/product-card').ProductCardLayout
export type YhProductBadge = import('./src/product-card').ProductBadge
