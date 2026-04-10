import { withInstall } from '../../utils/index.js'
import Calendar from './src/calendar.js'
const YhCalendar = withInstall(Calendar)
var stdin_default = YhCalendar
export * from './src/calendar.js'
export { YhCalendar, stdin_default as default }
