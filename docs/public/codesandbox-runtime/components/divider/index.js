import { withInstall } from '../../utils/index.js'
import Divider from './src/divider.js'
const YhDivider = withInstall(Divider)
var stdin_default = YhDivider
export * from './src/divider.js'
export { YhDivider, stdin_default as default }
