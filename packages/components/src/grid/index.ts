import { withInstall } from '@yh-ui/utils'
import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export const YhGrid = withInstall(Grid)
export const YhGridItem = withInstall(GridItem)

export default YhGrid

export * from './src/grid'

export type GridInstance = InstanceType<typeof Grid>
export type GridItemInstance = InstanceType<typeof GridItem>
