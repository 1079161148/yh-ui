import { withInstall } from '../../utils/index.js'
import TreeSelect from './src/tree-select.js'
const YhTreeSelect = withInstall(TreeSelect)
var stdin_default = YhTreeSelect
export * from './src/tree-select.js'
export { YhTreeSelect, stdin_default as default }
