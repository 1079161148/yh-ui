import { withInstall } from '../../utils/index.js'
import Popconfirm from './src/popconfirm.js'
const YhPopconfirm = withInstall(Popconfirm)
var stdin_default = YhPopconfirm
export * from './src/popconfirm.js'
export { YhPopconfirm, stdin_default as default }
