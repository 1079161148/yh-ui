import { withInstall } from '@yh-ui/utils'
import DatePicker from './src/date-picker.vue'

export const YhDatePicker = withInstall(DatePicker)
export default YhDatePicker

export * from './src/date-picker'

export type DatePickerInstance = InstanceType<typeof DatePicker>
