import { withInstall } from '@yh-ui/utils'
import Countdown from './src/countdown.vue'

export const YhCountdown = withInstall(Countdown)
export default YhCountdown

export * from './src/countdown'

export type CountdownInstance = InstanceType<typeof Countdown>
export type YhCountdownInstance = CountdownInstance
export type YhCountdownProps = import('./src/countdown').CountdownProps
export type YhCountdownEmits = import('./src/countdown').CountdownEmits
export type YhCountdownExpose = import('./src/countdown').CountdownExpose
export type YhCountdownTimeUnits = import('./src/countdown').CountdownTimeUnits
export type YhCountdownFormatContext = import('./src/countdown').CountdownFormatContext
export type YhCountdownValue = import('./src/countdown').CountdownValue
export type YhCountdownFormat = import('./src/countdown').CountdownFormat
export type YhCountdownStatus = import('./src/countdown').CountdownStatus
