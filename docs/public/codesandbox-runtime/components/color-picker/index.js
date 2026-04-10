import { withInstall } from '../../utils/index.js'
import ColorPicker from './src/color-picker.js'
const YhColorPicker = withInstall(ColorPicker)
var stdin_default = YhColorPicker
export * from './src/color-picker.js'
export { YhColorPicker, stdin_default as default }
