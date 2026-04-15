import { withInstall } from '@yh-ui/utils'
import Progress from './src/progress.vue'

export const YhProgress = withInstall(Progress)
export default YhProgress

export * from './src/progress'

export type ProgressInstance = InstanceType<typeof Progress>
export type YhProgressInstance = ProgressInstance
export type YhProgressProps = import('./src/progress').ProgressProps
export type YhProgressSlots = import('./src/progress').ProgressSlots
export type YhProgressType = import('./src/progress').ProgressType
export type YhProgressStatus = import('./src/progress').ProgressStatus
