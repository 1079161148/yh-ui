/**
 * Checkbox Component
 * @description 复选框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const YhCheckbox = withInstall(Checkbox)
export const YhCheckboxGroup = withInstall(CheckboxGroup)

export default YhCheckbox

export * from './src/checkbox'

export type CheckboxInstance = InstanceType<typeof Checkbox>
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
export type YhCheckboxInstance = CheckboxInstance
export type YhCheckboxGroupInstance = CheckboxGroupInstance
export type YhCheckboxProps = import('./src/checkbox').CheckboxProps
export type YhCheckboxEmits = import('./src/checkbox').CheckboxEmits
export type YhCheckboxSlots = import('./src/checkbox').CheckboxSlots
export type YhCheckboxExpose = import('./src/checkbox').CheckboxExpose
export type YhCheckboxGroupProps = import('./src/checkbox').CheckboxGroupProps
export type YhCheckboxGroupEmits = import('./src/checkbox').CheckboxGroupEmits
export type YhCheckboxGroupOption = import('./src/checkbox').CheckboxGroupOption
export type YhCheckboxValueType = import('./src/checkbox').CheckboxValueType
