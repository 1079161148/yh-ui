/**
 * InputTag Component
 * @description 标签输入框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import InputTag from './src/input-tag.vue'

export const YhInputTag = withInstall(InputTag)

export default YhInputTag

export * from './src/input-tag'

export type InputTagInstance = InstanceType<typeof InputTag>
export type YhInputTagInstance = InputTagInstance
export type YhInputTagProps = import('./src/input-tag').InputTagProps
export type YhInputTagEmits = import('./src/input-tag').InputTagEmits
export type YhInputTagSlots = import('./src/input-tag').InputTagSlots
export type YhInputTagExpose = import('./src/input-tag').InputTagExpose
export type YhInputTagSize = import('./src/input-tag').InputTagSize
export type YhInputTagType = import('./src/input-tag').InputTagType
