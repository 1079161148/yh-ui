import { withInstall } from '@yh-ui/utils'
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import MenuItemGroup from './src/menu-item-group.vue'
import SubMenu from './src/sub-menu.vue'

export const YhMenu = withInstall(Menu)
export const YhMenuItem = withInstall(MenuItem)
export const YhMenuItemGroup = withInstall(MenuItemGroup)
export const YhSubMenu = withInstall(SubMenu)

export default YhMenu

export * from './src/menu'

export type MenuInstance = InstanceType<typeof Menu>
export type MenuItemInstance = InstanceType<typeof MenuItem>
export type MenuItemGroupInstance = InstanceType<typeof MenuItemGroup>
export type SubMenuInstance = InstanceType<typeof SubMenu>
