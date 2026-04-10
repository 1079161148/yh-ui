import { withInstall } from '../../utils/index.js'
import Radio from './src/radio.js'
import RadioGroup from './src/radio-group.js'
import RadioButton from './src/radio-button.js'
const YhRadio = withInstall(Radio)
const YhRadioGroup = withInstall(RadioGroup)
const YhRadioButton = withInstall(RadioButton)
var stdin_default = YhRadio
export * from './src/radio.js'
export { YhRadio, YhRadioButton, YhRadioGroup, stdin_default as default }
