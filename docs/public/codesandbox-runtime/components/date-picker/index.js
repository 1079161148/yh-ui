import { withInstall } from '../../utils/index.js'
import DatePicker from './src/date-picker.js'
const YhDatePicker = withInstall(DatePicker)
var stdin_default = YhDatePicker
export * from './src/date-picker-meta.js'
export { YhDatePicker, stdin_default as default }
