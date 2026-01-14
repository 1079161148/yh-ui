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
