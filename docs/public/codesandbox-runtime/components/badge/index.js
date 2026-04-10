import { withInstall } from '../../utils/index.js'
import Badge from './src/badge.js'
const YhBadge = withInstall(Badge)
var stdin_default = YhBadge
export * from './src/badge.js'
export { YhBadge, stdin_default as default }
