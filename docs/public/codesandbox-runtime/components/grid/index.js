import { withInstall } from '../../utils/index.js'
import Grid from './src/grid.js'
import GridItem from './src/grid-item.js'
const YhGrid = withInstall(Grid)
const YhGridItem = withInstall(GridItem)
var stdin_default = YhGrid
export * from './src/grid-meta.js'
export { YhGrid, YhGridItem, stdin_default as default }
