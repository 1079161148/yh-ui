import { withInstall } from '@yh-ui/utils'
import Result from './src/result.vue'

export const YhResult = withInstall(Result)
export default YhResult

export * from './src/result'

export type ResultInstance = InstanceType<typeof Result>
