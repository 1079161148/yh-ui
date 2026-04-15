import { withInstall } from '@yh-ui/utils'
import TimePicker from './src/time-picker.vue'

export const YhTimePicker = withInstall(TimePicker)
export default YhTimePicker

export * from './src/time-picker'

export type TimePickerInstance = InstanceType<typeof TimePicker>
export type YhTimePickerInstance = TimePickerInstance
export type YhTimePickerProps = import('./src/time-picker').TimePickerProps
export type YhTimePickerEmits = import('./src/time-picker').TimePickerEmits
export type YhTimePickerSlots = import('./src/time-picker').TimePickerSlots
export type YhTimePickerExpose = import('./src/time-picker').TimePickerExpose
export type YhTimePickerSize = import('./src/time-picker').TimePickerSize
export type YhTimePickerValue = import('./src/time-picker').TimeValue
export type YhTimePickerRangeValue = import('./src/time-picker').TimeRangeValue
export type YhTimePickerDisabledTimeConfig = import('./src/time-picker').DisabledTimeConfig
export type YhTimePickerState = import('./src/time-picker').TimeState
