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
