import { withInstall } from '@yh-ui/utils'
import ProductCard from './src/product-card.vue'

export const YhProductCard = withInstall(ProductCard)
export default YhProductCard

export * from './src/product-card'

export type ProductCardInstance = InstanceType<typeof ProductCard>
export type YhProductCardInstance = ProductCardInstance

export type YhProductCardProps = import('./src/product-card').ProductCardProps
