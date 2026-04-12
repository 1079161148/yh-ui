import { withInstall } from '../../utils/index.js'
import FilterBar from './src/filter-bar.js'
const YhFilterBar = withInstall(FilterBar)
var stdin_default = YhFilterBar
export * from './src/filter-bar-meta.js'
export { YhFilterBar, stdin_default as default }
