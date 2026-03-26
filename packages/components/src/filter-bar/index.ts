import { withInstall } from '@yh-ui/utils'
import FilterBar from './src/filter-bar.vue'

export const YhFilterBar = withInstall(FilterBar)
export default YhFilterBar

export * from './src/filter-bar'

export type FilterBarInstance = InstanceType<typeof FilterBar>
export type YhFilterBarInstance = FilterBarInstance

export type YhFilterBarProps = import('./src/filter-bar').FilterBarProps
