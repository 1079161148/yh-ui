import { withInstall } from '../../utils/index.js'
import Tooltip from './src/tooltip.js'
const YhTooltip = withInstall(Tooltip)
var stdin_default = YhTooltip
export * from './src/tooltip-meta.js'
export { YhTooltip, stdin_default as default }
