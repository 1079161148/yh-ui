import { withInstall } from '../../utils/index.js'
import Spin from './src/spin.js'
const YhSpin = withInstall(Spin)
var stdin_default = YhSpin
export * from './src/spin-meta.js'
export { YhSpin, stdin_default as default }
