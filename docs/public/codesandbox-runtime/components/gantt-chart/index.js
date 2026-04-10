import { withInstall } from '../../utils/index.js'
import GanttChart from './src/gantt-chart.js'
const YhGanttChart = withInstall(GanttChart)
var stdin_default = YhGanttChart
export * from './src/gantt-chart.js'
export { YhGanttChart, stdin_default as default }
