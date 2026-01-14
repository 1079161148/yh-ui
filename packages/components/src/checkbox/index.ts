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
