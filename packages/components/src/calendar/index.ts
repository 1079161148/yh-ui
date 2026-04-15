import { withInstall } from '@yh-ui/utils'
import Calendar from './src/calendar.vue'

export const YhCalendar = withInstall(Calendar)
export default YhCalendar

export * from './src/calendar'

export type CalendarInstance = InstanceType<typeof Calendar>
export type YhCalendarInstance = CalendarInstance
export type YhCalendarProps = import('./src/calendar').CalendarProps
export type YhCalendarEmits = import('./src/calendar').CalendarEmits
export type YhCalendarSlots = import('./src/calendar').CalendarSlots
export type YhCalendarExpose = import('./src/calendar').CalendarExpose
export type YhCalendarDateCell = import('./src/calendar').CalendarDateCell
export type YhCalendarHolidayInfo = import('./src/calendar').HolidayInfo
export type YhCalendarHolidayMap = import('./src/calendar').HolidayMap
export type YhCalendarRangeValue = import('./src/calendar').CalendarRangeValue
export type YhCalendarMode = import('./src/calendar').CalendarMode
