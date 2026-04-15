import { withInstall } from '@yh-ui/utils'
import SkuSelector from './src/sku-selector.vue'

export const YhSkuSelector = withInstall(SkuSelector)
export default YhSkuSelector

export * from './src/sku-selector'

export type SkuSelectorInstance = InstanceType<typeof SkuSelector>
export type YhSkuSelectorInstance = SkuSelectorInstance

export type YhSkuSelectorProps = import('./src/sku-selector').SkuSelectorProps
export type YhSkuSelectorEmits = import('./src/sku-selector').SkuSelectorEmits
export type YhSkuSelectorSlots = import('./src/sku-selector').SkuSelectorSlots
export type YhSkuSpec = import('./src/sku-selector').SkuSpec
export type YhSkuSpecValue = import('./src/sku-selector').SkuSpecValue
export type YhSkuItem = import('./src/sku-selector').SkuItem
