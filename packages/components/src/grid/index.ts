import { withInstall } from '@yh-ui/utils'
import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export const YhGrid = withInstall(Grid)
export const YhGridItem = withInstall(GridItem)

export default YhGrid

export * from './src/grid'

export type GridInstance = InstanceType<typeof Grid>
export type GridItemInstance = InstanceType<typeof GridItem>
export type YhGridInstance = GridInstance
export type YhGridItemInstance = GridItemInstance
export type YhGridProps = import('./src/grid').GridProps
export type YhGridItemProps = import('./src/grid').GridItemProps
export type YhGridSlots = import('./src/grid').GridSlots
export type YhGridItemSlots = import('./src/grid').GridItemSlots
