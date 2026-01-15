/**
 * Select Component
 * @description 选择器组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Select from './src/select.vue'

export const YhSelect = withInstall(Select)

export default YhSelect

export * from './src/select'

export type SelectInstance = InstanceType<typeof Select>
