import { withInstall } from '../../utils/index.js'
import Drawer from './src/drawer.js'
const YhDrawer = withInstall(Drawer)
var stdin_default = YhDrawer
export * from './src/drawer.js'
export { YhDrawer, stdin_default as default }
