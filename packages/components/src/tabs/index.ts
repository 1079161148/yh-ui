/**
 * Tabs Component
 * @description 标签页组件导出
 */

import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

export const YhTabs = withInstall(Tabs, { TabPane })
export const YhTabPane = withNoopInstall(TabPane)

export default YhTabs

export * from './src/tabs'
export * from './src/tab-pane'

export type TabsInstance = InstanceType<typeof Tabs>
export type TabPaneInstance = InstanceType<typeof TabPane>
