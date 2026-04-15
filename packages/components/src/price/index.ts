import { withInstall } from '@yh-ui/utils'
import Price from './src/price.vue'

export const YhPrice = withInstall(Price)
export default YhPrice

export * from './src/price'

export type PriceInstance = InstanceType<typeof Price>
export type YhPriceInstance = PriceInstance

export type YhPriceProps = import('./src/price').PriceProps
export type YhPriceSlots = import('./src/price').PriceSlots
