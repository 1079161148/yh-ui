import { withInstall } from '../../utils/index.js'
import Price from './src/price.js'
const YhPrice = withInstall(Price)
var stdin_default = YhPrice
export * from './src/price.js'
export { YhPrice, stdin_default as default }
