/**
 * Radio Component
 * @description 单选框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'
import RadioButton from './src/radio-button.vue'

export const YhRadio = withInstall(Radio)
export const YhRadioGroup = withInstall(RadioGroup)
export const YhRadioButton = withInstall(RadioButton)

export default YhRadio

export * from './src/radio'

export type RadioInstance = InstanceType<typeof Radio>
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
export type RadioButtonInstance = InstanceType<typeof RadioButton>
export type YhRadioInstance = RadioInstance
export type YhRadioGroupInstance = RadioGroupInstance
export type YhRadioButtonInstance = RadioButtonInstance
export type YhRadioProps = import('./src/radio').RadioProps
export type YhRadioEmits = import('./src/radio').RadioEmits
export type YhRadioSlots = import('./src/radio').RadioSlots
export type YhRadioExpose = import('./src/radio').RadioExpose
export type YhRadioGroupProps = import('./src/radio').RadioGroupProps
export type YhRadioGroupEmits = import('./src/radio').RadioGroupEmits
export type YhRadioGroupOption = import('./src/radio').RadioGroupOption
export type YhRadioButtonProps = import('./src/radio').RadioButtonProps
export type YhRadioButtonEmits = import('./src/radio').RadioButtonEmits
export type YhRadioButtonExpose = import('./src/radio').RadioButtonExpose
export type YhRadioValueType = import('./src/radio').RadioValueType
