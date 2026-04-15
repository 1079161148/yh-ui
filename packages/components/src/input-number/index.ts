/**
 * InputNumber Component
 * @description 数字输入框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import InputNumber from './src/input-number.vue'

export const YhInputNumber = withInstall(InputNumber)

export default YhInputNumber

export * from './src/input-number'

export type InputNumberInstance = InstanceType<typeof InputNumber>
export type YhInputNumberInstance = InputNumberInstance
export type YhInputNumberProps = import('./src/input-number').InputNumberProps
export type YhInputNumberEmits = import('./src/input-number').InputNumberEmits
export type YhInputNumberSlots = import('./src/input-number').InputNumberSlots
export type YhInputNumberExpose = import('./src/input-number').InputNumberExpose
export type YhInputNumberSize = import('./src/input-number').InputNumberSize
export type YhInputNumberControlsPosition = import('./src/input-number').ControlsPosition
