import { withInstall } from '@yh-ui/utils'
import GanttChart from './src/gantt-chart.vue'

export const YhGanttChart = withInstall(GanttChart)
export default YhGanttChart

export * from './src/gantt-chart'

export type GanttChartInstance = InstanceType<typeof GanttChart>
