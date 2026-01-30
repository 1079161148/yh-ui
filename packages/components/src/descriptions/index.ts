/**
 * Descriptions Component
 * @description 描述列表组件导出
 */

import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Descriptions from './src/descriptions.vue'
import DescriptionsItem from './src/description-item.vue'

export const YhDescriptions = withInstall(Descriptions, {
  DescriptionsItem
})

export const YhDescriptionsItem = withNoopInstall(DescriptionsItem)

export default YhDescriptions

export * from './src/descriptions'

export type DescriptionsInstance = InstanceType<typeof Descriptions>
export type DescriptionsItemInstance = InstanceType<typeof DescriptionsItem>
