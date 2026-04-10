import { withInstall } from '../../utils/index.js'
import Switch from './src/switch.js'
const YhSwitch = withInstall(Switch)
var stdin_default = YhSwitch
export * from './src/switch.js'
export { YhSwitch, stdin_default as default }
