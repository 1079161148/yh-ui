import { withInstall } from '@yh-ui/utils'
import Spin from './src/spin.vue'

export const YhSpin = withInstall(Spin)
export default YhSpin

export * from './src/spin'

export type SpinInstance = InstanceType<typeof Spin>
export type YhSpinInstance = SpinInstance
export type YhSpinProps = import('./src/spin').SpinProps
export type YhSpinEmits = import('./src/spin').SpinEmits
export type YhSpinSlots = import('./src/spin').SpinSlots
export type YhSpinExpose = import('./src/spin').SpinExpose
export type YhLoadingSpinnerType = import('./src/spin').LoadingSpinnerType
