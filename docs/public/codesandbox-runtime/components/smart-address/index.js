import { withInstall } from '../../utils/index.js'
import SmartAddress from './src/smart-address.js'
const YhSmartAddress = withInstall(SmartAddress)
var stdin_default = YhSmartAddress
export * from './src/smart-address-meta.js'
export * from './src/use-address-parser.js'
export { YhSmartAddress, stdin_default as default }
