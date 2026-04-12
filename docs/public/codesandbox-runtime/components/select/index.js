import { withInstall } from '../../utils/index.js'
import Select from './src/select.js'
import Option from './src/option.js'
const YhSelect = withInstall(Select)
const YhOption = withInstall(Option)
var stdin_default = YhSelect
export * from './src/select-meta.js'
export { YhOption, YhSelect, stdin_default as default }
