import { withInstall } from '@yh-ui/utils'
import Calendar from './src/calendar.vue'

export const YhCalendar = withInstall(Calendar)
export default YhCalendar

export * from './src/calendar'

export type CalendarInstance = InstanceType<typeof Calendar>
