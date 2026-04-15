import { withInstall } from '@yh-ui/utils'
import Rate from './src/rate.vue'

export const YhRate = withInstall(Rate)
export default YhRate
export * from './src/rate'

export type RateInstance = InstanceType<typeof Rate>
export type YhRateSize = import('./src/rate').RateSize
export type YhRateProps = import('./src/rate').RateProps
export type YhRateEmits = import('./src/rate').RateEmits
export type YhRateSlots = import('./src/rate').RateSlots
export type YhRateInstance = RateInstance
