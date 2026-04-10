import { withInstall } from '../../utils/index.js'
import Countdown from './src/countdown.js'
const YhCountdown = withInstall(Countdown)
var stdin_default = YhCountdown
export * from './src/countdown.js'
export { YhCountdown, stdin_default as default }
