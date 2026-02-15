import { withInstall } from '@yh-ui/utils'
import ColorPicker from './src/color-picker.vue'

export const YhColorPicker = withInstall(ColorPicker)
export default YhColorPicker

export * from './src/color-picker'

export type ColorPickerInstance = InstanceType<typeof ColorPicker>
