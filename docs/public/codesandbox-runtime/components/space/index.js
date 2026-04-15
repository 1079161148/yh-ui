import { withInstall } from '../../utils/index.js'
import Space from './src/space.js'
const YhSpace = withInstall(Space)
var stdin_default = YhSpace
export * from './src/space-meta.js'
export { YhSpace, stdin_default as default }
