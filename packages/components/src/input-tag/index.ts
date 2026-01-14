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
