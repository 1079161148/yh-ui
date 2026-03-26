import { withInstall } from '@yh-ui/utils'
import SkuSelector from './src/sku-selector.vue'

export const YhSkuSelector = withInstall(SkuSelector)
export default YhSkuSelector

export * from './src/sku-selector'

export type SkuSelectorInstance = InstanceType<typeof SkuSelector>
export type YhSkuSelectorInstance = SkuSelectorInstance

export type YhSkuSelectorProps = import('./src/sku-selector').SkuSelectorProps
