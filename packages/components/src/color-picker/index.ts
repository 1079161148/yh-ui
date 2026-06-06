import { withInstall } from '@yh-ui/utils'
import ColorPicker from './src/color-picker.vue'

export const YhColorPicker = withInstall(ColorPicker)
export default YhColorPicker

export * from './src/color-picker'

export type ColorPickerInstance = InstanceType<typeof ColorPicker>
export type YhColorPickerInstance = ColorPickerInstance
export type YhColorPickerProps = import('./src/color-picker').ColorPickerProps
export type YhColorPickerEmits = import('./src/color-picker').ColorPickerEmits
export type YhColorPickerSlots = import('./src/color-picker').ColorPickerSlots
export type YhColorPickerExpose = import('./src/color-picker').ColorPickerExpose
