import { withInstall } from '../../utils/index.js'
import Cascader from './src/cascader.js'
import CascaderPanel from './src/cascader-panel.js'
const YhCascader = withInstall(Cascader)
const YhCascaderPanel = withInstall(CascaderPanel)
var stdin_default = YhCascader
export * from './src/cascader.js'
export { YhCascader, YhCascaderPanel, stdin_default as default }
