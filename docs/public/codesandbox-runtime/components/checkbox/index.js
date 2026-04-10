import { withInstall } from '../../utils/index.js'
import Checkbox from './src/checkbox.js'
import CheckboxGroup from './src/checkbox-group.js'
const YhCheckbox = withInstall(Checkbox)
const YhCheckboxGroup = withInstall(CheckboxGroup)
var stdin_default = YhCheckbox
export * from './src/checkbox.js'
export { YhCheckbox, YhCheckboxGroup, stdin_default as default }
