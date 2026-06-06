import { withInstall } from '@yh-ui/utils'
import GanttChart from './src/gantt-chart.vue'

export const YhGanttChart = withInstall(GanttChart)
export default YhGanttChart

export * from './src/gantt-chart'

export type GanttChartInstance = InstanceType<typeof GanttChart>
export type YhGanttChartInstance = GanttChartInstance
export type YhGanttChartProps = import('./src/gantt-chart').GanttChartProps
export type YhGanttChartEmits = import('./src/gantt-chart').GanttChartEmits
export type YhGanttTask = import('./src/gantt-chart').GanttTask
export type YhGanttColumn = import('./src/gantt-chart').GanttColumn
export type YhGanttChartSlots = import('./src/gantt-chart').GanttChartSlots
