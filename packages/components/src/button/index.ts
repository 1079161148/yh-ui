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
export type YhButtonInstance = ButtonInstance
export type YhButtonProps = import('./src/button').ButtonProps
export type YhButtonEmits = import('./src/button').ButtonEmits
export type YhButtonSlots = import('./src/button').ButtonSlots
export type YhButtonExpose = import('./src/button').ButtonExpose
export type YhButtonType = import('./src/button').ButtonType
export type YhButtonSize = import('./src/button').ButtonSize
export type YhButtonNativeType = import('./src/button').ButtonNativeType
export type YhButtonIconPosition = import('./src/button').IconPosition
