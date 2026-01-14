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
