import { withInstall } from '@yh-ui/utils'
import FilterBar from './src/filter-bar.vue'

export const YhFilterBar = withInstall(FilterBar)
export default YhFilterBar

export * from './src/filter-bar'

export type FilterBarInstance = InstanceType<typeof FilterBar>
export type YhFilterBarInstance = FilterBarInstance

export type YhFilterBarProps = import('./src/filter-bar').FilterBarProps
export type YhFilterBarEmits = import('./src/filter-bar').FilterBarEmits
export type YhFilterBarSlots = import('./src/filter-bar').FilterBarSlots
export type YhFilterSortOrder = import('./src/filter-bar').FilterSortOrder
export type YhFilterSortItem = import('./src/filter-bar').FilterSortItem
export type YhFilterType = import('./src/filter-bar').FilterType
export type YhFilterOption = import('./src/filter-bar').FilterOption
export type YhFilterItem = import('./src/filter-bar').FilterItem
export type YhFilterValue = import('./src/filter-bar').FilterValue
export type YhFilterSort = import('./src/filter-bar').FilterSort
