import { withInstall } from '@yh-ui/utils'
import DatePicker from './src/date-picker.vue'

export const YhDatePicker = withInstall(DatePicker)
export default YhDatePicker

export * from './src/date-picker'

export type DatePickerInstance = InstanceType<typeof DatePicker>
export type YhDatePickerInstance = DatePickerInstance
export type YhDatePickerProps = import('./src/date-picker').DatePickerProps
export type YhDatePickerEmits = import('./src/date-picker').DatePickerEmits
export type YhDatePickerSlots = import('./src/date-picker').DatePickerSlots
export type YhDatePickerPreset = import('./src/date-picker').DatePickerPreset
export type YhDatePickerValue = import('./src/date-picker').DateValue
export type YhDatePickerRangeValue = import('./src/date-picker').DateRangeValue
export type YhDatePickerPanelView = import('./src/date-picker').PanelView
