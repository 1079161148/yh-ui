import { withInstall } from '@yh-ui/utils'
import GanttChart from './src/gantt-chart.vue'
import type { GanttChartProps } from './src/gantt-chart'

export const YhGanttChart = withInstall(GanttChart)
export default YhGanttChart

export * from './src/gantt-chart'
export type { GanttChartProps }

export type GanttChartInstance = InstanceType<typeof GanttChart>
export type YhGanttChartInstance = GanttChartInstance

export type YhGanttChartProps = GanttChartProps
