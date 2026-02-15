import { withInstall } from '@yh-ui/utils'
import Progress from './src/progress.vue'

export const YhProgress = withInstall(Progress)
export default YhProgress

export * from './src/progress'

export type ProgressInstance = InstanceType<typeof Progress>
