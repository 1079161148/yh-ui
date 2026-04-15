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
export type YhTabsInstance = TabsInstance
export type YhTabPaneInstance = TabPaneInstance
export type YhTabsProps = import('./src/tabs').TabsProps
export type YhTabsEmits = import('./src/tabs').TabsEmits
export type YhTabsSlots = import('./src/tabs').TabsSlots
export type YhTabsExpose = import('./src/tabs').TabsExpose
export type YhTabsType = import('./src/tabs').TabsType
export type YhTabsPosition = import('./src/tabs').TabsPosition
export type YhTabPaneConfig = import('./src/tabs').TabPaneConfig
export type YhTabPaneProps = import('./src/tab-pane').TabPaneProps
export type YhTabPaneSlots = import('./src/tab-pane').TabPaneSlots
