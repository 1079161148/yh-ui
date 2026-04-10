import { withInstall, withNoopInstall } from '../../utils/index.js'
import Tabs from './src/tabs.js'
import TabPane from './src/tab-pane.js'
const YhTabs = withInstall(Tabs, { TabPane })
const YhTabPane = withNoopInstall(TabPane)
var stdin_default = YhTabs
export * from './src/tabs.js'
export * from './src/tab-pane.js'
export { YhTabPane, YhTabs, stdin_default as default }
