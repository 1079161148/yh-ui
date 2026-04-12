import { withInstall } from '../../utils/index.js'
import ProductCard from './src/product-card.js'
const YhProductCard = withInstall(ProductCard)
var stdin_default = YhProductCard
export * from './src/product-card-meta.js'
export { YhProductCard, stdin_default as default }
