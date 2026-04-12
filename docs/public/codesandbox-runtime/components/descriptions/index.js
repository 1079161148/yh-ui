import { withInstall, withNoopInstall } from '../../utils/index.js'
import Descriptions from './src/descriptions.js'
import DescriptionsItem from './src/description-item.js'
const YhDescriptions = withInstall(Descriptions, {
  DescriptionsItem
})
const YhDescriptionsItem = withNoopInstall(DescriptionsItem)
var stdin_default = YhDescriptions
export * from './src/descriptions-meta.js'
export { YhDescriptions, YhDescriptionsItem, stdin_default as default }
