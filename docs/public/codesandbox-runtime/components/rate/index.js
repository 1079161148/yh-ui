import { withInstall } from '../../utils/index.js'
import Rate from './src/rate.js'
const YhRate = withInstall(Rate)
var stdin_default = YhRate
export * from './src/rate.js'
export { YhRate, stdin_default as default }
