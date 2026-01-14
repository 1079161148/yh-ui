/**
 * Button Component
 * @description 按钮组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Button from './src/button.vue'

export const YhButton = withInstall(Button)

export default YhButton

export * from './src/button'

export type ButtonInstance = InstanceType<typeof Button>
