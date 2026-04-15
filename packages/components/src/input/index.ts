/**
 * Input Component
 * @description 输入框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Input from './src/input.vue'

export const YhInput = withInstall(Input)

export default YhInput

export * from './src/input'

export type InputInstance = InstanceType<typeof Input>
export type YhInputInstance = InputInstance
export type YhInputProps = import('./src/input').InputProps
export type YhInputEmits = import('./src/input').InputEmits
export type YhInputSlots = import('./src/input').InputSlots
export type YhInputExpose = import('./src/input').InputExpose
export type YhInputType = import('./src/input').InputType
export type YhInputSize = import('./src/input').InputSize
export type YhInputVariant = import('./src/input').InputVariant
export type YhInputStatus = import('./src/input').InputStatus
export type YhInputCountConfig = import('./src/input').InputCountConfig
