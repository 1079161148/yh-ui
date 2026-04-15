import { withInstall } from '@yh-ui/utils'
import Result from './src/result.vue'

export const YhResult = withInstall(Result)
export default YhResult

export * from './src/result'

export type ResultInstance = InstanceType<typeof Result>
export type YhResultInstance = ResultInstance
export type YhResultProps = import('./src/result').ResultProps
export type YhResultSlots = import('./src/result').ResultSlots
export type YhResultIconType = import('./src/result').ResultIconType
