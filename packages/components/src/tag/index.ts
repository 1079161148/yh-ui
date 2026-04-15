/**
 * Tag Component
 * @description 标签组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Tag from './src/tag.vue'

export const YhTag = withInstall(Tag)

export default YhTag

export * from './src/tag'

export type TagInstance = InstanceType<typeof Tag>
export type YhTagInstance = TagInstance
export type YhTagProps = import('./src/tag').TagProps
export type YhTagEmits = import('./src/tag').TagEmits
export type YhTagSlots = import('./src/tag').TagSlots
export type YhTagType = import('./src/tag').TagType
export type YhTagSize = import('./src/tag').TagSize
export type YhTagEffect = import('./src/tag').TagEffect
