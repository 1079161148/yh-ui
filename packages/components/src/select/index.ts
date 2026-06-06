/**
 * Select Component
 * @description 选择器组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Select from './src/select.vue'
import Option from './src/option.vue'

export const YhSelect = withInstall(Select)
export const YhOption = withInstall(Option)

export default YhSelect

export * from './src/select'

export type SelectInstance = InstanceType<typeof Select>
export type OptionInstance = InstanceType<typeof Option>
export type YhSelectInstance = SelectInstance
export type YhOptionInstance = OptionInstance
export type YhSelectProps = import('./src/select').SelectProps
export type YhSelectEmits = import('./src/select').SelectEmits
export type YhSelectSlots = import('./src/select').SelectSlots
export type YhSelectExpose = import('./src/select').SelectExpose
export type YhSelectOption = import('./src/select').SelectOption
export type YhSelectValue = import('./src/select').SelectValue
export type YhSelectSize = import('./src/select').SelectSize
export type YhSelectTagType = import('./src/select').SelectTagType
export type YhOptionProps = import('./src/select').OptionProps
export type YhOptionSlots = import('./src/select').OptionSlots
