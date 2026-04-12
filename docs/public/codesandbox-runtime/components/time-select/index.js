import { withInstall } from '../../utils/index.js'
import TimeSelect from './src/time-select.js'
const YhTimeSelect = withInstall(TimeSelect)
var stdin_default = YhTimeSelect
export * from './src/time-select-meta.js'
export { YhTimeSelect, stdin_default as default }
