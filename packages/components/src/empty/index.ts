import { withInstall } from '@yh-ui/utils'
import Empty from './src/empty.vue'

export const YhEmpty = withInstall(Empty)
export default YhEmpty
export * from './src/empty'
export type { EmptyProps, EmptySlots } from './src/empty'
export type EmptyInstance = InstanceType<typeof Empty>
export type YhEmptyInstance = EmptyInstance
export type YhEmptyProps = import('./src/empty').EmptyProps
export type YhEmptySlots = import('./src/empty').EmptySlots
