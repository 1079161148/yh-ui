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
