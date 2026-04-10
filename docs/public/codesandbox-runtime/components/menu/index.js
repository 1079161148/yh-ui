import { withInstall } from '../../utils/index.js'
import Menu from './src/menu.js'
import MenuItem from './src/menu-item.js'
import MenuItemGroup from './src/menu-item-group.js'
import SubMenu from './src/sub-menu.js'
const YhMenu = withInstall(Menu)
const YhMenuItem = withInstall(MenuItem)
const YhMenuItemGroup = withInstall(MenuItemGroup)
const YhSubMenu = withInstall(SubMenu)
var stdin_default = YhMenu
export * from './src/menu.js'
export { YhMenu, YhMenuItem, YhMenuItemGroup, YhSubMenu, stdin_default as default }
