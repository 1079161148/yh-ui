import { withInstall } from '../../utils/index.js'
import Progress from './src/progress.js'
const YhProgress = withInstall(Progress)
var stdin_default = YhProgress
export * from './src/progress.js'
export { YhProgress, stdin_default as default }
